<template>
	<view class="">
		<view class="bg"></view>
		<view class="main">
			<view class="top box">
				<view class="line1">
					<image :src="userInfo.avatar" class="head" @click="urlTo('/pages/users/user_info/index')"></image>
					<view class="info">
						<view class="t" @click="urlTo('/pages/users/user_info/index')">
							<view>昵称：{{userInfo.nickname}}</view>
							<view>ID {{userInfo.uid}}</view>
						</view>
						<view class="b">
							<view>{{userInfo.fensi}}粉丝</view>
							<view class="c">|</view>
							<view>{{userInfo.guanzhu}}关注</view>
						</view>
					</view>
					<image src="/static/images/me_sz.png" class="setting" @click="urlTo('/pages/users/user_info/index')"></image>
				</view>
				<view class="line2">
					<view>经验等级：二级</view>
					<view>技能等级：三级</view>
					<view>信用值：998</view>
				</view>
				<view class="line3">
					<view class="title">技能标签</view>
					<u-tag v-for="(tag, tagIndex) in userInfo.class_name" :text="tag" mode="plain" shape="circle"
						size="mini" color="#FFFFFF" border-color="#FFFFFF" bg-color="rgba(0,0,0,0)" />
					<view class="add">+</view>
				</view>
				<view class="line4">
					<view v-for="i in 5">测试自动说明，可以自动换行</view>
				</view>
			</view>
			<view class="list box" v-for="(item, index) in list">
				<view class="item_title">{{item.title}}</view>
				<view class="items">
					<image v-for="(val, key) in item.items" :src="val.src"
						:style="'width: '+val.width+'rpx;height: '+val.height+'rpx;margin-right:'+val.mright+'rpx'"
						@click="urlTo(val.url)"></image>
				</view>
			</view>
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
		Usertesting
	} from '@/api/liveApp.js';
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
				list: [{
					title: '使用工具',
					items: [{
						title: '上传作品',
						src: '/static/images/me_sczp.png',
						width: '87',
						height: '115',
						mright: '48',
						url: '/pages/tool/works'
					}, {
						title: '开始直播',
						src: '/static/images/me_kszb.png',
						width: '88',
						height: '115',
						mright: '49',
						url: '/pages/tool/telecast'
					}, {
						title: '文字转语音',
						src: '/static/images/me_wzzyy.png',
						width: '111',
						height: '115',
						mright: '48',
						url: '/pages/tool/turn'
					}, {
						title: '技能测定',
						src: '/static/images/me_jncd.png',
						width: '88',
						height: '115',
						mright: '49',
						url: '/pages/evaluation/testtable'
					}, {
						title: '名片',
						src: '/static/images/me_mp.png',
						width: '79',
						height: '115',
						mright: '0',
						url: '/pages/users/user_return_list/index'
					}]
				}, {
					title: '我的钱包',
					items: [{
						title: '充值',
						src: '/static/images/me_cz.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/wallet'
					}, {
						title: '账单',
						src: '/static/images/me_zd.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/bill'
					}, {
						title: '收入',
						src: '/static/images/me_sr.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/withdrawal'
					}]
				}, {
					title: '作品',
					items: [{
						title: '我的作品',
						src: '/static/images/me_wdzp.png',
						width: '87',
						height: '118',
						mright: '59',
						url: '/pages/tool/worklist?data_type=1'
					}, {
						title: '我点赞的',
						src: '/static/images/me_wdzd.png',
						width: '87',
						height: '118',
						mright: '60',
						url: '/pages/tool/worklist?data_type=2'
					}, {
						title: '我打赏的',
						src: '/static/images/me_wdsd.png',
						width: '87',
						height: '118',
						mright: '60',
						url: '/pages/tool/worklist?data_type=3'
					}, {
						title: '我下载的',
						src: '/static/images/me_wxzd.png',
						width: '87',
						height: '118',
						mright: '0',
						url: '/pages/tool/worklist?data_type=4'
					}]
				}, {
					title: '录音棚',
					items: [{
						title: '单人录制',
						src: '/static/images/me_drlz.png',
						width: '87',
						height: '117',
						mright: '58',
						url: ''
					}, {
						title: '多人录制',
						src: '/static/images/me_drlzs.png',
						width: '86',
						height: '117',
						mright: '59',
						url: ''
					}, {
						title: '录制草稿',
						src: '/static/images/me_lzcg.png',
						width: '88',
						height: '117',
						mright: '58',
						url: ''
					}, {
						title: '素材库',
						src: '/static/images/me_sck.png',
						width: '79',
						height: '117',
						mright: '0',
						url: ''
					}]
				}],
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
			ceshi() {
				uni.navigateTo({
					url: '/pages/evaluation/testtable'
				})
			},
			urlTo(url) {
				if (url == '/pages/evaluation/testtable') {
					var data = {
						type: 1
					}
					Usertesting(data).then(res => {
						console.log("用户测试结果", res)
						if (res.status == 400) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.navigateTo({
								url: url
							})
						}
					})
					return
				}
				uni.navigateTo({
					url: url
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
						if (el.url == '/pages/admin/order/index' || el.url ==
							'/pages/admin/order_cancellation/index' || el.name ==
							'客服接待') {} else {
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

<style scoped lang="scss">
	.bg {
		width: 750rpx;
		height: 420rpx;
		background-image: url(/static/images/me_bg.png);
		background-size: 750rpx 1000rpx;
		background-position: 0rpx 480rpx;
		position: relative;
	}

	.main {
		position: absolute;
		top: 140rpx;
		left: 30rpx;
		width: 690rpx;
		color: #FFFFFF;
		font-size: 26rpx;
	}

	.box {
		width: 100%;
		background-color: rgba($color: #2C2C2C, $alpha: 0.97);
		box-shadow: 0rpx 0rpx 3rpx 0rpx rgba(36, 36, 36, 0.08);
		border-radius: 18rpx;
	}

	.top {
		display: flex;
		flex-direction: column;
		padding: 24rpx;
		margin-bottom: 35rpx;

		.line1 {
			display: flex;
			align-items: center;
			font-size: 29rpx;

			.head {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
			}

			.info {
				display: flex;
				flex-direction: column;
				width: 414rpx;
				margin-left: 28rpx;

				.t {
					display: flex;
					justify-content: space-between;
				}

				.b {
					display: flex;
					margin-top: 21rpx;

					.c {
						padding-left: 14rpx;
						padding-right: 14rpx;
					}
				}
			}

			.setting {
				margin-left: 29rpx;
				width: 47rpx;
				height: 79rpx;
			}
		}

		.line2 {
			display: flex;
			margin-top: 24rpx;

			view {
				margin-right: 40rpx;
			}
		}

		.line3 {
			display: flex;
			flex-wrap: wrap;
			margin-top: 26rpx;

			.title {
				font-size: 29rpx;
				margin-right: 8rpx;
			}

			.u-tag {
				margin-left: 16rpx !important;
				margin-bottom: 10rpx;
			}

			.u-size-mini {
				font-size: 21rpx !important;
			}

			.add {
				width: 22rpx;
				height: 22rpx;
				font-size: 36rpx;
				margin-left: 11rpx;
				margin-top: -6rpx;
			}
		}

		.line4 {
			margin-top: 8rpx;
		}
	}

	.list {
		height: 208rpx;
		margin-bottom: 28rpx;

		.item_title {
			font-size: 28rpx;
			font-weight: 500;
			padding-top: 30rpx;
			margin-left: 28rpx;
			margin-bottom: 7rpx;
		}

		.items {
			margin-left: 22rpx;
		}
	}

	.list:nth-last-child(1) {
		margin-bottom: 180rpx;
	}
</style>
