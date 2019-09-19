import Comm from '../components/Common.vue'

const FIOutPort = (function () {
  return {
    //航班异常状态占比
    state(data) {
      return Comm.Ajax.generalAjax('/flight/delay/state?', data, 'GET');
    },
    //当日出港航班正常率
    count(data) {
      return Comm.Ajax.generalAjax('/flight/delay/count?', data, 'GET');
    },
    //航班小时统计
    hour(data) {
      return Comm.Ajax.generalAjax('/flight/delay/hour?', data, 'GET');
    },
    // 出港延误目的地TOP10 进港延误始发地TOP10 热门城市
    top(data) {
      return Comm.Ajax.generalAjax('/flight/delay/top?', data, 'GET');
    },
    //今日航班延误时长
    duration(data) {
      return Comm.Ajax.generalAjax('/flight/delay/duration?', data, 'GET');
    },
    //地图
    mapJson(data) {
      return Comm.Ajax.generalAjax('/flight/delay/map?', data, 'GET');
    },
    //请求时间间隔
    Time(){
      return 60*1000
    }
  }
})();
export {
  FIOutPort
}
