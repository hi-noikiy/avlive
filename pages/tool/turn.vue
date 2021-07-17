<template>
	<view>
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<view class="module1">
				<textarea value="" v-model="content" placeholder="请输入需要转语音的文字" />
				<view class="empty" @click="empty">
					<image src="../../static/images/del.png"></image>
					<text>清空</text>
				</view>
			</view>
			<view class="module2">
				<view class="item" v-for="(item,index) in list" :key="index" @click="getsoundbank(item.id,index)">
					<view class="t" :style=" active == index?'background-color: #000000;':'background-color:#8F9092;'">
						<image :style=" active == index?'background-color: #000000;':'background-color:#8F9092;'" src="../../static/images/yinfu.png"></image>
					</view>
					<view class="b" :class="active == index?'active':''">{{item.name}}</view>
				</view>
				<!-- 				<view class="item add">
					<view class="t">
						<image src="../../static/images/hadd.png"></image>
					</view>
				</view> -->
			</view>
			<view class="module3">
				<view class="item">
					<view class="icon">
						<image src="../../static/images/yuyin.png"></image>
					</view>
					<span>语调调整</span>
					<view class="slider">
						<u-slider v-model="value1" min="10" max="90" inactive-color="#BBBBBC" active-color="#232323"
							height="6" block-width="34" step="10" :block-style="{border: '1px solid #000000'}">
						</u-slider>
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/images/bofang.png"></image>
					</view>
					<span>语速调整</span>
					<view class="slider">
						<u-slider v-model="value2" min="10" max="90" inactive-color="#BBBBBC" active-color="#232323"
							height="6" step="10" block-width="34" :block-style="{border: '1px solid #000000'}">
						</u-slider>
					</view>
				</view>
			</view>
			<view class="module4" v-if="url!=''">
				<!-- <view class="btn" v-if="url!=''" @click="Audition">试听</view> -->
				<view class="playbox" @click="Audition">
					<image class="iconplay"  :src="'/static/images/audio_'+(play ? 'suspend' : 'player')+'.png'" ></image>
					<view class="btn" >试听</view>
				</view>
				<view class="playbox" @click="download">
					<image class="iconplays" src="../../static/images/audio-download.png" ></image>
					<view class="btn" >下载</view>
				</view>
			</view>
			<button type="default" class="sub" @click="getsynthesis">立即合成</button>
		</view>
	</view>
</template>

<script>
	import {
		textToSpeech
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				content: '',
				play: false,
				list: [{
					name: '度小美',
					id: 0
				}, {
					name: '度小宇',
					id: 1
				}, {
					name: '度逍遥',
					id: 3
				}, {
					name: '度丫丫',
					id: 4
				}],
				active: null,
				value1: 50,
				value2: 50,
				per: '',
				url: '',
				Audio: ''
			}
		},
		created() {
			this.Audio = uni.createInnerAudioContext();
		},
		methods: {
			download(){
				var that = this
				uni.downloadFile({
					url: that.url,
					success: ({statusCode, tempFilePath}) => {
						if (statusCode === 200) {
							//保存到本地
							uni.saveFile({
								tempFilePath,
								success:(saveRes)=>{
									 console.log('保存成功');
									 console.log(saveRes.savedFilePath)
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
			},
			Audition() {
				var that = this
				if (!that.play) {
					that.Audio.src = that.url; //音频地址 
					console.log("播放")
					this.Audio.play(); //执行播放 
					that.play = true
				} else {
					this.Audio.stop(); //暂停播放 
					console.log("暂停")
					that.play = false
				}
			},
			//清空
			empty() {
				this.content = ''
			},
			//选择音库
			getsoundbank(id, index) {
				this.active = index
				this.per = id
			},
			//立即合成
			getsynthesis() {
				var that = this
				if (that.content == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入转语音的文字'
					})
					return
				}
				var pit = that.value1 / 10
				var spd = that.value2 / 10
				var data = {
					pit: pit,
					spd: spd,
					per: that.per,
					text: that.content,
				}
				textToSpeech(data).then(res => {
					console.log("语音转文字合成结果", res)
					if(res.status == 200){
						that.url = res.data.download_link
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
					// if (res.status == 200) {
					// 	uni.downloadFile({
					// 		url: res.data.download_link,
					// 		success: ({
					// 			statusCode,
					// 			tempFilePath
					// 		}) => {
					// 			if (statusCode === 200) {
					// 				//保存到本地
					// 				uni.saveFile({
					// 					tempFilePath,
					// 					success: (saveRes) => {
					// 						console.log('保存成功');
					// 						console.log(saveRes.savedFilePath)
					// 						uni.openDocument({
					// 							filePath: saveRes.savedFilePath,
					// 							success: (openRes) => console.log(
					// 								'成功打开文档')
					// 						})
					// 					},
					// 					fail: (err) => console.log(err)
					// 				})
					// 			}
					// 		}
					// 	})
					// }
				})
			}
		},
		onUnload() {

		},
	}
</script>

<style scoped lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 1;
	}

	.main {
		position: absolute;
		z-index: 2;
		width: 690rpx;
		margin-left: 30rpx;
		overflow: hidden;
		margin-top: 30rpx;
	}

	.module1 {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 380rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 30rpx 30rpx 24rpx 30rpx;

		textarea {
			font-size: 24rpx;
			width: auto;
		}

		.empty {
			display: flex;
			align-items: center;
			margin-top: 16rpx;

			image {
				width: 28rpx;
				height: 28rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: bold;
				color: #000000;
				padding-left: 4rpx;
			}
		}
	}

	.module2 {
		width: 700rpx;
		margin-top: 46rpx;
		margin-left: 25rpx;
		display: flex;
		flex-wrap: wrap;

		.item {
			margin-right: 50rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.t {
				width: 66rpx;
				height: 66rpx;
				text-align: center;
				background-color: #8F9092;
				border-radius: 50%;

				image {
					margin-top: 15rpx;
					width: 29rpx;
					height: 36rpx;
				}
			}

			.b {
				margin-top: 10rpx;
				color: #999999;
				font-size: 26rpx;
				font-weight: bold;
			}

			.active {
				color: #000000;
			}
		}
	}

	.module3 {
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;

		.item {
			width: 100%;
			height: 68rpx;
			margin-bottom: 50rpx;
			display: flex;
			align-items: center;

			.icon {
				width: 68rpx;
				height: 68rpx;
				background: #232323;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 37rpx;
					height: 49rpx;
				}
			}

			span {
				font-size: 26rpx;
				font-weight: bold;
				padding-left: 13rpx;
				padding-right: 24rpx;
			}

			.slider {
				width: 461rpx;
			}
		}
	}

	.module4 {
		display: flex;
		flex-wrap: wrap;
	}

	.sub {
		margin-top: 70rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: #323232;
		border-radius: 15rpx;
		font-size: 30rpx;
		color: #D7DCE2;
	}
	.playbox{
		width: 100rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: bolder;
		color: #000;
		.iconplay{
			width: 58rpx;
			height: 58rpx;
		}
	}
	.iconplays{
		width: 38rpx;
		height: 45rpx;
		margin-top: 13rpx;
	}

</style>
