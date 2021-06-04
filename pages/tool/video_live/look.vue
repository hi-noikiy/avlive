<template>
	<view class="main" @touchmove.stop.prevent="moveHandle">
		<video class="live" src="https://mp4.vjshi.com/2021-05-19/e141f65baf6e46b4dd384fafbb5a6274.mp4" :autoplay="true"
			:loop="true" :controls="false" :enable-progress-gesture="false" :show-center-play-btn="false"
			:show-play-btn="false" :show-fullscreen-btn="false" object-fit="fill">
			<cover-view class="center"
				style="width: 209rpx;height: 60rpx;background-color: #743180;float: left;margin-left: 62rpx;margin-top: 41rpx;opacity: 0.2;">

			</cover-view>
			<cover-view class="headimg"
				style="width: 60rpx;height: 60rpx;background-color: #6c7780;border-radius: 50%;margin-left: -232rpx;float: left;margin-top: 41rpx;">

			</cover-view>
			<cover-view class="right"
				style="width: 80rpx;height: 60rpx;background-color: #ff0000;border-radius: 30rpx;margin-left: -42rpx;float: left;margin-top: 41rpx;text-align: center;line-height: 60rpx;color: #FFFFFF;">
				关注
			</cover-view>

		</video>
		<!-- <video src="https://mp4.vjshi.com/2021-05-19/e141f65baf6e46b4dd384fafbb5a6274.mp4"></video> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {
			const subNvue=uni.getSubNVueById('popup');   //获取 
			subNvue.show()  // 显示
		},
		methods: {
			moveHandle() {
				return false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 750rpx;
		height: 100vh;
	}

	.live {
		width: 750rpx;
		height: 100vh;
	}
</style>
