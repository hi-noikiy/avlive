<template>
	<!-- <scroll-view scroll-y :style="{height:mainHeight+'px'}" > -->
	<view class="">
		<view>
			<!-- #ifdef APP-PLUS -->
			<u-gap height="44"></u-gap>
			<!-- #endif -->
			<view class="top-menu">

				<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
					active-color="#000000" inactive-color="#000000" font-size="34" bar-width="48" bar-height="7">
				</u-tabs-swiper>
				<!-- <view class="search">
					<image src="../../../static/images/home_search.png"></image>
				</view> -->
			</view>
			<u-gap height="20"></u-gap>
			<view class="wrap">
				<!-- banner -->
				<u-swiper :list="banner" mode="dot" height="292" border-radius="20"></u-swiper>
			</view>
			<view v-if="current==0||current==1||current==2">
				<category-menu :menuList="demand_form" @menuId="setMenuId"></category-menu>
			</view>
			<u-gap height="20"></u-gap>

			<swiper :current="swiperCurrent" @transition="transition" :style="{height:mainHeight+'rpx'}"
				@animationfinish="animationfinish">
				<!-- 视频 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y :style="{height:mainHeight+ 'rpx'}" @scrolltolower="videolower">
						<video-list :videoList="data_list"></video-list>
						<view class="zwsj" v-if="nodata">
							暂无数据
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 音频 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y :style="{height:mainHeight + 'rpx'}" @scrolltolower="videolower">
						<audio-list :audioList="data_list"></audio-list>
						<view class="zwsj" v-if="nodata">
							暂无数据
						</view>
					</scroll-view>

				</swiper-item>
				<!-- 直播 -->
				<swiper-item class="swiper-item">
					<live-list :liveList="data_list"></live-list>
					<view class="zwsj" v-if="nodata">
						暂无数据
					</view>
				</swiper-item>
				<!-- 关注 -->
				<swiper-item class="swiper-item">
					<!-- 关注 -->
					<!-- 	<u-tabs ref="uTabs3" :list="list3" :current="current3" @change="tabsChange3" :is-scroll="false" ></u-tabs> -->
					<view id="nav2">
						<u-tabs-swiper ref="uTabs3" :list="list3" :is-scroll="false" bar-width="300"
							active-color="#000000" :current="current3" @change="tabsChange3" bg-color="rgba(0,0,0,0)">
						</u-tabs-swiper>
						<u-gap height="20"></u-gap>
					</view>

					<!-- 				<swiper :style="{height:mainHeight+'px'}" :current="current3" @transition="transition"
						@animationfinish="animationfinish"> -->
					<!-- <view class="swiper-item" v-for="(item, index) in list3" :key="index"> -->
					<template v-if="current3==0">
						<!-- 视频 -->
						<video-list :videoList="video_list"></video-list>
					</template>
					<template v-else-if="current3==1">
						<!-- 音频 -->
						<audio-list :audioList="audio_list"></audio-list>
					</template>
				</swiper-item>

			</swiper>
			<u-loadmore v-if="current==0||current==1&&data_list.length!=0" :status="loadStatus" />
			<u-gap height="20"></u-gap>
		</view>


	</view>
	<!-- </scroll-view> -->
</template>

