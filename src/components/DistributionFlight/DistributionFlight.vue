<template>
  <div class="box-content">
    <header>
      <div
        class="gif gif-left"
        style="transform: rotate(180deg)"
      >
        <div></div>
      </div>
      <div class="header">
        <div class="header-name">航班分布状况大屏</div>
        <p class="header-botgif"></p>
      </div>
      <div class="gif gif-right">
        <div></div>
      </div>
    </header>
    <section>
      <div
        class="left-content"
        style=""
      >
        <div class="top-content">
          <div
            class="top-lf"
            style=""
          >
            <div class="day-lftop">
              <div class="one-border "></div>
              <div class="day-cont">
                <div class="day-lf">
                  <p class="gray-tit">今日计划起飞数</p>
                  <ul class="num orange">
                    <li v-for="(item,index) in dayPlanList" :key="index">{{ item }}</li>  
                  </ul>
                  <p class="gray-tit">今日实际起飞数</p>
                  <ul class="num blue">
                    <li v-for="(item,index) in dayRealList" :key="index">{{ item }}</li>
                  </ul>
                </div>
                <div class="day-lr">
                  <div class="wate-polo" id="DayTotalEnforced"></div>
                </div>
              </div>
            </div>
            <div class="month-lfbot">
              <div class="one-border "></div>
              <div class="month-cont">
                <div class="month-lf">
                  <p class="gray-tit">月度计划起飞数</p>
                  <ul class="num orange">
                    <li v-for="(item,index) in monthPlanList" :key="index">{{ item }}</li>
                  </ul>
                  <p class="gray-tit">月度实际起飞数</p>
                  <ul class="num blue">
                    <li v-for="(item,index) in monthRealList" :key="index">{{ item }}</li>
                  </ul>
                </div>
                <div class="month-lr">
                  <div class="wate-polo" id="MonthTotalEnforced"></div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="top-lr"
            style=""
          >
            <div class="implementation-toplr">
              <div class="two-border"></div>
              <div class="implement-header comm-header">
                <div class="head-lf">
                  <span class="tit-sign"></span>
                  <span class="tit-text">执行率占比</span>
                </div>
                <ul class="head-lr">
                  <!-- <li :class="pieYearActive === true?'btn active-btn':'btn'" @click="getImplementationRateInfo($event,'year')">年度</li>
                  <li :class="pieSeasonActive === true?'btn active-btn':'btn'" @click="getImplementationRateInfo($event,'season')">季度</li>
                  <li :class="pieMonthActive === true?'btn active-btn':'btn'" @click="getImplementationRateInfo($event,'month')">月度</li> -->
                  <li class="btn" @click="getImplementationRateInfo($event,'year')">年度</li>
                  <li class="btn" @click="getImplementationRateInfo($event,'season')">季度</li>
                  <li class="btn active-btn" @click="getImplementationRateInfo($event,'month')">月度</li>
                </ul>
              </div>
              <div
                class="implement-map"
                id="ImplementationMap"
              ></div>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="day-parting-num">
            <div class="two-border"></div>
            <div class="daypart-box">
              <div class="comm-header">
                <div class="head-lf">
                  <span class="tit-sign"></span>
                  <span class="tit-text">分时段航班数</span>
                </div>
              </div>
              <div
                class="dayparting-map"
                id="DayPartingMap"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="right-content"
        style=""
      >
        <div class="flight-implementrate">
          <div class="one-border"></div>
          <div class="flightimplement-box">
            <div class="comm-header">
              <div class="head-lf">
                <span class="tit-sign"></span>
                <span class="tit-text">航班执行率</span>
              </div>
              <ul class="head-lr">
                <li class="btn" @click="getFlightImplementInfo($event,'year')">年度</li>
                <li class="btn" @click="getFlightImplementInfo($event,'season')">季度</li>
                <li class="btn active-btn" @click="getFlightImplementInfo($event,'month')">月度</li>
              </ul>
            </div>
            <div class="list-cont">
              <div class="msg-cont-title">
                <span></span>
                <span>航班号</span>
                <span>周期</span>
                <span>执行率</span>
              </div>
              <div class="msg-tag">
                <div
                  id="scrollMsg"
                  style="height: 782px;overflow: hidden"
                >
                  <div class="swiper-container task">
                    <div class="swiper-wrapper">
                      <!-- <div class="swiper-slide" style="width:504px;" v-for="(list,listindex) in FlightImplementList" :key="listindex"> -->
                      <div class="swiper-slide" v-for="(list,listindex) in FlightImplementList" :key="listindex">
                        <div class="items" v-for="(item,index) in list" :key="index">
                          <div class="ball-items"><span class="blue-ball">{{listindex * 15 + index + 1}}</span></div>
                          <span>{{ item.flightNo }}</span>
                          <span>{{ item.dyop }}</span>
                          <span>{{ ((item.rate)*100).toFixed(2) }}%</span>
                          <!-- <span>{{ (item.rate)*100 }}%</span> -->
                          <!-- <span>{{ item.rate.toFixed(2) }}%</span> -->
                          <!-- <span>{{ item.rate }}</span> -->
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import echarts from "echarts";
import watePolo from "../../../static/lib/echarts-liquidfill.min.js";
import Swiper from "swiper";
import comm from "../Common.vue";
import DateTool from "../../../static/js/DateUtils.js";
import { DistributionFlight } from "../../API/DistributionFlight";

