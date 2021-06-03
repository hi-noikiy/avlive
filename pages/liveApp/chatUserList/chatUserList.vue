<template>
	<view>
		<!-- 左侧列表内容部分 -->
		<scroll-view :class="'content ' + (gotop? (isIPX? 'goTopX': 'goTop'): 'goback')" enable-back-to-top :scroll-into-view="toView" scroll-y="true" scroll-with-animation="true" > 
			
			<u-cell-group>
				<u-cell-item icon="account-fill" title="添加好友" @click="addNewFriend"></u-cell-item> 
				<u-cell-item icon="account-fill" title="新的朋友" @click="NewFriend"></u-cell-item> 
			<!-- 	<u-cell-item  icon="account-fill" title="群组"  @click="goGroup"></u-cell-item> -->
			</u-cell-group>
			<view v-for="(group, id) in listMain" :key="id" :id="'inToView'+group.id" :data-id="group.id">
			  <view class="address_top">{{group.region}}</view>  
				<view v-for="(item, brandId) in group.brands" :key="brandId" :data-username="item.name" :data-account="item.account" @tap.stop="delete_friend"> 
					<swipe-delete>
						<view class="tap_mask" @tap.stop="into_room" :data-username="item.name" :data-account="item.account">
							<view class="address_bottom" :data-username="item.name" :data-account="item.account" @tap.stop="into_room">
								<image :src="item.avatar" @tap.stop="into_room" :data-username="item.name" :data-account="item.account"></image>
								<text @tap.stop="into_room" :data-username="item.name" :data-account="item.account">{{item.name}}</text>
							</view>
						</view>
					</swipe-delete>
				</view> 
			</view> 
		  </scroll-view> 
		  <!-- 右侧字母导航 -->
		  <view class="orientation_region"> 
				 <block v-for="(item, id) in listMain" :key="id"> 
					<view :class="'orientation_city ' + (isActive==item.id ? 'active':'' )" @tap="scrollToViewFn" :data-id="item.id">{{item.region}}</view> 
				</block> 
		  </view>  
	</view>
	
</template>

<script>
	let WebIM = require("@/utils/WebIM")["default"];
	let disp = require("@/utils/broadcast");
