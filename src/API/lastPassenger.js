import Comm from '../components/Common.vue'

const lastPassenger = (function () {
  return{
    getLatePassengerTotal(){
      return Comm.Ajax.generalAjax('/ajxx/passengerLateTotal',{},'GET');
    },
    getSecurityLatePassage(){
      return Comm.Ajax.generalAjax('/ajxx/passengerLate',{},'GET');
    },
    getSecurityHoursPassage(){
      return Comm.Ajax.generalAjax('/ajxx/passVerifyByHour',{},'GET');
    },
    getClearportFlightlClick(){
      return Comm.Ajax.generalAjax('/ajxx/flightByHour',{},'GET');
    },
  }
})();

export {
  lastPassenger
}
