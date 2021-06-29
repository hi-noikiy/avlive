<script>
import { checkLogin } from './libs/login';
import { HTTP_REQUEST_URL } from './config/app';
import { getShopConfig, silenceAuth } from '@/api/public';
import Auth from '@/libs/wechat.js';
import Routine from './libs/routine.js';
// Im 通信
let WebIM = wx.WebIM = require("./utils/WebIM")["default"];
let msgStorage = require("./comps/chat/msgstorage");
let msgType = require("./comps/chat/msgtype");
let disp = require("./utils/broadcast");

import Cache from './utils/cache';
let logout = false;
// let emedia = wx.emedia = require("./emediaSDK/webrtc/src/entry") 
let emedia = wx.emedia = require("./emediaSDK/emedia_for_miniProgram") 
emedia.config({useUniappPlugin: true})


var loginBack;
const CHAT_PREFIX='live_app_';
import {getUserById} from '@/api/webIM'
function ack(receiveMsg) {
  // 处理未读消息回执
  var bodyId = receiveMsg.id; // 需要发送已读回执的消息id

  var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
  ackMsg.set({
    id: bodyId,
    to: receiveMsg.from
  });
  WebIM.conn.send(ackMsg.body);
}
function onMessageError(err) {
  if (err.type === "error") {
    uni.showToast({
      title: err.errorText
    });
    return false;
  }

  return true;
}
function getCurrentRoute() {
  let pages = getCurrentPages();
  if (pages.length > 0) {
  let currentPage = pages[pages.length - 1];
  return currentPage.route;
  }
  return '/'
}
// 不包含陌生人版本
function calcUnReadSpot(message) {
  let myName = uni.getStorageSync("myUsername");
  let members = uni.getStorageSync("member") || []; //好友

  var listGroups = uni.getStorageSync("listGroup") || []; //群组
  let allMembers = members.concat(listGroups);
  let count = allMembers.reduce(function(result, curMember, idx) {
    let chatMsgs;
    if (curMember.groupid) {
      chatMsgs =
        uni.getStorageSync(curMember.groupid + myName.toLowerCase()) || [];
    } else {
      chatMsgs =
        uni.getStorageSync(
          curMember.name && curMember.name.toLowerCase() + myName.toLowerCase()
        ) || [];
    }
    return result + chatMsgs.length;
  }, 0);
  getApp().globalData.unReadMessageNum = count;
  disp.fire("em.unreadspot", message);
}

function saveGroups() {
  var me = this;
  return WebIM.conn.getGroup({
    limit: 50,
    success: function(res) {
      uni.setStorage({
        key: "listGroup",
        data: res.data
      });
    },
    error: function(err) {
      console.log(err);
    }
  });
}

