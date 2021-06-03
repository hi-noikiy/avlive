<template>
<view class="room_bar">
	<chatSuitEmoji ref="chatSuitEmoji" @newEmojiStr="emojiAction"></chatSuitEmoji>
	<chatSuitMain ref="chatSuitMain" :username="username" :chatType="chatType" @inputFocused="cancelEmoji"></chatSuitMain>
	<chatSuitImage ref="chatSuitImage" :username="username" :chatType="chatType"></chatSuitImage>
	<!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
	<!-- <chat-suit-video ref="chatSuitVideo" :username="username"></chat-suit-video> -->
	<chatSuitPtopcall ref="chatSuitPtopcall" :chatType="chatType"
		@makeVideoCall="onMakeVideoCall" @makeAudioCall="onMakeeAudioCall"
		>
	</chatSuitPtopcall> 
	<view :class="'other_func ' + (isIPX? 'other_func_X': '')">
		<view class="open_emoji" @tap="openEmoji">
			<image src="/static/images/live/Emoji.png" style="height:18px; width: 19px"/>
		</view>
		<view class="v-record" @tap="toggleRecordModal">
			<image class="icon-record"  src="../../../static/images/live/voice.png"  	style="height:20px; width: 20px">
			</image>
		</view>
		<view class="open_camera" @tap="openCamera">
			<image src="/static/images/live/camora.png" style="height:20px; width: 20px"></image>
		</view>
		<view class="send_image" @tap="sendImage">
			<image src="/static/images/live/pic.png" style="height:20px; width: 20px"></image>
		</view>
	<!-- 	<view class="send_image" @tap="send">
			<image src="/static/images/live/pic.png" style="height:20px; width: 20px"></image>
		</view> -->
		<!-- <view class="send_image" @tap="sendVideo">
			<image src="/static/images/live/video.png" style="height:20px; width: 20px"></image>
		</view>
		<view class="send_image" bind:tap="sendLocation">
			<image src="../../../static/images/live/iconLocation2x.png" style="height:18px;"/>
		</view> -->
		<!--  v-if="username.groupId" --> 
		<view class="v-record" @tap="callVideo">
			<image src="/static/images/live/call2x.png" style="height:24px; width: 15px"/>
		</view>
	</view>
</view>
</template>

<script>
let RecordStatus = require("./suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");
import chatSuitEmoji from "./suit/emoji/emoji";
import chatSuitImage from "./suit/image/image";
import chatSuitLocation from "./suit/location/location";
import chatSuitMain from "./suit/main/main";
import chatSuitPtopcall from "./suit/ptopcall/ptopcall.vue";

  import chatSuitVideo from "./suit/videoComp/videoComp"


export default {
  data() {
    return {
      recordStatus: RecordStatus.HIDE,
      RecordStatus,
      __comps__: {
        main: null,
        emoji: null,
        image: null,
        location: null,
        video: null,
      },
      isIPX: ""
    };
  },

  components: {
    chatSuitEmoji,
    chatSuitImage,
    chatSuitLocation,
    chatSuitMain,
	chatSuitPtopcall,
     chatSuitVideo
  },
  props: {
    username: {
      type: Object,
      default: () => ({})
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT
    }
  },

  // lifetimes
  created() {},

  beforeMount() {},

  moved() {},

  destroyed() {},

  onLoad() {
    this.setData({
      isIPX: false,  //getApp().globalData.isIPX
    });
    // let comps = this.$data.__comps__;
    // comps.main = this.selectComponent("#chatSuitMain");
    // comps.emoji = this.selectComponent("#chatSuitEmoji");
    // comps.image = this.selectComponent("#chatSuitImage"); 
  },

  methods: {
    // 事件有长度限制：仅限 26 字符
    toggleRecordModal() {
      this.$emit("tapSendAudio", null, {
        bubbles: true,
        composed: true
      });
    },

    sendVideo(){
    	this.$refs.chatSuitVideo.sendVideo();
    },
    openCamera() {
      // this.__comps__.image.openCamera()
       this.$refs.chatSuitImage.openCamera();
    },

    openEmoji() {
       this.$refs.chatSuitEmoji.openEmoji();
    },

    cancelEmoji() {
      this.$refs.chatSuitEmoji.cancelEmoji();
    },

    sendImage() {
      // this.__comps__.image.sendImage();
      this.$refs.chatSuitImage.sendImage();
    },

    sendLocation() {// this.data.__comps__.location.sendLocation();
    },

    emojiAction(evt) {
       this.$refs.chatSuitMain.emojiAction(evt.msg);
    },
	
	callVideo(){
		//console.log('this.data.__comps__.ptopcall', this.data.__comps__.ptopcall)
		this.$refs.chatSuitPtopcall.show()
	},
	
	onMakeeAudioCall(){
		console.log('onMakeeAudioCall -> inputbar')
		this.$emit('makeeAudioCall', null, 'single')
	},
	onMakeVideoCall(){
		console.log('onMakeVideoCall -> inputbar')
		this.$emit('makeVideoCall', null, 'single')
	},

  }
};
</script>
<style>
@import "./inputbar.css";
</style>