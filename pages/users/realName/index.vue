<template>
	<view>

		<view class="ChangePassword">
			<view class="list">
				<view class="item">
					<input type='text' placeholder='填写姓名' placeholder-class='placeholder' v-model="name"></input>
				</view>
				<view class="item ">
					<input type='text' placeholder='填写身份证号' placeholder-class='placeholder' class="codeIput"
						v-model="card"></input>
				</view>
			</view>
			<button @click="submit" class="confirmBnt" :disabled="disabled">确认</button>
		</view>
	</view>
</template>

<script>
	import {
		idCard
	} from '@/api/api.js';
	export default {
		data() {
			return {
				name: "",
				card: "",
				disabled:false
			}
		},
		onLoad(options) {

		},
		methods: {
			submit() {

				var that = this
				uni.showLoading({
					title: "加载中..."
				})
				if (that.name == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					})
					return
				}
				if (that.card == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号'
					})
					return
				}
				var data = {
					cardid: that.card,
					name: that.name
				}
				that.disabled = true
				idCard(data).then(res => {
					console.log("实名认证提交结果", res)
					if (res.status == 200) {
							uni.showToast({
								icon: 'none',
								title: res.msg,
							});
							setTimeout(() => {
								uni.hideToast();
								uni.hideLoading()
								//关闭提示后跳转
								uni.navigateBack({
									delta: 1
								});
								that.disabled = false
							}, 1500)

						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
				})
			}
		}
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

	.ChangePassword .phone {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 55rpx;
	}

	.ChangePassword .list {
		width: 580rpx;
		margin: 53rpx auto 0 auto;
	}

	.ChangePassword .list .item {
		width: 100%;
		height: 110rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.ChangePassword .list .item input {
		width: 100%;
		height: 100%;
		font-size: 32rpx;
	}

	.ChangePassword .list .item .placeholder {
		color: #b9b9bc;
	}

	.ChangePassword .list .item input.codeIput {
		width: 340rpx;
	}

	.ChangePassword .list .item .code {
		font-size: 32rpx;
		background-color: transparent;

	}

	.ChangePassword .list .item .code.on {
		color: #b9b9bc !important;
	}

	.ChangePassword .confirmBnt {
		background-color: #000000;
		font-size: 32rpx;
		width: 580rpx;
		height: 90rpx;
		border-radius: 45rpx;
		color: #fff;
		margin: 92rpx auto 0 auto;
		text-align: center;
		line-height: 90rpx;
	}
</style>
