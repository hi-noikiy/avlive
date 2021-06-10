<template>
	<view class="main">
		<view class="title">甄嬛传朗读</view>
		<image class="img" src="../users/static/value.jpg"></image>
		<view class="author">作者：安妮爱主持</view>
		<view class="progress-bar">
			<image src="../../static/images/audio-kuaitui.png"></image>
			<view class="slider">
				<u-slider
					min="0" max="100"
					activeColor="#323232"
					:use-slot="true"
				>
				<view class="">
					<view class="badge-button">
						{{value}}
					</view>
				</view>
				</u-slider>
			</view>
			<image src="../../static/images/audio-kuaijin.png"></image>
		</view>
		<view class="control">
			<image src="../../static/images/audio-front.png"></image>
			<view class="oper">
				<image src="../../static/images/audio-puse.png"></image>
			</view>
			<image src="../../static/images/audio-after.png"></image>
		</view>
		<view class="operation">
			<view class="a">
				<image src="../../static/images/audio-download.png"></image>
				<text>下载</text>
			</view>
			<view class="b">
				<image src="../../static/images/audio-fenxiang.png"></image>
				<text>分享</text>
			</view>
			<view class="c">
				<image src="../../static/images/audio-pinglun.png"></image>
				<text>评论</text>
			</view>
			<view class="d">
				<image src="../../static/images/audio-hongbao.png"></image>
				<text>打赏</text>
			</view>
			<view class="e">
				<image src="../../static/images/audio-zan.png"></image>
				<text>点赞</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWorksDetail
	} from '@/api/liveApp';
	export default {
		data() {
			return {
				value: '1:58/9:58',
				row: []
			}
		},
		onLoad(option) {
			var data = {
				id: option.id
			};
			getWorksDetail(data).then(res => {
				this.row = res.data.row
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}
	.title {
		margin-top: 4vh;
		font-size: 35rpx;
		font-weight: 800;
		color: #323232;
	}
	.img {
		width: 333rpx;
		height: 457rpx;
		border-radius: 16rpx;
		margin-top: 2.96vh;
	}
	.author {
		font-size: 30rpx;
		font-weight: bold;
		color: #666666;
		margin-top: 2.46vh;
	}
	.progress-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 9.11vh;
		width: 650rpx;
		height: 40rpx;
		.slider {
			width: 420rpx;
		}
		image {
			width: 44rpx;
			height: 26rpx;
		}
	}
	.control {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5.97vh;
		width: 482rpx;
		height: 120rpx;
		.oper {
			width: 120rpx;
			height: 120rpx;
			background-color: #323232;
			border-radius: 50%;
			image {
				margin-top: 40rpx;
				margin-left: 43rpx;
				width: 34rpx;
				height: 40rpx;
			}
		}
		image {
			width: 42rpx;
			height: 36rpx;
		}
	}
	.operation {
		margin-top: 6.28vh;
		width: 498rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		text {
			font-size: 20rpx;
			font-weight: bold;
			color: #323232;
			padding-top: 21rpx;
		}
		.a image {
			width: 39rpx;
			height: 41rpx;
		}
		.b image {
			width: 34rpx;
			height: 34rpx;
		}
		.c image {
			width: 38rpx;
			height: 37rpx;
		}
		.d image {
			width: 32rpx;
			height: 38rpx;
		}
		.e image {
			width: 39rpx;
			height: 39rpx;
		}
	}
	.badge-button {
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: #323232;
		border-radius: 20rpx;
		font-size: 20rpx;
		color: #FFFFFF;
	}
</style>
