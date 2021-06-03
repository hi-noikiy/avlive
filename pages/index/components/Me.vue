<template>
	<view class="">
		<view class="bg"></view>
		<view class="main">
			<view class="top box">
				<view class="line1">
					<image src="/static/images/jiaqun2x.png" class="head"></image>
					<view class="info">
						<view class="t">
							<view>昵称：安妮爱主持</view>
							<view>ID 950027</view>
						</view>
						<view class="b">
							<view>10粉丝</view><view class="c">|</view><view>8关注</view>
						</view>
					</view>
					<image src="/static/images/me_sz.png" class="setting" @click="urlTo('/pages/users/user_info/index')"></image>
				</view>
				<view class="line2">
					<view>经验等级：二级</view>
					<view>技能等级：三级</view>
					<view>信用值：998</view>
				</view>
				<view class="line3">
					<view class="title">技能标签</view>
					<u-tag
						v-for="i in 2"
						text="主持人"
						mode="plain"
						shape="circle"
						size="mini"
						color="#FFFFFF"
						border-color="#FFFFFF"
						bg-color="rgba(0,0,0,0)"
					/>
					<view class="add">+</view>
				</view>
				<view class="line4">
					<view v-for="i in 5">测试自动说明，可以自动换行</view>
				</view>
			</view>
			<view class="list box" v-for="(item, index) in list">
				<view class="item_title">{{item.title}}</view>
				<view class="items">
					<image
						v-for="(val, key) in item.items"
						:src="val.src"
						:style="'width: '+val.width+'rpx;height: '+val.height+'rpx;margin-right:'+val.mright+'rpx'"
						@click="urlTo(val.url)"
					></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					title: '使用工具',
					items: [{
						title: '上传作品',
						src: '/static/images/me_sczp.png',
						width: '87',
						height: '115',
						mright: '48',
						url: '/pages/tool/works'
					},{
						title: '开始直播',
						src: '/static/images/me_kszb.png',
						width: '88',
						height: '115',
						mright: '49',
						url: '/pages/tool/telecast'
					},{
						title: '文字转语音',
						src: '/static/images/me_wzzyy.png',
						width: '111',
						height: '115',
						mright: '48',
						url: '/pages/tool/turn'
					},{
						title: '技能测定',
						src: '/static/images/me_jncd.png',
						width: '88',
						height: '115',
						mright: '49',
						url: '/pages/users/order_list/index?status=3'
					},{
						title: '名片',
						src: '/static/images/me_mp.png',
						width: '79',
						height: '115',
						mright: '0',
						url: '/pages/users/user_return_list/index'
					}]
				},{
					title: '我的钱包',
					items: [{
						title: '充值',
						src: '/static/images/me_cz.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/wallet'
					},{
						title: '账单',
						src: '/static/images/me_zd.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/bill'
					},{
						title: '收入',
						src: '/static/images/me_sr.png',
						width: '79',
						height: '114',
						mright: '45',
						url: '/pages/wallet/withdrawal'
					}]
				},{
					title: '作品',
					items: [{
						title: '我的作品',
						src: '/static/images/me_wdzp.png',
						width: '87',
						height: '118',
						mright: '59',
						url: '/pages/users/order_list/index?status=0'
					},{
						title: '我点赞的',
						src: '/static/images/me_wdzd.png',
						width: '87',
						height: '118',
						mright: '60',
						url: '/pages/users/order_list/index?status=1'
					},{
						title: '我打赏的',
						src: '/static/images/me_wdsd.png',
						width: '87',
						height: '118',
						mright: '60',
						url: '/pages/users/order_list/index?status=2'
					},{
						title: '我下载的',
						src: '/static/images/me_wxzd.png',
						width: '87',
						height: '118',
						mright: '0',
						url: '/pages/users/order_list/index?status=2'
					}]
				},{
					title: '录音棚',
					items: [{
						title: '单人录制',
						src: '/static/images/me_drlz.png',
						width: '87',
						height: '117',
						mright: '58',
						url: ''
					},{
						title: '多人录制',
						src: '/static/images/me_drlzs.png',
						width: '86',
						height: '117',
						mright: '59',
						url: ''
					},{
						title: '录制草稿',
						src: '/static/images/me_lzcg.png',
						width: '88',
						height: '117',
						mright: '58',
						url: ''
					},{
						title: '素材库',
						src: '/static/images/me_sck.png',
						width: '79',
						height: '117',
						mright: '0',
						url: ''
					}]
				}]
			}
		},
		methods: {
			urlTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		width: 750rpx;
		height: 420rpx;
		background-image: url(/static/images/me_bg.png);
		background-size: 750rpx 1000rpx;
		background-position: 0rpx 480rpx;
		position: relative;
	}
	.main {
		position: absolute;
		top: 140rpx;
		left: 30rpx;
		width: 690rpx;
		color: #FFFFFF;
		font-size: 26rpx;
	}
	.box {
		width: 100%;
		background-color: rgba($color: #2C2C2C, $alpha: 0.97);
		box-shadow: 0rpx 0rpx 3rpx 0rpx rgba(36, 36, 36, 0.08);
		border-radius: 18rpx;
	}
	.top {
		display: flex;
		flex-direction: column;
		padding: 24rpx;
		margin-bottom: 35rpx;
		.line1 {
			display: flex;
			align-items: center;
			font-size: 29rpx;
			.head {
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
			}
			.info {
				display: flex;
				flex-direction: column;
				width: 414rpx;
				margin-left: 28rpx;
				.t {
					display: flex;
					justify-content: space-between;
				}
				.b {
					display: flex;
					margin-top: 21rpx;
					.c {
						padding-left: 14rpx;
						padding-right: 14rpx;
					}
				}
			}
			.setting {
				margin-left: 29rpx;
				width: 47rpx;
				height: 79rpx;
			}
		}
		.line2 {
			display: flex;
			margin-top: 24rpx;
			view {margin-right: 40rpx;}
		}
		.line3 {
			display: flex;
			flex-wrap: wrap;
			margin-top: 26rpx;
			.title {
				font-size: 29rpx;
				margin-right: 8rpx;
			}
			.u-tag {
				margin-left: 16rpx!important;
				margin-bottom: 10rpx;
			}
			.u-size-mini {
				font-size: 21rpx!important;
			}
			.add {
				width: 22rpx;
				height: 22rpx;
				font-size: 36rpx;
				margin-left: 11rpx;
				margin-top: -6rpx;
			}
		}
		.line4 {
			margin-top: 8rpx;
		}
	}
	.list {
		height: 208rpx;
		margin-bottom: 28rpx;
		.item_title {
			font-size: 28rpx;
			font-weight: 500;
			padding-top: 30rpx;
			margin-left: 28rpx;
			margin-bottom: 7rpx;
		}
		.items {
			margin-left: 22rpx;
		}
	}
	.list:nth-last-child(1) {
		margin-bottom: 180rpx;
	}
</style>
