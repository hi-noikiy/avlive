<template>
	<view class="main">
		<input class="title" type="text" value="" placeholder="请输入标题" />
		<textarea class="content" value="" placeholder="请输入内容..." />
		<view class="img">
			<image class="t" src="../../static/images/jia.png"></image>
			<view class="b">上传封面</view>
		</view>
		<view class="info">
			<view class="l">
				<label class="radio"><radio name="rname" value="1" checked="true" />所有人</label>
				<label class="radio"><radio name="rname" value="2" />仅限好友</label>
			</view>
			<view class="r">只支持图片格式</view>
		</view>
		<view class="btn">发布</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				editorCtx: ''
			}
		},
		methods: {
			 onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
				  this.editorCtx = res.context
				}).exec()
			},
		}
	}
</script>

<style lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
	}
	.title {
		width: 100%;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		font-size: 35rpx;
		font-weight: 500;
		padding-left: 32rpx;
		padding-right: 32rpx;
	}
	.content {
		width: 100%;
		height: 300rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #999999;
		margin-top: 30rpx;
		padding: 30rpx;
	}
	.img {
		width: 100%;
		margin-top: 30rpx;
		min-height: 160rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999999;
		.t {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 16rpx;
		}
		.b {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 34rpx;
		.l {
			font-size: 25rpx;
		}
		.r {
			font-size: 20rpx;
			font-weight: bold;
			color: #999999;
		}
	}
	.btn {
		margin-top: 100rpx;
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background: #323232;
		border-radius: 15rpx;
		text-align: center;
		color: #D7DCE2;
		font-size: 30rpx;
	}
</style>
