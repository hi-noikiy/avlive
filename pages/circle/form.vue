<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<input class="title" type="text" v-model="title" placeholder="请输入标题" />
			
			<!-- <textarea class="content" v-model="content" placeholder="请输入内容..." /> -->
			<view class="page-body">
				<view class='wrapper'>
					<view class='toolbar' @tap="format" style="height: 64rpx;overflow-y: auto;">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
						<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
						<!-- <view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view> -->
						<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
						 data-value="left"></view>
						<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
						 data-value="center"></view>
						<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
						 data-value="right"></view>
						<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
						 data-value="justify"></view>
						<!-- <view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
						 data-value="2"></view> -->
						<!-- <view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
						 data-value="2em"></view> -->
						<!-- <view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
						 data-value="20px"></view> -->
						<!-- <view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom"
						 data-value="20px"></view> -->
						<!-- <view class="iconfont icon-clearedformat" @tap="removeFormat"></view> -->
						<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
						<!-- <view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
						 data-value="24px"></view> -->
			
						<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
						 data-value="#0000ff"></view>
						<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
						 data-name="backgroundColor" data-value="#00ff00"></view>
			
						<!-- <view class="iconfont icon-date" @tap="insertDate"></view> -->
						<!-- <view class="iconfont icon--checklist" data-name="list" data-value="check"></view> -->
						<!-- <view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
						 data-value="ordered"></view> -->
						<!-- <view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
						 data-value="bullet"></view> -->
						<view class="iconfont icon-undo" @tap="undo"></view>
						<view class="iconfont icon-redo" @tap="redo"></view>
			
						<!-- <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view> -->
						<!-- <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view> -->
						<!-- <view class="iconfont icon-fengexian" @tap="insertDivider"></view> -->
						<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<!-- <view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
						 :data-value="1"></view> -->
						<!-- <view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
						 data-value="sub"></view> -->
						<!-- <view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
						 data-value="super"></view> -->
						<view class="iconfont icon-shanchu" @tap="clear"></view>
						<!-- <view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
						 data-value="rtl"></view> -->
			
					</view>
			
					<view class="editor-wrapper">
						<editor id="editor" class="ql-container" placeholder="请输入内容..." showImgSize showImgToolbar showImgResize
						 @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input="getText">
						</editor>
					</view>
				</view>
			</view>
			
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
				/**
				 * 编辑器
				 */
				readOnly: false,
				formats: {}
			}
		},
		onLoad() {
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
		methods: {
			getText(e) {
				this.content = e.detail.html;
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
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}
				})
			},
			
			/**
			 * 编辑器
			 */
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./editor-icon.css";
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
	
	/**
	 * 编辑器
	 */
	.page-body {
		height: 500rpx;
		margin-top: 2vh;
	}
	
	.wrapper {
		height: 100%;
	}
	
	.editor-wrapper {
		height: 400rpx;
		background: #fff;
	}
	
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	
	.toolbar {
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	
	
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 1.5;
	}
	
	.ql-active {
		color: #06c;
	}
</style>