export default {
	globalData: {
		spid: 0,
		code: 0,
		isLogin: false, 
		MyMenus: [],
		globalData: false,
		isIframe: false,
		tabbarShow: true,
		windowHeight:0,
		// Im 通信
		unReadMessageNum: 0,
		userInfo: null,
		saveFriendList: [],
		saveGroupInvitedList: [],
		isIPX: false, //是否为iphone X
		conn: {
		  closed: false,
		  curOpenOpt: Cache.get('IM_LOGIN_OPT')||{}, 
		  registerIM(uid,nickname,callback){
			  var options = {
			    apiUrl: WebIM.config.apiURL,
			    username: CHAT_PREFIX+uid,
			    password: 'live_app_pwd',
			    nickname: nickname||'',
			    appKey: WebIM.config.appkey,
			    success: function (res) {
			      console.log('res', res); 
			      // uni.showToast({title: "注册成功"}); 
					callback(true,res)
			    },
			    error: function (res) {
			      console.log('res', res); 
			      if (res.statusCode !== "200") {
			        if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
						callback(false,res)
						return uni.showToast({title: "用户名非法",icon:'none'});
			        } 
			        uni.showToast({title: "用户名已被占用",icon:'none'});
					res.isregisted=true;
			      } 
				  callback(false,res)
			    }
			  };
			  WebIM.conn.registerUser(options);
		  },
		  loginIM(uid,callback) {
			  console.log("开始登陆"+uid);
			  loginBack=callback;
			  disp.on("em.error.passwordErr", function () {
			      uni.showToast({title: "用户名或密码错误",icon:'none'});
			      callback(false)
			  });
			  var opt={
				  apiUrl: WebIM.config.apiURL, 
				  user: CHAT_PREFIX+uid,
				  pwd: 'live_app_pwd', 
				  grant_type: 'password',
				  appKey: WebIM.config.appkey,
				  success:(res)=>{
					  var token = res.access_token 
					    console.log("token",token);
					    Cache.set('IM_LOGIN_STATUS', token); 
						uni.setStorage({
							key: "myUsername",
							data: 'live_app_'+uid
						}); 
				  }
				}
			  
				uni.showLoading({
				  title: "正在初始化客户端..",
				  
				});
				// mask: true
				Cache.set('IM_LOGIN_OPT', {
					apiUrl: WebIM.config.apiURL,
					user: CHAT_PREFIX+uid,
					pwd: 'live_app_pwd', 
					grant_type: 'password',
					appKey: WebIM.config.appkey,
					isToken:false
				});
				this.curOpenOpt = opt;
				WebIM.conn.open(opt);
				this.closed = false;
		  },
		  loginTokenIM(uid,token){ 
			    var opt={
					apiUrl: WebIM.config.apiURL,
					user: CHAT_PREFIX+uid,
					pwd: 'live_app_pwd', 
					accessToken: token,
					appKey: WebIM.config.appkey,
					success:(res)=>{
						  var token = res.access_token 
						  console.log("token",token);
						  Cache.set('IM_LOGIN_STATUS', token);
						  uni.setStorage({
								key: "myUsername",
								data: CHAT_PREFIX+uid
						  }); 
					}
				}
				Cache.set('IM_LOGIN_OPT', {
					apiUrl: WebIM.config.apiURL,
					user: CHAT_PREFIX+uid,
					pwd: 'live_app_pwd', 
					accessToken: token,
					appKey: WebIM.config.appkey, 
					isToken:true
				});
				this.curOpenOpt = opt;
				WebIM.conn.open(opt);
				this.closed = false; 
		  },
		  reconnect(){
			  WebIM.conn.reconnect();
		  },
		  reopen() {
			  var curOpt={}
				try{
					curOpt=JSON.parse(this.curOpenOpt);
					if(!curOpt.user)return
				}catch(e){
					//TODO handle the exception
					console.log("err",e);
				} 
		    if (curOpt.user) {
		      //this.open(this.curOpenOpt);
			  console.log(this.curOpenOpt);
			 
				console.log("curOpt",curOpt);
				if(curOpt.isToken){
					var token_opt={
						apiUrl:curOpt.apiUrl,
						user: curOpt.user,
						pwd: 'live_app_pwd', 
						accessToken: curOpt.accessToken,
						appKey:curOpt.appKey,
						success:(res)=>{
							  var token = res.access_token 
							  console.log("token",token);
							  Cache.set('IM_LOGIN_STATUS', token);
							  uni.setStorage({
									key: "myUsername",
									data: curOpt.user
							  }); 
						}
					}
					WebIM.conn.open(token_opt); 
				}else{ 
					var pwd_opt={ 
					  apiUrl:curOpt.apiUrl,
					  user: curOpt.user,
					  pwd: 'live_app_pwd', 
					  grant_type: 'password',
					  appKey: curOpt.appKey,
						success:(res)=>{
							  var token = res.access_token 
							  console.log("token",token);
							  Cache.set('IM_LOGIN_STATUS', token);
							  uni.setStorage({
									key: "myUsername",
									data: curOpt.user
							  });
						}
					}
					WebIM.conn.open(pwd_opt);
				}  
		      this.closed = false;
		    }
		  }
		},
		
		onLoginSuccess: function() {
			console.log("成功");
		  uni.hideLoading();
		  if(loginBack)
				loginBack(true)
		},
		checkIsIPhoneX: function() {
		  const me = this;
		  uni.getSystemInfo({
		    success: function(res) {
		      // 根据 model 进行判断
		      if (res.model&&res.model.search("iPhone X") != -1) {
		        me.isIPX = true;
		      }
		    }
		  });
		}
		// onShow(){
		// 	WebIM.conn.reconnect();
		// },
		// onHide(){
		// 	WebIM.conn.close();
		// 	WebIM.conn.stopHeartBeat();
		// },
		// onUnload(){
		// 	WebIM.conn.close();
		// 	WebIM.conn.stopHeartBeat();
		// 	uni.redirectTo({
		// 		url: "../login/login?myName=" + myName
		// 	});
		// },
	},
	onLaunch: function(option) {
		let that = this; 
		
		disp.on("em.main.ready", function() {
		  calcUnReadSpot();
		});
		disp.on("em.chatroom.leave", function() {
		  calcUnReadSpot();
		});
		disp.on("em.chat.session.remove", function() {
		  calcUnReadSpot();
		});
		disp.on("em.chat.audio.fileLoaded", function() {
		  calcUnReadSpot();
		});
		disp.on("em.main.deleteFriend", function() {
		  calcUnReadSpot();
		});
		disp.on("em.chat.audio.fileLoaded", function() {
		  calcUnReadSpot();
		}); //
		
		WebIM.conn.listen({
		  onOpened(message) { 
			  uni.$emit('onIMLogin',true)
		    if (
		     getCurrentRoute() == "pages/users/login/index" ||
		     getCurrentRoute() == "pages/login_token/login_token"
		    ) {
		      that.globalData.onLoginSuccess();
		    }
		  },
		
		  onReconnect() {
		    uni.showToast({
		      title: "重连中...",
		      duration: 2000
		    });
		  },
		
		  onSocketConnected() {
		    uni.showToast({
		      title: "socket连接成功",
		      duration: 2000
		    });
		  },
		
		  onClosed() {
			// that.globalData.conn.closed = true;
			// WebIM.conn.close();
		 //    uni.showToast({
		 //      title: "聊天已断开",
		 //      icon: "none",
		 //      duration: 2000
		 //    });
			// return;
		    uni.redirectTo({
		      url: "/pages/users/login/index"
		    });
		    that.globalData.conn.closed = true;
		    WebIM.conn.close();
		  },
		
		  onInviteMessage(message) {
		    that.globalData.saveGroupInvitedList.push(message);
		    disp.fire("em.invite.joingroup", message); // uni.showModal({
		    // 	title: message.from + " 已邀你入群 " + message.roomid,
		    // 	success(){
		    // 		disp.fire("em.invite.joingroup", message);
		    // 	},
		    // 	error(){
		    // 		disp.fire("em.invite.joingroup", message);
		    // 	}
		    // });
		  },
		
		  onReadMessage(message) {
		    //console.log('已读', message)
		  },
		
		  onPresence(message) {
		    //console.log("onPresence", message);
		    switch (message.type) {
		      case "unsubscribe":
		        break;
		      // 好友邀请列表
		      case "subscribe":
		        if (message.status === "[resp:true]") {
		        } else {
		          // pages[0].handleFriendMsg(message);
		          for (let i = 0; i < that.globalData.saveFriendList.length; i++) {
		            if (that.globalData.saveFriendList[i].from === message.from) {
		              that.globalData.saveFriendList[i] = message;
		              disp.fire("em.subscribe");
		              return;
		            }
		          }
		
		          that.globalData.saveFriendList.push(message);
		          disp.fire("em.subscribe");
		        }
		
		        break;
		
		      case "subscribed":
		        uni.showToast({
		          title: "添加成功",
		          duration: 1000
		        });
		        disp.fire("em.subscribed");
		        break;
		
		      case "unsubscribed":
		        // uni.showToast({
		        // 	title: "已拒绝",
		        // 	duration: 1000
		        // });
		        disp.fire("em.unsubscribed");
		        break;
		      case "direct_joined":
		        saveGroups();
		        uni.showToast({
		          title: "已进群",
		          duration: 1000
		        });
		        break;
		      case "memberJoinPublicGroupSuccess":
		        saveGroups();
		        uni.showToast({
		          title: "已进群",
		          duration: 1000
		        });
		        break;
		      case "invite":
		        let info = message.from + "邀请你加入群组";
		        uni.showModal({
		          title: "提示",
		          content: info,
		          success(res) {
		            if (res.confirm) {
		              console.log("用户点击确定");
		              WebIM.conn.agreeInviteIntoGroup({
		                invitee: WebIM.conn.context.userId,
		                groupId: message.gid,
		                success: () => {
		                  saveGroups()
		                  console.log("加入成功");
		                }
		              });
		            } else if (res.cancel) {
		              console.log("用户点击取消");
		              WebIM.conn.rejectInviteIntoGroup({
		                invitee: WebIM.conn.context.userId,
		                groupId: message.gid
		              });
		            }
		          }
		        });
		        break;
		      case "unavailable":
		        disp.fire("em.contacts.remove");
		        disp.fire("em.group.leaveGroup", message);
		        break;
		
		      case "deleteGroupChat":
		        disp.fire("em.invite.deleteGroup", message);
		        break;
		
		      case "leaveGroup":
		        disp.fire("em.group.leaveGroup", message);
		        break;
		
		      case "removedFromGroup":
		        disp.fire("em.group.leaveGroup", message);
		        break;
		
		      default:
		        break;
		    }
		  },
		
		  onRoster(message) {
		    // let pages = getCurrentPages();
		    // if(pages[0]){
		    // 	pages[0].onShow();
		    // }
		  },
		
		  onVideoMessage(message) {
		    console.log("onVideoMessage: ", message);
		
		    if (message) {
		      msgStorage.saveReceiveMsg(message, msgType.VIDEO);
		    }
		
		    calcUnReadSpot(message);
		    ack(message);
		  },
		
		  onAudioMessage(message) {
		    console.log("onAudioMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.AUDIO);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  onCmdMessage(message) {
		    console.log("onCmdMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.CMD);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  // onLocationMessage(message){
		  // 	console.log("Location message: ", message);
		  // 	if(message){
		  // 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
		  // 	}
		  // },
		  onTextMessage(message) {
		    console.log("onTextMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.TEXT);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  onEmojiMessage(message) {
		    console.log("onEmojiMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.EMOJI);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  onPictureMessage(message) {
		    console.log("onPictureMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.IMAGE);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  onFileMessage(message) {
		    console.log("onFileMessage", message);
		
		    if (message) {
		      if (onMessageError(message)) {
		        msgStorage.saveReceiveMsg(message, msgType.FILE);
		      }
		
		      calcUnReadSpot(message);
		      ack(message);
		    }
		  },
		
		  // 各种异常
		  onError(error) {
		    console.log(error); // 16: server-side close the websocket connection
				if(error.data && error.data.statusCode==404){
					// error.data.data.error_description='user not found'
					if(loginBack)
						loginBack(false,'goRegister')
				}
				if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
					this.closed = true;
					// this.curOpenOpt={};
					Cache.set('IM_LOGIN_OPT', null);
					// uni.navigateTo({
					// 	url: "/pages/users/login/index"
					// })
					 
				}
		    // if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
		    //   // if(error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout){
		    //   // if(WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax){
		    //   // 	return;
		    //   // }
		    //   uni.showToast({
		    //     title: "websocket 断开",
		    //     duration: 1000
		    //   });
		    //   uni.redirectTo({
		    //     url: "../login/login"
		    //   });
		    //   logout = true;
		    //   return;
		    // } // 8: offline by multi login
		
		    // if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
		    //   uni.showToast({
		    //     title: "offline by multi login",
		    //     duration: 1000
		    //   });
		    //   uni.redirectTo({
		    //     url: "../login/login"
		    //   });
		    // }
		
		    if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
		      uni.hideLoading();
		      disp.fire("em.error.passwordErr"); // uni.showModal({
		      // 	title: "用户名或密码错误",
		      // 	confirmText: "OK",
		      // 	showCancel: false
		      // });
		    }
		
		    if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
		      uni.hideLoading();
		      disp.fire("em.error.tokenErr");
		    }
		
		    if (error.type == "socket_error") {
		      ///sendMsgError
		      console.log("socket_errorsocket_error", error);
		      uni.showToast({
		        title: "socket已断开",
		        icon: "none",
		        duration: 2000
		      });
		      disp.fire("em.error.sendMsgErr", error);
		    }
		  }
		});
		this.globalData.checkIsIPhoneX();
		// #ifdef APP-PLUS || H5
		uni.getSystemInfo({
			success: function(res) {
				// 首页没有title获取的整个页面的高度，里面的页面有原生标题要减掉就是视口的高度
				// 状态栏是动态的可以拿到 标题栏是固定写死的是44px
				let height = res.windowHeight - res.statusBarHeight - 44
				// #ifdef H5 || APP-PLUS
				that.globalData.windowHeight = res.windowHeight + 'px'
				// #endif
				// // #ifdef APP-PLUS
				// that.globalData.windowHeight = height + 'px'
				// // #endif
				
			}
		});
		// #endif	
		// #ifdef MP
		if (HTTP_REQUEST_URL == '') {
			console.error(
				"请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'\n\n请修改开发者工具中【详情】->【AppID】改为自己的Appid\n\n请前往后台【小程序】->【小程序配置】填写自己的 appId and AppSecret"
			);
			return false;
		}
		if (option.query.hasOwnProperty('scene')) {
			switch (option.scene) {
				//扫描小程序码
				case 1047:
					let val = that.$util.getUrlParams(decodeURIComponent(option.query.scene));
					that.globalData.code = val.pid === undefined ? val : val.pid;
					break;
				//长按图片识别小程序码
				case 1048:
					that.globalData.code = option.query.scene;
					break;
				//手机相册选取小程序码
				case 1049:
					that.globalData.code = option.query.scene;
					break;
				//直接进入小程序
				case 1001:
					that.globalData.spid = option.query.scene;
					break;
			}
		}
		const updateManager = uni.getUpdateManager();

		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
		});

		updateManager.onUpdateReady(function() {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});

		updateManager.onUpdateFailed(function() {
			return that.Tips({ title: '新版本下载失败' });
		});
		// #endif
		// getShopConfig().then(res => {
		// 	this.$store.commit('SETPHONESTATUS', res.data.status);
		// });
		// 获取导航高度；
		uni.getSystemInfo({
			success: function(res) {
				that.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
			}
		});
		// #ifdef MP
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		that.globalData.navH = menuButtonInfo.top * 2 + menuButtonInfo.height / 2;
		// #endif

		// #ifdef H5
		uni.getSystemInfo({
			success(e) {
				/* 窗口宽度大于420px且不在PC页面且不在移动设备时跳转至 PC.html 页面 */
				if (e.windowWidth > 420 && !window.top.isPC && !/iOS|Android/i.test(e.system)) {
					window.location.pathname = '/static/html/pc.html';
				}
			}
		});
		if (option.query.hasOwnProperty('type')) {
			this.globalData.isIframe = true;
		} else {
			this.globalData.isIframe = false;
		}
	
		let snsapiBase = 'snsapi_base';
		let urlData = location.pathname + location.search;
		if (!that.$store.getters.isLogin && Auth.isWeixin()) {
			const { code, state, scope } = option.query;
			if (code &&  code!=uni.getStorageSync('snsapiCode') && location.pathname.indexOf('/pages/users/wechat_login/index') === -1) {
				// 存储静默授权code
				uni.setStorageSync('snsapiCode', code);
				let spread = that.globalData.spid ? that.globalData.spid : '';
				silenceAuth({
					code: code,
					spread: that.$Cache.get('spread'),
					spid: that.globalData.code
				})
					.then(res => {
						
						uni.setStorageSync('snRouter', decodeURIComponent(decodeURIComponent(option.query.back_url)));
						if (res.data.key !== undefined && res.data.key) {
							this.$Cache.set('snsapiKey', res.data.key);
						} else {
							let time = res.data.expires_time - this.$Cache.time();
							this.$store.commit('LOGIN', {
								token: res.data.token,
								time: time
							});
							this.$store.commit('SETUID', res.data.userInfo.uid);
							this.$store.commit('UPDATE_USERINFO', res.data.userInfo);
							// location.replace(decodeURIComponent(decodeURIComponent(option.query.back_url)));
						}
					})
					.catch(error => {
						
						if (!that.$Cache.has('snsapiKey')) {
							if (location.pathname.indexOf('/pages/users/wechat_login/index') === -1) {
								Auth.oAuth(snsapiBase, urlData);
							}
						}
					});
			} else {
				if (!this.$Cache.has('snsapiKey')) {
					if (location.pathname.indexOf('/pages/users/wechat_login/index') === -1) {
						Auth.oAuth(snsapiBase, urlData);
					}
				}
			}
		} else {
			if (option.query.back_url) {
				location.replace(uni.getStorageSync('snRouter'));
			}
		}


		// #endif
		// #ifdef MP
		// 小程序静默授权
		if (!this.$store.getters.isLogin) {
			Routine.getCode()
				.then(code => {
					this.silenceAuth(code);
				})
				.catch(res => {
					uni.hideLoading();
				});
		}
		// #endif
	},
	// onShow(){
	// 	WebIM.conn.reconnect();
	// },
	// onHide(){
	// 	WebIM.conn.close();
	// 	WebIM.conn.stopHeartBeat();
	// },
	methods: {
		// 小程序静默授权
		silenceAuth(code) {
			let that = this;
			let spread = that.globalData.spid ? that.globalData.spid : '';
			silenceAuth({
				code: code,
				spread_spid: spread,
				spread_code: that.globalData.code
			})
				.then(res => {
					if (res.data.token !== undefined && res.data.token) {
						uni.hideLoading();
						let time = res.data.expires_time - this.$Cache.time();
						that.$store.commit('LOGIN', {
							token: res.data.token,
							time: time
						});
						that.$store.commit('SETUID', res.data.userInfo.uid);
						that.$store.commit('UPDATE_USERINFO', res.data.userInfo);
					}
				})
				.catch(res => {
					console.log(res);
				});
		}
	},
	onHide: function() {

	}
};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>	
<style> 	
	
@import url('@/plugin/emoji-awesome/css/google.min.css');
@import url('@/plugin/animate/animate.min.css');
@import 'static/css/base.css';
/* #ifdef APP-PLUS */
@import 'static/iconfont/iconfont-app.css';
/* #endif */
/* #ifndef APP-PLUS */
@import 'static/iconfont/iconfont.css';
/* #endif */
@import 'static/css/guildford.css';
@import 'static/css/style.scss';
page{
	max-width: 750rpx;
	margin: auto;
}
view {
	box-sizing: border-box;
}
.wrap{
	padding: 0 20rpx;
	max-width: 750rpx;
	margin: auto;
}
.btnTheme{
	margin: auto;
	background-color: #ef3900;
	color: white;
	border-radius: 60rpx;
	border: 0;
	height: 100rpx;
	line-height: 100rpx;
}
.bg-color-red {
	background-color: #e93323 !important;
}

.syspadding {
	padding-top: var(--status-bar-height);
}

.flex {
	display: flex;
}

.uni-scroll-view::-webkit-scrollbar {
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	display: none;
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}
</style>
