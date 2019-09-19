<template>
  <div class="bg-img">
    <div class="header-top">成都双流国际机场航班实时运行数据统计分析</div>
    <div class="main-box">
      <div class="main-left">
        <!--当日计划执行架次-->
        <div class="main-left-top">
          <div>
            <div style="width: 40%">
              <span class="text-header">当日计划执行架次</span>
              <div class="num-color color-yellow">{{implementInfo.total}}</div>
            </div>
            <div>
              <span class="text-header">当日已执行架次</span>
              <div class="num-color color-green">{{implementInfo.done}}</div>
            </div>
            <div style="width: 28%">
              <span class="text-header">当日未执行架次</span>
              <div class="num-color color-red">{{implementInfo.todo}}</div>
            </div>
          </div>
          <div class="mlt-completion">
            <span class="text-header">当日计划航班完成率</span>
            <div class="completion-bar" style="display: block;width: 98.5%;margin-left: 1.5%">
              <i></i>
              <!--<div class="completion-bar-div">123</div>-->
              <div class="bar completion-bar-div" id="completionBarDiv">
                <div class="text-show" :style="getLeft(flightRealNum)" style="position: absolute;">
                  <span class="value">{{flightRealNum}}%</span>
                  <span class="triangle"><i class="icon wb-chevron-down"></i></span>
                </div>
                <svg class="dotted-line" style="width: 100%; height: 100%; display: inherit;">
                  <defs>
                    <linearGradient id="gradientsvg-path-6v8n4rltrog" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stop-color="#009CFF"></stop>
                      <stop offset="100%" stop-color="#FFFC00"></stop>
                    </linearGradient>
                    <clipPath id="svg-path-6v8n4rltrog">
                      <rect v-for="(item,index) in 32" :x="getStyle(index)" y="0" :width="svgWidth"
                            height="100%"></rect>
                    </clipPath>
                  </defs>
                  <rect id="rect" x="0" y="0" width="100%" height="100%"
                        fill="url(#gradientsvg-path-6v8n4rltrog)" clip-path="url(#svg-path-6v8n4rltrog)"
                        :style="{width:flightRealNum +'%'}"></rect>

                </svg>
              </div>
              <i></i>
            </div>
            <i class="img-gif"></i>
          </div>
          <div>
            <div>
              <span class="text-header">昨日过夜架次</span>
              <div class="num-color color-yellow">{{implementInfo.overnight}}</div>
            </div>
            <div>
              <span class="text-header">昨日总执行架次</span>
              <div class="num-color color-yellow">{{implementInfo.yesterdayDone}}</div>
            </div>
          </div>
        </div>
        <!--停机位统计 分区统计-->
        <div class="main-left-bottom" style="margin-top: 10px">
          <div>
            <span class="text-header">停机位统计</span>
            <div class="mlb-header">
              <div>
                <span>总计开放</span>
                <p><span class="color-yellow">{{countInfo.totalOpen}}</span><span>个</span></p>
              </div>
              <div>
                <span>近机位开放</span>
                <p><span class="color-yellow">{{countInfo.nearOpen}}</span><span>个</span></p>
              </div>
              <div>
                <span>远机位开放</span>
                <p><span class="color-yellow">{{countInfo.farOpen}}</span><span>个</span></p>
              </div>
              <div>
                <span>未开放</span>
                <p><span class="color-red">{{countInfo.unOpen}}</span><span>个</span></p>
              </div>
            </div>
          </div>
          <div>
            <span class="text-header" style="margin-top: 10px;">分区统计</span>
            <div class="partition-box">
              <div v-for="(list,index) in distributedList" :key="index">
                <span>{{index===0?'T1-':(index===1)?'T2国航-':(index===2)?'T2地服-':(index===3)?'南机坪-':(index===4)?'北机坪-':''}}{{list.occupied}}/{{list.total}}</span><span
                class="pb-bar"><i :style="{width:((list.occupied/list.total)*100).toFixed(2)+'%'}"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <!--今日实时航班进出港执行情况-->
        <div class="main-right-top">
          <span class="text-header">今日实时航班进出港执行情况</span>
          <div class="mrt-real-time-flight" id="realTimeFlight" style="height: 85%"></div>
        </div>
        <!--本周靠桥率 航班实时运行类别-->
        <div class="main-right-bottom">
          <div class="bridge-rate">
            <span class="text-header">本周靠桥率</span>
            <div class="br-box">
              <div class="brb-header">
                <span>日期</span>
                <span>执行数</span>
                <span>靠桥数</span>
                <span>靠桥率</span>
              </div>
              <div id="scrollMsg" style="height: 56px;overflow: hidden;position: relative">
                <div class="swiper-container task" style="height: 100%;">
                  <div class="swiper-wrapper" style="height: 100%">
                    <div class="swiper-slide" v-for="(list,listindex) in bridgeListF" style="height: 100%">
                      <!--:style="index%2===0?'background-color:#1d1237':'background-color:#141236'"-->
                      <div class="items brb-header-list" v-for="(item,index) in list" :key="index"
                           style="height: 100%;">
                        <span>{{list.date}}</span>
                        <span>{{list.total}}</span>
                        <span>{{list.bridge}}</span>
                        <span>{{list.per}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="br-ul">
                <li  v-if="index>=1" v-for="(list,index) in bridgeList" :key="index">
                  <span>{{list.date}}</span>
                  <span>{{list.total}}</span>
                  <span>{{list.bridge}}</span>
                  <span>{{list.per}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="flight-type">
            <span class="text-header">航班实时运行类别</span>
            <div class="flight-type" id="flightType" style="width:100%;height: 80%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import echarts from "echarts";
  import {FDStatistics} from '../../API/FlightDelayStatistics'

  export default {
    name: "FlightDelayStatistics",
    created() {
      document.title = "成都双流国际机场航班实时运行数据统计分析";
    },
    data() {
      return {
        maintainSwiper: '',//本周靠桥率swiper
        statistics: '',//本周靠桥率swiper
        realTimeList: [],//实时航班进出港执行情况数组
        implementInfo: {}, //当日计划执行架次
        completionBarDivWidth: 0,//svg的容器动态宽度
        svgWidth: 0,//svg的动态宽度
        flightRealNum: 0,//航班计划完成率
        countInfo: {},//分区统计
        distributedList: [],//停机位统计
        flightTypeList: [],//航班实时运行类别
        bridgeList:[],//本周靠桥率
        bridgeListF:[],//本周靠桥率第一个
        time:null,
      }
    },
    mounted() {
      let self = this;

      // this.pieChart();
      this.getFlightRealTime();
      this.getImplement();
      this.getCount();

      this.completionBarDivWidth = $('#completionBarDiv').width();
      this.svgWidth = this.completionBarDivWidth / 32;
      this.getDistributed();
      this.getFlightType();
      this.getBridge();
      let pie = echarts.init(document.getElementById('flightType'));
      let line = echarts.init(document.getElementById('realTimeFlight'));

      this.time = setInterval(()=>{
        pie.clear();
        line.clear();
        this.getFlightRealTime();
        this.getImplement();
        this.getCount();
        this.getDistributed();
        this.getFlightType();
        this.getBridge();
      },FDStatistics.Time());
      window.addEventListener("resize", ()=>{
        pie.resize();
        line.resize();
        this.completionBarDivWidth = $('#completionBarDiv').width();
        this.svgWidth = this.completionBarDivWidth / 32;
      });
    },
    destroyed(){
      let self = this;
      clearInterval(this.time);
      window.removeEventListener('resize', ()=>{
        let pie = null;
        let bar = null;
        self.completionBarDivWidth = 32;
        self.svgWidth = this.completionBarDivWidth / 32;
      })
    },
    methods: {
      openError(text) {
        this.$message({type: "error", message: text});
      },
      //实时航班进出港执行情况 折线图柱状图
      async getFlightRealTime() {
        let self = this;
        await FDStatistics.flightRealTime({}).then((result) => {
          if (result.status === 200) {
            // console.log(result)
            self.realTimeList = result.data;
            self.lineChart();
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //本周靠桥率 Swiper
      handleData(data) {
        let self = this;
        let temp = [];
        let len = Math.ceil(data.length / 5);
        for (let i = 0; i < len; i++) {
          let arr = [];
          let acLen = ((i + 1) * 5) >= data.length ? data.length : (i + 1) * 5;
          for (let k = (i * 5); k < acLen; k++) {
            arr.push(data[k])
          }
          temp.push(arr);
        }
        self.statistics = temp;
        if (self.maintainSwiper) {
          self.maintainSwiper.destroy(false)
        }
        if (len == 1) {

        } else {
          self.$nextTick(function () {
            self.maintainSwiper = new Swiper('.task', {
              direction: 'vertical',
//            autoplay: true,
              speed: 2000,
              loop: true,
              autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
            });
            self.maintainSwiper.detachEvents();
          });
        }

      },
      //折线图 今日实时航班进出港执行情况
      lineChart() {
        let self = this;
        let xAxisData = [];
        let planA = [];//计划进港
        let planD = [];//计划出港
        let realA = [];//实际进港
        let realD = [];//实际出港
        let data = self.realTimeList;
        for (let i = 0; i < data.length; i++) {
          if (data[i].keyInout === "A") {
            if (data[i].name === "plan") {
              for (let j = 0; j < data[i].count.length; j++) {
                planA.push(data[i].count[j].total);
                xAxisData.push(data[i].count[j].point);
              }
            } else {
              for (let j = 0; j < data[i].count.length; j++) {
                realA.push(data[i].count[j].total);
              }
            }
          } else {
            if (data[i].name === "real") {
              for (let j = 0; j < data[i].count.length; j++) {
                realD.push(data[i].count[j].total);
              }
            } else {
              for (let j = 0; j < data[i].count.length; j++) {
                planD.push(data[i].count[j].total);
              }
            }
          }
        }
        let line = echarts.init(document.getElementById('realTimeFlight'));

        let option = {
          legend: {
            data: ['实际进港', '实际出港', '计划进港', '计划出港'],
            textStyle: {//图例文字的样式
              color: '#fff',
              fontSize: 14
            },
            left: 'right'
          },
          grid: {
            width: '95%',
            left: '3%'
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisPointer: {
                type: 'shadow'
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },

            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '架',
              nameTextStyle: {
                color: '#fff'
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#333'
                }
              }
            }
          ],
          series: [
            {
              name: '计划进港',
              type: 'bar',
              data: planA,
              itemStyle: {
                color: '#65f5f3'
              },
              barWidth: '11'

            },
            {
              name: '计划出港',
              type: 'bar',
              data: planD,
              itemStyle: {
                color: '#6700cc'
              },
              barWidth: '11'
            },
            {
              name: '实际进港',
              type: 'line',
              data: realA,
              lineStyle: {
                color: '#fff000'
              },
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "#fff000",
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              }
            },
            {
              name: '实际出港',
              type: 'line',
              data: realD,
              lineStyle: {
                color: '#ff9200'
              },
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "#ff9200",
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              }
            }
          ]
        };
        line.clear();
        line.setOption(option);
      },
      //航班实时运行类别
      pieChart() {
        let self = this;
        let pie = echarts.init(document.getElementById('flightType'));
        let nameList = [];
        let arr = self.flightTypeList;
        let data=  [];
        let colorList = [];
        for (let i = 0; i < arr.length; i++) {
          data.push({
            value:arr[i].total,
            name:arr[i].type,
          });
          if(arr[i].type === "普客加班" ||arr[i].type === "正班"){
            colorList.push('#FBF320')
          }
          if(arr[i].type === "包机"){
            colorList.push('#49ece7')
          }
          if(arr[i].type === "其他"){
            colorList.push('#a3a3a3')
          }
          if(arr[i].type === "货班" || arr[i].type === "货加"){
            colorList.push('#4625fe')
          }
          if(arr[i].type === "公务"){
            colorList.push('#ffbaaa')
          }
          nameList.push(arr[i].type)
        }
        let option = {
          // tooltip: {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b}: {c} ({d}%)"
          // },
          color: colorList,
          legend: {
            orient: 'horizontal',
            x: 'left',
            bottom: '1%',
            data: nameList,
            textStyle: {
              color: "#fff",
              fontSize: 12,
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
              name: '访问来源',
              type: 'pie',
              radius: ['60%', '78%'],
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
                  fontSize: 28,
                  formatter: `{b}\n\n{d}%`
                },
              },
              center:['50%','45%'],
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data,
            }
          ],
        };
        pie.clear();
        pie.setOption(option);


        let myChart = echarts.getInstanceByDom(document.getElementById("flightType"));
        let dataLen = option.series[0].data.length;
        let isSet = true;// 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
        let charPie3currentIndex = 0;
        clearInterval(myChart.startCharts);
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
      },

      //日计划执行架次
      async getImplement() {
        let self = this;
        await FDStatistics.implement({}).then((result) => {
          if (result.status === 200) {
            // console.log(result.data)
            self.implementInfo = result.data;
            self.flightRealNum = ((self.implementInfo.done / self.implementInfo.total) * 100).toFixed(2);
            // self.flightRealNum = 100;
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      getStyle(index) {
        return index * (this.svgWidth + 0.2);
      },
      getLeft(value) {
        let rate;
        rate = this.completionBarDivWidth * (this.implementInfo.done / this.implementInfo.total) - 40;
        return {left: rate + 'px'}
      },

      //分区统计
      async getCount() {
        let self = this;
        await FDStatistics.count({}).then((result) => {
          if (result.status === 200) {
            self.countInfo = result.data
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //分区统计
      async getDistributed() {
        let self = this;
        await FDStatistics.distributed({}).then((result) => {
          if (result.status === 200) {
            self.distributedList = result.data;

          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //航班实时运行类别
      async getFlightType() {
        let self = this;
        await FDStatistics.flightType({}).then((result) => {
          if (result.status === 200) {
            self.flightTypeList = result.data;
            // console.log(self.flightTypeList);
            self.pieChart();
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //航班实时运行类别
      async getBridge() {
        let self = this;
        await FDStatistics.bridge({}).then((result) => {
          if (result.status === 200) {
            self.bridgeList = result.data;
            self.bridgeListF = [];
            self.bridgeListF.push(self.bridgeList[0]);
            self.$nextTick(function () {
              self.maintainSwiper = new Swiper('.task', {
                direction: 'vertical',
//            autoplay: true,
                speed: 2000,
                loop: true,
                autoplay: {
                  delay: 2000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
              });
              self.maintainSwiper.detachEvents();
            });
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },

    },
  }
</script>

<style scoped>
  html, body {
    height: 100%;
  }

  .header-top {
    font-size: 32px;
    text-align: center;
    height: 64px;
    line-height: 64px;
    padding: 8px 0 10px;
    font-weight: bold;
  }

  .bg-img {
    background: url("img/bg.jpg") no-repeat 100% 100%;
  }

  .main-box {
    font-size: 0;
    padding: 0 18px 0 15px;
  }

  .main-left {
    width: 35.5%;
    padding-bottom: 20px;
  }

  .main-left > div {
    width: 100%;
    background: rgba(21, 11, 43, 0.5);
  }

  .main-left-top {
    height: 432px;
  }

  .main-left-bottom {
    height: 536px;

  }

  .main-right {
    width: 64%;
    margin-left: .5%;
    font-size: 13px;
  }

  .main-right,
  .main-left {
    display: inline-block;
    vertical-align: top;
  }

  .main-left-top > div {
    font-size: 0;
    padding: 0 20px;

  }

  .main-left-top > div > div {
    display: inline-block;
    vertical-align: middle;
    width: 32%;
    font-size: 13px;
  }

  .mlt-completion {
    font-size: 13px;
  }

  .color-yellow {
    color: rgb(255, 246, 0);
  }

  .color-green {
    color: rgb(53, 220, 1);
  }

  .color-red {
    color: rgb(253, 103, 132);
  }

  .text-header {
    font-size: 24px;
    font-weight: bold;
    color: rgb(187, 239, 255);
    display: inline-block;
    padding: 20px 0;
  }

  .num-color {
    font-size: 54px;
    height: 54px;
    line-height: 54px;
  }

  .completion-bar {
    position: relative;
  }

  .completion-bar-div {
    width: 80%;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 1px;
    box-sizing: border-box;
    height: 23px;
    line-height: 23px;
    margin: 40px 0 0 2.5%;
  }

  .completion-bar > i {
    display: inline-block;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 1px;
    box-sizing: border-box;
    position: absolute;
    width: 1.5%;
    height: 23px;
    top: 0;
  }

  .completion-bar > i:first-child {
    left: 0;
  }

  .completion-bar > i:last-child {
    right: 15%;
  }

  .img-gif {
    display: inline-block;
    height: 20px;
    position: relative;
    left: -10%;
    width: 100%;
    background: url("../../../static/img/donxian.gif") no-repeat center center;
    background-size: 100%;
    margin: 10px 0;
  }

  .main-left-bottom > div {
    padding: 0 20px;
  }

  .mlb-header {
    font-size: 0;
  }

  .mlb-header > div {
    font-size: 24px;
    display: inline-block;
    vertical-align: middle;
    width: 21%;
    padding-left: 10px;
    border-left: 10px solid rgba(116, 113, 123, 0.5);

  }

  .mlb-header > div > span {
    font-size: 22px;
    display: inline-block;
    margin-bottom: 10px;
  }

  .mlb-header > div > p {
    height: 40px;
    line-height: 40px;
  }

  .mlb-header > div > p > span {
    font-size: 40px;
  }

  .mlb-header > div > p > span:last-child {
    font-size: 20px;
  }

  .partition-box {
    font-size: 22px;
    padding-left: 10px;
    border-left: 10px solid rgba(116, 113, 123, 0.5);
  }

  .partition-box > div {
    height: 48px;
    line-height: 48px;
    margin-bottom: 14px;
  }

  .partition-box > div > span {
    display: inline-block;
    vertical-align: middle;
  }

  .partition-box > div > span:first-child {
    width: 30%;
  }

  .pb-bar {
    display: inline-block;
    background: rgb(67, 67, 67);
    width: 70%;
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
  }

  .pb-bar > i {
    background: rgb(101, 245, 243);
    display: inline-block;
    height: 100%;
  }


  .main-right-top {
    padding: 0 20px;
    background: rgba(21, 11, 43, 0.5);
    height: 544px;
  }

  .main-right-bottom {
    margin-top: 10px;
    height: 424px;
  }


  .main-right-bottom > div {
    display: inline-block;
    vertical-align: top;
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 24px;
    background: rgba(21, 11, 43, 0.5);
  }

  .main-right-bottom {
    font-size: 0;
  }

  .bridge-rate {
    width: 55.5%;
    height: 100%;
  }

  .flight-type {
    width: 43.5%;
    margin-left: 1%;
    height: 100%;
  }

  .br-box {
    color: #44D3E4;
  }

  .br-ul > li,
  .br-box > div {
    font-size: 0;
  }

  .brb-header-list > span,
  .br-ul > li > span,
  .br-box > div > span {
    width: 26%;
    display: inline-block;
    font-size: 20px;
    text-align: center;
  }

  .brb-header-list > span:first-child,
  .br-ul > li > span:first-child,
  .br-box > div > span:first-child {
    width: 22%;
  }

  .brb-header {
    height: 48px;
    line-height: 48px;
    background: rgba(24, 78, 122, 0.8);
    font-size: 24px;

  }

  .brb-header-list {
    height: 56px;
    line-height: 56px;
    background: rgba(10, 39, 50, 0.7);
    font-size: 0;
  }

  .brb-header-list > span {
    font-size: 24px;
  }

  .br-ul {
    margin-top: 11px;
  }

  .br-ul > li {
    line-height: 37px;
    height: 37px;
    background: rgba(10, 39, 50, 0.7);

  }

  .br-ul > li:nth-child(odd) {
    background: rgba(19, 66, 82, 0.5);
  }

  .wb-chevron-down {
    position: absolute;
    bottom: -5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    border-right: 1px solid rgba(255, 255, 255, 0.6);
    width: 11px;
    height: 11px;
    border-radius: 0 0 1px;
    transform: rotate(45deg) skew(10deg, 10deg);
  }

  .text-show {
    display: flex;
    height: 35px;
    line-height: 35px;
    opacity: 1;
    font-size: 20px;
    text-align: center;
    width: 100px;
    position: absolute;
    top: -48px;
    left: 0;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-image: initial;
    border-radius: 1px;
  }

  .text-show > span:first-child {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .triangle {
    position: absolute;
    left: 50%;
    bottom: -2px;
    z-index: 100;
  }

  .triangle > i {
    background: rgb(21, 11, 43)
  }
</style>
