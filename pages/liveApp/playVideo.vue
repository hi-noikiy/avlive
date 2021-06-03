<template>
	<view class="page">
		<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex" @change="handleSlider" style="height: 100vh;">
		    <block v-for="(item,index) in vlist" :key="index">
		        <swiper-item>
		            <view class="containerBox u-flex pr flex-aj-center" @click="handleClicked(index)">
		                <video :id="'myVideo' + index" :ref="'myVideo' + index" class="player-video pa" :src="item.src"  @error="videoErrorCallback"
		                :controls="false" :loop="true" :show-center-play-btn="false" objectFit="fill">
		                </video>
		                <!-- 中间播放按钮 -->
		                <view class="u-flex playBtn"> 
							<!-- <text v-if="!isPlay" class="iconfont icon-bofang">播放</text> --> 
							<u-icon name="play-right-fill" color="#E91E63" v-if="!isPlay" size="80" ></u-icon>
						</view>
		                <!-- 底部信息 -->
						<view class="vd-footToolbar pa u-flex-col u-col-top"> 
							<view class=""></view> 
						</view>
		                <!-- 侧边栏 -->
						<view class="vd-sidebar pa u-flex-col u-col-center" @tap.stop.prevent="sideHandle(-1)"> 
							<view  @tap.stop.prevent="sideHandle(0)">
								<u-avatar src="https://img1.baidu.com/it/u=2796144188,439704386&fm=26&fmt=auto&gp=0.jpg" size=80></u-avatar>
							</view> 
							<view class="mtb-20">昵称</view> 
							<view @tap.stop.prevent="sideHandle(1)">
								<u-icon name="heart-fill" color="#ffffff" size="80"></u-icon> 
							</view> 
							<view class="mtb-20">点赞</view> 
							<view @tap.stop.prevent="sideHandle(2)">
								<u-icon name="rmb-circle-fill" color="#ffffff" size="80" ></u-icon>
							</view> 
							<view class="mtb-20">打赏</view> 
							<view @tap.stop.prevent="sideHandle(3)">
								<u-icon name="chat-fill" color="#ffffff" size="80" ></u-icon>
							</view> 
							<view class="mtb-20">评论</view> 
							<view @tap.stop.prevent="sideHandle(4)">
								<u-icon name="zhuanfa" color="#ffffff" size="80" ></u-icon>
							</view> 
							<view class="mtb-20">转发</view>  
						</view> 
		            </view>
		        </swiper-item>
		    </block>
		</swiper>
	</view>
</template>

<script>
    let timer = null
    export default {
        data() {
            return {
                videoIndex: 0,
                vlist: [{
					subtitle:'fsdfs',
					avator:'https://cdn1.mh-pic.com/upload/vod/2021-04-20/202104201618887290.jpg',
					author:'张三',
					src:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
				},{
					subtitle:'fsdfs',
					avator:'https://cdn1.mh-pic.com/upload/vod/2021-04-20/202104201618887290.jpg',
					author:'张三',
					src:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
				}],

                isPlay: false,    //当前视频是否播放中
                clickNum: 0,    //记录点击次数
            }
        },
        components: {
              
        },
        onLoad(option) {
            this.videoIndex = parseInt(option.index)||0
        },
        onReady() {
            this.init()
        },
		onUnload() {
            this.videoContextList = []
		},
        methods: {
            init() {
                this.videoContextList = []
                for(var i = 0; i < this.vlist.length; i++) {
                    // this.videoContextList.push(this.$refs['myVideo' + i][0])
                    this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
                }

                setTimeout(() => {
                    this.play(this.videoIndex)
                }, 200)
            },
			 videoErrorCallback: function (e) {
				console.log("===========onerr"); 
				console.log(e); 
				this.pause(this.videoIndex)
			},
			sideHandle(index){
				switch (index){
					case 0:
						//个人中心
						uni.navigateTo({
							url:'/pages/liveApp/user/findUser'
						})
						break;
					case 1:
						//点赞
						break;
					case 2:
						//打赏
						break;
					case 3:
						//评论
						break;
					case 4:
						//转发
						break;
					default:
						break;
				}
				console.log("sideHandle"+index);
			},

            // 滑动切换
            handleSlider(e) {
                let curIndex = e.detail.current
                if(this.videoIndex >= 0){
                    this.videoContextList[this.videoIndex].pause()
                    this.videoContextList[this.videoIndex].seek(0)
                    this.isPlay = false
                }
                if(curIndex === this.videoIndex + 1) {
                    this.videoContextList[this.videoIndex + 1].play()
                    this.isPlay = true
                }else if(curIndex === this.videoIndex - 1) {
                    this.videoContextList[this.videoIndex - 1].play()
                    this.isPlay = true
                }
                this.videoIndex = curIndex
            },
            // 播放
            play(index) {
               this.videoContextList[index].play()
               this.isPlay = true
				console.log("play");
            },
            // 暂停
            pause(index) {
                this.videoContextList[index].pause()
                this.isPlay = false
				console.log("pause");
            },
            // 点击视频事件
            handleClicked(index) {
                if(timer){
                    clearTimeout(timer)
                }
                this.clickNum++
                timer = setTimeout(() => {
                    if(this.clickNum >= 2){
                        console.log('双击视频')
                    }else{
                        console.log('单击视频')
                        if(this.isPlay){
                            this.pause(index)
                        }else{
                            this.play(index)
                        }
                    }
                    this.clickNum = 0
                }, 300)
            },

            // 喜欢
            handleIsLike(index){
                let vlist = this.vlist
                vlist[index].islike =! vlist[index].islike
                this.vlist = vlist
            },
            // 显示评论
            handleVideoComment() {
                this.$refs.videoComment.show()
            }, 
        }
    }
</script>

<style scoped lang="scss">
	.containerBox{
		width: 100vw;
		height: 100vh;
		.player-video{
			width: 100vw;
			height: 100vh;
		}
		.playBtn{
			z-index: 999;
		}
		.vd-footToolbar{
			bottom: 10rpx;
			padding-left: 20rpx;
			width: 100vw;
		}
		.vd-sidebar{
			right: 10rpx;
			width: 100rpx; 
		}
	}
</style>
