import Comm from '../components/Common.vue'

const AOC = (function () {
  return{
    getOccupy(){
      return Comm.Ajax.generalAjax('/aoc/craftSeat/occupy',{},'GET');
    },
    getAssign(){
      return Comm.Ajax.generalAjax('/aoc/craftSeat/assign',{},'GET');
    },
    getCapacity(){
      return Comm.Ajax.generalAjax('/aoc/craftSeat/capacity',{},'GET');
    }
  }
})();

export {
  AOC
}
