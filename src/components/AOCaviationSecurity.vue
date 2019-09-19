<template>
  <div class="body-bg">

    <!-- 顶部 -->
    <div class="head">
      <div class="hea-cont">
        <div class="icon-lf comm-heagif">
          <span class="icongif" style="float:right;"></span>
        </div>
        <div class="heacont-tit">
          <div class="heacont-titbg"></div>
          <span class="heatit-lf com-borgif"></span>
          <h2>AOC航空保障数据大屏</h2>
          <span class="heatit-lr com-borgif"></span>
        </div>
        <div class="icon-lr comm-heagif">
          <span class="icongif" style="float:left;"></span>
        </div>
      </div>
      <div class="horologe">
        <em class="el-icon-time"></em>
        <!-- <span>2018-10-15 11:55:56</span> -->
        <span v-cloak>{{ disposeDate }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- <div class="outbord"></div> -->
      <div class="contain">
        <div class="cont-top">
          <!-- <div class="com-tit-hea">
                <span class="blue-sign com-span"></span>
                <span class="com-tit com-span">当前晚到旅客</span>
                <span class="bedeck-gif com-span"></span>
              </div> -->
          <div class="lf-block topcom-bord">
            <div class="com-tit-hea">
              <span class="blue-sign com-span"></span>
              <span class="com-tit com-span">近机位日容量</span>
              <!--<span class="bedeck-gif com-span"></span>-->
            </div>
            <div class="num-content">
              <span class="num num-up">{{spaceNum}}</span>
              <span class="text">架次</span>
            </div>
            <div class="content-title">
              <span class="com-tit com-span">高峰小时近机位容量</span>
            </div>
            <div class="num-content">
              <span class="num num-up">{{spaceNumHour}}</span>
              <span class="text">架次</span>
            </div>
          </div>
          <div class="center-block topcom-bord">
            <div class="com-tit-hea">
              <span class="blue-sign com-span"></span>
              <span class="com-tit com-span">高峰小时各指廊机位容量</span>
              <span class="bedeck-gif com-span"></span>
            </div>
            <div class="corridorCapacity" id="corridorCapacity" style="height: 300px;">

            </div>
          </div>
          <div class="lr-block topcom-bord">
            <div class="com-tit-hea">
              <span class="blue-sign com-span"></span>
              <span class="com-tit com-span">机位总体占用情况</span>
              <span class="right-gif com-span "></span>
            </div>

            <div style="height: 300px;width:100%;" class="overallOccupancy" id="overallOccupancy">


            </div>
          </div>

        </div>
        <div class="cont-bot bot-insidebord">
          <div class="lf-block topcom-bord">
            <div class="com-tit-hea">
              <span class="blue-sign com-span"></span>
              <span class="com-tit com-span">机位分配情况</span>
              <!--<span class="bedeck-gif com-span"></span>-->
            </div>
            <div class="table-container">
              <table class="table">
                <thead>
                <tr>
                  <td colspan="6">未分配</td>
                  <td>已分配</td>
                  <td>总计</td>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td></td>
                  <td>B类</td>
                  <td>C类</td>
                  <td>D类</td>
                  <td>E类</td>
                  <td>F类</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="td-content" v-for="item in distributeList">
                  <td>{{item.area}}</td>
                  <td class="num-up">{{item.b}}</td>
                  <td class="num-up">{{item.c}}</td>
                  <td class="num-up">{{item.d}}</td>
                  <td class="num-up">{{item.e}}</td>
                  <td class="num-up">{{item.f}}</td>
                  <td class="num-up">{{item.assigned}}</td>
                  <td class="num-up">{{item.total}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="bottombord"></div>-->
    </div>

  </div>
</template>

<script>
  import echarts from "echarts";
  import comm from "./Common.vue";
  import DateTool from "../../static/js/DateUtils.js";
  import {AOC} from "../API/AOCaviationSecurity"

  export default {
    name: "Echarts",
    created() {
      document.title = "AOC航空保障数据大屏";
    },
    data() {
      return {
        date: "",
        disposeDate: "",
        distributeList: [],
        spaceNum: 0,
        spaceNumHour: 0,
        bar: "",
        pie: "",
        time: 1
      };
    },
    mounted() {
      const self = this;
      this.timer = setInterval(function () {
        self.date = new Date(); //修改数据date
        self.disposeDate = comm.dateFormat(self.date);
      }, 1000);

      if (this.pageTimes) {
        clearInterval(this.pageTimes);
      } else {
        this.pageTimes = setInterval(() => {
//          getLatePassengerTotal(self);
//          getSecurityLatePassage(self);
//          getSecurityHoursPassage(self);
//          getClearportFlightlClick(self);
        }, 180000);
      }

      self.initEchartData()

      window.addEventListener("resize", function () {
        self.$nextTick(function () {
          self.bar.resize();
          self.pie.resize()
        });
      })

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
      }
    },
    destroyed() {
      clearInterval(this.pageTimes);
    },
    methods: {
      async getOccupy() {
        let self = this;
        let result;
        let data = await AOC.getOccupy(result).then((result) => {
          if (result.status === 200) {
            let arry = []
            for (let i in result.data) {
              switch (i) {
                case 'assigned':
                  arry.push({
                    name: '已分配未占用',
                    value: result.data[i]
                  });
                  break;
                case 'occupied':
                  arry.push({
                    name: '已占用',
                    value: result.data[i]
                  });
                  break;
                case 'free':
                  arry.push({
                    name: '未占用未分配',
                    value: result.data[i]
                  });
                  break;
              }
            }
            if (self.pie) {
              self.destroyEcharts(self.pie)
            }
            self.pie = echarts.init(document.getElementById('overallOccupancy'));
            setOverallOccupancy(self.pie, arry)
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      async getAssign() {
        let self = this;
        let result;
        let data = await AOC.getAssign(result).then((result) => {
          if (result.status === 200) {
            self.distributeList = result.data
            self.$nextTick(function () {
//                self.numUp()
            });
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },


      async getCapacity() {
        let self = this;
        let result;
        let data = await AOC.getCapacity(result).then((result) => {
          if (result.status === 200) {
            let nameArr = []
            let dataArr = []
            for (let i in result.data.details) {
              nameArr.push(result.data.details[i].porch)
              dataArr.push(result.data.details[i].hourCapacity)
            }
            self.spaceNum = result.data.dayCapacityTotal;
            self.spaceNumHour = result.data.hourCapacityTotal;

            if (self.bar) {
              self.destroyEcharts(self.bar)
            }
            self.bar = echarts.init(document.getElementById('corridorCapacity'));
            setCorridorCapacity(self.bar, nameArr, dataArr)
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      initEchartData: function () {
        let self = this;
        self.getOccupy();
        self.getAssign();
        self.getCapacity();
        setTimeout(function () {
          self.initEchartData()
        }, 1000 * 60 * self.time)
      },


//      销毁echarts
      destroyEcharts(mapName) {
        if (mapName || mapName !== null) {
          mapName.clear(false)
          mapName.dispose(false)
        }
      },

      //      接口调用总量
      numUp: function () {
        let counter = $('.content')
        let counterArr = counter.find('.num-up')
        let num = "";
        for (let j = 0; j < counterArr.length; j++) {
//          console.log(counterArr[j].innerText)
          countUp(counterArr[j].innerText, counterArr[j])
        }
      },

    }
  };

  /*
  公用提示消息
  */
  function comMessageTips(self, result) {
    self.$message({
      type: "error",
      message: result.msg
    });
  }

  //  高峰小时各指廊机位容量
  function setCorridorCapacity(el, name, data) {
    let maxpoint = Math.max.apply(null, data);
    let maxArray = [];
    if (maxpoint < 10) {
      maxpoint = 10;
    } else if (maxpoint < 30) {
      maxpoint = 30;
    } else if (maxpoint < 50) {
      maxpoint = 50;
    } else if (maxpoint < 100) {
      maxpoint = 100;
    } else if (maxpoint < 150) {
      maxpoint = 150;
    } else if (maxpoint < 300) {
      maxpoint = 300;
    } else if (maxpoint < 500) {
      maxpoint = 500;
    } else if (maxpoint < 700) {
      maxpoint = 700;
    } else if (maxpoint < 1000) {
      maxpoint = 1000;
    }

    for (let i in data) {
      maxArray.push(maxpoint)
    }

    let option = {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          let rest;
          for (let i in params) {
            rest = params[0].marker + params[0].name + ':' + params[0].data
          }
          return rest;
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        top: '1%',
        containLabel: true
      },
      xAxis: {
        max: maxArray[0],
        name: '架次',
        nameGap: '10',
        nameLocation: 'end',
        type: 'value',
        boundaryGap: [0, 0.01],
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
        },
      },
      yAxis: {

        type: 'category',
        data: name,
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#fff",
            fontSize: 16,
            lineHeight: 30
          },
          splitNumber: 8
//          interval:2
        }
      },
      series: [
        {
          barWidth: 20, //柱子宽度
          name: '',
          stack: 'chart',
          type: 'bar',
          data: data,
          z: 3,
          itemStyle: {
            normal: {
              color: 'rgb(0, 186, 255)',
            }
          },

        },
        {
          name: "",
          type: "bar",
          barWidth: 20,
          xAxisIndex: 0,
          barGap: "-100%",
          data: maxArray,
          itemStyle: {
            normal: {
              color: "#2e3c50"
            }
          },
          zlevel: -1,
          formatter: function (params) {
//          var rest = params[0].name;
          }
        }
      ]
    };
    el.setOption(option, true);

  }

  //  机位总体占用情况
  function setOverallOccupancy(ele, data) {
//    let data1 = [{name: '已占用', value: 5}, {name: '未占用', value: 10}];
    let option = {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        trigger: 'item',
//        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: true,
        textStyle: {
          color: '#fff'
        },
        selectedMode: false,
        bottom: '0px'
      },
      grid: {
        left: "20px",
        top: "20px"
      },
      color: ["#3de7c9", "#00baff", "#9bbdd4"],
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['50%', '50%'],
//          avoidLabelOverlap: true,
          label: {
            normal: {
              show: true,
//              formatter: '{b}：{d}' + '%',
              position: 'outside',
              fontSize: '14',
              formatter(v) {
                let text = v.name;
                return text.length < 4
                  ? text + v.percent +
                  '%'
                  : `${text.slice(0, 4)}\n${text.slice(4)}\n` + v.percent +
                  '%'
              }

            },

          },
          labelLine: {
            normal: {
              show: true
            }
          },
          itemStyle: {
//            borderWidth: 5, //设置border的宽度有多大
//            borderColor: '#0a162c',
          },
          data: data
        }
      ]
    };
    ele.setOption(option, true);
  }

  //  数字增长
  function countUp(count, object) {
    var div_by;
    if (count > 100) {
      div_by = 15;
    } else {
      div_by = 2;
    }

    var speed = Math.round(count / div_by),
      $display = $(object),
      run_count = 1,
      int_speed = 20;
    var int = setInterval(function () {
      if (run_count < div_by) {
        $display.text(speed * run_count);
        run_count++;
      } else if (parseInt($display.text()) < count) {
        var curr_count = parseInt($display.text()) + 1;
        $display.text(curr_count);
      } else if (parseInt($display.text()) == count) {
        $display.text(count);
        clearInterval(int);
      }
    }, int_speed);
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../static/font/font.css";

  body {
    font-size: 16px;
  }

  .body-bg {
    width: 99%;
    height: 1042px;
    // height: 100%;
    padding: 1% 0.5%;
    background: url("../../static/img/late_bg.jpg");
    background-color: #02020b;
    // background-repeat: repeat-y;
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }

  .head {
    position: relative;
    text-align: center;
    height: 88px;
    .hea-cont {
      width: 100%;
      // overflow: hidden;

      .comm-heagif {
        /*float: left;*/
        display: inline-block;
        width: 27%;
        height: 36px;
        vertical-align: middle;
      }
      .icongif {
        display: inline-block;
        width: 70%;
        height: 100%;
        background: url("../../static/img/top_comanima.gif") no-repeat;
        background-size: 100% 100%;
      }
      .icon-lf {
        margin-right: 1%;
        left: 25%;

        span {
        }
      }
      .heacont-tit {
        // width: 70%;
        display: inline-block;
        position: relative;
        padding: 0 2%;
        /*float: left;*/
        z-index: 99;
        .heacont-titbg {
          width: 100%;
          height: 80px;
          line-height: 80px;
          border-radius: 0 0 9px 9px;
          /*background: rgba(0, 0, 0, 0.7);*/
          position: absolute;
          left: 0;
          top: -18px;
          z-index: -1;
        }
        .com-borgif {
          display: inline-block;
          width: 100px;
          height: 80px;
          position: absolute;
        }
        .heatit-lf {
          background: url("../../static/img/top_lf.gif") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          left: -35px;
          top: -9px;
        }
        h2 {
          color: #ffffff;
          // font-size: 30px;
          font-size: 2.3rem;
          /*font-family: chinese;*/
          font-weight: bold;

          /*background-image: -webkit-gradient(*/
          /*linear,*/
          /*0 0,*/
          /*0 bottom,*/
          /*from(#deeff7),*/
          /*to(#8bdaee)*/
          /*);*/
          /*-webkit-background-clip: text;*/
          /*-webkit-text-fill-color: transparent;*/
          font-weight: normal;
        }
        .heatit-lr {
          background: url("../../static/img/top_lr.gif") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          transform: rotate(180deg);
          right: -35px;
          top: -8px;
        }
      }
      .icon-lr {
        margin-left: 1%;
        right: 25%;
        top: -3px;
      }
    }

    .horologe {
      position: absolute;
      right: 1%;
      top: 0;
      height: 50px;
      line-height: 50px;
      em {
        width: 18px;
        height: 18px;
        display: inline-block;
        color: #56e2e2;
      }
      span {
        color: #ffffff;
      }
    }
  }

  .content {
    clear: both;
    width: 96%;
    padding: 0 2%;
    position: relative;
    .num-content {
      color: #fff;
      padding-left: 30px;
      .num {
        font-size: 40px;
        font-family: HighlandGothicFLF;
        letter-spacing: 8px;
        color: rgb(73, 245, 251);
      }
      .text {
        color: #c1c1c1;
        font-size: 22px;

      }
    }
    .content-title {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      padding-top: 20%;
      padding-bottom: 3%;
    }
    .com-tit-hea {
      overflow: hidden;
      /*width: 95%;*/
      padding: 10px 8px;
      .right-gif {
        margin-left: 1.5%;
        width: 47%;
        height: 40px;
        line-height: 40px;
        background: url("../../static/img/late_passage_anima.gif") no-repeat;
        background-size: 100% 100%;
        background-position: 100% 100%;
      }
      .bedeck-gif {
        margin-left: 1.5%;
        width: 47%;
        height: 40px;
        line-height: 40px;
        background: url("../../static/img/late_passage_anima.gif") no-repeat;
        background-size: 100% 100%;
        background-position: 100% 100%;
      }
      .com-span {
        float: left;
        display: inline-block;
      }
      .blue-sign {
        width: 0;
        height: 29px;
        margin-right: 10px;
        border-radius: 0px;
        border-style: dotted;
        border-width: 8px;
        border-image: url("../../static/img/sign-icon.png") 6 / 1;
        background: rgb(40, 70, 255);
        filter: blur(0px);
      }
      .com-tit {
        color: #fff;
        // font-size: 24px;
        font-size: 2rem;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
      }
    }
    .topcom-bord {
      // width: 1252px;
      // width: 78.3%;
      min-height: 365px;
      border-style: solid;
      border-width: 14px;
      border-image: url("../../static/img/block_border.png") 14 fill;
      background: none;
      .table-container {
        padding: 20px;
      }
      .table {
        color: #fff;
        font-size: 1.9rem;
        width: 100%;
        table-layout: fixed;
      }
      .table thead {
        background-color: rgba(73, 245, 251, 0.15);

      }
      .table tbody tr:first-child {
        color: rgb(193, 193, 193);
      }
      .table td {
        text-align: center;
        padding: 5px;
      }
      .table .td-content > td:not(:first-child) {
        font-family: HighlandGothicFLF;
        letter-spacing: 5px;
        color: rgb(73, 245, 251);
      }
    }
    .contain {
      position: relative;
      width: 100%;
      .cont-top {
        overflow: hidden;
        white-space: nowrap;
        .lf-block {
          width: 20%;
          float: left;
        }
        .center-block {
          width: 42%;
          margin: 0 2.6%;
          float: left;
        }
        .lr-block {
          width: 28%;
          float: left;
        }
      }
      .bot-insidebord {
        margin-top: 2%;
        .topcom-bord {
          min-height: 357px;
        }
      }
      .cont-bot {
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.2rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1rem;
    }

    .content .content-title {
      font-size: 1rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 18%;
    }

    .content .num-content .num {
      font-size: 30px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 60px;
    }

    .content .topcom-bord .table {
      font-size: 1.2rem;
    }

  }

  @media screen and (min-width: 1280px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.4rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1rem;
    }

    .content .content-title {
      font-size: 1rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 18%;
    }

    .content .num-content .num {
      font-size: 32px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 70px;
    }

    .content .topcom-bord .table {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1366px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.6rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.2rem;
    }

    .content .content-title {
      font-size: 1.2rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 20%;
    }

    .content .num-content .num {
      font-size: 34px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 70px;
    }

    .content .topcom-bord .table {
      font-size: 1.4rem;
    }

  }

  @media screen and (min-width: 1400px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.8rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.4rem;
    }

    .content .content-title {
      font-size: 1.4rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 20%;
    }

    .content .num-content .num {
      font-size: 34px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 70px;
    }

    .content .topcom-bord .table {
      font-size: 1.6rem;
    }

  }

  @media screen and (min-width: 1440px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.8rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.5rem;
    }

    .content .content-title {
      font-size: 1.5rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 20%;
    }

    .content .num-content .num {
      font-size: 34px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 70px;
    }

    .content .topcom-bord .table {
      font-size: 1.5rem;
    }

  }

  @media screen and (min-width: 1600px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 2rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.7rem;
    }

    .content .content-title {
      font-size: 1.7rem;
    }

    .content .contain .cont-top .center-block {
      width: 40%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 40%;
    }

    .content .com-tit-hea .right-gif {
      width: 35%;
    }

    .content .contain .cont-top .lf-block {
      width: 20%;
    }

    .content .num-content .num {
      font-size: 36px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.7rem;
    }

  }

  @media screen and (min-width: 1920px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 2.3rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 2rem;
    }

    .content .content-title {
      font-size: 2rem;
    }

    .content .contain .cont-top .center-block {
      width: 42%;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 20%;
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }

  }

  /*@media only screen and (max-width: 1550px) {*/
  /*.head .hea-cont .heacont-tit h2 {*/
  /*font-size: 2rem !important;*/
  /*}*/

  /*.content .com-tit-hea .com-tit {*/
  /*font-size: 1.2rem !important;*/
  /*}*/
  /*}*/

  /*@media only screen and (max-width: 1440px) {*/
  /*.head .hea-cont .heacont-tit h2 {*/
  /*font-size: 1.8rem !important;*/
  /*}*/

  /*.content .com-tit-hea .com-tit {*/
  /*font-size: 1.1rem !important;*/
  /*}*/
  /*}*/

  /*@media only screen and (max-width: 1366px) {*/

  /*}*/
</style>
