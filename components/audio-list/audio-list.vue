<template>
	<view class="">
		<view class="audio-item" v-for="(item, index) in audioList">
			<view class="l">
				<image class="img" :src="item.image"></image>
				<view class="info">
					<view class="t" @click="showAuthor">{{item.name}}</view>
					<view class="b">
						<image :src="item.user_avatar"></image>
						<view>{{item.user_nickname}}</view>
					</view>
				</view>
			</view>
			<view class="r">
				<image class="icon" src="../../static/images/audio_player.png"></image>
				<image class="icon" src="../../static/images/audio_love.png"></image>
				<image class="icon" src="../../static/images/audio_price.png"></image>
				<image class="icon" src="../../static/images/audio_share.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"audio-list",
		props: ['audioList'],
		data() {
			return {
				
			};
		},
		methods: {
			showAuthor() {
				uni.navigateTo({
					url: '../../pages/liveApp/user/findUser'
				})
			}
		}
	}
</script>

<style lang="scss">
	.audio-item {
		width: 690rpx;
		height: 147rpx;
		background-color: #F1F2F6;
		border-radius: 20rpx;
		margin: 0 auto;
		display: flex;
		margin-bottom: 20rpx;
		.l {
			display: flex;
			width: 50%;
			.img {
				width: 101rpx;
				height: 102rpx;
				border-radius: 15rpx;
				margin-top: 23rpx;
				margin-left: 17rpx;
			}
			.info {
				display: flex;
				flex-direction: column;
				.t {
					color: #444444;
					font-size: 30rpx;
					margin-top: 33rpx;
					margin-left: 18rpx;
					font-weight: bold;
				}
				.b {
					display: flex;
					margin-left: 16rpx;
					margin-top: 6rpx;
					height: 44rpx;
					line-height: 44rpx;
					image {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
					}
					view {
						color: #999999;
						font-size: 22rpx;
						margin-left: 14rpx;
					}
				}
			}
		}
		.r {
			width: 50%;
			display: flex;
			justify-content: flex-end;
			.icon {
				margin-top: 44rpx;
				width: 58rpx;
				height: 58rpx;
				margin-right: 20rpx;
			}
			.icon:nth-child(4) {
				margin-right: 16rpx;
			}
		}
	}
</style>
