<template>
	<view class="wrap" >
		
		<view class="content">
			<view class="content1">
				<view class="content-left">
					<span>需求描述</span>
				</view>
				<view class="content-right">
					<p>需要录制一篇多人剧本,要求至少有五个角色出演</p>
					<span >男声</span>
					<span style="margin-left:50rpx ;">老年人</span>
				</view>
			</view>
			<view class="content2">
				<view class="content-top">
					<image src="" mode=""></image>
					<span>安妮爱主持</span>
				</view>
				<view class="content-center">
					<p>报价<span>18000</span>元,周期<span>16</span>天</p>
					<p>有声读物录制专业10年,擅长各类有声录制,欢迎联系</p>
				</view>
				<view class="content-bottom">
					<span>报价时间:2021年4月16日</span>
					<a>选他</a>
				</view>
			</view>
			<view class="content2">
				<view class="content-top">
					<image src="" mode=""></image>
					<span>安妮爱主持</span>
				</view>
				<view class="content-center">
					<p>报价<span>18000</span>元,周期<span>16</span>天</p>
					<p>有声读物录制专业10年,擅长各类有声录制,欢迎联系</p>
				</view>
				<view class="content-bottom">
					<span>报价时间:2021年4月16日</span>
					<a>选他</a>
				</view>
			</view>
		</view>
		<view class="cencel">
			取消订单
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
				uni.navigateBack({
					delta:1
				})
			},
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
		height: 100%;
		
	}
	.content1{
		width: 750rpx;
		height: 200rpx;
		border-bottom: 1px solid #ccc;
	}
	.content-left{
		width: 150rpx;
		height: 200rpx;
		float: left;
		text-align: center;
		
	}
	.content-left>span{
		border: 1px solid #ccc;
		line-height: 60rpx;
		display: inline-block;
		width: 140rpx;
		height: 60rpx;
		margin-top: 60rpx;
		margin-left: 20rpx;
	}
	.content-right{
		width: 600rpx;
		height: 200rpx;
		float: right;
	}
	.content-right>p{
		font-size: 15rpx;
		margin-top: 50rpx;
		margin-bottom: 40rpx;
		margin-left: 40rpx;
	}
	.content-right>span{
		border: 1px solid #ccc;
		display: inline-block;
		width: 120rpx;
		text-align: center;
		border-radius: 40rpx;
		margin-left: 40rpx;
	}
	.content2{
		width: 750rpx;
		height: 400rpx;
		padding-left: 20rpx;
		border-bottom: 1px solid #ccc;
	}
	.content-top{
		width: 750rpx;
		height: 120rpx;
		position: relative;
	}
	.content-top>image{
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		border: 1px solid #ccc;
		margin-top: 20rpx;
	}
	.content-top>span{
		margin-left: 30rpx;
		position: absolute;
		top: 40rpx;
		font-size: 15rpx;
	}
	.content-center{
		width: 750rpx;
		height: 160rpx;
		padding-top: 20rpx;
	}
	
	.content-center>p{
		font-size: 15rpx;
		margin-bottom: 20rpx;
	}
	.content-center>p>span{
		color: red;
	}
	.content-bottom{
		width: 750rpx;
		height: 120rpx;
		position: relative;
	}
	.content-bottom>span{
		line-height: 120rpx;
		color: #ccc;
		font-size: 15rpx;
	}
	.content-bottom>a{
		display: inline-block;
		width: 120rpx;
		height: 50rpx;
		border: 1px solid #999;
		text-align: center;
		line-height: 50rpx;
		position: absolute;
		right: 80rpx;
		top: 35rpx;
		font-size: 15rpx;
	}
	.cencel{
		width: 160rpx;
		height: 50rpx;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 50rpx;
		font-size: 15rpx;
		margin: auto;
		margin-top: 120rpx;
		
	}
</style>
