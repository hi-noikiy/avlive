<template>
	<view class="">
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
				data_list: [],
				current: 0,
				menu_id: '',
				demand_form: [],
				data_type: ''
			}
		},
		onLoad(options) {
			if(JSON.stringify(options) != "{}") {
				this.data_type = options.data_type;
			}
			this.getDemandForm()
			this.getList()
		},
		methods: {
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
			typeChange(index) {
				this.current = index;
				this.getList();
			},
			getList() {
				var that = this;
				// 视频、音频
				var data = {
					'type': that.current + 1,
					'demand_form_id':that.menu_id
				}
				if(that.data_type != '') {
					if(that.data_type == 1) {						
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
					that.data_list = res.data.list;
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size:100% 100vh;
	}
	.tabs {
		margin: 0 auto;
		width: 220rpx;
	}
	.list {
		margin-top: 26rpx;
	}
</style>
