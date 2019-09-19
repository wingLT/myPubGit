<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <span class="comicon healf-icon"></span>
      <h2>安检部门旅客人流量实时监控大屏</h2>
      <span class="comicon healr-icon"></span>
    </div>
    <!-- 内容 -->
    <div class="contaion">
      <div class="cont-head">
        <span class="tit-icon"></span>
        <span class="white tit">未来两小时航班座位与旅客人数信息</span>
        <span class="lr-icon"></span>
      </div>
      <div class="cont-box">
        <div class="cont-lf comm-con commodel-bg">
          <div class="access-box">
            T1
          </div>
          <div class="flight-msg">
            <div class="flight-tit white">
              <span>航班</span>
              <span>起飞时间</span>
              <span>普通舱座位数</span>
              <span>预估上座率</span>
              <span>已安检人数</span>
            </div>
            <div class="flight-tag">
              <div id="scrollMsg">
                <div
                  class="msg-list"
                  :style="index%2===0?'background:rgba(255, 255, 255, 0.1);':'background: rgba(135, 227, 255, 0.4);'"
                  v-for="(item,index) in T1TableData"
                  :key="index"
                >
                  <span>{{ item.flightNo }}</span>
                  <span>{{ item.timeStartPlan | turnTime }}</span>
                  <span>{{ item.normalSeat }}</span>
                  <span>{{ item.per }}</span>
                  <span>{{ item.verify }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="classify-box">
            <div class="classify">
              <span class="class-name"><i class="bg-blue"></i>预估出港旅客</span>
              <span class="class-price blue">预估值<i class="white">人</i></span>
            </div>
            <div class="classify">
              <span class="class-name"><i class="bg-green"></i>已安检旅客</span>
              <span class="class-price green">{{ T1Blockdata.verified }}<i class="white">人</i></span>
            </div>
            <div class="classify">
              <span class="class-name"><i class="bg-orange"></i>未安检旅客</span>
              <span class="class-price orange">{{ T1Blockdata.unVerified }}<i class="white">人</i></span>
            </div>
          </div>
          <div
            class="linemap"
            id="drawT1map"
          ></div>
        </div>
        <div class="cont-lr comm-con commodel-bg">
          <div class="access-box">
            T2
          </div>
          <div class="flight-msg">
            <div class="flight-tit white">
              <span>航班</span>
              <span>起飞时间</span>
              <span>普通舱座位数</span>
              <span>预估上座率</span>
              <span>已安检人数</span>
            </div>
            <div class="flight-tag">
              <div id="scrollMsg">
                <div
                  class="msg-list"
                  :style="index%2===0?'background:rgba(255, 255, 255, 0.1);':'background: rgba(135, 227, 255, 0.4);'"
                  v-for="(item,index) in T2TableData"
                  :key="index"
                >
                  <span>{{ item.flightNo }}</span>
                  <span>{{ item.timeStartPlan | turnTime }}</span>
                  <span>{{ item.normalSeat }}</span>
                  <span>{{ item.per }}</span>
                  <span>{{ item.verify }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="classify-box">
            <div class="classify">
              <span class="class-name"><i class="bg-blue"></i>预估出港旅客</span>
              <span class="class-price blue">预估值<i class="white">人</i></span>
            </div>
            <div class="classify">
              <span class="class-name"><i class="bg-green"></i>已安检旅客</span>
              <span class="class-price green">{{ T2Blockdata.verified }}<i class="white">人</i></span>
            </div>
            <div class="classify">
              <span class="class-name"><i class="bg-orange"></i>未安检旅客</span>
              <span class="class-price orange">{{ T2Blockdata.unVerified }}<i class="white">人</i></span>
            </div>
          </div>
          <div
            class="linemap"
            id="drawT2map"
          ></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
// import DateTool from "../../static/js/DateUtils.js";
function turnTimeFun(value) {
  if (value === "" || value === null) {
    return value = "--";
  } else {
    value = value.substring(11, 16);
    return value;
  }
}
export default {
  name: "Echarts",
  created() {
    document.title = "安检部门旅客人流量实时监控大屏";
  },
  data() {
    return {
      T1TableData: [],
      T2TableData: [],
      T1Blockdata: {},
      T2Blockdata: {},
      T1Bardata: [],
      T2Bardata: [],
      lightData: [],
      linePillData: []
    };
  },
  mounted() {
    const self = this;
    self.$nextTick(function () {
        self.initData();
    });
  },
  beforeDestroy() {
    // if (this.timer) {
    //   clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    // }
  },
  destroyed() {
    // clearInterval(this.pageTimes);
  },
  filters: {
    turnTime: turnTimeFun
  },
  methods: {
    initData() {
        let self = this;
        getContentData(self);
        getTwoBlockData(self);
        getPerHourskData(self);
        setTimeout(function () {
          self.initData()
        }, 60000)
    },
  }
};

/*
获取未来两小时航班座位与旅客人数信息
*/
function getContentData(self) {
  $.ajax({
    type: "GET",
    url: comm.latePassUrl + "/flight/2hour",
    success: function(result) {
      if (result.status === 200) {
        let data = result.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].terminall === "T1") {
            self.T1TableData = data[i].detail;
          } else {
            self.T2TableData = data[i].detail;
          }
        }
      } else {
        comMessageTips(self, result);
      }
    },
    error: function(result) {
      console.log("error!");
    }
  });
}
/*
获取
T1，T2已安检和未安检旅客数信息
*/
function getTwoBlockData(self) {
  $.ajax({
    type: "GET",
    url: comm.latePassUrl + "/passenger/count",
    success: function(result) {
      if (result.status === 200) {
        let data = result.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].terminall === "T1") {
            self.T1Blockdata = data[i];
          } else {
            self.T2Blockdata = data[i];
          }
        }
      } else {
        comMessageTips(self, result);
      }
    },
    error: function(result) {
      console.log("error!");
    }
  });
}
/*
获取T1，T2每小时过安检旅客人数信息
*/
function getPerHourskData(self) {
  $.ajax({
    type: "GET",
    url: comm.latePassUrl + "/passenger/countByHour",
    success: function(result) {
      if (result.status === 200) {
        let data = result.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].terminall === "T1") {
            self.T1Bardata = data[i].detail;
            drawLinePillMap(self, "drawT1map", self.T1Bardata);
          } else {
            self.T2Bardata = data[i].detail;
          }
        }
      } else {
        comMessageTips(self, result);
      }
    },
    error: function(result) {
      console.log("error!");
    }
  });
}
/*
公用提示消息
*/
function comMessageTips(self, result) {
  self.$message({
    type: "error",
    message: result.msg
  });
}
//折线柱形图
function drawLinePillMap(self, id, realBarData) {
  var dataInfo = [
    {
      name: "real",
      count: [
        {
          name: "real",
          point: "4-5",
          total: 1
        },
        {
          name: "real",
          point: "5-6",
          total: 9
        },
        {
          name: "real",
          point: "6-7",
          total: 35
        },
        {
          name: "real",
          point: "7-8",
          total: 39
        },
        {
          name: "real",
          point: "8-9",
          total: 38
        },
        {
          name: "real",
          point: "9-10",
          total: 29
        },
        {
          name: "real",
          point: "10-11",
          total: 22
        },
        {
          name: "real",
          point: "11-12",
          total: 23
        },
        {
          name: "real",
          point: "12-13",
          total: 29
        },
        {
          name: "real",
          point: "13-14",
          total: 25
        },
        {
          name: "real",
          point: "14-15",
          total: 24
        },
        {
          name: "real",
          point: "15-16",
          total: 22
        },
        {
          name: "real",
          point: "16-17",
          total: 16
        },
        {
          name: "real",
          point: "17-18",
          total: 0
        },
        {
          name: "real",
          point: "18-19",
          total: 0
        },
        {
          name: "real",
          point: "19-20",
          total: 0
        },
        {
          name: "real",
          point: "20-21",
          total: 0
        },
        {
          name: "real",
          point: "21-22",
          total: 0
        },
        {
          name: "real",
          point: "22-23",
          total: 0
        },
        {
          name: "real",
          point: "23-0",
          total: 0
        },
        {
          name: "real",
          point: "0-1",
          total: 0
        },
        {
          name: "real",
          point: "1-2",
          total: 0
        },
        {
          name: "real",
          point: "2-3",
          total: 0
        },
        {
          name: "real",
          point: "3-4",
          total: 0
        }
      ]
    },
    {
      name: "plan",
      count: [
        {
          name: "plan",
          point: "4-5",
          total: 1
        },
        {
          name: "plan",
          point: "5-6",
          total: 16
        },
        {
          name: "plan",
          point: "6-7",
          total: 34
        },
        {
          name: "plan",
          point: "7-8",
          total: 38
        },
        {
          name: "plan",
          point: "8-9",
          total: 37
        },
        {
          name: "plan",
          point: "9-10",
          total: 32
        },
        {
          name: "plan",
          point: "10-11",
          total: 20
        },
        {
          name: "plan",
          point: "11-12",
          total: 31
        },
        {
          name: "plan",
          point: "12-13",
          total: 21
        },
        {
          name: "plan",
          point: "13-14",
          total: 29
        },
        {
          name: "plan",
          point: "14-15",
          total: 21
        },
        {
          name: "plan",
          point: "15-16",
          total: 26
        },
        {
          name: "plan",
          point: "16-17",
          total: 24
        },
        {
          name: "plan",
          point: "17-18",
          total: 30
        },
        {
          name: "plan",
          point: "18-19",
          total: 26
        },
        {
          name: "plan",
          point: "19-20",
          total: 18
        },
        {
          name: "plan",
          point: "20-21",
          total: 20
        },
        {
          name: "plan",
          point: "21-22",
          total: 22
        },
        {
          name: "plan",
          point: "22-23",
          total: 18
        },
        {
          name: "plan",
          point: "23-0",
          total: 7
        },
        {
          name: "plan",
          point: "0-1",
          total: 3
        },
        {
          name: "plan",
          point: "1-2",
          total: 5
        },
        {
          name: "plan",
          point: "2-3",
          total: 8
        },
        {
          name: "plan",
          point: "3-4",
          total: 0
        }
      ]
    }
  ];
  var el = echarts.init(document.getElementById(id));
  var legendData = [];
  var barData = [];
  var lineData = [];
  var xAxisData = [];
  var bgMaxData = [];
  // 源数据
  for (let i = 0; i < dataInfo.length; i++) {
    if (dataInfo[i].name == "real") {
      dataInfo[i].name = "实际安检人数";
      legendData.push(dataInfo[i].name);
      for (let j = 0; j < dataInfo[i].count.length; j++) {
        // lineData.push(dataInfo[i].count[j].total);
        // barData.push(dataInfo[i].count[j].total);
        // barData = realBarData;
        // xAxisData.push(dataInfo[i].count[j].point);
      }
    } else {
      dataInfo[i].name = "预估出港旅客";
      legendData.push(dataInfo[i].name);
      for (let j = 0; j < dataInfo[i].count.length; j++) {
        // barData.push(dataInfo[i].count[j].total);
        lineData.push(dataInfo[i].count[j].total);
      }
    }
  }
  // 处理数据
  for(let x=0;x < realBarData.length;x++){
    barData.push(realBarData[x].count);
    // xAxisData.push(dataInfo[i].count[j].point);
    xAxisData.push(realBarData[x].i);
  }
  var maxpoint = Math.max.apply(null, barData);
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
  for (var j = 0; j < dataInfo[0].count.length; j++) {
    dataInfo[0].count[j].maxpoint = maxpoint;
    bgMaxData.push(dataInfo[0].count[j].maxpoint);
  }
  var option = {
    //  backgroundColor: "#0e2a43",
    // color: ["#3398DB", "#ff733f"],
    color: ["#ff733f","#3398DB"],
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
      right: "1%",
      top: "8%",
      bottom: "10%",
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: "rect",
      bottom: "-5",
      left: "center",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        color: "#7c7f88",
        fontSize: 14
      }
    },
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: -30,
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
    yAxis: {
      name: "人",
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

    series: [
      {
        name: "实际安检人数",
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
                color: "#b523e0"
              },
              {
                offset: 1,
                color: "#284be2"
              }
            ])
          }
        },
        data: barData
      },
      {
        name: "预估出港旅客",
        //  yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
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
          show: true,
          normal: {
            color: "#33f1ff"
          }
        }, //拐点样式
        lineStyle: {
          // 系列级个性化折线样式
          width: 2,
          type: "solid",
          color: "#33f1ff"
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
  el.setOption(option, true);
  window.addEventListener("resize", function() {
    el.resize();
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
  height: 1080px;
  // height: 96vh;
  // height: 100vh;
  // height: 98%;
  // padding: 2vh 0.5%;
  padding: 0 0.5%;
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
  // height: 8%;
  position: relative;
  text-align: center;
  span {
    position: absolute;
    vertical-align: top;
    width: 40%;
    top: -15%;
    display: inline-block;
    height: 120px;
    background: url("../../static/img/donxian.gif") no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
  }
  .healf-icon {
    left: 0;
    transform: rotate(180deg);
  }
  .healr-icon {
    right: 0;
  }
  h2 {
    position: relative;
    height: 85px;
    line-height: 85px;
    display: inline-block;
    color: #ffffff;
    font-size: 33px;
    // font-family: chinese;
    font-weight: bold;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#0cf0ff),
      to(#138dff)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
// 公用颜色
.white {
  color: #ffffff;
}
.shallow-red {
  color: #dc375f;
}
.green {
  color: #79f167;
}
.blue {
  color: #33f1ff;
}
.orange {
  color: #ffb128;
}
.bg-blue {
  background: #33f1ff;
}
.bg-green {
  background-color: #79f167;
}
.bg-orange {
  background-color: #ffb128;
}

/*==================== 样式开始====================*/
.contaion {
  width: 100%;
  position: relative;
  overflow: hidden;
  .cont-head {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 15px;
    span {
      display: inline-block;
    }
    .tit-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 152px;
      height: 40px;
      background: url("../../static/img/tit-icon.png") no-repeat;
      background-position: 100% 100%;
      background-size: 100% 100%;
    }
    .tit {
      margin-left: 32px;
      margin-right: 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .lr-icon {
      width: 272px;
      height: 32px;
      background: url("../../static/img/late_passage_anima.gif") no-repeat;
      background-size: contain;
      background-position: left top;
      vertical-align: middle;
    }
  }
  .cont-box {
    width: 100%;
    display: flex;
    .comm-con {
      width: 48%;
      height: 898px;
      display: inline;
      border-style: solid;
      border-width: 15px 15px;
      border-image: url("../../static/img/lflr-bg.png") 15 15 fill;
    }
    .commodel-bg {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .cont-lf {
      margin-right: 1%;
    }
    .cont-lr {
    }
    .comm-con {
      .access-box {
        width: 176px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        color: rgb(51, 241, 255);
        font-weight: bolder;
        font-family: "Microsoft Yahei", Arial, sans-serif;
        font-size: 26px;
        background: url("../../static/img/titbg.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
      .flight-msg {
        margin-top: 15px;
        width: 100%;
        position: relative;
        overflow: hidden;
        .flight-tit {
          height: 40px;
          line-height: 40px;
          border: none;
          border-radius: 5px;
          background: rgba(135, 227, 255, 0.4);
          filter: blur(0px);
          span {
            display: inline-block;
          }
          span:nth-child(1) {
            width: 18%;
            text-align: center;
          }
          span:nth-child(2) {
            width: 20%;
            text-align: center;
          }
          span:nth-child(3) {
            width: 21%;
            text-align: center;
          }
          span:nth-child(4) {
            width: 18%;
            text-align: center;
          }
          span:nth-child(5) {
            width: 20%;
            text-align: center;
          }
        }
        .flight-tag {
          height: 291px;
          overflow: hidden;
          div {
            color: #79f167;
            font-weight: bold;
            height: 39px;
            line-height: 39px;
            margin: 8px 0;
            border-radius: 5px;
            span {
              display: inline-block;
            }
            span:nth-child(1) {
              width: 18%;
              text-align: center;
            }
            span:nth-child(2) {
              width: 18%;
              text-align: center;
            }
            span:nth-child(3) {
              width: 21%;
              text-align: center;
            }
            span:nth-child(4) {
              width: 18%;
              text-align: center;
            }
            span:nth-child(5) {
              width: 20%;
              text-align: center;
            }
          }
        }
      }
      .classify-box {
        width: 98%;
        height: 92px;
        border-style: solid;
        border-width: 15px 11px 16px 8px;
        border-image: url("../../static/img/accessbord.png") 15 11 16 8 fill;
        overflow: hidden;
        .classify {
          width: 33.3%;
          height: 100%;
          float: left;
          i {
            display: inline-block;
            font-style: normal;
          }
          span {
            display: block;
          }
          .class-name {
            height: 25px;
            line-height: 25px;
            color: #b0b2b5;
            font-size: 16px;
            padding: 10px 0 0 15px;
            i {
              margin-right: 10px;
              vertical-align: middle;
              width: 7px;
              height: 25px;
            }
          }
          .class-price {
            padding-left: 30px;
            height: 55px;
            line-height: 55px;
            font-size: 28px;
            font-weight: bold;
            i {
              font-size: 15px;
            }
          }
        }
      }
      .linemap {
        margin-top: 10px;
        width: 100%;
        // height: 354px;
        height: 370px;
      }
    }
  }
}
/*==================== 样式开始====================*/

@media only screen and (max-width: 1660px) {
}
@media only screen and (max-width: 1550px) {
}
@media only screen and (max-width: 1440px) {
}
@media only screen and (max-width: 1366px) {
}
@media only screen and (max-width: 1280px) {
}
@media only screen and (max-width: 1152px) {
}
@media only screen and (max-width: 1024px) {
}
</style>
<style>
#swiperPaginTwo .swiper-pagination-bullet {
  width: 48px;
  height: 12px;
  margin: 0 8px;
  border-radius: 0;
  background-color: #055143 !important;
  opacity: 1;
}
#swiperPaginTwo .swiper-pagination-bullet-active {
  background: #03a567 !important;
  opacity: 1;
}
</style>
