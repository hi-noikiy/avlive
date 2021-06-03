<template>
	<view>
		<u-navbar :is-back="false" title="">
			<view class="header">
				<view class="l">
					<image src="../../users/static/1.png"></image>
					<view>我发表的</view>
				</view>
				<view class="r" @click="urlTo('/pages/circle/form')">发布</view>
			</view>
		</u-navbar>
		<view class="list">
			<view class="item" v-for="i in 2">
				<view class="info">
					<view class="l">
						<image src="../../users/static/1.png" class="head"></image>
						<view class="u">
							<view class="name">安妮爱主持</view>
							<view class="time">3h前</view>
						</view>
					</view>
					<view class="follow">关注</view>
				</view>
				<u-gap height="2" bg-color="#E0DEDE" margin-top="30" margin-bottom="29"></u-gap>
				<view class="content">
					<view class="title">我爱主持我爱主持我爱主持我爱主持我爱主持我爱 主持我爱主持我爱主持我爱主持我爱主持我爱主持 我爱主持我爱主持我爱主持我爱。</view>
					<view class="imgs">
						<image v-for="i in 5" src="../../../static/images/bg.png"></image>
					</view>
				</view>
				<u-gap height="2" bg-color="#E0DEDE" margin-top="44" margin-bottom="26"></u-gap>
				<view class="operation">
					<view class="like ico">
						<image src="../../../static/images/circle_like.png"></image>
						<view>12</view>
					</view>
					<view class="comment ico">
						<image src="../../../static/images/circle_comment.png"></image>
						<view>12</view>
					</view>
					<view class="share ico">
						<image src="../../../static/images/circle_share.png"></image>
						<view>06</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
	.header {
		display: flex;
		justify-content: space-between;
		.l {
			display: flex;
			align-items: center;
			margin-left: 26rpx;
			image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 14rpx;
			}
		}
		.r {
			display: flex;
			align-items: center;
			margin-left: 450rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #323232;
		}
	}
	.list {
		width: 690rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}
	.item {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		.info {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.l {
				display: flex;
				align-items: center;
				.head {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
				.u {
					margin-left: 29rpx;
					.name {
						font-size: 28rpx;
						font-weight: bold;
						color: #323232;
						padding-bottom: 4rpx;
					}
					.time {
						font-size: 20rpx;
						font-weight: 400;
						color: #999999;
					}
				}
			}
			.follow {
				width: 140rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #FE3149;
				border-radius: 4rpx;
				color: #FFFFFF;
				font-size: 25rpx;
				font-weight: bold;
				text-align: center;
			}
		}
		.content {
			display: flex;
			flex-direction: column;
			.title {
				font-size: 28rpx;
				font-weight: 500;
				color: #000000;
				margin-bottom: 30rpx;
			}
			.imgs {
				display: flex;
				flex-wrap: wrap;
				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.operation {
			display: flex;
			justify-content: space-around;
			font-size: 28rpx;
			font-weight: 500;
			color: #323232;
			image {
				width: 35rpx;
				height: 35rpx;
				margin-bottom: 4rpx;
			}
			.like {
				image {
					height: 31rpx;
					margin-top: 4rpx;
				}
			}
			.ico {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
