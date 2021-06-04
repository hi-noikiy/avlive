import request from "@/utils/request.js";

/**
 * 获取作品分类
 */
export function getDemandForm(){
  return request.get('v3/demandForm');
}

/**
 * 获取首页数据
 */
export function getHomeData(data){
  return request.get('v3/works', data);
}

/**
 * 交易大厅
 */
export function getOrderList(data){
  return request.get('demand/order_list', data);
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