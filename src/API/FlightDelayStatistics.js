import Comm from '../components/Common.vue'

const FDStatistics = (function () {
  return {
    //日计划执行架次
    implement(data) {
      return Comm.Ajax.generalAjax('/flight/collect/sortie?', data, 'GET');
    },
    //分区统计
    count(data) {
      return Comm.Ajax.generalAjax('/flight/collect/seat/count?', data, 'GET');
    },
    //停机位统计
    distributed(data) {
      return Comm.Ajax.generalAjax('/flight/collect/seat/distributed?', data, 'GET');
    },
    //实时航班进出港
    flightRealTime(data) {
      return Comm.Ajax.generalAjax('/flight/collect/info?', data, 'GET');
    },

    //航班实时运行类别
    flightType(data) {
      return Comm.Ajax.generalAjax('/flight/collect/type?', data, 'GET');
    },
    //本周靠桥率
    bridge(data) {
      return Comm.Ajax.generalAjax('/flight/collect/bridge?', data, 'GET');
    },
    //请求时间间隔
    Time(){
      return 60*1000
    }
  }
})();
export {
  FDStatistics
}
