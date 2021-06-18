<template>
	<view class="page">
		<view class="module module1">
			<view>项目名称：{{order_info.desc}}</view>
			<view>项目类型：音频</view>
			<view>预算：<span>{{order_info.pay_num == 0 ? order_info.pay_price : order_info.pay_num}}</span>元</view>
			<view>期望周期：{{order_info.cycle}}</view>
			<view>音色要求：{{order_info.timbre_type_name}}</view>
		</view>
		<view class="module module2">
			<view class="title">需求详情</view>
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
		<view class="download">
			<image src="../../static/images/link_icon.png" class="icon"></image>
			<view class="name">附件文件</view>
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
			<view @click="cancel" v-if="order_info.order_message == 1">取消订单</view>
			<view @click="edit" v-if="order_info.order_message == 1">修改订单</view>
			<view v-if="order_info.order_message == 0">联系雇主</view>
			<view @click="offer" v-if="order_info.order_message == 0">报价</view>
		</view>
	</view>
</template>

<script>
	import HTMLParser from '@/utils/htmlParser.js'
	import {
		getUserOrderList,
		cancelOrder
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				download_progress: 0,
				download_status: '下载',
				htmlNodes: [],
				// 订单信息
				order_info: [],
				// 下面的列表
				order_list: [],
				// 查询条件
				uid: '',
				order_id: ''
			}
		},
		// 获取数据
		onLoad(options) {
			var that = this;
			that.order_id = options.order_id;
			var data = {
				order_id: options.order_id
			};
			getUserOrderList(data).then(res => {
				that.order_info = res.data.order_info;
				// 需求详情
				that.htmlNodes = HTMLParser(that.order_info.remake);
				
				that.order_list = res.data.order_list;
			})
		},
		methods: {
			// 下载
			download() {
				var that = this;
				that.download_status = '下载中';
				// 请求下载
				const downloadTask = uni.downloadFile({
				    url: that.order_info.enclosure,
				    success: (res) => {
				        if (res.statusCode === 200) {
							// 打开文件
							uni.openDocument({
								filePath: res.tempFilePath,
								success: function(res) {
									console.log('打开文件成功');
								}
							});
							// 保存文件
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success(result) {
									var savedFilePath = result.savedFilePath;
									uni.showToast({
										title: '文件保存在'+savedFilePath,
										icon: 'none',
										duration: 2000
									})
									that.download_status = '下载完成';
								},
								fail() {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							})
				        }
				    }
				});
				// 更新下载进度条
				downloadTask.onProgressUpdate((res) => {
					that.download_progress = res.progress
				});
			},
			// 取消订单
			cancel() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							var data = {
								order_id: that.order_info.order_id
							};
							cancelOrder(data).then(result => {
								uni.showToast({
									title: res.data.msg
								})
								if(result.data.status == 200) {
									setTimeout(()=>{
										// 跳转到指定组件
										uni.switchTab({
											url: '/pages/index/components/Hall'
										})
									},1000)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 修改订单
			edit() {
				uni.navigateTo({
					url: '/pages/liveApp/hall/index?uid='+this.uid+'&order_id='+this.order_id
				})
			},
			// 报价
			offer() {
				uni.navigateTo({
					url: '/pages/liveApp/offer?order_id='+this.order_id
				})
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
