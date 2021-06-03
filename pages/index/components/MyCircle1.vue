<template>
	<view class="page bg-white">
		<!-- #ifdef APP-PLUS -->
		<u-gap height="44" ></u-gap>
		<!-- #endif --> 
		<view class="wrap u-flex u-row-between">
			<view class="u-flex">
				<u-avatar src="../../users/static/1.png" size="80"></u-avatar>
				<view class="ml-20">我发表的</view>
			</view>
			<view>发布</view>
		</view>
		<u-gap height="20" ></u-gap>
		<u-line />
		<u-gap height="20" ></u-gap>
		<view class="wrap">
			<view class="item u-flex u-flex-col u-col-top" v-for="i in 6">
				<view class="u-flex">
					<u-avatar src="../../users/static/1.png" size="100"></u-avatar>
					<view class="u-flex u-flex-col ml-20 ">
						<view class="name">张三</view>
						<view class="time text-desc mt-10">3小时前</view>
					</view>
				</view>
				<view class="wrap line-h-50 textInfo">
					 福美来四大发明收代理费福美来四大发明收代理费福美来四大发明收代理
					 费福美来四大发明收代理费福美来四大发明收代理费福美来四大发明收代理费
					 福美来四大发明收代理费福美来四大发明收代理费福美来四大发明收代理费福美来四大发明收代理费
				</view>
				<view class="wrap mt-20">
					<u-grid :col="3" :border="false">
						<u-grid-item v-for="i in 6" :custom-style="grid_item_style">
							<u-image width="220rpx" height="220rpx" src="https://img-blog.csdnimg.cn/20190301125102646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTAxMDE5OA==,size_16,color_FFFFFF,t_70"></u-image>
						</u-grid-item> 
					</u-grid>
				</view>
				<view class="wrap mt-20" style="width: 100%;">
					<u-grid :col="3" :border="false">
						<u-grid-item v-for="(item,index) in menus" :key="index">
							<u-icon :name="item.icon" :size="60" color="#9c9c9c"></u-icon>
							<text class="grid-text">{{item.nums}}</text>
						</u-grid-item> 
					</u-grid>
				</view> 
				<u-gap height="20" ></u-gap>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grid_item_style:{
					padding: '5rpx 10rpx'
				},
				menus:[
					{
						icon:'heart-fill',
						nums:1,
						check:false
					},
					{
						icon:'edit-pen-fill',
						nums:1,
						check:false
					},
					{
						icon:'zhuanfa',
						nums:1,
						check:false
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
page{
	background-color: #FFf;
}
.textInfo{text-indent: 2em;font-size: 32rpx;}
</style>
