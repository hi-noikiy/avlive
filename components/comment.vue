<template>
	<view class="comment-view" v-if="commentBox" @click="commentBox = false">
		<view class="comment-main" v-if="commentBox" @tap.stop>
			<scroll-view :scroll-y="true" style="height: 56vh;">
				<view class="comment" v-for="(res, index) in commentList" :key="res.id">
					<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.name }}</view>
							<view class="like" :class="{ highlight: res.isLike }">
								<view class="num">{{ res.likeNum }}</view>
								<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
								<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
							</view>
						</view>
						<view class="content">{{ res.contentText }}</view>
						<view class="reply-box">
							<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
								<view class="username">{{ item.name }}</view>
								<view class="text">{{ item.contentStr }}</view>
							</view>
							<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
								共{{ res.allReply }}条回复
								<u-icon class="more" name="arrow-right" :size="26"></u-icon>
							</view>
						</view>
						<view class="bottom">
							{{ res.date }}
							<view class="reply">回复</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="commenti" v-if="commentBox" @tap.stop>
			<input type="text" :placeholder="placeholder">
			<view class="btn">{{btn}}</view>
		</view>
	</view>
</template>

<script>
export default {
	name:"comment",
	data() {
		return {
			commentBox: false,
			placeholder: '请输入评论内容',
			btn: '评论',
			commentList: [
				{
					id: 1,
					name: '叶轻眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					]
				},
				{
					id: 2,
					name: '叶轻眉1',
					date: '01-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
				}
			]
		};
	},
	methods: {
		showComment(bool) {
			this.commentBox = bool;
		},
		// 点赞
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-view {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.6);
}
.comment-main {
	position: fixed;
	z-index: 9999;
	left: 0;
	bottom: 0;
	height: 60vh;
	background-color: #FFFFFF;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #999999;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #999999;
				.num {
					color: #999999;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #999999;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #999999;
				margin-left: 10rpx;
			}
		}
	}
}
.comment:nth-last-child(1) {
	margin-bottom: 100rpx;
}
.commenti {
	position: fixed;
	z-index: 9999;
	left: 0;
	bottom: 0;
	width: 750rpx;
	height: 100rpx;
	background-color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 2rpx solid #999999;
	input {
		width: 60%;
		height: 70rpx;
		padding: 20rpx;
		border: 2rpx solid #999999;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		margin-right: 20rpx;
	}
	.btn {
		width: 140rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		border-radius: 20rpx;
		border: 2rpx solid #999999;
		color: #999999;
	}
}
</style>
