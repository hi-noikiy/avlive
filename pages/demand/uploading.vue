<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<l-file ref="lFile" @up-success="onSuccess"></l-file>
			<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
				<view class="title">{{item.desc}}</view>
				<view class="select">
					<image src="../../static/images/time_icon.png" class="l"></image>
					<span>待上传作品</span>
					<image src="../../static/images/rj_icon.png" class="r"></image>
				</view>
				<view class="info">
					<view class="show" @click="showDetail(item.order_id)" v-if="item.is_ovner == 1">查看</view>
					<view class="show" @tap="onUpload(item.order_id)" v-if="item.is_ovner == 0">上传</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lFile from '@/components/l-file/l-file';
	import {
		getOrderList,
		saveOrder
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				page: 1,
				list: [],
				order_id: '',
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			// 获取数据
			getData(){
				var that = this;
				var data = {
					order_status: 1,
					user_type: '1',
					page: that.page
				};
				getOrderList(data).then(res => {
					that.list = res.data.data;
				})
			},
			// 查看详情
			showDetail(order_id){
				uni.navigateTo({
					url: 'demand?order_id='+order_id
				})
			},
			/* 上传 */
			onUpload(order_id) {
				this.order_id = order_id;
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://qyh.ugekeji.com/api/v3/upload', //替换为你的
					name: 'file'
				});
			},
			onSuccess(res) {
				var url = res.data.id;
				var that = this;
				var data = {
					order_id: that.order_id,
					download_link: url
				};
				saveOrder(data).then(res => {
					if(res.status == 200) {
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/demand/download'
							})
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
	}
	.page {
		width: 690rpx;
		margin: 0 auto;
	}
	.item {
		width: 100%;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		color: #E7E8ED;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		margin-top: 29rpx;
		span {
			color: #E05252;
		}
		.title {
			width: 628rpx;
		}
		.select {
			width: 628rpx;
			height: 24rpx;
			line-height: 24rpx;
			display: flex;
			justify-content: flex-end;
			.l {
				width: 24rpx;
				height: 24rpx;
			}
			span {
				font-size: 24rpx;
				padding-left: 9rpx;
				padding-right: 12rpx;
			}
			.r {
				margin-top: 2rpx;
				width: 11rpx;
				height: 20rpx;
			}
		}
		.info {
			margin-top: 25rpx;
			width: 628rpx;
			height: 48rpx;
			display: flex;
			font-size: 22rpx;
			.type {
				width: 136rpx;
				height: 42rpx;
				line-height: 42rpx;
				border: 2rpx solid #E7E8ED;
				opacity: 0.68;
				border-radius: 11rpx;
				text-align: center;
			}
			.nums {
				padding-left: 25.6rpx;
				margin-top: 5rpx;
			}
			.author {
				display: flex;
				image {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-left: 13.5rpx;
					margin-right: 13.1rpx;
				}
				span {
					color: #E7E8ED;
				}
			}
			.show {
				width: 112rpx;
				height: 48rpx;
				line-height: 48rpx;
				border: 2rpx solid #E7E8ED;
				opacity: 0.98;
				border-radius: 23rpx;
				text-align: center;
				position: absolute;
				right: 60.8rpx;
			}
		}
	}
</style>
