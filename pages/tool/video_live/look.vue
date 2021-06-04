<template>
	<view class="main" @touchmove.stop.prevent="moveHandle">
		<video class="live"
			src="https://mp4.vjshi.com/2021-05-19/e141f65baf6e46b4dd384fafbb5a6274.mp4"
			:autoplay="true"
			:loop="true"
			:controls="false"
			:enable-progress-gesture="false"
			:show-center-play-btn="false"
			:show-play-btn="false"
			:show-fullscreen-btn="false"
			object-fit="fill">
			<cover-view class="author" style="width: 500rpx;height: 500rpx;background-color: #008000;">
				简单的测试
				<view>测试1</view>
				<text>测试2</text>
				<author></author>
				<!-- <image src="../../users/static/1.png"></image>
				<view class="info">
					<view class="t">王保保</view>
					<view class="b">432本场点赞</view>
				</view>
				<view class="btn">关注</view> -->
			</cover-view>
			<cover-view>测试4</cover-view>
		</video>
	</view>
</template>

<script>
	import author from './components/author.vue';
	export default {
		components:{
			author
		},
		data() {
			return {
				
			}
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
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
</style>
