<template>
	<view class="main">
		<image class="colse" src="../../static/images/lclose.png"></image>
		<view class="select">
			<view>直播分类（非必选）</view>
			<image src="../../static/images/xiala_icon.png"></image>
		</view>
		<view class="radios">
			<view class="">语音直播</view>
			<view class="">视频直播</view>
		</view>
		<view class="upload-image">
			<view class="add">
				<image src="../../static/images/hadd.png"></image>
				<view>上传封面</view>
			</view>
			<view class="info">只支持JPG.PNG格式</view>
		</view>
		<view class="grade">
			<label class="radio">
				<radio value="" /><text>美颜等级</text>
			</label>
			<view class="slider">
				<u-slider
					inactive-color="#BBBBBC"
					active-color="#232323"
					height="6"
					block-width="28"
					:block-style="{border: '1px solid #000000'}"
				></u-slider>
			</view>
		</view>
		<view class="btn">开始直播</view>
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
	}
	.colse {
		width: 45rpx;
		height: 45rpx;
		float: right;
		margin-bottom: 41rpx;
	}
	.select {
		clear: both;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 98rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		padding-left: 29rpx;
		image {
			width: 30rpx;
			height: 15rpx;
			mix-blend-mode: color;
			margin-right: 30rpx;
		}
	}
	.radios {
		width: 100%;
		height: 25rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 53rpx;
	}
	.upload-image {
		width: 100%;
		height: 570rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		text-align: center;
		font-weight: bold;
		color: #999999;
		.add {
			margin-top: 210rpx;
			image {
				width: 57rpx;
				height: 57rpx;
			}
			view {
				margin-top: 6rpx;
				font-size: 35rpx;
			}
		}
		.info {
			font-size: 25rpx;
			padding-top: 193rpx;
		}
	}
	.grade {
		margin-top: 54rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		.slider {
			width: 441rpx;
			margin-left: 31rpx;
		}
	}
	.btn {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background: #323232;
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #FFFFFF;
		margin-top: 71rpx;
	}
</style>
