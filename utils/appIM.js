// require("sdk/libs/strophe");
let WebIM =   require("./WebIM")["default"];
let msgStorage = require("../comps/chat/msgstorage");
let msgType = require("../comps/chat/msgtype");
let disp = require("./broadcast");
let logout = false;
// let emedia = wx.emedia = require("./emediaSDK/webrtc/src/entry") 
let emedia =   require("../emediaSDK/emedia_for_miniProgram") 
emedia.config({useUniappPlugin: true})
import store from '../store';
//应用名称 取自 appkey: "1120210422085065#demo",
/**
 * L:/Project/直播APP/pages/liveApp/emedia/index.nvue
 * 	//525行 截取出im的userId  getName(str){
	 * chatdemoui_ 改为demo_
	 * 
 * @param {Object} receiveMsg
 */
const APP_NAME='demo';


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

// // 包含陌生人版本
function calcUnReadSpot2(message){
	let myName = uni.getStorageSync("myUsername");
	uni.getStorageInfo({
		success: function(res){
			let storageKeys = res.keys
			let newChatMsgKeys = [];
			let historyChatMsgKeys = [];
			storageKeys.forEach((item) => {
				if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
					newChatMsgKeys.push(item)
				}
			})
			let count = newChatMsgKeys.reduce(function(result, curMember, idx){
				let chatMsgs;
				chatMsgs = uni.getStorageSync(curMember) || [];
				return result + chatMsgs.length;
			}, 0)

			getApp().globalData.unReadMessageNum = count;
			disp.fire("em.unreadspot", message);
    },
    fail:function(err){
      console.log(err);
    }
	})
}






function saveGroups() { 
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


function checkIsIPhoneX() { 
	  uni.getSystemInfo({
		success: function(res) {
		  // 根据 model 进行判断
		  if (res.model&&res.model.search("iPhone X") != -1) {
			getApp().globalData.isIPX = true;
		  }
		}
	  });
}

function onLoginSuccess() {
	console.log("onLoginSuccess");
	if(loginBack)
		loginBack(true)
  
 //  uni.redirectTo({
	// url: "/pages/liveApp/index/index" 
 //  });
}  
function onImLaunch(){ 
	
	var token = WebIM.conn.context.accessToken;
	
	console.log("token："+token);
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
		  uni.hideLoading();
		  console.log("opened",message );
	    if (
	      getCurrentRoute() == "pages/users/login/index" ||
	      getCurrentRoute() == "pages/login_token/login_token"
	    ) { 
	       onLoginSuccess( );
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
	    uni.showToast({
	      title: "网络已断开",
	      icon: "none",
	      duration: 2000
	    });
		return;
	    uni.redirectTo({
	      url: "../login/login"
	    });
	    getApp().globalData.conn.closed = true;
	    WebIM.conn.close();
	  },
	
	  onInviteMessage(message) {
	    getApp().globalData.saveGroupInvitedList.push(message);
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
	     console.log('已读', message)
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
	          for (let i = 0; i < getApp().globalData.saveFriendList.length; i++) {
	            if (getApp().globalData.saveFriendList[i].from === message.from) {
	              getApp().globalData.saveFriendList[i] = message;
	              disp.fire("em.subscribe");
	              return;
	            }
	          }
	
	          getApp().globalData.saveFriendList.push(message);
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
		  console.log("err",WebIM.statusCode);
	    console.log(error); // 16: server-side close the websocket connection 
		if (error.type == WebIM.statusCode.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR) {
			if (store.state.app.im_token&& store.state.app.uid){
				loginTokenIM(store.state.app.uid,store.state.app.im_token)
			}
		}
		if(error.data && error.data.statusCode==404){
			// error.data.data.error_description='user not found'
			if(loginBack)
				loginBack(false,'goRegister')
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
	        title: "网络已断开",
	        icon: "none",
	        duration: 2000
	      });
	      disp.fire("em.error.sendMsgErr", error);
	    }
	  }
	});
	checkIsIPhoneX();
}

import Cache from './cache';
var loginBack;
const CHAT_PREFIX='live_app_';
import {getUserById} from '@/api/webIM'
function registerIM(uid,nickname,callback){
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
}
function loginIM(uid,callback){ 
	console.log("开始登陆"+uid);
	loginBack=callback;
	disp.on("em.error.passwordErr", function () {
	    uni.showToast({title: "用户名或密码错误",icon:'none'});
	    callback(false)
	});
	getApp().globalData.conn.open({
	  apiUrl: WebIM.config.apiURL, 
	  user: CHAT_PREFIX+uid,
	  pwd: 'live_app_pwd', 
	  grant_type: 'password',
	  appKey: WebIM.config.appkey,
	  success:(res)=>{
		  var token = res.access_token
		  Cache.set('IM_LOGIN_STATUS', token);
		  
		  uni.setStorage({
		    key: "myUsername",
		    data: 'live_app_'+uid
		  });
	  }
	});
}
function loginTokenIM(uid,token){ 
	getApp().globalData.conn.open({
	  apiUrl: WebIM.config.apiURL, 
	  user: CHAT_PREFIX+uid,
	  pwd: 'live_app_pwd', 
	  accessToken: token,
	  appKey: WebIM.config.appkey,
	  success:(res)=>{
		  var token = res.access_token
		  Cache.set('IM_LOGIN_STATUS', token);
	  }
	});
}
//获取系统用户信息
async function getSysUserInfo(uids){ 
	console.log("=================",uids);
		if(uids.length==0)
			return []; 
	  var res=await getUserById(uids.join(','));
	  var result= res?res.data||[]:[]; 
	return result;
	// if(res.status==200 && res.data){
	// 	var users=res.data||[];
		
		
	// 	var arr=list;
	// 	users.forEach((user)=>{
	// 		list.forEach((item,index)=>{
	// 			if(user.uid==item.from.split(CHAT_PREFIX)[1] ){
	// 				arr[index].avatar=user.avatar
	// 				arr[index].nickname=user.nickname
	// 				arr[index].phone=user.phone
	// 				arr[index].real_name=user.real_name 
	// 			}
	// 		})
	// 	})
	// 	this.friendList=arr;
	// 	uni.setStorageSync("friendNotiData", arr); 
	// }  
}


//获取用户属性
async function getUserInfo(users){ 
	return users;
	// var res=await WebIM.conn.fetchUserInfoById(users, ['nickname', 'avatarurl']);
	//  console.log("用户属性",WebIM.conn);
	// WebIM.conn.fetchUserInfoById(users).then((res) => {
	//     console.log(res)
	// })
	// console.log("用户属性",res);
	// return res; 
}


module.exports = {
	APP_NAME,onImLaunch,WebIM,loginIM,registerIM,getUserInfo,CHAT_PREFIX,getSysUserInfo
};