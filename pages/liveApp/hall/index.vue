<template>
	<view class="">
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<view class="main">
			<view class="i i1">
				<view class="title">指定制作方</view>
				<input type="number" value="" :disabled="disabledzz" placeholder="选填" v-model="Producer"
					@input="changeInputzz()" />
				<view class="info">{{userinfozz.nickname}}</view>
			</view>
			<view class="i i1">
				<view class="title">指定雇主</view>
				<input type="number" value="" :disabled="disabledgz" v-model="employer" placeholder="选填"
					@input="changeInputgz()" />
				<view class="info">{{userinfogz.nickname}}</view>
			</view>
			<view class="i i2">
				<view class="title">预算（非必填）</view>
				<input type="number" v-model="pay_price" placeholder="请输入" />
			</view>
			<view class="i i3">
				<view class="title">期望制作周期（非必填）</view>
				<input type="text" style="text-align: right;" v-model="cycle_data" placeholder="请输入" />
				<view class="info">
					<picker :range="unitArr" @change="unitChange" :value="unitIndex">
						<view>{{unit}}</view>
					</picker>
					<image src="../../../static/images/bs_icon.png"></image>
				</view>
			</view>
			<view class="demand">
				<view class="title">音色要求（非必填可多选）</view>
				<view class="inputs">
					<u-checkbox-group>
						<u-checkbox v-for="(item, index) in checkboxList" v-model="item.checked" shape="square"
							active-color="#000000" :name="item.timbre_type_name">{{item.timbre_type_name}}</u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view class="m m1">
				<view>请一句话描述您的需求</view>
				<input type="text" v-model="desc" placeholder="请输入您的需求简介" />
			</view>
			<view class="m m2">
				<view>详细描述您的需求</view>
				<textarea v-model="remake" placeholder="请输入详情" />
			</view>
			<!-- <u-upload :action="action" ref="uUpload"></u-upload> -->

			<view class="r" v-show="rshow" @tap="onUpload()">
				<image v-if="enclosure == ''" src="../../../static/images/hadd.png"></image>
				<view style="padding-top: 100rpx;">
					<span class="t">{{enclosure == '' ? '音频视频支持' : '已选择文件'}}</span>
					<span class="b">{{enclosure == '' ? 'PM3 PM4格式' : '点击替换'}}</span>
				</view>
			</view>

			<view class="sub" @click="submit" v-if="Producer!=''">修改</view>

			<view class="sub" @click="submit(true)" v-else>提交</view>
		</view>


		<view class="bgbox" v-if="shareBox" @click="shareBox = false">
			<view class="share-box" v-if="shareBox" @tap.stop>
				<view class="share-item" v-for="(item, index) in list" :key="index" @click="getpay(index)">
					<!-- <image class="share-item-image" :src="item.image"></image> -->
					<text class="share-item-text">{{item.title}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		payOrder,
		refundMoney,
		getUserInfo,
		getDemandTimbreList,
		createOrder,
		getUserOrderList,
		saveOrder
	} from '@/api/liveApp';
	import lFile from '@/components/l-file/l-file';
	export default {

		data() {
			return {
				rshow: true,
				disabledzz: false,
				disabledgz: false,
				userinfozz: {
					avatar: "",
					nickname: "",
					phone: "",
					real_name: "",
					uid: ''
				},
				userinfogz: {
					avatar: "",
					nickname: "",
					phone: "",
					real_name: "",
					uid: ''
				},
				shareBox: false,
				list: [{
					title: '微信'
				}, {
					title: '支付宝'
				}, {
					title: '音宝'
				}],
				action: 'http://qyh.ugekeji.com/api/v3/upload',
				unitArr: ['小时', '天', '周', '月'],
				unit: '小时',
				unitIndex: 0,
				checkboxList: [],
				//制作方
				Producer: '',
				//雇主
				employer: '',
				// 预算
				pay_price: '',
				// 制作周期
				cycle_data: '',
				// 需求描述
				desc: '',
				// 需求详情
				remake: '',
				// 图片
				enclosure: '',
				// 详情
				order_id: '',
				order_info: '',
				order_list: '',
				edit: false
			}
		},
		onLoad(options) {
			var that = this;
			getDemandTimbreList().then(res => {
				var checkboxList = res.data;
				for (let i = 0; i < checkboxList.length; i++) {
					checkboxList[i].checked = false;
					checkboxList[i].disabled = false;
				}
				that.checkboxList = checkboxList;
			});
			if (JSON.stringify(options) != "{}") {
				that.edit = true;
				that.order_id = options.order_id;
				// 修改
				var data = {
					uid: options.uid,
					order_id: options.order_id
				};
				getUserOrderList(data).then(res => {
					that.order_info = res.data.order_info;
					// 需求详情
					// that.htmlNodes = HTMLParser(that.order_info.remake);

					that.order_list = res.data.order_list;

					// 表单赋值
					that.pay_price = (that.order_info.pay_num == 0) ? that.order_info.pay_price : that.order_info
						.pay_num;
					that.cycle_data = that.order_info.cycle_value;
					that.unit = that.order_info.cycle_type;
					for (let i = 0; i < that.unitArr.length; i++) {
						if (that.unitArr[i] == that.unit) {
							that.unitIndex = i;
							break;
						}
					}
					var timbreTypeIdArr = that.order_info.timbre_type_name.split(/[ ]+/); // 以空格分开
					for (var i = 0; i < that.checkboxList.length; i++) {
						for (var j = 0; j < timbreTypeIdArr.length; j++) {
							if (that.checkboxList[i].timbre_type_name == timbreTypeIdArr[j]) {
								that.checkboxList[i].checked = true;
							}
						}
					}
					that.desc = that.order_info.desc;
					that.remake = that.order_info.remake;
					that.enclosure = that.order_info.enclosure;
					console.log("订单类型", that.order_info.order_type)
					console.log("制作方id", that.order_info.look_id)
					if (that.order_info.order_type == 2) {

						that.Producer = that.order_info.look_id
						that.disabledzz = true
						that.disabledgz = true
					}
				})
			}
		},

		methods: {
			getceshi() {
				uni.navigateTo({
					url: '../../index/components/Hall'
				})
			},
			/* 上传附件 */
			onUpload() {
				/**
				 * currentWebview: 当前webview
				 * url：上传接口地址
				 * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
				 * header: 上传接口请求头
				 */
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://qyh.ugekeji.com/api/v3/upload', //替换为你的
					name: 'file'
				});
			},
			onSuccess(res) {
				this.enclosure = res.data.id;
			},
			//填写制作方发生变化时
			changeInputzz() {
				if (this.Producer == '') {
					this.disabledgz = false
					this.userinfozz.nickname = ''
				} else {
					this.disabledgz = true
				}
				var datas = {
					look_id: this.Producer
				}
				getUserInfo(datas).then(res => {
					console.log("制作方信息", res)
					if (res.data.length == 0) {
						console.log("暂无该用户")
						this.userinfozz.nickname = '无此用户'
						return
					} else {
						this.userinfozz = res.data
					}
				})
			},
			//填写雇主发生变化时
			changeInputgz() {
				if (this.employer == '') {
					this.disabledzz = false
					this.userinfogz.nickname = ''
				} else {
					this.disabledzz = true
				}
				var datas = {
					look_id: this.employer
				}
				getUserInfo(datas).then(res => {
					console.log("制作方信息", res)
					if (res.data.length == 0) {
						console.log("暂无该用户")
						this.userinfogz.nickname = '无此用户'
						return
					} else {
						this.userinfogz = res.data
					}
				})
			},
			// 周期选中
			unitChange(e) {
				this.unitIndex = e.detail.value;
				this.unit = this.unitArr[e.detail.value];
			},
			chuangjianorder(data) {
				var that = this
				if (that.edit) {
					// 修改
					data.order_id = that.order_id;
					data.pay_num = that.pay_price;
					saveOrder(data).then(res => {
						if (res.status == 200) {
							if (res.data.need_pay_noney == 0 && res.data.need_refund_noney == 0) {
								uni.showToast({
									title: '修改成功',
									icon: 'none'
								})
								uni.hideLoading()
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/index/components/Hall'
									})
								}, 1000);
							}
							if (res.data.need_pay_noney > 0) {
								that.shareBox = true
							}
							if (res.data.need_refund_noney > 0) {
								var data = {
									order_id: res.data.order_id,
								}
								refundMoney(data).then(res => {
									console.log("退款结果", res)
									if (res.status == 200) {
										uni.hideLoading()
										uni.showToast({
											title: '修改成功',
											icon: 'none'
										})
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											})
										}, 1500);
									}
								})
							}

						}
					})
				} else {
					// 新增
					data.pay_price = that.pay_price;
					createOrder(data).then(res => {
						console.log("订单id", res.data.result.order_id)
						that.order_id = res.data.result.order_id
						if (that.Producer != '') {
							this.shareBox = true
							// var orderdata = {
							// 	order_id: res.data.result.order_id,
							// 	pay_type: 'yue'
							// }
							// payOrder(orderdata).then(res => {
							// 	console.log("支付结果", res)
							// 	if (res.status == 200) {
							// 		uni.hideLoading()
							// 		uni.showToast({
							// 			title: '支付成功等待作者确认',
							// 			icon: 'none'
							// 		})
							// 		setTimeout(function() {
							// 			uni.navigateBack({
							// 				delta: 1
							// 			})
							// 		}, 1500);
							// 	}
							// })
							return
						}
						if (res.status == 200) {
							uni.hideLoading()
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						}
					})
				}
			},
			// 提交
			submit(bool) {
				var that = this;
				// uni.showLoading()
				// 音色要求
				var timbre_type_id = '';
				var timbre_type_name = '';
				if (that.checkboxList.length > 0) {
					for (let i = 0; i < that.checkboxList.length; i++) {
						if (that.checkboxList[i].checked === true) {
							timbre_type_id += that.checkboxList[i].id + ',';
							timbre_type_name += that.checkboxList[i].timbre_type_name + ',';
						}
					}
					timbre_type_id = timbre_type_id.substr(0, timbre_type_id.length - 1);
					timbre_type_name = timbre_type_name.substr(0, timbre_type_name.length - 1);
				}
				if (that.Producer != '') {
					console.log("制作方")
					if (that.userinfozz.nickname == '无此用户') {
						uni.showToast({
							icon: 'none',
							title: '请输入正确制作方ID'
						})
						return
					}
					var data = {
						order_type: 2,
						look_id: that.Producer,
						make_uid: that.userinfozz.uid,
						make_name: that.userinfozz.nickname,
						make_phone: that.userinfozz.phone,
						desc: that.desc,
						remake: that.remake,
						enclosure: that.enclosure,
						timbre_type_id: timbre_type_id,
						timbre_type_name: timbre_type_name,
						cycle_type: that.unit,
						cycle_value: that.cycle_data
					}
					if (that.pay_price <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请输入预算金额'
						})
						return
					}
					that.chuangjianorder(data)

				} else if (that.employer != '') {
					if (that.userinfogz.nickname == '无此用户') {
						uni.showToast({
							icon: 'none',
							title: '请输入正确雇主ID'
						})
						return
					}
					console.log("雇主")
					var data = {
						order_type: 3,
						make_uid: that.userinfogz.uid,
						make_name: that.userinfogz.nickname,
						make_phone: that.userinfogz.phone,
						desc: that.desc,
						remake: that.remake,
						enclosure: that.enclosure,
						timbre_type_id: timbre_type_id,
						timbre_type_name: timbre_type_name,
						cycle_type: that.unit,
						cycle_value: that.cycle_data
					}
					if (that.pay_price <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请输入预算金额'
						})
						return
					}
					that.chuangjianorder(data)
				} else {
					console.log("普通订单")
					var data = {
						order_type: 1,
						desc: that.desc,
						remake: that.remake,
						enclosure: that.enclosure,
						timbre_type_id: timbre_type_id,
						timbre_type_name: timbre_type_name,
						cycle_type: that.unit,
						cycle_value: that.cycle_data
					}
					if (that.pay_price <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请输入预算金额'
						})
						return
					}
					that.chuangjianorder(data)
				}

			},
			getpay(index) {
				var that = this
				// #ifdef H5
				if (index == 0 || index == 1) {
					uni.showToast({
						icon: 'none',
						title: '暂时不支持h5支付'
					})
				}
				// #endif
				// #ifdef APP-PLUS
				//微信支付
				if (index == 0) {
					var orderdata = {
						order_id: that.order_id,
						pay_type: that.edit ? 'again_weixin' : 'weixin'
					}
					payOrder(orderdata).then(res => {
						console.log("支付结果", res)
						if (res.status == 200) {
							var wxdata = res.data
							var orderInfo = {
								"appid": wxdata.appId, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
								"noncestr": wxdata.nonceStr, // 随机字符串
								"package": wxdata.package, // 固定值
								"partnerid": wxdata.partnerid, // 微信支付商户号
								"prepayid": wxdata.prepayid, // 统一下单订单号 
								"timestamp": wxdata.timeStamp, // 时间戳（单位：秒）
								"sign": wxdata.paySign // 签名，这里用的 MD5 签名
							}
							console.log("+++++", orderInfo)
							uni.requestPayment({
								"provider": "wxpay",
								"orderInfo": orderInfo,
								success: function(res) {
									uni.hideLoading()
									uni.showToast({
										title: '支付成功等待作者确认',
										icon: 'none'
									})
									setTimeout(function() {
										that.showShare = false
										uni.navigateBack({
											delta: 1
										})
									}, 1500);
								},
								fail: function(e) {
									uni.hideLoading();
									console.log('fail:' + JSON.stringify(e));
								},
								complete: function(e) {
									uni.hideLoading();
									console.log('fail:' + JSON.stringify(e));
								},
							});

						}
					})
				}
				//支付宝支付
				if (index == 1) {
					var orderdata = {
						order_id: that.order_id,
						pay_type: that.edit ? 'again_alipay' : 'alipay'
					}
					payOrder(orderdata).then(res => {
						console.log("支付结果", res)
						if (res.status == 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.param,
								success: function(res) {
									uni.hideLoading()
									uni.showToast({
										title: '支付成功等待作者确认',
										icon: 'none'
									})
									setTimeout(function() {
										that.showShare = false
										uni.navigateBack({
											delta: 1
										})
									}, 1500);
								},

								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					})
				}
				// #endif
				// 音宝支付
				if (index == 2) {
					var orderdata = {
						order_id: that.order_id,
						pay_type: that.edit?'again_yue':'yue'
					}
					payOrder(orderdata).then(res => {
						console.log("支付结果", res)
						if (res.status == 200) {
							uni.hideLoading()
							uni.showToast({
								title: '支付成功等待作者确认',
								icon: 'none'
							})
							setTimeout(function() {
								that.showShare = false
								uni.navigateBack({
									delta: 1
								})
							}, 1500);
						}
					})
				}

			}
		},
		// computed: {
		// 	employer() {
		// 		if (this.employer == '') {
		// 			console.log("11111")
		// 			return this.disabledgz = false
		// 		} else {
		// 			console.log("22222")
		// 			return this.disabledgz = true
		// 		}
		// 	}
		// }
	}
