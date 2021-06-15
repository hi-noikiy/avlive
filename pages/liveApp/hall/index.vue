<template>
	<view class="main">
		<view class="i i1" v-show="false">
			<view class="title">指定制作方</view>
			<input type="text" value="" placeholder="选填" />
			<view class="info">安妮爱主持</view>
		</view>
		<view class="i i1" v-show="false">
			<view class="title">指定雇主</view>
			<input type="text" value="" placeholder="选填" />
			<view class="info">安妮爱主持</view>
		</view>
		<view class="i i2">
			<view class="title">预算（非必填）</view>
			<input type="text" v-model="pay_price" placeholder="请输入" />
		</view>
		<view class="i i3">
			<view class="title">期望制作周期（非必填）</view>
			<input type="text" v-model="cycle_data" placeholder="请输入" />
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
					<u-checkbox
						v-for="(item, index) in checkboxList"
						v-model="item.checked"
						shape="square"
						active-color="#000000"
						:name="item.timbre_type_name"
					>{{item.timbre_type_name}}</u-checkbox>
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
		<u-upload :action="action" ref="uUpload"></u-upload>
		<view class="sub" @click="submit">提交</view>
	</view>
</template>

<script>
	import {
		getDemandTimbreList,
		createOrder,
		getUserOrderList,
		saveOrder
	} from '@/api/liveApp';
	export default {
		data() {
			return {
				action: 'http://qyh.ugekeji.com/api/v3/upload',
				unitArr: ['小时','天','周','月'],
				unit: '小时',
				unitIndex: 0,
				checkboxList: [],
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
				for(let i = 0; i < checkboxList.length; i++) {
					checkboxList[i].checked = false;
					checkboxList[i].disabled= false;
				}
				that.checkboxList = checkboxList;
			});
			if(JSON.stringify(options) != "{}") {
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
					that.pay_price = (that.order_info.pay_num == 0) ? that.order_info.pay_price : that.order_info.pay_num;
					that.cycle_data = that.order_info.cycle_value;
					that.unit = that.order_info.cycle_type;
					for(let i = 0; i < that.unitArr.length; i++) {
						if(that.unitArr[i] == that.unit) {
							that.unitIndex = i;
							break;
						}
					}
					var timbreTypeIdArr = that.order_info.timbre_type_name.split(/[ ]+/);// 以空格分开
					for(var i = 0; i < that.checkboxList.length; i++) {
						for(var j = 0; j < timbreTypeIdArr.length; j++) {
							if(that.checkboxList[i].timbre_type_name == timbreTypeIdArr[j]) {
								that.checkboxList[i].checked = true;
							}
						}
					}
					that.desc = that.order_info.desc;
					that.remake = that.order_info.remake;
					that.enclosure = that.order_info.enclosure;
				})
			}
		},
		methods: {
			// 周期选中
			unitChange(e) {
				this.unitIndex = e.detail.value;
				this.unit = this.unitArr[e.detail.value];
			},
			// 提交
			submit() {
				var that = this;
				// 音色要求
				var timbre_type_id = '';
				var timbre_type_name = '';
				if(that.checkboxList.length > 0) {
					for(let i = 0; i < that.checkboxList.length; i++) {
						if(that.checkboxList[i].checked === true) {
							timbre_type_id += that.checkboxList[i].id + ',';
							timbre_type_name += that.checkboxList[i].timbre_type_name + ',';
						}
					}
					timbre_type_id = timbre_type_id.substr(0, timbre_type_id.length - 1);  
					timbre_type_name = timbre_type_name.substr(0, timbre_type_name.length - 1);
				}
				// 图片
				let files = [];
				files = that.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				if(files.length > 0) {
					that.enclosure = files[0].response;
				}
				// 数据整合
				var data = {
					desc: that.desc,
					remake: that.remake,
					enclosure: that.enclosure,
					timbre_type_id: timbre_type_id,
					timbre_type_name: timbre_type_name,
					cycle_type: that.unit,
					cycle_value: that.cycle_data
				}
				// 请求接口
				if(that.edit) {
					// 修改
					data.order_id = that.order_id;
					data.pay_num = that.pay_price;
					saveOrder(data).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if(res.status == 200) {
							setTimeout(function(){
								uni.switchTab({
									url: '/pages/index/components/Hall'
								})
							}, 1000);
						}
					})
				} else {
					// 新增
					data.pay_price = that.pay_price;
					createOrder(data).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if(res.status == 200) {
							setTimeout(function(){
								uni.switchTab({
									url: '/pages/index/components/Hall'
								})
							}, 1000);
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 20rpx;
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
		.title { width: 33%; }
		input { width: 34%; }
		.info {
			width: 33%;
			font-size: 24rpx;
			text-align:right;
			margin-right: 25rpx;
		}
	}
	.i2 {
		.title { width: 35%; }
		input {
			width: 65%;
			text-align: right;
			margin-right: 24rpx;
		}
	}
	.i3 {
		.title {width: 50%;}
		input {width: 30%;}
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
		input {font-size: 24rpx;}
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
</style>
