<template>
	<view>
		<scroll-view
		  scroll-y="true"
		  :class="
		    'chat_list_wraper ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
		  "
		  :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')"
		>
		<!--  <view class="search" v-if="search_btn">
		    <view @tap="openSearch">
		      <icon type="search" size="12"></icon>
		      <text>搜索</text>
		    </view>
		  </view> -->
		  <!-- #ifdef H5 -->
		  
		  <u-gap height="44" ></u-gap>
		  <!-- #endif -->
		  <view >
			  <view class="pr">
				  <u-navbar :is-back="false"  title="聊天">
					  <view slot="right" class="more-box mr-10" @click="moreShow=!moreShow" >
						  <u-icon name="more-dot-fill" color="#2979ff" size="40"></u-icon>
					  </view> 
				  </u-navbar>
				  <view class="pa more_list" v-show="moreShow">
					  <u-cell-group>
					  	<u-cell-item icon="account-fill" title="好友"  @click="onMenus" :index="0"></u-cell-item>
					  	<u-cell-item  icon="account-fill" title="黑名单" @click="onMenus" :index="1"></u-cell-item>
					  	<u-cell-item  icon="account-fill" title="群聊" @click="onMenus" :index="2"></u-cell-item>
					  </u-cell-group>
				  </view>
			  </view> 
			  <!-- <SlidePop  v-model="moreShow"  topPop="80rpx" mode="right"  height="100rpx" >
				  <u-cell-group>
				  	<u-cell-item icon="account-fill" title="好友"></u-cell-item>
				  	<u-cell-item  icon="account-fill" title="黑名单"></u-cell-item>
				  	<u-cell-item  icon="account-fill" title="群聊"></u-cell-item>
				  </u-cell-group>
			  </SlidePop> -->
		  </view>
		  
		  
		
		  <view class="search_input" v-if="search_chats">
		    <view>
		      <icon type="search" size="12"></icon>
		      <input
		        placeholder="搜索"
		        placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;"
		        auto-focus
		        confirm-type="search"
		        type="text"
		        @confirm="onSearch"
		        @input="onInput"
		        :value="input_code"
		      />
		      <icon
		        type="clear"
		        size="12"
		        @tap.stop="clearInput"
		        v-if="show_clear"
		      ></icon>
		    </view>
		    <text @tap="cancel">取消</text>
		  </view>
		
		  <view
		  
		    v-for="(item, index) in arr"
		    :key="index"
		    class="chat_list"
		    :data-item="item"
		    @tap.stop="del_chat"
		  >
		    <swipe-delete>
		      <view class="tap_mask" @tap.stop="into_chatRoom" :data-item="JSON.stringify(item)">
		        <view class="list_box">
		          <view class="list_left" :data-username="item.username">
		            <view class="list_pic">
		              <view
		                class="em-msgNum"
		                v-if="item.unReadCount > 0 || item.unReadCount == '99+'"
		                >{{ item.unReadCount }}</view
		              >
		
		              <image
		                :src="
		                  item.chatType == 'groupchat' ||
		                  item.chatType == 'chatRoom'
		                    ? '/static/images/live/groupTheme.png'
		                    : item.avatar
		                "
		              ></image>
		            </view> 
		            <view class="list_text"> 
		              <text class="list_user">{{
		                item.chatType == "groupchat" ||
		                item.chatType == "chatRoom" ||
		                item.groupName
		                  ? item.groupName
		                  : item.nickname
		              }}</text> 
		              <text class="list_word" v-if="item.msg&&item.msg.data&&item.msg.data[0].data">{{
		                item.msg.data[0].data
		              }}</text>
		              <text class="list_word" v-if="item.msg.type == 'img'"
		                >[图片]</text
		              >
		              <text class="list_word" v-if="item.msg.type == 'audio'"
		                >[语音]</text
		              >
		              <!-- <text class="list_word" v-if="item.msg.type == 'video'"
		                >[视频]</text
		              > -->
		            </view>
		          </view>
		          <view class="list_right">
		            <text :data-username="item.username">{{ item.time }}</text>
		          </view>
		        </view>
		      </view>
		    </swipe-delete>
		  </view> 
		  <view v-if="arr&& arr.length == 0" class="chat_noChat">
			  当前没有历史聊天，添加一个好友开始聊天吧
			  
		<!-- 	  <button @tap.stop="into_chatRoom" :data-item="JSON.stringify(test_item)">测试聊天</button> -->
		   </view>
		  <!-- </view> -->
		</scroll-view>
	</view>
