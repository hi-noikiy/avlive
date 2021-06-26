<template>
<view class="page">  
	<view class="search" v-if="search_btn">
		<view @tap="openSearch">
			<icon type="search" size="13"></icon>
			<text>请输入好友用户名</text>
		</view>
	</view>

	<view class="search_input" v-if="search_chats">
		<view>
			<icon type="search" size="13"></icon>
			<input placeholder="请输入好友用户名" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
					auto-focus confirm-type="Search" type="text" @confirm="find_friend" @input="onInput" :value="input_code">
				<icon type="clear" size="13" @tap.stop="clearInput" v-if="show_clear"></icon>
		</view>
		<text @tap="cancel">取消</text>
	</view>

	<view class="address_bottom" v-if="show_clear">
		<image src="/static/images/theme2x.png" data-username="1"></image>
		<text>{{friend_name}}</text>
		<button @tap="find_friend" :disabled="isdisable">查找好友</button>
	</view>
	<view class="">
		<u-cell-group v-if="sysUser.length>0" >
			<u-cell-item :icon="item.avatar" :label="'真实姓名:'+item.real_name" :title="item.nickname" value="点击添加" @click="addNewFriend" v-for="(item,index) in sysUser" :key="index" :index="index"></u-cell-item>  
		</u-cell-group>
		<!-- <view v-if="sysUser.length>0">
			<view class="" v-for="(item,index) in sysUser" :key="index" :index="index" @click="addNewFriend">
				真实姓名：{{item.real_name}}
			</view>
		</view> -->
	</view> 
	<view class="add_nobody" v-if="!show_clear">{{tips}}</view>
	<view class="add_nobody" v-else-if="isShowResult">{{tips2}}</view>
</view>
</template>

<script>
let WebIM = require("@/utils/WebIM")["default"];
import {CHAT_PREFIX} from '@/utils/appIM.js'
import {findHXAccountByName} from '@/api/webIM'
export default {
  data() {
    return {
		tips:'请输入好友的username,申请成为好友吧',
		tips2:'没有找到该用户',
      friend_name: "",
      search_btn: true,
      search_chats: false,
      show_clear: false,
      isdisable: false,
      input_code: "",
	  sysUser:[],
	  isShowResult:false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let app = getApp().globalData;
  },
  methods: {
    openSearch: function () {
      this.setData({
        search_btn: false,
        search_chats: true
      });
    },
    onInput: function (e) {
      let inputValue = e.detail.value; 
	  
      if (inputValue) {
		this.isShowResult=false; 
        this.setData({
          show_clear: true,
          friend_name: inputValue,
          isdisable: false
        });
      } else {
        this.setData({
          show_clear: false
        });
      }
    },
    clearInput: function () {
      this.setData({
        input_code: '',
        show_clear: false
      });
    },
    cancel: function () {
      this.setData({
        search_btn: true,
        search_chats: false,
        show_clear: false
      });
    },
	//查找好友
    find_friend: function () {
      let me = this;
      let myName = uni.getStorageSync("myUsername");
      if (me.friend_name == "" || me.friend_name.toLowerCase() == myName.toLowerCase()) {
        uni.showToast({title: "添加失败"});
        return;
      }
	  console.log("===", WebIM.conn);
	  findHXAccountByName(me.friend_name).then(res=>{
		  console.log("======",res);
		  if(res.status==200 && res.data.length>0){
			  console.log(res.data)
			  this.sysUser=res.data||[]
		  }else{
			  this.isShowResult=true; 
		  }
	  }).catch(err=>{
		   uni.showToast({title:err});
	  }) 
    },
	// 添加好友
	addNewFriend(index){
		let me = this;
		var user=this.sysUser[index]
		let myName = uni.getStorageSync("myUsername");
		console.log(index)
		console.log(user)
		WebIM.conn.subscribe({
			to: CHAT_PREFIX+user.uid,
			message: myName + '请求添加好友'
		});
		  let rosters = {
			success: function (roster) {
			  console.log('success');
			  var member = []; 
			  for (let i = 0; i < roster.length; i++) {
				if (roster[i].subscription == "both") {
				  member.push(roster[i]);
				}
			  }
				console.log("member",member);
			  if (me.isExistFriend(CHAT_PREFIX+user.uid, member)) {
				uni.showToast({
						title: "已经是你的好友",
					});
			  } else {
				 uni.showToast({
						title: "已经发出好友申请",
					});
			  }
	
			  me.setData({
				isdisable: true
			  });
			}
		  };
		  WebIM.conn.getRoster(rosters);
	},
    isExistFriend: function (name, list) {
      for (let index = 0; index < list.length; index++) {
        if (name == list[index].name) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>
<style scoped>
@import "./add_new.css";
page{background-color: #fff;}
</style>