
import Cache from '../../utils/cache';

const CHAT_MSG_LIST='CHAT_MSG_LIST'
const state = {
	chat_msg_list: Cache.get(CHAT_MSG_LIST) || [], 
};
const mutations = {
	setMsgList(state,val){
		state.chat_msg_list = val;
		Cache.set(CHAT_MSG_LIST, val);
		console.log("set list====");
	}
}
const actions={
	
}
export default {
	state,
	mutations,
	actions
};