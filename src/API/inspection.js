import Comm from '../components/Common.vue'

const inspection = (function () {
  return{
    getDepartmentTask(id){
      return Comm.Ajax.generalAjax('/inspection/progress?id='+id,{},'GET');
    },
    getCompletion(id){
      return Comm.Ajax.generalAjax('/inspection/completion?id='+id,{},'GET');
    },
    getStatistics(id){
      return Comm.Ajax.generalAjax('/inspection/statistics?id='+id,{},'GET');
    },
    getPersonalTask(id){
      return Comm.Ajax.generalAjax('/inspection/statistics?id='+id,{},'GET');
    },
    getUnqualified(id){
      return Comm.Ajax.generalAjax('/inspection/unqualified?id='+id,{},'GET');
    },
    getTrajectory(id){
      return Comm.Ajax.generalAjax('/inspection/trajectory?id='+id,{},'GET');
    },

  }
})();

export {
  inspection
}
