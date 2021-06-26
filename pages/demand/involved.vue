<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
				<view style="display: flex;justify-content: flex-end;width: 100%;">
					<view class="show" v-if="item.is_receiving == 0">等待雇主筛选</view>
					<view class="show" v-if="item.is_receiving == 1">成功</view>
					<view class="show" v-if="item.is_receiving == 2">失败</view>
				</view>
				<view class="title">{{item.desc}}</view>
				<view style="display: flex;justify-content: flex-end;width: 100%;">
					<view class="show">{{item.add_time}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		joinTakeOffer
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
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
					page:1,
				};
				joinTakeOffer(data).then(res => {
					console.log("我参与的报价",res)
					that.list = res.data 
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

		.show {
			height: 48rpx;
			line-height: 48rpx;
			opacity: 0.98;
			border-radius: 23rpx;
			text-align: center;
			right: 60.8rpx;
		}
	}
</style>
