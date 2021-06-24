<template>
	<view>
		<u-navbar :is-back="false" title="">
			<view class="header">
				<view class="l" @click="urlTo('/pages/circle/my')">
					<image src="../../users/static/1.png"></image>
					<view>我发表的</view>
				</view>
				<view class="r" @click="urlTo('/pages/circle/form')">发布</view>
			</view>
		</u-navbar>
		<view class="list">
			<view class="item" v-for="(item, index) in list">
				<view class="info">
					<view class="l">
						<image :src="item.user_avatar" class="head"></image>
						<view class="u">
							<view class="name">{{item.user_nickname}}</view>
							<view class="time">{{item.update_time}}前</view>
						</view>
					</view>
					<view class="follow" v-if="uid != item.user_id" @click="follow(item, item.user_id)">{{item.is_follow ? '已' : ''}}关注</view>
				</view>
				<u-gap height="2" bg-color="#E0DEDE" margin-top="30" margin-bottom="29"></u-gap>
				<view class="content">
					<view class="title">{{item.title}}</view>
					<view class="imgs">
						<image v-for="(image, key) in item.images" :src="image"></image>
					</view>
				</view>
				<u-gap height="2" bg-color="#E0DEDE" margin-top="44" margin-bottom="26"></u-gap>
				<view class="operation">
					<view class="like ico" @click="like(item, index)">
						<image :src="'/static/images/'+(item.is_like ? 'video_zan_curr' : 'circle_like')+'.png'"></image>
						<view>{{item.like_num}}</view>
					</view>
					<view class="comment ico">
						<image src="/static/images/circle_comment.png"></image>
						<view>{{item.comment_num}}</view>
					</view>
					<view class="share ico" @click="showShare(true)">
						<image src="/static/images/circle_share.png"></image>
						<view>{{item.forward_num}}</view>
					</view>
				</view>
			</view>
		</view>
		<share-box ref="shareBox"></share-box>
	</view>
</template>

<script>
	import shareBox from '@/components/shareBox/shareBox';
	import {
		getCircleList,
		userFollow,
		circleLike
	} from '@/api/liveApp.js';
	export default {
		components: {
			'share-box': shareBox
		},
		data() {
			return {
				uid: '',
				list: [],
				page: 1
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			// 跳转页面
			urlTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 获取列表数据
			getData() {
				var that = this;
				var data = {
					page: that.page
				}
				getCircleList(data).then(res => {
					that.uid = res.data.uid;
					that.list = res.data.list;
				})
			},
			// 关注
			follow(item, user_id) {
				var that = this;
				var operation = !item.is_follow ? 1 : 0;
				var data = {
					to_user_id: item.user_id,
					operation: operation
				};
				userFollow(data).then(res => {
					if(res.status == 200) {
						for(let i = 0; i < that.list.length; i++) {
							if(that.list[i].user_id == user_id) {
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
			like(item, index) {
				var that = this;
				var operation = !item.is_like ? 1 : 0;
				var data = {
					circle_id: item.id,
					operation: operation
				};
				circleLike(data).then(res => {
					if(res.status == 200) {
						that.list[index].is_like = !item.is_like;
						if(operation == 1) {
							that.list[index].like_num += 1;
						} else {
							that.list[index].like_num -= 1;
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
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		.l {
			display: flex;
			align-items: center;
			margin-left: 26rpx;
			image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 14rpx;
			}
		}
		.r {
			display: flex;
			align-items: center;
			margin-left: 450rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #323232;
		}
	}
	.list {
		position: absolute;
		margin-left: 30rpx;
		width: 690rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 120rpx;
		margin-top: 30rpx;
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
