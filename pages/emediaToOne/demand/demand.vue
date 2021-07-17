<template>
	<view class="page">
		<view class="list introduce">
			<view class="title">需求描述</view>
			<view class="info">{{order_info.desc}}</view>
			<view class="content">
				<span>需要：</span>
				<view v-for="(item, index) in order_info.timbre_type_name">{{item}}</view>
			</view>
		</view>
		<block v-if="order_info.paid != 1 ||order_info.order_type == 1 ">
			<view class="list item" v-for="(item, index) in order_list">
				<view class="c1">
					<view class="l">
						<image :src="item.user_avatar" class="head"></image>
						<view class="name">{{item.user_nickname}}</view>
					</view>
					<view class="r">
						<image src="../../static/images/pinglun_icon.png" class="contact-icon"></image>
						<view class="contact">联系ta</view>
					</view>
				</view>
				<view class="c2">
					报价<span>{{item.pay_price}}</span>元，周期<span>{{item.cycle_value}}</span>{{item.cycle_type}}</view>
				<view class="c3">{{item.remake}}</view>
				<view class="c4">
					<view class="time">报价时间：{{item.add_time}}</view>
					<view class="btn" v-if="order_info.order_message == 1" @click="toPay(item.id)">选他并支付</view>
					<view class="btn" v-else>修改报价</view>
				</view>
			</view>
			<view class="btns" v-if="order_info.order_type == 1">
				<view class="btn" @click="edit">修改订单</view>
				<view class="btn" @click="cancel">取消订单</view>
			</view>
			<!-- 			<view class="" v-if="order_info.order_type != 3">
				<view class="btns" v-if="order_info.order_message ==1">
					<view class="btn" @click="edit">修改订单</view>
					<view class="btn" @click="cancel">取消订单</view>
				</view>
				<view class="btns" v-else>
					<view class="btn" >联系雇主</view>
					<view class="btn" >确认订单</view>
				</view>
			</view> -->

		</block>
		
		<view class="" v-if="order_info.order_type == 2">
			<view class="btns" v-if="order_info.order_message ==1">
				<view class="btn" @click="edit">修改订单</view>
				<view class="btn" @click="cancel">取消订单</view>
			</view>
			<view class="btns"  v-else>
				<view class="btn">联系雇主</view>
				<view class="btn" @click="Confirmorder">确认订单</view>
			</view>
		</view>
		
		<view class="" v-if="order_info.order_type == 3">
			<view class="btns" v-if="order_info.order_message == 1">
				<view class="btn" @click="edit">修改订单</view>
				<view class="btn" @click="cancel">取消订单</view>
			</view>
			<view class="btns"  v-else>
				<view class="btn" @click="Confirmorderpay">确认并付款</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserOrderList,
		cancelOrder,
		payOrder,
		checkOrder,
		saveOrder
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				order_id: '',
				order_info: [],
				order_list: []
			}
		},
		onLoad(options) {
			this.getdata(options)
		},
		methods: {
			getdata(options){
				var that = this;
				that.order_id = options.order_id;
				var data = {
					order_id: options.order_id
				};
				getUserOrderList(data).then(res => {
					that.order_info = res.data.order_info;
					that.order_info.timbre_type_name = res.data.order_info.timbre_type_name.split(' ');
					that.order_list = res.data.order_list;
				})
			},
			// 取消订单
			cancel() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要取消订单吗？',
					success: function(res) {
						if (res.confirm) {
							var data = {
								order_id: that.order_info.order_id
							};
							cancelOrder(data).then(result => {
								uni.showToast({
									icon:'none',
									title: result.msg
								})
								if (result.status == 200) {
									setTimeout(() => {
										// 跳转到指定组件
										uni.navigateBack({
											delta:1
										})
									}, 1500)
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
					url: '/pages/liveApp/hall/index?order_id=' + this.order_id
				})
			},
			//确认订单
			Confirmorder(){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要确认订单吗？',
					success: function(res) {
						if (res.confirm) {
							var data = {
								order_id: that.order_info.order_id,
								type:1
							};
							saveOrder(data).then(result => {
								if (result.status == 200) {
									uni.showToast({
										title: '订单确认成功',
										icon:'none'
									})
									setTimeout(() => {
										// 跳转到指定组件
										uni.navigateBack({
											delta:1
										})
									}, 1500)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//确认并付款
			Confirmorderpay(){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要确认订单吗？',
					success: function(res) {
						if (res.confirm) {
							var data = {
								order_id: that.order_info.order_id,
								type:1
							};
							saveOrder(data).then(result => {
								if (result.status == 200) {
									var orderdata = {
										order_id: that.order_info.order_id,
										pay_type: 'yue'
									}
									payOrder(orderdata).then(res => {
										console.log("支付结果", res)
										if (res.status == 200) {
											uni.hideLoading()
											uni.showToast({
												title: '确认成功',
												icon: 'none'
											})
											setTimeout(function() {
												uni.navigateBack({
													delta: 1
												})
											}, 1500);
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 支付
			toPay(id) {
				checkOrder({
					id: id,
					order_id: this.order_id
				}).then(res => {
					if (res.status == 200) {
						console.log('checkOrder 200')
						payOrder({
							order_id: this.order_id,
							pay_type: 'yue'
						}).then(res => {
							console.log(res.msg)
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							if (res.status == 200) {
								console.log('待上传')
								// this.getdata()
								// uni.navigateTo({

								// })
							}
						})
					}
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
		color: #FFFFFF;
	}

	.list {
		width: 100%;
		background-color: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 29rpx;
	}

	.introduce {
		padding-bottom: 30rpx;

		.title {
			font-size: 32rpx;
			color: #E7E8ED;
			padding-bottom: 16rpx;
		}

		.info {
			font-size: 30rpx;
		}

		.content {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;

			span {
				font-size: 28rpx;
				color: #E7E8ED;
			}

			view {
				font-size: 26rpx;
				color: #323232;
				background-color: #E7E8ED;
				border-radius: 11rpx;
				padding: 10rpx;
				height: 40rpx;
				line-height: 24rpx;
				text-align: center;
				font-family: PingFang;
				font-weight: bold;
				margin-right: 32rpx;
				margin-bottom: 8rpx;
			}
		}
	}

	.item {
		display: flex;
		flex-direction: column;

		.c1 {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			font-family: PingFang;
			font-weight: 500;

			.l {
				display: flex;
				align-items: center;

				.head {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.name {
					color: #E7E8ED;
					font-size: 32rpx;
					padding-left: 21rpx;
				}
			}

			.r {
				display: flex;
				align-items: center;

				.contact-icon {
					width: 35rpx;
					height: 32rpx;
					margin-right: 15rpx;
				}

				.contact {
					font-size: 28rpx;
					color: #E7E8ED;
				}
			}
		}

		.c2 {
			padding-top: 23rpx;
			font-size: 32rpx;

			span {
				color: #E05252;
			}
		}

		.c3 {
			padding-top: 31rpx;
			font-size: 30rpx;
			color: #E3E3E3;
			opacity: 0.95;
		}

		.c4 {
			margin-top: 16rpx;
			height: 58rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.time {
				font-size: 26rpx;
				color: #E4E5EA;
				opacity: 0.65;
			}

			.btn {
				width: 180rpx;
				height: 58rpx;
				line-height: 58rpx;
				background: #E4E5EA;
				border-radius: 29rpx;
				color: #323232;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}

	.btns {
		width: 646rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;

		.btn {
			width: 280rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #323232;
			opacity: 0.95;
			border-radius: 30rpx;
			font-size: 38rpx;
			color: #D7DCE2;
			text-align: center;
		}
	}
</style>
