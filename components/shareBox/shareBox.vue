<template>
	<view>
		<u-mask :show="shareBox" @click="shareBox = false" :custom-style="{background: 'rgba(0, 0, 0, 0.5)'}">
			<view class="share-box" v-if="shareBox" @tap.stop>
				<view class="share-item" v-for="(item, index) in list" @click="share">
					<image class="share-item-image" :src="item.image"></image>
					<text class="share-item-text">{{item.title}}</text>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		name:"shareBox",
		data() {
			return {
				shareBox: false,
				list: [
					{
						image: '/static/images/share_wx.png',
						title: '微信'
					},
					{
						image: '/static/images/share_pyq.png',
						title: '朋友圈'
					},
					{
						image: '/static/images/share_qq.png',
						title: 'QQ'
					},
					{
						image: '/static/images/share_hy.png',
						title: '好友'
					},
					{
						image: '/static/images/share_xz.png',
						title: '下载'
					},
					{
						image: '/static/images/share_wb.png',
						title: '微博'
					},
					{
						image: '/static/images/share_sc.png',
						title: '收藏'
					},
					{
						image: '/static/images/share_qqkj.png',
						title: 'QQ空间'
					},
					{
						image: '/static/images/share_lj.png',
						title: '链接'
					},
					{
						image: '/static/images/share_th.png',
						title: '举报'
					},
				]
			};
		},
		methods: {
			showShare(bool) {
				this.shareBox = bool;
			},
			share() {
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://uniapp.dcloud.io/",
				    title: "uni-app分享",
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		}
	}
</script>

<style>
	.share-box {
		position: fixed;
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
