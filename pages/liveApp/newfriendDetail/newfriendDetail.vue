<template>
<view class="inform">

	<text class="defaultText" v-if="!friendList.length > 0">暂时没有新的通知</text>

	<view v-for="(item, from) in friendList" :key="from" class="itemBar">

		<view class="notInfoDetContent">
			<view class="headContent">
				<image :src="item.avatar"></image>
			</view>
			<view class="infoContent">
				<text class="itemName">{{ item.nickname }}</text>
				<text>申请添加您为好友</text>
			</view>
		</view> 
		<view class="buttonContent">
			<view v-if="!item.typeText" :data-from="item.from" class="rejectBtn" @tap="reject">拒绝</view>
			<view v-if="!item.typeText" class="centerLine"></view>
			<view v-if="!item.typeText" :data-from="item.from" class="agreeBtn" @tap="agree">同意</view>
			<view v-if="item.typeText" class="actionDone">{{ item.typeText }}</view>
		</view>

	</view>
</view>
</template>

<script>
var WebIM = require("@/utils/WebIM")["default"];
let disp = require("@/utils/broadcast"); // 好友邀请提醒
import {getUserById} from '@/api/webIM'
import {CHAT_PREFIX} from '@/utils/appIM.js'
export default {
  data() {
    return {
      friendList: [],
      myName: ""
    };
  },

  components: {},
  props: {},

  onLoad(options) {
    var me = this; 
    disp.on("em.subscribe",  ()=> { 
		var list=getApp().globalData.saveFriendList; 
		var uids=[]
		list.map((item) =>{
			if(!item.groupName && item.from!=''){
				uids.push(item.from.split(CHAT_PREFIX)[1] )
			} 
		　});
		if(uids.length>0){ 
			getUserById(uids.join(',')).then(res=>{
				console.log(res);
				if(res.status==200 && res.data){
					var users=res.data||[];
					var arr=list;
					users.forEach((user)=>{
						list.forEach((item,index)=>{
							if(user.uid==item.from.split(CHAT_PREFIX)[1] ){
								arr[index].avatar=user.avatar
								arr[index].nickname=user.nickname
								arr[index].phone=user.phone
								arr[index].real_name=user.real_name 
							}
						})
					})
					this.friendList=arr;
					uni.setStorageSync("friendNotiData", arr); 
				} 
			}).catch(err=>{
				
			}) 
		} 
    });
	this.friendList=uni.getStorageSync("friendNotiData");
	this.myName=uni.getStorageSync("myUsername") 
	
	console.log("friendList",this.friendList);
  },

  methods: {
    removeAndRefresh(removeId) {
      var idx;
      this.friendList.forEach(function (v, k) {
        if (v.from === removeId) {
          idx = k;
        }
      });
      this.friendList.splice(idx, 1);
      getApp().globalData.saveFriendList.splice(idx, 1); // if(!this.data.friendList.length){
      // 	uni.navigateBack({
      // 		url: "../main/main?myName=" + this.data.myName
      // 	});
      // }
      // else{
      // 	this.setData({
      // 		friendList: this.data.friendList
      // 	});
      // }
    },

    agree(event) {
      var me = this; 
      // 同意（无回调）
      WebIM.conn.subscribed({
        to: event.currentTarget.dataset.from,
        message: "[resp:true]"
      }); 
      this.friendList.forEach(item => {
        if (item.from == event.currentTarget.dataset.from) {
          item.type = 'subscribed';
          item.typeText = '已同意';
          uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;

          this.setData({
            friendList: this.friendList
          });
        }
      });
      this.removeAndRefresh(event.currentTarget.dataset.from);
      this.getRoster();
    },

    getRoster() {
      let me = this;
      let rosters = {
        success(roster) {
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
        },

        error(err) {
          console.log(err);
        }

      };
      WebIM.conn.getRoster(rosters);
    },

    reject(event) {
      var me = this; // 无回调

      WebIM.conn.unsubscribed({
        to: event.currentTarget.dataset.from,
        message: "rejectAddFriend"
      });
      this.friendList.forEach(item => {
        if (item.from == event.currentTarget.dataset.from) {
          item.type = 'unsubscribed';
          item.typeText = '已拒绝';
          uni.setStorageSync("friendNotiData", this.friendList); //getApp().globalData.saveFriendList = this.data.friendList;

          this.setData({
            friendList: this.friendList
          });
        }
      });
      this.removeAndRefresh(event.currentTarget.dataset.from);
    }

  }
};
</script>
<style>
@import "./friendDetail.css";
</style>