[uniapp im ](http://docs-im.easemob.com/im/applet/uniapp)

配置服务器域名（以微信为例）
登录微信公众平台，进入“开发 > 开发设置”页面，配置以下服务器地址（其他平台小程序配置与微信一致）：

request 合法域名，uploadFile 合法域名，downloadFile 合法域名:

1、https://a1.easemob.com
2、https://a2.easemob.com
3、https://a3.easemob.com
4、https://a4.easemob.com
5、https://a5.easemob.com
socket合法域名:

1、wss://im-api.easemob.com（2.0 IM SDK)
2、wss://im-api-wechat.easemob.com（3.0 IM SDK） 
3、wss://im-api-alipay.easemob.com/websocket（支付宝小程序专用）



后期更改
 [集成文档](http://docs-im.easemob.com/rtc/conference/uniapp)
1[注册应用](https://console.easemob.com/index)
2 修改文中对应appkey，在/utils/WebIMConfig.js文件中约40行。
- appkey: "1120210422085065#demo",
3 修改下面2个文件中对应的截取字符串 getName(str)方法，取自appkey #号 后面的部分：
	/pages/emediaToOne/index.nvue
	/pages/liveApp/emedia/index.nvue
	
	```
	// 截取出im的userId
	getName(str){
		console.log('name', str)
		if(typeof str !== 'string') return '';
		return (str.match(/demo_(\S*)@|demo_(\S*)/)[1] || str.match(/demo_(\S*)@|demo_(\S*)/)[2])
	}
	```
	
	把demo 换成自己使用的appkey#号后面的 

2 [提交查询工单地址](https://console.easemob.com/ticket)