import swipeDelete from "@/comps/swipedelete/swipedelete";
let systemReady = false;
let oHeight = [];
import {getSysUserInfo,CHAT_PREFIX} from '@/utils/appIM.js'
	export default {
		components: {
		  swipeDelete
		},
		data() {
			return {
			  toView: 'inToView0',
			  oHeight: [],
				member: [],
				isActive: null,
				listMain: [],
				  isIPX: false,
				  gotop: false, 
				  myName:''
				
			}
		},
		onLoad() { 
			this.myName=uni.getStorageSync("myUsername"); // 获取当前用户名, 
			const me = this;
			disp.on("em.contacts.remove", function (message) {
			   me.getRoster();
			});  
			
			disp.on("em.subscribed", function () {
			  me.getRoster();
			});
			// 监听被解除好友
			disp.on("em.unsubscribed", function(){
			  me.getRoster();
		    });
			
		},
		mounted(){
			this.getRoster();
		},
		onShow() {
			if(getApp().globalData.isIPX){
				this.isIPX=true
			}
			
		},
		methods: {
			addNewFriend(){
				uni.navigateTo({
					url:'/pages/liveApp/add_new/add_new'
				})
			},
			NewFriend(){
				uni.navigateTo({
					url:'/pages/liveApp/newfriendDetail/newfriendDetail'
				})
			},
			goGroup(){
				uni.navigateTo({
					url:'/pages/liveApp/groups/groups?myName=' + this.myName
				})
			},
		  	getRoster() {
			  let me = this;
			  let rosters = {
			    success(roster) {
					console.log("roster",roster);
			      var member = []; 
			      for (let i = 0; i < roster.length; i++) {
			        if (roster[i].subscription == "both") {
			          member.push(roster[i]);
			        }
			      }
				  if(member.length>0){
					 var uids=member.map((item) =>{
						return item.name.split(CHAT_PREFIX)[1] 
					 });
					getSysUserInfo(uids).then(res=>{ 
						
							var users=res;
							var arr=member;
						try{
							users.forEach(user=>{
								member.forEach((item,index)=>{  
									if(user.uid==item.name.split(CHAT_PREFIX)[1] ){
										arr[index].avatar=user.avatar
										arr[index].nickname=user.nickname
										arr[index].phone=user.phone
										arr[index].real_name=user.real_name 
									}
								})
							})
						}catch(e){
							//TODO handle the exception 
						}
						 
						uni.setStorage({
						  key: "member",
						  data: arr
						});
						me.setData({
						  member: arr
						});
						
						if (!systemReady) {
						  disp.fire("em.main.ready");
						  systemReady = true;
						}
									
						me.getBrands(arr);
					}).catch(err=>{
						
					}) 
				  } 
			    }, 
			    error(err) {
			      console.log("[main:getRoster]", err);
			    }
			
			  }; 
			  WebIM.conn.getRoster(rosters);
			},
			moveFriend: function (message) {
				console.log("moveFriend==============");
			  let me = this;
			  let rosters = {
			    success: function (roster) {
			      var member = [];
			
			      for (let i = 0; i < roster.length; i++) {
			        if (roster[i].subscription == "both") {
			          member.push(roster[i]);
			        }
			      }
			
			      me.setData({
			        member: member
			      });
			    }
			  };
			
			  if (message.type == "unsubscribe" || message.type == "unsubscribed") {
			    WebIM.conn.removeRoster({
			      to: message.from,
			      success: function () {
			        WebIM.conn.unsubscribed({
			          to: message.from
			        });
			        WebIM.conn.getRoster(rosters);
			      }
			    });
			  }
			},
			handleFriendMsg: function (message) {
			  uni.showModal({
			    title: "添加好友请求",
			    content: message.from + "请求加为好友",
			    success: function (res) {
			      if (res.confirm == true) {
			        WebIM.conn.subscribed({
			          to: message.from,
			          message: "[resp:true]"
			        });
			        WebIM.conn.subscribe({
			          to: message.from,
			          message: "[resp:true]"
			        });
			      } else {
			        WebIM.conn.unsubscribed({
			          to: message.from,
			          message: "rejectAddFriend"
			        });
			      }
			    },
			    fail: function (err) {}
			  });
			},
			delete_friend: function (event) {
			  const me = this;
			  var delName = event.currentTarget.dataset.username;
			  var myName = uni.getStorageSync("myUsername"); // 获取当前用户名
			
			  uni.showModal({
			    title: "确认删除好友" + delName,
			    cancelText: "取消",
			    confirmText: "删除",
			
			    success(res) {
			      if (res.confirm == true) {
			        WebIM.conn.removeRoster({
			          to: delName,
			        });
			        uni.showToast({
			            	title: "删除成功",
			            });
							// 删除好友后 同时清空会话
							uni.setStorageSync(delName + myName, "");
							uni.setStorageSync("rendered_" + delName + myName, "");
							me.getRoster();
							disp.fire('em.main.deleteFriend')
			      }
			    }
			
			  });
			},
			//点击右侧字母导航定位触发
			scrollToViewFn: function (e) {
			  let that = this;
			  let _id = e.target.dataset.id;

			  for (let i = 0; i < that.listMain.length; ++i) {
				if (that.listMain[i].id === _id) {
				  that.setData({
					isActive: _id,
					toView: 'inToView' + _id
				  });
				  break;
				}
			  }
			},
			// 处理数据格式，及获取分组高度
			getBrands: function (member) {
			  const that = this;
			  const reg = /[a-z]/i;
			
			  member.forEach(item => {
			    if (reg.test(item.nickname.substring(0, 1))) {
			      item.initial = item.nickname.substring(0, 1).toUpperCase();
			    } else {
			      item.initial = '#';
			    }
			  });
			  member.sort((a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0));
			  var someTtitle = null;
			  var someArr = [];
			
			  for (var i = 0; i < member.length; i++) {
			    var newBrands = {
			      brandId: member[i].jid,
			      account: member[i].name,
			      name: member[i].nickname,
				  avatar: member[i].avatar,
			    };
			
			    if (member[i].initial == '#') {
			      if (!lastObj) {
			        var lastObj = {
			          id: i,
			          region: '#',
			          brands: []
			        };
			      }
			
			      lastObj.brands.push(newBrands);
			    } else {
			      if (member[i].initial != someTtitle) {
			        someTtitle = member[i].initial;
			        var newObj = {
			          id: i,
			          region: someTtitle,
			          brands: []
			        };
			        someArr.push(newObj);
			      }
			
			      newObj.brands.push(newBrands);
			    }
			  } 
			  someArr.sort((a, b) => a.region.charCodeAt(0) - b.region.charCodeAt(0));
			
			  if (lastObj) {
			    someArr.push(lastObj);
			  }
			  //赋值给列表值
			  that.setData({
			    listMain: someArr
			  }); //赋值给当前高亮的isActive 
			  that.setData({
			    isActive: someArr.length > 0 ? someArr[0].id : '',
			  }); //计算分组高度,uni.createSelectotQuery()获取节点信息
			
			  let number = 0;
			
			  for (let j = 0; j < someArr.length; ++j) {
			    const query = uni.createSelectorQuery().in(this)
			    query.select(`#inToView${someArr[j].id}`).boundingClientRect(rect => {
			      if (rect) {
			         number = rect.height + number;
			      var newArry = [{
			        'height': number,
			        'key': rect.dataset.id,
			        "name": someArr[j].region
			      }];
			      oHeight = oHeight.concat(newArry);
			      }else{
			        this.$nextTick(()=>{
			          //this.getBrands(member)
			        })
			      }
			    }).exec();
			  }
			},
			//进入聊天室
			into_room: function (event) {
			  var nameList = {
			    myName: uni.getStorageSync("myUsername"), // 获取当前用户名, 
				your: event.target.dataset.account,
			    nickname: event.target.dataset.username
			  };
			  console.log("----",nameList);
			  uni.navigateTo({
			    url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
			  });
			},
			
		}
	}
