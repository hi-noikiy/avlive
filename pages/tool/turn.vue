<template>
	<view class="main">
		<view class="module1">
			<textarea value="" placeholder="请输入需要转语音的文字" />
			<view class="empty">
				<image src="../../static/images/del.png"></image>
				<span>清空</span>
			</view>
		</view>
		<view class="module2">
			<view class="item" v-for="i in 5">
				<view class="t">
					<image src="../../static/images/yinfu.png"></image>
				</view>
				<view class="b">达叔</view>
			</view>
			<view class="item add">
				<view class="t">
					<image src="../../static/images/hadd.png"></image>
				</view>
			</view>
		</view>
		<view class="module3">
			<view class="item">
				<view class="icon">
					<image src="../../static/images/yuyin.png"></image>
				</view>
				<span>语调调整</span>
				<view class="slider">
					<u-slider
						inactive-color="#BBBBBC"
						active-color="#232323"
						height="6"
						block-width="34"
						:block-style="{border: '1px solid #000000'}"
					></u-slider>
				</view>
			</view>
			<view class="item">
				<view class="icon">
					<image src="../../static/images/bofang.png"></image>
				</view>
				<span>语速调整</span>
				<view class="slider">
					<u-slider
						inactive-color="#BBBBBC"
						active-color="#232323"
						height="6"
						block-width="34"
						:block-style="{border: '1px solid #000000'}"
					></u-slider>
				</view>
			</view>
		</view>
		<view class="module4">
			<view class="btn">背景音乐</view>
			<view class="btn">试听</view>
		</view>
		<button type="default" class="sub">立即合成</button>
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
	.main {
		width: 690rpx;
		margin: 0 auto;
		overflow: hidden;
	}
	.module1 {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 415rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 30rpx 30rpx 24rpx 30rpx;
		textarea {
			font-size: 24rpx;
			width: auto;
		}
		.empty {
			display: flex;
			align-items: center;
			margin-top: 16rpx;
			image {
				width: 28rpx;
				height: 28rpx;
			}
			span {
				font-size: 24rpx;
				font-weight: bold;
				color: #000000;
				padding-left: 4rpx;
			}
		}
	}
	.module2 {
		width: 700rpx;
		margin-top: 46rpx;
		margin-left: 25rpx;
		display: flex;
		flex-wrap: wrap;
		.item {
			margin-right: 50rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.t {
				width: 66rpx;
				height: 66rpx;
				text-align: center;
				background-color: #8F9092;
				border-radius: 50%;
				image {
					margin-top: 15rpx;
					width: 29rpx;
					height: 36rpx;
				}
			}
			.b {
				margin-top: 10rpx;
				font-size: 26rpx;
				font-weight: bold;
			}
		}
	}
	.module3 {
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;
		.item {
			width: 100%;
			height: 68rpx;
			margin-bottom: 50rpx;
			display: flex;
			align-items: center;
			.icon {
				width: 68rpx;
				height: 68rpx;
				background: #232323;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 37rpx;
					height: 49rpx;
				}
			}
			span {
				font-size: 26rpx;
				font-weight: bold;
				padding-left: 13rpx;
				padding-right: 24rpx;
			}
			.slider {
				width: 461rpx;
			}
		}
	}
	.module4 {
		display: flex;
		flex-wrap: wrap;
		.btn {
			width: 160rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			background-color: rgba($color: #FFFFFF, $alpha: 0.29);
			border: 1rpx solid #232323;
			margin-right: 20rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}
	}
	.sub {
		margin-top: 70rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: #323232;
		border-radius: 15rpx;
		font-size: 30rpx;
		color: #D7DCE2;
	}
</style>
