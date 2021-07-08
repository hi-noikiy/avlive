<template>
	<view>
		<l-file ref="lFile1" @up-success="onSuccess1"></l-file>
		<l-file ref="lFile2" @up-success="onSuccess2"></l-file>
		<view class="main">
			<view class="ar" @click="record">认证记录 ></view>
			<view class="i i3">
				<view class="title">请选择您想认证的标签</view>
				<view class="info">
					<picker :range="tagArr" @change="tagChange" :value="tagIndex" range-key="form_type_name">
						<view style="float: left;">{{tag}}</view>
						<image src="/static/images/bs_icon.png"></image>
					</picker>
				</view>
			</view>
			<view class="txt">请上传您的证明文件（包括不限于职业证书、作品等）</view>
			<view class="upfiles">
				<view class="upfile" @tap="onUpload1()">
					<image src="/static/images/hadd.png" v-if="file1 == ''"></image>
					<view class="t">{{file1 == '' ? '附件' : '已上传附件'}}</view>
					<view class="b">{{file1 == '' ? '支持图片、压缩包' : '点击替换'}}</view>
				</view>
				<view class="upfile" @tap="onUpload2()">
					<image src="/static/images/hadd.png" v-if="file2 == ''"></image>
					<view class="t">{{file2 == '' ? '附件' : '已上传附件'}}</view>
					<view class="b">{{file2 == '' ? '支持图片、压缩包' : '点击替换'}}</view>
				</view>
			</view>
			<view class="sub" @click="submit">提交审核</view>
			<view class="bt">注：每个用户可免费认证一个技能，以后每个技能认证保证金为298，一年后可以申请退换。</view>
		</view>
	</view>
</template>

<script>
	import lFile from '@/components/l-file/l-file';
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		createFormOrder
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				tagArr: [],
				tag: '',
				tagIndex: 0,
				tagId: '',
				file1: '',
				file2: ''
			}
		},
		onLoad(options) {
			var that = this;
			getUserInfo().then(res => {
				that.tagArr = res.data.class_list;
				if(JSON.stringify(options) != "{}") {
					that.tagId = options.tagId;
					for(let i = 0; i < that.tagArr.length; i++) {
						if(that.tagArr[i].id == options.tagId) {
							that.tag = that.tagArr[i].form_type_name;
						}
					}
				} else {
					that.tag = res.data.class_list[0].form_type_name;
					that.tagId = res.data.class_list[0].id;
				}
			});
		},
		methods: {
			// 标签切换
			tagChange(e) {
				let index = e.detail.value;
				this.tagIndex = index;
				this.tag = this.tagArr[index].form_type_name;
				this.tagId = this.tagArr[index].id;
			},
			// 认证记录 
			record() {
				uni.navigateTo({
					url: 'record'
				})
			},
			/* 上传附件 */
			onUpload1() {
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile1.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://qyh.ugekeji.com/api/v3/upload', //替换为你的
					name: 'file'
				});
			},
			onSuccess1(res) {
				this.file1 = res.data.id;
			},
			onUpload2() {
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile2.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://qyh.ugekeji.com/api/v3/upload', //替换为你的
					name: 'file'
				});
			},
			onSuccess2(res) {
				this.file2 = res.data.id;
			},
			// 提交审核
			submit() {
				var that = this;
				if(that.file1 == '' && that.file2 == '') {
					uni.showToast({
						title: '请上传附件',
						icon: 'none'
					})
					return;
				} else if(that.file1 == '' && that.file2 != '') {
					var file = that.file2;
				} else if(that.file1 != '' && that.file2 == '') {
					var file = that.file1;
				} else {
					var file = that.file1 + ',' + that.file2;
				}
				var data = {
					uid: uni.getStorageSync('uid'),
					form_class_id: that.tagId,
					form_class_name: that.tag,
					img: file
				}
				createFormOrder(data).then(res => {						
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100% 100vh;
	}

	.main {
		width: 690rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
	}
	
	.ar {
		text-align: right;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.i {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			padding-left: 24rpx;
		}

		.info {
			font-size: 24rpx;
		}

		input {
			color: #999999;
			font-size: 24rpx;
		}
	}
	
	.i3 {
		.title {
			width: 50%;
		}

		.info {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 50%;
			image {
				margin-right: 24rpx;
				margin-left: 14rpx;
				width: 22rpx;
				height: 12rpx;
			}
		}
	}

	.sub {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #323232;
		background-color: rgba($color: #323232, $alpha: 0.95);
		border-radius: 15rpx;
		font-size: 30rpx;
		text-align: center;
		margin-top: 109rpx;
		margin-bottom: 40rpx;
		font-size: 30rpx;
		color: #D7DCE2;
	}
	
	.txt {
		text-align: center;
		margin-top: 30rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}
	
	.upfiles {
		display: flex;
		width: 500rpx;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 110rpx;
		.upfile {
			display: flex;
			flex-direction: column;
			width: 180rpx;
			height: 180rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			font-size: 22rpx;
			margin-top: 20rpx;
			color: #999999;
			text-align: center;
			justify-content: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin: 0 auto;
			}
			.t {
				margin-top: 10rpx;
			}
			.b {
				margin-top: 6rpx;
			}
		}
	}
	
	.bt {
		margin-top: 272rpx;
		color: #999999;
		font-weight: 500;
		font-family: PingFangSC-regular;
	}
</style>
