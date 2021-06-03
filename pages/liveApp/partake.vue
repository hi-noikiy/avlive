<template>
	<view class="wrap" >
		
		<view class="content"  @click='cencel'>
			<view class="content1" >
				<view class="content-top">
					<span>等待雇主筛选</span>
				</view>
				<view class="content-center">
					<span>需要录制一篇多人剧本,要求至少有五个角色出演</span>
					<span id="ospan" style="float: right;margin-right: 20rpx;">></span>
				</view>
				<view class="content-bottom">
					<span>2021年4月21</span>
				</view>
			</view>
		</view>
		<view class="content"  @click='cencel'>
			<view class="content1">
				<view class="content-top">
					<span>失败</span>
				</view>
				<view class="content-center">
					<span>需要录制一篇多人剧本,要求至少有五个角色出演</span>
					<span id="ospan" style="float: right;margin-right: 20rpx;" >></span>
				</view>
				<view class="content-bottom">
					<span>2021年4月21</span>
				</view>
			</view>
		</view>
		<view class="content" @click='cencel'>
			<view class="content1">
				<view class="content-top">
					<span>成功</span>
				</view>
				<view class="content-center">
					<span>需要录制一篇多人剧本,要求至少有五个角色出演</span>
					<span id="ospan" style="float: right;margin-right: 20rpx;" >></span>
				</view>
				<view class="content-bottom">
					<span>2021年4月21</span>
				</view>
			</view>
		</view>
		<view class="content" @click='cencel'>
			<view class="content1">
				<view class="content-top">
					<span>雇主取消订单</span>
				</view>
				<view class="content-center">
					<span>需要录制一篇多人剧本,要求至少有五个角色出演</span>
					<span id="ospan" style="float: right;margin-right: 20rpx;" >></span>
				</view>
				<view class="content-bottom">
					<span>2021年4月21</span>
				</view>
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
				
				
			};
		}, 
		
		methods: {
			cencel(){
				uni.navigateTo({
					
					url:'/pages/see'
				})
			},
			goon(){
				uni.navigateBack({
					data:1
				})
			}
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.wrap{
		width: 800rpx;
		height: 800rpx;
	}
	.title{
		text-align: center;
		border-bottom: 1px solid #ccc;
		font-size: 16px;
		height: 60rpx;
		line-height: 60rpx;
	}
	.title>span{
		position: absolute;
		left: 10rpx;
		font-size: 18px;
	}
	.content{
	width: 750rpx;
	height: 180rpx;
	
	}
	.content1{
		width: 750rpx;
		height: 180rpx;
		border-bottom: 1px solid #ccc;
	}
	.content1 .content-top{
		width: 100%;
		height: 60rpx;
		padding-right: 20rpx;
	}
	.content1 .content-top>span{
		font-size: 15rpx;
		line-height: 60rpx;
		float: right;
		
	}
	.content1 .content-center{
		width: 100%;
		height: 60rpx;
	}
	.content1 .content-center>span{
		line-height: 60rpx;
		font-size: 15rpx;
		margin-left: 40rpx;
	}
	.content1 .content-bottom{
		width: 100%;
		height: 60rpx;
	}
	.content1 .content-bottom>span{
		font-size: 15rpx;
		line-height: 60rpx;
		float: right;
		margin-right: 80rpx;
	}
	#ospan{
		font-size: 22rpx;
	}
	
	
	
</style>
