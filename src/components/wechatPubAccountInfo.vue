<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <h2>成都双流国际机场微信公众号信息统计分析</h2>
      <div class="top-gif"></div>
      <div class="horologe">
        <em class="el-icon-time"></em>
        <!-- <span id="div1">2018-10-09 11:55:56</span> -->
        <span v-cloak>{{ disposeDate }}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="cont-top">
        <!-- 用户总数 -->
        <div class="use-total com01-top">
          <div class="com01-border">
            <div class="com-tit-hea">
              <span class="red-sign com-span"></span>
              <span class="com-tit com-span">用户总数</span>
              <span class="tit-gif com-span"></span>
            </div>
            <h2 class="com-num">{{ userData.total }}</h2>
            <div class="com-tit-hea two-floor">
              <div class="add-user">
                <span class="circle green-circle com-span"></span>
                <span class="txt com-span">新增用户数</span>
                <span class="tit-gif com-span"></span>
                <div class="bot-num">
                  <em class="green-add">＋</em>
                  <h2>{{ userData.addNum }}</h2>
                </div>
              </div>
              <div class="minus-user">
                <span class="circle red-circle com-span"></span>
                <span class="txt com-span">取消用户数</span>
                <span class="tit-gif com-span"></span>
                <div class="bot-num">
                  <em class="red-minus">－</em>
                  <h2>{{ userData.cancelNum }}</h2>
                </div>
              </div>

            </div>

          </div>
        </div>
        <!-- 用户趋势 -->
        <div class="use-tendency com01-top">
          <div class="com01-border">
            <div class="com-tit-hea">
              <span class="red-sign com-span"></span>
              <span class="com-tit com-span">关注用户趋势</span>
            </div>
            <div id="useTendency" class="usetendency-map"></div>
          </div>
        </div>
        <!-- 优惠券领取 -->
        <div class="discount-coupon com01-top">
          <div class="com01-border">
            <div class="com-tit-hea">
              <span class="red-sign com-span"></span>
              <span class="com-tit com-span">优惠券领取</span>
            </div>
            <div class="map-cont">
              <div id="discountDay" class="day-map map-frame"></div>
              <div id="discountYesterDay" class="yesterday-map map-frame"></div>
            </div>

          </div>
        </div>
      </div>
      <div class="cont-bottom">
        <div class="bot-lf com02-bot">
          <!-- 日模块点击数 -->
          <!-- <div class="daymodel"> -->
          <div class="com02-border">
            <div class="daymoduel-cont">
              <div class="daymond-tit">
                <h3>日模块点击数</h3>
                <div class="">
                  <span>今日</span> /
                  <span>昨日</span>
                </div>
              </div>
              <div id="dayMonduel" class="daymond-map"></div>
            </div>
          </div>
          <!-- </div> -->
        </div>
        <div class="bot-lr com02-bot">
          <div class="botlr-top">
            <div class="botlrtop-lf">
              <!-- 月模块点击数 -->
              <div class="month-module">
                <div class="com-tit-hea">
                  <span class="red-sign com-span"></span>
                  <span class="com-tit com-span" style="color: #ffffff">月模块点击数</span>
                </div>
                <div class="com03-border">
                  <ul>
                    <li class="mudel-list" v-for="(item,index) in monthMudelList" :key="index">
                      <em class="icon">
                        <img :src="item.iconSrc" />
                      </em>
                      <p class="mudelcom-tit">{{ item.demoName | turnName }}</p>
                      <p class="mudelcom-num">{{ item.clickNum }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 年模块点击数 -->
              <div class="year-module">
                <div class="com-tit-hea">
                  <span class="red-sign com-span"></span>
                  <span class="com-tit com-span" style="color: #ffffff">年模块点击数</span>
                </div>
                <div class="com03-border">
                  <ul>
                    <li class="mudel-list" v-for="(item,index) in yearMudelList" :key="index">
                      <!-- <em class="icon"></em> -->
                      <em class="icon"><img :src="item.iconSrc" /></em>
                      <p class="mudelcom-tit">{{ item.demoName | turnName }}</p>
                      <p class="mudelcom-num">{{ item.clickNum }}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="botlrtop-lr cont-top">
              <!-- 模块点击占比 -->
              <div class="com01-border">
                <div class="com-tit-hea">
                  <div class="comtithea-lf">
                    <span class="red-sign com-span"></span>
                    <span class="com-tit com-span">模块点击占比</span>
                  </div>
                  <div class="btn-cont">
                    <span @click="modelClickRate('month')" :class="{activebtn:cirBtnshows == 1}">月</span>
                    <span @click="modelClickRate('year')" :class="{activebtn:cirBtnshows == 2}">年</span>
                  </div>
                </div>
                <div id="mudelClickOccopy" class="mudelcli-occopy-map"></div>
              </div>
            </div>
          </div>
          <div class="botlr-bottom">
            <!-- 模块点击趋势 -->
            <div class="com02-border">
              <div class="module-tendency">
                <div class="daymond-tit">
                  <h3>模块点击趋势图</h3>
                  <div class="">
                    <span @click="createrMudelClickGraph('month')" :class="{activebtn:lineBtnshows == 1}">月</span>
                    <span @click="createrMudelClickGraph('year')" :class="{activebtn:lineBtnshows == 2}">年</span>
                  </div>
                </div>
                <div id="monduelClick" class="mudelclic-map"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import {WeChat} from '../API/wechatPubAccountInfo'
export default {
  name: "Echarts",
  created() {
    document.title = "成都双流国际机场微信公众号信息统计分析";
  },
  data() {
    return {
      date: new Date(),
      disposeDate: "",
      cirBtnshows: 1,
      lineBtnshows: 1,
      clickSign: "month",
      clickRateSign: "month",
      tendXName: "日",
      disposeImg: [],
      userData: {
        total: "",
        addNum: "",
        cancelNum: ""
      },
      monthMudelList: [],
      yearMudelList: [],
      useTendencyCont: "",
      discountDayCont: "",
      discountYesterDayCont: "",
      dayModuelCont: "",
      mudelClickOccopyCont: "",
      mudelClickCont: ""
    };
  },
  filters: {
    turnName: turnName
  },
  mounted() {
    const self = this;
    this.timer = setInterval(function() {
      self.date = new Date(); //修改数据date
      self.disposeDate = comm.dateFormat(self.date);
    }, 1000);

    self.getOneFloorInfo();
    self.getUserSummary();
    self.getTwoFloorInfo(self.clickRateSign);
    self.getBottomFloorInfo(self.clickSign, self.tendXName);
    self.createrDiscountDayGraph();
    self.createrDiscountYesterdayGraph();

    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getOneFloorInfo();
        self.getUserSummary();
        self.getTwoFloorInfo(self.clickRateSign);
        self.getBottomFloorInfo(self.clickSign, self.tendXName);
        self.createrDiscountDayGraph();
        self.createrDiscountYesterdayGraph();
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
    // 用户趋势
    createrUserTendencyGraph() {
      const self = this;
    },
    // 今日优惠券
    createrDiscountDayGraph() {
      const self = this;
      const id = "discountDay";
      const mapCont = self.discountDayCont;
      const centerTxt = "今日";
      const seriesTit = "今日优惠券";
      const legendBot = 20;
      const seriesRadius = ["50%", "70%"];
      const annularColor = ["#00baff", "#e8e8e8"];
      const leaendData = ["领取", "剩余"];
      // const annularDayData = data.day;
      const annularDayData = [
        { value: 60, name: "领取" },
        { value: 40, name: "剩余" }
      ];

      drawDiscount(
        self,
        id,
        mapCont,
        centerTxt,
        seriesTit,
        legendBot,
        seriesRadius,
        annularColor,
        leaendData,
        annularDayData
      );
    },
    // 昨日优惠券
    createrDiscountYesterdayGraph() {
      const self = this;
      const id = "discountYesterDay";
      const mapCont = self.discountYesterDayCont;
      const centerTxt = "昨日";
      const seriesTit = "昨日优惠券";
      const legendBot = 20;
      const seriesRadius = ["50%", "70%"];
      const annularColor = ["#00baff", "#e8e8e8"];
      const leaendData = ["领取", "剩余"];
      // const annularDayData = data.yesterday;
      const annularDayData = [
        { value: 80, name: "领取" },
        { value: 20, name: "剩余" }
      ];

      drawDiscount(
        self,
        id,
        mapCont,
        centerTxt,
        seriesTit,
        legendBot,
        seriesRadius,
        annularColor,
        leaendData,
        annularDayData
      );
    },
    // 日模块点击数
    createrDaymoduelGraph() {
      const self = this;
      const yAxisData = [
        "操作演示",
        "酒店服务",
        "机场商业",
        "中转流程",
        "中转优惠",
        "楼内导航",
        "在线值机",
        "航班查询"
      ];
      const contData = [7, 4, 5, 6, 8, 9, 14, 20];
      drawDaymoduel(self, yAxisData, contData);
    },
    //模块点击占比
    modelClickRate(sign) {
      const self = this;
      if (sign === "month") {
        self.cirBtnshows=1;
        self.getTwoFloorInfo(self, sign);
      } else {
        self.cirBtnshows=2;
        self.getTwoFloorInfo(self, sign);
      }
    },
    createrMudelClickOccopyGraph(data, yData) {
      const self = this;
      const id = "mudelClickOccopy";
      const mapCont = self.mudelClickOccopyCont;
      const centerTxt = "";
      const seriesTit = "模块点击占比";
      const legendBot = -3;
      const seriesRadius = ["40%", "50%"];
      const annularColor = [
        "#00baff",
        "#3de7c9",
        "#f5222d",
        "#d900ff",
        "#a3ff40",
        "#ff55af",
        "#ffffff",
        "#1d58ff"
      ];
      const leaendData = yData;
      const datalist = [];
      turnCommPrice(data, [], datalist);
      const annularDayData = datalist;

      drawDiscount(
        self,
        id,
        mapCont,
        centerTxt,
        seriesTit,
        legendBot,
        seriesRadius,
        annularColor,
        leaendData,
        annularDayData
      );
    },
    //模块点击趋势图
    createrMudelClickGraph(sign) {
      let self = this;
      if (sign === "month") {
        self.lineBtnshows=1;
        self.tendXName = "日";
        self.getBottomFloorInfo( sign, self.tendXName);
      } else {
        self.lineBtnshows=2;
        self.tendXName = "月";
        self.getBottomFloorInfo( sign, self.tendXName);
      }
    },
    async getUserSummary(){
      let self = this;
      await  WeChat.getUserSummary().then(function (result) {
        if (result.status === 200){
          const data = result.data;
          // 用户总数addNum cancelNum
          self.userData.addNum = data.new_user;
          self.userData.cancelNum = data.cancel_user;
        }else {
          comMessageTips(self, result);
        }
      })
    },
    async getOneFloorInfo(){
      let self = this;
      await WeChat.getOneFloorInfo().then(function (result) {
        if (result.status === 200) {
          const data = result.data;
          // 用户总数
          self.userData.total = data.total;
//          self.userData = {
//            total: data.total
//          };
          // 用户趋势
          const xAxisData = data.list;
          drawUserTendency(self, xAxisData);

        } else {
          comMessageTips(self, result);
        }
      })
    },
    async getTwoFloorInfo(sign){
      let self = this;
      await WeChat.getTwoFloorInfo().then(function (result) {
        if (result.status === 200) {
          const data = result.data;
          // 日模块点击数
          let yData = [];
          let barContList = [];
          let yesterdayList = [];
          for (var i = 0; i < data.td.length; i++) {
            switch (data.td[i].demoName) {
              case "flight":
                yData.push("航班查询");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "checkIn":
                yData.push("在线值机");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "map":
                yData.push("楼内导航");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "transfer":
                yData.push("中转优惠");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "etcd":
                yData.push("中转流程");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "shop":
                yData.push("机场商业");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "hotel":
                yData.push("酒店服务");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
              case "video":
                yData.push("操作演示");
                barContList.push(data.td[i].today);
                yesterdayList.push(data.td[i].yesterday);
                break;
            }
          }

          drawDaymoduel(self, yData, barContList, yesterdayList);
          // 月模块点击数
          turnCommPrice(data.month, [], []);
          self.monthMudelList = data.month;
          // 年模块点击数
          turnCommPrice(data.year, [], []);
          self.yearMudelList = data.year;
          // 模块点击占比
          let contData = [];

          if (sign === "month") {
            contData = data.month;
          } else {
            contData = data.year;
          }
          self.createrMudelClickOccopyGraph(contData, yData);
        } else {
          comMessageTips(self, result);
        }
      })
    },
    async getBottomFloorInfo(sign, xAxisName){
      let self = this;
      await  WeChat.getBottomFloorInfo({unit:sign}).then(function (result) {
        if (result.status === 200) {
          const data = result.data;
          // 模块点击趋势图
          drawMudelClick(self, data, xAxisName);
        } else {
          comMessageTips(self, result);
        }
      })
    }
  }
};



// 环形图转换
function turnCommPrice(dataList, turnNamelist, turnList) {
  for (var i = 0; i < dataList.length; i++) {
    switch (dataList[i].demoName) {
      case "flight":
        dataList[i].iconSrc = require("../../static/img/hanbancx.png");
        turnNamelist.push("航班查询");
        turnList.push({
          name: "航班查询",
          value: dataList[i].clickNum
        });
        break;
      case "checkIn":
        dataList[i].iconSrc = require("../../static/img/zaixianzj.png");
        turnNamelist.push("在线值机");
        turnList.push({
          name: "在线值机",
          value: dataList[i].clickNum
        });
        break;
      case "map":
        dataList[i].iconSrc = require("../../static/img/jichandit.png");
        turnNamelist.push("楼内导航");
        turnList.push({
          name: "楼内导航",
          value: dataList[i].clickNum
        });
        break;
      case "transfer":
        dataList[i].iconSrc = require("../../static/img/zhonzhuanyh.png");
        turnNamelist.push("中转优惠");
        turnList.push({
          name: "中转优惠",
          value: dataList[i].clickNum
        });
        break;
      case "etcd":
        dataList[i].iconSrc = require("../../static/img/zhonzhuanliuc.png");
        turnNamelist.push("中转流程");
        turnList.push({
          name: "中转流程",
          value: dataList[i].clickNum
        });
        break;
      case "shop":
        dataList[i].iconSrc = require("../../static/img/jichansy.png");
        turnNamelist.push("机场商业");
        turnList.push({
          name: "机场商业",
          value: dataList[i].clickNum
        });
        break;
      case "hotel":
        dataList[i].iconSrc = require("../../static/img/jiudianfw.png");
        turnNamelist.push("酒店服务");
        turnList.push({
          name: "酒店服务",
          value: dataList[i].clickNum
        });
        break;
      case "video":
        dataList[i].iconSrc = require("../../static/img/caozuoys.png");
        turnNamelist.push("操作演示");
        turnList.push({
          name: "操作演示",
          value: dataList[i].clickNum
        });
        break;
    }
  }
  return dataList;
  return turnNamelist;
  return turnList;
}
// 转换名称
function turnName(name) {
  switch (name) {
    case "flight":
      name = "航班查询";
      break;
    case "checkIn":
      name = "在线值机";
      break;
    case "map":
      name = "楼内导航";
      break;
    case "transfer":
      name = "中转优惠";
      break;
    case "etcd":
      name = "中转流程";
      break;
    case "shop":
      name = "机场商业";
      break;
    case "hotel":
      name = "酒店服务";
      break;
    case "video":
      name = "操作演示";
      break;
  }
  return name;
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

/*
关注用户趋势图表
*/
function drawUserTendency(self, Data) {
  const xAxisData = [];
  const numValue = [];
  for (var i = 0; i < Data.length; i++) {
    xAxisData.push(Data[i].refDate);
    numValue.push(Data[i].cumulateUser);
  }
  self.useTendencyCont = echarts.init(document.getElementById("useTendency"));
  var option = {
    backgroundColor: "", //背景颜色透明
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    grid: {
      left: 0,
      top: 0,
      right: 25,
      bottom: "5%",
      containLabel: true
    },
    xAxis: {
      name: "天",
      nameTextStyle: {
        color: "#545f71"
      },
      nameGap: 8,
      type: "category",
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#545f71"
      }
    },
    yAxis: {
      type: "value",
      splitLine: { show: false }, //去除网格线
      show: false //隐藏y轴
    },
    color: ["#1DB0B8", "#37C6C0", "#D0E9FF", "#c7353a", "#f5b91e"],
    series: [
      {
        name: "趋势",
        type: "line",
        symbol: "none", //这句就是去掉点的
        smooth: true,
        itemStyle: {
          color: "#00c0ff",
          normal: {
            lineStyle: {
              // 系列级个性化折线样式
              color: "#00c0ff",
              width: 3,
              type: "solid"
            }
          },
          emphasis: {
            color: "#6A5ACD",
            lineStyle: {
              // 系列级个性化折线样式
              width: 2,
              type: "dotted",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1E90FF"
                },
                {
                  offset: 1,
                  color: "#0000FF"
                }
              ])
            }
          }
        }, //线条样式
        areaStyle: {
          normal: {
            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(80,141,255,0.39)"
              },
              {
                offset: 0.34,
                color: "rgba(56,155,255,0.25)"
              },
              {
                offset: 1,
                color: "rgba(38,197,254,0.00)"
              }
            ])
          }
        }, //区域颜色渐变
        data: numValue
      }
    ]
  };
  self.useTendencyCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.useTendencyCont.resize();
  });
}
/*
优惠券领取图表
今日
昨日
模块点击占比
*/

