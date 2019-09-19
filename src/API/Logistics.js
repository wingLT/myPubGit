import Comm from '../components/Common.vue'
/*获取今日物流情况*/
export const getTodayOfSixtySec = _ => Comm.Ajax.generalAjax('/logistics/getTodayOfSixtySec', null, 'GET');
export const getLogisticsBy30 = _ => Comm.Ajax.generalAjax('/logistics/getLogisticsBy30', null, 'GET');
/*地图数据*/
export const getLogisticsByMap = _ => Comm.Ajax.generalAjax('/logistics/getLogisticsByMap', null, 'GET');
