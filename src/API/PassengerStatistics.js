import Comm from '../components/Common.vue'
const PassengerMap = (function () {
  return{
    //进港前十
    getACityTop10(){
      return Comm.Ajax.generalAjax('/passenger/aCityTop10',{},'GET');
    },
    //客座率
    getADGuestSeat(){
      return Comm.Ajax.generalAjax('/passenger/aDGuestSeat',{},'GET');
    },
    //进出港人数统计
    getADNum(){
      return Comm.Ajax.generalAjax('/passenger/aDNum',{},'GET');
    },
    //飞机架次
    getAirportType(){
      return Comm.Ajax.generalAjax('/passenger/airportType',{},'GET');
    },
    //地图
    getCityThermodynamic(){
      return Comm.Ajax.generalAjax('/passenger/cityThermodynamic',{},'GET');
    },
    //出港前十
    getDCityTop10(){
      return Comm.Ajax.generalAjax('/passenger/dCityTop10',{},'GET');
    },
    //货邮统计
    getMail(){
      return Comm.Ajax.generalAjax('/passenger/mail',{},'GET');
    },
    //安检口统计
    getSecurityCheck(){
      return Comm.Ajax.generalAjax('/passenger/securityCheck',{},'GET');
    },
  }
})();
export {
  PassengerMap
}
