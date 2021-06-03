<template>
	<view class="wrap">
		<view class="borderShow">
			1000元
		</view>
		<u-gap height="20" ></u-gap>
		<view class="borderShow">
			1000元
		</view>
		
		<view class="bottomBox u-flex u-row-right">
			
			<button class="btnTheme" @click="submitInfo">联系雇主</button>
			<button class="btnTheme" @click="submitInfo">报价</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.borderShow{
	height: 300rpx;
	padding: 10rpx;
}
.btnTheme{width: 200rpx;height: 80rpx;line-height: 80rpx;border-radius: 10rpx;margin:10rpx 0 10rpx 10rpx;}
</style>
