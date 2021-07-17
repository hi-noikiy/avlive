<template>
	<view>
		<view class="item">
			<view class="info">
				<view class="l">
					<image :src="content.user_avatar" class="head" @click="findUser(content.user_id)"></image>
					<view class="u">
						<view class="name" @click="findUser(content.user_id)">{{content.user_nickname}}</view>
						<view class="time">{{content.update_time}}前</view>
					</view>
				</view>
				<view class="follow" v-if="uid != content.user_id" @click="follow(content,content.user_id)">
					{{content.is_follow ? '已' : ''}}关注
				</view>
			</view>
			<u-gap height="2" bg-color="#E0DEDE" margin-top="30" margin-bottom="29"></u-gap>

			<view class="content" @click="getdetail(content.id)">
				<rich-text class="title" :nodes="content.content"></rich-text>
				<view class="imgs">
					<image v-for="(image, key) in content.images" :src="image"></image>
				</view>
			</view> 

			<u-gap height="2" bg-color="#E0DEDE" margin-top="44" margin-bottom="26"></u-gap>
			<view class="operation">
				<view class="like ico" @click="like(content)">
					<image :src="'/static/images/'+(content.is_like ? 'video_zan_curr' : 'circle_like')+'.png'"></image>
					<view>{{content.like_num}}</view>
				</view>
				<view class="comment ico" @click="showComment(true,content.id)">
					<image src="/static/images/circle_comment.png"></image>
					<view>{{content.comment_num}}</view>
				</view>
				<view class="share ico" @click="showShare(true)">
					<image src="/static/images/circle_share.png"></image>
					<view>{{content.forward_num}}</view>
				</view>
			</view>
		</view>
		<share-box ref="shareBox"></share-box>
		<comment ref="commentBox" :id="id"></comment>
	</view>
</template>

<script>
	import shareBox from '@/components/shareBox/shareBox';
	import comment from '@/components/comment';
	import {
		getCircleList,
		userFollow,
		circleLike
	} from '@/api/liveApp.js';
	export default {
		components: {
			'share-box': shareBox,
			'comment': comment
		},
		data() {
			return {
				id: '',
				uid: '',
				content: {}
			}
		},
		onLoad(options) {
			this.content = JSON.parse(options.data)
			this.uid = this.content.uid;
			uni.setNavigationBarTitle({
				title: this.content.title
			})
		},
		methods: {
			// 关注
			follow(item, user_id) {
				var that = this;
				var operation = !item.is_follow ? 1 : 0;
				var data = {
					to_user_id: item.user_id,
					operation: operation
				};
				userFollow(data).then(res => {
					if (res.status == 200) {
						for (let i = 0; i < that.list.length; i++) {
							if (that.list[i].user_id == user_id) {
								that.list[i].is_follow = !item.is_follow;
							}
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			// 点赞
			like(item) {
				var that = this;
				var operation = !item.is_like ? 1 : 0;
				var data = {
					circle_id: item.id,
					operation: operation
				};
				circleLike(data).then(res => {
					if (res.status == 200) {
						that.content.is_like = !item.is_like;
						if (operation == 1) {
							that.content.like_num += 1;
						} else {
							that.content.like_num -= 1;
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			showShare(bool) {
				this.$refs.shareBox.showShare(bool);
			},
			showComment(bool,id) {
				this.$refs.commentBox.showComment(bool);
				this.$refs.commentBox.ids(id);
			},
			findUser(user_id) {
				uni.navigateTo({
					url: '/pages/liveApp/user/findUser?user_id='+user_id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100% 100vh;
	}
	
	.item {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;

		.info {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.l {
				display: flex;
				align-items: center;

				.head {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.u {
					margin-left: 29rpx;

					.name {
						font-size: 28rpx;
						font-weight: bold;
						color: #323232;
						padding-bottom: 4rpx;
					}

					.time {
						font-size: 20rpx;
						font-weight: 400;
						color: #999999;
					}
				}
			}

			.follow {
				width: 140rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #FE3149;
				border-radius: 4rpx;
				color: #FFFFFF;
				font-size: 25rpx;
				font-weight: bold;
				text-align: center;
			}
		}

		.content {
			display: flex;
			flex-direction: column;

			.title {
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
				margin-bottom: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}

			.imgs {
				display: flex;
				flex-wrap: wrap;

				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}
			}
		}

		.operation {
			display: flex;
			justify-content: space-around;
			font-size: 28rpx;
			font-weight: 500;
			color: #323232;

			image {
				width: 35rpx;
				height: 35rpx;
				margin-bottom: 4rpx;
			}

			.like {
				image {
					height: 31rpx;
					margin-top: 4rpx;
				}
			}

			.ico {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
