<template>
	<view class="new-users copy-data" :style="{height:pageHeight}">
		<view class="top">
			<!-- #ifdef MP || APP-PLUS -->
			<view class="sys-head">
				<view class="sys-bar" :style="{height:sysHeight}"></view>
				<!-- #ifdef MP -->
				<view class="sys-title">个人中心</view>
				<!-- #endif -->
				
				<view class="bg"></view>
			</view>
			<!-- #endif -->
		</view>
		<view class="mid" style="flex:1;overflow: hidden;">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="head">
					<view class="user-card">
						<view class="bg"></view>
						<view class="user-info">
							<view>
								<!-- 注释这个是加的bnt -->
								<!-- #ifdef H5 -->
								<button class="bntImg" v-if="userInfo.is_complete == 0 && isWeixin" @click="getWechatuserinfo">
									<image class="avatar" src='/static/images/f.png'></image>
									<view class="avatarName">获取头像</view>
								</button>
								<!-- #endif -->
								<!-- #ifdef MP -->
								<button class="bntImg" v-if="userInfo.is_complete == 0" open-type='getUserInfo' @getuserinfo="getRoutineUserInfo">
									<image class="avatar" src='/static/images/f.png'></image>
									<view class="avatarName">获取头像</view>
								</button>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS -->
								<view v-else class="avatar-box" :class="{on:userInfo.is_money_level}">
									<image class="avatar"  :src='userInfo.avatar' v-if="userInfo.avatar" @click="goEdit()"></image>
									<image v-else class="avatar" src="/static/images/f.png" mode="" @click="goEdit()"></image>
									<view class="headwear" v-if="userInfo.is_money_level"><image src="/static/images/headwear.png"></image></view>
								</view>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<view class="avatar-box" :class="{on:userInfo.is_money_level}">
									<image class="avatar" :src='userInfo.avatar' v-if="userInfo.avatar" @click="goEdit()"></image>
									<image v-else class="avatar" src="/static/images/f.png" mode="" @click="goEdit()"></image>
									<view class="headwear" v-if="userInfo.is_money_level"><image src="/static/images/headwear.png"></image></view>
								</view>
								<!-- #endif -->
							</view>
	
							<view class="info">
								<!-- #ifdef MP -->
								<view class="name" v-if="!userInfo.uid" @tap="openAuto" style="height: 100%; display: flex; align-items: center;">
									请点击授权
								</view>
								<!-- #endif -->
								<!-- #ifdef H5 -->
								
								<view class="name" v-if="!userInfo.uid && isWeixin" @tap="openAuto" style="height: 100%; display: flex; align-items: center;">
									请点击授权
								</view> 
								<view class="name" v-if="!userInfo.uid && !isWeixin" @tap="goEdit()" style="height: 100%; display: flex; align-items: center;">
									未登录
								</view> 
								<!-- #endif --> 
								<!-- #ifdef APP-PLUS -->
								<view class="name" v-if="!userInfo.uid" @tap="goEdit()" style="height: 100%; display: flex; align-items: center;">
									未登录
								</view> 
								<!-- #endif --> 
								<view class="name" v-if="userInfo.uid">
									{{userInfo.nickname}} &nbsp; &nbsp;ID：{{userInfo.uid}}
									<image class="live" :src="userInfo.vip_icon" v-if="userInfo.vip_icon"></image>
									<view class="vip" v-if="userInfo.is_money_level> 0 && userInfo.svip_open">
										<image src="/static/images/svip.png"></image>
									</view>
								</view> 
								<view class="num" v-if="userInfo.phone" @click="goEdit()">
									<view class="num-txt"> 10粉丝&nbsp;&nbsp;|&nbsp;&nbsp; 8关注</view>
									<!-- <view class="icon">
										<image src="/static/images/edit.png" mode=""></image>
									</view> -->
								</view>
								<view class="phone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">绑定手机号</view>
							</view>
							<view class="message">
								<navigator url="/pages/users/message_center/index" hover-class="none">
									<view v-if="userInfo.service_num" class="num">{{userInfo.service_num >= 100 ? '99+' : userInfo.service_num}}</view>
									<view class="iconfont icon-s-kefu"></view>
								</navigator>
							</view> 
							<!-- #ifdef MP -->
							<view class="setting" @click="Setting"><text class="iconfont icon-shezhi"></text></view>
							<!-- #endif -->
	
						</view>
						
						<view class="u-flex white mt-20">
							<text class="mr-20">技能标签</text> 
							<text class="mr-10 mb-10">
								<u-tag text="主持人" mode="light" shape="circle" border-color="#eee" bg-color="#fff" color="#333" /> 
							</text>
							<text class="mr-20 mb-10">
								<u-tag text="游戏" mode="light" shape="circle" border-color="#eee" bg-color="#fff" color="#333" /> 
							</text> 
							<text class="mr-10 mb-10" >
								<u-icon name="plus"></u-icon>
							</text>  
						</view>
						<view class="u-flex mt-10 u-row-between">
							<view class="white line-h-40">
								个性签名：这个家伙很懒，什么都没留下 
							</view>
							<view class="u-flex u-flex-col  white u-col-bottom" style="width: 210rpx;">
								<view class="tr">信用值：9997</view>
								<view class="tr mt-10">等级:44级</view>
							</view>
						</view> 
						<!-- <view class="sign" @click="goSignIn">签到</view> -->
					</view> 
				</view> 
				<!-- 会员菜单 -->
				<u-gap height="40" ></u-gap>
				<view class="wrap">
					使用工具
				</view>
				<u-gap height="10" ></u-gap>
				<view class="menuBox">
					<u-grid :col="5" :border="false">
						<u-grid-item v-for="(item,index) in tools" :key="index" @click='work(item.url)'>
							<u-icon name="photo" :size="46"></u-icon>
							<view class="grid-text mt-10">{{item.title}}</view>
						</u-grid-item> 
					</u-grid>
				</view>  
				<view class="wrap mt-20">
					我的钱包
				</view>
				<u-gap height="10" ></u-gap>
				<view class="menuBox">
					<u-grid :col="3" :border="false">
						<u-grid-item v-for="(item,index) in moneyPck" :key="index" @click='sekk(item.url)'>
							<u-icon name="photo" :size="46"></u-icon>
							<view class="grid-text mt-10">{{item.title}}</view>
						</u-grid-item> 
					</u-grid>
				</view>
				<view class="wrap mt-20">
					作品
				</view>
				<u-gap height="10" ></u-gap>
				<view class="menuBox">
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="(item,index) in projects" :key="index">
							<u-icon name="photo" :size="46"></u-icon>
							<view class="grid-text mt-10">{{item.title}}</view>
						</u-grid-item> 
					</u-grid>
				</view>
				 
			
				<view class="uni-p-b-98"></view>
			</scroll-view>
		</view> 
	</view>
