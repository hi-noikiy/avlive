<template>
	<view>
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<view class="content">
				<view class="module1">
					<view v-for="(item, index) in types" :class="(item.id === type) ? 'curr' : ''" @click="changeType(item.id)">
						<image :src="item.image"></image>
						<span>{{item.name}}</span>
					</view>
				</view>
				<view class="module2">
					<view v-for="(item, index) in prices" :class="(item == price && price_curr === true) ? 'curr' : ''" @click="changePrice(item)">{{item}}元</view>
					<view>
						<input type="number" placeholder="自定义金额" @focus="changePrice()" @input="customPirce" />
					</view>
				</view>
				<view class="module3">共计获得{{type == 1 ? price : price * 10}}{{type == 1 ? '音宝' : '音珠'}}</view>
			</view>
			<button type="default" class="recharge">充值</button>
			<view class="info">说明1个音宝=1元 10个音铢=1元</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				prices: [6, 29, 66, 298, 698],
				price_curr: true,
				price: 6
			}
		},
		methods: {
			// 更改充值的货币类型
			changeType(type) {
				this.type = type;
			},
			// 选中充值金额
			changePrice(price = 0) {
				this.price = price;
				if(price == 0) {
					this.price_curr = false;
				} else {
					this.price_curr = true;
				}
			},
			// 自定义金额
			customPirce(e) {
				this.price = e.detail.value;
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
</style>
