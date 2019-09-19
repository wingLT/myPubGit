import Comm from '../components/Common.vue'

const MarketOver = (function () {
  return {
    // /获取过夜航班数据
    getOvernightFlight() {
      return Comm.Ajax.generalAjax('/flight/overNight/count', {}, 'GET');
    },
    //获取管制区分布数据
    getControlarea() {
      return Comm.Ajax.generalAjax('/flight/control', {}, 'GET');
    },
    //获取管制区分布数据
    getIHGLight() {
      return Comm.Ajax.generalAjax('/flight/international', {}, 'GET');
    },
    //获取地图数据【到达，离开】
    getAirlineData() {
      return Comm.Ajax.generalAjax('/flight/overNight/map', {}, 'GET');
    },

  }
})();

export {
  MarketOver
}
