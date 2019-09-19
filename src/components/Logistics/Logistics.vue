<template>
  <div class="logistics-container">
    <div class="logistics-title">成都双流国际机场物流信息统计分析</div>
    <div class="logistics-content">
      <div class="logistics-div content-left">
        <div class="left-title line-height-color">今日物流情况总览</div>
        <!--图表-->
        <div class="left-charts">
          <div class="charts-title">国内货运总量（吨）</div>
          <div class="charts-container">
            <div class="charts-info" id="left_charts01"></div>
            <div class="charts-desc">
              <p><span style="background:rgb(45, 124, 203) "></span>出港：{{firstPieData.length>0?firstPieData[0].value:0}}</p>
              <p><span style="background:rgb(245, 199, 255) "></span>进港：{{firstPieData.length>0?firstPieData[1].value:0}}</p>
            </div>
          </div>
        </div>
        <div class="left-charts">
          <div class="charts-title" style="margin-top: 0">国际货运总量（吨）</div>
          <div class="charts-container">
            <div class="charts-info" id="left_charts02"></div>
            <div class="charts-desc">
              <p><span style="background:rgb(45, 124, 203) "></span>出港：{{secondPieData.length>0?secondPieData[0].value:0}}</p>
              <p><span style="background:rgb(245, 199, 255) "></span>进港：{{secondPieData.length>0?secondPieData[0].value:0}}</p>
            </div>
          </div>
        </div>
        <!--滚动字幕-->
        <div class="left-title line-height-color" style="top: 540px;">近30日货运量TOP5</div>
        <div class="left-scrollbar">
          <div class="left-scrollbar-title">
            <div>日期</div>
            <div>货运量（吨）</div>
          </div>
          <div id="scrollMsg" style="height: calc(100% - 50px);width: 100%;overflow: hidden">
            <div class="swiper-container task">
              <div class="swiper-wrapper">
                <div class="swiper-slide" >
                  <!---->
                  <div class="items" v-for="(list,index) in statistics" :style="index%2===0?'background-color:#1d1237':'background-color:#141236'">
                    <div class="ball-items"><span class="blue-ball">{{index}}</span></div>
                    <span>{{list.name}}</span>
                    <span>{{list.value?list.value.toFixed(2):0}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧地图-->
      <div class="logistics-div content-right">
        <div class="right-top-container">
          <div class="right-top-left" id="map"></div>
          <div class="right-top-right">
            <div class="right-top-right-charts">
              <div class="right-top-right-charts-title">出港货邮量城市TOP10</div>
              <div class="right-top-right-charts" id="depTop10"></div>
            </div>
            <div class="right-top-right-charts">
              <div class="right-top-right-charts-title">进港货邮量城市TOP10</div>
              <div class="right-top-right-charts" id="ArrTop10"></div>
            </div>
          </div>
        </div>
        <div class="right-bottom-container">
          <div class="right-bottom-title">24小时航班载货情况</div>
          <div class="right-bottom-charts-desc">
            <span><i style="background: rgba(92,239,238,0.5);"></i>出港</span>
            <span><i style="background: rgba(131,32,220,0.5)"></i>进港</span>
          </div>
          <div class="right-bottom-charts" id="load24"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import Swiper from "swiper";
  import {getTodayOfSixtySec,getLogisticsBy30,getLogisticsByMap} from "../../API/Logistics"

  export default {
    name: "Logistics",
    data() {
      return {
        maintainSwiper: null,
        statistics: [],
        firstPieData: [],
        secondPieData: [],
        firstBarData: {x:[],y:[]},
        secondBarData: {x:[],y:[]},
        threeBarData: {x:[],y1:[],y2:[]},
        sixtySetInterval:null,
        ThirtySetInterval:null,
      }
    },
    created() {
      document.title = "已完成物流";
      this.getSixtySecData();
      this.getThirtySecData();
      this.getLogisticsByMapData();
      this.sixtySetInterval = setInterval(()=>{
        this.getSixtySecData();
        this.getLogisticsByMapData();
      },60000);
      this.ThirtySetInterval = setInterval(()=>{
        this.getThirtySecData();
      },30000);

    },
    destroyed(){
      clearInterval(this.sixtySetInterval);
      clearInterval(this.ThirtySetInterval);
    },
    methods: {
      /*拿数据60秒刷新一次的数据：今日物流情况总览，进出港货邮量，24小时航班载货情况*/
      async getSixtySecData() {
        const self = this;
        self.firstPieData = [];
        self.secondPieData = [];
        self.firstBarData = {x:[],y:[]};
        self.secondBarData = {x:[],y:[]};
        self.threeBarData = {x:[],y1:[],y2:[]};
        await getTodayOfSixtySec().then((data) => {
          if (data.status === 200) {
            for (let item of data.data.today) {
              item.value = item.value?item.value:0;
              if (item.name.indexOf("国内") >= 0) {
                  self.firstPieData.push(item)
              } else {
                self.secondPieData.push(item)
              }
            }
            for (let item of data.data.top10OfDep) {
              self.firstBarData.x.push(item.name);
              self.firstBarData.y.push(item.value);
            }
            for (let item of data.data.top10OfArr) {
              self.secondBarData.x.push(item.name);
              self.secondBarData.y.push(item.value);
            }
            for (let item of data.data.today24Dep) {
              item.value = item.value?item.value:0;
              self.threeBarData.x.push(item.name);
              self.threeBarData.y1.push(item.value);
            }
            for (let item of data.data.today24Arr) {
              item.value = item.value?item.value:0;
              self.threeBarData.y2.push(item.value);
            }
            self.initCharts('left_charts01', self.firstPieData);
            self.initCharts('left_charts02',  self.secondPieData);
            self.initChartsTopTen('depTop10', self.firstBarData);
            self.initChartsTopTen('ArrTop10', self.secondBarData);
            self.initChartsBottom('load24', self.threeBarData);


          }
        }).catch(() => {

        })
      },
      /*拿数据30秒刷新的数据近三十日货运量*/
      async getThirtySecData(){
        const self = this;
        self.statistics = [];
        await getLogisticsBy30().then((data)=>{
          if(data.status === 200){
            self.statistics = data.data;
          }
        }).catch(()=>{

        })
      },
      /*加载左侧图表*/
      initCharts(elementId, data) {
        let self = this;
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          let option = {
            tooltip: {
              trigger: ''
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (params) {
                      //自定义颜色
                      var colorList = [
                        'rgb(45, 124, 203)', 'rgb(245, 199, 255)',
                      ];
                      return colorList[params.dataIndex]
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: data
              }
            ]
          };
          myChart.setOption(option);
        });
      },
      /*swiper动画*/
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
        if (len === 1) {

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
      /*加载右侧图表*/
      initChartsTopTen(elementId, data) {
        let self = this;
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          /*设置字体颜色*/
          let textStyle = {
            color: "#fff"
          };
          let option = {
            color: ['rgb(35, 153, 152)'],
            xAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              axisLabel: {
                rotate: -30
              },
              type: 'category',
              data: data.x,

            },
            yAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(255,255,255,0.3)"
                }
              },
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            series: [{
              data: data.y,
              label: {
                show: false,
                normal: {
                  color: "#fff"
                }
              },
              barWidth: 15,
              type: 'bar',
              itemStyle: {
                normal: {
                  borderWidth: "15px",
                  borderColor: "#fff"
                },

              }
            }]
          };
          myChart.setOption(option);
        });
      },
      /*加载右侧底部图表*/
      initChartsBottom(elementId, data) {
        let self = this;
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          let textStyle = {
            color: "#fff"
          };
          let option = {
            grid: {
              top: "36px",
              left: "35px",
              right: "5px",
              bottom: "50px",
              width: "auto", //图例宽度
              height: "75%", //图例高度
            },
            xAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(0,0,0,0)"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              type: 'category',
              data: data.x,
            },
            yAxis: {
              name: '吨',
              nameTextStyle: {
                align: "left",
                padding: [0, 0, 0, -22]
              },
              nameLocation: "end",
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(255,255,255,0.3)"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              scale: true
            },
            series: [{
              name: '出港',
              data: data.y1,
              type: 'scatter',
              itemStyle: {
                normal: {
                  color: "rgba(92, 239, 238, 0.5)",
                  borderColor: "rgb(92, 239, 238)"
                }
              }
            }, {
              name: '进港',
              data: data.y2,
              type: 'scatter',
              itemStyle: {
                normal: {
                  color: "rgba(131, 32, 220, 0.5)",
                  borderColor: "rgb(131, 32, 220)"
                }
              }
            }]
          };
          myChart.setOption(option);
        });
      },
      /*加载地图数据每60秒拿一次数据*/
      async getLogisticsByMapData(){
        const self = this;
       await getLogisticsByMap().then((data)=>{
         if(data.status === 200){
          self.initChartsMap('map', data.data);
         }
       })
      },
      /*加载地图*/
      initChartsMap: function (elementId, data) {

        let self = this;
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          let lineHeight = {normal: {show: true}};
          let maxNumberArray = [];
          for (let item of data) {
            item.label = lineHeight;
            item.value = item.value ? item.value: 0 ;
            maxNumberArray.push(item.value);
          }
          let maxNumber = Math.max.apply(null, maxNumberArray);
          let option = {
            dataRange: {
              show: false,
              min: 0,
              max: maxNumber,
              x: 'left',
              y: 'bottom',
              color: ['RGBA(0, 255, 240, 0.5)', 'RGBA(5, 96, 125, 0.8)', 'RGBA(77, 77, 77, 0.5)'],
              text: ['高', '低'],           // 文本，默认为数值文本
              calculable: true
            },
            tooltip: {
              show: false
            },
            series: [
              {
                name: 'china',
                label: {
                  show: true,
                  normal: {
                    textStyle: {color: "#fff"}
                  }
                },
                type: 'map',
                mapType: 'china',
                itemStyle: {
                  normal: {label: {show: false}, borderColor: "#fff"},
                  emphasis: {label: {show: true}},
                  borderColor: "#fff",
                  color: "#fff"
                },
                data: data
              },
            ]
          };
          myChart.setOption(option);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .logistics-container {
    width: 1920px;
    height: 1080px;
    background-image: url("./img/log_bg.jpg");
    background-color: rgba(13, 42, 67, 0);
    transform: scale(1);
    transform-origin: left top 0;
    background-size: 100%;
    padding: 20px 24px 0 24px;
    box-sizing: border-box;
    background-repeat: no-repeat;
  }

  .logistics-div {
    float: left;
    box-sizing: border-box;
    position: relative;
  }

  .logistics-title {
    width: 560px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .content-left {
    width: 456px;
    height: 1000px;
    border-style: solid;
    border-width: 46px 305px 117px 33px;
    border-image-source: url(./img/left_bg.png);
    border-image-slice: 46 305 117 33 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: repeat;
    background: none;
  }

  .content-right {
    width: calc(100% - 456px);
    height: 1008px;
    border-style: solid;
    border-width: 46px 305px 117px 33px;
    border-image-source: url(./img/left_bg.png);
    border-image-slice: 46 305 117 33 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: repeat;
    background: none;
  }

  .left-title {
    width: 254px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    left: -10px;
    top: -25px;
    position: absolute;
  }

  .line-height-color {
    color: rgb(139, 239, 255);
  }

  .left-charts {
    width: calc(456px - 75px);
  }

  .charts-container {
    height: 197px;
  }

  .charts-title {
    margin-top: 20px;
    width: 208px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(255, 255, 255);
    font-weight: normal;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 22px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .charts-container > div {
    float: left;
    width: 50%;
    height: 100%;
  }

  .charts-desc {
    align-items: center;
    justify-content: flex-start;
    color: rgb(255, 255, 255);
    font-weight: normal;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 50px 0;
    box-sizing: border-box;
  }

  .charts-desc p {
    position: relative;
    padding-left: 15px;
    margin-bottom: 16px;
  }

  .charts-desc p span {
    position: absolute;
    left: 0;
    height: 100%;
    width: 10px;
    top: 0;
  }

  .left-scrollbar {
    width: 392px;
    height: 316px;
    overflow: hidden;
    background-color: transparent;
    cursor: pointer;
    margin-top: 60px;
    position: relative;
    left: -10px;
  }

  .left-scrollbar-title {
    padding-left: 50px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(8, 82, 117, 0.7);
    height: 50px;
    line-height: 50px;
    color: #44D3E4;
    font-size: 20px;
    font-family: Microsoft Yahei;
  }

  .left-scrollbar-title > div {
    float: left;
    width: 50%;
    text-align: center;
  }

  div.items {
    color: #41c5d7;
    height: 58px;
    line-height: 58px;
    div.ball-items {
      width: 10%;
      display: inline-block;
      text-align: center;
    }
    span:nth-child(2) {
      width: 45%;
      display: inline-block;
      text-align: center;
    }
    span:nth-child(3) {
      width: 40%;
      display: inline-block;
      text-align: center;
    }
  }

  .blue-ball {
    background-color: #224a69;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    line-height: 25px;
    text-align: center;
    margin-left: 5%;
  }

  .right-top-container {
    height: calc(100% - 194px);
    width: 1340px;
  }

  .right-top-container > div {
    float: left;
    height: 100%;
  }

  .right-top-left {
    width: calc(100% - 500px;);
  }

  .right-top-right {
    width: 500px;
  }

  .right-top-right > div {
    height: 324px;
    width: 100%;
  }

  .right-top-right-charts-title, .right-bottom-title {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: rgb(139, 239, 255);
    font-weight: bold;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: right;
    padding-right: 20px;
  }

  .right-bottom-title {
    text-align: left;
    justify-content: flex-start;
  }

  .right-bottom-container {
    height: 264px;
    position: absolute;
    box-sizing: border-box;
    bottom: -75px;
    width: 1340px;
  }

  .right-top-right-charts {
    height: 276px;
    width: 100%;
    position: relative;
    right: -24px;
  }

  .right-bottom-charts {
    height: calc(100% - 48px);
    width: 100%;
    position: relative;
  }

  .right-bottom-charts-desc {
    position: absolute;
    right: 0;
  }

  .right-bottom-charts-desc i {
    display: inline-block;
    margin-right: 2px;
    width: 14px;
    position: relative;
    top: 2px;
    left: -1px;
    height: 14px;
  }
</style>
