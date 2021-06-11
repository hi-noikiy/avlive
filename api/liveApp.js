import request from "@/utils/request.js";

/**
 * 获取作品分类
 */
export function getDemandForm(){
	return request.get('v3/demandForm');
}

/**
 * 获取首页数据（视频、音频）
 */
export function getHomeData(data){
	return request.get('v3/works', data);
}
/**
 * 视频列表
 */
export function getWorksVideoList(data){
	return request.get('v3/worksVideoList', data);
}
/**
 * 作品详情
 */
export function getWorksDetail(data){
	return request.get('v3/worksDetail', data);
}
/**
 * 点赞作品
 */
export function worksLike(data){
	return request.get('v3/worksLike', data);
}

/**
 * 获取直播间列表
 */
export function getLiveRoomList(data){
	return request.get('v3/liveRoomList', data);
}
/**
 * 获取直播间详情
 */
export function getLiveRoomDetail(data){
	return request.get('v3/liveRoomDetail', data);
}
/**
 * 礼物列表
 */
export function getGift(data){
	return request.get('v3/gift', data);
}

/**
 * 用户关注
 */
export function userFollow(data){
	return request.get('v3/userFollow', data);
}

/**
 * 交易大厅
 */
export function getOrderList(data){
	return request.get('demand/order_list', data);
}
/**
 * 提交需求
 */
export function createOrder(data){
	return request.post('demand/create_order', data);
}
/**
 * 需求详情
 */
export function getUserOrderList(data){
	return request.get('demand/user_order_list', data);
}
/**
 * 取消订单
 */
export function cancelOrder(data){
	return request.get('demand/cancel_order', data);
}

/**
 * 音色要求
 */
export function getDemandTimbreList(){
	return request.get('demand/demand_timbre_list');
}