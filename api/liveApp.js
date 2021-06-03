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
 * 
 */