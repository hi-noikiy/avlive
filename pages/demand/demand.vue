<template>
	<view class="page">
		<view class="list introduce">
			<view class="title">需求描述</view>
			<view class="info">需要录制一篇多人剧本，要求至少有五个角色 出演，可以临时发挥</view>
			<view class="content">
				<span>需要：</span>
				<view>男声</view>
				<view>女生</view>
				<view>老年人</view>
			</view>
		</view>
		<view class="list item">
			<view class="c1">
				<view class="l">
					<image src="../users/static/4.png" class="head"></image>
					<view class="name">安妮爱主持</view>
				</view>
				<view class="r">
					<image src="../../static/images/pinglun_icon.png" class="contact-icon"></image>
					<view class="contact">联系ta</view>
				</view>
			</view>
			<view class="c2">报价<span>18000</span>元，周期<span>16</span>天</view>
			<view class="c3">有声读物录制专业10年，擅长各类有声录制， 欢迎联系！</view>
			<view class="c4">
				<view class="time">报价时间：2021年4月16日</view>
				<view class="btn">选他并支付</view>
			</view>
		</view>
		<view class="list item">
			<view class="c1">
				<view class="l">
					<image src="../users/static/4.png" class="head"></image>
					<view class="name">安妮爱主持</view>
				</view>
				<view class="r">
					<image src="../../static/images/pinglun_icon.png" class="contact-icon"></image>
					<view class="contact">联系ta</view>
				</view>
			</view>
			<view class="c2">报价<span>18000</span>元，周期<span>16</span>天</view>
			<view class="c3">有声读物录制专业10年，擅长各类有声录制， 欢迎联系！</view>
			<view class="c4">
				<view class="time">报价时间：2021年4月16日</view>
				<view class="btn">选他并支付</view>
			</view>
		</view>
		<view class="btns">
			<view class="btn">修改订单</view>
			<view class="btn">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 690rpx;
		min-height: 100vh;
		margin: 0 auto;
		color: #FFFFFF;
	}
	.list {
		width: 100%;
		background-color: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 29rpx;
	}
	.introduce {
		padding-bottom: 30rpx;
		.title {
			font-size: 32rpx;
			color: #E7E8ED;
			padding-bottom: 16rpx;
		}
		.info {
			font-size: 30rpx;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
			span {
				font-size: 28rpx;
				color: #E7E8ED;
			}
			view {
				font-size: 26rpx;
				color: #323232;
				background-color: #E7E8ED;
				border-radius: 11rpx;
				padding: 10rpx;
				height: 40rpx;
				line-height: 24rpx;
				text-align: center;
				font-family: PingFang;
				font-weight: bold;
				margin-right: 32rpx;
				margin-bottom: 8rpx;
			}
		}
	}
	.item {
		display: flex;
		flex-direction: column;
		.c1 {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			font-family: PingFang;
			font-weight: 500;
			.l {
				display: flex;
				align-items: center;
				.head {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
				.name {
					color: #E7E8ED;
					font-size: 32rpx;
					padding-left: 21rpx;
				}
			}
			.r {
				display: flex;
				align-items: center;
				.contact-icon {
					width: 35rpx;
					height: 32rpx;
					margin-right: 15rpx;
				}
				.contact {
					font-size: 28rpx;
					color: #E7E8ED;
				}
			}
		}
		.c2 {
			padding-top: 23rpx;
			font-size: 32rpx;
			span {color: #E05252;}
		}
		.c3 {
			padding-top: 31rpx;
			font-size: 30rpx;
			color: #E3E3E3;
			opacity: 0.95;
		}
		.c4 {
			margin-top: 16rpx;
			height: 58rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.time {
				font-size: 26rpx;
				color: #E4E5EA;
				opacity: 0.65;
			}
			.btn {
				width: 180rpx;
				height: 58rpx;
				line-height: 58rpx;
				background: #E4E5EA;
				border-radius: 29rpx;
				color: #323232;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}
	.btns {
		width: 646rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		.btn {
			width: 280rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #323232;
			opacity: 0.95;
			border-radius: 30rpx;
			font-size: 38rpx;
			color: #D7DCE2;
			text-align: center;
		}
	}
</style>
