<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" :class="className" :data-value="value">0</span>
  </div>
</template>
<script>
  export default {
    props: {
      time: {
        type: Number,
        default: 0.5
      },
      value: {
        type: Number,
        default: 0
      },
      className: {
        type: String,
        default: ''
      }
    },
    methods: {
      numberGrow(ele) {
        let _this = this
        let step = Math.ceil((_this.value * 10) / (_this.time * 1000))
        let current = 0
        let start = 0
        let t = setInterval(function () {
          start += step
          if (start > _this.value) {
            clearInterval(t)
            start = _this.value
            t = null
          }
          if (current === start) {
            return
          }
          current = start
          ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
        }, 10)
      }
    },
    watch:{
      value(val){
        let self=this;
        self.value = val;
        self.$nextTick(function(){
          self.numberGrow(self.$refs.numberGrow)
        });
      }
    },
    mounted() {
    }
  }
</script>
<style scoped="">
  .number-grow-warp {
    display: inline-block;
    transform: translateZ(0);
  }

  .number-grow {
    font-family: 微软雅黑;
    font-size: 64px;
    color: #ffaf00;
    letter-spacing: 2.67px;
    margin: 110px 0 20px;
    display: block;
    line-height: 64px;
  }

  .yellow {
    color: rgb(255, 182, 34);
  }

  .blue {
    color: rgb(23, 230, 255)
  }
  .data-count {
    font-size: 28px;
    color: rgb(255, 182, 34);
    font-family: 微软雅黑;
  }
</style>
