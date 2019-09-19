import Comm from '../components/Common.vue'

const SecurityTwo = (function () {
  return{
    //获取各安检区域高峰小时
    getSecurityAreaChannelHourData(){
      return Comm.Ajax.generalAjax('/ajxx/channelHour',{},'GET');
    },
    //获取通道开启情况详情
    getAccessLockageInfoData(){
      return Comm.Ajax.generalAjax('/ajxx/channelDetail',{},'GET');
    },
    // 获取各安检区域历史放行速率
    getHistoryRateData(){
      return Comm.Ajax.generalAjax('/ajxx/channelRate/his',{},'GET');
    },
    // 获取各安检区域建议
    getSecurityCheckSuggestData(){
      return Comm.Ajax.generalAjax('/ajxx/channelAdvice',{},'GET');
    }
  }
})();

export {
  SecurityTwo
}
