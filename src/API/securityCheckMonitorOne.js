import Comm from '../components/Common.vue'

const SecurityOne = (function () {
  return{
    //获取通道安检速率和各安检区域建议
    getSecurityCheckSuggestData(){
      return Comm.Ajax.generalAjax('/ajxx/channelRate',{},'GET');
    },
    //获取当前等待团队旅客
    getWaitGroupPass(){
      return Comm.Ajax.generalAjax('/ajxx/channelGroupPassenger',{},'GET');
    },
    // 获取通道开闭情况
    getAccessLockageData(){
      return Comm.Ajax.generalAjax('/ajxx/channelInfo',{},'GET');
    },
  }
})();

export {
  SecurityOne
}