<script>
	import {
		getAddressList,
		getBanner
	} from '@/api/user.js';
	import {
		getDemandForm,
		getHomeData,
		getLiveRoomList
	} from '@/api/liveApp.js';
	import categoryMenu from '@/components/category-menu/category-menu.vue';
	import liveList from '@/components/live-list/live-list.vue';
	import audioList from '@/components/audio-list/audio-list.vue';
	import videoList from '@/components/video-list/video-list.vue';
	export default {
		props: {

		},
		components: {
			'category-menu': categoryMenu,
			'live-list': liveList,
			'audio-list': audioList,
			'video-list': videoList
		},
		data() {
			return {
				nodata: false,
				scrolly: false,
				windowHeight: 0,
				mainHeight: 800,
				banner: [],
				list: [{
					name: '视频'
				}, {
					name: '音频'
				}, {
					name: '直播'
				}, {
					name: '关注'
				}],
				list3: [{
					name: '视频'
				}, {
					name: '音频'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项 
				swiperCurrent: 0,
				current2: 0, // tabs组件的current值，表示当前活动的tab选项 
				current3: 0, // tabs组件的current值，表示当前活动的tab选项
				// 作品分类列表
				demand_form: [],
				// 视频/音频/直播列表
				data_list: [],
				// 当前页码
				page: 1,
				// 当前选中的作品分类id
				menu_id: '',
				// 关注，视频、音频
				video_list: [],
				audio_list: [],
				loadStatus: 'loadmore'
			};
		},
		watch: {
			swiperCurrent(val, newval) {
				if (val != newval) {
					this.initData()
				}
			}
		},
		created() {
			this.getDemandForm();
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
					this.mainHeight = this.windowHeight
					// console.log(res);
					// console.log(res.model);
					// console.log(res.pixelRatio);
					// console.log(res.windowWidth);
					// console.log(res.windowHeight);
					// console.log(res.language);
					// console.log(res.version);
					// console.log(res.platform);
				}
			});
		},
		methods: {
			//滚动加载
			videolower() {
				if (this.scrolly) {
					return
				}
				this.page++
				this.loadStatus = 'loading';
				this.getData()
			},

			playVideo() {
				uni.navigateTo({
					url: '/pages/liveApp/playVideo'
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				// this.current = index;
				this.initData();
			},
			// tabs通知swiper切换
			tabsChange2(index) {
				this.current2 = index
			},
			// tabs通知swiper切换
			tabsChange3(index) {
				this.current3 = index
				// this.initData();
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				console.log("++++++++++++++++++++++++")
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);

			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.current = current;
				this.swiperCurrent = current
			},
			// scroll-view到底部加载更多
			// onreachBottom() {
			// 	if (that.page != 1) {
			// 		that.page = that.page + 1;
			// 	}
			// 	this.getData();
			// },
			// 获取作品分类列表
			getDemandForm() {
				var that = this;
				getDemandForm().then(res => {
					that.demand_form = res.data.demand_form;
					that.menu_id = res.data.demand_form[0].id;
					
					getBanner().then(res => {
						that.banner = res.data;
					})
					
					that.initData();
					// this.getData()
				})
			},
			// 获取数据
			getData() {
				var that = this;
				var type = that.swiperCurrent + 1;
				if (type == 1 || type == 2) {
					// 视频、音频
					console.log(that.page)
					var data = {
						'type': that.swiperCurrent + 1,
						'demand_form_id': that.menu_id,
						'page': that.page
					}
					getHomeData(data).then(res => {
						// that.data_list = res.data.list;
						if (res.data.list.length == 0 && that.page == 1) {
							this.nodata = true
						}
						if (that.page == 1) {
							that.data_list = res.data.list;
							if (that.data_list.length < 6) {
								that.scrolly = true
								that.loadStatus = 'nomore';
							}
						} else {
							if (res.data.list.length != 0) {
								// 拼接数据
								that.data_list = that.data_list.concat(res.data.list)
							} else {
								// 没有更多了
								// that.page --;
								that.scrolly = true
								console.log("没有更多了", that.scrolly)
								that.loadStatus = 'nomore';

							}
						}
					})
				} else if (type == 3) {
					// 直播
					var data = {
						'demand_form_id': that.menu_id,
						'page': that.page
					}
					getLiveRoomList(data).then(res => {
						this.data_list = res.data.list;
						if (res.data.list.length == 0 && that.page == 1) {
							this.nodata = true
						}
					})
				} else if (type == 4) {
					// 关注 视频
					var vdata = {
						'type': 1,
						'follow': true,
						'page': that.page
					}
					getHomeData(vdata).then(res => {
						that.video_list = res.data.list;

						// 关注 音频
						var adata = {
							'type': 2,
							'follow': true,
							'page': that.page
						}
						getHomeData(adata).then(res => {
							that.audio_list = res.data.list;
						})
					})
				}
			},
			// 初始化数据
			initData() {
				console.log("2222222")
				this.page = 1;
				this.scrolly = false
				this.nodata = false
				this.loadStatus = 'loadmore';
				this.getData();
			},
			// 设置menu_id 
			setMenuId(menu_id) {
				this.menu_id = menu_id;
				this.initData();
			},
			onAction(index, flag) {
				switch (flag) {
					case 0:
						//播放暂停
						this.audioList[index].isPlay = !this.audioList[index].isPlay
						break;
					case 1:
						//播放暂停
						this.audioList[index].isLike = !this.audioList[index].isLike
						break;
					default:
						break;
				}
			},

		},
		// // 上拉加载
		// onReachBottom() {
		// 	this.page++;
		// 	this.loadStatus = 'loading';
		// 	this.getData()
		// },
	}
</script>

<style scoped lang="scss">
	.wrap {
		max-width: 730rpx;
	}

	.top-menu {
		margin-top: 12rpx;
		display: flex;
		flex-direction: row;
		width: 400rpx;
		margin-left: 10rpx;
		.search {
			margin-top: 26rpx;
			margin-left: 270rpx;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.u-tabs {
			background-color: rgba(0, 0, 0, 0) !important;
		}
	}

	.zwsj {
		color: rgb(96, 98, 102);
		font-size: 24rpx;
		text-align: center;
		margin-top: 200rpx;
		background-color: transparent;

	}
</style>
