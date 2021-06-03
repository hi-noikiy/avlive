<template>
	<view>
		<view :style="{height:footHeight+'px'}" v-if="noTop"></view>
		<view v-if="newData.bgColor">
			<view class="page-footer" id="target" :style="{'background-color':newData.bgColor.color[0].item}">
				<view class="foot-item" v-for="(item,index) in newData.menuList" :key="index" @click="goRouter(item)">
					<block v-if="item.link == activeRouter">
						<image :src="item.imgList[0]"></image>
						<view class="txt" :style="{color:newData.activeTxtColor.color[0].item}">{{item.name}}</view>
					</block>
					<block v-else>
						<image :src="item.imgList[1]"></image>
						<view class="txt" :style="{color:newData.txtColor.color[0].item}">{{item.name}}</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import {
		getNavigation
	} from '@/api/public.js'
	export default {
		name: 'pageFooter',
		props: {
			noTop:{
				type:Boolean,
				default:true
			},
			status:{
				type:Number | String,
				default:1
			}
		},
		computed: {
			...mapState({
				configData: state => state.app.pageFooter
			})
		},
		watch: {
			configData: {
							handler(nVal, oVal) {
								let self = this
								const query = uni.createSelectorQuery().in(this);
								this.newData = nVal
								this.$nextTick(() => {
									
									query.select('#target').boundingClientRect(data => {
										uni.$emit('footHeight',data.height)
										if(data){
											self.footHeight = data.height + 50
											
										}
										
									}).exec();
								})
							},
							deep: true
						},
		},
		created() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			this.activeRouter = '/' + curRoute
			getNavigation().then(res => {
				uni.setStorageSync('pageFoot', res.data)
				this.$store.commit('FOOT_UPLOAD', res.data)
			})
		},
		mounted() {
			let that = this
			this.newData = this.$store.state.app.pageFooter
		},
		data() {
			return {
				newData: {},
				activeRouter: '/',
				footHeight: 0
			}
		},
		methods: {
			goRouter(item) {
				var pages = getCurrentPages();  
				var page = (pages[pages.length - 1]).$page.fullPath;
				if (item.link == page) return
				uni.redirectTo({
					url: item.link
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-footer {
		position: fixed;
		bottom: 0;
		z-index: 30;
		display: flex;
		align-items: center;
		width: 100%;
		height: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
		border-top: solid 1rpx #F3F3F3;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/

		.foot-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		.foot-item image {
			height: 50rpx;
			width: 50rpx;
			text-align: center;
			margin: 0 auto;
		}

		.foot-item .txt {
			font-size: 24rpx;


			&.active {}
		}
	}
</style>
