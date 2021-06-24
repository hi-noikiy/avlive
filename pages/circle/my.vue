<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="main">
			<view class="item" v-for="(item, index) in list">
				<view class="t">
					<image src="../users/static/value.jpg" class="head"></image>
					<view class="title">{{item.title}}</view>
					<image src="/static/images/close.png" class="close" @click="del(item.id)"></image>
				</view>
				<u-line color="rgba(224, 222, 222, 1)"></u-line>
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
		<u-loadmore :status="loadStatus" />
		<share-box ref="shareBox"></share-box>
	</view>
</template>

<script>
	import shareBox from '@/components/shareBox/shareBox';
	import {
		circleLike,
		getCircleList,
		deleteCircle
	} from '@/api/liveApp.js';
	export default {
		components: {
			'share-box': shareBox
		},
		data() {
			return {
				page: 1,
				list: [],
				loadStatus: 'loadmore'
			}
		},
		onLoad(options) {
			this.getData()
		},
		methods: {
			getData() {
				var that = this;
				var data = {
					uid: uni.getStorageSync('uid'),
					page: that.page
				}
				getCircleList(data).then(res => {
					if(that.page == 1) {
						that.list = res.data.list;
						// 如果小于5条，则不让上拉加载了
						if(that.list.length < 5) {
							that.loadStatus = 'nomore';
						}
					} else {
						if(res.data.list.length != 0) {
							// 拼接数据
							that.list = that.list.concat(res.data.list)
						} else {
							// 没有更多了
							that.page--;
							that.loadStatus = 'nomore';
						}
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
			// 转发
			showShare(bool) {
				this.$refs.shareBox.showShare(bool);
			},
			// 删除
			del(id) {
				var that = this;
				var data = {
					id: id
				};
				uni.showModal({
					title: '提示',
					content: '您确定删除该圈子吗？',
					success: function (res) {
						if (res.confirm) {
							deleteCircle(data).then(res => {
								uni.showToast({
									title: res.msg
								})
								if(res.status == 200) {
									for(let i = 0; i < that.list.length; i++) {
										if(that.list[i].id == id) {
											that.list.splice(i, 1);
										}
									}
								}
							})
						}
					}
				})
			}
		},
		// 上拉加载
		onReachBottom() {
			this.page++;
			this.loadStatus = 'loading';
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.getData();
			//停止下拉刷新动画
			var that = this;
			setTimeout(function () {
				uni.stopPullDownRefresh();
				that.$refs.uTips.show({
					title: '加载成功',
					type: 'info',
					duration: '1000'
				})
			}, 1000);
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size:100% 100vh;
	}
	.main {
		margin-top: 30rpx;
		margin-left: 30rpx;
		width: 690rpx;
		.item {
			width: 100%;
			background: rgba($color: #FFFFFF, $alpha: 0.5);
			border-radius: 15rpx;
			padding: 28rpx;
			display: flex;
			flex-direction: column;
			position: relative;
			margin-bottom: 30rpx;
			.t {
				margin-bottom: 30rpx;
				.head {
					float: left;
					width: 120rpx;
					height: 120rpx;
					margin-right: 30rpx;
				}
				.title {
					width: 580rpx;
					font-size: 25rpx;
					font-family: PingFang;
					font-weight: 500;
					color: #000000;
					line-height: 38rpx;
				}
				.close {
					position: absolute;
					top: 28rpx;
					right: 28rpx;
					width: 24rpx;
					height: 24rpx;
				}
			}
			.u-line {
				clear: both;
			}
			.operation {
				display: flex;
				justify-content: space-around;
				margin-top: 30rpx;
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
	}
</style>
