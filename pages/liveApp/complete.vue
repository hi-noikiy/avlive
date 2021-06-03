<template>
	<view class="wrap" >
		
		<view class="content">
			<view class="content1">
				<view class="content-left">
					<view class="text" style="margin-bottom: 10rpx;">
						需要录制一篇多人剧本,要求至少五人
					</view>
					<span>角色出演</span>
				</view>
				<view class="content-right">
					<view class="button" @click="evaluate">
						评价
					</view>
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
			evaluate(){
				uni.navigateTo({
					url:'/pages/evaluate'
				})
			},
			cencel(){
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
	height: 100%;
	
	}
	.content1{
		width: 100%;
		height: 160rpx;
		padding-top: 40rpx;
		border-bottom: 1px solid #ccc;
		
	}
	.content .content-left{
		width: 550rpx;
		height: 100%;
		float: left;
		padding-left: 40rpx;
		
	}
	.content .content-right{
		width: 200rpx;
		height: 100%;
		float: left;
		padding-top: 20rpx;
		
	}
	.content .content-right .button{
		width: 160rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 10rpx;
		border: 1px solid #ccc;
	}
	
	
</style>