</script>

<style scoped lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-image: url(/static/images/main-bg.png);
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: 100% 100vh;
	}

	.main {
		width: 690rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
	}

	.i {
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			padding-left: 24rpx;
		}

		.info {
			font-size: 24rpx;
		}

		input {
			color: #999999;
			font-size: 24rpx;
		}
	}

	.i1 {
		.title {
			width: 33%;
		}

		input {
			width: 34%;
		}

		.info {
			width: 33%;
			font-size: 24rpx;
			text-align: right;
			margin-right: 25rpx;
		}
	}

	.i2 {
		.title {
			width: 35%;
		}

		input {
			width: 65%;
			text-align: right;
			margin-right: 24rpx;
		}
	}

	.i3 {
		.title {
			width: 50%;
		}

		input {
			width: 30%;
		}

		.info {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 20%;

			image {
				margin-right: 24rpx;
				margin-left: 14rpx;
				width: 22rpx;
				height: 12rpx;
			}
		}
	}

	.demand {
		margin-top: 50rpx;
		font-size: 28rpx;
		font-weight: bold;

		.title {
			margin-bottom: 43rpx;
		}
	}

	.m {
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-radius: 15rpx;
		padding: 25rpx;
		margin-top: 20rpx;

		view {
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 32rpx;
		}
	}

	.m1 {
		input {
			font-size: 24rpx;
		}
	}

	.m2 {
		textarea {
			height: 86rpx;
			font-size: 24rpx;
		}
	}

	.sub {
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background-color: #323232;
		background-color: rgba($color: #323232, $alpha: 0.95);
		border-radius: 15rpx;
		font-size: 30rpx;
		text-align: center;
		margin-top: 109rpx;
		margin-bottom: 40rpx;
		font-size: 30rpx;
		color: #D7DCE2;
	}

	/deep/ .u-add-wrap {
		background-color: #FFFFFF;
	}

	.bgbox {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.share-box {
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 320rpx;
		background-color: #454545;
	}

	.share-item {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 25rpx;
		border-bottom: 1rpx solid #C8C7CC;
		text-align: center;

	}

	.share-item-image {
		width: 94rpx;
		height: 94rpx;
		margin-bottom: 30rpx;
	}

	.share-item-text {
		font-size: 33rpx;
		font-family: Adobe Heiti Std;
		color: #FFFFFF;
	}

	.r {
		width: 180rpx;
		height: 180rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		margin-right: 30rpx;
		position: relative;
		font-size: 22rpx;
		margin-top: 20rpx;
		color: #999999;
		text-align: center;

		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 46rpx;
			left: 70rpx;

		}

	}
</style>
