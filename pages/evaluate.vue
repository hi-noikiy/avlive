<template>
	<view class="wrap" >
		<view class="title" >
			<span @click="cencel"> < </span>
			已完成订单
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
	
	
	
</style>
