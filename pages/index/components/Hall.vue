<template>
	<view>
		<u-navbar :is-back="false" back-text="返回" title="交易大厅">
			<!-- <view class="slot-wrap ml-20">
				<image class="top-search" src="../../../static/images/home_search.png"></image>
			</view> -->
			<view class="navbar-right mr-20" slot="right" @click="goForm">
				创建需求单
			</view>
		</u-navbar>
		<u-gap height="20" ></u-gap>
		<view class="trading-center">
			<view class="title">交易中心</view>
			<view class="items">
				<view class="item" @click="gosure">
					<image src="../../../static/images/center_a.png"></image>
					<text>待确认</text>
				</view>
				<view class="item" @click="upload">
					<image src="../../../static/images/center_b.png"></image>
					<text>待上传</text>
				</view>
				<view class="item" @click="download">
					<image src="../../../static/images/center_c.png"></image>
					<text>待下载</text>
				</view>
				<view class="item" @click="complete"> <!--  click="complete" -->
					<image src="../../../static/images/center_d.png"></image>
					<text>已完成</text>
				</view>
				<view class="item" @click="partake"><!--  click="partake" -->
					<image src="../../../static/images/center_e.png"></image>
					<text>我参与的</text>
				</view>
			</view>
		</view>
		<!-- 筛选 -->
		<view class="bg-white">
			<text>排序</text>
			<easy-select
				class="select"
				ref="easySelect"
				:options="orders"
				:value="selecValue"
				@selectOne="selectOne"
			></easy-select>
		</view>
		<u-gap height="20" ></u-gap>
		<view class="wrap">
		<!-- 需求列表 -->
			<view class="list_item" v-for="(item,index) in list" :key="index"  @click="see(item)">
				<view class="title">招标</view>
				<view class="info">{{item.desc}}</view>
				<view class="price">￥{{item.pay_num == 0 || item.diff_false ? item.pay_price : item.pay_num}}</view>
				<view class="num">{{item.order_count}}个投标</view>
				<view class="end-time" v-if="!item.diff_false">截止日还剩{{item.diff_day}}天{{item.diff_hour}}个小时</view>
				<view class="end-time" v-else>已过期</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getAddressList
	} from '@/api/user.js';
	import {
		getOrderList
	} from '@/api/liveApp.js';
	export default {
		props: {
		},
		data() {
			return {
				
				// 排序
				orders: [
					{
						value: 1,
						label: '默认'
					},
					{
						value: 2,
						label: '价格由低到高'
					},
					{
						value: 3,
						label: '价格由高到低'
					}
				],
				selecValue: '默认',
				order: 1,
				// 订单列表
				list: [],
				// 当前页码
				page: 1,
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			// 创建需求单
			goForm(){
				uni.navigateTo({
					url:'/pages/liveApp/hall/index'
				})
			},
			// 待确认
			gosure(){
				// uni.navigateTo({
				// 	url:'/pages/liveApp/onsure',
				// })
				uni.navigateTo({
					url: '/pages/demand/employer'
				})
			},
			// 待上传
			upload(){
				uni.navigateTo({
					url: '/pages/demand/uploading'
				})
			},
			// 待下载
			download(){
				uni.navigateTo({
					url: '/pages/demand/download'
				})
			},
			// 已完成
			complete(){
				uni.navigateTo({
					url:'/pages/demand/completed',
				})
			},
			// 我参与的
			partake(){
				uni.navigateTo({
					url:'/pages/demand/involved',
				})
			},
			// 需求详情
			see(item){
				if(item.is_over == 1 || item.unclick == 1) {
					return false;
				}
				uni.navigateTo({
					url: '/pages/demand/detail?order_id='+item.order_id+'&uid='+item.uid
				})
			},
			// 排序选中
			selectOne(options) {
				this.selecValue = options.label;
				this.order = options.value;
				this.page = 1;
				this.getData();
			},
			// 获取数据
			getData() {
				var that = this;
				var data = {
					page: this.page,
					order: this.order
				}
				getOrderList(data).then(res => {
					that.list = res.data.data;
				})
			},
			
			
			
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change() {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			},
			tapAddress: function(e, addressid) {
				this.active = e;
				this.$emit('OnChangeAddress', addressid);
			},
			close: function() {
				this.$emit('changeClose');
				this.$emit('changeTextareaStatus');
			},
			goAddressPages: function() {
				this.$emit('changeClose');
				this.$emit('changeTextareaStatus');
				uni.navigateTo({
					url: this.pagesUrl
				});

			},
			getAddressList: function() {
				let that = this;
				getAddressList({
					page: 1,
					limit: 5
				}).then(res => {
					let addressList = res.data;
					//处理默认选中项
					for (let i = 0, leng = addressList.length; i < leng; i++) {
						if (addressList[i].id == that.address.addressId) {
							that.active = i;
						}
					}
					that.$set(that, 'addressList', addressList);
					that.is_loading = false;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.navbar-right {
		color: #000000;
		font-size: 28rpx;
	}
	.top-search {
		width: 40rpx;
		height: 40rpx;
	}
	.list_item{
		margin: 0 auto;
		width: 690rpx;
		height: 180rpx;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		margin-bottom: 30rpx;
		position: relative;
		color: #FFFFFF;
		.title {
			position: absolute;
			margin-top: 30rpx;
			margin-left: 31rpx;
			font-size: 30rpx;
		}
		.info {
			position: absolute;
			margin-top: 76rpx;
			left: 34rpx;
			font-size: 28rpx;
			width: 70%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.price {
			position: absolute;
			color: #DE0000;
			font-size: 30rpx;
			margin-top: 78rpx;
			right: 31rpx;
		}
		.num {
			position: absolute;
			font-size: 22rpx;
			margin-top: 129rpx;
			left: 30rpx;
			color: #E7E8ED;
		}
		.end-time {
			position: absolute;
			font-size: 22rpx;
			margin-top: 129rpx;
			right: 32rpx;
			color: #E7E8ED;
		}
	}
	.trading-center {
		margin: 0 auto;
		width: 690rpx;
		height: 220rpx;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		.title {
			color: #FFFFFF;
			font-size: 30rpx;
			padding-top: 30rpx;
			margin-left: 30rpx;
		}
		.items {
			width: 628rpx;
			height: 109rpx;
			margin: 0 auto;
			margin-top: 19rpx;
			display: flex;
			justify-content: space-between;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				image {
					width: 72rpx;
					height: 72rpx;
				}
				text {
					color: #FFFFFF;
				}
			}
		}
	}
	.bg-white {
		display: flex;
		background-color: transparent;
		margin-top: 40rpx;
		padding-left: 60rpx;
		line-height: 48rpx;
		text {
			position: absolute;
			z-index: 999;
			font-size: 30rpx;
			color: #000000;
			padding-right: 24rpx;
		}
		.select {
			margin-left: 70rpx;
			width: 180rpx!important;
			height: 48rpx!important;
			border: 2rpx solid #5E5E5E;
			border-radius: 11rpx;
			color: #404040!important;
			font-size: 24rpx!important;
		}
		.easy-select-options {
			min-width: 140rpx!important;
		}
	}
</style>