</template>

<script>
	let disp = require("@/utils/broadcast"); 
	let WebIM = require("@/utils/WebIM")["default"];
	
	let isfirstTime = true;
	import swipeDelete from "@/comps/swipedelete/swipedelete";
    import { mapGetters, mapMutations } from 'vuex'; 
	import SlidePop from './SlidePop.vue' 
	import {getSysUserInfo,CHAT_PREFIX} from '@/utils/appIM.js'
	export default {
		components: {
		  swipeDelete,SlidePop
		},
		data() {
			return {
				test_item:{
					chatType:'singlechat',
					username:'live_app_2' 
				},
				moreShow:false, 
				search_btn: true,
				search_chats: false,
				show_mask: false,
				yourname: "",
				unReadSpotNum: 0,
				unReadNoticeNum: 0,
				messageNum: 0,
				unReadTotalNotNum: 0,
				arr: [],
				show_clear: false,
				member: "",
				isIPX: false,
				gotop: false,
				input_code: ""
			}
		},
		computed: {
		    ...mapGetters( ['msg_list','uid']) 
		},
		activated(){
			//激活时调用
			this.arr=this.msg_list;
			console.log("activated");
			
		},
		deactivated(){
			console.log("deactivated");
			
		},
		updated(){ 
			console.log("updated");
			
		},
		mounted () {  
			console.log("mounted");
			if(!this.uid)return 
			uni.$on('onIMLogin',(isLogin)=>{
				
					console.log("mounted  onIMLogin"+isLogin);
			       this.getChatList();
			       this.unReadSpotNum= getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			       this.messageNum= getApp().globalData.saveFriendList.length;
			       this.unReadNoticeNum= getApp().globalData.saveGroupInvitedList.length;
			       this.unReadTotalNotNum=getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
			       if (getApp().globalData.isIPX) {
			       	 this.isIPX=true
			       } 	
			})  
		    //监听加好友申请
		    disp.on("em.subscribe",  ()=> {
		        this.messageNum= getApp().globalData.saveFriendList.length;
		        this.unReadTotalNotNum=getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
		    }); 
		
		    //监听解散群
		    disp.on("em.invite.deleteGroup",  ()=> {
		      this.listGroups();
		      this.getRoster();
		      // this.getChatList()
			  
			  this.getChatList();
			  this.messageNum=  getApp().globalData.saveFriendList.length;
		    
		    }); 
		    
		    //监听未读消息数
		    disp.on("em.unreadspot",  (message)=> { 
		      // this.getChatList() 
			  
			  this.getChatList();
			  this.messageNum= getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
		      
		    }); //监听未读加群“通知”
		
		    disp.on("em.invite.joingroup",  ()=> {
			  this.unReadNoticeNum= getApp().globalData.saveGroupInvitedList.length;
			  this.unReadTotalNotNum= getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
		    });
		    disp.on("em.contacts.remove",  () =>{
		      this.getRoster();
			  
			   this.getChatList();
			   // this.unReadSpotNum=  getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
		    });
		    this.getRoster();
			
			
			//  this.getChatList()
			// // this.arr= this.getChatList();
			// this.unReadSpotNum= getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			
			
			// this.messageNum= getApp().globalData.saveFriendList.length;
			// this.unReadNoticeNum= getApp().globalData.saveGroupInvitedList.length;
			// this.unReadTotalNotNum=getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
			// if (getApp().globalData.isIPX) {
			// 	 this.isIPX=true
			// }
		  }, 
		  methods: {
            ...mapMutations( ['setMsgList']), 
			onMenus(index){ 
				this.moreShow=false
				switch (index){
					case 0:
						//好友
						uni.navigateTo({
							url:'/pages/liveApp/chatUserList/chatUserList'
						})
						break;
					case 1:
						//黑名单
						break;
					case 2:
						//群聊
						uni.navigateTo({
							url:'/pages/liveApp/groups/groups?myName=' + uni.getStorageSync("myUsername")
						})
						break;
					default:
						break;
				}
				console.log("---menu"+index);
			},
			show(){  
				if(!this.uid||this.uid==0)return
				console.log("websocket is conn",getApp().globalData.conn.closed);
				
				console.log("WebIM  context",WebIM.conn.context.accessToken);
				console.log("WebIM  context3",uni.WebIM.conn.context.accessToken);
				console.log("WebIM  context4",wx.WebIM.conn.context.accessToken);
			 
				
				console.log("WebIM  token",WebIM.conn.token);
				console.log("WebIM  user",WebIM.conn.user);
				console.log("WebIM  netStatus",WebIM.conn.netStatus);
					
				if(wx.WebIM.conn.context.accessToken){ 
					this.getChatList();
					this.unReadSpotNum= getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
					this.messageNum= getApp().globalData.saveFriendList.length;
					this.unReadNoticeNum= getApp().globalData.saveGroupInvitedList.length;
					this.unReadTotalNotNum=getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
					if (getApp().globalData.isIPX) {
						 this.isIPX=true
					} 
				}  else{
					if( WebIM.conn.context.status==4000){
						getApp().globalData.conn.reconnect()
					}else{
						console.log("WebIM  reopen");
						getApp().globalData.conn.closed=true;
						getApp().globalData.conn.reopen()
					}
					
				}
				
				
				 
			},
		    listGroups() { 
		      return WebIM.conn.getGroup({
		        limit: 50,
		        success:  res => { 
		          uni.setStorage({
		            key: "listGroup",
		            data: res.data
		          }); 
			  
		          this.getChatList();
		        },
		        error: function (err) {
		          console.log(err);
		        }
		      });
		    }, 
		    getRoster() { 
		      let rosters = {
		        success: roster=> { 
		          var member = []; 
		          for (let i = 0; i < roster.length; i++) {
		            if (roster[i].subscription == "both") {
		              member.push(roster[i]);
		            }
		          }
		          uni.setStorage({
		            key: "member",
		            data: member
		          });
				  this.member=member 
		          this.listGroups(); //if(!systemReady){
		
		          disp.fire("em.main.ready"); //systemReady = true;
		          //}
		          // this.getChatList()
				  
				  
				  this.getChatList()
				  this.unReadSpotNum=getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum; 
		        },
		
		        error(err) {
		          console.log(err);
		        }
		
		      };
			   
		      WebIM.conn.getRoster(rosters);
		    },
		 
		    
			// 不包含陌生人版本
			getChatList() {
			  var array = [];
			  var member = uni.getStorageSync("member");
			  var myName = uni.getStorageSync("myUsername");
			  var listGroups = uni.getStorageSync('listGroup') || [];
			
			  for (let i = 0; i < member.length; i++) {
			    let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
			    let historyChatMsgs = uni.getStorageSync("rendered_" + member[i].name + myName) || [];
			    let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
			
			    if (curChatMsgs.length) {
			      let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
			      lastChatMsg.unReadCount = newChatMsgs.length;
			
			      if (lastChatMsg.unReadCount > 99) {
			        lastChatMsg.unReadCount = "99+";
			      }
			
			      let dateArr = lastChatMsg.time.split(' ')[0].split('-');
			      let timeArr = lastChatMsg.time.split(' ')[1].split(':');
			      let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
			      lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`;
			      lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`;
			      array.push(lastChatMsg);
			    }
			  }
			
			  for(let i = 0; i < listGroups.length; i++){
					let newChatMsgs = uni.getStorageSync(listGroups[i].groupid + myName) || [];
					let historyChatMsgs = uni.getStorageSync("rendered_" + listGroups[i].groupid + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if(curChatMsgs.length){
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if(lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = "99+";
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.groupName = listGroups[i].groupname
						array.push(lastChatMsg);
					}
				} 
			
			  array.sort((a, b) => {
			    return b.dateTimeNum - a.dateTimeNum;
			  });
			  console.log("--array---",array);
			  //获取聊天列表的用户账号
			  var uids=[]
			  array.map((item) =>{
			  	console.log("item",item);
			  	if(item.chatType == 'groupchat' || item.chatType == 'chatRoom'){
			  		  
			  		  	console.log("---group====");
			  	  }else if(item.username!=''){
			  		  uids.push(item.username.split(CHAT_PREFIX)[1]  )  
						
			  		  	console.log("single====");
			  	  } 
			  　}); 
			  var arr=array;
	console.log("=================",uids);
			  if(uids.length>0){
			  	//根据账号 获取用户属性 
			  	getSysUserInfo(uids).then(res=>{
			  			 var users=res;
			  			 try{
			  			 	users.forEach(user=>{
			  			 		array.forEach((item,index)=>{   
			  			 			if(user.uid==item.username.split(CHAT_PREFIX)[1] ){
			  			 				arr[index].avatar=user.avatar
			  			 				arr[index].nickname=user.nickname
			  			 				arr[index].phone=user.phone
			  			 				arr[index].real_name=user.real_name 
										
			  			 			}
			  			 		}) 
			  			 	})
							console.log("arr",arr);
			  				this.arr=arr   
							 return this.arr;
			  				//this.setMsgList(arr)
			  			 }catch(e){
			  			 	//TODO handle the exception 
			  			 } 
			  	})
			  }else{
				  this.arr=arr
				  return this.arr;
			  }
			 
			},
		     // 包含陌生人版本
		    getChatList2(){
			  
			  	console.log("getChatList=====1=======");
				var myName = uni.getStorageSync("myUsername"); 
				
				var listGroups = uni.getStorageSync('listGroup') || [];
				var array = []; 
				uni.getStorageInfo({
					success: (res)=>{ 
						
						let storageKeys = res.keys
						let newChatMsgKeys = [];
						let historyChatMsgKeys = [];
						storageKeys.forEach((item) => {
							if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
								newChatMsgKeys.push(item)
							}else if(item.indexOf(myName) > -1 && item.indexOf('rendered_') > -1){
								historyChatMsgKeys.push(item)
							}
						}) 
					  cul.call(this, newChatMsgKeys, historyChatMsgKeys)
					}
				})
		
				function cul(newChatMsgKeys, historyChatMsgKeys){
					let array = []
					let lastChatMsg; 
					for(let i = 0; i < historyChatMsgKeys.length; i++){
						let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9))
						if ( index > -1 ) {
							let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
							if(newChatMsgs.length){
								lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
								console.log("lastChatMsg",lastChatMsg);
								console.log("newChatMsgs",newChatMsgs);
								lastChatMsg.unReadCount = newChatMsgs.length;
								if(lastChatMsg.unReadCount > 99) {
									lastChatMsg.unReadCount = "99+";
								}
								let dateArr = lastChatMsg.time.split(' ')[0].split('-')
								let timeArr = lastChatMsg.time.split(' ')[1].split(':')
								let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
								lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
								lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
								newChatMsgKeys.splice(index, 1)
							}else{
								let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
								if (historyChatMsgs.length) {
									lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
									let dateArr = lastChatMsg.time.split(' ')[0].split('-')
									let timeArr = lastChatMsg.time.split(' ')[1].split(':')
									let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
									lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
									lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
								}
							}
						}else{
							let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
							if (historyChatMsgs.length) {
								lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
								let dateArr = lastChatMsg.time.split(' ')[0].split('-')
								let timeArr = lastChatMsg.time.split(' ')[1].split(':')
								let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
								lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
								lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
							}
							
						}
						lastChatMsg && array.push(lastChatMsg)
					}
		
					for(let i = 0; i < newChatMsgKeys.length; i++){
						let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
						if(newChatMsgs.length){ 
							lastChatMsg = newChatMsgs[newChatMsgs.length - 1]; 
							lastChatMsg.unReadCount = newChatMsgs.length;
							if(lastChatMsg.unReadCount > 99) {
								lastChatMsg.unReadCount = "99+";
							}
							let dateArr = lastChatMsg.time.split(' ')[0].split('-')
							let timeArr = lastChatMsg.time.split(' ')[1].split(':')
							let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
							lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
							lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
							array.push(lastChatMsg)
						}
					}
		
					array.sort((a, b) => {
						return b.dateTimeNum - a.dateTimeNum
					}) 
					// this.arr=array  
					//获取聊天列表的用户账号
					var uids=[]
					array.map((item) =>{
						console.log("item",item);
						if(item.chatType == 'groupChat' ||
					      item.chatType == 'chatRoom'){
							  
						  }else if(item.username!=''){
							  uids.push(item.username.split(CHAT_PREFIX)[1]  )  
						  }
							
					　}); 
					console.log("uids",uids);
					if(uids.length>0){
						//根据账号 获取用户属性
						getSysUserInfo(uids).then(res=>{
								 var users=res;
								 var arr=array;
								 try{
								 	users.forEach(user=>{
								 		array.forEach((item,index)=>{  
								 			if(user.uid==item.yourname.split(CHAT_PREFIX)[1] ){
								 				arr[index].avatar=user.avatar
								 				arr[index].nickname=user.nickname
								 				arr[index].phone=user.phone
								 				arr[index].real_name=user.real_name 
								 			}
								 		}) 
								 	})
									this.arr=arr   
									this.setMsgList(arr)
								 }catch(e){
								 	//TODO handle the exception 
								 } 
						})
					}
					
				 
					
				}
		    }, 
		    openSearch: function () {
				this.search_btn=false
				this.search_chats=true
				this.gotop=true 
		    },
		    onSearch: function (val) {
				if(!this.uid)return
		      // this.getChatList()
		      let searchValue = val.detail.value;
			  
		      let chartList = this.getChatList();
		      let serchList = [];
		      chartList.forEach((item, index) => {
		        if (String(item.username).indexOf(searchValue) != -1) {
		          serchList.push(item);
		        }
		      });
			  this.arr=serchList 
		     
		    },
		    cancel: function () {
				if(!this.uid)return
		      // this.getChatList()
			  this.search_btn=true 
			  this.search_chats=false 
			  
			  this.getChatList() 
			  this.unReadSpotNum=getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum 
			  this.gotop=false  
		    },
		    clearInput: function () {
				this.input_code='' 
				this.show_clear=false  
		    },
		    onInput: function (e) {
		      let inputValue = e.detail.value;
		
		      if (inputValue) {
				this.show_clear=true  
		      } else {
				this.show_clear=false   
		      }
		    }, 
		    close_mask: function () {
				this.search_btn=true 
				this.search_chats=false 
				this.show_mask=false  
		    }, 
		    into_chatRoom: function (event) {
		      let detail = JSON.parse(event.currentTarget.dataset.item); //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				console.log('detail', detail)
		      if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
		        this.into_groupChatRoom(detail);
		      } else {
		        this.into_singleChatRoom(detail);
		      }
		    },
		    //	单聊
		    into_singleChatRoom: function (detail) {
		      var my = uni.getStorageSync("myUsername");
		      var nameList = {
		        myName: my,
		        your: detail.username
		      };
			  uni.$emit('goChatRoom', nameList)
			  uni.navigateTo({
			  	url:"/pages/liveApp/chatroom/chatroom?username=" + JSON.stringify(nameList)
		      });
		    },
		    //	群聊 和 聊天室 （两个概念）
		    into_groupChatRoom: function (detail) {
		      var my = uni.getStorageSync("myUsername");
		      var nameList = {
		        myName: my,
		        your: detail.groupName,
		        groupId: detail.info.to
		      };
			  console.log("群聊", nameList);
			  uni.$emit('goChatRoom', nameList); 
			  uni.navigateTo({
			  	url:'/pages/liveApp/groupChatRoom/groupChatRoom?username=' + JSON.stringify(nameList)
			  }) 
		    },
		    del_chat: function (event) {
				if(!this.uid)return
		      let me = this
		      let detail = event.currentTarget.dataset.item;
		      let nameList;
		
		      if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
		        nameList = {
		          your: detail.info.to
		        };
		      } else {
		        nameList = {
		          your: detail.username
		        };
		      }
		
		      var myName = uni.getStorageSync("myUsername");
		      // var currentPage = getCurrentPages();
		      // console.log('currentPage>>',currentPage);
		      uni.showModal({
		        title: "删除该聊天记录",
		        confirmText: "删除",
		        success:  (res)=> {
		          if (res.confirm) {
		            uni.setStorageSync(nameList.your + myName, "");
		            uni.setStorageSync("rendered_" + nameList.your + myName, "");
		            
		            // if (currentPage[0]) {
		            //   console.log('currentPage[0]>>',currentPage[0]);
		            //   const val = currentPage[0]
		            //   val.onShow();
		            // }
					
		            this.getChatList()
		
		            disp.fire("em.chat.session.remove");
		          }
		        },
		        fail: function (err) {}
		      });
		    }
		  }
		};
		</script>
<style scoped>
@import "./chat.css";
.more-box{
	 transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	/* Internet Explorer 9*/
	-moz-transform: rotate(90deg);
	/* Firefox */
	-webkit-transform: rotate(90deg);
	/* Safari 和 Chrome */
	-o-transform: rotate(90deg);
	/* Opera */ 
}
.more_list{
	width: 320rpx;
	right: 0rpx;
	top: 70rpx;
	z-index: 1000;
	border-radius: 8rpx;
	border: 1px #dbd9d9  solid;
}
</style> 