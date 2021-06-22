<template>
	<view class="">
		<view class="audio-item" v-for="(item, index) in audioList">
			<view class="l">
				<image class="img" :src="item.image" @click="detail(item.id)"></image>
				<view class="info">
					<view class="t" @click="detail(item.id)">{{item.name}}</view>
					<view class="b" @click="showAuthor()">
						<image :src="item.user_avatar"></image>
						<view>{{item.user_nickname}}</view>
					</view>
				</view>
			</view>
			<view class="r">
				<image class="icon" :src="'/static/images/audio_'+(item.isPlay ? 'suspend' : 'player')+'.png'" @click="play(item, index)"></image>
				<image class="icon" :src="'/static/images/audio_love'+(item.isLike ? '_curr' : '')+'.png'" @click="like(item, index)"></image>
				<image class="icon" src="/static/images/audio_price.png"></image>
				<image class="icon" src="/static/images/audio_share.png" @click="showShare(true)"></image>
			</view>
		</view>
		<share-box ref="shareBox"></share-box>
	</view>
</template>

<script>
	import shareBox from '@/components/shareBox/shareBox';
	import {
		worksLike
	} from '@/api/liveApp.js';
	export default {
		name:"audio-list",
		props: ['audioList'],
		components: {
			'share-box': shareBox
		},
		data() {
			return {
				// 播放器
				innerAudioContext: '',
				// 正在播放的index
				player: false
			};
		},
		created() {
			this.innerAudioContext = uni.createInnerAudioContext();
		},
		methods: {
			// 发布人主页
			showAuthor() {
				uni.navigateTo({
					url: '/pages/liveApp/user/findUser'
				})
			},
			// 音频详情
			detail(id) {
				uni.navigateTo({
					url: '/pages/tool/audio?id='+id
				})
			},
			// 播放或暂停
			play(item, index) {
				var that = this;
				if(!this.player) {
					this.innerAudioContext.src = item.file;
					this.innerAudioContext.play();
					that.player = true;
				} else {
					this.innerAudioContext.stop();
					that.player = false;
				}
				
				that.audioList[index].isPlay = that.player;
				
				this.innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			},
			// 作品点赞
			like(item, index) {
				var id = item.id;
				var isLike = item.isLike;
				var operation = isLike ? 0 : 1;
				var data = {
					works_id: id,
					operation: operation
				};
				var that = this;
				worksLike(data).then(res => {
					that.audioList[index].isLike = !isLike;
				});
			},
			showShare(bool) {
				this.$refs.shareBox.showShare(bool);
			}
		}
	}
</script>

<style lang="scss">
	.audio-item {
		width: 690rpx;
		height: 147rpx;
		background-color: #F1F2F6;
		border-radius: 20rpx;
		margin: 0 auto;
		display: flex;
		margin-bottom: 20rpx;
		.l {
			display: flex;
			width: 50%;
			.img {
				width: 101rpx;
				height: 102rpx;
				border-radius: 15rpx;
				margin-top: 23rpx;
				margin-left: 17rpx;
			}
			.info {
				display: flex;
				flex-direction: column;
				.t {
					color: #444444;
					font-size: 30rpx;
					margin-top: 33rpx;
					margin-left: 18rpx;
					font-weight: bold;
				}
				.b {
					display: flex;
					margin-left: 16rpx;
					margin-top: 6rpx;
					height: 44rpx;
					line-height: 44rpx;
					image {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
					}
					view {
						color: #999999;
						font-size: 22rpx;
						margin-left: 14rpx;
					}
				}
			}
		}
		.r {
			width: 50%;
			display: flex;
			justify-content: flex-end;
			.icon {
				margin-top: 44rpx;
				width: 58rpx;
				height: 58rpx;
				margin-right: 20rpx;
			}
			.icon:nth-child(4) {
				margin-right: 16rpx;
			}
		}
	}
</style>
