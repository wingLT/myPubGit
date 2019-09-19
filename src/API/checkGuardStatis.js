import Comm from '../components/Common.vue'

const checkGuard = (function () {
  return{
    getCheckCompleteInfo(id){
      return Comm.Ajax.generalAjax('/inspection/completion?id='+id,{},'GET');
    },
    getPersonCheckTaskInfo(parse){
      return Comm.Ajax.generalAjax('/inspection/task?id='+parse.id+'&porch='+ parse.porch,{},'GET');
    },
    getTrackMapInfo(id){
      return Comm.Ajax.generalAjax('/inspection/trajectory?id='+id,{},'GET');
    }
  }
})();

export {
  checkGuard
}
