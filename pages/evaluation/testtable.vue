<template>
	<view class="">
		<!-- <image src="/static/images/main-bg.png" class="bg"></image> -->
		<view class="bg"></view>
		<view class="main">
			<!-- 单选题 -->
			<view class="box" v-for="(item,index) in list" :key="index" v-if="tabindex == index">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						1, {{item.name}} 共{{item.fraction}}分
					</view>
					<view class="answer" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="item.currentIndex == indexs?'active':''"
								@click="getchoice(index,indexs)">
								{{items.letter}}
							</view>
						</view>
						<view class="">
							{{items.name}} {{items.fraction}}分
						</view>
					</view>
					<view class="addanswer">
						<view style="width: 49rpx;text-align: center;">
							<image src="../../static/images/addanswer.png" mode="" @click="addanswer(index,indexs)">
							</image>
						</view>
						<input type="text" v-show="item.Inputtype" v-model="item.answertext" />
					</view>
				</view>

				<view class="btn" :class="item.currentIndex!=null || item.answertext!= ''?'btnactive':''"
					@click="getnextstep(index)" v-if="tabindex == 0">
					下一题
				</view>
			</view>
			<!-- 填空题 -->
			<view class="box" v-for="(item,index) in list2" :key="index" v-if="tabindex == 1">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						1, 从业时间9毕业后算起) 共三分 0.25分/年累计工作 <input type="text" v-model="item.answertexts" /> 年
					</view>
				</view>
				<view class="btnbox" v-if="tabindex  == 1 ">
					<view class="btn1">
						上一题
					</view>
					<view class="btn2" :class="item.answertexts!= ''?'btnactives':''">
						下一题
					</view>
				</view>

			</view>
			<!-- 填空题加附件 -->
			<view class="box" v-if="tabindex == 2">
				<view class="titleimg">
					填空题
				</view>
				<view class="topicstyle">
					<view class="titlename">
						8, 继续教育(可自行增加) 0.5分/次
					</view>
					<view class="answer">
						教育时间:<input type="text" v-model="answertext" />年<input type="text"
							v-model="answertext" />月<input type="text" v-model="answertext" />日
						<view class="addanswer" style="margin-top: 0;">
							<view style="width: 49rpx;text-align: center;">
								<image src="../../static/images/addanswer.png" mode="" @click="addanswer()">
								</image>
							</view>
							<input type="text" v-show="Inputtype" v-model="answertext" />
						</view>

					</view>
					<view class="answer">
						<view>
							相关证书(必选项)
						</view>

					</view>
					<view class="upload">
						<u-upload max-count="1" :action="action" ref="uUpload"></u-upload>
					</view>

				</view>
				<view class="btnbox" v-if="tabindex  == 2 ">
					<view class="btn1">
						上一题
					</view>
					<view class="btn2" :class="answertexts!= ''?'btnactives':''">
						下一题
					</view>
				</view>

			</view>
			<!-- 多选题 -->
			<view class="box" v-for="(item,index) in list3" :key="index" v-if="tabindex == 3">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						1, {{item.name}}
					</view>
					<view class="answer" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getMultiplechoice(index,indexs)">
								{{items.letter}}
							</view>
						</view>
						<view class="">
							{{items.name}}
						</view>
					</view>
					<view class="addanswer">
						<view style="width: 49rpx;text-align: center;">
							<image src="../../static/images/addanswer.png" mode="" @click="addanswer()">
							</image>
						</view>
						<input type="text" v-show="Inputtype" v-model="answertext" />
					</view>
				</view>

				<view class="btnbox" v-if="tabindex  == 3 ">
					<view class="btn1">
						上一题
					</view>
					<view class="btn2 btnactives" >
						下一题
					</view>
				</view>
			</view>
			<!-- 选择题 -->
			<view class="box" v-for="(item,index) in list4" :key="index" v-if="tabindex == 4">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						1, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion(index,indexs)">
								{{items.letter}}
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>
						<view class="">
							<u-upload max-count="1" :action="action" ref="uUpload"></u-upload>
						</view>
					</view>
				</view>
			
				<view class="btnbox" v-if="tabindex  == 4 ">
					<view class="btn1">
						上一题
					</view>
					<view class="btn2 btnactives">
						下一题
					</view>
				</view>
			</view>
			
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				tabindex: "0",
				answertext: "",
				Inputtype: false,
				action: 'http://qyh.ugekeji.com/api/v3/upload',
				list: [{
					type: "单选题",
					name: "在线时长",
					fraction: "5",
					currentIndex: null,

					answertext: "",
					arr: [{
						name: "24小时(随时可以进入工作状态)",
						fraction: "5",
						letter: "A"
					}, {
						name: "12-18小时",
						fraction: "3",
						letter: "B"
					}, {
						name: "2-11小时",
						fraction: "2",
						letter: "C"
					}]
				}],
				list2: [{
					type: "填空题",
					answertexts: "",
				}],
				list3: [{
					type: "多选题",
					name: "类别(可多选并自行增加)",
					currentIndex: null,
					answertext: "",
					arr: [{
						name: "专题片",
						disable: false,
						letter: "A"
					}, {
						name: "宣传片",
						disable: false,
						letter: "B"
					}, {
						name: "AI",
						disable: false,
						letter: "C"
					}]
				}],
				list4: [{
					type: "选择题",
					name: "相关证书 (多选,可自行增加) 共三分 0.5分/项",
					arr: [{
						name: "专业资格证书",
						disable: false,
						letter: "A"
					}, {
						name: "外语证书",
						disable: false,
						letter: "B"
					}, {
						name: "乐器证书",
						disable: false,
						letter: "C"
					}]
				}],
			}
		},
		methods: {
			/**
			 * getchoice
			 * 单选选择的index
			 */
			getchoice(index, indexs) {
				this.list[index].currentIndex = indexs
				this.list[index].nextsteptype = true
			},
			/**
			 * getMultiplechoice
			 * 多选
			 */
			getMultiplechoice(index,indexs){
				if(this.list3[index].arr[indexs].disable){
					this.list3[index].arr[indexs].disable = false
				}else{
					this.list3[index].arr[indexs].disable = true
				}
			},
			/**
			 * getchoicequestion
			 * 选择题多选(真正数据删除用一个即可)
			 */
			getchoicequestion(index,indexs){
				if(this.list4[index].arr[indexs].disable){
					this.list4[index].arr[indexs].disable = false
				}else{
					this.list4[index].arr[indexs].disable = true
				}
			},
			/**
			 * addanswer
			 * 点击添加显示输入其他答案
			 */
			addanswer(index, indexs) {
				if (this.Inputtype) {
					this.Inputtype = false
					this.answertext = ""
				} else {
					this.Inputtype = true
				}
			},
			/**
			 * getnextstep
			 */
			getnextstep(index) {
				// if (this.list[index].currentIndex != null || this.list[index].answertext != '') {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: "下一题"
				// 	})

				// }
				this.tabindex = index + 1
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		width: 750rpx;
		height: 100vh;
		background-image: url(/static/images/main-bg.png);
		background-size: 100%;
		background-position: 100%;
	}

	.main {
		position: absolute;
		top: 0;
		left: 30rpx;
		width: 690rpx;
		height: calc(100vh - 76rpx);
		color: #000000;
		background: rgba($color: #FFFCFC, $alpha: 0.54);
		border: 3rpx solid #FFFCFC;
		// opacity: 0.54;
		border-radius: 10rpx;

		.box {
			.titleimg {
				width: 138rpx;
				height: 38rpx;
				background-image: url(/static/images/juxing.png);
				background-size: 100%;
				background-position: 100%;
				position: relative;
				color: #FFFFFF;
				font-size: 24rpx;
				margin-top: 10rpx;
				line-height: 38rpx;
				text-indent: 1.5em;
			}

			.topicstyle {
				width: 94%;
				margin-left: 3%;

				.titlename {
					margin-top: 70rpx;
					font-size: 30rpx;
					color: #000000;
					font-weight: bolder;

					input {
						width: 50rpx;
						float: left;
						border-bottom: 1rpx solid #000000;
					}
				}

				.answer {
					font-size: 24rpx;
					color: #000000;
					margin-top: 40rpx;
					display: flex;
					align-items: center;

					input {
						border-bottom: 1rpx solid #000000;
						width: 80rpx;
						text-align: center;
						font-size: 24rpx;
					}

					.option {
						width: 34rpx;
						height: 34rpx;
						text-align: center;
						line-height: 34rpx;
						border: 1rpx solid #8B8A8B;
						border-radius: 50%;
						margin: 0 auto;
					}

					.active {
						background-image: url(/static/images/icon.png);
						width: 49rpx;
						height: 49rpx;
						line-height: 49rpx;
						background-size: 100%;
						background-position: 100%;
						border: 0;
						// position: relative;

					}
				}

				.addanswer {
					display: flex;
					align-items: center;
					height: 34rpx;
					margin-top: 40rpx;

					image {
						width: 34rpx;
						height: 34rpx;
					}

					input {
						height: 34rpx;
						border-bottom: 1rpx solid #000000;
						font-size: 24rpx;
					}

				}

				.upload {
					width: 100%;
					display: flex;
					justify-content: center;
					margin-top: 70rpx;
				}
			}

		}

		.btn {
			width: 83%;
			height: 93rpx;
			text-align: center;
			margin-left: 4%;
			line-height: 93rpx;
			background: #706E6E;
			border: 1px solid #706E6E;
			opacity: 0.93;
			border-radius: 10px;
			color: #FCFCFC;
			font-size: 36rpx;
			font-family: Adobe Heiti Std;
			position: fixed;
			bottom: 155rpx;
		}

		.btnactive {
			background-color: #000000;
		}

		.btnbox {
			width: 83%;
			height: 93rpx;
			display: flex;
			justify-content: space-around;
			margin-left: 4%;
			position: fixed;
			bottom: 155rpx;

			.btn1 {
				width: 264rpx;
				height: 87rpx;
				background: #797777;
				border: 1rpx solid #706E6E;
				border-radius: 10rpx;
				text-align: center;
				line-height: 87rpx;
				font-weight: normal;
				color: #FFFEFE;
				font-size: 30rpx;
			}

			.btn2 {
				width: 264rpx;
				height: 87rpx;
				background: #706E6E;
				border: 1px solid #706E6E;
				border-radius: 10rpx;
				text-align: center;
				line-height: 87rpx;
				font-weight: normal;
				color: #FFFEFE;
				font-size: 30rpx;
			}

			.btnactives {
				background-color: #000000;
			}
		}
	}
</style>
