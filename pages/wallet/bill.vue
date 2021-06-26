<template>
	<view>
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="main">
			<view class="search1">
				<!-- 				<view class="item">
					<view class="l">类型</view>
					<view class="r">
						<span>全部</span>
						<image src="../../static/images/xiala_icon.png"></image>
					</view>
				</view> -->
				<view class="item">
					<view class="l">收支</view>
					<view class="r">
						<easy-select class="select" ref="easySelect" :value="type" :options="types"
							@selectOne="selectOne">
						</easy-select>
						<!-- <image src="../../static/images/xiala_icon.png"></image> -->
					</view>
				</view>
			</view>
			<view class="search2">
				<view class="item">
					<view class="l">开始时间</view>
					<view class="r">
						<picker mode="date" :value="startdate" @change="bindDateChange">
							<view class="uni-input">
								<text v-if="startdate != ''">{{startdate}}</text>
								<text v-else>请选择</text>
								<image style="margin-left: 20rpx;" src="../../static/images/sx_icon.png"></image>
							</view>
						</picker>
					</view>
				</view>
				<view class="item">
					<view class="l">截止时间</view>
					<view class="r">
						<picker mode="date" :value="enddate" @change="bindDateChange1">
							<view class="uni-input">
								<text v-if="enddate != ''">{{enddate}}</text>
								<text v-else>请选择</text>
								<image style="margin-left: 20rpx;" src="../../static/images/sx_icon.png"></image>
							</view>
						</picker>
						<!-- <image src="../../static/images/sx_icon.png"></image> -->
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="l">
						<image src="../../plugin/emoji-awesome/img/sheet_facebook_64_indexed_128.png"></image>
						<view class="c">
							<view class="name">{{item.mark}}</view>
							<view class="info">
								<span>{{item.pm == 0 ? '订单支出' : '订单收入'}}</span>
								<span>{{item.add_time}}</span>
							</view>
						</view>
					</view>
					<view class="r">{{item.pm == 0 ? '-' : '+'}}{{item.number}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userBill
	} from '@/api/user.js';
	export default {
		data() {
			return {
				type: '全部',
				types: [{
					value: '',
					label: '全部'
				}, {
					value: '1',
					label: '收入'
				}, {
					value: '2',
					label: '支出'
				}],
				typeVal: '',
				startdate: '',
				enddate: '',
				list: []
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata() {
				var that = this
				var data = {
					status: that.typeVal,
					page: 1,
					limit: 10,
					start_time: that.startdate,
					end_time: that.enddate
				}
				userBill(data).then(res => {
					console.log("账单结果", res)
					if (res.status == 200) {
						that.list = res.data
					}
				})
			},

			selectOne(options) {
				var that = this
				that.type = options.label
				that.typeVal = options.value
				that.getdata()
			},
			bindDateChange: function(e) {
				var that = this
				that.startdate = e.target.value
				if (that.startdate != '' && that.enddate != '') {
					that.getdata()
				}
			},
			bindDateChange1: function(e) {
				var that = this
				that.enddate = e.target.value
				if (that.startdate != '' && that.enddate != '') {
					that.getdata()
				}
			},
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
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.search1 {
		display: flex;

		.item {
			width: 300rpx;
			height: 88rpx;
			margin-right: 20rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			display: flex;
			align-items: center;

			.l {
				font-size: 28rpx;
				font-weight: bold;
				color: #000000;
				margin-left: 19rpx;
			}

			.r {
				margin-left: 33rpx;

				span {
					padding-right: 12rpx;
					font-size: 24rpx;
				}

				image {
					width: 22rpx;
					height: 12rpx;
				}
			}
		}
	}

	.search2 {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.item {
			width: 335rpx;
			height: 88rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			display: flex;
			align-items: center;

			.l {
				font-size: 28rpx;
				font-weight: bold;
				margin-left: 19rpx;
			}

			.r {
				margin-left: 21rpx;

				// span {

				// }
				.uni-input {

					font-size: 24rpx;
					padding-right: 15rpx;
				}

				image {
					width: 8rpx;
					height: 14rpx;
				}
			}
		}
	}

	.list {
		margin-top: 41rpx;
		display: flex;
		flex-wrap: wrap;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			width: 100%;
			height: 120rpx;
			background-color: rgba($color: #FFFFFF, $alpha: 0.5);
			border-radius: 15rpx;

			.l {
				display: flex;
				margin-left: 20rpx;

				image {
					width: 88rpx;
					height: 88rpx;
					border-radius: 15rpx;
				}

				.c {
					margin-left: 17rpx;

					.name {
						font-size: 30rpx;
						font-weight: bold;
						margin-bottom: 6rpx;
					}

					span {
						font-size: 24rpx;
						color: #666666;
					}

					span:nth-child(1) {
						padding-right: 16rpx;
					}
				}
			}

			.r {
				margin-right: 20rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #444444;

			}
		}

	}

	.select {
		width: 144rpx !important;
		height: 48rpx !important;
		font-size: 24rpx;
		color: #000000;
		margin-right: 30rpx;
		border: none;
	}
</style>
