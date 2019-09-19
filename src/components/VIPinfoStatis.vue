<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="hea-cont">
        <div class="icon-lf comm-heagif">
          <span
            class="icongif"
            style="float:right;"
          ></span>
        </div>
        <div class="heacont-tit">
          <h2>成都双流国际机场贵宾信息统计分析</h2>
        </div>
        <div class="icon-lr comm-heagif">
          <span
            class="icongif"
            style="float:left;"
          ></span>
        </div>
      </div>
      <!-- <div class="horologe">
        <em class="el-icon-time"></em>
        <span v-cloak>{{ disposeDate }}</span>
      </div> -->
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="toplf-icon comm-boricon"></div>
      <div class="toplr-icon comm-boricon"></div>
      <div class="contain">
        <div class="cont-heatotal comm-heabg">
          <span class="comm-blcoktit task-total">今日任务总量</span>
          <span class="total-num">{{ taskTotal }}</span>
        </div>
        <div class="cont-top">
          <div
            class="area-block"
            v-for="(item,index) in todayDutyData"
            :key="index"
          >
            <div class="block-top comm-heabg">
              <span class="comm-blcoktit lf-tit">{{ item.region }}区-今日值班负责人</span>
              <span class="lr-name">{{ item.watchstander }}</span>
            </div>
            <ul>
              <li>
                <span class="comm-list-tit">任务数</span>
                <span class="comm-list-num yellow">{{ item.arrivalTotal + item.departTotal }}</span>
              </li>
              <li>
                <span class="comm-list-tit">已完成</span>
                <span class="comm-list-num yellow">{{ (item.arrivalTotal + item.departTotal) - (item.arrivalUnfinished + item.departUnfinished) }}</span>
              </li>
              <li>
                <span class="comm-list-tit">待完成</span>
                <span class="comm-list-num green">{{ item.arrivalUnfinished + item.departUnfinished }}</span>
              </li>
              <li>
                <span class="comm-list-tit">进港</span>
                <span class="comm-list-num cyan">{{ item.arrivalTotal }}</span>
              </li>
              <li>
                <span class="comm-list-tit">出港</span>
                <span class="comm-list-num purple">{{ item.departTotal }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="cont-bot">
          <div class="bot-lf">
            <div class="area-statis comm-heabg">
              <span class="comm-blcoktit">分区统计</span>
              <span class="icon-gif"></span>
            </div>
            <div
              id="partitionStatis"
              class="partition-statis"
            ></div>
          </div>
          <div class="bot-lr">
            <div class="duty-list comm-heabg">
              <span class="comm-blcoktit duty-list-tit">值班列表</span>
            </div>
            <div class="table-head">
              <table class="table">
                <tr>
                  <td width="10%"></td>
                  <td width="30%">部门</td>
                  <td width="25%">姓名</td>
                  <td width="35%">联系方式</td>
                </tr>
              </table>
            </div>
            <div
              id="tableContent"
              class="table-cont"
            >
              <div id="tableContOne">
                <table
                  class="table"
                  style="table-layout: fixed; word-break: break-all;"
                >
                  <tbody>
                    <tr
                      v-for="(item,index) in dutyList"
                      :key="index"
                    >
                      <td width="10%"><span class="sign-num">{{ index+1 }}</span></td>
                      <!-- <td width="30%">{{ item.value }}</td> -->
                      <td
                        width="30%"
                        class="departname app-li"
                      >
                        <p class="app-p">
                          <span class="oneprice">{{ item.value }}</span>
                          <span class="twoprice"></span>
                        </p>
                      </td>
                      <td
                        width="25%"
                        class="app-li"
                      >
                        <p class="app-p">
                          <span class="oneprice">{{ item.name }}</span>
                          <span class="twoprice"></span>
                        </p>
                      </td>
                      <td
                        width="35%"
                        class="app-li"
                      >
                        <p class="app-p">
                          <span class="oneprice">{{ item.phone }}</span>
                          <!-- <span class="oneprice">好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶</span> -->
                          <span class="twoprice"></span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="tableContTwo"></div>
            </div>

          </div>
        </div>
      </div>
      <div class="botlf-icon comm-boricon"></div>
      <div class="botlr-icon comm-boricon"></div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import DateTool from "../../static/js/DateUtils.js";
import {VIP} from '../API/VIPinfoStatis'
export default {
  name: "Echarts",
  created() {
    document.title = "成都双流国际机场贵宾信息统计分析";
  },
  data() {
    return {
      date: "",
      disposeDate: "",
      taskTotal: 0,
      todayDutyData: [],
      dutyList: [],
      areaStatisCont: ""
    };
  },
  mounted() {
    const self = this;
    self.getTotayDutyData();
    self.getAreaStatisData();
    self.getDutyListData();
//    getDutyListData(self);

    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getTotayDutyData();
        self.getAreaStatisData();
        self.getDutyListData();
//        getDutyListData(self);
      }, 180000);
    }
  },
  destroyed() {
    clearInterval(this.pageTimes);
  },
  methods: {
    // 安检区域每小时安检旅客
    securityHoursPassengGrahp() {
      const self = this;
    },
    /*
    获取VIP今日值班数据信息
    */
    async getTotayDutyData(){
      let self =  this;
      await VIP.getTotayDutyData().then(function (result) {
        if (result.status === 200) {
          self.todayDutyData = result.data;
          let data = result.data;
          self.taskTotal = 0;
          for (let i = 0; i < data.length; i++) {
            self.taskTotal += data[i].arrivalTotal + data[i].departTotal;
          }
        } else {
          comMessageTips(self, result);
        }
      })
    },
    /*
    获取VIP分区统计数据信息
    */
    async getAreaStatisData(){
      let self = this;
      await VIP.getAreaStatisData().then(function (result) {
        if (result.status === 200) {
          drawAreaStatis(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      })
    },
    /*
    获取VIP值班列表数据信息
    */
    async getDutyListData(){
      let self = this;
      await VIP.getDutyListData().then(function (result) {
        if (result.status === 200) {
          self.dutyList = result.data;
          self.$nextTick(() => {
            comm.scrollTop("tableContent", "tableContOne", "tableContTwo", 30);
          });
        } else {
          comMessageTips(self, result);
        }
      })
    }
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
/*
折线图
分区统计
*/
function drawAreaStatis(self, dataInfo) {
  self.areaStatisCont = echarts.init(
    document.getElementById("partitionStatis")
  );
  let seriesColor = ["#327ec8", "#da40c8", "#e8ce65", "#11ffd6"];
  let legendData = ["A", "C", "D", "F"];
  let xaxisList = [];
  let metaDate = [];
  let serieData = [];

  let Aarr = [];
  let Carr = [];
  let Darr = [];
  let Farr = [];
  for (let i = 0; i < dataInfo.length; i++) {
    xaxisList.push(dataInfo[i].datetime.substring(11, 16));
    Aarr.push(dataInfo[i].a);
    Carr.push(dataInfo[i].c);
    Darr.push(dataInfo[i].d);
    Farr.push(dataInfo[i].f);
  }
  metaDate.push(Aarr, Carr, Darr, Farr);
  // console.log(legendData)
  // console.log(xaxisList)
  // console.log(metaDate)

  for (var v = 0; v < legendData.length; v++) {
    var serie = {
      name: legendData[v],
      type: "line",
      symbol: "circle",
      itemStyle: {
        normal: {
          color: seriesColor[v]
        }
      }, //拐点样式
      lineStyle: {
        // 系列级个性化折线样式
        width: 1,
        type: "solid",
        color: seriesColor[v]
      },

      data: metaDate[v]
    };
    serieData.push(serie);
  }
  var option = {
    backgroundColor: "", //背景颜色透明
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    legend: {
      icon: "rect", //icon为圆角矩形
      top: "0",
      right: "2%",
      itemWidth: 10,
      itemHeight: 10,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#ffffff",
        fontSize: 13
      }
    },
    grid: {
      left: "3%",
      top: "10%",
      right: "3%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xaxisList,
      axisLine: {
        lineStyle: {
          color: "#808286",
          width: 1
        }
      },
      axisLabel: {
        interval: 5,
        color: "#ffffff"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      name: "人",
      nameGap: 8,
      type: "value",
      splitLine: { show: false }, //去除网格线
      axisLine: {
        lineStyle: {
          color: "#808286",
          width: 1
        }
      },
      axisLabel: {
        color: "#ffffff"
      },
      axisTick: {
        show: false
      }
    },
    color: seriesColor,
    series: serieData
  };
  // 使用刚指定的配置项和数据显示图表。
  self.areaStatisCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.areaStatisCont.resize();
  });
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
  // height: 1042px;
  height: 96vh;
  // height: 98%;
  // padding: 1% 0.5%;
  padding: 2vh 0.5%;
  background: url("../../static/img/vipbg.jpg");
  background-color: #02020b;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.head {
  overflow: hidden;
  height: 8%;
  position: relative;
  text-align: center;
  .hea-cont {
    width: 100%;
    .comm-heagif {
      display: inline-block;
      width: 30%;
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
      position: relative;
      padding: 0 2%;
      display: inline-block;
      z-index: 99;
      h2 {
        color: #ffffff;
        // font-size: 30px;
        font-size: 2.3rem;
        font-family: chinese;
        font-weight: bold;
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 bottom,
          from(#deeff7),
          to(#8bdaee)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
  width: 100%;
  height: 84%;
  position: relative;
  .contain {
    position: relative;
    height: 100%;
    width: 96%;
    margin: 0 2%;
    // margin-top: 80px;
    // margin-top: 13vh;
    margin-top: 3%;
    z-index: 99;
    .comm-heabg {
      overflow: hidden;
      padding: 0 2%;
      background: url("../../static/img/com-block-top.bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
    }
    .comm-blcoktit {
      font-size: 22px;
      color: #8befff;
      display: inline-block;
      float: left;
    }
    .cont-heatotal {
      width: 95.5%;
      height: 55px;
      margin: 0 auto;
      line-height: 55px;
      margin-bottom: 1.5%;
      .task-total {
        height: 100%;
      }
      .total-num {
        height: 100%;
        font-size: 40px;
        font-weight: bold;
        color: #00c0ff;
        margin-left: 23px;
        display: inline-block;
      }
    }
    .cont-top {
      overflow: hidden;
      width: 100%;
      // height: 280px;
      // height: 48vh;
      height: 37%;
      margin-bottom: 2%;
      // margin-bottom: 24px;
      display: flex;
      flex-direction: row;
      .area-block {
        width: 25%;
        height: 100%;
        // height: 280px;
        overflow: hidden;
        margin: 0 0.5%;
        .block-top {
          padding: 0 5%;
          height: 52px;
          line-height: 52px;
          overflow: hidden;
          .lf-tit {
          }
          .lr-name {
            display: inline-block;
            float: right;
            font-size: 21px;
            color: #ffffff;
          }
        }
        ul {
          width: 100%;
          // height: 75%;
          height: 79%;
          // height: 226px;
          background: #03080e;
          overflow: hidden;
          li {
            float: left;
            width: 33.3%;
            margin: 5.5% 0 0 0;
            text-align: center;
            span {
              width: 100%;
              display: block;
            }
            .comm-list-tit {
              line-height: 24px;
              font-size: 19px;
              color: #ffffff;
            }
            .comm-list-num {
              font-size: 40px;
              font-weight: bold;
            }
            .yellow {
              color: #fff600;
            }
            .green {
              color: #35dc01;
            }
            .cyan {
              color: #65f5f3;
            }
            .purple {
              color: #6700cc;
            }
          }
        }
      }
    }
    .cont-bot {
      overflow: hidden;
      height: 56%;
      .bot-lf {
        width: 74%;
        height: 100%;
        float: left;
        .area-statis {
          height: 54px;
          line-height: 54px;
          overflow: hidden;
          span {
            display: inline-block;
            float: left;
          }
          .comm-blcoktit {
          }
          .icon-gif {
            margin-left: 30px;
            width: 25%;
            height: 30px;
            margin-top: 11px;
            background: url("../../static/img/late_passage_anima.gif") no-repeat;
            background-size: 100% 100%;
            background-position: 100% 100%;
          }
        }
        .partition-statis {
          width: 100%;
          height: 77%;
          // height: 425px;
          // height: 24vh;
          background: rgba(3, 5, 9, 0.5);
        }
        .area-statis {
        }
      }
      .bot-lr {
        width: 24.5%;
        height: 100%;
        float: right;
        .duty-list {
          padding: 0 5%;
          .duty-list-tit {
            height: 54px;
            line-height: 54px;
          }
        }
        .table-head {
          width: 100%;
          height: 41px;
          line-height: 41px;
          background: #134458;
          .table {
            width: 100%;
            tr {
              width: 100%;
              td {
                text-align: center;
                font-size: 24px;
                color: #44c8c0;
              }
            }
          }
        }
        .table-cont {
          width: 100%;
          height: 66.5%;
          overflow: hidden;
          background: rgba(10, 39, 50, 0.6);
          .table {
            width: 100%;
            //奇数行
            tr:nth-of-type(odd) {
              background: rgba(8, 29, 43, 0.8);
            }
            //偶数行
            // tr:nth-of-type(even) {
            //   background: rgba(10, 39, 50, 0.8);
            // }
            tr {
              width: 100%;
              height: 45px;
              line-height: 45px;
              .sign-num {
                display: inline-block;
                width: 26px;
                height: 26px;
                line-height: 26px;
                border-radius: 50%;
                background: #1c5b68;
                color: #ffffff;
              }
              td {
                text-align: center;
                color: #44d3e4;
                font-size: 16px;
              }
              .departname {
                width: 30%;
              }
              // .app-li{
              .app-p {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
  .comm-boricon {
    position: absolute;
    z-index: 0;
  }
  .toplf-icon {
    width: 504px;
    height: 304px;
    left: -150px;
    top: -69px;
    background: url("../../static/img/viplf-top.gif") no-repeat;
    background-size: 100%;
    background-position: left top;
  }
  .toplr-icon {
    width: 296px;
    height: 296px;
    right: -13px;
    top: -69px;
    background: url("../../static/img/viplr-top.gif") no-repeat;
    background-size: 100%;
    background-position: right bottom;
    transform: rotate(-90deg);
  }
  .botlf-icon {
    width: 504px;
    height: 304px;
    left: -162px;
    bottom: -60px;
    background: url("../../static/img/viplf-bot.gif") no-repeat;
    background-size: 100%;
    background-position: left bottom;
  }
  .botlr-icon {
    width: 296px;
    height: 296px;
    right: -20px;
    bottom: -60px;
    background: url("../../static/img/viplr-bot.gif") no-repeat;
    background-size: 100%;
    background-position: right top;
    transform: rotate(90deg);
  }
}

@media screen and (min-width: 1024px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.4rem !important;
    line-height: 36px;
  }
  .content .contain .cont-heatotal {
    height: 50px;
    line-height: 50px;
  }
  .content .contain .cont-top .area-block ul li .comm-list-tit {
    font-size: 16px;
  }
  .content .contain .cont-top .area-block ul li .comm-list-num {
    font-size: 35px;
  }
  .content .contain .comm-blcoktit {
    font-size: 17px;
  }
  .content .contain .cont-heatotal .total-num{
    font-size: 32px;
    }
  .content .contain .cont-bot .bot-lr .table-cont .table tr td,
  .content .contain .cont-bot .bot-lr .table-head .table tr td {
    font-size: 13px;
  }
  .content .contain .cont-bot .bot-lr .table-cont .table tr .sign-num {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.3rem !important;
  }
}
@media screen and (min-width: 1660px) {
  .head .hea-cont .heacont-tit {
    padding: 0px 0%;
  }
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.8rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1.2rem !important;
  }
}
@media screen and (min-width: 1550px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.8rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1.2rem !important;
  }
}
@media screen and (min-width: 1440px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.8rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1.1rem !important;
  }
}
@media screen and (min-width: 1366px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.6rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1rem !important;
  }
}
@media screen and (min-width: 1680px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 2rem !important;
  }
  .content .contain .comm-blcoktit {
    font-size: 20px;
  }
  .content .contain .cont-bot .bot-lr .table-cont .table tr td,
  .content .contain .cont-bot .bot-lr .table-head .table tr td {
    font-size: 16px;
  }
}
@media screen and (min-width: 1920px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 2.3rem !important;
  }
  .content .contain .comm-blcoktit {
    font-size: 22px;
  }
  .content .contain .cont-bot .bot-lr .table-cont .table tr td,
  .content .contain .cont-bot .bot-lr .table-head .table tr td {
    font-size: 18px;
  }
   .content .contain .cont-top .area-block ul li .comm-list-tit {
    font-size: 18px;
  }
  .content .contain .cont-top .area-block ul li .comm-list-num {
    font-size: 40px;
  }
  .content .contain .cont-bot .bot-lr .table-cont .table tr .sign-num {
    width: 26px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
