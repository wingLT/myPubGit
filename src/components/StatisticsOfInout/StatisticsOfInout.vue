<template>
  <div id="statisticsInOut">
    <header>
      <div>
        <!--<div class="gif gif-left" style="transform: rotate(180deg)">-->
        <!--<div></div>-->
        <!--</div>-->
        <div class="header">
          <div class="header-name"></div>
        </div>
        <div class="header-data">
          <div class="data-line"></div>
          <div class="data-text">昨日国内外进出港总人数
            <!--<span class="data-count">-->
            <NumberGrow :value="allCount" :class="'data-count'"></NumberGrow>
            <!--</span>-->
            人
          </div>
          <div class="data-line"></div>
        </div>

      </div>
    </header>
    <section>
      <div class="section-bottom">
        <!--国内及混合航线-->
        <div class="col-container">
          
          <!-- <div class="col-title">
            <div class="col-icon"></div>
            <div class="col-text">国内及混合航线</div>
            <div class="col-line">
              <div class="line-gif"></div>
            </div>
          </div> -->
          <div class="black-bg age-statistics">
            <div class="block-area"></div>
            <div class="col-title">
              <div class="col-icon"></div>
              <div class="col-text">国内及混合航线</div>
              <div class="col-line">
                <div class="line-gif"></div>
              </div>
            </div>
            <div class="block-content">
              <div class="block-col">
                <div class="block-header">
                  <div class="block-title">今日</div>
                  <div class="block-wave-gif">
                    <div></div>
                  </div>
                </div>
                <!--出港-->
                <div class="block-data">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon yellow-bg"></span>
                    <span class="block-data-tit-text">出港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="domestic.toutward" :class="'yellow-font'"></NumberGrow>
                    <!--<span class="yellow-font">26,699</span>-->
                    人
                  </div>
                </div>
                <!--进港-->
                <div class="block-data right">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon blue-bg"></span>
                    <span class="block-data-tit-text">进港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="domestic.tinward" :class="'blue-font'"></NumberGrow>
                    <!--<span class="blue-font">22,800</span>-->
                    人
                  </div>
                </div>
              </div>
              <div class="block-col" style="margin-bottom: 10px;">
                <div class="block-header">
                  <div class="block-title">昨日</div>
                  <div class="block-wave-gif">
                    <div></div>
                  </div>
                </div>
                <!--出港-->
                <div class="block-data">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon yellow-bg"></span>
                    <span class="block-data-tit-text">出港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="domestic.youtward" :class="'yellow-font'"></NumberGrow>
                    <!--<span class="yellow-font">26,699</span>-->
                    人
                  </div>
                </div>
                <!--进港-->
                <div class="block-data right">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon blue-bg"></span>
                    <span class="block-data-tit-text">进港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="domestic.yinward" :class="'blue-font'"></NumberGrow>
                    <!--<span class="blue-font">22,800</span>-->
                    人
                  </div>
                </div>
              </div>
              <!-- <div id="domesticMap"></div> -->
            </div>
          </div>
        </div>
        <!--国内及混合航线 end-->

        <!--国际航线-->
        <div class="col-container" style="float: right;">
          <!-- <div class="col-title">
            <div class="col-icon"></div>
            <div class="col-text" style="color: rgb(138, 255, 205)">国际航线</div>
            <div class="col-line">
              <div class="line-gif"></div>
            </div>
          </div> -->
          <div class="black-bg age-statistics">
            <div class="block-area"></div>
            <div class="col-title">
              <div class="col-icon"></div>
              <div class="col-text" style="color: rgb(138, 255, 205)">国际航线</div>
              <div class="col-line">
                <div class="line-gif"></div>
              </div>
            </div>
            <div class="block-content-right">
              <!-- <div>
                <div id="internationalMap"></div>
              </div> -->
              <div class="block-col right2">

                <!--出港-->
                <div class="block-data">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon yellow-bg"></span>
                    <span class="block-data-tit-text">昨日出港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="inter.youtward" :class="'yellow-font'"></NumberGrow>
                    <!--<span class="yellow-font">26,699</span>-->
                    人
                  </div>
                </div>
                <!--进港-->
                <div class="block-data right" style="margin-bottom: 10px;">
                  <div class="block-data-tit">
                    <span class="block-data-tit-icon blue-bg"></span>
                    <span class="block-data-tit-text">昨日进港</span>
                  </div>
                  <div class="block-data-text">
                    <NumberGrow :value="inter.yinward" :class="'blue-font'"></NumberGrow>
                    <!--<span class="blue-font">22,800</span>-->
                    人
                  </div>
                </div>
              </div>
              <div>
                <div class="circleMap">
                  <div id="outwardMap" style="float: left;"></div>
                  <div id="inwardMap" style="float: left;"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!--国际航线 end-->
      </div>
      <div class="end-box">
        <div class="end-contain">
          <div class="col-title">
            <div class="col-icon"></div>
            <div class="col-text">每日短信</div>
            <!-- <div class="col-line">
              <div class="line-gif"></div>
            </div> -->
          </div>
          <div class="block-area"></div>
          <div class="end-content flex-onebox">
            <div class="one-item" style="flex-shrink: 1;width: 30%;">
              <p class="orange-font twobox-tit">上月</p>
              <div class="flex-twobox">
                <div class="two-item">
                  <p class="orange-bg item-tit">总架次</p>
                  <p class="white-font item-num">{{ lastMonth.sorties }}</p>
                </div>
                <div class="two-item">
                  <p class="orange-bg item-tit">同比</p>
                  <p class="white-font item-num">{{ lastMonth.sortiesRate }}</p>
                </div>
                <div class="two-item">
                  <p class="orange-bg item-tit">旅客吞吐量</p>
                  <p class="white-font item-num">{{ lastMonth.persons }}</p>
                </div>
                <div class="two-item">
                  <p class="orange-bg item-tit">同比</p>
                  <p class="white-font item-num">{{ lastMonth.personsRate }}</p>
                </div>
              </div>
            </div>
            <div class="one-item" style="flex-shrink: 1;width: 30%;">
              <p class="shallowblue-font twobox-tit">本月累计</p>
              <div class="flex-twobox">
              <div class="two-item">
                <p class="shallowblue-bg item-tit">架次</p>
                <p class="white-font item-num">{{ thisMonth.sorties }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">同比</p>
                <p class="white-font item-num">{{ thisMonth.sortiesRate }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">旅客吞吐量</p>
                <p class="white-font item-num">{{ thisMonth.persons }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">同比</p>
                <p class="white-font item-num">{{ thisMonth.personsRate }}</p>
              </div>
              </div>
            </div>
            <div class="one-item" style="flex-shrink: 2;width: 20%;">
               <p class="shallowgreen-font twobox-tit">昨日</p>
               <div class="flex-twobox">
              <div class="two-item" style="width:50%;">
                <p class="shallowgreen-bg item-tit">架次</p>
                <p class="white-font item-num">{{ yesterDay.sorties }}</p>
              </div>
              <div class="two-item" style="width:50%;">
                <p class="shallowgreen-bg item-tit">旅客吞吐量</p>
                <p class="white-font item-num">{{ yesterDay.persons }}</p>
              </div>
              </div>
            </div>
            <div class="one-item" style="flex-shrink: 1;width: 30%;">
              <p class="shallowblue-font twobox-tit">年累计</p>
              <div class="flex-twobox">
              <div class="two-item">
                <p class="shallowblue-bg item-tit">架次</p>
                <p class="white-font item-num">{{ thisYear.sorties }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">同比</p>
                <p class="white-font item-num">{{ thisYear.sortiesRate }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">旅客吞吐量</p>
                <p class="white-font item-num">{{ thisYear.persons }}</p>
              </div>
              <div class="two-item">
                <p class="shallowblue-bg item-tit">同比</p>
                <p class="white-font item-num">{{ thisMonth.personsRate }}</p>
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
  import echarts from 'echarts'
  import '../../../static/lib/chain1'
  import '../../../static/lib/world'
  import '../../../static/lib/echarts-wordcloud.min'
  import {Utils} from '../../../static/js/Utils'
  import {StatisticsInOut} from '../../API/StatisticsOfInOut'
  import NumberGrow from './NumberGrow.vue'

  export default {
    name: 'statisticsInOut',
    components: {
      NumberGrow
    },
    data() {
      return {
        outwardMap: '',
        inwardMap: '',
        earthMap: '',
        worldMap: '',
        colors: [{
          color1: '#ffb622',
          color2: '#b68011'
        }, {
          color1: '#15cce2',
          color2: '#088190'
        }],
        screenFlag: 0,
        allCount: 0,
        inter: {
          yinward: 0,
          youtward: 0
        },
        domestic: {
          yinward: 0,
          youtward: 0,
          tinward: 0,
          toutward: 0
        },
        domesticMapData: null,
        interMapData: null,
        timer: null,
        time: 1,
        lastMonth: {},
        thisMonth: {},
        yesterDay: {},
        thisYear: {},

        // result:{
        //   data:{
        //   "d":{
        //       "d":5049,
        //       "i":3788
        //   },
        //   "a":{
        //       "d":4302,
        //       "i":3592
        //   }
        //   }
        // }
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    mounted() {
      let self = this;
      self.getScreenSize();
      self.getAllData();
      // self.$nextTick(function () {
      //   self.onresizeEcharts();
      // })
    },
    methods: {
      getAllData() {
        let self = this;
        self.getFlightData()
        self.getOutInWardCount()
        self.getEverydayNoteData()
        // self.getMapData()
        self.timer = setTimeout(function () {
          self.getAllData()
        }, 1000 * 60 * self.time)
      },

      getMap(chinaMapData, worldMapData) {
        let self = this;
        if (self.earthMap) {
          self.destroyEcharts(self.earthMap)
        }
        if (self.worldMap) {
          self.destroyEcharts(self.worldMap)
        }
        self.earthMap = echarts.init(document.getElementById("domesticMap"));
        self.worldMap = echarts.init(document.getElementById("internationalMap"));
        self.getChinaMap(chinaMapData)
        self.getWorldMap(worldMapData)
      },

//      获得国内外航司数量
      async getFlightData() {
        let self = this;

        //  if (self.outwardMap) {
        //       self.destroyEcharts(self.outwardMap)
        //     }
        //     if (self.inwardMap) {
        //       self.destroyEcharts(self.inwardMap)
        //     }
        //     self.outwardMap = echarts.init(document.getElementById('outwardMap'));
        //     self.inwardMap = echarts.init(document.getElementById('inwardMap'));
        //     let aData = []; //出港数据
        //     let dData = []; //进港数据

        //     let result = self.result;
        //     console.log(result)

        //     aData.push({
        //       name: '国际航司',
        //       value: result.data.a.i,
        //       color: self.colors[0].color1
        //     }, {
        //       name: '国内航司',
        //       value: result.data.a.d,
        //       color: self.colors[0].color2
        //     });
        //     dData.push({
        //       name: '国际航司',
        //       value: result.data.d.i,
        //       color: self.colors[1].color1
        //     }, {
        //       name: '国内航司',
        //       value: result.data.d.d,
        //       color: self.colors[1].color2
        //     });

        //     self.getPie(self.outwardMap, aData);
        //     self.getPie(self.inwardMap, dData);

        let data = await StatisticsInOut.getFlightData().then((result) => {
          if (result.status === 200) {
            if (self.outwardMap) {
              self.destroyEcharts(self.outwardMap)
            }
            if (self.inwardMap) {
              self.destroyEcharts(self.inwardMap)
            }
            self.outwardMap = echarts.init(document.getElementById('outwardMap'));
            self.inwardMap = echarts.init(document.getElementById('inwardMap'));
            let aData = []; //出港数据
            let dData = []; //进港数据

            // let result = self.data;
            // console.log(result)

            aData.push({
              name: '国际航司',
              value: result.data.a.i,
              color: self.colors[0].color1
            }, {
              name: '国内航司',
              value: result.data.a.d,
              color: self.colors[0].color2
            });
            dData.push({
              name: '国际航司',
              value: result.data.d.i,
              color: self.colors[1].color1
            }, {
              name: '国内航司',
              value: result.data.d.d,
              color: self.colors[1].color2
            });

            self.getPie(self.outwardMap, aData);
            self.getPie(self.inwardMap, dData);
          } else {
          }
        }).catch(() => {
          console.log("error!");
        });
      },

//      获得出进港人数
      async getOutInWardCount() {
        let self = this;
        let data = await StatisticsInOut.getOutInWardCount().then((result) => {
          if (result.status === 200) {
            self.allCount = result.data.yda + result.data.ydd + result.data.yia + result.data.yid
            self.inter.yinward = result.data.yia;
            self.inter.youtward = result.data.yid;
            self.domestic.yinward = result.data.yda;
            self.domestic.youtward = result.data.ydd;
            self.domestic.tinward = result.data.tda;
            self.domestic.toutward = result.data.tdd;
          } else {
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //获得每日短信数据
      async getEverydayNoteData() {
        let self = this;
        let data = await StatisticsInOut.getEverydayNoteData().then((result) => {
          if (result.status === 200) {
            self.lastMonth = result.data.lastMonth;
            self.thisMonth = result.data.thisMonth;
            self.yesterDay = result.data.yesterday;
            self.thisYear = result.data.thisYear;
          } else {
          }
        }).catch(() => {
          console.log("error!");
        });
      },

//      获得国内外地图数据
      async getMapData() {
        let self = this;
        let data = await StatisticsInOut.getMapData().then((result) => {
          if (result.status === 200) {
            self.domesticMapData = result.data.d;
            self.interMapData = result.data.i;
            self.getMap(result.data.d, result.data.i)
          } else {

          }
        }).catch(() => {
          console.log("error!");
        });
      },

      getScreenSize() {
        let flag = window.screen.width
        if (flag == 1024) {
          this.screenFlag = 0.6
        } else if (flag == 1280) {
          this.screenFlag = 0.75
        } else if (flag == 1366) {
          this.screenFlag = 0.8
        } else if (flag == 1400) {
          this.screenFlag = 0.8
        } else if (flag == 1440) {
          this.screenFlag = 0.8
        } else if (flag == 1600) {
          this.screenFlag = 0.8
        } else if (flag == 1920) {
          this.screenFlag = 1
        }
      },
      //绘制世界地图
      getWorldMap(mapData) {
        let self = this;

        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = Utils.geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let convertDataCoord = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let fromCoord = Utils.geoCoordMap[data[i].from];
            let toCoord = Utils.geoCoordMap[data[i].to];
            if (fromCoord && toCoord) {
              res.push({
                coords: [fromCoord, toCoord]
              });
            }
          }
          return res;
        };

        let option = {
          tooltip: {
            show: false
          },
          geo: {
            map: "world",
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true, //是否允许缩放
            layoutCenter: ["45%", "50%"], //地图位置
            layoutSize: "180%",
            itemStyle: {
              normal: {
                color: "#04284e", //地图背景色
                borderColor: "#5bc1c9" //省市边界线
              },
              emphasis: {
                color: "#04284e" //悬浮背景
              }
            }
          },

          series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(mapData.points),
            zlevel: 2,
            label: {
              normal: {
                show: false,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}",//圆环显示文字
                color: '#f4e925'
              },
              emphasis: {
                show: false
              }
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 4 + val[2] / 1500; //圆环大小
            },
            itemStyle: {
              normal: {
                color: '#f4e925'
              }
            },
          }, {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 2 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3,//尾迹线条曲直度,
                color: '#fff'
              }
            },
            data: convertDataCoord(mapData.linesA)
          }, {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 2 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3,//尾迹线条曲直度,
                color: '#fff'
              }
            },
            data: convertDataCoord(mapData.linesD)
          }
          ]
        };
        self.worldMap.setOption(option);
      },
      //绘制中国地图
      getChinaMap(mapData) {
        let self = this;
        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = Utils.geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let convertDataCoord = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let fromCoord = Utils.geoCoordMap[data[i].from];
            let toCoord = Utils.geoCoordMap[data[i].to];
            if (fromCoord && toCoord) {
              res.push({
                coords: [fromCoord, toCoord]
              });
            }
          }
          return res;
        };

        let option = {
          tooltip: {
            show: false
          },
          geo: {
            map: "china",
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true, //是否允许缩放
            layoutCenter: ["45%", "50%"], //地图位置
            layoutSize: "120%",
            itemStyle: {
              normal: {
                color: "#1874c3", //地图背景色
                borderColor: "#67a4d8" //省市边界线
              },
              emphasis: {
                color: "#1874c3" //悬浮背景
              }
            }
          },

          series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(mapData.points),
            zlevel: 2,
            label: {
              normal: {
                show: false,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}",//圆环显示文字
                color: '#f4e925'
              },
              emphasis: {
                show: false
              }
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 4 + val[2] / 1500; //圆环大小
            },
            itemStyle: {
              normal: {
                color: '#f4e925'
              }
            },
          }, {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 3 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3,//尾迹线条曲直度,
                color: '#fff'
              }
            },
            data: convertDataCoord(mapData.linesA)
          }, {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 3 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3,//尾迹线条曲直度,
                color: '#fff'
              }
            },
            data: convertDataCoord(mapData.linesD)
          }, {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 10,
            z: 10,
            label: {
              normal: {
                show: false,
                position: "right",
                color: "#f4e925",
                formatter: "{b}",
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925'
              }
            },
            data: [{
              name: "双流",
              value: Utils.geoCoordMap["双流"].concat([100])
            }]
          }
          ]
        };
        self.earthMap.setOption(option);
      },
      //绘制饼图
      getPie(mapName, pieData) {
        let self = this;
        let fontsize;
        let fontsize1;
        let radius;
        if (self.screenFlag == 1) {
          fontsize = 22;
          fontsize1 = 18;
          // radius = '60%'
          radius = '64%'
        } else {
          fontsize = self.screenFlag * 18
          fontsize1 = self.screenFlag * 18
          radius = 80 * self.screenFlag + '%'
        }
        let data = []
        for (let i in pieData) {
          data.push({
            value: pieData[i].value,
            name: pieData[i].name,
            itemStyle: {
              normal: {
                color: pieData[i].color
              }
            }
          })
        }

        let option = {
          tooltip: {
            show: false
          },
          grid: {
            left: '11%',
            right: '11%',
          },
          selectedMode: false,
          series: [
            {
              name: '进出港',
              type: 'pie',
              label: {
                normal: {
                  position: 'inner',
                  formatter: '{d}%',
                  fontSize: fontsize,
                  fontWeight: 'bold'
                }
              },
              hoverAnimation: false,
              labelLine: {
                show: true
              },
              radius: radius,
              center: ['50%', '50%'],
              startAngle:180, //起始角度
              avoidLabelOverlap: false,
              data: data,
              itemStyle: {
                normal: {
                  label:{ 
                    show: true,
                    formatter: '{b} : {c}' 
                  }
                }
	            },
            },
            {
              name: '进出港',
              type: 'pie',
              label: {
                normal: {
                  position: 'outer',
                  // formatter: '{b}\n{c|{c}}',
                  fontSize: fontsize1,
                  color: '#c1c5cc',
                  rich:{
                    c:{
                      padding:10,
                      fontSize: fontsize1,
                      color: '#fff',
                    }
                  }
                }
              },
              hoverAnimation: false,
              labelLine: {
                show: true,
                length: 0,
                length2: 0.5
              },
              radius: radius,
              startAngle:180, //起始角度
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              data: data,
              itemStyle: {
                normal: {
                  label:{ 
                    show: true,
                    formatter: '{b} : {c}' 
                  }
                }
	            },
            }
          ]
        };
        mapName.setOption(option)
        window.addEventListener("resize", function() {
          // self.areaStatisCont.resize();
          mapName.resize();
      });
      },

      //销毁echarts
      destroyEcharts(echarts) {
        //销毁echars里面的数据，重新绘图渲染
        if (echarts && !echarts.isDisposed()) {
          echarts.clear();
          echarts.dispose();
        }
      },

      onresizeEcharts() {
        let self = this;
        window.onresize = function () {
          self.earthMap.resize();
          self.worldMap.resize();
          self.outwardMap.resize();
          self.inwardMap.resize();
        }
      },
    },


  }

  function randomData() {
    return Math.round(Math.random() * 1000);
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -icab-box-sizing: border-box;
    -khtml-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  #statisticsInOut {
    /* height: 100%; */
    height: 100vh;
    width: 100%;
    background-image: url('./img/bg.jpg');
    background-color: rgba(0, 0, 0, 0);
    transform: scale(1);
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    transform-origin: left top 0px;
    /*background-size: 100%;*/
  }

  header,
  section {
    width: 98%;
    margin: 0 auto;
    /*background-color: darkolivegreen;*/
  }

  div.black-bg {
    background-color: rgba(0, 0, 0, .5);
    position: relative;
  }

  header {
    position: relative;
    text-align: center;
    height: 90px;
    overflow: hidden;
    margin-top: 10px;
  }

  header > div > div {
    display: inline-block;
    vertical-align: top;
  }

  .header-data {
    display: block;
    margin-top: 5px;
  }

  .header-data > div {
    display: inline-block;
  }

  .data-line {
    background-color: rgb(255, 182, 34);
    width: 12%;
    height: 1px;
    line-height: 1px;
    vertical-align: middle;
  }

  .data-text {
    color: rgb(232, 232, 232);
    font-size: 18px;
    line-height: 18px;
  }

  .data-text .data-count {
    font-size: 28px;
    color: rgb(255, 182, 34);
    font-family: 微软雅黑;
  }

  header div.header {
    width: 36.53%;
    height: 57px;
    z-index: 0;
    transform: rotate(0deg);
    opacity: 1;
    pointer-events: auto;
    margin: 0 auto;
  }

  header .header-name {
    margin-top: 10px;
    /*width: 540px;*/
    width: 100%;
    height: 100%;
    background-image: url('./img/header.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    image-rendering: -webkit-optimize-contrast;
  }

  /*进去港*/
  section > div > div {
    display: inline-block;
    vertical-align: top;
  }

  /*底部*/
  div.section-bottom {
    margin-top: 20px;
    padding: 0 61px;
  }

  div.section-bottom > div {
    display: inline-block;
    vertical-align: top;
  }

  div.section-bottom div.col-container div.age-statistics {
    width: 100%
  }

  div.col-container {
    width: 49%;
    display: inline-block;
    vertical-align: top;
  }

  .col-title {
    display: block;
    position: relative;
    margin-bottom: 35px;
  }

  .col-title div.col-icon {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 152px;
    height: 40px;
    background: url('./img/tit-icon.png') no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
  }

  .col-title div.col-text {
    width: 300px;
    margin-left: 30px;
    font-size: 23px;
    color: rgb(138, 218, 255);
    font-weight: bold;
  }

  .col-line {
    height: 73px;
    width: 90%;
    position: absolute;
    top: -18px;
    left: 142px;
  }

  .col-line .line-gif {
    width: 100%;
    height: 100%;
    opacity: 1;
    background-image: url("./img/line.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  div.section-bottom div.block-area,
  .end-box .end-contain .block-area {
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 32px 37px;
    border-image-source: url('./img/block-bg.png');
    border-image-slice: 32 37 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    background: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  div.section-bottom div.block-header > span {
    display: inline-block;
  }

  div.section-bottom div.block-header > span:first-child {
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    border: none;
    border-radius: 0px;
    margin-right: 10px;
  }

  div.section-bottom div.block-header > span:nth-child(2) {
    font-size: 1.3rem;
    color: rgb(255, 255, 255);
    font-weight: bold;
  }

  div.section-bottom div.block-content {
    width: 100%;
  }

  .block-content-right {
    width: 100%;
    padding-top: 20px;
  }

  .block-header > div {
    display: inline-block;
  }

  .block-header div.block-title {
    line-height: 18px;
    font-size: 18px;
    color: #ffffff;
    font-family: 微软雅黑;
    font-weight: bold;
  }

  .block-header div.block-wave-gif {
    width: 260px;
    height: 30px;
  }

  .block-header div.block-wave-gif > div {
    width: 100%;
    height: 100%;
    opacity: 1;
    background-image: url("./img/wave.gif");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left top;
    margin-top: 8px;
  }

  .block-col {
    margin-bottom: 50px;
  }
  .block-col .block-data.right{
    margin-left: 23%;
  }
  .block-col .block-data.right2{
    margin-bottom:0;
  }

  .block-data {
    margin-top: 25px;
    display: inline-block;
    width: 24%;
    white-space: nowrap;
  }


  .block-data .block-data-tit .block-data-tit-icon {
    width: 8px;
    height: 30px;
    border: none;
    border-radius: 0px;
    filter: blur(0px);
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
  }

  .block-data .block-data-tit .block-data-tit-text {
    font-size: 24px;
  }

  .block-data .block-data-text {
    font-size: 18px;
    margin-left: 20px;
  }

  .block-data .block-data-text div {
    font-size: 40px;
    font-weight: bold;
  }

  .yellow-bg {
    background-color: rgb(255, 182, 34);
  }

  .yellow-font {
    color: rgb(255, 182, 34);
  }

  .blue-bg {
    background-color: rgb(23, 230, 255);
  }

  .blue-font {
    color: rgb(23, 230, 255);
  }

  #domesticMap {
    height: 480px;
    z-index: 50;
    position: relative;
  }

  #internationalMap {
    height: 330px;
  }

  #outwardMap {
    width: 363px;
    height: 367px;
    display: inline-block;
  }

  #inwardMap {
    width: 363px;
    height: 367px;
    display: inline-block;
  }

  .circleMap {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .circleMap {
    height: 400px;
  }
  /* 新改页面样式开始 */
  .end-box{
    padding: 0 61px;
    height: 220px;
    margin-top: 20px;
  }
  .end-box .end-contain{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .end-content{
    padding: 0 23px;
  }
  .flex-onebox{
    width: 100%;
    display: flex;
  }
  .flex-onebox .one-item{
    /* width: 33.3%; */
    /* margin: 0 12px; */
    margin: 0 3px;
    text-align: center;
  }
  .flex-onebox .flex-twobox{
    display: flex;
  }
  .flex-onebox .flex-twobox .two-item{
    width: 25%;
  }
  .orange-bg{
    background-color: #b08110;
  }
  .shallowblue-bg{
    background-color: #52b3c8;
  }
  .shallowgreen-bg{
    background-color: #6cb58f;
  }
  .orange-font{
    color: #b08110;
  }
  .shallowblue-font{
    color: #52b3c8;
  }
  .shallowgreen-font{
    color: #6cb58f;
  }
  .white-font{
    color: #ffffff;
  }
  .one-item .twobox-tit{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .two-item .item-tit{
    font-size: 12px;
    height: 48px;
    line-height: 48px;
  }
  .two-item .item-num{
    font-size: 16px;
    height: 52px;
    line-height: 52px;
  }

  

  /* 新改页面样式结束 */

  @media screen and (min-width: 1024px) {
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 76%;
      position: absolute;
      top: -23px;
      left: 122px;
    }

    header {
      height: 60px;
    }

    header div.header {
      width: 39.53%;
      height: 31px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
      width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 56px;
      padding-top: 20px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }
    div.section-bottom div.block-content{
      margin-top: 50px;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 20px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 15px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 280px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 15px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 80px;
      padding-left: 9%;
    }
    .block-header div.block-title{
    font-size: 20px;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1280px) {
    /* 新改样式开始 */
    .end-box {
      padding: 0 20px;
    }
    /* 新改样式结束 */
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 84%;
      position: absolute;
      top: -3px;
      left: 122px;
    }

    header {
      height: 60px;
    }

    header div.header {
      width: 39.53%;
      height: 31px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
       width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 60px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 20px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 15px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 270px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 26px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 50px;
      padding-left: 9%;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1366px) {
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 84%;
      position: absolute;
      top: -3px;
      left: 122px;
    }

    header {
      height: 90px;
    }

    header div.header {
      width: 39.53%;
      height: 36px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
       width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 60px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 22px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 19px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 270px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 26px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 50px;
      padding-left: 9%;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1400px) {
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 84%;
      position: absolute;
      top: -3px;
      left: 122px;
    }

    header {
      height: 90px;
    }

    header div.header {
      width: 39.53%;
      height: 36px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
       width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 60px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 22px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 19px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 270px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 26px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 50px;
      padding-left: 9%;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1440px) {
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 84%;
      position: absolute;
      top: -33px;
      left: 122px;
    }

    header {
      height: 60px;
    }

    header div.header {
      width: 39.53%;
      height: 36px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
       width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 60px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 22px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 19px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 270px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 26px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 50px;
      padding-left: 9%;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1600px) {
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 84%;
      position: absolute;
      top: -3px;
      left: 122px;
    }

    header {
      height: 60px;
    }

    header div.header {
      width: 31.53%;
      height: 36px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
       width: 50%;
      height: 100%;
    }

    div.section-bottom div.col-container div.age-statistics {
      height: 580px;
    }

    div.section-bottom div.block-content:nth-child(2) {
      padding: 27px 0 0 35px;
    }

    .data-text {
      font-size: 13px;
      line-height: 13px;
    }

    .data-text .data-count {
      font-size: 19px;
    }

    div.section-bottom {
      margin-top: 10px;
      padding: 0 20px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 60px;
      font-size: 17px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 5px;
      height: 22px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 31px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 24px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 19px;
    }

    .block-data .block-data-text div {
      font-size: 24px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 40px;
    }

    #domesticMap {
      height: 270px;
      z-index: 50;
      position: relative;
    }

    .block-content-right {
      padding: 10px 0 0 26px;
    }
    .block-col.right2{
      margin-bottom:0;
    }
    .block-col {
      margin-bottom: 50px;
      padding-left: 9%;
    }

    #internationalMap {
      height: 240px;
    }
  }

  @media screen and (min-width: 1920px) {
    /* 新改样式开始 */
    .end-box {
      padding: 0 61px;
    }
    div.section-bottom div.block-content{
      margin-top:0;
    }
    /* 新改样式结束 */
    div.section-bottom div.col-container div.age-statistics {
      width: 100%;
    }

    .col-line {
      height: 73px;
      width: 90%;
      position: absolute;
      top: 0;
      left: 142px;
    }

    header {
      height: 90px;
    }

    header div.header {
      width: 36.53%;
      height: 57px;
      z-index: 0;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: 1;
      pointer-events: auto;
      margin: 0 auto;
    }

    #outwardMap, #inwardMap {
      width: 400px;
      height: 400px;
    }

    div.section-bottom div.col-container div.age-statistics {
      /* height: 464px; */
      height: 620px;
    }

    div.section-bottom div.block-content {
      padding: 25px 0 0 60px;
    }

    .data-text {
      font-size: 18px;
      line-height: 18px;
    }

    .data-text .data-count {
      font-size: 28px;
    }

    div.section-bottom {
      margin-top: 20px;
      padding: 0 61px;
    }

    .col-title div.col-text {
      width: 300px;
      margin-left: 56px;
      padding-top: 20px;
      font-size: 20px;
      color: rgb(138, 218, 255);
      font-weight: bold;
    }

    .block-data .block-data-tit .block-data-tit-icon {
      width: 8px;
      height: 30px;
      border: none;
      border-radius: 0px;
      -webkit-filter: blur(0px);
      filter: blur(0px);
      display: inline-block;
      vertical-align: top;
      margin-right: 8px;
    }

    .block-data .block-data-text {
      font-size: 18px;
      margin-left: 20px;
    }

    .col-title div.col-icon {
      width: 152px;
      height: 40px;
    }

    .col-title {
      display: block;
      position: relative;
      margin-bottom: 35px;
    }

    .block-data .block-data-tit .block-data-tit-text {
      font-size: 24px;
    }

    .block-data .block-data-text div {
      font-size: 40px;
      font-weight: bold;
    }

    .block-col {
      margin-bottom: 50px;
      padding-left:9%;
    }
    .block-col.right2{
      margin-bottom:0;
    }

    #domesticMap {
      height: 480px;
      z-index: 50;
      position: relative;
    }

    #internationalMap {
      height: 330px;
    }

    .block-content-right {
      width: 100%;
    }

  }


</style>