export default {
  name: "DistributionFlight",
  data() {
    return {
      // pieYearActive: true,
      // pieSeasonActive: false,
      // pieMonthActive: false,
    //   seriesData: [
    //   {
    //     name: "0%-20%",
    //     value: 10
    //   },{
    //     name: "20%-40%",
    //     value: 20
    //   },{
    //     name: "40%-60%",
    //     value: 30
    //   },{
    //     name: "60%-80%",
    //     value: 20
    //   },{
    //     name: "80%-99%",
    //     value: 10
    //   },{
    //     name: "100%",
    //     value: 10
    //   }],
    // legendArr: ['0%-20%','20%-40%','40%-60%','60%-80%','80%-99%','100%'],
    
    dayRealList: [],
    dayPlanList: [],
    monthRealList: [],
    monthPlanList: [],
    
    FlightImplementList: [],
    maintainSwiper: '',


    };
  },
  mounted() {
    const self = this;
    // 当日 当月 版块信息
    self.getDayMonthBlockInfo()
    // 分时段航班数
    self.getDayPartingInfo()
    // 执行率占比
    self.getImplementationRateInfo(null,'month')
    // 航班执行率
    self.getFlightImplementInfo(null,'month')
    
    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getDayMonthBlockInfo()
        // 分时段航班数
        self.getDayPartingInfo()
        // 执行率占比
        self.getImplementationRateInfo(null,'month')
        // 航班执行率
        self.getFlightImplementInfo(null,'month')
      }, 180000);
    }
  },
  methods: {
    // 当日 当月 版块信息
    async getDayMonthBlockInfo() {
      const self = this;
      let result;
      let data = await DistributionFlight
        .getDayMonthBlockInfo(result)
        .then(result => {
          if (result.status === 200) {
            let dayReal = result.data.today.real + '';
            let dayPlan = result.data.today.plan + '';
            self.dayRealList = dayReal;
            self.dayPlanList = dayPlan;

            let monthReal = result.data.lastMonth.real + '';
            let monthPlan = result.data.lastMonth.plan + '';
            self.monthRealList = monthReal;
            self.monthPlanList = monthPlan;
            let dayRate = result.data.today.rate.toFixed(1);
            let monthRate = result.data.lastMonth.rate.toFixed(1);

            //绘制水球图
            drawWatePoloMap(self,dayRate,'DayTotalEnforced','今日总执行率');
            drawWatePoloMap(self,monthRate,'MonthTotalEnforced','月度总执行率');
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })
        .catch(() => {
          console.log("error!");
        });
    },
    // 执行率占比
    async getImplementationRateInfo(e,param) {
      const self = this;
      // echarts图形销毁重新绘制
      $("#ImplementationMap").removeAttr("_echarts_instance_").empty();
      // 第一种哦
      if(e === null){
      }else{
        $(e.target).addClass("active-btn").siblings().removeClass('active-btn');
      }
      // 第二种哦
      // if(param === 'year'){
      //   self.pieYearActive = true;
      //   self.pieSeasonActive = false;
      //   self.pieMonthActive = false;
      // }else if(param === 'season'){
      //   self.pieYearActive = false;
      //   self.pieSeasonActive = true;
      //   self.pieMonthActive = false;
      // }else{
      //   self.pieYearActive = false;
      //   self.pieSeasonActive = false;
      //   self.pieMonthActive = true;
      // }

      // let result;

      let data = await DistributionFlight
        .getImplementationRateInfo({unit: param})
        .then(result => {
          if (result.status === 200) {
            let dataInfo = result.data;
            //处理所需数据
            let legendArr = [];
            let seriesData = [];
            for(let i in dataInfo){
              legendArr.push(i);
              seriesData.push({
                name: i,
                value: dataInfo[i]
              })
            }
            //绘制环形图
            drawImplementationRatePie(self, legendArr, seriesData);
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })
        .catch(() => {
          console.log("error!");
        });
    },
    // 分时段航班数
    async getDayPartingInfo() {
      const self = this;
      let result;
      let data = await DistributionFlight
        .getDayPartingInfo(result)
        .then(result => {
          if (result.status === 200) {
            let dataInfo = result.data;
            let realList = []
            let planList = []
            let xAxisList = []
            for(let i=0; i<dataInfo.length; i++){
              if(dataInfo[i].name === 'real'){
                for(let j=0; j<dataInfo[i].count.length; j++){
                  realList.push(dataInfo[i].count[j].total)
                  xAxisList.push(dataInfo[i].count[j].hour)
                }
              }else if(dataInfo[i].name === 'plan'){
                for(let j=0; j<dataInfo[i].count.length; j++){
                  planList.push(dataInfo[i].count[j].total)
                }
              }
            }


            //绘制折线图
            drawDayPartingMap(self,xAxisList,realList,planList);
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })
        .catch(() => {
          console.log("error!");
        });
    },
    // 航班执行率
    async getFlightImplementInfo(e,param) {
      const self = this;
      if(e === null){
      }else{
        $(e.target).addClass("active-btn").siblings().removeClass('active-btn');
      }
      // let result;
      let data = await DistributionFlight
        .getFlightImplementInfo({unit: param})
        .then(result => {
          if (result.status === 200) {
            self.handleData(result.data);
            // self.FlightImplementList = result.data;

          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })
        .catch(() => {
          console.log("error!");
        });
    },
    //整列数据滚动
    //处理top10滚动整屏数据
    handleData(data) {
      let self = this;
      let temp = [];
      let len = Math.ceil(data.length / 15);
      for (let i = 0; i < len; i++) {
        let arr = [];
        let acLen = ((i + 1) * 15) >= data.length ? data.length : (i + 1) * 15;
        for (let k = (i * 15); k < acLen; k++) {
          arr.push(data[k])
        }
        temp.push(arr);
      }
      self.FlightImplementList = temp;
      if (self.maintainSwiper) {
        self.maintainSwiper.destroy(false)
      }
      if (len == 1) {

      } else {
        self.$nextTick(function () {
          self.maintainSwiper = new Swiper('.task', {
            
            direction: 'vertical',
            speed: 2000,
            loop: true,
            spaceBetween : 20,

            // slidesPerView : 'auto',
            // slidesPerView : 90,
            // slidesPerView : 60,
            // slidesPerGroup : 15,
            // loopedSlides: 15,

            autoplay:true,

            // autoplay: {
            //   delay: 2000,
            //   stopOnLastSlide: false,
            //   disableOnInteraction: false,
            // },
          });
          self.maintainSwiper.detachEvents();
        });
      }
    },
  }
};

// 绘制水球图
function drawWatePoloMap(self,value,watePoloBox,Tit) {
  let pie = echarts.init(document.getElementById(watePoloBox));
  let ifColor;
  if(value < 0.2){
    ifColor = 'rgba(226,25,24,0.5)'
  }else if(0.2 < value < 0.8){
    ifColor = 'rgba(32,130,31,0.5)'
  }else{
    ifColor = 'rgba(32,130,31,0.7)'
  }
  let data = []
  data.push(value)
  var option = {
      series: [{
          type: 'liquidFill',
          radius: '90%',
          data: data,
          color: ifColor,
          outline:{
            borderDistance:4,
            itemStyle:{
              borderColor:"#25c76f",
              borderWidth:3,
            }
          },
          backgroundStyle: {
              borderWidth: 3,
              color: 'rgb(255,0,255,0.01)'
          },
          label: {
            normal: {
                // formatter: value * 100 + '%',
                formatter: (params) => {
                  var result = "";
                  result += params.data * 100 + '%' + " \n\n" + Tit;
                  return result;
                },
                textStyle: {
                    fontSize: 25
                }
            }
          }
      }]
  }
  // 使用刚指定的配置项和数据显示图表。
  pie.setOption(option, true);
  window.addEventListener("resize", function() {
    pie.resize();
  });
}
// 绘制动态环形图
function drawImplementationRatePie(self, legendArr, seriesData) {
  let pie = echarts.init(document.getElementById("ImplementationMap"));
  let colorArr = ['#fe4d52','#ff9235','#fac22a','#5bc7f0','#30e9d7','#11e571'];
  // console.log(legendArr)
  // console.log(seriesData)
  let option = {
    color: colorArr,
    legend: {
      icon: 'rect',
      bottom:'5%',
      left:'center',
      itemWidth:14,
      itemHeight:14,
      data: legendArr,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      selectedMode: false
    },
    grid: {
      width: '95%',
      left: '3%',
      top: '1%',
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '65%'],
        center:['45%','40%'],
        avoidLabelOverlap: false,
        selectedOffset: '35',
        legendHoverLink: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            color: '#fff',
            fontSize: 20,
            // formatter: `{b}\n\n{d}%`
            formatter: `{d}%\n\n{b}`
          },
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: seriesData,
      }
    ],
  };
  pie.clear();
  pie.setOption(option);
  window.addEventListener("resize", function() {
    pie.resize();
  });

  let myChart = echarts.getInstanceByDom(document.getElementById("ImplementationMap"));
  let dataLen = option.series[0].data.length;
  let isSet = true;// 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
  let charPie3currentIndex = 0;
  //1、 创建静态echart表

  // 2、鼠标移动上去的时候的高亮动画
  myChart.on('mouseover', function (param) {
    isSet = false;
    clearInterval(myChart.startCharts);
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: charPie3currentIndex
    });
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: param.dataIndex
    });
    // 显示 tooltip
    // myChart.dispatchAction({
    //   type: 'showTip',
    //   seriesIndex: 0,
    //   dataIndex: param.dataIndex
    // })
  });
  // 3、自动高亮展示
  let chartHover = function () {
    var dataLen = option.series[0].data.length;
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: charPie3currentIndex
    });
    charPie3currentIndex = (charPie3currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: charPie3currentIndex
    });
    // 显示 tooltip
    // myChart.dispatchAction({
    //   type: 'showTip',
    //   seriesIndex: 0,
    //   dataIndex: charPie3currentIndex
    // })
  };
  myChart.startCharts = setInterval(chartHover, 2000);
  // 4、鼠标移出之后，恢复自动高亮
  myChart.on('mouseout', function (param) {
    if (!isSet) {
      myChart.startCharts = setInterval(chartHover, 2000);
      isSet = true
    }
  })
}
// 绘制折线图
// function drawDayPartingMap(self, Info) {
function drawDayPartingMap(self,dataIPSxAxis,dayList,flightList) {
  let lineSign = echarts.init(
    document.getElementById("DayPartingMap")
  );
  // let dataIPSxAxis = ["01/01", "02/01", "03/01", "04/01 ", "05/01 ", "06/01"];
  // let dayList = [90, 60, 50, 80, 120, 100];
  // let flightList = [20, 70, 60, 80, 100, 90];
  var option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    color: ["#008aff", "#9c64fe"],
    grid: {
      left: "2%",
      right: "2%",
      top: "10%",
      bottom: "15%",
      containLabel: true
    },
    legend: {
      show: true,
      bottom: 5,
      center: 0,
      icon: "stack",
      itemWidth: 13,
      itemHeight: 13,
      textStyle: {
        color: "#ffffff"
      },
      data: ["航班季度计划", "今日实际航班"]
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dataIPSxAxis,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ebf0ff",
            fontSize: 12
          }
        },

        axisLine: {
          lineStyle: {
            color: "#ebf0ff"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "单位：%          ",
        // min: 0,
        // max: 300,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#ebf0ff"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#ebf0ff"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#11366e"
          }
        }
      }
    ],
    series: [
      {
        name: "今日实际航班",
        type: "line",
        smooth: true,
        //  symbol: "none", //去掉折线点
        symbol: "circle",
        symbolSize: 8,
        stack: 100,
        itemStyle: {
          normal: {
            color: "#9c64fe",
            lineStyle: {
              color: "#9c64fe",
              width: 1
            },
            areaStyle: {
              //color: '#94C9EC'
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(156,100,254,1)"
                },
                {
                  offset: 0.5,
                  color: "rgba(156,100,254,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(130,63,247,0.1)"
                }
              ])
            }
          }
        },
        data: dayList
      },

      {
        name: "航班季度计划",
        type: "line",
        smooth: true,
        stack: 100,
        itemStyle: {
          normal: {
            //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0,186,255,1)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(16,188,250,0.5)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(16,188,250,0.1)" // 100% 处的颜色
              }
            ]) //背景渐变色
          },
          emphasis: {
            color: "#00baff",
            lineStyle: {
              // 系列级个性化折线样式
              type: "dotted",
              color: "#00baff" //折线的颜色
            }
          }
        }, //线条样式
        symbol: "circle",
        symbolSize: 8, //折线点的大小
        areaStyle: {
          normal: {}
        },
        data: flightList
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  lineSign.setOption(option, true);
  window.addEventListener("resize", function() {
    lineSign.resize();
  });
}
</script>

