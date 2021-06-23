<template>
	<view class="">
		<!-- <image src="/static/images/main-bg.png" class="bg"></image> -->
		<view class="bg"></view>
		<view class="main">
			<!-- 第一题 -->
			<view class="box" v-if="tabindex == 0">
				<view class="titleimg">
					{{list.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						1, {{list.name}} 共{{list.fraction}}分
					</view>
					<view class="answer" v-for="(item,index) in list.arr" :key="index">
						<view style="width: 49rpx;">
							<view class="option" :class="list.currentIndex == index ?'active':''"
								@click="getchoice(index)">
							</view>
						</view>
						<view class="">
							{{item.name}}
						</view>
						<view style="width: 10%;">
							{{item.fraction}}分
						</view>
					</view>
				</view>
				<view class="btn" :class="list.currentIndex!=null ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第二题 -->
			<view class="box" v-if="tabindex == 1">
				<view class="titleimg">
					{{list2.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						2, {{list2.name}} 共{{list2.fraction}}分
					</view>
					<view class="answer" v-for="(item,index) in list2.arr" :key="index">
						<view style="width: 49rpx;">
							<view class="option" :class="list2.currentIndex == index?'active':''"
								@click="getchoice(index)">
							</view>
						</view>
						<view class="">
							{{item.name}}
						</view>
						<view style="width: 10%;">
							{{item.fraction}}分
						</view>
					</view>
				</view>
				<view class="btn" :class="list2.currentIndex!=null ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第三题 -->
			<view class="box" v-if="tabindex == 2">
				<view class="titleimg">
					填空题
				</view>
				<view class="topicstyle">
					<view class="titlename">
						3, 从业时间（工龄，毕业后算起）<picker @change="bindPickerChange3" :value="index3" :range="list3">
							<view class="uni-input">累计工作 <text v-if="index3 == null">________</text> <text class="t"
									v-else>{{list3[index3]}}</text></view>
						</picker>
					</view>
				</view>
				<view class="btn" :class="index3!=null?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第四题 -->
			<view class="box" v-if="tabindex == 3">
				<view class="titleimg">
					填空题
				</view>
				<view class="topicstyle">
					<view class="titlename">
						4, 工作经验（从事配音工作，按月累计计算，未工作月份不得列入计算范围）<picker @change="bindPickerChange4" :value="index4"
							:range="list4">
							<view class="uni-input">累计工作 <text v-if="index4 == null">________</text> <text class="t"
									v-else>{{list4[index4]}}</text>个月</view>
						</picker>
					</view>
				</view>
				<view class="btn" :class="index4!=null?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第五题 -->
			<view class="box" v-if="tabindex == 4">
				<view class="titleimg">
					{{list5.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						5, {{list5.name}} 共{{list5.fraction}}分
					</view>
					<view class="answer" v-for="(item,index) in list5.arr" :key="index">
						<view style="width: 49rpx;">
							<view class="option" :class="list5.currentIndex == index?'active':''"
								@click="getchoice(index)">
							</view>
						</view>
						<view class="">
							{{item.name}}
						</view>
						<view style="width: 10%;">
							{{item.fraction}}分
						</view>

					</view>
				</view>
				<view class="btn" :class="list5.currentIndex!=null ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第六题 -->
			<view class="box" v-if="tabindex == 5">
				<view class="titleimg">
					{{list6.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						6, {{list6.name}} 共{{list6.fraction}}分
					</view>
					<view class="answer" v-for="(item,index) in list6.arr" :key="index">
						<view style="width: 49rpx;">
							<view class="option" :class="list6.currentIndex == index?'active':''"
								@click="getchoice(index)">
							</view>
						</view>
						<view class="">
							{{item.name}}
						</view>
						<view style="width: 10%;">
							{{item.fraction}}分
						</view>

					</view>
				</view>
				<view class="btn" :class="list6.currentIndex!=null ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第七题 -->
			<view class="box" v-if="tabindex == 6">
				<view class="titleimg">
					{{list7.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						7, {{list7.name}} 共{{list7.fraction}}分
					</view>
					<view class="answer" v-for="(item,index) in list7.arr" :key="index">
						<view style="width: 49rpx;">
							<view class="option" :class="list7.currentIndex == index?'active':''"
								@click="getchoice(index)">
							</view>
						</view>
						<view class="">
							{{item.name}}
						</view>
						<view style="width: 10%;">
							{{item.fraction}}分
						</view>

					</view>
				</view>
				<view class="btn" :class="list7.currentIndex!=null ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第八题 -->
			<view class="box" v-if="tabindex == 7">
				<view class="titleimg">
					填空题
				</view>

				<view class="topicstyle">
					<view class="titlename">
						8, 继续教育(可自行增加) 0.5分/次
					</view>
					<view class="answer">
						教育时间: <picker mode="date" :value="date8" :start="startDate8" :end="endDate8"
							@change="bindDateChange8">
							<view class="uni-input"> <text v-if="date8 == ''">________</text><text
									style="width: 150rpx;text-decoration: underline;">{{date8}}</text>
							</view>
						</picker>
						<view class="addanswer" style="margin-top: 0;">
							<view style="width: 49rpx;text-align: center;">
								<image src="../../static/images/addanswer.png" mode="" @click="addanswer()">
								</image>
							</view>
							<!-- <input type="text" v-show="Inputtype" v-model="answertext" /> -->
						</view>
					</view>
					<view class="answer">
						<view style="width: 300rpx;">
							相关证书(必选项)
						</view>
						<view class="upload">
							<u-upload max-count="1" :action="action" ref="uUpload"></u-upload>
						</view>
					</view>
				</view>

				<view class="btn" :class="date8!=''?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 多选题 -->
			<!-- 			<view class="box" v-for="(item,index) in list3" :key="index" v-if="tabindex == 3">
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
					<view class="btn2 btnactives">
						下一题
					</view>
				</view>
			</view> -->
			<!-- 第九题 -->
			<view class="box" v-for="(item,index) in list9" :key="index" v-if="tabindex == 8">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						9, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion9(index,indexs)">
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>
						<view class="" v-if="indexs == 0">
							<u-upload max-count="1" :action="action" ref="uploadzhuanye"></u-upload>
						</view>
						<view class="" v-if="indexs == 1">
							<u-upload max-count="1" :action="action" ref="uploadwaiyu"></u-upload>
						</view>
						<view class="" v-if="indexs == 2">
							<u-upload max-count="1" :action="action" ref="uploadyueqi"></u-upload>
						</view>
					</view>

				</view>

				<view class="btn" :class="list9data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十题 -->
			<view class="box" v-if="tabindex == 9">
				<view class="titleimg">
					填空题
				</view>

				<view class="topicstyle">
					<view class="titlename">
						10, 优秀作品（可查询且已公开的知名品牌、小微企业，并自行增加）
					</view>

					<view class="answer">
						作品完成时间: <picker mode="date" :value="date10" :start="startDate8" :end="endDate8"
							@change="bindDateChange10">
							<view class="uni-input"> <text v-if="date10 == ''">________</text><text
									style="width: 150rpx;text-decoration: underline;">{{date10}}</text>
							</view>
						</picker>
						<!-- 						<view class="addanswer" style="margin-top: 0;">
							<view style="width: 49rpx;text-align: center;">
								<image src="../../static/images/addanswer.png" mode="" @click="addanswer()">
								</image>
							</view>
						</view> -->
					</view>
					<view class="answer">
						<view>
							企业:
						</view>
						<input style="width: 350rpx;" type="text" v-model="enterprise" />
					</view>

				</view>

				<view class="btn" :class="date10!=''&& enterprise!=''?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十一题 -->
			<view class="box" v-for="(item,index) in list11" :key="index" v-if="tabindex == 10">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						11, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion11(index,indexs)">
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>

					</view>

				</view>

				<view class="btn" :class="list11data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十二题 -->
			<view class="box" v-for="(item,index) in list12" :key="index" v-if="tabindex == 11">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						12, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion12(index,indexs)">
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>

					</view>

				</view>

				<view class="btn" :class="list12data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十三题 -->
			<view class="box" v-for="(item,index) in list13" :key="index" v-if="tabindex == 12">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						13, {{item.name}}
					</view>
					<view class="answer" style="float: left;
    margin: auto;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view class="" style="display: flex;margin-top: 30rpx;width: 150rpx;height: 50rpx;">
							<view style="width: 49rpx;">
								<view class="option" :class="items.disable?'active':''"
									@click="getchoicequestion13(index,indexs)">
								</view>
							</view>
							<view class="" style="width: 120rpx;">
								{{items.name}}
							</view>
						</view>
					</view>
				</view>

				<view class="btn" :class="list13data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十四题 -->
			<view class="box" v-for="(item,index) in list14" :key="index" v-if="tabindex == 13">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						14, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion14(index,indexs)">
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>

					</view>

				</view>

				<view class="btn" :class="list14data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十五题 -->
			<view class="box" v-for="(item,index) in list15" :key="index" v-if="tabindex == 14">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						15, {{item.name}}
					</view>
					<view class="answer" style="margin-top: 30rpx;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view style="width: 49rpx;">
							<view class="option" :class="items.disable?'active':''"
								@click="getchoicequestion15(index,indexs)">
							</view>
						</view>
						<view class="" style="width: 240rpx;">
							{{items.name}}
						</view>

					</view>

				</view>

				<view class="btn" :class="list15data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					下一题
				</view>
			</view>
			<!-- 第十六题 -->
			<view class="box" v-for="(item,index) in list16" :key="index" v-if="tabindex == 15">
				<view class="titleimg">
					{{item.type}}
				</view>
				<view class="topicstyle">
					<view class="titlename">
						16, {{item.name}}
					</view>
					<view class="answer" style="float: left;
			margin: auto;" v-for="(items,indexs) in item.arr" :key="indexs">
						<view class="" style="display: flex;margin-top: 30rpx;width: 150rpx;height: 50rpx;">
							<view style="width: 49rpx;">
								<view class="option" :class="items.disable?'active':''"
									@click="getchoicequestion16(index,indexs)">
								</view>
							</view>
							<view class="" style="width: 120rpx;">
								{{items.name}}
							</view>
						</view>
					</view>
				</view>

				<view class="btn" :class="list16data.length!=0 ?'btnactive':''" @click="getnextstep(tabindex)">
					提交
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		testquestion
	} from '@/api/liveApp.js';
	export default {
		data() {
			return {
				tabindex: 0,
				answertext: "",
				Inputtype: false,
				action: 'http://qyh.ugekeji.com/api/v3/upload',
				data: [],
				arrdata: [],
				list: {
					type: "单选题",
					name: "在线时长",
					fraction: "5",
					currentIndex: null,
					answertext: "",
					arr: [{
						name: "24小时(随时可以进入工作状态)",
						fraction: 5,
					}, {
						name: "12-18小时",
						fraction: 3,
					}, {
						name: "2-11小时",
						fraction: 2,
					}]
				},
				list2: {
					type: "单选题",
					name: "设备质量（麦克风、电脑、相关制作设备）",
					fraction: "5",
					currentIndex: null,
					answertext: "",
					arr: [{
						name: "有独立录音棚或100000元人民币以上设备（手机不算）",
						fraction: 3,
					}, {
						name: "60000-99999元人民币设备（手机不算）",
						fraction: 2.5,
					}, {
						name: "30000-59999元人民币设备（手机不算）",
						fraction: 2,
					}, {
						name: "10000-29999元人民币设备（手机不算）",
						fraction: 1.5,
					}, {
						name: "9999元人民币以下设备（手机不算）",
						fraction: 1,
					}, {
						name: "没有专业设备（手机）",
						fraction: 0.3,
					}]
				},
				list3: ['2年以上', '2-6年', '6年以上'],
				index3: null,
				list4: [],
				index4: null,
				list5: {
					type: "单选题",
					name: "职称级别",
					fraction: "2.5",
					currentIndex: null,
					arr: [{
						name: "初初",
						fraction: 0.5,
					}, {
						name: "初级",
						fraction: 1,
					}, {
						name: "中级",
						fraction: 1.5,
					}, {
						name: "副高",
						fraction: 2,
					}, {
						name: "正高",
						fraction: 2.5,
					}]
				},
				list6: {
					type: "单选题",
					name: "学历",
					fraction: "2.5",
					currentIndex: null,
					arr: [{
						name: "中专",
						fraction: 0.5,
					}, {
						name: "高中、职高",
						fraction: 1,
					}, {
						name: "大专",
						fraction: 1.5,
					}, {
						name: "本科",
						fraction: 2,
					}, {
						name: "研究生",
						fraction: 2.5,
					}]
				},
				list7: {
					type: "单选题",
					name: "学位",
					fraction: "2",
					currentIndex: null,
					arr: [{
						name: "学士",
						fraction: 0.5,
					}, {
						name: "硕士",
						fraction: 1,
					}, {
						name: "博士",
						fraction: 1.5,
					}, {
						name: "博士后",
						fraction: 2,
					}]
				},
				startDate8: "2000-01-01",
				endDate8: "2031-01-01",
				date8: "",
				images: [],
				// list2: [{
				// 	type: "填空题",
				// 	answertexts: "",
				// }],
				// list3: [{
				// 	type: "多选题",
				// 	name: "类别(可多选并自行增加)",
				// 	currentIndex: null,
				// 	answertext: "",
				// 	arr: [{
				// 		name: "专题片",
				// 		disable: false,
				// 		letter: "A"
				// 	}, {
				// 		name: "宣传片",
				// 		disable: false,
				// 		letter: "B"
				// 	}, {
				// 		name: "AI",
				// 		disable: false,
				// 		letter: "C"
				// 	}]
				// }],
				list9: [{
					type: "选择题",
					name: "相关证书 (多选) ",
					arr: [{
						name: "专业资格证书",
						disable: false,
					}, {
						name: "外语证书",
						disable: false,
					}, {
						name: "乐器证书",
						disable: false,
					}]
				}],
				list9data: [],
				zhuanyeimage: [],
				waiyuimage: [],
				yueqiimage: [],
				date10: "",
				enterprise: "",
				list11: [{
					type: "选择题",
					name: "类别 (可多选)",
					arr: [{
						name: "专题片",
						disable: false,
					}, {
						name: "宣传片",
						disable: false,
					}, {
						name: "AI",
						disable: false,
					}, {
						name: "MG动画",
						disable: false,
					}, {
						name: "广告语",
						disable: false,
					}, {
						name: "情感",
						disable: false,
					}, {
						name: "电台",
						disable: false,
					}, {
						name: "有声小说",
						disable: false,
					}, {
						name: "解说",
						disable: false,
					}, {
						name: "课件",
						disable: false,
					}]
				}],
				list11data: [],
				list12: [{
					type: "选择题",
					name: "特长技能 (可多选)",
					arr: [{
						name: "设计",
						disable: false,
					}, {
						name: "策划",
						disable: false,
					}, {
						name: "剪辑",
						disable: false,
					}, {
						name: "拍摄",
						disable: false,
					}, {
						name: "文案",
						disable: false,
					}, {
						name: "直播",
						disable: false,
					}]
				}],
				list12data: [],
				list13: [{
					type: "选择题",
					name: "方言 (可多选)",
					arr: [{
							name: "粤语",
							disable: false,
							fraction: 1,
						}, {
							name: "上海",
							disable: false,
							fraction: 1,
						}, {
							name: "闽南语",
							disable: false,
							fraction: 1,
						}, {
							name: "浙江",
							disable: false,
							fraction: 0.8,
						}, {
							name: "广西",
							disable: false,
							fraction: 0.8,
						}, {
							name: "贵州",
							disable: false,
							fraction: 0.8,
						}, {
							name: "云南",
							disable: false,
							fraction: 0.8,
						},
						{
							name: "青海",
							disable: false,
							fraction: 0.8,
						},
						{
							name: "四川",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "重庆",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "天津",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "山东",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "湖南",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "湖北",
							disable: false,
							fraction: 0.5,
						},
						{
							name: "河北",
							disable: false,
							fraction: 0.35,
						},
						{
							name: "东北",
							disable: false,
							fraction: 0.35,
						},
						{
							name: "北京",
							disable: false,
							fraction: 0.35,
						},
						{
							name: "内蒙",
							disable: false,
							fraction: 0.35,
						}, {
							name: "河南",
							disable: false,
							fraction: 0.35,
						}, {
							name: "陕西山西(陕北)",
							disable: false,
							fraction: 0.35,
						}
					]
				}],
				list13data: [],
				list14: [{
					type: "选择题",
					name: "外语 (可多选)",
					arr: [{
						name: "英语",
						disable: false,
					}, {
						name: "日语",
						disable: false,
					}, {
						name: "韩语",
						disable: false,
					}, {
						name: "俄语",
						disable: false,
					}, {
						name: "法语",
						disable: false,
					}, {
						name: "德语",
						disable: false,
					}]
				}],
				list14data: [],
				list15: [{
					type: "选择题",
					name: "擅长音色 (可多选)",
					arr: [{
						name: "男童",
						disable: false,
					}, {
						name: "正太",
						disable: false,
					}, {
						name: "少年",
						disable: false,
					}, {
						name: "青年",
						disable: false,
					}, {
						name: "中年",
						disable: false,
					}, {
						name: "老爷爷",
						disable: false,
					}, {
						name: "女童",
						disable: false,
					}, {
						name: "萝莉",
						disable: false,
					}, {
						name: "少女",
						disable: false,
					}, {
						name: "御姐",
						disable: false,
					}, {
						name: "成熟",
						disable: false,
					}, {
						name: "老奶奶",
						disable: false,
					}]
				}],
				list15data: [],
				list16: [{
					type: "选择题",
					name: "模仿能力与声音特长 (可多选)",
					arr: [{
						name: "明星",
						disable: false,
					}, {
						name: "鼾声",
						disable: false,
					}, {
						name: "狗叫声",
						disable: false,
					}, {
						name: "羊叫声",
						disable: false,
					}, {
						name: "狼叫声",
						disable: false,
					}, {
						name: "大象",
						disable: false,
					}, {
						name: "布谷鸟声",
						disable: false,
					}, {
						name: "喜鹊声",
						disable: false,
					}, {
						name: "丰盛",
						disable: false,
					}, {
						name: "雨声",
						disable: false,
					}, {
						name: "雷声",
						disable: false,
					}, {
						name: "水生",
						disable: false,
					}, {
						name: "冰雹声",
						disable: false,
					}, {
						name: "翻书声",
						disable: false,
					}, {
						name: "开门声",
						disable: false,
					}, {
						name: "篝火声",
						disable: false,
					}, {
						name: "鼓声",
						disable: false,
					}, {
						name: "箫声",
						disable: false,
					}, {
						name: "琴声",
						disable: false,
					}, {
						name: "吉他声",
						disable: false,
					}]
				}],
				list16data: [],
			}
		},
		mounted() {
			for (var i = 1; i < 101; i++) {
				this.list4.push(i)
			}
		},
		methods: {
			/**
			 * getchoice
			 * 单选选择的index
			 */
			getchoice(index) {
				console.log(this.list)
				if (this.tabindex == 0) {
					this.list.currentIndex = index
					return
				}
				if (this.tabindex == 1) {
					this.list2.currentIndex = index
					return
				}
				if (this.tabindex == 4) {
					this.list5.currentIndex = index
					return
				}
				if (this.tabindex == 5) {
					this.list6.currentIndex = index
					return
				}
				if (this.tabindex == 6) {
					this.list7.currentIndex = index
					return
				}
			},
			/**
			 * getMultiplechoice
			 * 多选
			 */
			getMultiplechoice(index, indexs) {
				if (this.list3[index].arr[indexs].disable) {
					this.list3[index].arr[indexs].disable = false
				} else {
					this.list3[index].arr[indexs].disable = true
				}
			},
			/**
			 * bindPickerChange
			 * 第三题选择年
			 */
			bindPickerChange3(e) {
				console.log('第三题选择年，携带值为', e.target.value)
				this.index3 = e.target.value
			},
			/**
			 * bindPickerChange
			 * 第四题选择月
			 */
			bindPickerChange4(e) {
				console.log('第四题选择月，携带值为', e.target.value)
				this.index4 = e.target.value
			},
			/**
			 * bindDateChange8
			 * 第八题选择年
			 */
			bindDateChange8(e) {
				console.log(e)
				this.date8 = e.target.value
			},
			/**
			 * bindDateChange10
			 */
			bindDateChange10(e) {
				console.log(e)
				this.date10 = e.target.value
			},
			/**
			 * getchoicequestion
			 * 第九题选择题多选
			 */
			getchoicequestion9(index, indexs) {
				if (this.list9[index].arr[indexs].disable) {
					this.list9[index].arr[indexs].disable = false
					let num = this.list9data.findIndex(item => item == this.list9[index].arr[indexs].name);
					this.list9data.splice(num, 1)
					console.log(this.list9data)
				} else {
					this.list9[index].arr[indexs].disable = true
					this.list9data.push(this.list9[index].arr[indexs].name)
					console.log(this.list9data)

				}
			},
			/**
			 * getchoicequestion11
			 * 第十一题选择题多选
			 */
			getchoicequestion11(index, indexs) {
				if (this.list11[index].arr[indexs].disable) {
					this.list11[index].arr[indexs].disable = false
					let num = this.list11data.findIndex(item => item == this.list11[index].arr[indexs].name);
					this.list11data.splice(num, 1)
					console.log(this.list11data)
				} else {
					this.list11[index].arr[indexs].disable = true
					this.list11data.push(this.list11[index].arr[indexs].name)
					console.log(this.list11data)

				}
			},
			/**
			 * getchoicequestion12
			 * 第十二题选择题多选
			 */
			getchoicequestion12(index, indexs) {
				if (this.list12[index].arr[indexs].disable) {
					this.list12[index].arr[indexs].disable = false
					let num = this.list12data.findIndex(item => item == this.list12[index].arr[indexs].name);
					this.list12data.splice(num, 1)
					console.log(this.list12data)
				} else {
					this.list12[index].arr[indexs].disable = true
					this.list12data.push(this.list12[index].arr[indexs].name)
					console.log(this.list12data)

				}
			},
			/**
			 * getchoicequestion13
			 * 第十三题选择题多选
			 */
			getchoicequestion13(index, indexs) {
				if (this.list13[index].arr[indexs].disable) {
					this.list13[index].arr[indexs].disable = false
					let num = this.list13data.findIndex(item => item.name == this.list13[index].arr[indexs].name);
					this.list13data.splice(num, 1)
					console.log(this.list13data)
				} else {
					let data = {
						name: this.list13[index].arr[indexs].name,
						fraction: this.list13[index].arr[indexs].fraction,
					}
					this.list13[index].arr[indexs].disable = true
					this.list13data.push(data)
					console.log(this.list13data)

				}
			},
			/**
			 * getchoicequestion14
			 * 第十四题选择题多选
			 */
			getchoicequestion14(index, indexs) {
				if (this.list14[index].arr[indexs].disable) {
					this.list14[index].arr[indexs].disable = false
					let num = this.list14data.findIndex(item => item == this.list14[index].arr[indexs].name);
					this.list14data.splice(num, 1)
					console.log(this.list14data)
				} else {
					this.list14[index].arr[indexs].disable = true
					this.list14data.push(this.list14[index].arr[indexs].name)
					console.log(this.list14data)

				}
			},
			/**
			 * getchoicequestion15
			 * 第十五题选择题多选
			 */
			getchoicequestion15(index, indexs) {
				if (this.list15[index].arr[indexs].disable) {
					this.list15[index].arr[indexs].disable = false
					let num = this.list15data.findIndex(item => item == this.list15[index].arr[indexs].name);
					this.list15data.splice(num, 1)
					console.log(this.list15data)
				} else {
					this.list15[index].arr[indexs].disable = true
					this.list15data.push(this.list15[index].arr[indexs].name)
					console.log(this.list15data)

				}
			},
			/**
			 * getchoicequestion16
			 * 第十六题选择题多选
			 */
			getchoicequestion16(index, indexs) {
				if (this.list16[index].arr[indexs].disable) {
					this.list16[index].arr[indexs].disable = false
					let num = this.list16data.findIndex(item => item == this.list16[index].arr[indexs].name);
					this.list16data.splice(num, 1)
					console.log(this.list16data)
				} else {
					this.list16[index].arr[indexs].disable = true
					this.list16data.push(this.list16[index].arr[indexs].name)
					console.log(this.list16data)

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
			 * uploadimage
			 * 第八题上传图片
			 */
			uploadimage() {
				var that = this;
				// 图片
				let files = [];
				files = that.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})

				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						that.images += files[i].response + ',';
					}
					that.images = that.images.substr(0, that.images.length - 1);
				}
			},
			/**
			 * getzigeupload
			 * 第九题上传专业资格证书
			 */
			getzigeupload() {
				var that = this;
				// 图片
				let files = [];
				files = that.$refs.uploadzhuanye.lists.filter(val => {
					return val.progress == 100;
				})
				// console.log("++++++++++",files)
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						that.zhuanyeimage += files[i].response + ',';
					}
					that.zhuanyeimage = that.zhuanyeimage.substr(0, that.zhuanyeimage.length - 1);
				}
				console.log("专业资格证书", that.zhuanyeimage)
			},
			/**
			 * zigeupload
			 * 第九题上传外语资格证书
			 */
			getwaiyuupload() {
				var that = this;
				// 图片
				let files = [];
				files = that.$refs.uploadwaiyu.lists.filter(val => {
					return val.progress == 100;
				})
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						that.waiyuimage += files[i].response + ',';
					}
					that.waiyuimage = that.waiyuimage.substr(0, that.waiyuimage.length - 1);
				}
				console.log("外语资格证书", that.waiyuimage)
			},
			/**
			 * zigeupload
			 * 第九题乐器资格证书
			 */
			getyueqiupload() {
				var that = this;
				// 图片
				let files = [];

				files = that.$refs.uploadyueqi.lists.filter(val => {
					return val.progress == 100;
				})
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						that.yueqiimage += files[i].response + ',';
					}
					that.yueqiimage = that.yueqiimage.substr(0, that.yueqiimage.length - 1);
				}
				console.log("乐器资格证书", that.yueqiimage)
			},
			/**
			 * getnextstep
			 * 下一题
			 */
			getnextstep(tabindex) {
				console.log(tabindex)
				if (this.tabindex == 0) {
					if (this.list.currentIndex != null) {
						this.tabindex = tabindex + 1
						this.arrdata.push(this.list.arr[this.list.currentIndex])
						console.log("全部答题", this.arrdata)
					}
				}
				if (this.tabindex == 1) {
					if (this.list2.currentIndex != null) {
						this.tabindex = tabindex + 1
						this.arrdata.push(this.list2.arr[this.list2.currentIndex])
						console.log("全部答题", this.arrdata)
					}
				}
				if (this.tabindex == 2) {
					if (this.index3 != null) {
						let data = {
							name: this.list3[this.index3],
							fraction: (this.index3 + 1) * 1
						}
						this.arrdata.push(data)
						this.tabindex = tabindex + 1
						console.log("全部答题", this.arrdata)
					}
				}
				if (this.tabindex == 3) {
					if (this.index4 != null) {
						let data = {
							name: this.list4[this.index4],
							fraction: (this.index4 + 1) * 0.03
						}
						this.arrdata.push(data)
						this.tabindex = tabindex + 1
						console.log("全部答题", this.arrdata)
					}
				}
				if (this.tabindex == 4) {
					if (this.list5.currentIndex != null) {
						this.arrdata.push(this.list5.arr[this.list5.currentIndex])
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 5) {
					if (this.list6.currentIndex != null) {
						this.arrdata.push(this.list6.arr[this.list6.currentIndex])
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 6) {
					if (this.list7.currentIndex != null) {
						this.arrdata.push(this.list7.arr[this.list7.currentIndex])
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 7) {
					if (this.date8 != '') {
						let data = {
							name: this.date8,
							fraction: 0.5
						}
						this.arrdata.push(data)
						this.uploadimage()
						console.log(this.images)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 8) {

					// this.getzigeupload()
					// this.getwaiyuupload()
					// this.getyueqiupload()
					// // console.log("专业资格证书",that.zhuanyeimage)
					if (this.list9data.length != 0) {
						let data = {
							name: this.list9data,
							fraction: this.list9data.length * 0.5
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 9) {
					console.log(this.date10, this.enterprise)
					if (this.date10 != '' && this.enterprise != '') {
						let data = {
							name: this.date10,
							boss: this.enterprise,
							fraction: 0.2
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 10) {
					if (this.list11data.length != 0) {
						let data = {
							name: this.list11data,
							fraction: this.list11data.length * 0.5
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 11) {
					if (this.list12data.length != 0) {
						let data = {
							name: this.list12data,
							fraction: this.list12data.length * 1
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1

					}
				}
				if (this.tabindex == 12) {
					if (this.list13data.length != 0) {
						var num = this.list13data.reduce((p, e) => p + e.fraction, 0);
						console.log("+++++++++++", num)
						let data = {
							name: this.list13data,
							fraction: num
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 13) {
					if (this.list14data.length != 0) {
						if(this.list14data.length >=4){
							var num = 16
						}else{
							var num = this.list14data.length * 5
						}
						let data = {
							name: this.list14data,
							fraction: num
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 14) {
					if (this.list15data.length != 0) {
						let data = {
							name: this.list15data,
							fraction: this.list15data.length * 1
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						this.tabindex = tabindex + 1
					}
				}
				if (this.tabindex == 15) {
					if (this.list16data.length != 0) {
						if(this.list14data.length >=4){
							var num = 10
						}else{
							var num = this.list16data.length * 3
						}
						let data = {
							name: this.list16data,
							fraction: num
						}
						this.arrdata.push(data)
						console.log("全部答题", this.arrdata)
						var allnum = this.arrdata.reduce((p, e) => p + e.fraction, 0);
						console.log(allnum)
						uni.showToast({
							icon: "none",
							title: '获得'+allnum+'分'
						})
						// uni.navigateBack({
						// 	delta:1
						// })
					}
				}

				console.log("77777777", this.tabindex)
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
		overflow: auto;
		color: #000000;
		background: rgba($color: #FFFCFC, $alpha: 0.54);
		border: 3rpx solid #FFFCFC;
		padding-bottom: 200rpx;
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
					display: flex;
					justify-content: center;
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

			.uni-input {
				width: 320rpx;
				float: left;

				.t {
					max-width: 150rpx;
					text-align: center;
					text-decoration: underline;
				}

			}
		}


	}
</style>
