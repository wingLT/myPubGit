import Comm from '../components/Common.vue'

const SecurityFour = (function () {
  return{
    //获取未来两小时航班座位与旅客人数信息
    getContentData(){
      return Comm.Ajax.generalAjax('/ajxx/flight/2hour',{},'GET');
    },
    //获取T1，T2已安检和未安检旅客数信息
    getTwoBlockData(){
      return Comm.Ajax.generalAjax('/ajxx/passenger/count',{},'GET');
    },
    // 获取T1，T2每小时过安检旅客人数信息
    getPerHourskData(){
      return Comm.Ajax.generalAjax('/ajxx/passenger/countByHour',{},'GET');
    },
  }
})();

export {
  SecurityFour
}
