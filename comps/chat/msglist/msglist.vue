<template>
  <view
    scroll-y="true"
    :class="view + ' wrap ' + (isIPX?'scroll_view_X': '')"
    @tap="onTap"
    upper-threshold="-50"
    :scroll-into-view="toView"
  > 
 
    <view class="message" v-for="(item,index) in chatMsg" :key="item.mid" :id="item.mid">
      <!-- <view class="time">
				<text class="time-text">{{ item.time }}</text>
      </view>-->
      <view class="main" :class="item.style">
        <view class="user">
          <!-- yourname：就是消息的 from -->
		<!--  <text v-if="index==chatMsg.length-1">{{item}}</text> -->
          <text class="user-text">{{ item.nickname + ' ' + item.time}}</text>
        </view>
        <image class="avatar" :src="item.avatar" />
        <view class="msg">
          <image
            class="err"
            :class="(item.style == 'self' && item.isFail) ?  'show' : 'hide'"
            src="/static/images/msgerr.png"
          />

          <image
            v-if="item.style == 'self'"
            src="/static/images/poprightarrow2x.png"
            class="msg_poprightarrow"
          />
          <image
            v-if="item.style == ''"
            src="/static/images/popleftarrow2x.png"
            class="msg_popleftarrow"
          />
          <view v-if="item.msg.type == 'img' || item.msg.type == 'video'">
            <image
              v-if="item.msg.type == 'img'"
              class="avatar"
              :src="item.msg.data"
              style="width:90px; height:120px; margin:2px auto;"
              mode="aspectFit"
              @tap="previewImage"
              :data-url="item.msg.data"
            />
            <!-- <video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/> -->
          </view>
          <audio-msg v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>
          <view v-else-if="item.msg.type == 'txt' || item.msg.type == 'emoji'">
            <view class="template" v-for="(d_item, d_index) in item.msg.data" :key="d_index">
              <text
				:data-msg="item"
				@tap="clickMsg"
                v-if="d_item.type == 'txt'"
                class="msg-text"
                style="float:left;"
              >{{ d_item.data }}</text>

              <image
                v-if="d_item.type == 'emoji'"
                class="avatar"
                :src="'/static/images/faces/' + d_item.data"
                style="width:25px; height:25px; margin:0 0 2px 0; float:left;"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- <view style="height: 1px;"></view> -->
</template>


<script>
import {getSysUserInfo,CHAT_PREFIX} from '@/utils/appIM.js'
let msgStorage = require("../msgstorage");
let disp = require("../../../utils/broadcast");
let LIST_STATUS = {
  SHORT: "scroll_view_change",
  NORMAL: "scroll_view"
};
let page = 0;
let Index = 0;
let curMsgMid = '';
let isFail = false;
import audioMsg from "./type/audio/audio";

	import {
		mapGetters
	} from "vuex";

