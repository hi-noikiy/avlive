<template>
	<view>
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<view class="content">
				<view class="module1">
					<view v-for="(item, index) in types" :class="(item.id === type) ? 'curr' : ''"
						@click="changeType(item.id)">
						<image :src="item.image"></image>
						<span>{{item.name}}</span>
					</view>
				</view>
				<view class="module2">
					<view v-for="(item, index) in prices"
						:class="(item.price == price && price_curr === true) ? 'curr' : ''"
						@click="changePrice(item.price)">{{item.price}}元</view>
					<view>
						<input type="number" placeholder="自定义金额" @focus="changePrice()" @input="customPirce" />
					</view>
				</view>
				<view class="module3">共计获得{{type == 1 ? price : price * 10}}{{type == 1 ? '音宝' : '音珠'}}</view>
			</view>
			<button type="default" class="recharge" @click="getRecharge">充值</button>
			<view class="info">说明1个音宝=1元 10个音铢=1元</view>
		</view>
		<!-- 支付弹窗 -->
		<view class="bgbox" v-if="shareBox" @click="shareBox = false">
			<view class="share-box" v-if="shareBox" @tap.stop>
				<view class="share-item" v-for="(item, index) in list" :key="index" @click="getpay(index)">
					<!-- <image class="share-item-image" :src="item.image"></image> -->
					<text class="share-item-text">{{item.title}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		rechargeList,
		createRecharge,
		weixinRecharge,
		alipay,
	} from '@/api/user.js'
	export default {
		data() {
			return {
				shareBox: false,
				list: [{
					title: '微信'
				}, {
					title: '支付宝'
				}],
				// 充值货币类型
				types: [{
					id: 1,
					name: '音宝',
					image: '../../static/images/yinbao.png'
				}, {
					id: 2,
					name: '音铢',
					image: '../../static/images/yinzhu.png'
				}],
				type: 1,
				// 充值金额
				prices: [],
				price_curr: true,
				price: 0,
				order_id: '',
			}
		},
		onLoad() {
			this.getrechargeList()
		},
		methods: {
			//获取充值列表
			getrechargeList() {
				rechargeList().then(res => {
					console.log("充值列表数据", res)
					this.prices = res.data.recharge_quota
					this.price = res.data.recharge_quota[0].price
				})
			},
			// 更改充值的货币类型
			changeType(type) {
				this.type = type;
			},
			// 选中充值金额
			changePrice(price = 0) {
				this.price = price;
				if (price == 0) {
					this.price_curr = false;
				} else {
					this.price_curr = true;
				}
			},
			// 自定义金额
			customPirce(e) {
				this.price = e.detail.value;
			},
			//充值
			getRecharge() {
				var that = this
				var data = {
					price: that.price,
					type: that.type
				}
				createRecharge(data).then(res => {
					console.log("创建充值订单", res)
					if (res.status == 200) {
						that.shareBox = true
						that.order_id = res.data.order_id
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			},
			getpay(index) {
				var that = this
				// #ifdef H5
				if (index == 0 || index == 1) {
					uni.showToast({
						icon: 'none',
						title: '暂时不支持h5支付'
					})
				}
				// #endif
				// #ifdef APP-PLUS
				//微信支付
				if (index == 0) {
					var orderdata = {
						order_id: that.order_id,
					}
					weixinRecharge(orderdata).then(res => {
						console.log("支付结果", res)
						if (res.status == 200) {
							var wxdata = res.data
							var orderInfo = {
								"appid": wxdata.appId, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								"noncestr": wxdata.nonceStr, // 随机字符串
								"package": wxdata.package, // 固定值
								"partnerid": wxdata.partnerid, // 微信支付商户号
								"prepayid": wxdata.prepayid, // 统一下单订单号 
								"timestamp": wxdata.timeStamp, // 时间戳（单位：秒）
								"sign": wxdata.paySign // 签名，这里用的 MD5 签名
							}
							console.log("+++++", orderInfo)
							uni.requestPayment({
								"provider": "wxpay",
								"orderInfo": orderInfo,
								success: function(res) {
									uni.hideLoading()
									uni.showToast({
										title: '充值成功',
										icon: 'none'
									})
									that.shareBox = false
								},
								fail: function(e) {
									uni.hideLoading();
									console.log('fail:' + JSON.stringify(e));
								},
								complete: function(e) {
									uni.hideLoading();
									console.log('fail:' + JSON.stringify(e));
								},
							});

						}
					})
				}
				//支付宝支付
				if (index == 1) {
					var orderdata = {
						order_id: that.order_id,
					}
					alipay(orderdata).then(res => {
						console.log("支付结果", res)
						if (res.status == 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.param,
								success: function(res) {
									uni.hideLoading()
									that.shareBox = false
									uni.showToast({
										title: '充值成功',
										icon: 'none'
									})
								},

								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					})
				}
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 1;
	}

	.main {
		position: absolute;
		z-index: 2;
		width: 690rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.content {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
	}

	.module1 {
		margin-top: 35rpx;
		margin-left: 20rpx;
		display: flex;

		view {
			width: 315rpx;
			height: 190rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 90rpx;
				height: 90rpx;
			}
		}

		.curr {
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(0, 0, 0, 0.08);
		}
	}

	.module2 {
		margin-top: 59rpx;
		margin-left: 54rpx;
		width: 620rpx;
		display: flex;
		flex-wrap: wrap;

		view {
			width: 175rpx;
			height: 76rpx;
			line-height: 76rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			text-align: center;
			margin-bottom: 40rpx;
			margin-right: 30rpx;
		}

		.curr {
			background-color: #323232;
			color: #FFFFFF;
		}

		input {
			margin-top: 25rpx;
			font-size: 24rpx;
		}
	}

	.module3 {
		font-size: 24rpx;
		font-weight: bold;
		color: #000000;
		margin-left: 54rpx;
		margin-bottom: 39rpx;
	}

	.recharge {
		margin-top: 120rpx;
		width: 686rpx;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #323232;
		border-radius: 15rpx;
		color: #D7DCE2;
		font-size: 30rpx;
	}

	.info {
		position: fixed;
		left: 202rpx;
		bottom: 100rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #232323;
	}

	.bgbox {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.share-box {
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 220rpx;
		background-color: #454545;
	}

	.share-item {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 25rpx;
		border-bottom: 1rpx solid #C8C7CC;
		text-align: center;

	}

	.share-item-image {
		width: 94rpx;
		height: 94rpx;
		margin-bottom: 30rpx;
	}

	.share-item-text {
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		color: #FFFFFF;
	}
</style>