<style scoped>
@import "../../../static/font/font.css";
* {
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -icab-box-sizing: border-box;
  -khtml-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.box-content {
  width: 100%;
  /* height: 100vh; */
  height: 100%;
  background: url("../../../static/img/vipbg.jpg");
  background-color: #02020b;
  background-repeat: no-repeat;
  transform: scale(1);
  transform-origin: left top 0px;
  background-size: 100%;
  position: relative;
  overflow: hidden;
}
header {
  width: 98%;
  margin: 0 auto;
  /*background-color: darkolivegreen;*/
}
section {
  width: 96%;
  margin: 0 auto;
  /*background-color: darkolivegreen;*/
}
/* ===========头部样式开始======= */
header > div {
  display: inline-block;
  vertical-align: top;
}

header div.header {
  width: 16%;
  height: 37px;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: auto;
  margin: 0 auto;
}
header div.header .header-botgif {
  width: 100%;
  height: 100%;
  background-image: url("./img/header-botgif.gif");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

header .header-name {
  color: #5ce7e9;
  text-align: center;
  font-family: chinese;
  font-size: 28px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
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
  /* background-image: url('./img/header.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    image-rendering: -webkit-optimize-contrast; */
}

header div.gif {
  /*width: 806px;*/
  /* width: 37.5%; */
  width: 41%;
  height: 54px;
  z-index: 0;
  position: relative;
  opacity: 1;
  pointer-events: auto;
}

header .gif-left > div {
  left: -12%;
  top: 0;
  position: absolute;
}

header .gif-right > div {
  position: absolute;
  right: 7%;
  top: 8px;
}

header div.gif > div {
  width: 105%;
  height: 100%;
  opacity: 1;
  background-image: url("./img/line.gif");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
/* ===========头部样式结束======= */
/* ===========内容样式开始======= */
section {
  overflow: hidden;
  position: relative;
  margin-top: 15px;
}
section .left-content,
section .right-content {
  /* height: 90vh; */
  height: 90%;
}
section .left-content {
  width: 69%;
  float: left;
}
section .right-content {
  width: 30%;
  float: right;
}
/* ===========左侧样式开始======= */
.left-content .top-content {
  height: 531px;
  margin-bottom: 18px;
  display: flex;
}
.left-content .bottom-content {
  height: 424px;
}
.top-content .top-lf {
  width: 50%;
  height: 531px;
}
.top-content .top-lr {
  width: 50%;
  height: 531px;
}
.top-content .top-lf {
}
.top-lf .day-lftop,
.top-lf .month-lfbot {
  width: 100%;
  height: 257px;
  position: relative;
}
.top-lf .day-lftop {
  margin-bottom: 13px;
}
.top-content .one-border,
.right-content .one-border {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 15px 11px 16px 8px;
  border-image-source: url("./img/border.png");
  border-image-slice: 15 11 16 8 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.top-content .top-lr .two-border,
.bottom-content .two-border {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 29px 107px 109px 16px;
  border-image-source: url("./img/guai-border.png");
  border-image-slice: 29 107 109 16 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.top-content .day-cont,
.top-content .month-cont {
  position: relative;
  overflow: hidden;
  width: 92%;
  margin: 0 auto;
  padding: 28px 0;
  height: 100%;
  display: flex;
}
.top-content .day-cont .day-lf,
.top-content .day-cont .day-lr,
.top-content .month-cont .month-lf,
.top-content .month-cont .month-lr {
  width: 50%;
}
.day-cont .wate-polo,
.month-cont .wate-polo
{
  width: 100%;
  height: 100%;
}
.top-content .gray-tit {
  color: #dfe8e2;
  font-size: 16px;
  margin-bottom: 10px;
}
.top-content .num {
  position: relative;
  overflow: hidden;
}
.top-content .num > li {
  display: inline-block;
  float: left;
  padding: 8px 2px;
  font-size: 34px;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #0c2220;
}
.top-content .orange {
  margin-bottom: 10px;
}
.top-content .orange > li {
  color: #ffb01e;
}

.top-lr .implementation-toplr {
  width: 100%;
  height: 530px;
  position: relative;
}
.implementation-toplr .implement-header {
  width: 92%;
  margin: 0 auto;
  padding: 38px 0;
}
.implementation-toplr .implement-map {
  width: 92%;
  margin: 0 auto;
  height: 385px;
}
.comm-header {
  position: relative;
  overflow: hidden;
  height: 34px;
}
.comm-header .head-lf {
  float: left;
  position: relative;
}
.comm-header .head-lr {
  float: right;
  display: flex;
}
.comm-header .head-lf .tit-sign {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 114px;
  height: 34px;
  background-image: url("./img/tit-sign.png");
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: 100%;
}
.comm-header .head-lf .tit-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 30px;
}
.comm-header .head-lr {
  width: 41%;
  height: 34px;
}
.comm-header .head-lr > li {
  width: 30%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  margin: 0 5px;
  cursor: pointer;
}
.btn {
  color: #ffffff;
  background-image: url("./img/btn.png");
  background-repeat: no-repeat;
  background-position: 99% 99%;
  background-size: 100% 100%;
}
.active-btn {
  color: #06d2e8;
  background-image: url("./img/active-btn.png");
  background-repeat: no-repeat;
  background-position: 99% 99%;
  /* background-position: 100% 100%; */
  /* background-size: 99% 99%; */
  background-size: 100% 100%;
}

/* ===========左下部分样式开始======= */
.bottom-content .day-parting-num {
  width: 100%;
  height: 424px;
  position: relative;
}
.day-parting-num .daypart-box {
  width: 92%;
  margin: 0 auto;
  padding: 38px 0;
}
.daypart-box .dayparting-map {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}

/* ===========左下部分样式结束======= */
/* ===========左侧样式结束======= */
/* ===========右侧侧样式开始======= */

.right-content .flight-implementrate {
  width: 100%;
  height: 976px;
  position: relative;
}
.flight-implementrate .flightimplement-box {
  width: 92%;
  margin: 0 auto;
  padding: 38px 0;
}
.list-cont {
  margin-top: 30px;
}
.list-cont .msg-cont-title {
  height: 42px;
  background-color: #00ffff;
  color: #2b0100;
  font-size: 18px;
  font-weight: bold;
  line-height: 42px;
  white-space: nowrap;
}
.msg-cont-title span {
  display: inline-block;
  text-align: center;
}
.msg-cont-title span:nth-child(1) {
  width: 10%;
}
.msg-cont-title span:nth-child(2) {
  width: 28%;
  white-space: nowrap;
}
.msg-cont-title span:nth-child(3) {
  width: 28%;
}
.msg-cont-title span:nth-child(4) {
  width: 28%;
}
.list-cont .msg-tag {
  height: 782px;
  background-color: #082d2e;
  overflow: hidden;
}
.msg-tag div.items {
  /* width: 100%; */
  background-color: #082d2e;
  color: #ffffff;
  height: 52px;
  line-height: 52px;
}
.msg-tag div.items:nth-of-type(odd) {
  /* 奇数行 */
  background-color: #0c423f;
}
.msg-tag div.items div.ball-items {
  width: 10%;
  display: inline-block;
  text-align: center;
}
.msg-tag div.items span:nth-child(2) {
  width: 29%;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}
.msg-tag div.items span:nth-child(3) {
  width: 27%;
  display: inline-block;
  text-align: center;
}
.msg-tag div.items span:nth-child(4) {
  width: 27%;
  display: inline-block;
  text-align: center;
}
.msg-tag .blue-ball {
  background-color: #299ba1;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  line-height: 25px;
  text-align: center;
  margin-left: 5%;
}
/* ===========右侧样式结束======= */

/* ===========内容样式结束======= */

@media screen and (min-width: 1024px) {
}

@media screen and (min-width: 1280px) {
}

@media screen and (min-width: 1366px) {
  header div.header{
    width: 28%;
  }
  header div.gif > div {
    width: 100%;
  }
  header div.gif {
    width: 34%;
  }
}

@media screen and (min-width: 1400px) {
}

@media screen and (min-width: 1440px) {
}

@media screen and (min-width: 1600px) {
}

@media screen and (min-width: 1920px) {
}
</style>
