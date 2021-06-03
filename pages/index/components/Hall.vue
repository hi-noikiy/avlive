<template>
	<view>
		<u-navbar :is-back="false" back-text="返回" title="交易大厅">
			<view class="slot-wrap ml-20">
				<image class="top-search" src="../../../static/images/home_search.png"></image>
			</view>
			<view class="navbar-right mr-20" slot="right" @click="goForm">
				创建需求单
			</view>
		</u-navbar>
		<u-gap height="20" ></u-gap>
		<view class="trading-center">
			<view class="title">交易中心</view>
			<view class="items">
				<image src="../../../static/images/center_a.png" @click="gosure"><!--待确认--></image>
				<image src="../../../static/images/center_b.png" @click="upload"><!--待上传--></image>
				<image src="../../../static/images/center_c.png"><!--待下载--></image>
				<image src="../../../static/images/center_d.png" @click="complete"><!--已完成--></image>
				<image src="../../../static/images/center_e.png" @click="partake"><!--我参与的--></image>
			</view>
		</view>
		<!-- 筛选 -->
		<view class="bg-white">
			<span>排序</span>
			<easy-select class="select" ref="easySelect" :value="selecValue" @selectOne="selectOne"></easy-select>
		</view>
		<u-gap height="20" ></u-gap>
		<view class="wrap">
		<!-- 需求列表 -->
			<view class="list_item" v-for="(item,index) in list" :key="index"  @click="see">
				<view class="title">招标</view>
				<view class="info">录制一篇有声小说需要多少角色</view>
				<view class="price">￥20000</view>
				<view class="num">1个投标</view>
				<view class="end-time">截止日还剩3天6个小时</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getAddressList
	} from '@/api/user.js';
	export default {
		props: {
		},
		data() {
			return {
				
				banner:[{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				value1: 1,
				value2: 2,
				value3: 1,
				options1: [{
						label: '全部',
						value: 1,
					},
					{
						label: '视频',
						value: 2,
					},
					{
						label: '音频',
						value: 2,
					}
				],
				options2: [{
						label: '全部',
						value: 1,
					},
					{
						label: '主持人',
						value: 2,
					},
					{
						label: '模仿配音',
						value: 3,
					},
					{
						label: '游戏',
						value: 4,
					},
					{
						label: '广告',
						value: 5,
					},
					{
						label: '诗歌朗诵',
						value: 6,
					},
				], 
				options3: [{
						label: '默认',
						value: 1,
					},
					{
						label: '价格有低到高',
						value: 2,
					},
					{
						label: '价格由高到低',
						value: 3,
					},
					{
						label: '发布时间',
						value: 4,
					}
				],
				list:[1,1,1,1,1,1,1,1],
				selecValue: '双皮奶'
			};
		}, 
		
		methods: {
			goForm(){
				uni.navigateTo({
					url:'/pages/liveApp/hall/index'
				})
			},
			gosure(){
				// uni.navigateTo({
				// 	url:'/pages/liveApp/onsure',
				// })
				uni.navigateTo({
					url: '/pages/demand/employer'
				})
			},
			selectOne(options) {
				this.selecValue = options.label
			},
			
			upload(){
				// uni.navigateTo({
				// 	url:'/pages/liveApp/upload',
				// })
				uni.navigateTo({
					url: '/pages/demand/demand'
				})
			},
			complete(){
				uni.navigateTo({
					url:'/pages/liveApp/complete',
				})
			},
			partake(){
				uni.navigateTo({
					url:'/pages/liveApp/partake',
				})
			},
			see(){
				console.log('see')
				uni.navigateTo({
					url: '/pages/demand/detail'
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
			image{height: 100%;}
			image:nth-child(1) {width: 72rpx;}
			image:nth-child(2) {width: 72rpx;}
			image:nth-child(3) {width: 74rpx;}
			image:nth-child(4) {width: 71rpx;}
			image:nth-child(5) {width: 95rpx;}
		}
	}
	.bg-white {
		display: flex;
		background-color: transparent;
		margin-top: 40rpx;
		padding-left: 60rpx;
		line-height: 48rpx;
		span {
			font-size: 30rpx;
			color: #000000;
			padding-right: 24rpx;
		}
		.select {
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