</script>

<style>
.content{ 
	/* box-sizing: border-box; 
	height: 100%;
	width: 100%;
	position: fixed; */
} 

.orientation_region{
	padding: 10rpx 0px; 
	width: 28rpx;
	font-size: 20rpx;
	position: fixed;
	top: 50%;
	right: 0;
	transform:translate(0,-50%);
	border-radius: 10px
} 
.orientation_city{
	height: 24rpx;
	width: 24rpx;
	line-height: 24rpx;
	font-size: 18rpx;
	color: #000;
	text-align: center;
} 
.active{
	color: #fff;
	background-color: #0873DE;
	border-radius: 50%;
}
.tap_mask{
	width: 100%;
	overflow: hidden;
}
.address_top{
	height:40rpx;
	line-height:40rpx;
	background:#FAFAFA;
	color:#9B9B9B;
	font-size:20rpx;
	padding:0 32rpx;
} 
.address_bottom{
	height: 108rpx;
	line-height: 108rpx;
	background: #fff;
	color: #000000;
	font-size: 34rpx;
	border-bottom: 0.5px #E5E5E5 solid;
	margin: 0;
	display: flex;
	align-items: center;
} 
.address_bottom image{
	width: 72rpx;
	height: 72rpx;
	margin-right: 24rpx;
	margin-left: 24rpx;
}
.address_bottom text{
	overflow: hidden;
	text-overflow: ellipsis;
	flex: 1;
}  
</style>
