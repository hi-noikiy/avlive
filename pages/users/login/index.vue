<template>
	<view class="">
		<image src="/static/images/loginbg.png" class="bg"></image>
		<view class="content">
			<image src="/static/images/logo2.png" class="logo"></image>
			<view class="phone">
				<text class="l">+86</text>
				<u-line color="#FFFFFF" border-style="dashed" length="50rpx" style="transform: rotate(90deg);" />
				<input type="text" v-model="account" placeholder="输入手机号码" />
			</view>
			<view class="code" v-if="current==0">
				<input type="text" v-model="captcha" placeholder="输入验证码" />
				<view class="send-sms"  @click="code">获取验证码</view>
			</view>
			<view class="password" v-if="current==1">
				<input type="password" v-model="password" placeholder="输入登录密码" />
			</view>
			<view class="login" @click="loginMobile" v-if="current === 0">立即登录</view>
			<view class="login" @click="submit" v-if="current !== 0">立即登录</view>
			<view class="xy">
				<u-checkbox-group>
					<u-checkbox
						v-model="xy"
						shape="square"
						active-color="#000000"
						name="《平台使用协议》"
					>《平台使用协议》</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="qt">其他登录方式</view>
			<view class="qts">
				<image src="/static/images/login-wx.png" style="margin-right: 45rpx;" @click="wxLogin"></image>
				<image src="/static/images/login-phone.png" @click="typeChange"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import {updateHXAccount} from '@/api/webIM.js'
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	
	import {loginIM,registerIM} from '@/utils/appIM.js'
	import {
		loginH5,
		loginMobile,
		registerVerify,
		register,
		getCodeApi,
		getUserInfo,
		appleLogin
	} from "@/api/user";
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";
	import {
		validatorDefaultCatch
	} from "@/utils/dialog";
	import {
		getLogo
	} from "@/api/public";
	// import cookie from "@/utils/store/cookie";
	import {
		VUE_APP_API_URL
	} from "@/utils";
	// #ifdef APP-PLUS
	import {
		wechatAppAuth
	} from '@/api/api.js'
	// #endif
	const BACK_URL = "login_back_url";

	export default {
		name: "Login",
		mixins: [sendVerifyCode],
		data: function() {
			return {
				xy: false,
				navList: ["快速登录", "账号登录"],
				current: 1,
				account: "",
				password: "",
				captcha: "",
				formItem: 1,
				type: "login",
				logoUrl: "",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
				isShowCode: false,
				appLoginStatus: false, // 微信登录强制绑定手机号码状态
				appUserInfo: null, // 微信登录保存的用户信息
				appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
				appleUserInfo: null,
				appleShow: false // 苹果登录版本必须要求ios13以上的
			};
		},
		watch: {
			formItem: function(nval, oVal) {
				if (nval == 1) {
					this.type = 'login'
				} else {
					this.type = 'register'
				}
			}
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'ios' && parseFloat(res.system) >= 13) {
						self.appleShow = true
					}
				}
			});
		},
		mounted: function() {
			// this.getCode();
			this.getLogoImage();
		},
		methods: {
			typeChange() {
				if(this.current == 0) {
					this.current = 1;
				} else {
					this.current = 0;
				}
			},
			// 苹果登录
			appleLogin() {
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'apple',
					timeout: 10000,
					success(loginRes) {
						console.log(loginRes, 'loginRes')
						uni.getUserInfo({
							provider: 'apple',
							success: function(infoRes) {
								console.log(infoRes.userInfo, 'yyyy')
								self.appleUserInfo = infoRes.userInfo
								self.appleLoginApi()

								console.log(self.$store);
								console.log(infoRes.userInfo);
							},
							fail() {
								uni.showToast({
									title: '获取用户信息失败',
									icon: 'none',
									duration: 2000
								})
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail(error) {
						console.log(error)
					}
				})
			},
			// 苹果登录Api
			appleLoginApi() {
				let self = this
				appleLogin({
					openId: self.appleUserInfo.openId,
					email: self.appleUserInfo.email || '',
					phone: this.account,
					captcha: this.captcha
				}).then(({
					data
				}) => {
					if (data.isbind) {
						uni.showModal({
							title: '提示',
							content: '请绑定手机号后，继续操作',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									self.current = 1
									self.appleLoginStatus = true
								}
							}
						});
					} else {
						loginIM(data.userInfo.uid)
						// self.$store.commit("LOGIN", {
						// 	'token': data.token,
						// 	'time': data.expires_time - self.$Cache.time()
						// });
						// let backUrl = self.$Cache.get(BACK_URL) || "/pages/index/index";
						// self.$Cache.clear(BACK_URL);
						// self.$store.commit("SETUID", data.userInfo.uid);
						
						// uni.reLaunch({
						// 	url: backUrl
						// });
					}
				}).catch(error => {
					uni.showModal({
						title: '提示',
						content: `错误信息${error}`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},
			// App微信登录
			wxLogin() {
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes.userInfo, 'yyyy')
								self.appUserInfo = infoRes.userInfo
								self.wxLoginApi()

								console.log(self.$store);
								console.log(infoRes.userInfo);
							},
							fail() {
								uni.showToast({
									title: '获取用户信息失败',
									icon: 'none',
									duration: 2000
								})
							},
							complete() {
								uni.hideLoading()
							}
						});
					},
					fail() {
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},

			wxLoginApi() {
				let self = this
				wechatAppAuth({
					userInfo: self.appUserInfo,
					phone: this.account,
					code: this.captcha
				}).then(({
					data
				}) => {
					if (data.isbind) {
						uni.showModal({
							title: '提示',
							content: '请绑定手机号后，继续操作',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									self.current = 1
									self.appLoginStatus = true
								}
							}
						});
					} else {
						self.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.expires_time - self.$Cache.time()
						});
						let backUrl = self.$Cache.get(BACK_URL) || "/pages/index/index";
						self.$Cache.clear(BACK_URL);
						self.$store.commit("SETUID", data.userInfo.uid);
						uni.reLaunch({
							url: backUrl
						});
					}
				}).catch(error => {
					uni.showModal({
						title: '提示',
						content: `错误信息${error}`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},
			again() {
				this.codeUrl =
					VUE_APP_API_URL +
					"/sms_captcha?" +
					"key=" +
					this.keyCode +
					Date.parse(new Date());
			},
			code() {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
						that.getCode();
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async getLogoImage() {
				let that = this;
				getLogo(2).then(res => {
					that.logoUrl = res.data.logo_url;
				});
			},
			async loginMobile() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (that.appLoginStatus) {
					that.wxLoginApi()
				} else if (that.appleLoginStatus) {
					that.appleLoginApi()
				} else {
					loginMobile({
							phone: that.account,
							captcha: that.captcha,
							spread: that.$Cache.get("spread")
						})
						.then(res => {
							let data = res.data;
							
							// 保存用户uid
							uni.setStorageSync('uid', data.uid);
							
							that.$store.commit("LOGIN", {
								'token': data.token,
								'time': data.expires_time - this.$Cache.time()
							});
							let backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
							that.$Cache.clear(BACK_URL);
							getUserInfo().then(res => {
								that.$store.commit("SETUID", res.data.uid);
								if (backUrl.indexOf('/pages/users/login/index') !== -1) {
									backUrl = '/pages/index/index';
								}
								uni.reLaunch({
									url: backUrl
								});
							})
						})
						.catch(res => {
							that.$util.Tips({
								title: res
							});
						});
				}

			},
			async register() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请填写验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
				if (/^([0-9]|[a-z]|[A-Z]){0,6}$/i.test(that.password)) return that.$util.Tips({
					title: '您输入的密码过于简单'
				});
				register({
						account: that.account,
						captcha: that.captcha,
						password: that.password,
						spread: that.$Cache.get("spread")
					})
					.then(res => {
						that.$util.Tips({
							title: res
						});
						that.formItem = 1;
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async getCode() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (that.formItem == 2) that.type = "register";

				await registerVerify({
						phone: that.account,
						type: that.type,
						key: that.keyCode,
						code: that.codeVal
					})
					.then(res => {
						that.$util.Tips({
							title: res.msg
						});
						that.sendCode();
					})
					.catch(res => {
						console.log(res, 'res')
						// if (res.data.status === 402) {
						// 	that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
						// 	that.isShowCode = true;
						// }
						that.$util.Tips({
							title: res
						});
					});
			},
			navTap: function(index) {
				this.current = index;
			},
			async submit() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请填写账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请填写密码'
				});
				loginH5({
						account: that.account,
						password: that.password,
						spread: that.$Cache.get("spread")
					})
					.then(({
						data
					}) => { 
						console.log(this.$Cache.time());
						// 保存用户uid
						uni.setStorageSync('uid', data.uid);
						
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.expires_time - this.$Cache.time()
						});
						
						getUserInfo().then(res => {
							console.log(" user is ",res);
							//
							try{
								//是否注册环信 0 未注册 1已注册 
								if(res.data.is_register==0){
									getApp().globalData.conn.registerIM(res.data.uid,res.data.nickname,(isSuccess,res)=>{ 
										if(isSuccess||res.isregisted){
											this.updateAccount(res.data.uid,res.data.nickname)  
										}
									})
								}else{
									this.loginHxAccount(res.data.uid,res.data.nickname) 
								}
							}catch(e){
								//TODO handle the exception.
								console.log(e);
							}
							
						}).catch(error => {})
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			},
			//更新系统账号为注册环信状态 但不管是否成功都登录环信
			updateAccount(uid,nickname){
				updateHXAccount().then(res=>{
					this.loginHxAccount(uid,nickname)
				}).catch(err=>{
					this.loginHxAccount(uid,nickname)
				})
			},
			// 登陆环信账号
			loginHxAccount(uid,nickname){
				 getApp().globalData.conn.loginIM(uid,(isSuccess,res)=>{
					console.log("im res is ",isSuccess);
					if(isSuccess){ 
						try{
							this.$store.commit("SETUID",uid);
							let backUrl = this.$Cache.get(BACK_URL) || "/pages/index/index";
							this.$Cache.clear(BACK_URL);
							uni.reLaunch({
								url: backUrl
							});
							
						}catch(e){
							//TODO handle the exception
							console.log("err",e);
						}
					}else if(res=='goRegister'){
						getApp().globalData.conn.registerIM(uid,nickname,(isSuccess,res)=>{
							if(isSuccess||res.isregisted){
								this.updateAccount(uid,nickname)  
							}
						})
					}
				})
			}
			
			
		}
	};