function drawDiscount(self,id,mapCont,centerTxt,seriesTit,legendBot,seriesRadius,annularColor,leaendData,annularDayData) {
  mapCont = echarts.init(document.getElementById(id));
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {d}%"
    },
    legend: {
      icon: "rect",
      bottom: legendBot,
      left: "center",
      width: "85%",
      itemWidth: 10,
      itemHeight: 10,
      data: leaendData,
      textStyle: {
        color: "#ced1d6"
      }
    },
    grid: {
      containLabel: true
    },
    color: annularColor,
    graphic: [
      {
        //设置饼状图内部文字
        type: "text",
        left: "42%", //设置偏移量
        top: "32%",
        z: 2,
        zlevel: 100,
        style: {
          text: centerTxt,
          x: 100,
          y: 100,
          textAlign: "center",
          fill: "#ffffff",
          width: 30,
          height: 30,
          textFont: "bold 19px verdana"
        }
      }
    ],
    series: [
      {
        name: seriesTit,
        type: "pie",
        radius: seriesRadius,
        center: ["50%", "38%"],
        selectedMode: "single",
        hoverOffset: 5,
        label: {
          normal: {
            show: true,
            formatter: "{d}%\n{b} ",
            position: "outside",
            color: "#e8e8e8"
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 3
          }
        },
        data: annularDayData
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  mapCont.setOption(option, true);
  window.addEventListener("resize", function() {
    mapCont.resize();
  });
}
/*
日模块点击数
 */
function drawDaymoduel(self, yAxisData, contData, yesterdayList) {
  self.dayModuelCont = echarts.init(document.getElementById("dayMonduel"));

  let maxpoint = Math.max.apply(null, contData);
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
  let _bgshow = [];
  for (let j = 0; j < contData.length; j++) {
    _bgshow.push(maxpoint)
  }

  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    grid: {
      top: "3%",
      left: "20%",
      right: "20%"
    },
    xAxis: [
      {
        type: "value",
        show: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "category",
        position: "left",
        data: yAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#ced0d3",
            fontSize: 12
          }
        },
        nameTextStyle: {
          fontSize: 16,
          color: "#ced0d3"
        },
        splitLine: {
          show: false
        }
      },
      {
        type: "category",
        position: "left",
        data: yAxisData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#ced0d3",
            fontSize: 12
          }
        },
        nameTextStyle: {
          fontSize: 16,
          color: "#ced0d3"
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: "",
        type: "bar",
        barWidth: 20, //柱图宽度
        silent: true,
        yAxisIndex: 0,
        label: {
          normal: {
            show: true,
            color: "#fff",
            formatter: function(data) {
              // return contData[data.dataIndex];
              return (
                contData[data.dataIndex] + "/" + yesterdayList[data.dataIndex]
              );
            },
            position: "right",
            textStyle: {
              color: "#ff7e00",
              fontSize: 16
            }
          }
        },
        itemStyle: {
          normal: {
            color: "transparent"
          }
        },
        data: _bgshow
      },
      {
        name: "",
        type: "bar",
        barWidth: 20,
        silent: false,
        yAxisIndex: 1,
        label: {
          normal: {
            show: true,
            position: "insideRight",
            formatter: "   ",
            color: "#fff"
          }
        },
        itemStyle: {
          emphasis: {},
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#09394e" },
              { offset: 1, color: "#01bad5" }
            ])
          }
        },
        data: contData
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  self.dayModuelCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.dayModuelCont.resize();
  });
}

