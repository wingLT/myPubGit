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
          <div class="heacont-titbg"></div>
          <span class="heatit-lf com-borgif"></span>
          <h2>晚到旅客、已安检旅客统计分析大屏</h2>
          <span class="heatit-lr com-borgif"></span>
        </div>
        <div class="icon-lr comm-heagif">
          <span
            class="icongif"
            style="float:left;"
          ></span>
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
        <div class="cont-lf">
          <div class="lf-position">
            <!-- 晚到旅客 -->
            <div class="contlf-top flow-border">
              <div class="com-tit-hea">
                <span class="blue-sign com-span"></span>
                <span class="com-tit com-span">当前晚到旅客</span>
                <span class="bedeck-gif com-span"></span>
              </div>
              <div class="passenger-price">
                总计<span>{{ latePassengerTotal }}</span>人
              </div>
            </div>
            <!-- 安检区晚到旅客统计 -->
            <div class="contlf-bottom flow-border">
              <div class="com-tit-hea">
                <span class="blue-sign com-span"></span>
                <span class="com-tit com-span">安检区晚到旅客统计</span>
              </div>
              <div
                id="securityLatePasseng"
                class="late-passage"
              ></div>
            </div>
          </div>
        </div>
        <div class="cont-lr lr-insidebord">
          <div class="lr-cont">
            <div class="lrcont-top flow-border">
              <div class="floor-one">
                <div class="com-tit-hea">
                  <span class="blue-sign com-span"></span>
                  <span class="com-tit com-span">安检区域每小时安检旅客</span>
                </div>
                <div
                  id="securityHoursPasseng"
                  class="hours-passage"
                ></div>
              </div>
            </div>
            <div class="lrcont-bottom flow-border">
              <div class="floor-two">
                <div class="com-tit-hea">
                  <span class="blue-sign com-span"></span>
                  <span class="com-tit com-span">出港飞行航班数统计分析</span>
                </div>
                <div
                  id="clearportFlight"
                  class="clearport-flight"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottombord"></div> -->
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import DateTool from "../../static/js/DateUtils.js";
import {lastPassenger} from "../API/lastPassenger"
export default {
  name: "Echarts",
  created() {
    document.title = "晚到旅客、已安检旅客统计分析大屏";
  },
  data() {
    return {
      date: "",
      disposeDate: "",
      latePassengerTotal: "",

      securityLatePassengCont: "",
      securityLatePasseng: [],

      securityHoursPassengCont: "",
      securityHoursPasseng: [],

      clearportFlightCont: "",
      clearportFlight: []
    };
  },
  mounted() {
    const self = this;
    this.timer = setInterval(function() {
      self.date = new Date(); //修改数据date
      self.disposeDate = comm.dateFormat(self.date);
    }, 1000);

    self.getLatePassengerTotal();
    self.getSecurityLatePassage();
    self.getSecurityHoursPassage();
    self.getClearportFlightlClick();
    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getLatePassengerTotal();
        self.getSecurityLatePassage();
        self.getSecurityHoursPassage();
        self.getClearportFlightlClick();
      }, 180000);
    }
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
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化

    // 安检区晚到旅客统计
    securityLatePassengGrahp() {
      const self = this;
    },
    // 安检区域每小时安检旅客
    securityHoursPassengGrahp() {
      const self = this;
    },
    // 出港飞行航班数统计分析
    clearportFlightGrghp() {
      const self = this;
    },

    /*
    获取晚到旅客总数
    */
    async getLatePassengerTotal() {
      let self = this;
      let result;
      let data = await lastPassenger.getLatePassengerTotal(result).then((result) => {
        if (result.status === 200) {
          self.latePassengerTotal = result.data;
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },

    /*
    获取安检区晚到旅客统计数据信息
    */

    async getSecurityLatePassage() {
      let self = this;
      let result;
      let data = await lastPassenger.getSecurityLatePassage(result).then((result) => {
        if (result.status === 200) {
          drawSecurityLatePassage(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },
    /*
    获取安检区域每小时安检旅客数据信息
    */
    async getSecurityHoursPassage() {
      let self = this;
      let result;
      let data = await lastPassenger.getSecurityHoursPassage(result).then((result) => {
        if (result.status === 200) {
          drawSecurityHoursPassage(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },
    /*
    获取出港飞行航班数统计分析数据信息
    */
    async getClearportFlightlClick() {
      let self = this;
      let result;
      let data = await lastPassenger.getClearportFlightlClick(result).then((result) => {
        if (result.status === 200) {
          drawClearportFlightlClick(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
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

/*
安检区晚到旅客统计
*/
function drawSecurityLatePassage(self, dataInfo) {
  self.securityLatePassengCont = echarts.init(
    document.getElementById("securityLatePasseng")
  );
  let legendData = [];
  let xAxisData = [];
  let seriesData = [];
  let contData = [];
  for (let i = 0; i < dataInfo.length; i++) {
    legendData.push(dataInfo[i].name + "分钟");
    let arrDatas = [];
    for (let j = 0; j < dataInfo[i].count.length; j++) {
      arrDatas.push(dataInfo[i].count[j].total);
    }
    seriesData.push(arrDatas);
  }
  for (let k = 0; k < dataInfo[0].count.length; k++) {
    xAxisData.push(dataInfo[0].count[k].point);
  }

  // console.log(legendData)
  // console.log(xAxisData)
  // console.log(seriesData)

  let seriesColor = ["#48b3ff", "#64e5c1", "#a95ec3"];
  for (var v = 0; v < legendData.length; v++) {
    var serie = {
      name: legendData[v],
      type: "bar",
      barWidth: 14,
      barGap: 0.5, //柱间距离
      label: {
        //图形上的文本标签
        normal: {
          show: true,
          position: "right",
          textStyle: {
            color: "#e9ead9",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 12
          }
        }
      },
      itemStyle: {
        //图形样式
        normal: {
          color: seriesColor[v]
        }
      },
      zlevel: 9,
      data: seriesData[v]
    };
    contData.push(serie);
  }
  let iconList = {
    type: "pictorialBar",
    symbol:
      "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABMUlEQVRoQ+2aoU4DYRCEZ3uSF2l7fRkMmub6AKCrcHV9AdIQFBKPxiF7oYfBIbAIkia9aSBpgYQQuhlxm+zvZ7PzfXJ/GyzqO7R2/jgZLhHw2WBRk0QL4Joopk3Vf4nU47PAbmEC7yDmRDFrqv5bhCI/CnwV4atZ76J3xMv6pFx3ucivBfZFyGcYpqtxeQOzvakuFfqzwLciDyxw1pyO7ru0/Mcu/yqwW3rT2vHTZHjbpRIHFSAxXlXlVRYQEkgDQpiuUWnAhU0YSgNCmK5RacCFTRhKA0KYrlFpwIVNGEoDQpiuUWnAhU0YSgNCmK5RacCFTRhKA0KYrlFpwIVNGEoDQpiuUWnAhU0YSgNCmK5RacCFTRg6yEDYExPJmEc+Rj2zEkEP3WG/GkT/7BH6u80WK8dsQAaGofUAAAAASUVORK5CYII=",

    symbolSize: [30, 60],
    symbolRotate: 180,
    symbolOffset: [-36, 0],
    symbolBoundingData: 300,
    data: [1, 2, 3, 4],
    zlevel: 100,
    z: 100
  };
  contData.push(iconList);

  var option = {
    tooltip: {
      trigger: "axis",
      formatter: function(params) {
        var rest = params[0].name + "<br />";
        var unit = params[0].name.substring(
          params[0].name.indexOf("(") + 1,
          params[0].name.indexOf(")")
        );
        for (var i = 0; i < params.length - 1; i++) {
          rest +=
            params[i].marker +
            " " +
            params[i].seriesName +
            "：" +
            params[i].data +
            unit +
            "<br />";
        }
        return rest;
      }
    },
    legend: {
      icon: "rect",
      left: "120",
      top: "-5",
      right: "0",
      itemWidth: 14,
      itemHeight: 14,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#ffffff",
        fontSize: 12
      }
    },
    grid: {
      left: "12%",
      right: "13%",
      bottom: "12%",
      top: 40
    },
    yAxis: [
      {
        name: "指廊",
        type: "category",
        boundaryGap: true, //坐标轴两边留白
        data: xAxisData,
        axisLabel: {
          interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          margin: 20,
          textStyle: {
            color: "#9eaab3",
            fontSize: 14
          }
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#9fa49b"
          }
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false
        }
      }
    ],
    xAxis: [
      {
        name: "人",
        type: "value",
        axisLabel: {
          show: true,
          textStyle: {
            color: "#9eaab3",
            fontSize: 14
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#9fa49b"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: contData
  };
  self.securityLatePassengCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.securityLatePassengCont.resize();
  });
}
/*
安检区域每小时安检旅客
*/
function drawSecurityHoursPassage(self, dataInfo) {
  self.securityHoursPassengCont = echarts.init(
    document.getElementById("securityHoursPasseng")
  );

  let seriesColor = ["#00baff", "#3de7c9", "#f5222d", "#b96bc6"];
  let legendData = [];
  let xaxisList = [];
  let metaDate = [];
  let serieData = [];

  for (let i = 0; i < dataInfo.length; i++) {
    legendData.push(dataInfo[i].name);
    let arrGroup = [];
    for (let j = 0; j < dataInfo[i].count.length; j++) {
      arrGroup.push(dataInfo[i].count[j].total);
    }
    metaDate.push(arrGroup);
  }
  for (let k = 0; k < dataInfo[0].count.length; k++) {
    xaxisList.push(dataInfo[0].count[k].point);
  }
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
      right: "0",
      itemWidth: 20,
      itemHeight: 20,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#ffffff",
        fontSize: 15
      }
    },
    grid: {
      left: "0",
      top: "10%",
      right: "1%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      name: "时",
      type: "category",
      boundaryGap: false,
      data: xaxisList,
      axisLine: {
        lineStyle: {
          color: "#525e70",
          width: 1
        }
      },
      axisLabel: {
        interval: 0,
        color: "#9da3ad"
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
          color: "#7a8290",
          width: 1
        }
      },
      axisLabel: {
        color: "#9da3ad"
      },
      axisTick: {
        show: false
      }
    },
    color: seriesColor,
    series: serieData
  };
  // 使用刚指定的配置项和数据显示图表。
  self.securityHoursPassengCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.securityHoursPassengCont.resize();
  });
}

/*
出港飞行航班数统计分析
*/
// function drawMudelClick(self, contData) {
function drawClearportFlightlClick(self, dataInfo) {
  self.clearportFlightCont = echarts.init(
    document.getElementById("clearportFlight")
  );
  let legendData = [];
  let barData = [];
  let lineData = [];
  let xAxisData = [];
  let bgMaxData = [];
  for (let i = 0; i < dataInfo.length; i++) {
    if (dataInfo[i].name == "real") {
      dataInfo[i].name = "实际";
      legendData.push(dataInfo[i].name);
      for (let j = 0; j < dataInfo[i].count.length; j++) {
        lineData.push(dataInfo[i].count[j].total);
        xAxisData.push(dataInfo[i].count[j].point);
      }
    } else {
      dataInfo[i].name = "计划";
      legendData.push(dataInfo[i].name);
      for (let j = 0; j < dataInfo[i].count.length; j++) {
        barData.push(dataInfo[i].count[j].total);
      }
    }
  }
  let maxpoint = Math.max.apply(null, barData);
  if (maxpoint < 50) {
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
  for (let j = 0; j < dataInfo[0].count.length; j++) {
    dataInfo[0].count[j].maxpoint = maxpoint;
    bgMaxData.push(dataInfo[0].count[j].maxpoint);
  }
  // console.log(legendData);
  // console.log(maxpoint);
  // console.log(bgMaxData);

  var option = {
    color: ["#3398DB", "#ff733f"],
    tooltip: {
      trigger: "axis", //鼠标经过提示
      formatter: function(params) {
        var rest = params[0].name + "<br />";
        var unit = params[0].name.substring(
          params[0].name.indexOf("(") + 1,
          params[0].name.indexOf(")")
        );
        for (var i = 0; i < params.length - 1; i++) {
          rest +=
            params[i].seriesName + "：" + params[i].data + unit + "<br />";
        }
        return rest;
      }
    },
    grid: {
      left: "1%",
      right: "5%",
      top: "15%",
      bottom: "10%",
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: "rect",
      top: "-5",
      right: "45",
      itemWidth: 20,
      itemHeight: 20,
      textStyle: {
        color: "#fff",
        fontSize: 16
      }
    },
    xAxis: {
      type: "category",
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
        textStyle: {
          color: "#9fa49b"
        }
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: "#9fa49b",
          opacity: 1
        }
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false
      },
      axisTick: {
        show: false
      },
      data: xAxisData
    },
    yAxis: [
      {
        name: "实际（架）",
        type: "value",
        min: 0,
        max: maxpoint,
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          // interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          textStyle: {
            color: "#9fa49b"
          }
        },
        axisLine: {
          //坐标轴轴线相关设置
          onZero: false,
          lineStyle: {
            color: "#9fa49b",
            opacity: 1
          }
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false
        },
        axisTick: {
          show: false
        }
      },
      {
        name: "计划（架）",
        type: "value",
        position: "right",
        min: 0,
        max: maxpoint,
        axisLabel: {
          textStyle: {
            color: "#9fa49b"
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#9fa49b"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: "计划",
        type: "bar",
        barWidth: 20,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#ffffff",
              fontSize: 12
            }
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#343cff"
              },
              {
                offset: 1,
                color: "#458efe"
              }
            ])
          }
        },
        data: barData
      },
      {
        name: "实际",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        smooth: true,
        type: "line",
        symbol: "circle",
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#ed00c1",
            fontSize: 14
          }
        },
        itemStyle: {
          normal: {
            color: "#ed00c1"
          }
        }, //拐点样式
        lineStyle: {
          // 系列级个性化折线样式
          width: 2,
          type: "solid",
          color: "#ed00c1"
        },
        data: lineData
      },
      {
        name: "",
        type: "bar",
        barWidth: 20,
        xAxisIndex: 0,
        // yAxisIndex: 1,
        // barGap: '-135%',
        barGap: "-100%",
        // data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        data: bgMaxData,
        itemStyle: {
          normal: {
            color: "#2e3c50"
          }
        },
        zlevel: -1
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  self.clearportFlightCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.clearportFlightCont.resize();
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
  .hea-cont {
    width: 100%;
    // overflow: hidden;

    .comm-heagif {
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
      position: relative;
      padding: 0 2%;
      display: inline-block;
      z-index: 99;
      .heacont-titbg {
        width: 100%;
        height: 80px;
        line-height: 80px;
        border-radius: 0 0 9px 9px;
        background: rgba(0, 0, 0, 0.7);
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
  position: relative;
  .com-tit-hea {
    overflow: hidden;
    width: 95%;
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
      margin-right: 1.5%;
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
      font-size: 1.3rem;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
    }
  }
  .flow-border {
    // width: 1252px;
    // width: 78.3%;
    height: 406px;
    border-style: solid;
    border-width: 14px;
    border-image: url("../../static/img/block_border.png") 14 fill;
    background: none;
  }
  .contain {
    position: relative;
    .cont-lf {
      width: 28.5%;
      float: left;
      position: relative;
      .lf-position {
        width: 100%;
        position: absolute;
        top: 0;
        left: 4.5%;
        z-index: 100;
        .flow-border {
          height: 200px;
        }
        .contlf-top {
          height: 200px;
          margin-top: 90px;
          margin-bottom: 32px;
          .com-tit-hea {
            margin: 2.5%;
          }
          .passenger-price {
            margin-top: 28px;
            margin-left: 7%;
            color: #ffffff;
            font-weight: normal;
            font-size: 30px;
            span {
              font-size: 38px;
              font-weight: bold;
              color: #4cb9ff;
            }
          }
        }
        .contlf-bottom {
          // height: 688px;
          height: 610px;
          .com-tit-hea {
            margin: 2.5%;
          }
          .late-passage {
            width: 100%;
            // height: 663px;
            height: 590px;
          }
        }
      }
    }
    .lr-insidebord {
    }
    .cont-lr {
      width: 66.2%;
      float: right;
      margin-right: 2%;
      .lr-cont {
        margin-top: 90px;
        position: relative;
        .lrcont-top {
          height: 408px;
          .floor-one {
            width: 92%;
            position: absolute;
            left: 2.5%;
            top: 3%;
            z-index: 100;
            .hours-passage {
              // width: 96%;
              width: 99%;
              height: 350px;
              margin-left: 1%;
            }
          }
        }
        .lrcont-bottom {
          // height: 464px;
          height: 394px;
          margin-top: 40px;
          .floor-two {
            width: 99%;
            position: absolute;
            bottom: -2.5%;
            left: 2.5%;
            z-index: 100;
            .clearport-flight {
              width: 100%;
              height: 370px;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .head .hea-cont .heacont-tit .heacont-titbg {
    width: 100%;
    height: 65px;
    line-height: 65px;
  }
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.1rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1rem !important;
  }
  .head .hea-cont .heacont-tit .heatit-lr {
    top: -24px;
  }
  .head .hea-cont .heacont-tit .heatit-lf {
    top: -24px;
  }
  .content .contain .cont-lr .lr-cont,
  .content .contain .cont-lf .lf-position .contlf-top {
    margin-top: 60px;
  }
  .head .horologe {
    top: 18px;
  }
  .content .com-tit-hea .blue-sign {
    border-width: 6px;
  }
  .content .contain .cont-lf .lf-position .contlf-top .passenger-price {
    font-size: 25px;
  }
}
@media screen and (min-width: 1366px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.3rem !important;
  }
}
@media screen and (min-width: 1680px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.8rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1.3rem !important;
  }
  .head .hea-cont .heacont-tit .heatit-lr {
    top: -18px;
  }
  .content .com-tit-hea .blue-sign {
    border-width: 8px;
  }
}
@media screen and (min-width: 1920px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 2.3rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1.3rem !important;
  }
  .head .hea-cont .heacont-tit .heatit-lr {
    top: -18px;
  }
  .content .com-tit-hea .blue-sign {
    border-width: 8px;
  }
  .head .hea-cont .heacont-tit .heacont-titbg {
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
  .head .hea-cont .heacont-tit .heatit-lr {
    top: -9px;
  }
  .head .hea-cont .heacont-tit .heatit-lf {
    top: -9px;
  }
  .content .contain .cont-lf .lf-position .contlf-top .passenger-price {
    font-size: 30px;
  }
}
</style>
