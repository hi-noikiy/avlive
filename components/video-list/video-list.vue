<template>
	<view class="main">
		<view class="item" v-for="(item, index) in videoList">
			<image :src="item.image" class="bg" @click="playVideo(item.id, item.demand_form_id)"></image>
			<view class="info" @click="showAuthor(item.user_id)">
				<image :src="item.user_avatar" class="head"></image>
				<view class="author">
					<view class="t">{{item.user_nickname}}</view>
					<view class="b">
						<image src="../../static/images/heart.png"></image>
						<span>{{item.like_num}}</span>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="" v-if="!noPage">
			分页
		</view> -->
	</view>

</template>

<script>
	export default {
		name: "video-list",
		props: [
			'videoList',
			'noPage'
		],
		data() {
			return {

			};
		},
		methods: {
			// 发布人主页
			showAuthor(user_id) {
				uni.navigateTo({
					url: '/pages/liveApp/user/findUser?user_id='+user_id
				})
			},
			// 视频页
			playVideo(id, demand_form_id) {
				for (let i = 0; i < this.videoList.length; i++) {
					if (this.videoList[i].id == id) {
						var index = i;
						break;
					}
				}
				uni.navigateTo({
					url: '/pages/liveApp/playVideo?id=' + id + '&demand_form_id=' + demand_form_id + '&index=' +
						index
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		max-width: 691rpx;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.item {
		width: 330rpx;
		height: 400rpx;
		border-radius: 15rpx;
		margin-bottom: 29rpx;
		overflow: hidden;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}

		.info {
			position: absolute;
			bottom: 0;
			z-index: 2;
			width: 100%;
			height: 141rpx;
			background: linear-gradient(0deg, #282828, rgba(0, 0, 0, 0));
			border-radius: 15rpx;
			display: flex;

			.head {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-top: 36rpx;
				margin-left: 24rpx;
			}

			.author {
				display: flex;
				flex-direction: column;
				margin-top: 52rpx;

				.t {
					font-size: 22rpx;
					font-weight: 500;
					color: #F8F8F8;
					margin-left: 16rpx;
				}

				.b {
					margin-left: 14rpx;

					image {
						width: 24rpx;
						height: 21rpx;
						margin-right: 7rpx;
					}

					span {
						font-size: 24rpx;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
