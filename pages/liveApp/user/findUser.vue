<template>
	<view>
		<image src="/static/images/main-bg.png" class="bg"></image>
		<view class="page">
			<view class="author">
				<view class="t">
					<view class="info">
						<image class="head" :src="userInfo.avatar"></image>
						<view class="detail">
							<text class="name">{{userInfo.nickname}}</text>
							<text class="b">{{userInfo.fensi}}粉丝 | {{userInfo.guanzhu}}关注 | ID {{userInfo.look_id}}</text>
						</view>
						<image class="msg" src="/static/images/pinglunh_icon.png" v-if="userInfo.uid != uid"></image>
					</view>
					<view class="tags">
						<u-tag
							v-for="(item, index) in userInfo.class_name"
							:text="item"
							mode="dark"
							shape="circle"
							bg-color="#E3E3E3"
							color="#545454"
						/>
					</view>
					<view class="grade">
						<span>荣誉值：{{userInfo.credit_value}}</span>
						<span>等级：{{userInfo.level}}级</span>
					</view>
					<view class="sign">个性签名：{{userInfo.signature == '' ? '这个家伙很懒，什么都没留下' : userInfo.signature}}</view>
				</view>
				<view class="c" v-if="userInfo.uid != uid">
					<view class="btn">关注</view>
					<view class="btn">雇佣他</view>
				</view>
			</view>
			<view class="tabs">
				<u-tabs
					name="cate_name"
					:list="list"
					:is-scroll="false"
					:current="current"
					@change="typeChange"
					active-color="#000000"
					inactive-color="#5B5B5B"
					bg-color=""
				></u-tabs>
			</view>
			<category-menu :menuList="demand_form" @menuId="setMenuId"></category-menu>
			<view class="list">
				<video-list v-if="current == 0" :videoList="data_list" :noPage="true"></video-list>
				<audio-list v-if="current == 1" :audioList="data_list" :noPage="true"></audio-list>
			</view>
			<view class="item">
				<view class="t">
					<view class="title">收费标准</view>
					<view class="more" @click="works()">
						<span>全部作品</span>
						<image src="../../../static/images/right.png"></image>
					</view>
				</view>
				<view class="b">
					<view class="info">
						<view class="l">1-100字</view>
						<view class="r">60元</view>
					</view>
					<view class="info">
						<view class="l">100-200字</view>
						<view class="r">120元</view>
					</view>
					<view class="info">
						<view class="l">200-300字</view>
						<view class="r">180元</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="t">
					<view class="title">近期成交情况</view>
				</view>
				<view class="b">
					<view class="info">
						<view class="l">最近一个月成交</view>
						<view class="r">15单</view>
					</view>
					<view class="info">
						<view class="l">最近一个月好评率</view>
						<view class="r">100%</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import categoryMenu from '@/components/category-menu/category-menu.vue';
	import videoList from '@/components/video-list/video-list';
	import audioList from '@/components/audio-list/audio-list.vue';
	import {
		getDemandForm,
		userInfo,
		getHomeData
	} from '@/api/liveApp.js';
	export default {
		components: {
			'category-menu': categoryMenu,
			'video-list': videoList,
			'audio-list': audioList
		},
		data() {
			return {
				list: [{
					cate_name: '视频'
				}, {
					cate_name: '音频'
				}],
				data_list: [],
				current: 0,
				menu_id: '',
				demand_form: [],
				userInfo: [],
				uid: '',
				user_id: ''
			}
		},
		methods: {
			onLoad(options) {
				this.user_id = options.user_id;
				this.getDemandForm()
				this.getUserInfo()
				this.getList()
				this.uid = uni.getStorageSync('uid')
			},
			// 设置menu_id
			setMenuId(menu_id) {
				this.menu_id = menu_id;
				this.getList();
			},
			// 获取作品分类列表
			getDemandForm() {
				var that = this;
				getDemandForm().then(res => {
					that.demand_form = res.data.demand_form;
					that.menu_id = res.data.demand_form[0].id;
				})
			},
			// 获取用户信息
			getUserInfo() {
				var that = this;
				var data = {
					uid: that.user_id
				}
				userInfo(data).then(res => {
					that.userInfo = res.data;
				})
			},
			typeChange(index) {
				this.current = index;
				this.getList();
			},
			getList() {
				var that = this;
				// 视频、音频
				var data = {
					'type': that.current + 1,
					'demand_form_id':that.menu_id,
					'page': 1,
					'limit': 2
				}
				getHomeData(data).then(res => {
					that.data_list = res.data.list;
				})
			},
			// 全部作品
			works() {
				uni.navigateTo({
					url: '../../tool/worklist'
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
	.page {
		position: absolute;
		z-index: 2;
		width: 690rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}
	.author {
		.t {
			position: relative;
			width: 100%;
			background: #F5F5F9;
			box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(255, 255, 255, 0.2), 0rpx 3rpx 1rpx 0rpx rgba(0, 0, 0, 0.13);
			border-radius: 15rpx;
			display: flex;
			flex-direction: column;
			padding-top: 30rpx;
			padding-left: 30rpx;
			padding-bottom: 44rpx;
			.info {
				display: flex;
				align-items: center;
				.head {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
				.detail {
					display: flex;
					flex-direction: column;
					width: 330rpx;
					margin-left: 15rpx;
					.name {
						font-size: 36rpx;
						color: #000000;
						margin-bottom: 10rpx;
					}
					.b {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.msg {
					width: 42rpx;
					height: 40rpx;
					margin-left: 110rpx;
					margin-bottom: 26rpx;
				}
			}
			.tags {
				margin-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				.u-tag {
					margin-bottom: 6rpx;
					margin-right: 20rpx;
				}
			}
			.grade {
				font-size: 24rpx;
				font-weight: bold;
				color: #444444;
				margin-top: 15rpx;
				span {
					margin-right: 30rpx;
				}
			}
			.sign {
				font-size: 24rpx;
				color: #999999;
				margin-top: 10rpx;
			}
		}
		.c {
			width: 100%;
			height: 106rpx;
			background-color: #2B2C31;
			box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(255, 255, 255, 0.2), 0rpx 3rpx 1rpx 0rpx rgba(0, 0, 0, 0.13);
			border-bottom-left-radius: 15rpx;
			border-bottom-right-radius: 15rpx;
			margin-top: -16rpx;
			display: flex;
			justify-content: space-around;
			.btn {
				width: 295rpx;
				height: 54rpx;
				line-height: 54rpx;
				text-align: center;
				background-color: #F5F5F9;
				border-radius: 15rpx;
				margin-top: 32rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
	.tabs {
		margin: 0 auto;
		width: 220rpx;
	}
	.list {
		margin-top: 26rpx;
	}
	.item {
		width: 100%;
		color: #000000;
		margin-bottom: 30rpx;
		.t {
			display: flex;
			justify-content: space-between;
			.title {
				font-size: 28rpx;
				font-weight: bold;
				width: 200rpx;
			}
			.more {
				display: flex;
				align-items: center;
				span {
					font-size: 24rpx;
					padding-right: 19rpx;
				}
				image {
					width: 20rpx;
					height: 24rpx;
				}
			}
		}
		.b {
			background-color: rgba($color: #FFFFFF, $alpha: 0.4);
			border-radius: 15rpx;
			margin-top: 25rpx;
			padding: 30rpx;
			padding-bottom: 3rpx;
			.info {
				display: flex;
				justify-content: space-between;
				margin-bottom: 27rpx;
				.l {
					font-size: 28rpx;
					font-weight: bold;
				}
				.r {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
