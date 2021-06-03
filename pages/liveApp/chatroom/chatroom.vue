<template>
<chat id="chat" :username="username" ref="chat" chatType="singleChat"
 @onMakeVideoCall="makeVideoCall" 
 @onClickInviteMsg="onClickMsg"></chat>
</template>

<script>
let disp = require("@/utils/broadcast");
import chat from "@/comps/chat/chat.vue"; 

export default {
  data() {
    return {
      username: {
        your: ""
      }
    };
  },

  components: {
    chat
  },
  props: {},
  // options = 系统传入的 url 参数
  onLoad(options) { 
    let username = JSON.parse(options.username);
	this.username=username; 
	// 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下
	uni.username = username;
    uni.setNavigationBarTitle({
      title: username.nickname
    });
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    this.$refs.chat.getMore();
    // 停止下拉动作
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: { 
	  	makeVideoCall(data){ 
	  		console.log("index==================>",data); 
	  		console.log("index==================>",this.username); 
			
			
	  		// uni.navigateTo({
	  		//   url: "../emedia/index?srcData="+JSON.stringify(data)
	  		// });
			
			data.confrMember=[this.username.your]
			data.groupId=new Date().getTime()
			
			uni.navigateTo({
				url:'/pages/emediaToOne/index?srcData='+JSON.stringify(data)
			})
	  		// let subNVue = uni.getSubNVueById('drawer')
	  		// subNVue.show('fade-out', 200)
	  		// uni.$emit('page-popup', {
	  		// 	state: 201,
	  		// 	room:{
	  		// 		id: 'LBJ13H05522QATH0DW164400C69796', //this.confrId,
	  		// 		pwd:this.pwd||''
	  		// 	},
	  		// 	desp: "开始初始化nvue",
	  		// })
	  	},
	  onClickMsg(msg){
		msg.action = 'join'
		uni.navigateTo({
			url:'/pages/emediaToOne/index?srcData='+JSON.stringify(msg)
		}) 
	  }
	  
  }
};
</script>
<style>
@import "./chatroom.css";
</style>