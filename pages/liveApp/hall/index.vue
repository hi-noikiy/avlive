<template>
	<view class="main">
		<view class="i i1">
			<view class="title">指定制作方</view>
			<input type="text" value="" placeholder="选填" />
			<view class="info">安妮爱主持</view>
		</view>
		<view class="i i1">
			<view class="title">指定雇主</view>
			<input type="text" value="" placeholder="选填" />
			<view class="info">安妮爱主持</view>
		</view>
		<view class="i i2">
			<view class="title">预算（非必填）</view>
			<input type="text" value="" placeholder="请输入" />
		</view>
		<view class="i i3">
			<view class="title">期望制作周期（非必填）</view>
			<input type="text" value="" placeholder="请输入" />
			<view class="info">
				<picker mode="selector">
					<view>小时</view>
				</picker>
				<image src="../../../static/images/bs_icon.png"></image>
			</view>
		</view>
		<view class="demand">
			<view class="title">音色要求（非必填可多选）</view>
			<view class="inputs">
				<u-checkbox-group>
					<u-checkbox
						v-model="item.checked"
						v-for="(item, index) in checkboxList"
						shape="square"
						active-color="#000000"
					>明月</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="m m1">
			<view>请一句话描述您的需求</view>
			<input type="text" value="" placeholder="请输入您的需求简介" />
		</view>
		<view class="m m2">
			<view>详细描述您的需求</view>
			<textarea value="" placeholder="请输入详情" />
		</view>
		<u-upload></u-upload>
		<view class="sub">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkboxList: [
					{
						name: '男声',
						checked: false,
						disabled: false
					},
					{
						name: '女声',
						checked: false,
						disabled: false
					},
					{
						name: '娃娃',
						checked: false,
						disabled: false
					},
					{
						name: '中年',
						checked: false,
						disabled: false
					},
					{
						name: '老人',
						checked: false,
						disabled: false
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
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
	.i1 {
		.title { width: 33%; }
		input { width: 34%; }
		.info {
			width: 33%;
			font-size: 24rpx;
			text-align:right;
			margin-right: 25rpx;
		}
	}
	.i2 {
		.title { width: 35%; }
		input {
			width: 65%;
			text-align: right;
			margin-right: 24rpx;
		}
	}
	.i3 {
		.title {width: 50%;}
		input {width: 30%;}
		.info {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 20%;
			image {
				margin-right: 24rpx;
				margin-left: 14rpx;
				width: 22rpx;
				height: 12rpx;
			}
		}
	}
	.demand {
		margin-top: 50rpx;
		font-size: 28rpx;
		font-weight: bold;
		.title {
			margin-bottom: 43rpx;
		}
	}
	.m {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		padding: 25rpx;
		margin-top: 20rpx;
		view {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 32rpx;
		}
	}
	.m1 {
		input {font-size: 24rpx;}
	}
	.m2 {
		textarea {
			height: 86rpx;
			font-size: 24rpx;
		}
	}
	.sub {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #323232;
		background-color: rgba($color: #D7DCE2, $alpha: 0.95);
		border-radius: 15rpx;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 40rpx;
	}
</style>
