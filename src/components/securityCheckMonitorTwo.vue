<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <span class="comicon healf-icon"></span>
      <h2>安检部门旅客人流量实时监控大屏</h2>
      <span class="comicon healr-icon"></span>
    </div>
    <div class="icon-head"></div>
    <div class="icon-foot"></div>
    <!-- 内容 -->
    <div class="two-contain">
      <div class="twoscar-lf">
        <div class="twolf-top">
          <div class="twolftop-lf comm-border commbg">
            <div class="comtit">
              <i class="tit-icon"></i>
              <span class="tit-name">各安检区域高峰小时</span>
            </div>
            <ul class="await-list">
              <li class="list-tit">
                <span
                  class=""
                  style="width: 18%;color: transparent;"
                >·</span>
                <span class="titname-one">高峰小时1</span>
                <span class="titname-two">高峰小时2</span>
              </li>
              <li
                class="list-row"
                v-for="(item,index) in channelHourData"
                :key="index"
              >
                <span :class="index === 0?'area-name shallow-red':index === 1?'area-name green':index === 2?'area-name blue':index === 3?'area-name orange':''">
                  <i :class="index === 0?'bgshallow-red':index === 1?'bggreen':index === 2?'bgblue':index === 3?'bgorange':''"></i>
                  {{ item.area }}
                </span>
                <span class="area-price">{{ item.detail[0].point }}</span>
                <span class="area-price">{{ item.detail[1].point }}</span>
              </li>
            </ul>
          </div>
          <div class="twolftop-lr commbg">
            <div
              class="map-box"
              id="ECG"
            >
            <img v-if="warningSign === -1?true:false" class="warging-icon" src="../../static/img/waringicon.png" alt="">
            </div>
            <div
              class="advice-text white"
              id="adviceBox"
            >
              <div id="adviceOne" style="display: inline-block;overflow: hidden;">
                <p
                  v-for="(item,index) in SecurityCheckInfo"
                  v-if="item.flag === -1"
                  :key="index"
                >{{ item.area }} -- {{ item.advice }}</p>
              </div>
              <div id="adviceTwo" style="display: inline-block;overflow: hidden;">
              </div>
            </div>
          </div>
        </div>
        <div class="twolf-bottom comm-border commbg">
          <div class="comtit">
            <i class="tit-icon"></i>
            <span class="tit-name">安检评价指标历史数据</span>
          </div>
          <div
            id="historyReleaseRate"
            class="release-rate draw-box"
          ></div>
          <!-- <div
            id="awaitTime"
            class="await-time draw-box"
          ></div> -->
        </div>
      </div>
      <div class="twoscar-lr comm-border commbg">
        <div class="comtit">
          <i class="tit-icon"></i>
          <span class="tit-name">安检通道开闭情况</span>
        </div>
        <div class="sign-icon">
          <span class="white"><i class="bgblue"></i>开启</span>
          <span class="white"><i class="bgshallow-red"></i>关闭</span>
        </div>
        <ul class="access-list">
          <li
            class="list-li"
            v-for="(item,index) in accessLockageInfo"
            :key="index"
          >
            <p class="white">{{ item.area }}安检区</p>
            <p class="access-icon">
            </p>
            <div class="access-name">
              <span
                class="white"
                v-for="(list,index) in item.detail"
                :key="index"
              >
                <i :class="list.working === true?'bgblue':'bgshallow-red'"></i>
                {{ list.channel }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import Swiper from "swiper";
import echarts from "echarts";
import comm from "./Common.vue";
import testAnimation from "../../static/js/testAnimation.js";
import {SecurityTwo} from '../API/securityCheckMonitorTwo'
export default {
  name: "Echarts",
  created() {
    document.title = "安检部门旅客人流量实时监控大屏";
  },
  data() {
    return {
      channelHourData: [],
      accessLockageInfo: [],
      SecurityCheckInfo: [],
      warningSign: null,
    };
  },
  mounted() {
    const self = this;
    self.$nextTick(function () {
        self.initData();
    });
  },

  methods: {
    initData() {
        let self = this;
        self.getSecurityCheckSuggestData(); //区域建议
        self.getSecurityAreaChannelHourData(); //各安检区域高峰小时
        self.getHistoryRateData(); //各安检区域历史放行速率
        self.getAccessLockageInfoData(); //安检通道开闭情况
        ECGAnimation(self);
        setTimeout(function () {
          self.initData()
        }, 180000)
    },
    //获取各安检区域高峰小时
    async getSecurityAreaChannelHourData(){
      let self = this;
      await SecurityTwo.getSecurityAreaChannelHourData().then(function (result) {
        if (result.status === 200) {
          self.channelHourData = result.data;
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取通道开启情况详情
    async getAccessLockageInfoData(){
      let self = this;
      await SecurityTwo.getAccessLockageInfoData().then(function (result) {
        if (result.status === 200) {
          self.accessLockageInfo = result.data;
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取各安检区域历史放行速率
    async getHistoryRateData(){
      let self = this;
      await SecurityTwo.getHistoryRateData().then(function (result) {
        if (result.status === 200) {
          let data = result.data;
          drawHistoryLine(
            self,
            "historyReleaseRate",
            "各安检区域历史放行速率",
            "人/小时",
            data
          );
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取各安检区域建议
    async getSecurityCheckSuggestData(){
      let self = this;
      await SecurityTwo.getSecurityCheckSuggestData().then(function (result) {
        if (result.status === 200) {
          self.SecurityCheckInfo = result.data;
          let data = result.data;
          for(let i=0;i<data.length;i++){
            if(data[i].flag === -1){//异常
              self.warningSign = -1
            }else{
              self.warningSign = 0
            }
          }
          self.$nextTick(() => {
            comm.scrollLeft("adviceBox", "adviceOne", "adviceTwo", 35);
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
心电图 动画
*/
var parts = 100; //切割数量
var imgIndex = 0;
function ECGAnimation(self) {
  // (function ($) {
  var op = {
    width_mt: 490, //外框容器宽度.(与图片宽度一致)
    height_mt: 400, //外框容器高度.(与图片高度一致)
    imgurl: require("../../static/img/ECGbg.jpg") //默认图片.
  };
  var cut_w = op.width_mt / parts; //小块宽度
  var cut_h = op.height_mt; //小块高度
  var $this = $("#ECG");

  //设置小div进行图片切割.
  for (var i = 0; i < parts; i++) {
    var div1 =
      '<div class="scut_mt" style=" \
		width:' +
      cut_w +
      "px; \
		height:" +
      cut_h +
      "px; \
		float:left;\
		display:inline;\
		background-image:url(" +
      op.imgurl +
      ");\
		background-repeat:no-repeat; \
		background-position:" +
      -i * cut_w +
      "px " +
      0 +
      'px"\
		></div>';
    $this.append(div1);
  }

  $(".scut_mt").css({ opacity: 0 });

  Jump();
  // })(jQuery)
}
function Jump() {
  $(".scut_mt:eq(" + imgIndex + ")").animate({ opacity: 1 }, 50, function() {
    $(".scut_mt:eq(" + imgIndex + ")").animate(
      { opacity: 0.3 },
      50,
      function() {
        if (imgIndex < parts - 1) {
          imgIndex++;
          Jump();
        } else {
          imgIndex = 0;
          $(".scut_mt").css({ opacity: 0 });
          Jump();
        }
      }
    );
  });
}
/*
心电图 图表
*/
// function drawBulkProgressbar(self, dataInfo) {
function drawECG(self, idName) {
  var el = echarts.init(document.getElementById(idName));
  var data = [
    ["2000-06-05", 150],
    ["2000-06-06", 150],
    ["2000-06-07", 150],
    ["2000-06-08", 150],
    ["2000-06-09", 100],
    ["2000-06-10", 200],
    ["2000-06-11", 100],
    ["2000-06-12", 20],
    ["2000-06-13", 300],
    ["2000-06-14", 150],
    ["2000-06-15", 150],
    ["2000-06-16", 150],
    ["2000-06-17", 100],
    ["2000-06-18", 200],
    ["2000-06-19", 100],
    ["2000-06-20", 20],
    ["2000-06-21", 300],
    ["2000-06-22", 150],
    ["2000-06-23", 150],
    ["2000-06-24", 150],
    ["2000-06-25", 100],
    ["2000-06-26", 200],
    ["2000-06-27", 100],
    ["2000-06-28", 20],
    ["2000-06-29", 300],
    ["2000-06-30", 150]

    // ["2000-07-01", 150],
    // ["2000-07-02", 150],
    // ["2000-07-03", 100],
    // ["2000-07-04", 200],
    // ["2000-07-05", 100],
    // ["2000-07-06", 20],
    // ["2000-07-07", 300],
    // ["2000-07-08", 150],
    // ["2000-07-09", 150],
    // ["2000-07-10", 150],
    // ["2000-07-11", 100],
    // ["2000-07-12", 200],
    // ["2000-07-13", 100],
    // ["2000-07-14", 20],
    // ["2000-07-15", 300],
    // ["2000-07-16", 150],
    // ["2000-07-17", 150],
    // ["2000-07-18", 150],
    // ["2000-07-19", 100],
    // ["2000-07-20", 200],
    // ["2000-07-21", 100],
    // ["2000-07-22", 20],
    // ["2000-07-23", 300],
    // ["2000-07-24", 150]
  ];

  var dateList = data.map(function(item) {
    return item[0];
  });
  var valueList = data.map(function(item) {
    return item[1];
  });

  function randomData() {
    var now = new Date(+now + oneDay);
    // value = Math.random() * 100;
    for (let i = 0; i < data.length; i++) {
      let value = data[i][1];
      return [
        [now.getFullYear(), now.getMonth(), now.getDate()].join("/"),
        Math.round(value)
      ];
    }
  }

  var now = +new Date(2018, 3, 31);
  var oneDay = 24 * 3600 * 1000;

  var option = {
    // backgroundColor: "#000000",
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }
    ],
    xAxis: [
      {
        splitLine: { show: false }
      },
      {
        show: false,
        data: dateList,
        gridIndex: 1
      }
    ],
    yAxis: [
      {
        show: false,
        splitLine: { show: false }
      },
      {
        show: false,
        splitLine: {
          show: false
        },
        gridIndex: 1
      }
    ],
    grid: [
      {
        // bottom: '60%'
      },
      {
        top: "30%"
      }
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        // data: valueList,
        data: [],
        areaStyle: {}
      },
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        lineStyle: {
          width: 2, //折线宽度
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 1,
            colorStops: [
              {
                offset: 0,
                color: "#28e544" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#011b04" // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  setInterval(function() {
    for (var i = 0; i < 1; i++) {
      data.shift();
      data.push(randomData());
      // data.push(data);
    }
    var dateList = data.map(function(item) {
      return item[0];
    });
    var valueList = data.map(function(item) {
      return item[1];
    });

    el.setOption({
      xAxis: [
        {
          show: false,
          // data: dateList
          data: []
        },
        {
          show: false,
          data: dateList,
          gridIndex: 1
        }
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          // data: valueList,
          data: [],
          areaStyle: {}
        },
        {
          type: "line",
          showSymbol: false,
          lineStyle: {
            width: 2, //折线宽度
            // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#28e544" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#011b04" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          },
          data: valueList,
          xAxisIndex: 1,
          yAxisIndex: 1
        }
      ]
    });
  }, 1000);

  // 使用刚指定的配置项和数据显示图表。
  el.setOption(option, true);
  window.addEventListener("resize", function() {
    el.resize();
  });
}

// 安检历史数据
function drawHistoryLine(self, id, tit, yTit, dataInfo) {
  var el = echarts.init(document.getElementById(id));

  let seriesColor = ["#dc375f", "#00e280", "#00c0ff", "#facd1e"];
  let legendData = [];
  let xaxisList = [];
  let metaDate = [];
  let serieData = [];

  for (let i = 0; i < dataInfo.length; i++) {
    legendData.push(dataInfo[i].area + "安检区");
    let arrGroup = [];
    for (let j = 0; j < dataInfo[i].detail.length; j++) {
      arrGroup.push(dataInfo[i].detail[j].rate);
    }
    metaDate.push(arrGroup);
  }
  for (let k = 0; k < dataInfo[0].detail.length; k++) {
    xaxisList.push(dataInfo[0].detail[k].point);
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
    title: {
      text: tit,
      left: "center",
      y: "-5",
      textStyle: {
        color: "#fff",
        fontSize: 18
      }
    },
    backgroundColor: "", //背景颜色透明
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    legend: {
      icon: "rect", //icon为圆角矩形
      bottom: "5%",
      center: "0",
      itemWidth: 10,
      itemHeight: 10,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#ffffff",
        fontSize: 12
      }
    },
    grid: {
      left: "0",
      top: "20%",
      right: "1%",
      // bottom: "20%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
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
        interval: 3,
        color: "#9da3ad"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      name: yTit,
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
  el.setOption(option, true);
  window.addEventListener("resize", function() {
    el.resize();
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../static/font/font.css";
@import "../../static/css/testAnimation.css";
@import "../../static/css/certify.css";
@import "../../static/css/swiper.min.css";
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
.carouse-head {
  position: absolute;
  left: 33.5%;
  top: 9%;
  width: 33.3%;
  height: 110px;
  background: url("../../static/img/lunbo-tou.png") no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  z-index: 10;
}
.carouse-foot {
  transform: rotate(180deg);
  position: absolute;
  left: 33%;
  bottom: 3%;
  width: 33.3%;
  height: 80px;
  background: url("../../static/img/lunbo-jio.png") no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  z-index: 10;
}
.head {
  overflow: hidden;
  // height: 8%;
  position: relative;
  text-align: center;
  span {
    position: absolute;
    vertical-align: top;
    width: 37%;
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
    height: 120px;
    line-height: 120px;
    display: inline-block;
    color: #0cf0ff;
    font-size: 39px;
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
  color: #00e280;
}
.blue {
  color: #00c0ff;
}
.orange {
  color: #facd1e;
}
.bgshallow-red {
  background-color: #dc375f;
}
.bggreen {
  background-color: #00e280;
}
.bgblue {
  background-color: #00c0ff;
}
.bgorange {
  background-color: #facd1e;
}
.icon-head {
  position: absolute;
  left: 34.2%;
  top: 8.7%;
  width: 33%;
  height: 110px;
  background: url("../../static/img/lunbo-tou.png") no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  z-index: 10;
}
.icon-foot {
  transform: rotate(180deg);
  position: absolute;
  left: 33.8%;
  bottom: 45.4%;
  width: 33%;
  height: 80px;
  background: url("../../static/img/lunbo-jio.png") no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  z-index: 10;
}
// 公用模块标题样式
.comtit {
  width: 100%;
  height: 24px;
  margin-bottom: 22px;
  .tit-icon {
    vertical-align: bottom;
    display: inline-block;
    width: 46px;
    height: 100%;
    margin-right: 5px;
    background: url("../../static/img/anjian-titicon.png") no-repeat;
    background-size: 100%;
    background-position: 100% 100%;
  }
  .tit-name {
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
  }
}
.await-list {
  width: 100%;
  .list-tit {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #1c1f22;
    overflow: hidden;
    span {
      text-align: center;
      display: inline-block;
      color: #bfbfbf;
      font-size: 20px;
    }
    .titname-one {
      width: 40%;
      // text-align: right;
    }
    .titname-two {
      width: 40%;
      // margin-right: 3%;
      // text-align: right;
    }
  }
  .list-row {
    width: 100%;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    border-bottom: 2px solid #35383c;
    span {
      display: inline-block;
      float: left;
    }
    .area-name {
      margin-left: 2%;
      width: 18%;
      text-align: left;
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    .area-price {
      width: 40%;
      text-align: center;
      color: #ffffff;
    }
  }
}
/*==================== 第二屏样式结束====================*/
.two-contain {
  width: 100%;
  position: relative;
  overflow: hidden;
  .comm-border {
    border-style: solid;
    border-width: 14px 14px;
    // border-image: url('../../static/img/center_border_bg.png') 14 100 / 1 / 0 stretch;
    // border-image: url('../../static/img/center_border_bg.png') 14 100;
    border-image: url("../../static/img/center_border_bg.png") 14 14;
    background: none;
  }
  .commbg {
    background: rgba(0, 0, 0, 0.3);
  }
  .comtit {
    margin-top: 23px;
    margin-left: 10px;
  }
  .twoscar-lf {
    width: 67%;
    margin-right: 1%;
    float: left;
    overflow: hidden;
    .twolf-top {
      width: 100%;
      margin-bottom: 10px;
      overflow: hidden;
      .twolftop-lf {
        width: 48%;
        height: 442px;
         margin-right:1%;
        float: left;
        .await-list {
          width: 91%;
          margin: 0 auto;
          .list-row {
            font-size: 18px;
          }
        }
      }
      .twolftop-lr {
        width: 48%;
        height: 470px;
        float: left;
        position: relative;
        background-color: #000;
        border-radius: 55px;
        // .icon-head {
        //   position: absolute;
        //   left: -1%;
        //   top: -1%;
        //   width: 104%;
        //   height: 110px;
        //   background: url("../../static/img/lunbo-tou.png") no-repeat;
        //   background-position: 100% 100%;
        //   background-size: 100% 100%;
        //   z-index: 10;
        // }
        // .icon-foot {
        //   transform: rotate(180deg);
        //   position: absolute;
        //   left: -2%;
        //   bottom: 0%;
        //   width: 103%;
        //   height: 80px;
        //   background: url("../../static/img/lunbo-jio.png") no-repeat;
        //   background-position: 100% 100%;
        //   background-size: 100% 100%;
        //   z-index: 10;
        // }
        .map-box {
          width: 80%;
          margin: 0 auto;
          // height: 420px;
          height: 400px;
          text-align: center;
          .warging-icon{
            position: absolute;
            width: 40px;
            height: 40px;
            left: 7%;
            top: 41%;
            z-index: 100;
            // width: 148px;
            // height: 148px;
          }
        }
        .advice-text {
          margin-top: 15px;
          width: 61%;
          height: 24px;
          line-height: 24px;
          font-size: 18px;
          margin: 15px auto 0 auto;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          // white-space: nowrap;
          // overflow: hidden;
          div {
            // width: 100%;
            // display: inline-block;
            // overflow: hidden;
            p {
              // width: 100%;
              // overflow: hidden;
              margin-right: 20px;
              display: inline-block;
            }
          }
        }
      }
    }
    .twolf-bottom {
      height: 442px;
      width: 98%;
      .comtit {
        margin-bottom: 0;
      }
      .draw-box {
        width: 95%;
        margin: 0 auto;
        // height: 200px;
        height: 400px;
      }
    }
  }
  .twoscar-lr {
    width: 30%;
    height: 922px;
    float: right;
    overflow: hidden;
    position: relative;
    .sign-icon {
      position: absolute;
      right: 0;
      top: 25px;
      overflow: hidden;
      span {
        display: inline-block;
        float: left;
        font-size: 18px;
        font-weight: bold;
        height: 18px;
        line-height: 18px;
        margin-right: 20px;
        i {
          display: inline-block;
          vertical-align: bottom;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-right: 3px;
        }
      }
    }
    .access-list {
      width: 90%;
      margin: 0 auto;
      .list-li {
        width: 100%;
        margin-bottom: 30px;
        p {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
        }
        .access-icon {
          width: 70%;
          margin: 0 auto;
          height: 40px;
          background: url("../../static/img/accessicon.gif") no-repeat;
          background-position: center center;
          background-size: 100%;
        }
        .access-name {
          width: 100%;
          overflow: hidden;
          span {
            display: inline-block;
            float: left;
            height: 30px;
            line-height: 30px;
            margin-right: 25px;
            font-size: 16px;
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
/*==================== 第二屏样式结束====================*/
@media screen and (min-width: 1024px) {
  .head span{width: 35%;}
  .head h2{font-size: 23px;}
  .two-contain .twoscar-lf{
    width: 67%;
    margin-right: 0;
  }
  .two-contain .twoscar-lf .twolf-top .twolftop-lf,
  .two-contain .twoscar-lf .twolf-top .twolftop-lr{
    width: 47%;
  }
  .two-contain .twoscar-lf .twolf-bottom{
    width: 95%;
  }
  .list-row .area-name{
    width: 15% !important;
  }
  .await-list .list-tit span:first-child{
    width: 15% !important;
  }
  .await-list .list-tit span{
    font-size: 15px;
  }
  .comtit .tit-icon{width: 30px;vertical-align: 0;}
  .comtit .tit-name{font-size: 17px;}
  .two-contain .comtit{
    margin-top: 10px;
  }
  .two-contain .twoscar-lr .sign-icon{top: 17px;}
  .two-contain .twoscar-lr .sign-icon span{font-size: 12px;margin-right: 7px;}
  .two-contain .twoscar-lr .sign-icon span i{
    vertical-align: middle;
    width: 12px;
    height: 12px;
  }
  .two-contain .twoscar-lf .twolf-bottom{
    width: 97%;
  }
  .two-contain .twoscar-lf .twolf-top .twolftop-lf{
    margin-right: 1.8%;
  }

}

@media screen and (min-width: 1366px) {
  .head span{width: 35%;}
  .head h2{font-size: 30px;}
  .comtit .tit-icon{width: 32px;vertical-align: 0;}
  .comtit .tit-name{font-size: 19px;}
  .await-list .list-tit span{
    font-size: 16px;
  }
  .await-list .list-tit span:nth-child(2),
  .await-list .list-tit span:nth-child(3){
     width: 35%;
  }
  .await-list .list-tit span:first-child{
    width: 25%;
  }

}

@media screen and (min-width: 1680px) {
  .head span{width: 36%;}
  .head h2{font-size: 33px;}
  .comtit .tit-icon{width: 35px;vertical-align: 0;}
  .comtit .tit-name{font-size: 21px;}
  .await-list .list-tit span{
    font-size: 18px;
  }
  .two-contain .twoscar-lr .sign-icon span{font-size: 16px;margin-right: 7px;}
  .two-contain .twoscar-lr .sign-icon span i{
    vertical-align: middle;
    width: 15px;
    height: 15px;
  }
  .two-contain .twoscar-lf{
    width: 68%;
    margin-right: 0;
  }
}
@media screen and (min-width: 1920px) {
  .head span{width: 37%;}
  .head h2{font-size: 39px;}
  .comtit .tit-icon{width: 46px;vertical-align: 0;}
  .comtit .tit-name,
  .contaion .cont-center .cent-bottom .cent-bot-tit h5{font-size: 24px;}
  .await-list .list-tit span:nth-child(2),
  .await-list .list-tit span:nth-child(3){
    width: 41%;
  }
}

// @media screen and (min-width: 1660px) {
// }
// @media screen and (min-width: 1550px) {
// }
// @media screen and (min-width: 1440px) {
// }
// @media screen and (min-width: 1366px) {
// }
// @media screen and (min-width: 1280px) {
// }
// @media screen and (min-width: 1152px) {
// }

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
