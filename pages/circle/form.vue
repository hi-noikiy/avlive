<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<input class="title" type="text" v-model="title" placeholder="请输入标题" />
			
			<!-- <view class="container">
				<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
				<button type="warn" @tap="undo">撤销</button>
			</view> -->
			<!-- <editor></editor> -->
			<view class="editor-wapper" id="edit"></view>
			
			<!-- <textarea class="content" v-model="content" placeholder="请输入内容..." /> -->
			<u-upload :action="action" ref="uUpload"></u-upload>
			<view class="info">
				<view class="l">
					<label class="radio" @click="radioChange(1)"><radio name="rname" value="1" :checked="show_auth === 1"/>所有人</label>
					<label class="radio" @click="radioChange(2)"><radio name="rname" value="2" :checked="show_auth === 2"/>仅限好友</label>
				</view>
				<view class="r">请上传封面图片</view>
			</view>
			<view class="btn" @click="submit">发布</view>
		</view>
	</view>
</template>

<script>
	import E from 'wangeditor';
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
				images: '',
				
				placeholder: '开始输入...',
				editor: null
			}
		},
		onReady() {
			this.editor = new E('#edit');
			this.editor.config.height = 180
			this.editor.create();
		},
		methods: {
			
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
				  this.editorCtx = res.context
				}).exec()
				// #endif
			},
			undo() {
				this.editorCtx.undo()
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
						title: res.msg,
						icon: 'none'
					})
					if(res.status == 200) {
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
		margin-top: 20rpx;
		margin-left: 30rpx;
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
	
	
	#edit {
		margin-top: 30rpx;
	}
	
	.container {
	        padding: 10px;
	    }
	
	    #editor {
	        width: 100%;
	        height: 300px;
	        background-color: #CCCCCC;
	    }
	
	    button {
	        margin-top: 10px;
	    }
</style>