/*
模块点击趋势图
*/
function drawMudelClick(self, contData, xAxisName) {
  let legendData = [];
  turnCommPrice(contData, legendData, []);
  let seriesColor = [
    "#00baff",
    "#3de7c9",
    "#f5222d",
    "#d900ff",
    "#a3ff40",
    "#ff55af",
    "#ffffff",
    "#1d58ff"
  ];
  let xaxisList = [];
  let serieData = [];
  let newData = [];
  for (let i = 0; i < contData.length; i++) {
    let arr = [];
    for (let j = 0; j < contData[i].clickList.length; j++) {
      arr.push(contData[i].clickList[j].clickNum);
    }
    serieData.push(arr);
  }
  $.each(contData[0].clickList, function(index, item) {
    xaxisList.push(item.createDate); //挨个取出类别并填入类别数组
  });

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
      data: serieData[v]
    };
    newData.push(serie);
  }

  self.mudelClickCont = echarts.init(document.getElementById("monduelClick"));
  var option = {
    backgroundColor: "", //背景颜色透明
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    legend: {
      x: "left",
      icon: "rect", //icon为圆角矩形
      left: "center",
      bottom: -5,
      itemWidth: 10,
      itemHeight: 10,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#9ca3ad",
        fontSize: 14
      }
    },
    grid: {
      left: 0,
      top: "10%",
      right: "3%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      name: xAxisName,
      type: "category",
      boundaryGap: false,
      data: xaxisList,
      axisLine: {
        lineStyle: {
          color: "#525e70",
          width: 2
        }
      },
      axisLabel: {
        color: "#9da3ad"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      name: "次",
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
    series: newData
  };
  // 使用刚指定的配置项和数据显示图表。
  self.mudelClickCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.mudelClickCont.resize();
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.body-bg {
  width: 99%;
  // height: 1080px;
  height: 1042px;
  padding: 1% 0.5%;
  background-color: #0b1326;
  position: relative;
  overflow: hidden;
}
.head {
  position: relative;
  text-align: center;
  h2 {
    height: 46px;
    line-height: 46px;
    color: #ffffff;
    font-size: 38px;
    font-weight: bold;
    font-family: "Microsoft Yahei", Arial, sans-serif;
  }
  .top-gif {
    width: 844px;
    height: 76px;
    line-height: 76px;
    margin: 0 auto;
    background-image: url("../../static/img/top_anmition.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
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
.activebtn{
  background: #ff7e00 !important;
  color: #162639 !important;
}
.content {
  .com-tit-hea {
    overflow: hidden;
    width: 100%;
    .comtithea-lf {
      width: 77%;
      float: left;
      overflow: hidden;
    }
    .com-span {
      float: left;
      display: inline-block;
    }
    .red-sign {
      width: 6px;
      height: 26px;
      margin-top: 8px;
      margin-right: 18px;
      background-color: #e20000;
    }
    .com-tit {
      color: #809292;
      font-size: 18px;
      height: 40px;
      line-height: 40px;
    }
    .tit-gif {
      width: 60%;
      height: 40px;
      opacity: 1;
      background-image: url("../../static/img/textsign_anmtion.gif");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: left top;
    }
    .btn-cont {
      float: right;
      width: 23%;
      font-size: 16px;
      color: #ff7e00;
      span {
        background: #162239;
        padding: 8px;
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .cont-top {
    overflow: hidden;
    width: 100%;
    height: 224px;
    white-space: nowrap;
    .com01-top {
      height: 224px;
      float: left;
      margin: 0 0.5%;
    }
    .com01-border {
      height: 100%;
      border-style: solid;
      border-width: 15px 37px;
      border-image: url("../../static/img/border01.png") 15 37 fill;
      -webkit-border-image: url("../../static/img/border01.png") 15 37 fill; /* Safari 5 */
      -o-border-image: url("../../static/img/border01.png") 15 37 fill; /* Opera */
      background: none;
    }
    .use-total {
      width: 41.5%;
      height: 86%;
      .com-num {
        font-family: HighlandGothicFLF;
        font-size: 26px;
        color: #ffffff;
        margin-left: 24px;
      }
      .two-floor {
        margin-top: 15px;
        margin-left: 24px;
        overflow: hidden;
        .circle {
          width: 16px;
          height: 16px;
          margin-top: 12px;
          margin-right: 8px;
          border-radius: 50%;
        }
        .txt {
          line-height: 40px;
          font-size: 15px;
          color: #ffffff;
        }
        .tit-gif {
          width: 50%;
        }
        .bot-num {
          overflow: hidden;
          .green-add {
            color: #00ff91;
            line-height: 35px;
            float: left;
            font-weight: bold;
          }
          .red-minus {
            color: #ff3b00;
            line-height: 35px;
            float: left;
            font-weight: bold;
          }
          h2 {
            font-family: HighlandGothicFLF;
            font-size: 26px;
            color: #ffffff;
          }
        }
        .add-user {
          width: 50%;
          float: left;
          .green-circle {
            background-color: #00ff91;
          }
          .bot-num {
            clear: both;
          }
        }
        .minus-user {
          width: 50%;
          float: left;
          .red-circle {
            background-color: #f93d6a;
          }
          .bot-num {
            clear: both;
          }
        }
      }
    }
    .use-tendency {
      width: 27%;
      height: 86%;
      .usetendency-map {
        width: 100%;
        height: 80%;
      }
    }
    .discount-coupon {
      width: 28%;
      height: 86%;
      .map-cont {
        overflow: hidden;
        .map-frame {
          width: 50%;
          height: 175px;
        }
        .day-map {
          float: left;
        }
        .yesterday-map {
          float: left;
        }
      }
    }
  }
  .cont-bottom {
    margin-top: 25px;
    width: 100%;
    // height: 645px;
    height: 665px;
    overflow: hidden;
    white-space: nowrap;
    .com02-bot {
      height: 645px;
      margin: 0 0.5%;
      display: inline-block;
    }
    .com02-border {
      height: 92%;
      border-style: solid;
      border-width: 26px 37px 24px 200px;
      border-image: url("../../static/img/left_border_bg.png") 26 37 27 200 fill;
      border-image: url("../../static/img/left_border_bg.png") 26 37 27 200 fill;
      -webkit-border-image: url("../../static/img/left_border_bg.png") 26 37 27
        200 fill;
      -o-border-image: url("../../static/img/left_border_bg.png") 26 37 27 200
        fill;
      background: none;
    }
    .bot-lf {
      width: 20%;
      height: 100%;
      float: left;
      position: relative;
      .daymoduel-cont {
        width: 90%;
        position: absolute;
        left: 10%;
        top: 5%;
        .daymond-tit {
          overflow: hidden;
          h3 {
            float: left;
            font-size: 22px;
            color: #ffffff;
            line-height: 36px;
            font-weight: normal;
          }
          div {
            float: right;
            font-size: 16px;
            width: 95px;
            height: 36px;
            line-height: 36px;
            color: #ff7e00;
            background: #162239;
            text-align: center;
            span {
              display: inline;
              cursor: pointer;
            }
          }
        }
        .daymond-map {
          width: 100%;
          height: 540px;
        }
      }
    }
    .bot-lr {
      width: 78%;
      height: 100%;
      float: left;
      .botlr-top {
        width: 100%;
        height: 350px;
        overflow: hidden;
        white-space: nowrap;
        .botlrtop-lf {
          width: 70%;
          // height: 165px;
          overflow: hidden;
          float: left;
          .com03-border {
            width: 100%;
            height: 112px;
            border-style: solid;
            border-width: 14px 14px;
            border-image: url("../../static/img/center_border_bg.png") 14 14;
            background: none;
            ul {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .mudel-list {
            // width: 112px;
            width: 12.5%;
            height: 100%;
            padding: 10px 0;
            text-align: center;
            display: inline-block;
            color: #00c0ff;
            white-space: nowrap;
            .icon {
              width: 40px;
              height: 40px;
              margin: 0 auto 8px auto;
              display: block;
              // background-image: url("../../static/img/feiji.png");
              // background-position: 100% 100%;
              // background-repeat: no-repeat;
            }
            .mudelcom-tit {
              font-size: 15px;
            }
            .mudelcom-num {
              font-size: 24px;
              font-weight: bold;
            }
          }
        }
        .botlrtop-lr {
          float: right;
          width: 26.5%;
          margin-right: 0.5%;
          height: 100%;
          .com01-border {
            height: 91%;
            .com-tit-hea {
              overflow: visible;
            }
            .red-sign {
              margin-right: 8%;
            }
            .mudelcli-occopy-map {
              clear: both;
              width: 100%;
              height: 270px;
            }
          }
        }
      }
      .botlr-bottom {
        margin-top: 20px;
        margin-right: 0.5%;
        width: 99.5%;
        height: 320px;
        position: relative;
        .com02-border {
          height: 76%;
          .module-tendency {
            width: 97%;
            position: absolute;
            left: 2.8%;
            top: 7.3%;
            .daymond-tit {
              overflow: hidden;
              h3 {
                float: left;
                font-size: 22px;
                color: #ffffff;
                line-height: 36px;
                font-weight: normal;
              }
              div {
                float: right;
                margin-right: 2.1%;
                font-size: 16px;
                color: #ff7e00;
                span {
                  background: #162239;
                  padding: 8px;
                  display: inline-block;
                  margin-left: 5px;
                  cursor: pointer;
                }
              }
            }
            .mudelclic-map {
              width: 100%;
              height: 218px;
            }
          }
        }
      }
    }
  }
}


@media screen and (min-width: 1024px) {
  .head h2{font-size: 25px;}
  .head .top-gif{width: 630px;}
  .content .cont-bottom .com02-bot{
    margin: 0 1%;
  }
  .content .com-tit-hea .red-sign{
    height: 20px;
    margin-top: 11px;
    margin-right: 10px;
    }
    .content .com-tit-hea .com-tit{
      font-size: 15px;
    }
    .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit h3,
    .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit h3{
      font-size: 15px;
    }
    .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit div{
    font-size: 12px;
    width: 65px;
    height: 30px;
    line-height: 30px;
    }
    .content .com-tit-hea .btn-cont{margin-top: 11px;}
    .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .mudel-list .icon img{
  width: 100%;
  height: 100%;
}
    .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .mudel-list .icon{
      width: 35px;
      height: 35px;
    }
    .content .com-tit-hea .btn-cont span,
    .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit div span{
      font-size: 12px;
      padding: 2px;
    }
    .content .cont-top .com01-border{
    border-width: 15px 20px;
    }
  .content .cont-bottom .com02-border{
    border-width: 26px 37px 24px 165px;
  }
  .content .cont-bottom .bot-lr{
    width: 76%;
  }
  .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .mudel-list{
    width: 12.5%;
  }
  .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .mudel-list .mudelcom-tit{
    font-size: 12px;
  }
  .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .mudel-list .mudelcom-num{
    font-size: 19px;
  }
}
@media screen and (min-width: 1366px) {

}
@media screen and (min-width: 1680px) {
  .head h2{font-size: 36px;}
  .head .top-gif{width: 800px;}
  .content .com-tit-hea .com-tit{
      font-size: 18px;
  }
  .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit h3,
  .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit h3{
    font-size: 18px;
  }
  .content .com-tit-hea .red-sign{
    height: 24px;
    margin-top: 9px;
    margin-right: 10px;
  }
  .content .com-tit-hea .btn-cont span,
  .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit div span{
      font-size: 14px;
      padding: 6px;
  }
  .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit div{
    font-size: 14px;
    width: 80px;
    height: 30px;
    line-height: 30px;
  }

}

@media screen and (min-width: 1920px) {
  .head h2{font-size: 38px;}
  .head .top-gif{width: 844px;}
  .content .com-tit-hea .com-tit{
      font-size: 18px;
  }
  .content .com-tit-hea .red-sign{
    height: 26px;
    margin-top: 8px;
    margin-right: 18px;
  }
  .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit h3,
  .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit h3{
    font-size: 22px;
  }
  .content .cont-bottom .bot-lf .daymoduel-cont .daymond-tit div{
    font-size: 16px;
    width: 95px;
    height: 36px;
    line-height: 36px;
  }
  .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf{
    width: 72%;
  }
  .content .cont-bottom .bot-lr .botlr-top .botlrtop-lf .com03-border{
    width: 97%;
  }
  .content .com-tit-hea .btn-cont span,
  .content .cont-bottom .bot-lr .botlr-bottom .com02-border .module-tendency .daymond-tit div span{
      font-size: 16px;
      padding: 8px;
  }
}



</style>
