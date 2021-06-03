import request from "@/utils/request.js"; 
/**
 * 更新用户是否注册环信
 */
export function updateHXAccount() {
	return request.post("user/edit_register", {});
}
/**
 * 添加好友时查询好友在环信用户系统的id
 */
export function findHXAccountByName(key) {
	return request.post("demand/get_user", {key});
} 
/**
 * 同意好友申请时查找系统用户信息
 */
export function getUserById(uid) {
	return request.post("demand/get_user_id", {uid});
} 

