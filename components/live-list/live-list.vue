<template>
	<view class="live-list">
		<view class="live-item" v-for="i in 5" @click="liveroom">
			<image class="bg" src="../../static/images/bg.png"></image>
			<view class="info">
				<image src="../../pages/users/static/1.png"></image>
				<view>安妮爱主持</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"live-list",
		data() {
			return {
				
			};
		},
		methods: {
			liveroom() {
				uni.navigateTo({
					url: "/pages/tool/video_live/look"
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-list {
		width: 691rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.live-item {
			margin-bottom: 29rpx;
			width: 330rpx;
			height: 400rpx;
			border-radius: 15rpx;
			overflow: hidden;
			position: relative;
			.bg {
				width: 100%;
				height: 100%;
			}
			.info {
				position: absolute;
				width: 330rpx;
				height: 141rpx;
				background: linear-gradient(0deg, #282828, rgba(0,0,0,0));
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				bottom: 0;
				image {
					width: 80rpx;
					height: 77rpx;
					border-radius: 50%;
					margin-left: 24rpx;
				}
				view {
					color: #F8F8F8;
					font-weight: 500;
					font-size: 22rpx;
					margin-left: 16rpx;
				}
			}
		}
	}
</style>
