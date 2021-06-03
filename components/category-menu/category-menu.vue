<template>
	<view class="menu">
		<view :class="(curr == index) ? 'curr' : ''" v-for="(item, index) in menuList" @click="menuChange(index, item.id)">{{item.form_type_name}}</view>
	</view>
</template>

<script>
	export default {
		name:"category-menu",
		props: ['menuList'],
		data() {
			return {
				curr: 0
			};
		},
		methods: {
			menuChange(curr, menuId) {
				this.curr = curr;
				this.$emit('menuId', menuId);
			}
		}
	}
</script>

<style lang="scss">
	.menu {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		align-items: center;
		color: #282828;
		.curr {
			background-color: #545454;
			color: #F8F8F8;
			box-shadow: 1rpx 1rpx 0rpx 0rpx rgba(42, 42, 42, 0.15);
			border-radius: 18rpx;
			padding: 6rpx 12rpx 6rpx 12rpx;
		}
	}
</style>
