<template>
	<view class="main">
		<input class="title" type="text" v-model="title" placeholder="请输入标题" />
		<textarea class="content" v-model="content" placeholder="请输入内容..." />
		<u-upload :action="action" ref="uUpload"></u-upload>
		<view class="info">
			<view class="l">
				<label class="radio" @click="radioChange(1)"><radio name="rname" value="1" :checked="show_auth === 1"/>所有人</label>
				<label class="radio" @click="radioChange(2)"><radio name="rname" value="2" :checked="show_auth === 2"/>仅限好友</label>
			</view>
			<view class="r">只支持图片格式</view>
		</view>
		<view class="btn" @click="submit">发布</view>
	</view>
</template>

<script>
	import {
		saveCircle
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				editorCtx: '',
				action: 'http://qyh.ugekeji.com/api/v3/upload',
				title: '',
				content: '',
				show_auth: 1,
				images: ''
			}
		},
		methods: {
			 onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
				  this.editorCtx = res.context
				}).exec()
			},
			radioChange(item) {
				this.show_auth = item;
			},
			submit() {
				var that = this;
				// 图片
				let files = [];
				files = that.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				if(files.length > 0) {
					for(let i = 0; i < files.length; i++) {
						that.images += files[i].response + ',';
					}
					that.images = that.images.substr(0, that.images.length - 1);  
				}
				var data = {
					title: that.title,
					content: that.content,
					images: that.images,
					show_auth: that.show_auth
				};
				saveCircle(data).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					if(res.data.status == 200) {
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/index/components/MyCircle'
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
	}
	.title {
		width: 100%;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		font-size: 35rpx;
		font-weight: 500;
		padding-left: 32rpx;
		padding-right: 32rpx;
	}
	.content {
		width: 100%;
		height: 300rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #999999;
		margin-top: 30rpx;
		padding: 30rpx;
		margin-bottom: 24rpx;
	}
	.img {
		width: 100%;
		margin-top: 30rpx;
		min-height: 160rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999999;
		.t {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 16rpx;
		}
		.b {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 34rpx;
		.l {
			font-size: 25rpx;
		}
		.r {
			font-size: 20rpx;
			font-weight: bold;
			color: #999999;
		}
	}
	.btn {
		margin-top: 100rpx;
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background: #323232;
		border-radius: 15rpx;
		text-align: center;
		color: #D7DCE2;
		font-size: 30rpx;
	}
	/deep/ .u-add-wrap {
		background-color: #FFFFFF;
	}
</style>
