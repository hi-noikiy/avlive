<template>
	<view class="">
		<view class="tabs">
			<u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" @change="typeChange"
				active-color="#000000" inactive-color="#5B5B5B" bg-color=""></u-tabs>
		</view>
		<category-menu :menuList="demand_form" @menuId="setMenuId"></category-menu>
		<scroll-view scroll-y="true" :style="{height:windowHeight-130 +'px'}" @scrolltolower="videolower">
			<view class="list">
				<video-list v-if="current == 0" :videoList="data_list" @pgetList="getList" :delshow="delshow">
				</video-list>
				<audio-list v-if="current == 1" :audioList="data_list" @pgetList="getList" :delshow="delshow">
				</audio-list>
				<view class="zwsj" v-if="nodata">
					暂无数据
				</view>
			</view>
		</scroll-view>
		<u-gap height="20"></u-gap>
		<u-loadmore v-if="data_list.length!=0" :status="loadStatus" />
	</view>
</template>

<script>
	import categoryMenu from '@/components/category-menu/category-menu.vue';
	import videoList from '@/components/video-list/video-list';
	import audioList from '@/components/audio-list/audio-list.vue';
	import {
		getDemandForm,
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
				nodata: false,
				scrolly: false,
				loadStatus: 'loadmore',
				data_list: [],
				current: 0,
				delshow: 1,
				page: 1,
				menu_id: '',
				demand_form: [],
				data_type: '',
				windowHeight:''
			}
		},
		onLoad(options) {
			if (JSON.stringify(options) != "{}") {
				this.data_type = options.data_type;
			}
			this.getDemandForm()
			this.getList()
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
					// this.mainHeight = this.windowHeight
				}
			});
		},
		methods: {
			// 设置menu_id
			setMenuId(menu_id) {
				this.menu_id = menu_id;
				this.initData()
			},
			// 获取作品分类列表
			getDemandForm() {
				var that = this;
				getDemandForm().then(res => {
					that.demand_form = res.data.demand_form;
					that.menu_id = res.data.demand_form[0].id;
				})
			},
			typeChange(index) {
				this.current = index;
				this.initData()
			},
			initData() {
				this.nodata = false,
					this.scrolly = false,
					this.loadStatus = 'loadmore',
					this.page = 1
				this.getList();
			},
			getList() {
				if (this.data_type == 3 || this.data_type == 4) {
					if (this.data_type == 3) {
						uni.setNavigationBarTitle({
							title: "我打赏的"
						});
					} else if (this.data_type == 4) {
						uni.setNavigationBarTitle({
							title: "我下载的"
						});
					}
					this.data_list = [];
					return;
				}
				var that = this;
				// 视频、音频
				var data = {
					'page': that.page,
					'type': that.current + 1,
					'demand_form_id': that.menu_id == 1 ? '' : that.menu_id
				}
				if (that.data_type != '') {
					if (that.data_type == 1) {
						uni.setNavigationBarTitle({
							title: "我的作品"
						});
						data.uid = uni.getStorageSync('uid');
					} else if (that.data_type == 2) {
						uni.setNavigationBarTitle({
							title: "我点赞的"
						});
						data.like = true;
					}
				} else {
					uni.setNavigationBarTitle({
						title: "全部作品"
					});
				}
				getHomeData(data).then(res => {
					// that.data_list = res.data.list;
					if (res.data.list.length == 0 && that.page == 1) {
						that.nodata = true
					}
					if (that.page == 1) {
						that.data_list = res.data.list;
						if (that.data_list.length < 10) {
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
			},
			//滚动加载
			videolower() {
				console.log("触底", this.scrolly)
				if (this.scrolly) {
					return
				}
				this.page++
				this.loadStatus = 'loading';
				this.getList()
			},
		},

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

	.tabs {
		margin: 0 auto;
		width: 220rpx;
	}

	.list {
		margin-top: 26rpx;
	}

	.zwsj {
		color: rgb(96, 98, 102);
		font-size: 24rpx;
		text-align: center;
		margin-top: 40%;
		background-color: transparent;
	}
</style>
