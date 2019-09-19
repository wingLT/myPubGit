<template>
  <div class="bg-img">
    <div>
      <div class="header-top"><span>成都双流国际机场航班信息大数据分析</span></div>
      <div>
        <div class="flight-map-box">
          <div class="flight-abnormal">
            <div class="flight-abnormal-bg"></div>
            <div class="flight-abnormal-div">
              <i class="img-gif"></i>
              <div>
                <span class="text-header" style="padding-bottom: 10px">航班异常状态占比</span>
                <div class="abnormal-state" id="abnormalState"></div>
              </div>
              <div>
                <span class="text-header">当日出港航班正常率</span>
                <div class="completion-bar" style="display: block;width: 98.5%;margin-left: 1.5%">
                  <i></i>
                  <!--<div class="completion-bar-div">123</div>-->
                  <div class="bar completion-bar-div" id="completionBarDiv">
                    <div class="text-show" :style="getLeft((countList.rate))" style="position: absolute;">
                      <span class="value">{{getToFixed(countList.rate)}}%</span>
                      <span class="triangle"><i class="icon wb-chevron-down"></i></span>
                    </div>
                    <svg class="dotted-line" style="width: 100%; height: 100%; display: inherit;">
                      <defs>
                        <linearGradient id="gradientsvg-path-6v8n4rltrog" x1="0" y1="0" x2="100%" y2="0">
                          <stop offset="0%" stop-color="#009CFF"></stop>
                          <stop offset="100%" stop-color="#FFFC00"></stop>
                        </linearGradient>
                        <clipPath id="svg-path-6v8n4rltrog">
                          <rect v-for="(item,index) in 32" :x="getStyle(index)" y="0" :width="svgWidth" :key="index"
                                height="100%"></rect>
                        </clipPath>
                      </defs>
                      <rect id="rect" x="0" y="0" width="100%" height="100%"
                            fill="url(#gradientsvg-path-6v8n4rltrog)" clip-path="url(#svg-path-6v8n4rltrog)"
                            :style="{width:getToFixed(countList.rate) +'%'}"></rect>

                    </svg>
                  </div>
                  <i></i>
                </div>
              </div>
              <div class="frame-delay">
                <div>
                  <span class="fd-span">执行架次</span>
                  <div class="num-color color-yellow">{{countList.done}}</div>
                </div>
                <div>
                  <span class="fd-span">出港/进港延误</span>
                  <div class="num-color color-green">{{countList.delay}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="echart-map" id="echartMap">
            <div style="height: 100%;position: relative">
              <span class="text-header" style="position: absolute;top: 20px;left: 20px;z-index: 100">航线实时运行统计</span>
              <div class="map-chart" id="mapChart" style="width: 100%;height:100%"></div>
            </div>

          </div>
        </div>
        <div class="main-info">
          <div class="time-statistics">
            <span class="text-header">航班小时统计</span>
            <div class="ts-box">
              <ul>
                <li v-for="(list,index) in hourList" :key="index">
                  <span>{{list.x}}</span><span class="ts-bar"><i
                  :style="{width: getHourVal(list.y)+'%'}"></i></span><span>{{list.y}}</span>
                  <i v-if="index !== hourList.length-1"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="delay-box departure-delay">
            <span class="text-header">出港延误目的地TOP10</span>
            <div>
              <div class="table-header"><span>延误目的地</span><span>架次</span></div>
              <div id="scrollMsg" class="table-tbody" style="height: 230px;overflow: hidden">
                <div class="swiper-container task task-departure">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide"
                         v-for="(list,listindex) in statisticsDeparture" :key="listindex">
                      <div class="items" :style="index%2===0?'background-color:#1d1237':'background-color:#141236'"
                           v-for="(item,index) in list" :key="index">
                        <span>{{item.airport}}</span><span>{{item.count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="delay-box arrival-delay">
            <span class="text-header">进港延误始发地TOP10</span>
            <div>
              <div class="table-header"><span>延误目的地</span><span>架次</span></div>
              <div id="scrollMsg1" class="table-tbody" style="height: 230px;overflow: hidden">
                <div class="swiper-container task task-arrival" style="width:100%;height: 100%">
                  <div class="swiper-wrapper" style="width:100%;height: 100%">
                    <div class="swiper-slide" style="width:100%;height: 100%"
                         v-for="(list,listindex) in statisticsArrival" :key="listindex">
                      <div class="items" :style="index%2===0?'background-color:#1d1237':'background-color:#141236'"
                           v-for="(item,index) in list" :key="index">
                        <span>{{item.airport}}</span><span>{{item.count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="today-delay">
            <span class="text-header">今日航班延误时长</span>
            <div class="bar-chart" id="barChart" style="width: 100%;height: 70%"></div>
          </div>
          <div class="hot-city">
            <span class="text-header" style="margin-bottom: 26px;">热门出港城市</span>
            <div class="hc-div">
              <i class="gif-1"></i>
              <i class="gif-2"></i>
              <div id="scrollMsg2" class="ul" style="height: 230px;overflow: hidden">
                <div class="swiper-container task task-hot" style="width:100%;height: 100%">
                  <div class="swiper-wrapper" style="width:100%;height: 100%">
                    <div class="swiper-slide" style="width:100%;height: 100%"
                         v-for="(list,listindex) in statisticsOutMost" :key="listindex">
                      <div class="items" v-for="(item,index) in list" :key="index">
                        <span>NO.{{item.no}}</span><span>{{item.airport}}</span><span>{{item.count}}架次</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <i class="gif-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import echarts from "echarts";
  import {FIOutPort} from '../../API/FlightInfoOutPortTwo'

  export default {
    name: "FlightInfoOutPort",
    created() {
      document.title = "航班延误统计第二版";
    },
    data() {
      return {
        svgWidth: 10,//svg的动态宽度
        flightRealNum: 10,//航班计划完成率
        completionBarDivWidth: 0,//svg的容器动态宽度
        stateList: [],//航班异常状态占比数据
        countList: {
          rate: 0
        },//当日出港航班正常率
        hourList: [],//航班小时统计
        inDelayList: [],//进港延误始发地TOP10
        outDelayList: [],//出港延误目的地TOP10
        outMostList: [],//热门城市
        statisticsDeparture: [],//进港延误始发地TOP10
        statisticsArrival: [],//出港延误目的地TOP10
        statisticsOutMost: [],//热门城市
        swiperDeparture: null,//进港延误始发地TOP10
        swiperArrival: null,//出港延误目的地TOP10
        swiperOutMost: null,//热门城市
        durationList: [],// 今日航班延误时长
        mapList: [],//地图数据
        time:null,
      }
    },
    mounted() {
      let self = this;
      this.completionBarDivWidth = $('#completionBarDiv').width();
      this.svgWidth = this.completionBarDivWidth / 32;

      this.getState();
      this.getCount();
      this.getHour();
      this.getTop();
      this.getDuration();
      this.getMapJson();
      let pie = echarts.init(document.getElementById('abnormalState'));
      let bar = echarts.init(document.getElementById('barChart'));
      let map = echarts.init(document.getElementById('mapChart'));
      this.time = setInterval(() => {
        pie.clear();
        bar.clear();
        self.statisticsDeparture = [];
        self.statisticsArrival = [];
        self.statisticsOutMost = [];
        self.inDelayList = [];
        self.outDelayList = [];
        self.outMostList = [];
        this.getState(0);
        this.getCount();
        this.getHour();
        this.getTop();
        this.getDuration();
        this.getMapJson();
      }, FIOutPort.Time());
      window.addEventListener("resize", ()=>{
        pie.resize();
        bar.resize();
        map.resize();
        this.completionBarDivWidth = $('#completionBarDiv').width();
        this.svgWidth = this.completionBarDivWidth / 32;
      });
    },
    destroyed(){
      let self = this;
      clearInterval(this.time);
      window.removeEventListener('resize',()=>{
        let pie = null;
        let bar = null;
        let map = null;
        this.completionBarDivWidth = 32;
        self.svgWidth = this.completionBarDivWidth / 32;
      });
    },
    methods: {
      openError(text) {
        this.$message({type: "error", message: text});
      },
      getStyle(index) {
        return index * (this.svgWidth + 0.2);
      },
      getLeft(value) {
        let rate = 10;
        let a = Number(value).toFixed(2);
        rate = this.completionBarDivWidth * (a / 100) - 48;
        return {left: rate + 'px'}
      },

      //top 滚动效果
      handleData(data, num) {
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
        if (num === 1) {
          if (self.swiperDeparture) {
            self.swiperDeparture.destroy(false);
            self.swiperDeparture = null;
          }
          self.statisticsDeparture = temp;
          self.$nextTick(function () {
            self.swiperDeparture = new Swiper('.task-departure', {
              direction: 'vertical',
              speed: 4000,
              loop: true,
              autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
            });
            self.swiperDeparture.detachEvents();
          });
        } else if (num === 2) {
          self.statisticsArrival = temp;
          self.$nextTick(function () {
            self.swiperArrival = new Swiper('.task-arrival', {
              direction: 'vertical',
//            autoplay: true,
              speed: 4000,
              loop: true,
              autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
            });
            self.swiperArrival.detachEvents();
          });
        } else if (num === 3) {
          self.statisticsOutMost = temp;
          self.$nextTick(function () {
            self.swiperOutMost = new Swiper('.task-hot', {
              direction: 'vertical',
//            autoplay: true,
              speed: 4000,
              loop: true,
              autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
            });
            self.swiperOutMost.detachEvents();
          });
        }


      },
      //航班异常状态占比
      pieChart() {
        let self = this;
        let name = [];
        let data = [];
        let colorList = [];
        for (let i = 0; i < self.stateList.length; i++) {
          name.push(self.stateList[i].type);
          data.push({
            value: self.stateList[i].total,
            name: self.stateList[i].type
          });
          if (self.stateList[i].type === '延误') {
            colorList.push('#20cdfb')
          }
          if (self.stateList[i].type === '取消') {
            colorList.push('#fff')
          }
          if (self.stateList[i].type === '备降') {
            colorList.push('#24FEB4')
          }
          if (self.stateList[i].type === '返航') {
            colorList.push('#0162f9')
          }
        }

        let pie = echarts.init(document.getElementById('abnormalState'));
        let option = {
          color: colorList,
          legend: {
            orient: 'horizontal',
            x: 'center',
            bottom: '-0%',
            data: name,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            selectedMode: false
          },

          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['45%', '60%'],
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
                  fontSize: 18,
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
        pie.setOption(option, true);
        let myChart = echarts.getInstanceByDom(document.getElementById("abnormalState"));
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
          let dataLen = option.series[0].data.length;
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

      //今日航班延误时长 柱状图
      barChart() {
        let self = this;
        let arr = [];
        let weatherArr = [];
        let airlineArr = [];
        let ATCArr = [];
        let aircraftArr = [];
        for (let i = 0; i < self.durationList.length; i++) {
          if (self.durationList[i].reason === '天气') {
            weatherArr.push(self.durationList[i].half);
            weatherArr.push(self.durationList[i].one);
            weatherArr.push(self.durationList[i].two);
          } else if (self.durationList[i].reason === '航空公司') {
            airlineArr.push(self.durationList[i].half);
            airlineArr.push(self.durationList[i].one);
            airlineArr.push(self.durationList[i].two);
          } else if (self.durationList[i].reason === '空管') {
            ATCArr.push(self.durationList[i].half);
            ATCArr.push(self.durationList[i].one);
            ATCArr.push(self.durationList[i].two);
          } else if (self.durationList[i].reason === '飞机') {
            aircraftArr.push(self.durationList[i].half);
            aircraftArr.push(self.durationList[i].one);
            aircraftArr.push(self.durationList[i].two);
          }

        }
        let bar = echarts.init(document.getElementById('barChart'));
        let option = {
          color: ['#007fff', '#aa00ff', '#fb0065', '#ff941b'],
          legend: {
            data: ['天气', '航空公司', '空管', '飞机'],
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            selectedMode: false,
            right: '0%'
          },
          grid: {
            left: '0%',
            right: '8%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisPointer: {
              type: 'shadow'
            },
            name: '架',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#333'
              }
            }
          },
          yAxis: {
            type: 'category',
            data: ['30-60', '60-120', '大于120'],
            name: '分钟',
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
          },
          series: [
            {
              name: '天气',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              barWidth: '20',
              data: weatherArr
            },
            {
              name: '航空公司',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              barWidth: '20',
              data: airlineArr
            },
            {
              name: '空管',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              barWidth: '20',
              data: ATCArr
            }, {
              name: '飞机',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              barWidth: '20',
              data: aircraftArr
            }

          ]
        };
        bar.clear();
        bar.setOption(option, true);
        //13485 408 11445
      },

      //地图
      mapChart() {
        let self = this;
        let map = echarts.init(document.getElementById('mapChart'));
        let geoCoordMap = {
          '成都': [103.9526, 30.7617],
        };
        let CDData = [];
        let arr1 = [];
        // let CDData = [
        //   [{name: '成都',value: '3U886'}, {name: '上海', value: '3U886'}],
        //   [{name: '上海',value: '3U886'}, {name: '成都', value: '3U886'}],
        // ];
        for (let i = 0; i < self.mapList.length; i++) {
          geoCoordMap[self.mapList[i].airportName] = [Number(self.mapList[i].airportLng), Number(self.mapList[i].airportLat)];
          if (self.mapList[i].keyInout === 'D') {
            arr1 = [
              {
                name: '成都',
                value: self.mapList[i].flightNo
              },
              {
                name: self.mapList[i].airportName,
                value: self.mapList[i].flightNo
              }
            ];
            CDData.push(arr1)
          } else if (self.mapList[i].keyInout === 'A') {
            arr1 = [
              {
                name: self.mapList[i].airportName,
                value: self.mapList[i].flightNo
              },
              {
                name: '成都',
                value: self.mapList[i].flightNo
              }
            ];
            CDData.push(arr1)
          }

        }
        let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let dataItem = data[i];
            let fromCoord = geoCoordMap[dataItem[0].name];
            let toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
              });
            }
          }
          return res;
        };

        let color = ['#a6c84c', '#ffa022', '#46bee9'];

        let series = [];
        [['成都', CDData]].forEach(function (item, i) {
          series.push({
              name: item[0],
              type: 'lines',
              zlevel: 1,
              // effect: {
              //   show: true,
              //   period: 6,
              //   trailLength: 0.7,
              //   color: '#fff',
              //   symbolSize: 3
              // },

              lineStyle: {
                normal: {
                  color: function (params) {
                    let txt = '';
                    if (params.data.fromName === item[0]) {
                      txt = '#46bee9'
                    } else {
                      txt = '#ffa022'
                    }
                    return txt
                  },

                  width: 0,
                  curveness: 0.2
                }
              },

              data: convertData(item[1])
            },
            {
              name: item[0],
              type: 'lines',
              zlevel: 2,
              symbol: ['none', 'arrow'],
              symbolSize: 10,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 20
              },
              label: {
                normal: {
                  show: true,
                  position: 'middle',
                  formatter: function (params) {
                    let txt = '';
                    for (let i = 0; i < CDData.length; i++) {
                      if (params.data.toName === CDData[i][1].name) {
                        txt = CDData[i][1].value
                      }
                    }
                    return params.data.fromName + '-' + params.data.toName + ' ' + txt
                    // return txt
                  },
                  fontSize: 14,
                }
              },
              lineStyle: {
                normal: {
                  color: function (params) {
                    let txt = '';
                    if (params.data.fromName === item[0]) {
                      txt = '#46bee9'
                    } else {
                      txt = '#ffa022'
                    }
                    return txt
                  },

                  width: 1,
                  opacity: 0.6,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0],
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              // label: {
              //   normal: {
              //     show: true,
              //     formatter:'{b}',
              //     position: 'right',
              //     color: function (params) {
              //       let txt = '';
              //       if (params.data.fromName === item[0]) {
              //         txt = '#ffa022'
              //       } else {
              //         txt = '#46bee9'
              //       }
              //       return txt
              //     },
              //   }
              // },
              symbolSize: function (val) {
                return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    let txt = '';
                    if (params.data.fromName === item[0]) {
                      txt = '#ffa022'
                    } else {
                      txt = '#46bee9'
                    }
                    return txt
                  },
                }
              },
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              })
            });
        });

        let option = {
          backgroundColor: '#404a59',

          tooltip: {
            trigger: 'item'
          },
          // legend: {
          //   orient: 'vertical',
          //   top: 'bottom',
          //   left: 'right',
          //   data: ['成都'],
          //   textStyle: {
          //     color: '#fff'
          //   },
          //   selectedMode: 'single'
          // },
          roam: true,// 滚轮滚动--放大或缩小
          geo: {
            map: 'world',
            label: {
              emphasis: {
                show: false
              },
            },
            nameMap: {
              'China': '中国'
            },
            top: 0,
            zoom: 7,
            center: [104.417855, 34.548963],
            roam: true,
            // itemStyle: {
            //   normal: {
            //     areaColor: '#323c48',
            //     borderColor: '#404a59'
            //   },
            //   emphasis: {
            //     areaColor: '#2a333d'
            //   }
            // }
            layoutCenter: [104.417855, 34.548963], //地图位置
            itemStyle: {
              normal: {
                color: 'rgba(51, 69, 89, .5)', //地图背景色
                borderColor: 'rgba(100,149,237,1)' //省市边界线
              },
              emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
              }
            }
          },
          series: series
        };


        map.clear();
        map.setOption(option, true);

      },
      //地图数据
      async getMapJson() {
        let self = this;
        await FIOutPort.mapJson({}).then((result) => {
          if (result.status === 200) {
            self.mapList = result.data;
            self.mapChart();
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      //航班异常状态占比
      async getState() {
        let self = this;
        await FIOutPort.state({}).then((result) => {
          if (result.status === 200) {
            self.stateList = result.data;
            self.pieChart();
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      //当日出港航班正常率
      async getCount() {
        let self = this;
        await FIOutPort.count({}).then((result) => {
          if (result.status === 200) {
            // console.log(result)
            self.countList = result.data;
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },

      //当日出港航班正常率 保留2位数
      getToFixed(val) {
        return Number(val).toFixed(2)
      },
      //航班小时统计
      async getHour() {
        let self = this;
        await FIOutPort.hour({}).then((result) => {
          if (result.status === 200) {
            self.hourList = result.data
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //航班小时统计 占比判断
      getHourVal(val) {
        let w = 0;
        if (val > 100 && val < 1000) {
          w = val / 10
        }

        return val
      },
      //出港延误目的地TOP10 进港延误始发地TOP10 热门城市
      async getTop() {
        let self = this;

        await FIOutPort.top({}).then((result) => {
          if (result.status === 200) {
            // console.log(result.data);
            self.inDelayList = result.data.inDelay;
            self.outDelayList = result.data.outDelay;
            let arr = result.data.outMost;

            for (let i = 0; i < arr.length; i++) {
              arr[i].no = i + 1;
              self.outMostList.push(arr[i])
            }

            if (self.swiperArrival) {
              self.swiperArrival.destroy(false);
              self.swiperArrival = null;
            }
            if (self.swiperOutMost) {
              self.swiperOutMost.destroy(false);
              self.swiperOutMost = null;
            }
            // console.log(self.outMostList);
            self.handleData(self.inDelayList, 1);
            self.handleData(self.outDelayList, 2);
            self.handleData(self.outMostList, 3);
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //今日航班延误时长
      async getDuration() {
        let self = this;
        await FIOutPort.duration({}).then((result) => {
          if (result.status === 200) {
            // console.log(result.data);
            self.durationList = result.data;
            self.barChart();
          } else {
            self.openError(result.msg)
          }
        }).catch(() => {
          console.log("error!");
        });
      },
    }
  }

</script>

<style scoped>
  .bg-img {
    height: 100%;
    padding: 0 20px;
  }

  .header-top {
    height: 64px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 40px;
    line-height: 64px;
    padding: 8px 0;

  }

  .header-top > span {
    display: inline-block;
  }

  .flight-map-box {
    height: 576px;
    font-size: 0;

  }

  .flight-map-box > div {
    display: inline-block;
    vertical-align: top;
  }

  .bg-img {
    background: url("img/bg.jpg") no-repeat 100% 100%;
    background-size: 100% 100%;
  }

  .flight-abnormal {
    width: 19.3%;
    height: 576px;
    position: relative;
  }

  .flight-abnormal-bg {
    transform: rotate(0deg);
    display: inline-block;
    opacity: 1;
    pointer-events: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 45px 103px 51px 29px;
    border-image: url('img/3.png') 45 103 51 29 fill / 1 / 0 repeat;
    background: none;
    font-size: 13px;
  }

  .flight-abnormal-div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 23px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .echart-map {
    height: 576px;
    width: 80.2%;
    background: #0f0f2f;
    margin-left: .5%;
  }

  .img-gif {
    display: inline-block;
    width: 100%;
    height: 30px;
    position: absolute;
    top: -4px;
    left: 0;
    z-index: 100;
    background: url("img/1.gif") no-repeat center center;
    background-size: cover;
  }

  .text-header {
    font-size: 24px;
    font-weight: bold;
    color: rgb(187, 239, 255);
    display: inline-block;
    padding: 20px 0;
  }

  .completion-bar {
    position: relative;
  }

  .completion-bar-div {
    width: 95%;
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
    right: 0;
  }

  .frame-delay {
    font-size: 0;
  }

  .frame-delay > div {
    display: inline-block;
    font-size: 14px;
    width: 50%;
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

  .abnormal-state {
    height: 240px;
  }

  .color-yellow {
    color: rgb(255, 246, 0);
  }

  .color-green {
    color: rgb(53, 220, 1);
  }

  .num-color {
    font-size: 40px;
  }

  .fd-span {
    font-size: 20px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    padding: 20px 0 6px;
  }

  .main-info {
    font-size: 0;
    height: 424px;
  }

  .main-info > div {
    display: inline-block;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 23px;
    height: 100%;
  }

  .time-statistics {
    width: 19.3%;

  }

  .departure-delay,
  .arrival-delay {
    width: 15%;
  }

  .today-delay {
    width: 28%;
  }

  .time-statistics {
    margin-right: .5%;
    padding: 23px;

  }

  .hot-city {
    width: 20.2%;
  }

  .ts-box {
    margin-top: 25px;
  }

  .ts-box li {
    font-size: 16px;
    color: #fff;
    position: relative;
    padding-bottom: 45px;
  }

  .ts-box li:last-child {
    padding-bottom: 0;
  }

  .ts-box li > span {
    display: inline-block;
    vertical-align: middle;
    position: relative;

  }

  .ts-box li > span:first-child {
    width: 21%;
  }

  .ts-box li > span:nth-child(2) {
    margin: 0 5%;
  }

  .ts-box li > i {
    display: inline-block;
    position: absolute;
    top: 12px;
    left: 26%;
    height: 100%;
    width: 1px;
    background: #eee;
    z-index: 10;
  }

  .ts-bar {
    width: 55%;
    height: 28px;
    border: 1px solid #353ba9;
    padding: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 28px;
    overflow: hidden;
  }

  .ts-bar > i {
    display: inline-block;
    height: 100%;
    width: 100%;
    background: rgb(47, 182, 190);
    border-radius: 24px;
  }

  .delay-box {
    font-size: 20px;
  }

  .table-header {
    font-weight: bold;
    font-size: 0;
    height: 51px;
    line-height: 51px;
  }

  .table-tbody .items > span,
  .table-header > span {
    display: inline-block;
    vertical-align: middle;
    width: 70%;
    font-size: 20px;
    text-align: center;
  }

  .table-tbody .items > span:last-child,
  .table-header > span:last-child {
    width: 30%;
  }

  .table-tbody .items > span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .table-tbody .items {
    height: 46px;
    line-height: 46px;
  }

  .arrival-delay {
    margin: 0 1%;
  }

  .arrival-delay .table-header {
    background: rgba(42, 101, 202, 0.26);
  }

  .hot-city {
    font-size: 20px;
    padding: 23px;
  }

  .hot-city .items {
    border-bottom: 1px solid #153fb3;
    height: 46px;
    line-height: 46px;
  }

  .hot-city .items:first-child {
    border-top: 1px solid #153fb3;
  }

  .hot-city .items:last-child {
    border-bottom: none;
  }

  .hot-city .items > span:nth-child(2) {
    margin: 0 5%;
  }

  .hot-city div {
    position: relative;
    width: 100%;
    /*margin-top: 20px;*/
  }

  .hot-city div.hc-div > i {
    display: inline-block;
    width: 100%;
    position: absolute;
  }

  .hot-city .ul {
    padding-top: 25px;
  }

  .gif-1 {
    background: url("img/1.gif") no-repeat center center;
    background-size: cover;
    height: 40px;
    top: -25px;
    left: 0;
  }

  .gif-2 {
    background: url("img/4.gif") no-repeat center center;
    background-size: cover;
    height: 80px;
    top: -62px;
    left: -16px;
  }

  .gif-3 {
    background: url("img/2.gif") no-repeat center center;
    background-size: cover;
    height: 200px;
    bottom: -20px;
    right: -55px;
  }

  .task-hot .items span {
    display: inline-block;
    vertical-align: middle;
  }

  .task-hot .items span:first-child {
    min-width: 20%;
  }

  .task-hot .items span:nth-child(2) {
    min-width: 40%;
  }

  .swiper-container,
  .swiper-container > div {
    height: 100%;
    width: 100%;
  }

</style>
