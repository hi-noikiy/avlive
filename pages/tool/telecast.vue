<template>
	<view class="">
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<view class="colse">
				<image src="/static/images/lclose.png" @click="closePage()"></image>
			</view>
			<picker style="position: relative;z-index: 3;" class="picker" :range="demandFormArr" @change="demandFormChange" :value="demandFormIndex" range-key="form_type_name">
				<view class="select">
					<view>{{demandForm}}</view>
					<image src="/static/images/xiala_icon.png"></image>
				</view>
			</picker>
			<view class="radios">
				<label class="radio" @click="radioChange(2)"><radio name="type" value="2" :checked="type === 2"/>语音直播</label>
				<label class="radio" @click="radioChange(1)"><radio name="type" value="1" :checked="type === 1"/>视频直播</label>
			</view>
			<u-upload :custom-btn="true" :action="action" ref="uUpload" :before-upload="beforeUpload" @on-remove="onRemove">
				<view slot="addBtn" class="upload-image" v-if="isImage === false">
					<view class="add">
						<image src="/static/images/hadd.png"></image>
						<view>上传封面</view>
					</view>
					<view class="info">只支持JPG.PNG格式</view>
				</view>
			</u-upload>
			<view class="grade">
				<label class="radio">
					<radio :checked="beauty" /><text>美颜等级</text>
				</label>
				<view class="slider">
					<u-slider
						min="0" max="100" step="10"
						inactive-color="#BBBBBC"
						active-color="#232323"
						height="6"
						block-width="28"
						:block-style="{border: '1px solid #000000'}"
						v-model="beauty_rating"
					></u-slider>
				</view>
			</view>
			<view class="btn" @click="startLive()">开始直播</view>
		</view>
	</view>
</template>

<script>
	import {
		createLiveRoom,
		getDemandForm
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				type: 1,
				beauty: true,
				beauty_rating: 0,
				demandFormArr: [],
				demandFormIndex: 0,
				demandForm: '直播分类（非必选）',
				isImage: false,
				action: 'http://qyh.ugekeji.com/api/v3/upload',
			}
		},
		onLoad() {
			var that = this;
			// 获取分类
			getDemandForm().then(res => {
				that.demandFormArr = res.data.demand_form;
			})
		},
		methods: {
			// 退出此页
			closePage() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选中所属分类
			demandFormChange(e) {
				this.demandFormIndex = e.detail.value;
				this.demandForm = this.demandFormArr[e.detail.value].form_type_name;
			},
			// 选中直播类别
			radioChange(item) {
				this.type = item;
			},
			// 图片上传
			beforeUpload() {
				this.isImage = true;
			},
			onRemove() {
				this.isImage = false;
			},
			// 开启直播
			startLive() {
				let demand_form_id = this.demandFormArr[this.demandFormIndex].id;
				let type = this.type;
				// let files = [];
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	return val.progress == 100;
				// })
				// if(files.length == 0) {
				// 	uni.showToast({
				// 		title: '请上传封面图',
				// 		icon: 'none'
				// 	})
				// 	return;
				// }
				// let image = files[0].response;
				var image = '';
				var data = {
					uid: uni.getStorageSync('uid'),
					demand_form_id: demand_form_id,
					type: type,
					image: image
				}
				var beauty_rating = this.beauty ? '&beauty_rating='+this.beauty_rating : '';
				var _this = this;
				createLiveRoom(data).then(res => {
					if(res.status == 200) {
						uni.navigateTo({
							url: '/pages/tool/video_live/live?id='+res.data.id+'&push_url='+res.data.push_url+'&uid='+res.data.uid+beauty_rating
						})
					}
				})
			}
		}
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
		margin-top: 40rpx;
		margin-left: 30rpx;
	}
	.colse {
		position: relative;
		z-index: 4;
		width: 690rpx;
		height: 45rpx;
		margin-bottom: 41rpx;
		image {
			width: 45rpx;
			height: 45rpx;
			float: right;
		}
	}
	.select {
		clear: both;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 690rpx;
		height: 98rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		padding-left: 29rpx;
		image {
			width: 30rpx;
			height: 15rpx;
			mix-blend-mode: color;
			margin-right: 30rpx;
		}
	}
	.radios {
		width: 100%;
		height: 25rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 53rpx;
	}
	.upload-image {
		width: 690rpx;
		height: 570rpx;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		text-align: center;
		font-weight: bold;
		color: #999999;
		.add {
			margin-top: 210rpx;
			image {
				width: 57rpx;
				height: 57rpx;
			}
			view {
				margin-top: 6rpx;
				font-size: 35rpx;
			}
		}
		.info {
			font-size: 25rpx;
			padding-top: 193rpx;
		}
	}
	/deep/ .u-list-item {
		width: 690rpx!important;
		height: 570rpx!important;
	}
	.grade {
		margin-top: 54rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		.slider {
			width: 441rpx;
			margin-left: 31rpx;
		}
	}
	.btn {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background: #323232;
		border-radius: 15rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #FFFFFF;
		margin-top: 71rpx;
	}
</style>