</template>

<script>
	 let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	 	import {
	 		getMenuList,
	 		getUserInfo,
	 		setVisit,
	 		updateUserInfo
	 	} from '@/api/user.js';
	 	 
	 	import {
	 		toLogin
	 	} from '@/libs/login.js';
	 	import {
	 		mapGetters
	 	} from "vuex";
	 	// #ifdef MP
	 	import authorize from '@/components/Authorize';
	 	// #endif
	 	// #ifdef H5
	 	import Auth from '@/libs/wechat';
	 	// #endif
	 	const app = getApp();
	 	import pageFooter from '@/components/pageFooter/index.vue'
	 	import dayjs from '@/plugin/dayjs/dayjs.min.js';
	 	export default {
	 		components: {
	 			pageFooter,
	 			// #ifdef MP
	 			authorize
	 			// #endif
	 		},
	 		computed: mapGetters(['isLogin']),
	 		filters: {
	 			coundTime(val) {
	 				var setTime = val * 1000
	 				var nowTime = new Date()
	 				var rest = setTime - nowTime.getTime()
	 				var day = parseInt(rest / (60 * 60 * 24 * 1000))
	 				// var hour = parseInt(rest/(60*60*1000)%24) //小时
	 				return day + '天'
	 			},
	 			dateFormat: function(value) {
	 				return dayjs(value * 1000).format('YYYY-MM-DD');
	 			}
	 		},
	 		data() {
	 			return {  
	 				tools: [{
	 						img: '/static/images/order1.png',
	 						title: '上传作品',
	 						url: '/pages/tool/works'
	 					},
	 					{
	 						img: '/static/images/order2.png',
	 						title: '开始直播',
	 						url: '/pages/users/order_list/index?status=1'
	 					},
	 					{
	 						img: '/static/images/order3.png',
	 						title: '文字转语音',
	 						url: '/pages/tool/turn'
	 					},
	 					{
	 						img: '/static/images/order4.png',
	 						title: '技能测定',
	 						url: '/pages/users/order_list/index?status=3'
	 					},
	 					{
	 						img: '/static/images/order5.png',
	 						title: '个人名片',
	 						url: '/pages/users/user_return_list/index'
	 					},
	 				],
					moneyPck:[{
	 						img: '/static/images/order1.png',
	 						title: '充值',
	 						url: '/pages/wallet/wallet'
	 					},
	 					{
	 						img: '/static/images/order2.png',
	 						title: '账单',
	 						url: '/pages/wallet/bill'
	 					},
	 					{
	 						img: '/static/images/order3.png',
	 						title: '收入',
	 						url: '/pages/users/order_list/index?status=2'
	 					}, 
					],
					projects:[{
							img: '/static/images/order1.png',
							title: '我的作品',
							url: '/pages/users/order_list/index?status=0'
						},
						{
							img: '/static/images/order2.png',
							title: '关注作品',
							url: '/pages/users/order_list/index?status=1'
						},
						{
							img: '/static/images/order3.png',
							title: '关于音服务',
							url: '/pages/users/order_list/index?status=2'
						}, 
						{
							img: '/static/images/order3.png',
							title: '账号退出',
							url: '/pages/users/order_list/index?status=2'
						}
					],
	 				imgUrls: [],
	 				autoplay: true,
	 				circular: true,
	 				interval: 3000,
	 				duration: 500,
	 				isAuto: false, //没有授权的不会自动授权
	 				isShowAuth: false, //是否隐藏授权
	 				orderStatusNum: {},
	 				userInfo: {},
	 				MyMenus: [],
	 				sysHeight: sysHeight,
	 				mpHeight: 0,
	 				showStatus: 1, 
	 				activeRouter: '',
	 				// #ifdef MP
	 				pageHeight: '100%',
	 				// #endif
	 				// #ifdef H5 || APP-PLUS
	 				pageHeight: app.globalData.windowHeight,
	 				// #endif
	 				// #ifdef H5
	 				isWeixin: Auth.isWeixin()
	 				//#endif
	 			}
	 		}, 
			mounted() {
	 			let self = this
	 			// #ifdef MP
	 			let info = uni.createSelectorQuery().select(".sys-head");
	 			info.boundingClientRect(function(data) { //data - 各种参数
	 				self.mpHeight = data.height
	 			}).exec()
	 			// #endif 
				// #ifdef H5
				uni.getSystemInfo({
					success: function(res) {
						self.pageHeight = res.windowHeight + 'px'
					}
				});
				// #endif 
				if (self.isLogin) {
					this.getUserInfo();
					this.getMyMenus();
					this.setVisit();
				};
				
				
				
			}, 
	 		methods: {
				work(url){
					uni.navigateTo({
						url:url
					})
				},
				sekk(url){
					uni.navigateTo({
						url:url
					})
				},
	 
	 			getWechatuserinfo() {
	 				//#ifdef H5
	 
	 				Auth.isWeixin() && Auth.oAuth('snsapi_userinfo', '/pages/user/index');
	 				//#endif
	 			},
	 			getRoutineUserInfo(e) {
	 				updateUserInfo({
	 					userInfo: e.detail.userInfo
	 				}).then(res => {
	 					this.getUserInfo();
	 					return this.$util.Tips('更新用户信息成功');
	 				}).catch(res => {
	 
	 				})
	 				console.log(e);
	 			},
	 			// 记录会员访问
	 			setVisit() {
	 				setVisit({
	 					url: '/pages/user/index'
	 				}).then(res => {})
	 			},
	 			// 打开授权
	 			openAuto() {
	 				toLogin();
	 			},
	 			// 授权回调
	 			onLoadFun() {
	 				this.getUserInfo();
	 				this.getMyMenus();
	 				this.setVisit();
	 			},
	 			Setting: function() {
	 				uni.openSetting({
	 					success: function(res) {
	 						console.log(res.authSetting)
	 					}
	 				});
	 			},
	 			// 授权关闭
	 			authColse: function(e) {
	 				this.isShowAuth = e
	 			},
	 			// 绑定手机
	 			bindPhone() {
	 				uni.navigateTo({
	 					url: '/pages/users/user_phone/index'
	 				})
	 			},
	 			/**
	 			 * 获取个人用户信息
	 			 */
	 			getUserInfo: function() {
	 				let that = this;
	 				getUserInfo().then(res => {
	 					console.log(res.data);
	 					that.userInfo = res.data
	 					that.$store.commit("SETUID", res.data.uid);
	 					// that.orderMenu.forEach((item, index) => {
	 					// 	switch (item.title) {
	 					// 		case '待付款':
	 					// 			item.num = res.data.orderStatusNum.unpaid_count
	 					// 			break
	 					// 		case '待发货':
	 					// 			item.num = res.data.orderStatusNum.unshipped_count
	 					// 			break
	 					// 		case '待收货':
	 					// 			item.num = res.data.orderStatusNum.received_count
	 					// 			break
	 					// 		case '待评价':
	 					// 			item.num = res.data.orderStatusNum.evaluated_count
	 					// 			break
	 					// 		case '售后/退款':
	 					// 			item.num = res.data.orderStatusNum.refunding_count
	 					// 			break
	 					// 	}
	 					// })
	 				});
	 			},
	 			/**
	 			 * 
	 			 * 获取个人中心图标
	 			 */
	 			getMyMenus: function() {
	 				let that = this;
	 				// if (this.MyMenus.length) return;
	 				getMenuList().then(res => { 
	 					let myMenu = []
	 					res.data.routine_my_menus.forEach((el, index, arr) => {
	 						if (el.url == '/pages/admin/order/index' || el.url == '/pages/admin/order_cancellation/index' || el.name ==
	 							'客服接待') { 
	 						} else {
	 							myMenu.push(el)
	 						}
	 					})
	 					this.MyMenus = myMenu
	 					this.imgUrls = res.data.routine_my_banner
	 				});
	 			},
	 			// 编辑页面
	 			goEdit() {
	 				if (this.isLogin == false) {
	 					toLogin();
	 				} else {
	 					uni.navigateTo({
	 						url: '/pages/users/user_info/index'
	 					})
	 				}
	 
	 			},
	 			// 签到
	 			goSignIn() {
	 				uni.navigateTo({
	 					url: '/pages/users/user_sgin/index'
	 				})
	 			},
	 			// goMenuPage
	 			goMenuPage(url, name) {
	 				if (this.isLogin) {
	 					if (url.indexOf('http') === -1) {
	 						// #ifdef H5
	 						if (name && name === '客服接待') {
	 							return uni.navigateTo({
	 								url: `/pages/annex/web_view/index?url=${location.origin}${url}`
	 							});
	 						}
	 						// #endif
	 						uni.navigateTo({
	 							url: url
	 						})
	 					} else {
	 						uni.navigateTo({
	 							url: `/pages/annex/web_view/index?url=${url}`
	 						});
	 					}
	 				} else {
	 					// #ifdef MP
	 					this.openAuto()
	 					// #endif
	 				}
	 			}, 
				
	 		}
	 	}
	 </script>
	 
