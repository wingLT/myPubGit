import Comm from '../components/Common.vue'

const dataInterFace = (function () {
  return{
    /* 今日调用 业务系统 超时接口*/
    getNowDayBusSys(){
      return Comm.Ajax.generalAjax('/platform/count',{},'GET');
    },
    /* 系统调用接口次数占比 */
    getSysPortNumRatio(){
      return Comm.Ajax.generalAjax('/platform/system/per',{},'GET');
    },
    /* 业务系统调取次数*/
    getBusSysNum(){
      return Comm.Ajax.generalAjax('/platform/api/24',{},'GET');
    },
    /* 24小时接口响应时间*/
    get24Hours(){
      return Comm.Ajax.generalAjax('/platform/response/avg',{},'GET');
    },
    /* 当前接口类型调用时长*/
    getNowPortTimeLength(){
      return Comm.Ajax.generalAjax('/platform/response/top',{},'GET');
    },
    /* 接口调用次数*/
    getPortUseNumBar(){
      return Comm.Ajax.generalAjax('/platform/api/count',{},'GET');
    },
    getPortUseNumLeida(){
      return Comm.Ajax.generalAjax('',{},'GET');
    }
  }
})();

export {
  dataInterFace
}
