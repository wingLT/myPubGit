import Comm from '../components/Common.vue'
const repairMap = (function () {
  return{
    //区域报修统计
    getRepairArea(){
      return Comm.Ajax.generalAjax('/repair/area',{},'GET');
    },
    //当前工单统计
    getCount(){
      return Comm.Ajax.generalAjax('/repair/count',{},'GET');
    },
    //短/长期工单实况
    getOrder(){
      return Comm.Ajax.generalAjax('/repair/order',{},'GET');
    },
    //维修人员
    getPerson(){
      return Comm.Ajax.generalAjax('/repair/rank',{},'GET');
    },
    //系统数量统计
    getSystem(){
      return Comm.Ajax.generalAjax('/repair/sys',{},'GET');
    },
    //故障标签
    getTag(){
      return Comm.Ajax.generalAjax('/repair/tag',{},'GET');
    }
  }
})();
export {
  repairMap
}
