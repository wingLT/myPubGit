import Comm from '../components/Common.vue'

const VIP = (function () {
  return{
    //获取VIP今日值班数据信息
    getTotayDutyData(){
      return Comm.Ajax.generalAjax('/gb/getGbAreaTask',{},'GET');
    },
    //获取VIP分区统计数据信息
    getAreaStatisData(){
      return Comm.Ajax.generalAjax('/gb/getGbAreaTaskChart',{},'GET');
    },
    // 获取VIP值班列表数据信息
    getDutyListData(){
      return Comm.Ajax.generalAjax('/gb/getGbDuty',{},'GET');
    }
  }
})();

export {
  VIP
}
