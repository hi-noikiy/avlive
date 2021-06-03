<template>
	<view class="page">
		<view class="module module1">
			<view>项目名称：录制一篇小说，需要多个角色...</view>
			<view>项目类型：音频</view>
			<view>预算：<span>10000</span>元</view>
			<view>期望周期：40天</view>
			<view>音色要求：男声  中年人  老人</view>
		</view>
		<view class="module module2">
			<view class="title">需求详情</view>
			<view>这里是编辑器内容</view>
			<view>这里是编辑器内容</view>
			<view>这里是编辑器内容</view>
		</view>
		<view class="download">
			<image src="../../static/images/link_icon.png" class="icon"></image>
			<view class="name">文档.docx</view>
			<view class="progress">
				<view :style="'width: '+download_progress+'%'"></view>
			</view>
			<view class="btn" @click="download">{{download_status}}</view>
		</view>
		<view class="module module3">
			<view class="title">指派人：</view>
			<image src="../users/static/4.png"></image>
			<view class="name">安妮爱主持</view>
			<view class="status">等待作者确认订单...</view>
		</view>
		<view class="operation">
			<view @click="cancel">取消订单</view>
			<view @click="edit">修改订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				download_progress: 0,
				download_status: '下载'
			}
		},
		methods: {
			// 下载
			download() {
				console.log('下载')
				var that = this;
				var time = setInterval(function() {
					that.download_progress = that.download_progress + 25;
					if(that.download_progress >= 100) {
						clearInterval(time)
						that.download_status = '下载完成'
					}
				},1000)
			},
			// 取消订单
			cancel() {
				uni.showModal({
					title: '提示',
					content: '您确定要取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							console.log('取消订单')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 修改订单
			edit() {
				console.log('修改订单')
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 690rpx;
		min-height: 100vh;
		margin: 0 auto;
		color: #E7E8ED;
	}
	.module {
		width: 100%;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		padding: 30rpx;
	}
	.module1 {
		padding-top: 4rpx;
		view {
			padding-top: 26rpx;
		}
		span {
			color: #E05252;
		}
	}
	.module2 {
		margin-top: 28rpx;
		.title {
			padding-bottom: 6rpx;
		}
	}
	.download {
		width: 100%;
		height: 147rpx;
		position: relative;
		.icon {
			position: absolute;
			margin-top: 34rpx;
			width: 30rpx;
			height: 30rpx;
		}
		.name {
			position: absolute;
			font-size: 30rpx;
			font-family: PingFang;
			font-weight: 500;
			color: #323232;
			margin-top: 28rpx;
			left: 40rpx;
		}
		.progress {
			position: absolute;
			margin-top: 94rpx;
			margin-left: 28rpx;
			width: 440rpx;
			height: 6rpx;
			background-color: rgba($color: #484848, $alpha: 0.4);
			border-radius: 3rpx;
			overflow: hidden;
			view {
				height: 100%;
				background-color: #000000;
			}
		}
		.btn {
			position: absolute;
			background: #3E3E3F;
			border-radius: 13rpx;
			bottom: 24rpx;
			right: 30rpx;
			padding: 12rpx 24rpx;
		}
	}
	.module3 {
		position: relative;
		font-size: 32rpx;
		min-height: 208rpx;
		.title {
			position: absolute;
			padding-top: 30rpx;
		}
		image {
			position: absolute;
			margin-top: 5rpx;
			left: 166rpx;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.name {
			position: absolute;
			padding-top: 30rpx;
			left: 267rpx;
		}
		.status {
			position: absolute;
			bottom: 32rpx;
		}
	}
	.operation {
		margin: 0 auto;
		margin-top: 62rpx;
		width: 646rpx;
		color: #D7DCE2;
		font-size: 38rpx;
		display: flex;
		justify-content: space-between;
		view {
			width: 280rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #323232;
			opacity: 0.95;
			border-radius: 30rpx;
			text-align: center;
		}
	}
</style>
