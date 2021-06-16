<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<Home v-if="drawComp[0]" v-show="showComp[0]"></Home> 
			<!-- 消息 -->
			<Msg ref="msg" v-if="drawComp[1]" v-show="showComp[1]"></Msg> 
			<!-- 交易大厅 -->
			<Hall v-if="drawComp[2]" v-show="showComp[2]"></Hall>
			<!-- 圈子 -->
			<my-circle v-if="drawComp[3]" v-show="showComp[3]"></my-circle> 
			<!-- 我的 -->
			<Me v-if="drawComp[4]" v-show="showComp[4]"></Me>  
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 :mid-button="true" --> 
		<u-tabbar v-model="current" :list="list" :active-color="newData.activeTxtColor.color[0].item" :inactive-color="newData.txtColor.color[0].item"
			:bg-color="newData.bgColor.color[0].item"  @change="tabChange"></u-tabbar>
	</view>
</template>

<script>
	import Home from './components/Home.vue'
	import Hall from './components/Hall.vue'
	import Msg from './components/Msg.vue'
	import MyCircle from './components/MyCircle.vue'
	import Me from './components/Me.vue'
	import { wechatAuthV2, getNavigation } from '@/api/public.js'
	export default {
		components:{
			Home,Hall,Msg,MyCircle,Me
		},
		data() {
			return {
				showComp:[true,false,false,false,false],
				drawComp:[true,false,false,false,false],
				newData:{
					activeTxtColor:{
						color:[{item: "#000000"}]
					},
					txtColor:{
						color:[{item: "#575757"}]
					},
					bgColor:{
						color:[{item: "#fff"}]
					}
				},
				list: [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '首页',
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '消息',
					customIcon: false,
				},
				{
					iconPath: "play-right",
					selectedIconPath: "play-right-fill",
					text: '交易大厅',
					customIcon: false,
				},
				{
					iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
					selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
					text: '圈子', 
					customIcon: false,
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					customIcon: false,
				},
			],
			current:0,
			activeIndex:0
			}
		},
		onLoad(options) {
			// #ifdef H5
			if (options.code) {
				let spread = app.globalData.spid ? app.globalData.spid : '';
				wechatAuthV2(options.code, spread).then(res => {
					location.href = decodeURIComponent(
						decodeURIComponent(options.back_url)
					)
				})
			}
			// #endif
			 
		},
		onShow() {
			if(this.$refs.msg){
				setTimeout(()=>{
					console.log('===index========onShow');
					this.$refs.msg.show()
				},1000)
			} 
			getNavigation().then(res => {
				this.newData = res.data||{};
				var list=[]
				this.newData.menuList.forEach(item=>{
					list.push({
							iconPath: item.imgList[1],
							selectedIconPath: item.imgList[0],
							text: item.name,
					})
				})
				this.list=list
			})
		},
		methods: {
			tabChange(index){  
				console.log("index"+index);
				if(index==this.activeIndex)return;
				
				
				//上一组件隐藏
				this.showComp[this.activeIndex]=false
				//切换下一组件显示
				this.drawComp[index]=true
				this.showComp[index]=true
				 // 更新索引
				this.activeIndex=index 
				
				if(this.activeIndex==1){
					// 消息组件
					setTimeout(()=>{
						console.log('======onchange----- show');
						this.$refs.msg.show()
					},1000)
				}
				// if(this.newData.menuList[index].link){
				// 	uni.redirectTo({
				// 		url: this.newData.menuList[index].link
				// 	})
				// }
			}
			
		}
	}
</script>

<style>

</style>