<style lang="scss">
	page,
	body {
		height: 100%;
	}
	
	.menuBox{
		border: 1px #F1F1F1 solid;
		border-radius: 10rpx;
		margin: 20rpx;
	}
 
	.new-users {
		display: flex;
		flex-direction: column;
		height: 100%;
 
		.sys-head {
			position: relative;
			width: 100%;
			background: linear-gradient(90deg, $bg-star1 0%, $bg-end1 100%);
 
			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: url("~@/static/images/user-sys.png") no-repeat;
				background-size: 100% auto;
				background-position: left bottom;
			}
 
			.sys-title {
				z-index: 10;
				position: relative;
				height: 43px;
				text-align: center;
				line-height: 43px;
				font-size: 36rpx;
				color: #FFFFFF;
			}
		}
 
		.head {
			// background: #fff;
 
			.user-card {
				position: relative;
				width: 100%;
				height: 380rpx;
				margin: 0 auto;
				padding: 35rpx 28rpx;
				background: url("~@/static/images/user_bg.png") no-repeat;
				background-size: 100% 100% ;
 
				.user-info {
					z-index: 20;
					position: relative;
					display: flex;
 
					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height:44rpx;
						image{
							width: 100%;
							height:100%;
						}
					}
 
					.live {
						width: 28rpx;
						height: 28rpx;
						margin-left: 20rpx;
					}
 
					.bntImg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						background-color: unset;
						position: relative;
 
						.avatarName {
							font-size: 16rpx;
							color: #fff;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							height: 37rpx;
							line-height: 37rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
						}
					}
					.avatar-box{
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						&.on{
							.avatar{
								border: 2px solid #FFAC65;
								border-radius: 50%;
							}
						}
					}
					.avatar {
						position: relative;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						
					}
 
					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;
 
						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;
 
							.vip {
								margin-left: 10rpx;
 
								image {
									width: 78rpx;
									height: 30rpx;
									display: block;
								}
							}
						}
 
						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);
 
							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}
 
				.message {
					align-self: flex-start;
					position: relative;
					margin-top: 15rpx;
					margin-right: 34rpx;
 
					.num {
						position: absolute;
						top: -8rpx;
						left: 18rpx;
						min-width: 24rpx;
						height: 24rpx;
						border-radius: 12rpx;
						background-color: #fff;
						font-size: 18rpx;
						line-height: 24rpx;
						text-align: center;
						color: #E93323;
					}
 
					.iconfont {
						font-size: 40rpx;
						color: #fff;
					}
				}
 
				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					// padding: 0 47rpx;
					color: #fff;
 
					.num-item {
						width: 33.33%;
						text-align: center;
 
						.num {
							font-size: 42rpx;
							font-weight: bold;
						}
 
						.txt {
							margin-top: 8rpx;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}
 
				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
 
			.order-wrapper {
				background: #fff;
				margin: 0 30rpx;
				border-radius: 16rpx;
 
				.order-hd {
					justify-content: space-between;
					padding: 30rpx 20rpx 10rpx;
					margin-top: 25rpx;
					font-size: 30rpx;
					color: #282828;
 
					.left {
						font-weight: bold;
					}
 
					.right {
						align-items: center;
						color: #666666;
						font-size: 26rpx;
 
						.icon-xiangyou {
							margin-left: 5rpx;
							margin-top: 6rpx;
							font-size: 26rpx;
						}
					}
				}
 
				.order-bd {
					display: flex;
					padding: 0 0;
 
					.order-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 20%;
						height: 140rpx;
 
						.pic {
							position: relative;
							text-align: center;
 
							image {
								width: 58rpx;
								height: 48rpx;
							}
						}
 
						.txt {
							margin-top: 6rpx;
							font-size: 26rpx;
							color: #454545;
						}
					}
				}
			}
		}
 
		.slider-wrapper {
			margin: 20rpx 0;
			height: 130rpx;
 
			swiper,
			swiper-item {
				height: 100%;
			}
 
			image {
				width: 100%;
				height: 130rpx;
			}
		} 
 
		.phone {
			color: #fff;
		}
 
		.order-status-num {
 
			min-width: 12rpx;
			background-color: #fff;
			color: #ee5a52;
			border-radius: 15px;
			position: absolute;
			right: -14rpx;
			top: -15rpx;
			font-size: 20rpx;
			padding: 0 8rpx;
			border: 1px solid #ee5a52;
		}
 
		.support {
			width: 219rpx;
			height: 74rpx;
			margin: 54rpx auto;
			display: block;
		}
	}
  
 
	.setting {
		margin-top: 15rpx;
		color: #fff;
 
		.iconfont {
			font-size: 40rpx;
		}
	}
 
	.page-footer {
		display: flex;
		align-items: center;
		width: 100%;
		height: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
		border-top: solid 1rpx #F3F3F3;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
 
		.foot-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
 
		.foot-item image {
			height: 50rpx;
			width: 50rpx;
			text-align: center;
			margin: 0 auto;
		}
 
		.foot-item .txt {
			font-size: 24rpx;
 
 
			&.active {}
		}
	}
 </style>