</script>

<style lang="scss">
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 1;
	}
	.content {
		position: absolute;
		z-index: 1;
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.logo {
			width: 162rpx;
			height: 162rpx;
			margin-top: 175rpx;
		}
		.phone {
			width: 566rpx;
			height: 85rpx;
			background-color: rgba($color: #626262, $alpha: 0.15);
			margin-top: 168rpx;
			border-radius: 85rpx;
			display: flex;
			align-items: center;
			.l {
				font-size: 32rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: #FFFFFF;
				padding-left: 32rpx;
			}
			input {
				width: 400rpx;
			}
		}
		.code {
			width: 566rpx;
			height: 85rpx;
			background-color: rgba($color: #626262, $alpha: 0.15);
			margin-top: 47rpx;
			border-radius: 85rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			input {
				padding-left: 50rpx;
			}
			.send-sms {
				width: 160rpx;
				height: 76rpx;
				background: rgba($color: #141514, $alpha: 0.5);
				border-radius: 76rpx;
				margin-right: 10rpx;
				font-size: 28rpx;
				font-family: SourceHanSansCN;
				font-weight: 400;
				color: #F6F6F6;
				line-height: 76rpx;
				text-align: center;
			}
		}
		.password {
			width: 566rpx;
			height: 85rpx;
			background-color: rgba($color: #626262, $alpha: 0.15);
			margin-top: 47rpx;
			border-radius: 85rpx;
			display: flex;
			align-items: center;
			input {
				width: 520rpx;
				padding-left: 50rpx;
			}
		}
		.login {
			width: 566rpx;
			height: 85rpx;
			background: rgba($color: #141514, $alpha: 0.5);
			border-radius: 85rpx;
			line-height: 85rpx;
			text-align: center;
			margin-top: 52rpx;
			font-size: 36rpx;
			font-family: SourceHanSansCN;
			color: #F6F6F6;
		}
		.xy {
			margin-top: 96rpx;
			/deep/ .u-checkbox__label {
				color: #FFFFFF!important;
				font-size: 24rpx;
				font-family: Adobe Heiti Std;
				margin-left: 0rpx;
				padding-bottom: 2rpx;
			}
			/deep/ .u-checkbox__icon-wrap--square {
				width: 27rpx!important;
				height: 27rpx!important;
			}
		}
		.qt {
			font-size: 28rpx;
			font-family: Adobe Heiti Std;
			color: #FFFFFF;
			margin-top: 95rpx;
		}
		.qts {
			display: flex;
			margin-top: 49rpx;
			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
	}
</style>
