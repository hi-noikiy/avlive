<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<view class="module module1">
				<view class="title">我的账户</view>
				<view class="prices">
					<view class="item">
						<image src="../users/static/ybb.png"></image>
						<view class="price">音贝：{{userInfo.now_yinbei}}</view>
					</view>
					<view class="item">
						<image src="../users/static/yb.png"></image>
						<view class="price">音宝：{{userInfo.now_yinbao}}</view>
						<view class="b">价值{{userInfo.now_yinbao}}元</view>
					</view>
					<view class="item">
						<image src="../users/static/yz.png"></image>
						<view class="price">音珠：{{userInfo.now_yinzhu}}</view>
						<view class="b">价值{{userInfo.now_yinzhu / 10}}元</view>
					</view>
				</view>
				<view class="info">说明：1个音宝=1元 10个音珠=1元</view>
			</view>
			<view class="module module2">
				<view class="ma">
					<view class="t">可提现金额</view>
					<view class="b"><span style="padding-right: 12rpx;">{{userInfo.now_money}}</span>元</view>
				</view>
				<view class="mb"></view>
				<view class="mc">
					<view class="t">累计提现</view>
					<view class="b"><span style="padding-right: 12rpx;">{{userInfo.extractTotalPrice}}</span>元</view>
				</view>
				<view class="md">
					<view @click="getmask">立即提现</view>
					<image src="../../static/images/rj_icon.png"></image>
				</view>
			</view>
			<view class="module module3">
				<view class="t">
					<span class="type">提现类型</span>
					<easy-select class="select" ref="easySelect" :value="type" :options="types" @selectOne="selectOne">
					</easy-select>
					<span class="type">提现数量</span>
					<input type="number" value="" v-model="num" placeholder="请输入数量" />
				</view>
				<view class="b" v-if="type =='音宝'">
					预计到余额：<span>{{num}}</span>元
				</view>
				<view class="b" v-if="type =='音珠'">
					预计到余额：<span>{{num/10}}</span>元
				</view>
			</view>
			<view class="sub" @click="getWithdrawal">兑换到余额</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		payShell
	} from '@/api/user.js';
	export default {
		data() {
			return {
				type: '音宝',
				types: [{
					value: '3',
					label: '音宝'
				}, {
					value: '4',
					label: '音珠'
				}],
				typeVal: '3',
				userInfo: [],
				disabled: false,
				num: ""
			}
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			selectOne(options) {
				this.type = options.label
				this.typeVal = options.value
			},
			getUserInfo() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
				})
			},
			//跳转提现页面
			// getmask(){
			// 	uni.navigateTo({
			// 		url:'../users/user_cash/index'
			// 	})
			// },
			//点击提现
			getWithdrawal() {
				var that = this
				uni.showLoading({
					title: '加载中...'
				})
				
				if (that.disabled) {
					return
				}
				var data = {
					type: that.typeVal,
					num: that.num,
				}
				payShell(data).then(res => {
					if (res.status == 200) {
						uni.showToast({
							icon: 'none',
							title: '提现成功'
						})
						setTimeout(() => {
							that.disabled = false
							uni.hideToast();
							uni.hideLoading()
							//关闭提示后跳转
							uni.navigateBack({
								delta: 1
							});

						}, 1500)
					}else{
						that.disabled = false
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					console.log("提现结果", res)
				})
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

	.page {
		position: absolute;
		z-index: 2;
		width: 690rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.module {
		width: 100%;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.9;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		font-family: PingFang;
		font-weight: 500;
	}

	.module1 {
		.title {
			color: #E7E8ED;
			font-size: 34rpx;
		}

		.prices {
			margin-top: 26rpx;
			display: flex;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				text-align: center;
				align-items: center;

				.price {
					color: #E7E8ED;
					font-size: 30rpx;
				}

				image {
					width: 90rpx;
					height: 90rpx;
					margin-bottom: 6rpx;
				}

				.b {
					color: #FF7171;
					font-size: 26rpx;
					padding-top: 10rpx;
				}
			}
		}

		.info {
			color: #F0F0F0;
			font-size: 26rpx;
			padding-top: 20rpx;
		}
	}

	.module2 {
		width: 100%;
		display: flex;
		align-items: center;
		color: #E7E8ED;

		.ma {
			display: flex;
			flex-direction: column;
			align-items: center;

			.t {
				font-size: 36rpx;
				opacity: 0.96;
			}

			.b {
				margin-top: 10rpx;
				font-size: 33rpx;

				span {
					color: #FE6969;
					font-size: 46rpx;
				}
			}
		}

		.mb {
			width: 3rpx;
			height: 82rpx;
			border: 2rpx solid #E7E8ED;
			opacity: 0.47;
			margin-left: 46rpx;
			margin-right: 46rpx;
		}

		.mc {
			display: flex;
			flex-direction: column;
			min-width: 128rpx;

			.t {
				font-size: 36rpx;
			}

			.b {
				margin-top: 10rpx;
				font-size: 33rpx;

				span {
					font-size: 46rpx;
				}
			}
		}

		.md {
			display: flex;
			align-items: center;
			margin-left: 59rpx;

			view {
				width: 60rpx;
				height: 74rpx;
				line-height: 44rpx;
				font-size: 30rpx;
			}

			image {
				margin-left: 26rpx;
				width: 22rpx;
				height: 40rpx;
			}
		}
	}

	.module3 {
		display: flex;
		flex-direction: column;
		color: #E7E8ED;

		.t {
			display: flex;
			font-size: 30rpx;
			height: 48rpx;
			line-height: 48rpx;

			.type {
				margin-right: 20rpx;
			}

			.select {
				width: 144rpx !important;
				height: 48rpx !important;
				font-size: 24rpx;
				color: #E7E8ED;
				margin-right: 30rpx;
			}

			input {
				width: 170rpx;
				height: 48rpx;
				border: 2rpx solid #E7E8ED;
				border-radius: 14rpx;
				font-size: 24rpx;
				text-align: center;
			}
		}

		.b {
			font-size: 36rpx;
			color: #E7E8ED;
			margin-top: 49rpx;
			text-align: center;

			span {
				color: #E05252;
			}
		}
	}

	.sub {
		position: absolute;
		z-index: -1;
		margin-top: 46rpx;
		left: 130rpx;
		width: 490rpx;
		height: 110rpx;
		background: #3E3E3E;
		opacity: 0.95;
		border-radius: 30rpx;
		font-size: 36rpx;
		color: #E7E8ED;
		line-height: 110rpx;
		text-align: center;
	}
</style>
