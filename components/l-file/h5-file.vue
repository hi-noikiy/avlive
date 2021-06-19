<template>
	<div class="content">
		
		<div @click="onClose" class="fixed mask"></div>
		
		<div v-if="showTip" align="center" class="fixed tis">
			<div class="tis-content">
				<div class="tis-progress">
					努力上传中
					<text v-if="progress<100">..{{progress}}%</text>
				</div>
				<div class="cancel">
					<button @click="onAbort" type="button" class="cancel-btn">取消上传</button>
				</div>
			</div>
		</div>
		
		<div class="fixed file-content">
			<view ref="input" class="btn">
				<button type="button" class="btn-bg">打开文件管理器</button>
			</view>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			progress: {
				type: [Number,String],
				default: 0
			},
			showTip: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				hFile: '',
			}
		},
		mounted() {  
			this.hFile = document.createElement('input')  
			this.hFile.type = 'file';  
			this.hFile.value = '';  
			this.hFile.style.position = 'absolute';
			this.hFile.style.zIndex = 93;
			this.hFile.style.left = 0;
			this.hFile.style.right = 0;
			this.hFile.style.top = 0;
			this.hFile.style.bottom = 0;
			this.hFile.style.height = '60px';
			this.hFile.style.width = '100%';
			this.hFile.style.opacity = 0;
			this.$refs.input.$el.appendChild(this.hFile);  
		},  
		methods: {
			onAbort() {
				this.$emit('abort',{});
			},
			onClose() {
				this.$emit('close',{});
			}
		}
	}
</script>

<style scoped>
	.content {background: transparent;}
	.fixed {position: fixed;bottom: 0;left: 0;right: 0;width: 100%;}
	.content .mask {top: 0;background: rgba(0,0,0,.4);z-index: 90;}
	.content .file-content {z-index: 91;height: 60px;background: #fff;text-align: center;}
	.btn {position: relative;}
	.btn .file {position: absolute;z-index: 93;left: 0;right: 0;top: 0;bottom: 0;height: 60px;width: 100%;opacity: 0;}
	.btn-bg {margin-top: 10px;background: #0066CC;color: #fff;width: 80%;height: 40px;line-height: 40px;border: 0;border-radius: 5px;}
	.tis {top: 0;z-index: 95;display: flex;justify-content: center;align-items: center;}
	.tis .tis-content {background: #fff;width: 60%;border-radius: 10px;padding: 20px 0;}
	.tis .tis-content img {width: 50px;height: 50px;}
	.tis-progress {margin: 10px 0;color: #999;}
	.cancel-btn {margin-top: 30px;height: 30px;width: 60%;line-height: 30px;font-size: 14px;padding: 0 2em;background: #e3e3e3;color: #898989;border: 0!important;border-radius: 5px;}
	.cancel-btn:after {height: 0!important;border: 0!important;}
</style>
