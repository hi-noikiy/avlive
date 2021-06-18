<template>
	<view class="main">
		<view class="title">{{row.name}}</view>
		<image class="img" :src="row.image"></image>
		<view class="author">作者：{{row.user_nickname}}</view>
		<view class="progress-bar">
			<image src="../../static/images/audio-kuaitui.png"></image>
			<view class="slider">
				<u-slider
					min="0" max="100"
					activeColor="#323232"
					:use-slot="true"
				>
				<view class="">
					<view class="badge-button">
						{{currentTime}}/{{countTime}}
					</view>
				</view>
				</u-slider>
			</view>
			<image src="../../static/images/audio-kuaijin.png"></image>
		</view>
		<view class="control">
			<image src="../../static/images/audio-front.png"></image>
			<view class="oper" @click="paus">
				<image src="../../static/images/audio-puse.png"></image>
			</view>
			<image src="../../static/images/audio-after.png"></image>
		</view>
		<view class="operation">
			<view class="a">
				<image src="../../static/images/audio-download.png"></image>
				<text>下载</text>
			</view>
			<view class="b" @click="showShare(true)">
				<image src="../../static/images/audio-fenxiang.png"></image>
				<text>分享</text>
			</view>
			<view class="c">
				<image src="../../static/images/audio-pinglun.png"></image>
				<text>评论</text>
			</view>
			<view class="d">
				<image src="../../static/images/audio-hongbao.png"></image>
				<text>打赏</text>
			</view>
			<view class="e">
				<image src="../../static/images/audio-zan.png"></image>
				<text>点赞</text>
			</view>
		</view>
		<share-box ref="shareBox"></share-box>
	</view>
</template>

<script>
	import shareBox from '@/components/shareBox/shareBox';
	import {
		getWorksDetail
	} from '@/api/liveApp';
	export default {
		components: {
			'share-box': shareBox
		},
		data() {
			return {
				innerAudioContext: '',
				paused: '',
				isPause: true,
				currentTime: '',
				countTime: '',
				row: []
			}
		},
		onLoad(option) {
			var that = this;
			var data = {
				id: option.id
			};
			getWorksDetail(data).then(res => {
				that.row = res.data.row;
				that.innerAudioContext = uni.createInnerAudioContext();
				that.innerAudioContext.src = that.row.file;		//播放地址
				that.innerAudioContext.autoplay = true;			//自动播放
				that.paused = that.innerAudioContext.paused;	//播放状态
				that.innerAudioContext.onPlay(() => {
					that.currentTime = '0:00';
					that.countTime = that.sToIs(that.innerAudioContext.duration);
				})
				that.innerAudioContext.onTimeUpdate(() => {
					that.currentTime = that.sToIs(that.innerAudioContext.currentTime);
				})
			})
		},
		methods: {
			showShare(bool) {
				this.$refs.shareBox.showShare(bool);
			},
			// 秒数转时分
			sToIs(s) {
				if(s < 60) {
					s = s.toFixed(0);
					if(s < 10) {
						return '0:0'+s;
					} else {
						return '0:'+s;
					}
				} else {
					let num = (s.toFixed(0) / 60);
					return num.toFixed(2).replace('.', ':');
				}
			},
			// 暂停或继续
			paus() {
				if(this.isPause) {
					this.innerAudioContext.pause();
				} else {
					this.innerAudioContext.play();
				}
				this.isPause = !this.isPause;
			}
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}
	.title {
		margin-top: 4vh;
		font-size: 35rpx;
		font-weight: 800;
		color: #323232;
	}
	.img {
		width: 333rpx;
		height: 457rpx;
		border-radius: 16rpx;
		margin-top: 2.96vh;
	}
	.author {
		font-size: 30rpx;
		font-weight: bold;
		color: #666666;
		margin-top: 2.46vh;
	}
	.progress-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 9.11vh;
		width: 650rpx;
		height: 40rpx;
		.slider {
			width: 420rpx;
		}
		image {
			width: 44rpx;
			height: 26rpx;
		}
	}
	.control {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5.97vh;
		width: 482rpx;
		height: 120rpx;
		.oper {
			width: 120rpx;
			height: 120rpx;
			background-color: #323232;
			border-radius: 50%;
			image {
				margin-top: 40rpx;
				margin-left: 43rpx;
				width: 34rpx;
				height: 40rpx;
			}
		}
		image {
			width: 42rpx;
			height: 36rpx;
		}
	}
	.operation {
		margin-top: 6.28vh;
		width: 498rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		text {
			font-size: 20rpx;
			font-weight: bold;
			color: #323232;
			padding-top: 21rpx;
		}
		.a image {
			width: 39rpx;
			height: 41rpx;
		}
		.b image {
			width: 34rpx;
			height: 34rpx;
		}
		.c image {
			width: 38rpx;
			height: 37rpx;
		}
		.d image {
			width: 32rpx;
			height: 38rpx;
		}
		.e image {
			width: 39rpx;
			height: 39rpx;
		}
	}
	.badge-button {
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background: #323232;
		border-radius: 20rpx;
		font-size: 20rpx;
		color: #FFFFFF;
	}
</style>
