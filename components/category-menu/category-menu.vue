<template>
	<view class="">
		<view class="menu">
			<view :class="(curr == index) ? 'curr' : 'currs'" v-for="(item, index) in menuList"
				@click="menuChange(index, item.id)" v-if="index <= 3">{{item.form_type_name}}</view>
			<view class="" @click="getmore" v-if="menuList.length > 3">
				更多
				<!-- <image :src="moredata?'../../static/images/bs_icon.png':'../../static/images/up_icon.png'" mode="" class="img"></image> -->
			</view>
		</view>
		<view class="menu1" v-show="moredata">
			<view :class="(curr == index) ? 'curr' : 'currs'" v-for="(item, index) in menuList"
				@click="menuChange(index, item.id)" v-if="index > 4">{{item.form_type_name}}</view>
		</view>
	</view>
	<!-- 	<view class="menu">
		<view :class="(curr == index) ? 'curr' : ''" v-for="(item, index) in menuList" @click="menuChange(index, item.id)">{{item.form_type_name}}</view>
	</view> -->
</template>
<script>
	export default {
		name: "category-menu",
		props: ['menuList'],
		data() {
			return {
				moredata: false,
				curr: 0
			};
		},
		methods: {
			getmore() {
				this.moredata = !this.moredata
			},
			menuChange(curr, menuId) {
				this.curr = curr;
				this.$emit('menuId', menuId);
			}
		}
	}
</script>

<style lang="scss">
	// .menu {
	// 	margin-top: 20rpx;
	// 	width: 100%;
	// 	display: flex;
	// 	flex-direction: row;
	// 	justify-content:space-around;
	// 	align-items: center;
	// 	color: #282828;
	// 	.curr {
	// 		background-color: #545454;
	// 		color: #F8F8F8;
	// 		box-shadow: 1rpx 1rpx 0rpx 0rpx rgba(42, 42, 42, 0.15);
	// 		border-radius: 18rpx;
	// 		padding: 6rpx 12rpx 6rpx 12rpx;
	// 	}
	// }
	.menu {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		color: #282828;
		height: 60rpx;

		.curr {
			width: calc(calc(100% / 5) - 0rpx);
			text-align: center;
			background-color: #545454;
			color: #F8F8F8;
			box-shadow: 1rpx 1rpx 0rpx 0rpx rgba(42, 42, 42, 0.15);
			border-radius: 18rpx;
			padding: 6rpx 12rpx 6rpx 12rpx;

		}
		.img{
			width: 30rpx;
			height: 15rpx;
		}
		.currs {
			width: calc(calc(100% / 4) - 25rpx);
			color: #000;
			text-align: center;
		}
	}

	.menu1 {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		color: #282828;
		background: #FFFFFF;
		padding-bottom: 20rpx;
		position: fixed;
		z-index: 22;
		height: auto;

		.curr {
			width: calc(calc(100% / 5) + 20rpx);
			text-align: center;
			background-color: #545454;
			color: #F8F8F8;
			box-shadow: 1rpx 1rpx 0rpx 0rpx rgba(42, 42, 42, 0.15);
			border-radius: 18rpx;
			padding: 6rpx 12rpx 6rpx 12rpx;
			margin-top: 20rpx;
		}

		.currs {
			width: calc(calc(100% / 4) - 25rpx);
			color: #000;
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>
