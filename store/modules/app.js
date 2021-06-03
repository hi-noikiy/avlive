import {
	getUserInfo
} from "../../api/user.js";
import {
	LOGIN_STATUS,
	UID
} from '../../config/cache';
import Cache from '../../utils/cache';
import {
	USER_INFO
} from '../../config/cache';
const IM_LOGIN_STATUS='IM_LOGIN_STATUS'
let WebIM = require("@/utils/WebIM")["default"];
const state = {
	token: Cache.get(LOGIN_STATUS) || false,
	im_token: Cache.get(IM_LOGIN_STATUS) || false,
	backgroundColor: "#fff",
	userInfo: {},
	uid: Cache.get(UID) || 0,
	homeActive: false,
	phoneStatus:true,
	pageFooter:uni.getStorageSync('pageFoot') || {}
};

const mutations = {
	SETPHONESTATUS(state,val){
		state.phoneStatus = val;
	},
	LOGIN(state, opt) {
		state.token = opt.token;
		Cache.set(LOGIN_STATUS, opt.token, opt.time);
	}, 
	IM_LOGIN(state, opt) {
		state.im_token = opt.token;
		Cache.set(IM_LOGIN_STATUS, opt.token, opt.time);
	},
	SETUID(state,val){
		state.uid = val;
		Cache.set(UID, val);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	}, 
	LOGOUT(state) {
		state.token = undefined;
		state.uid = undefined
		Cache.clear(IM_LOGIN_STATUS);
		Cache.clear(LOGIN_STATUS);
		Cache.clear('IM_LOGIN_OPT'); 
		Cache.clear(UID);
		console.log("WebIM.conn",WebIM.conn);
		if(!WebIM.conn.logOut){
			try{
				WebIM.conn.close(); // uni.closeSocket() 
			}catch(e){
				//TODO handle the exception
			}
		} 
	},
	BACKGROUND_COLOR(state, color) {
		state.color = color;
		document.body.style.backgroundColor = color;
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		Cache.set(USER_INFO, userInfo);
	},
	OPEN_HOME(state) {
		state.homeActive = true;
	},
	CLOSE_HOME(state) {
		state.homeActive = false;
	},
	FOOT_UPLOAD(state,data){
		state.pageFooter = data
	}
};

const actions = {
	USERINFO({
		state,
		commit
	}, force) {
		if (state.userInfo !== null && !force)
			return Promise.resolve(state.userInfo);
		else
			return new Promise(reslove => {
				getUserInfo().then(res => {
					commit("UPDATE_USERINFO", res.data);
					Cache.set(USER_INFO, res.data);
					reslove(res.data);
				});
			}).catch(() => {

			});
	}
};

export default {
	state,
	mutations,
	actions
};
