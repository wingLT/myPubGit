import Comm from '../components/Common.vue'

const mobile = (function () {
  return{
    /* 当月，当日，昨日手机值机人数*/
    getLeftTop(){
      return Comm.Ajax.generalAjax('/checkIn/numberStatistics',{},'GET');
    },
    /* 手机值机用户安检口统计*/
    getSecurityCheck(){
      return Comm.Ajax.generalAjax('/checkIn/securityCheck',{},'GET');
    },
    /* 地图数据*/
    getMap(){
      return Comm.Ajax.generalAjax('/checkIn/cityThermodynamic',{},'GET');
    },
    /* 航空公司手机值机TOP10*/
    getAirlineTOP10(){
      return Comm.Ajax.generalAjax('/checkIn/airlineTop10',{},'GET');
    },
    /* 手机值机月增长情况*/
    getMonthAdd(){
      return Comm.Ajax.generalAjax('/checkIn/monthStatistics',{},'GET');
    }
  }
})();

export {
  mobile
}
