<template>
	<view class="page">
		<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
			<view class="title">{{item.desc}}</view>
			<view class="select">
				<image src="../../static/images/time_icon.png" class="l"></image>
				<span>待上传作品</span>
				<image src="../../static/images/rj_icon.png" class="r"></image>
			</view>
			<view class="info">
				<view class="show" @click="showDetail(item.order_id)" v-if="item.is_ovner == 1">查看</view>
				<view class="show" @click="uploading()" v-if="item.is_ovner == 0">上传</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderList
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				page: 1,
				list: []
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
			// 上传文件
			uploading(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 690rpx;
		min-height: 100vh;
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
		margin-bottom: 29rpx;
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
