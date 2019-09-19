import Comm from '../components/Common.vue'
const AOCMap = (function () {
  return{
    //得到总人数
    getTotalPerson(data){
      return Comm.Ajax.generalAjax('/terminall/map/amount?',data,'GET');
    },
    getFlightInfo(data){
      return Comm.Ajax.generalAjax('/terminall/map/gates?',data,'GET');
    },
    getGatePlan(data){
      return Comm.Ajax.generalAjax('/terminall/map/road?',data,'GET');
    }
  }
})();
export {
  AOCMap
}
