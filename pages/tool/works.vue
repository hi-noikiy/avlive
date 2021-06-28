<template>
	<view class="main">
		<view class="i">
			<view>作品名称</view>
			<input type="text" placeholder="请输入作品名称">
		</view>
		<view class="i">
			<view>作品类型</view>
			<picker mode="selector" :value="typeIndex" :range="types" range-key="name" @change="typeChange">
				<input type="text" disabled placeholder="请选择" :value="types[typeIndex].name">
				<image src="../../static/images/bs_icon.png"></image>
			</picker>
		</view>
		<view class="i">
			<view>作品分类</view>
			<picker mode="selector" :value="cateIndex" :range="cates" range-key="form_type_name" @change="cateChange">
				<input type="text" disabled placeholder="请选择" :value="cates[cateIndex].form_type_name">
				<image src="../../static/images/bs_icon.png"></image>
			</picker>
		</view>
		<view class="price">
			<view class="t">
				<u-checkbox-group>
					<u-checkbox
						v-model="priceChecked"
						shape="square"
						active-color="#000000"
					><span>下载收费</span></u-checkbox>
				</u-checkbox-group>
				<view class="r">
					<input type="text" value="" placeholder="请输入" />
					<span>音宝</span>
				</view>
			</view>
			<view class="b">综合你的平台等级，你最高可设置为100元</view>
		</view>
		<view class="uploads">
			<u-upload :custom-btn="true"
				ref="uUpload"
				width="140"
				height="140"
				del-bg-color="#A9A9A9"
				@on-choose-complete="lShowChange(false)"
				@on-remove="lShowChange(true)"
			>
				<view class="l" slot="addBtn" v-show="lshow">
					<image src="../../static/images/hadd.png"></image>
					<span>请上传封面</span>
				</view>
			</u-upload>
			<u-upload :custom-btn="true"
				ref="uUpload"
				width="140"
				height="140"
				del-bg-color="#A9A9A9"
				@on-choose-complete="rShowChange(false)"
				@on-remove="rShowChange(true)"
			>
				<view class="r" slot="addBtn" v-show="rshow">
					<image src="../../static/images/hadd.png"></image>
					<span class="t">音频视频支持</span>
					<span class="b">PM3 PM4格式</span>
				</view>
			</u-upload>
		</view>
		<view class="submit">上传</view>
	</view>
</template>

<script>
	import {
		getDemandForm
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				// 作品类型
				types: [{
					id: 1,
					name: '视频'
				}, {
					id: 2,
					name: '音频'
				}],
				typeIndex: 0,
				// 作品分类
				cates: [],
				cateIndex: 0,
				// 下载收费
				priceChecked: false,
				// 上传是否展示
				lshow: true,
				rshow: true
			}
		},
		methods: {
			onLoad() {
				var that = this;
				getDemandForm().then(res => {
					console.log(res.data.demand_form)
					that.cates = res.data.demand_form;
				})
			},
			typeChange(e) {
				this.typeIndex = e.detail.value;
			},
			cateChange(e) {
				this.cateIndex = e.detail.value;
			},
			lShowChange(bool) {
				this.lshow = bool;
			},
			rShowChange(bool) {
				this.rshow = bool;
			}
		}
	}
</script>

<style lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
	}
	.i {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		view {
			width: 20%;
			font-size: 28rpx;
			font-weight: bold;
			color: #000000;
			margin-left: 25rpx;
		}
		input {
			width: 60%;
			margin-left: 20rpx;
			font-size: 24rpx;
		}
		picker {
			width: 70%;
			input {
				float: left;
				width: 82%;
			}
			image {
				float: left;
				width: 22rpx;
				height: 12rpx;
				margin-left: 40rpx;
				margin-top: 10rpx;
			}
		}
	}
	.price {
		margin-top: 20rpx;
		width: 100%;
		height: 132rpx;
		display: flex;
		flex-direction: column;
		.t {
			display: flex;
			span {
				font-size: 28rpx;
				font-weight: bold;
				color: #000000;
			}
			.r {
				display: flex;
				align-items: center;
				width: 509rpx;
				height: 88rpx;
				background-color: rgba($color: #FFFFFF, $alpha: 0.5);
				border-radius: 15rpx;
				input {
					font-size: 24rpx;
					margin-left: 14rpx;
					width: 400rpx;
				}
				span {
					font-size: 24rpx;
					color: #000000;
					padding-left: 16rpx;
				}
			}
		}
		.b {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	}
	.uploads {
		font-size: 22rpx;
		color: #999999;
		margin-top: 57rpx;
		display: flex;
		view {
			width: 180rpx;
			height: 180rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			margin-right: 30rpx;
			position: relative;
		}
		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 46rpx;
			left: 70rpx;
		}
		.l {
			span {
				position: absolute;
				top: 110rpx;
				left: 30rpx;
			}
		}
		.r {
			span {position: absolute;}
			.t {
				left: 16rpx;
				top: 100rpx;
			}
			.b {
				left: 10rpx;
				top: 130rpx;
			}
		}
	}
	.submit {
		width: 686rpx;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background: #323232;
		border-radius: 15rpx;
		font-size: 30rpx;
		color: #D7DCE2;
		margin-top: 100rpx;
	}
	/deep/ .u-list-item {
		margin: 0 auto!important;
	}
	/deep/ .u-delete-icon {
		width: 34rpx;
		height: 34rpx;
	}
</style>
