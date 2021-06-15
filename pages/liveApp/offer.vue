<template>
	<view class="main">
		<view class="i i2">
			<view class="title">报价</view>
			<input type="text" v-model="pay_price" placeholder="请输入" />
		</view>
		<view class="i i3">
			<view class="title">制作周期</view>
			<input type="text" v-model="cycle_data" placeholder="请输入" />
			<view class="info">
				<picker :range="unitArr" @change="unitChange" :value="unitIndex">
					<view>{{unit}}</view>
				</picker>
				<image src="/static/images/bs_icon.png"></image>
			</view>
		</view>
		<view class="m m2">
			<view>备注</view>
			<textarea v-model="remake" placeholder="请输入备注" />
		</view>
		<view class="sub" @click="submit">提交</view>
	</view>
</template>

<script>
	import {
		takeOffer,
		myTakeOffer
	} from '@/api/liveApp';
	export default {
		data() {
			return {
				unitArr: ['小时','天','周','月'],
				unit: '小时',
				unitIndex: 0,
				checkboxList: [],
				pay_price: '',
				cycle_data: '',
				remake: '',
				order_id: ''
			};
		},
		onLoad(options) {
			if(JSON.stringify(options) != "{}") {
				this.order_id = options.order_id;
			}
			var that = this;
			var data = {
				order_id: this.order_id
			};
			myTakeOffer(data).then(res => {
				that.pay_price = res.data.pay_price;
				that.cycle_data = res.data.cycle_value;
				that.remake = res.data.remake;
				that.unit = res.data.cycle_type;
				for(let i = 0; i < that.unitArr.length; i++) {
					if(that.unitArr[i] == that.unit) {
						that.unitIndex = i;
						break;
					}
				}
			});
		},
		methods: {
			// 周期选中
			unitChange(e) {
				this.unitIndex = e.detail.value;
				this.unit = this.unitArr[e.detail.value];
			},
			// 提交报价
			submit() {
				var that = this;
				var data = {
					pay_price: that.pay_price,
					cycle_type: that.unit,
					cycle_value: that.cycle_data,
					remake: that.remake,
					order_id: that.order_id
				};
				takeOffer(data).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					if(res.status == 200) {
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/demand/detail?order_id='+that.order_id
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.i {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		.title {
			font-size: 28rpx;
			font-weight: bold;
			padding-left: 24rpx;
		}
		.info {
			font-size: 24rpx;
		}
		input {
			color: #999999;
			font-size: 24rpx;
		}
	}
	.i2 {
		.title { width: 35%; }
		input {
			width: 65%;
			text-align: right;
			margin-right: 24rpx;
		}
	}
	.i3 {
		.title {width: 50%;}
		input {width: 30%;}
		.info {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 20%;
			image {
				margin-right: 24rpx;
				margin-left: 14rpx;
				width: 22rpx;
				height: 12rpx;
			}
		}
	}
	.m {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		padding: 25rpx;
		margin-top: 20rpx;
		view {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 32rpx;
		}
	}
	.m2 {
		textarea {
			height: 86rpx;
			font-size: 24rpx;
		}
	}
	.sub {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #323232;
		background-color: rgba($color: #323232, $alpha: 0.95);
		border-radius: 15rpx;
		font-size: 30rpx;
		text-align: center;
		margin-top: 109rpx;
		margin-bottom: 40rpx;
		font-size: 30rpx;
		color: #D7DCE2;
	}
</style>
