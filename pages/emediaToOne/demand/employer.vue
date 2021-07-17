<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
				<view class="title">{{item.desc}}</view>
				<view class="select">
					<image src="../../static/images/time_icon.png" class="l"></image>
					<span v-if="item.order_type == 1 && item.order_status == 0">待选择作者</span>
					<span v-if="item.order_type == 2 && item.order_status == 0">待作者确认</span>
					<span v-if="item.order_type == 3 && item.order_status == 0">待雇主确认</span>
					<image src="../../static/images/rj_icon.png" class="r"></image>
				</view>
				<view class="info" v-if="item.order_type == 1">
					<view class="type">普通需求单</view>
					<view class="nums">
						已有<span>{{item.order_count}}</span>人报价
					</view>
					<view class="show" @click="showDetail(item.order_id)">查看</view>
				</view>
				<view class="info" v-if="item.order_type == 2">
					<view class="type">指派作者单</view>
					<view class="author">
						<image src="../users/static/4.png"></image>
						<view>安妮爱主持</view>
					</view>
					<view class="show" @click="showDetail(item.order_id)">查看</view>
				</view>
				<view class="info" v-if="item.order_type == 3">
					<view class="type">指定雇主单</view>
					<view class="author">
						<image src="../users/static/4.png"></image>
						<view>多金的雇主</view>
					</view>
					<view class="show" @click="showDetail(item.order_id)">查看</view>
				</view>
			</view>
			<!-- <view class="item">
				<view class="title">录制一篇多人剧本，要求至少有五个角色出演，可 以临时发挥</view>
				<view class="select">
					<image src="../../static/images/time_icon.png" class="l"></image>
					<span>待作者确认</span>
					<image src="../../static/images/rj_icon.png" class="r"></image>
				</view>
				<view class="info">
					<view class="type">指派作者单</view>
					<view class="author">
						<image src="../users/static/4.png"></image>
						<view>安妮爱主持</view>
					</view>
					<view class="show">查看</view>
				</view>
			</view>
			<view class="item">
				<view class="title">录制一篇多人剧本，要求至少有五个角色出演，可 以临时发挥</view>
				<view class="select">
					<image src="../../static/images/time_icon.png" class="l"></image>
					<span>待雇主确认</span>
					<image src="../../static/images/rj_icon.png" class="r"></image>
				</view>
				<view class="info">
					<view class="type">指定雇主单</view>
					<view class="author">
						<image src="../users/static/4.png"></image>
						<view>多金的雇主</view>
					</view>
					<view class="show">查看</view>
				</view>
			</view> -->
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
					order_status: 0,
					user_type: '1',
					page: that.page
				};
				getOrderList(data).then(res => {
					that.list = res.data.data;
				})
			},
			showDetail(order_id){
				uni.navigateTo({
					url: 'demand?order_id='+order_id
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
