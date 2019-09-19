import Comm from '../components/Common.vue'

const DistributionFlight = (function () {
  return{
    // 获当日，当月计划、实际起飞数量
    getDayMonthBlockInfo(){
      return Comm.Ajax.generalAjax('/flight/exe/count',{},'GET');
    },
    // 获执行率占比数量
    getImplementationRateInfo(data){
      return Comm.Ajax.generalAjax('/flight/exe/per?',data,'GET');
    },
    // 获分时段航班数量
    getDayPartingInfo(){
      return Comm.Ajax.generalAjax('/flight/exe/hour',{},'GET');
    },
    // 获航班执行率数量
    getFlightImplementInfo(data){
      return Comm.Ajax.generalAjax('/flight/exe/flight?',data,'GET');
    },

  }
})();

export {
  DistributionFlight
}
