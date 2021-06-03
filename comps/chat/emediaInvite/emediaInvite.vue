<template>
	<view class="wraper">
		<view class="search" v-if="search_btn">
			<view bindtap="openSearch">
				<icon type="search" size="13"></icon>
				<text>搜索</text>
			</view>
		</view>
	
		<view class="search_input" v-if="search_friend">
			<view>
				<icon type="search" size="13"></icon>
				<input placeholder="搜索" 
					placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" 
					auto-focus
					confirm-type="search"
					type='text'
					bindconfirm="onSearch"
					bindinput="onInput"
					:value="input_code"
					></input>
					<icon type="clear" size="13" catchtap='clearInput' v-if="show_clear"></icon>
			</view>
			<text bindtap="cancel">取消</text>
		</view>
		
		<scroll-view
			class="content" 
			enable-back-to-top
			scroll-y="true"
			scroll-with-animation="true" 
			:style="{height: second_height + 'px'}"
		> 
	
		<checkbox-group v-for="item in renderList" :data-item="item" :key="item.member||item.owner"  :id="item.id" :data-id='item.id' @change="checkboxChange"> 
	
			<view class="tap_mask" @tap="into_room" :data-username="item.member||item.owner">
	          	<view class="address_bottom" :data-username="item.member||item.owner" @tap="into_room">
					<image :src="item.avatar" @tap="into_room" :data-username="item.member||item.owner"></image>
		          	<text @tap="into_room" :data-username="item.member||item.owner">{{item.nickname}}</text>
		          	<checkbox :value="item.member||item.owner" :checked="item.checked" :disabled="item.disabled"/>
	      		</view>
	  		</view>
	
		</checkbox-group>
		</scroll-view>
	
		<view class="btnWraper">
			<button class="button" @tap="startConfr">{{buttonText}}</button>
			<button class="button red" @tap="goBack">返回</button>
		</view>
	
	</view>
</template>

<script>
import {getSysUserInfo,CHAT_PREFIX} from '@/utils/appIM.js'
	export default {
		data() {
			return {
				search_btn: true,
				search_friend: false,
				groupMember: [],
				serchList: [],
		
				checkedValue: [],
				renderList: [],
				buttonText: '发起会议',
				second_height: 450,
				show_clear: false,
			}
		},
		props: {
		  username: {
		    type: Object,
		    default: () => ({})
		  },
		  action: {
		    type: String,
		    default: ''
		  }
		},
		mounted() {
			console.log('邀请页面的参数', this)
			console.log(this.properties) 
			// 获取系统信息
			uni.getSystemInfo({
				success:  (res)=> {
					console.log('height=' + res.windowHeight);
					console.log('width=' + res.windowWidth);
					// 计算主体部分高度,单位为px
					 // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
					this.second_height=res.windowHeight - res.windowWidth / 750 * 300
				}
			})

			if(this.action == 'invite'){ 
				this.buttonText='邀请'
			}

			var roomId = this.username&&this.username.groupId
			console.log('roomId', this.username)
			if(this.username.your.startsWith('live_app_')){ 
				this.groupMember=[{"member":this.username.your}, {"owner":this.username.myName}] 
					 
				this.getRenderList(this.groupMember);
				return;
			}
			roomId&&this.getGroupMember(roomId)
		},
		methods: {
			getGroupMember (roomId){ 
				// 获取群成员
				var pageNum = 1,
					pageSize = 1000;
				var options = {
					pageNum: pageNum,
					pageSize: pageSize,
					groupId: roomId,
					success: (resp)=>{
						console.log('获取群成员', resp)
						if(resp && resp.data){
							this.groupMember=resp.data;
							this.getRenderList(resp.data);
						}
					},
					error: function(err){
						console.log('获取群成员失败', err)
					}
				};
				uni.WebIM.conn.listGroupMember(options);
			},
	
			getRenderList(list){
				console.log('this.list', list)
				console.log('this.checkedValue', this.checkedValue)
				
				var uids=[]
				var serchList = list.map((item) => {
					for (var i = 0; i < this.checkedValue.length; i++) { 
						if((item.member&&item.member.indexOf(this.checkedValue[i]) != -1) || (item.owner&&item.owner.indexOf(this.checkedValue[i]) != -1)){
							item.checked = true
							return item
							break;
						}else{ 
							item.checked = false
						}
					}
					console.log("item ",item);
					var account=item.member||item.owner||item
					uids.push(account.split(CHAT_PREFIX)[1])
					return item
				})
				
				
				
				if(uids.length>0){
					getSysUserInfo(uids).then(res=>{ 
							var users=res;
							var arr=serchList;
						try{
							users.forEach(user=>{
								serchList.forEach((item,index)=>{
									var item_account=item.member||item.owner||item
									if(user.uid==item_account.split(CHAT_PREFIX)[1] ){
										arr[index].avatar=user.avatar
										arr[index].nickname=user.nickname
										arr[index].phone=user.phone
										arr[index].real_name=user.real_name 
									}
								})
							})
							
							console.log("list",arr);
							console.log("conn",wx.WebIM.conn);
							console.log("userId===>",wx.WebIM.conn.context.userId);
							serchList=arr;
							serchList.forEach((item) => {
								if(item.member == wx.WebIM.conn.context.userId || item.owner == wx.WebIM.conn.context.userId){
									item.disabled = true
								}
								
							})
							this.renderList=serchList
							 
							console.log('serchList >>>>', serchList)
						}catch(e){
							//TODO handle the exception 
						}
					});
				}	 
				
				
	
				
	
			},
	
	
			checkboxChange: function (e) {
				console.log('checkbox发生change事件，携带value值为：', e)
				if(this.checkedValue.indexOf(e.detail.value) == -1 && e.detail.value[0]){
					this.checkedValue.push(e.detail.value[0])
					console.log(this.checkedValue)
				}else{
					let value = e.target.dataset.item.name
					this.checkedValue.splice(this.checkedValue.indexOf(value), 1)
					console.log(this.checkedValue)
				}
			},
	
			openSearch: function(){
				
				this.search_btn=false
				this.search_friend=true
				this.show_mask=true
				this.gotop=true 
			},
	
			cancel: function(){
				this.search_btn=true
				this.search_friend=false
				this.gotop=false 
				// this.show_mask=false
				 
				//this.getBrands(this.member)
			},
	
			
	
			onInput(e){
	
				let inputValue = e.detail.value
				if (inputValue) {
					this.show_clear=true  
				} else {
					this.show_clear=false  
				}
			},
	
			clearInput: function(){
				this.input_code=''  
				this.show_clear=false  
				 
			},
	
			cancel: function(){
				this.search_btn=true
				this.search_friend=false  
				 
				let original = this.groupMember||[]
				this.getRenderList(original)
			},
	
			onSearch: function(val){
				let searchValue = val.detail.value
				let member = this.groupMember;
				let serchList = [];
				member.forEach((item, index)=>{
					if(String(item.member).indexOf(searchValue) != -1 || String(item.owner).indexOf(searchValue) != -1){
						serchList.push(item)
					}
				})
				// this.setData({
				// 	groupMember: serchList
				// })
	
				this.getRenderList(serchList)
			},
	
			startConfr(){
				this.$emit('onStartConfr', {confrMember: this.checkedValue, action: this.action, groupId: this.username.groupId})
				this.checkedValue=[]
				 
			},
	
			goBack(){
				this.checkedValue=[] 
				this.$emit('goBack')
			},
			
			into_room(){
				
			}
		}
	}
</script>
<style>
@import "./emediaInvite.css";
</style>