export default {
  data() {
    return {
      view: LIST_STATUS.NORMAL,
      toView: "",
      chatMsg: [],
      __visibility__: false,
      isIPX: false
    };
  },
  computed: mapGetters(['userInfo']),
  components: {
    audioMsg
  },
  props: {
    username: {
      type: Object,
      default: () => ({})
    }
  },

  // lifetimes
  created() {},

  beforeMount() {
    this.__visibility__ = true;
    page = 0;
    Index = 0;
  },

  moved() {},

  destroyed() {
    this.__visibility__ = false;
	msgStorage.off("newChatMsg", this.dispMsg)
  },

  mounted(event) {
    let me = this;
    if (getApp().globalData.isIPX) {
      this.setData({
        isIPX: true
      });
    }
	
	this.username = uni.username;
    let username = this.username;
    let myUsername = uni.getStorageSync("myUsername");
    let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
    let chatMsg = uni.getStorageSync(sessionKey) || [];
    this.renderMsg(null, null, chatMsg, sessionKey);
    uni.setStorageSync(sessionKey, null);
    disp.on('em.error.sendMsgErr', function (err) {
      curMsgMid = err.data.mid;
      isFail = true;
      console.log('发送失败了');
	  return;
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      if (me.curChatMsg[0].mid == curMsgMid) {
        me.curChatMsg[0].msg.data[0].isShow = false;
        me.curChatMsg[0].isShow = false;
      }

      uni.setStorageSync("rendered_" + sessionKey, msgList);
    });
    msgStorage.on("newChatMsg", this.dispMsg);
  },

  methods: {
    normalScroll() {
      this.setData({
        view: LIST_STATUS.NORMAL
      });
    },
	dispMsg(renderableMsg, type, curChatMsg, sesskey) {
	  let me = this;
	  let username = this.username;
	  let myUsername = uni.getStorageSync("myUsername");
	  let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
	  me.curChatMsg = curChatMsg;
	  
	  if (!me.__visibility__) return; // 判断是否属于当前会话
	
	console.log('renderableMsg',renderableMsg);
	  if (username.groupId) {
	    // 群消息的 to 是 id，from 是 name
	    if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
	      if (sesskey == sessionKey) {
	        me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
	      }
	    }
	  } else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
	    if (sesskey == sessionKey) {
	      me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
	    }
	  }
	},
    shortScroll() {
      this.setData({
        view: LIST_STATUS.SHORT
      });
    },

    onTap() {
      this.$emit("msglistTap", null, {
        bubbles: true
      });
    },

    previewImage(event) {
      var url = event.target.dataset.url;
      uni.previewImage({
        urls: [url] // 需要预览的图片 http 链接列表

      });
    },

    getHistoryMsg() {
		console.log("=======下拉刷新==========");
      let me = this;
      let username = this.username;
      let myUsername = uni.getStorageSync("myUsername");
      let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
      let historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];

      if (Index < historyChatMsgs.length) {
        let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
        this.setData({
          chatMsg: timesMsgList.concat(me.chatMsg),
          toView: timesMsgList[timesMsgList.length - 1].mid
        });
        Index += timesMsgList.length;

        if (timesMsgList.length == 10) {
          page++;
        }

        uni.stopPullDownRefresh();
      }
    },

    renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew) {
      let me = this; 
      var historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || []; 
      // if (curChatMsg.length) {
      // 	console.log(curMsgMid.substring(curMsgMid.length - 10) , curChatMsg[0].mid.substring(curChatMsg[0].mid.length - 10))
      // }
      // if(curChatMsg.length && curMsgMid.substring(curMsgMid.length - 10) == curChatMsg[curChatMsg.length - 1].mid.substring(curChatMsg[0].mid.length - 10)){
      // 	//curChatMsg[curChatMsg.length - 1].msg.data[0].isSuc = true
      // 	curChatMsg[curChatMsg.length - 1].isSuc = true
      // }

      historyChatMsgs = historyChatMsgs.concat(curChatMsg); //console.log('当前历史',renderableMsg)
      //console.log('历史消息', historyChatMsgs)

      if (!historyChatMsgs.length) return;

      if (isnew == 'newMsg') { 
		this.chatMsg=this.chatMsg.concat(curChatMsg);
		 // 跳到最后一条
		this.toView=historyChatMsgs[historyChatMsgs.length - 1].mid
		
        // this.setData({
        //   chatMsg: this.chatMsg.concat(curChatMsg),
        //   // 跳到最后一条
        //   toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        // });
		
      } else {
        this.setData({
          chatMsg: historyChatMsgs.slice(-10),
          // 跳到最后一条
          toView: historyChatMsgs[historyChatMsgs.length - 1].mid
        });
      } 
	  //历史消息
	  console.log("historyChatMsgs",historyChatMsgs);
	  if(historyChatMsgs.length>0){
	  		  var uids=historyChatMsgs.map((item) =>{
	  		  	return item.yourname.split(CHAT_PREFIX)[1] 
	  		   });
	  		  getSysUserInfo(uids).then(res=>{ 
	  		  		 var users=res;
	  		  		 var arr=historyChatMsgs;
	  		  		 try{
	  		  		 	users.forEach(user=>{
	  		  		 		historyChatMsgs.forEach((item,index)=>{  
	  		  		 			if(user.uid==item.yourname.split(CHAT_PREFIX)[1] ){
	  		  		 				arr[index].avatar=user.avatar
	  		  		 				arr[index].nickname=user.nickname
	  		  		 				arr[index].phone=user.phone
	  		  		 				arr[index].real_name=user.real_name 
	  		  		 			}
	  		  		 		})
	  						uni.setStorageSync("rendered_" + sessionKey, historyChatMsgs); 
							this.$forceUpdate()
	  		  		 	})
	  		  		 }catch(e){
	  		  		 	//TODO handle the exception 
	  		  		 } 
	  		  })
	  }else{
		uni.setStorageSync("rendered_" + sessionKey, []);
	  }
      let chatMsg = uni.getStorageSync(sessionKey) || [];
      chatMsg.map(function (item, index) {
        curChatMsg.map(function (item2, index2) {
          if (item2.mid == item.mid) {
            chatMsg.splice(index, 1);
          }
        });
      });  
      uni.setStorageSync(sessionKey, chatMsg);
      Index = historyChatMsgs.slice(-10).length;
	  // setTimeout 兼容支付宝小程序
	  setTimeout(() => {
		  uni.pageScrollTo({
		    scrollTop: 5000,
		    duration: 300,
		  		fail: (e) => {
		  			//console.log('滚失败了', e)
		  		}
		  });
	  }, 100)
      
      if (isFail) {
		  console.log("=============file====");
        this.renderFail(sessionKey);
      }
    },

    renderFail(sessionKey) {
      let me = this;
      let msgList = me.chatMsg;
      msgList.map(item => {
        if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
          item.msg.data[0].isFail = true;
          item.isFail = true;
          me.setData({
            chatMsg: msgList
          });
        }
      });

      if (me.curChatMsg[0].mid == curMsgMid) {
        me.curChatMsg[0].msg.data[0].isShow = false;
        me.curChatMsg[0].isShow = false;
      }

      uni.setStorageSync("rendered_" + sessionKey, msgList);
      isFail = false;
    },
	
	clickMsg(event){
		// console.log('点击邀请消息', event.target.dataset.msg)
		if(typeof(event.target.dataset.msg) == 'object' && 
			event.target.dataset.msg.msg.ext && 
			event.target.dataset.msg.msg.ext.msg_extension){
			this.$emit("clickMsg", event.target.dataset.msg.msg.ext)
		}
	}

  }
};
</script>
<style>
@import "./msglist.css";
</style>