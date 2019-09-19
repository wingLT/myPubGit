import Comm from '../components/Common.vue'

const houTube = (function () {
  return{
    getPassInfoData(){
      return Comm.Ajax.generalAjax('/terManager/passenger/info',{},'GET');
    },
    getSecurityUserData(){
      return Comm.Ajax.generalAjax('/terManager/passenger/verfiy',{},'GET');
    },
    getSecurityAccessInfoData(){
      return Comm.Ajax.generalAjax('/terManager/channel/info',{},'GET');
    },
    getSecurityAccessStatisData(){
      return Comm.Ajax.generalAjax('/terManager/channel/count',{},'GET');
    },
  }
})();

export {
  houTube
}
