<template>
	<view>
		<view class="bg" v-if="shareBox" @click="shareBox = false">
			<view class="share-box" v-if="shareBox" @tap.stop>
				<view class="share-item" v-for="(item, index) in list" @click="share(index)">
					<image class="share-item-image" :src="item.image"></image>
					<text class="share-item-text">{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "shareBox",
		data() {
			return {
				shareBox: false,
				list: [{
						image: '/static/images/share_wx.png',
						title: '微信'
					},
					{
						image: '/static/images/share_pyq.png',
						title: '朋友圈'
					},
					// {
					// 	image: '/static/images/share_qq.png',
					// 	title: 'QQ'
					// },
					// {
					// 	image: '/static/images/share_hy.png',
					// 	title: '好友'
					// },
					// {
					// 	image: '/static/images/share_xz.png',
					// 	title: '下载'
					// },
					// {
					// 	image: '/static/images/share_wb.png',
					// 	title: '微博'
					// },
					// {
					// 	image: '/static/images/share_sc.png',
					// 	title: '收藏'
					// },
					// {
					// 	image: '/static/images/share_qqkj.png',
					// 	title: 'QQ空间'
					// },
					// {
					// 	image: '/static/images/share_lj.png',
					// 	title: '链接'
					// },
					// {
					// 	image: '/static/images/share_th.png',
					// 	title: '举报'
					// },
				]
			};
		},
		methods: {
			showShare(bool) {
				this.shareBox = bool;
			},
			share(index) {
				// #ifdef H5
				uni.showToast({
					title: '分享仅限App端使用',
					icon: 'none'
				})
				// #endif
				// #ifdef APP-NVUE
				if (index == 0) {
					// 分享到微信好友
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 1,
						href: "http://qyh.ugekeji.com/",
						title: "音服务app分享",
						summary: "我正在使用音服务app，赶紧跟我一起来体验！",
						success: function(res) {
							uni.showToast({
								title: '分享成功'
							})
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
							uni.showToast({
								title: '分享失败',
								icon: 'none'
							})
						}
					});
				} else if (index == 1) {
					// 分享到微信朋友圈
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						type: 1,
						href: "http://qyh.ugekeji.com/",
						title: "音服务app分享",
						summary: "我正在使用音服务app，赶紧跟我一起来体验！",
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
							uni.showToast({
								title: '分享成功'
							})
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
							uni.showToast({
								title: '分享失败',
								icon: 'none'
							})
						}
					});
				}
				// #endif
			}
		}
	}
</script>

<style>
	.bg {
		width: 100%;
		height: 100vh;
		background-color: rgba(0,0,0,0.6);
		position: fixed;
	}
	.share-box {
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 444rpx;
		background-color: #454545;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.share-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 222rpx;
	}

	.share-item-image {
		width: 94rpx;
		height: 94rpx;
		margin-bottom: 30rpx;
	}

	.share-item-text {
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		color: #FFFFFF;
	}
</style>
