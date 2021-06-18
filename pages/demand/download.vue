<template>
	<view class="page">
		<view class="item" v-for="(item, index) in list" v-if="!item.diff_false">
			<view class="title">{{item.desc}}</view>
			<view class="select">
				<image src="../../static/images/time_icon.png" class="l"></image>
				<span>上传完作品三天后自动确认收货</span>
				<!-- <image src="../../static/images/rj_icon.png" class="r"></image> -->
			</view>
			<view class="info">
				<view class="show">已上传</view>
				<view class="show" @click="stop(index)" v-if="item.play">停止播放</view>
				<view class="show" @click="audition(item.download_link, index)" v-if="!item.play">试听</view>
				<view class="show" @click="download(item)">下载并确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderList,
		payMaker
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				page: 1,
				list: []
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			// 获取数据
			getData(){
				var that = this;
				var data = {
					order_status: 2,
					user_type: '1',
					page: that.page
				};
				getOrderList(data).then(res => {
					that.list = res.data.data;
					for(let i = 0; i < that.list.length; i++) {
						that.list[i].play = false;
					}
				})
			},
			// 试听
			audition(link, index){
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.src = link;		//播放地址
				this.innerAudioContext.autoplay = true;			//自动播放
				this.paused = this.innerAudioContext.paused;	//播放状态
				
				this.list[index].play = true;
				this.$forceUpdate();
			},
			// 停止播放
			stop(index) {
				this.innerAudioContext.stop();
				this.list[index].play = false;
				this.$forceUpdate();
			},
			// 下载并确认
			download(item){
				var that = this;
				var data = {
					order_id: item.order_id
				}
				payMaker(data).then(res => {
					if(res.status == 200) {
						console.log('确认成功')
						uni.downloadFile({
							url: item.download_link,
							success: ({statusCode, tempFilePath}) => {
								if (statusCode === 200) {
									//保存到本地
									uni.saveFile({
										tempFilePath,
										success:(saveRes)=>{
											 console.log('保存成功');
											 uni.openDocument({
												filePath:saveRes.savedFilePath,
												success:(openRes)=>console.log('成功打开文档')
											})
										},
										fail:(err)=>console.log(err)
									})
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		width: 690rpx;
		min-height: 100vh;
		margin: 0 auto;
	}
	.item {
		width: 100%;
		background: #2C2C2C;
		box-shadow: 2rpx 3rpx 8rpx 0rpx rgba(42, 42, 42, 0.04);
		opacity: 0.97;
		border-radius: 15rpx;
		color: #E7E8ED;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 29rpx;
		span {
			color: #E05252;
		}
		.title {
			width: 628rpx;
		}
		.select {
			width: 628rpx;
			height: 24rpx;
			line-height: 24rpx;
			display: flex;
			justify-content: flex-end;
			.l {
				width: 24rpx;
				height: 24rpx;
			}
			span {
				font-size: 24rpx;
				padding-left: 9rpx;
				padding-right: 12rpx;
			}
			.r {
				margin-top: 2rpx;
				width: 11rpx;
				height: 20rpx;
			}
		}
		.info {
			margin-top: 25rpx;
			width: 628rpx;
			height: 48rpx;
			display: flex;
			justify-content: flex-end;
			font-size: 22rpx;
			.show {
				height: 48rpx;
				padding-left: 16rpx;
				padding-right: 16rpx;
				line-height: 48rpx;
				border: 2rpx solid #E7E8ED;
				opacity: 0.98;
				border-radius: 23rpx;
				text-align: center;
				margin-left: 20rpx;
			}
		}
	}
</style>
