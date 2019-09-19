import Comm from '../components/Common.vue'

const OperationMain = (function () {
  return{
    getLinks(){
      return Comm.Ajax.generalAjax('/inspection/repair/group',{},'GET');
    },

    RepairOftime(){
      return Comm.Ajax.generalAjax('/inspection/repair/time/top10',{},'GET');
    },

    RepairOfArea(){
      return Comm.Ajax.generalAjax('/inspection/repair/area/top10',{},'GET');
    },
    RepairOfType(){
      return Comm.Ajax.generalAjax('/inspection/repair/system/top10',{},'GET');
    },
    errorTerminall(){
      return Comm.Ajax.generalAjax('/inspection/repair/terminall',{},'GET');
    }
  }
})();

export {
  OperationMain
}
