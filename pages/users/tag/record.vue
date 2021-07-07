<template>
	<view>
		<view class="main">
			<view class="titles">
				<text style="width: 20%;">申请标签</text>
				<text style="width: 30%;">申请时间</text>
				<text style="width: 17%;">状态</text>
				<text style="width: 23%;">费用</text>
				<text style="width: 10%;">操作</text>
			</view>
			<view class="item" v-for="(item, index) in list">
				<text style="width: 20%;">{{item.form_class_name}}</text>
				<text style="width: 30%;">{{item.add_time}}</text>
				<text style="width: 20%;" v-if="item.status == 0">失败</text>
				<text style="width: 20%;" v-if="item.status == 1">已通过</text>
				<text style="width: 20%;" v-if="item.status == 2">审核中</text>
				<text style="width: 20%;">{{item.pay_price}}</text>
				<view style="width: 20%;" class="btn" v-if="item.status == 0">再次认证</view>
				<view style="width: 20%;" class="btn" v-if="item.status == 1">已通过</view>
				<view style="width: 20%;" class="btn" v-if="item.status == 2">审核中</view>
			</view>
		</view>
		<view class="bt">注：每个用户可免费认证一个技能，以后每个技能认证保证金为298，一年后可以申请退换。</view>
	</view>
</template>

<script>
	import {
		formClassList
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				list: [],
				page: 1,
				limit: 12
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				var that = this;
				var data = {
					page: that.page,
					limit: that.limit,
					uid: uni.getStorageSync('uid')
				};
				formClassList(data).then(res => {
					console.log(res)
					that.list = res.data.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100% 100vh;
	}
	.main {
		width: 725rpx;
		margin-top: 20rpx;
		margin-left: 14rpx;
		background: #323232;
		border: 1rpx solid #000000;
		border-radius: 10rpx;
		text {
			text-align: center;
			color: rgba(255, 255, 255, 1);
		}
		.titles {
			margin-top: 39rpx;
			width: 636rpx;
			font-size: 30rpx;
			font-family: STHeitiSC;
			font-weight: 300;
			color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			margin-left: 40rpx;
			margin-bottom: 34rpx;
		}
		.item {
			margin-left: 50rpx;
			width: 665rpx;
			height: 54rpx;
			line-height: 54rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 34rpx;
			.btn {
				width: 132rpx;
				height: 54rpx;
				line-height: 54rpx;
				text-align: center;
				background: #323232;
				border: 3rpx solid #FFFFFF;
				border-radius: 10rpx;
				color: #FFFFFF;
			}
		}
	}
	.bt {
		width: 675rpx;
		padding-top: 154rpx;
		margin: 0 auto;
		font-size: 24rpx;
		font-family: STHeitiSC;
		font-weight: 300;
		color: #FFFFFF;
	}
</style>
