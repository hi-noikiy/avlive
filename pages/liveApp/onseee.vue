<<template>
	<view class="wrap" >
		
		<view class="content">
			<ul class="detailed">
				<li>项目名称: 录制一篇有声小说,需要多个角色</li>
				<li>项目类型: 音频</li>
				<li>预算: 10000元</li>
				<li>期望周期: 40天</li>
				<li>音色要求: 男生 中年人 老人</li>
			</ul>
			<span>需要详情</span>
			<view class="content1">
				<p>1.小说名为茶馆</p>
				<p>2.大概有10000多字</p>
				<p>3.至少有5名配音人员</p>
			</view>
			<view class="content2">
				<view class="content2-left">
					<span style="display: inline-block;margin-bottom: 6rpx;">文档.docx</span>
					<view class="process">
						
					</view>
					<view class="processbar">
						
					</view>
				</view>
				<view class="content2-right">
					<view class="probox">
						下载
					</view>
				</view>
			</view>
			<view class="content3">
				<view class="content3-top">
					<p>指派人:<span>安妮爱主持</span></p>
				</view>
				<view class="content3-bottom">
					<span>等待对方确认订单:</span>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {
		getAddressList
	} from '@/api/user.js';
	export default {
		props: {
		},
		data() {
			return {
				
				
			};
		}, 
		
		methods: {
			cencel(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	.wrap{
		width: 800rpx;
	}
	.title{
		text-align: center;
		border-bottom: 1px solid #ccc;
		font-size: 16px;
		height: 60rpx;
		line-height: 60rpx;
	}
	.title>span{
		position: absolute;
		left: 10rpx;
		font-size: 18px;
	}
	.content{
		width: 700rpx;
		height: 100%;
		margin-left: 20rpx;
	}
	.content .detailed{
		width: 700rpx;
		height: 250rpx;
		margin-top: 20rpx;
	}
	.content .detailed>li{
		font-size: 15rpx;
		margin-bottom: 15rpx;
	}
	.content>span{
		font-size: 15rpx;
		margin-bottom: 10rpx;
		display: inline-block;
	}
	.content .content1{
		width: 700rpx;
		height: 160rpx;
		padding-top: 15rpx;
		padding-left: 10rpx;
		border: 1px solid #ccc;
	}
	.content .content1>p{
		font-size: 15rpx;
		margin-bottom: 15rpx;
	}
	.content2{
		width: 700rpx;
		height: 200rpx;
		border-bottom: 1rpx solid #ccc;
		
	}
	.content2-left{
		width: 450rpx;
		height: 200rpx;
		position: relative;
		padding-top:70rpx ;
		padding-left: 10rpx;
		font-size: 15rpx;
		float: left;
	}
	.process{
		width: 350rpx;
		height: 5rpx;
		background-color: blue;
		position: absolute;
		top: 109rpx;
		
	}
	.processbar {
		width: 430rpx;
		height: 5rpx;
		background-color: #ccc;
	}
	.content2-right{
		width: 200rpx;
		height: 200rpx;
		padding-top: 80rpx;
		text-align: center;
		float: right;
	}
	.probox{
		border-radius: 10rpx;
		width: 140rpx;
		height: 50rpx;
		margin: auto;
		border: 1px solid #ccc;
		line-height: 50rpx;
	}
	.content3{
		width: 650rpx;
		height: 250rpx;
		margin-left: 25rpx;
	}
	.content3 .content3-top{
		width: 100%;
		height: 150rpx;
	}
	.content3 .content3-top>p{
		font-size: 15rpx;
		line-height: 150rpx;
	}
	.content3 .content3-top>p>span{
		display: inline-block;
		margin-left: 100rpx;
	}
	.content3 .content3-bottom{
		line-height: 100rpx;
		font-size: 15rpx;
		color: #ccc;
	}
</style>
