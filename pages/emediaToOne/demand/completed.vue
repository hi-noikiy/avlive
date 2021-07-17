<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
				<view class="title">{{item.desc}}</view>
				<view style="display: flex;justify-content: flex-end;width: 100%;">
					<view class="show">评价</view>
				</view>
				
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
		onShow() {
			this.getData();
		},
		methods: {
			// 获取数据
			getData(){
				var that = this;
				var data = {
					order_status: 3,
					user_type: '1',
					page: that.page
				};
				getOrderList(data).then(res => {
					that.list = res.data.data;
				})
			},
			showDetail(){
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
		.show {
			width: 112rpx;
			height: 48rpx;
			line-height: 48rpx;
			border: 2rpx solid #E7E8ED;
			opacity: 0.98;
			border-radius: 23rpx;
			text-align: center;
			right: 60.8rpx;
		}
	}
</style>
