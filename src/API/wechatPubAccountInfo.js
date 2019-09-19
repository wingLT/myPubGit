import Comm from '../components/Common.vue'

const WeChat = (function () {
  return{

    getUserSummary(){
      return Comm.Ajax.generalAjax('/wechat/getUserSummary',{},'GET');
    },
    getOneFloorInfo(){
    return Comm.Ajax.generalAjax('/wechat/getUserCumulate',{},'GET');
    },
    getTwoFloorInfo(){
      return Comm.Ajax.generalAjax('/wechat/getDemoClickCount',{},'GET');
    },
    getBottomFloorInfo(data){
      return Comm.Ajax.generalAjax('/wechat/getDemoClickTrend',data,'GET');
    }
  }
})();

export {
  WeChat
}
