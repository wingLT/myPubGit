import Comm from '../components/Common.vue'

const StatisticsInOut = (function () {
  return{
    // 获得国内外航司数量
    getFlightData(){
      return Comm.Ajax.generalAjax('/ldm/passenger/airline',{},'GET');
    },
    // 获得出入港人数
    getOutInWardCount(){
      return Comm.Ajax.generalAjax('/ldm/passenger/count',{},'GET');
    },
    // 获得每日短信数据
    getEverydayNoteData(){
      // http://192.168.1.4:9480/ldm/day/count
      return Comm.Ajax.generalAjax('/ldm/day/count',{},'GET');
    },
    // 获得地图数据
    getMapData(){
      return Comm.Ajax.generalAjax('/ldm/passenger/map',{},'GET');
    },

  }
})();

export {
  StatisticsInOut
}
