<template>
  <div class="body-bg">
    <!-- 内容 -->
    <div
      id="nightFlight"
      class="marketnight-flight"
    ></div>
    <!-- 顶部 -->
    <div class="header-cont">
      <div class="header-lf">
        <span class="flight-logo"></span>
        <h2>航空市场部过夜飞机数统计</h2>
      </div>
      <div class="header-lr">
        <span
          class="time com-span"
          v-cloak
        >
          {{ disposeDate }}
          <!-- <em>:22</em> -->
        </span>
        <!-- <span class="temperature com-span">
          25/32℃
        </span> -->
      </div>
    </div>
    <!-- 右边信息 -->
    <div class="night-flight-content">
      <!-- 过夜航班 -->
      <div class="one-floor">
        <div class="top-info">
          <span class="info-tit topinfo-lf com-topinfo">过夜航班</span>
          <span class="info-sign topinfo-lr com-topinfo">今日/昨日</span>
        </div>
        <div class="embellish-img"></div>
        <div
          id="nightFlightMap"
          class="nightflight-map"
        ></div>
      </div>
      <!-- 管制区分布 -->
      <div class="two-floor">
        <div class="top-info">
          <span class="info-tit topinfo-lf com-topinfo">管制区分布</span>
          <span class="info-sign topinfo-lr com-topinfo">今日</span>
        </div>
        <div class="embellish-img"></div>
        <div
          id="controlareaDistribution"
          class="controlarea-distribution-map"
        ></div>
      </div>
      <!-- 洲际航线分布 -->
      <div class="three-floor">
        <div class="top-info">
          <span class="info-tit topinfo-lf com-topinfo">洲际航线分布</span>
          <span class="info-sign topinfo-lr com-topinfo">今日</span>
        </div>
        <div class="embellish-img"></div>
        <div
          id="IHGFlightCont"
          class="IHGflight-distribution"
        >
          <!-- <div id="IHGFlightOne" class="IHGflight-distribution"> -->
          <div id="IHGFlightOne">
            <!-- <el-scrollbar style="height: 100%;overflow-x: hidden;"> -->
            <ul>
              <li
                v-for="(item,index) in IHGlist"
                :key="index"
              >
                <span class="circle-sign"></span>
                <p class="flight-name">{{ item.area }}</p>
                <p class="flight-num">{{ item.total }}</p>
              </li>
            </ul>
            <!-- </el-scrollbar> -->
          </div>
          <div id="IHGFlightTwo"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import {MarketOver} from '../API/marketOvernightFlight'
require("../../static/js/bmap.js");
export default {
  name: "Echarts",
  created() {
    document.title = "航空市场部过夜飞机数统计";
  },
  data() {
    return {
      date: new Date(),
      disposeDate: "",
      nightLightCont: "",
      controlareaDistributionCont: "",
      mapCont: "",
      IHGlist: [],
      airlineSign: "arrival"
    };
  },
  mounted() {
    const self = this;
    this.timer = setInterval(function() {
      self.date = new Date(); //修改数据date
      self.disposeDate = comm.dateFormat(self.date);
    }, 1000);
    self.getOvernightFlight();
    self.getControlarea();
    self.getIHGLight();
    // 地图
    self.getAirlineData(self.airlineSign);
    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getAirlineData(self.airlineSign);
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
    // 全局地图循环
    airlineMap(airlineSign, data) {
      const self = this;
      // arrival  到达
      // departure  出发，离开
      let arrivalArr = [];
      let arrivalJWdegArr = [];
      let arrivalTooltipArr = [];
      let departureArr = [];
      let departureJWdegArr = [];
      let departureTooltipArr = [];

      // 到达数据
      let arrivalData = data.arrival;
      let arrivalNum = 5;
      for (let i = 0; i < arrivalData.length; i++) {
        // 图标提示数据处理
        arrivalTooltipArr.push({
          staticName: "成都",
          name: arrivalData[i].airportStartName,
          FLTno: arrivalData[i].flightNo
        });
        // 经纬度数据处理
        arrivalJWdegArr.push(
          arrivalData[i].airportStartName +
            ":" +
            arrivalData[i].airportStartLng +
            "," +
            arrivalData[i].airportStartLat
        );
        //城市名称数据
        arrivalArr.push([
          {
            name: arrivalData[i].airportStartName,
            value: arrivalNum++
          },
          {
            name: arrivalData[i].airportTerminalName
          }
        ]);
      }
      let centerPrice = "成都:103.9526,30.7617";
      arrivalJWdegArr.push(centerPrice);
      let arrivalJWdegObj = {};
      let disposeArr = [];
      for (let item in arrivalJWdegArr) {
        let name = arrivalJWdegArr[item].split(":");
        let firstName = name[0];
        let lastName = name[1].split(",");
        disposeArr[firstName] = [];
        disposeArr[firstName].push(lastName[0].split("[")[0]);
        disposeArr[firstName].push(lastName[1].split("]")[0]);
      }
      for (let i in disposeArr) {
        arrivalJWdegObj[i] = disposeArr[i];
      }

      /*
      离开数据
      */
      // let departureData  = data.departure.slice(0,2)
      let departureData = data.departure;
      // console.log(data.departure[5])
      let departureNum = 5;
      for (let i = 0; i < departureData.length; i++) {
        // 图标提示数据处理
        departureTooltipArr.push({
          name: departureData[i].airportTerminalName,
          staticName: "成都",
          FLTno: departureData[i].flightNo
        });
        // 经纬度数据处理
        departureJWdegArr.push(
          departureData[i].airportTerminalName +
            ":" +
            departureData[i].airportTerminalLng +
            "," +
            departureData[i].airportTerminalLat
        );
        //城市名称数据
        departureArr.push([
          {
            name: departureData[i].airportStartName
          },
          {
            // FLTno: departureData[i].flightNo,
            name: departureData[i].airportTerminalName,
            value: departureNum++
          }
        ]);
      }
      departureJWdegArr.push(centerPrice);
      let departureJWdegObj = {};
      for (let item in departureJWdegArr) {
        let name = departureJWdegArr[item].split(":");
        let firstName = name[0];
        let lastName = name[1].split(",");
        disposeArr[firstName] = [];
        disposeArr[firstName].push(lastName[0].split("[")[0]);
        disposeArr[firstName].push(lastName[1].split("]")[0]);
      }
      for (let i in disposeArr) {
        departureJWdegObj[i] = disposeArr[i];
      }

      if (airlineSign == "arrival") {
        self.$nextTick(function() {
          creatMap(
            self,
            airlineSign,
            arrivalTooltipArr,
            arrivalJWdegObj,
            arrivalArr
          );
        });
        self.airlineSign = "departure";
      } else {
        self.$nextTick(function() {
          creatMap(
            self,
            airlineSign,
            departureTooltipArr,
            departureJWdegObj,
            departureArr
          );
        });
        self.airlineSign = "arrival";
      }
    },
    //获取过夜航班数据
    async getOvernightFlight(){
      let self = this;
      await MarketOver.getOvernightFlight().then(function (result) {
        if (result.status === 200) {
          drawOvernightFlight(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取管制区分布数据
    async getControlarea(){
      let self =this;
      await MarketOver.getControlarea().then(function (result) {
        if (result.status === 200) {
          drawContareaDistribution(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取管制区分布数据
    async getIHGLight(){
      let self = this;
      await MarketOver.getIHGLight().then(function (result) {
        if (result.status === 200) {
          self.IHGlist = result.data;
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取地图数据【到达，离开】
    async getAirlineData(airlineSign){
      let self = this;
      await MarketOver.getAirlineData().then(function (result) {
        if (result.status === 200) {
          self.airlineMap(airlineSign, result.data);
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
 全局地图
 Echarts + 百度地图
*/
function creatMap(self, airlineSign, toolTipData, JWdegData, executeData) {
  let dom = document.getElementById("nightFlight");
  self.mapCont = echarts.init(dom);
  let startPoint = {
    x: 104.114129,
    y: 37.550339
  };
  // 地图自定义样式
  let bmap = {
    center: [startPoint.x, startPoint.y],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            // color: "#044161"
            color: "#002336"
          }
        },
        {
          featureType: "land",
          elementType: "all",
          stylers: {
            // color: "#004981"
            color: "#01192e"
          }
        },
        {
          featureType: "boundary",
          elementType: "geometry",
          stylers: {
            // color: "#064f85"
            weight: "0.7",
            color: "#203543"
          }
        },
        {
          featureType: "railway",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "highway",
          elementType: "geometry",
          stylers: {
            color: "#004981"
          }
        },
        {
          featureType: "highway",
          elementType: "geometry.fill",
          stylers: {
            color: "#005b96",
            lightness: 1
          }
        },
        {
          featureType: "highway",
          elementType: "labels",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry",
          stylers: {
            color: "#004981"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry.fill",
          stylers: {
            color: "#00508b"
          }
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "green",
          elementType: "all",
          stylers: {
            color: "#056197",
            visibility: "off"
          }
        },
        {
          featureType: "subway",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "manmade",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "local",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "arterial",
          elementType: "labels",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "boundary",
          elementType: "geometry.fill",
          stylers: {
            // color: "#029fd4"
            color: "#203543"
          }
        },
        {
          featureType: "building",
          elementType: "all",
          stylers: {
            color: "#1a5787"
          }
        },
        {
          featureType: "label",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        }
      ]
    }
  };
  let geoCoordMap = JWdegData;
  // console.log(geoCoordMap)

  let planePath =
    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

  let convertData = function(data) {
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

  let forsign = [];

  var color = ["#31d1f7", "#ffa022", "#46bee9"];
  // 出发
  var series = [];
  function outFun(forsign) {
    [
      // ['成都', CDData],
      // ['成都', executeData],
      forsign
    ].forEach(function(item, i) {
      series.push(
        {
          name: item[0],
          type: "effectScatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[2] / 8;
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: [
            {
              name: item[0],
              value: geoCoordMap[item[0]].concat([100])
            }
          ]
        },
        // {
        //     name: item[0],
        //     type: 'lines',
        //     coordinateSystem: 'bmap',
        //     zlevel: 1,
        //     effect: {
        //         show: true,
        //         period: 6,
        //         trailLength: 0.9,
        //         color: '#fff',
        //         symbolSize: 2
        //     },
        //     lineStyle: {
        //         normal: {
        //             color: color[i],
        //             width: 0,
        //             curveness: 0.2
        //         }
        //     },
        //     data: convertData(item[1])
        // },
        {
          name: item[0],
          type: "lines",
          coordinateSystem: "bmap",
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0],
          type: "effectScatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: "stroke", //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[2] / 7;
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        }
      );
    });
  }

  // 到达
  function enterFun(forsign) {
    [forsign].forEach(function(item, i) {
      series.push(
        {
          name: item[0],
          type: "effectScatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[2] / 8;
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: [
            {
              name: item[0],
              value: geoCoordMap[item[0]].concat([100])
            }
          ]
        },

        {
          name: item[0],
          type: "lines",
          coordinateSystem: "bmap",
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0],
          type: "effectScatter",
          coordinateSystem: "bmap",
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: "stroke",
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: function(val) {
            return val[2] / 7;
          },
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[0].name,
              value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            };
          })
        }
      );
    });
  }

  if (airlineSign === "arrival") {
    series = [];
    enterFun(["成都", executeData]);
  } else {
    console.log(airlineSign);
    series = [];
    outFun(["成都", executeData]);
  }

  let option = {
    bmap: bmap,
    color: ["gold", "aqua", "lime"],
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        if (typeof (params.data.FLTno === "undefined")) {
          let toolTiphtml = "";
          if (airlineSign === "arrival") {
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].FLTno + "<br>";
                toolTiphtml +=
                  toolTipData[i].name +
                  "----" +
                  toolTipData[i].staticName +
                  "<br>";
              }
            }
            return toolTiphtml;
          } else {
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].FLTno + "<br>";
                toolTiphtml +=
                  toolTipData[i].staticName +
                  "----" +
                  toolTipData[i].name +
                  "<br>";
              }
            }
            return toolTiphtml;
          }
        } else {
        }
      }
    },
    legend: {
      orient: "vertical",
      top: "bottom",
      left: "right",
      data: ["北京 Top10", "上海 Top10", "广州 Top10"],
      textStyle: {
        color: "#fff"
      },
      selectedMode: "single"
    },
    geo: {
      map: "bmap",
      polyline: true,
      progressiveThreshold: 500,
      progressive: 200,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: "#323c48",
          borderColor: "#404a59"
        },
        emphasis: {
          areaColor: "#2a333d"
        }
      }
    },
    series: series
  };

  if (option && typeof option === "object") {
    self.mapCont.setOption(option, true);
  }
}

/*
过夜航班
*/
function drawOvernightFlight(self, dataCont) {
  self.nightLightCont = echarts.init(document.getElementById("nightFlightMap"));
  let _boyActual = [];
  let yesterdayList = [];
  let _bgshow = [];
  let _college = [];
  // let newName = [];
  for (let i = 0; i < dataCont.length; i++) {
    _boyActual.push(dataCont[i].today);
    yesterdayList.push(dataCont[i].yesterday);
    _college.push(dataCont[i].airlineName.split("空")[0] + "空");
  }

  let maxPlanCourseCnt = Math.max.apply(null, yesterdayList);
  let maxRealCourseCnt = Math.max.apply(null, _boyActual);
  let maxCourseCnt = Math.max(maxPlanCourseCnt, maxRealCourseCnt);

  $.each(yesterdayList, function(i, d) {
    _bgshow.push(maxCourseCnt);
  });

  let option = {
    tooltip: {
      show: "true",
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "none" // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function(param) {
        let html = _college[param[1].dataIndex] + "<br/>";
        html += "今日：" + param[1].value + "<br/>";
        html += "昨日：" + yesterdayList[param[1].dataIndex] + "<br/>";
        return html;
      }
    },
    grid: {
      left: "22%",
      right: "13%",
      bottom: "5%",
      top: 10
    },
    xAxis: {
      type: "value",
      show: true,
      max: maxCourseCnt,
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
    },
    yAxis: [
      {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: "#6df8f0"
        },
        splitLine: {
          show: false
        },
        data: _college
      },
      {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: "#6df8f0"
        },
        splitLine: {
          show: false
        },
        position: "right",
        offset: 10,
        data: [],
        zLevel: "3"
      },
      {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          color: "#6df8f0"
        },
        splitLine: {
          show: false
        }
      },
      {
        type: "category",
        splitLine: "none",
        axisTick: "none",
        axisLine: "none",
        data: []
      }
    ],
    series: [
      {
        name: "",
        type: "bar",
        barWidth: 3,
        barGap: "-100%",
        barCategoryGap: "60%",
        label: {
          normal: {
            show: true,
            color: "#a8e7ff",
            formatter: function(data) {
              return (
                _boyActual[data.dataIndex] +
                " / " +
                yesterdayList[data.dataIndex]
              );
            },
            distance: 25,
            align: "center",
            position: "right"
          }
        },
        itemStyle: {
          normal: {
            color: "transparent"
            // barBorderRadius: 20
          }
        },
        data: _bgshow
      },
      {
        name: "昨天",
        type: "bar",
        barWidth: 3,
        // barGap: '50%',
        barCategoryGap: "60%",
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: "#31352f",
            barBorderRadius: 20
          }
        },
        data: yesterdayList
      },
      {
        name: "今日",
        type: "bar",
        barWidth: 3,
        barCategoryGap: "60%",
        label: {
          normal: {
            show: false,
            color: "#fff",
            position: [320, -8],
            fontSize: "24",
            fontFamily: "myFirstFont"
          }
        },
        itemStyle: {
          normal: {
            show: false,
            color: "#6df8f0",
            barBorderRadius: 20
          }
        },
        data: _boyActual,
        zLevel: "2"
      },
      {
        name: "外圆",
        type: "scatter",
        barCategoryGap: "60%",
        hoverAnimation: false,
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: "#6df8f0",
            opacity: 1,
            shadowColor: "#6df8f0",
            shadowBlur: 10
          }
        },
        data: _boyActual
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  self.nightLightCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.nightLightCont.resize();
  });
}
/**
 * 管制区分布
 */
function drawContareaDistribution(self, dataCont) {
  self.controlareaDistributionCont = echarts.init(
    document.getElementById("controlareaDistribution")
  );
  let xData = [];
  let data = [];
  for (let i = 0; i < dataCont.length; i++) {
    xData.push(dataCont[i].area);
    data.push(dataCont[i].total);
  }
  let maxPlanCourseCnt = Math.max.apply(null, data);

  let option = {
    tooltip: {
      show: "true",
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.7)", // 背景
      padding: [8, 10], //内边距
      extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);" //添加阴影
    },
    grid: {
      left: "5%",
      right: "5%",
      top: 30,
      bottom: "20%"
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#a8e7ff"
          }
        },
        axisLabel: {
          interval: 0,
          inside: false,
          textStyle: {
            color: "#6df8f0",
            fontWeight: "normal",
            fontSize: "12"
          }
        },
        data: xData
      }
    ],
    yAxis: {
      type: "value",
      show: false,
      max: maxPlanCourseCnt,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#32346c"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#32346c "
        }
      },
      axisLabel: {
        textStyle: {
          color: "#bac0c0",
          fontWeight: "normal",
          fontSize: "12"
        },
        formatter: "{value}名"
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        label: {
          normal: {
            show: true,
            color: "#9fcded",
            position: "top",
            fontSize: "12"
          }
        },
        itemStyle: {
          normal: {
            show: true,
            color: "#6df8f0",
            barBorderRadius: 50,
            borderWidth: 0,
            shadowBlur: 15,
            shadowColor: "rgba(105,123, 214, 0.7)"
          }
        },
        zlevel: 2,
        barWidth: "8px",
        data: data
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  self.controlareaDistributionCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.controlareaDistributionCont.resize();
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
  width: 100%;
  height: 1080px;
  background-color: #02020b;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.marketnight-flight {
  width: 100%;
  height: 100%;
}
.header-cont {
  position: absolute;
  left: 2%;
  top: 2%;
  color: #ffffff;
  width: 96%;
  height: 42px;
  line-height: 42px;
  overflow: hidden;
  .header-lf {
    width: 50%;
    float: left;
    overflow: hidden;
    .flight-logo {
      // width: 10%;
      width: 17%;
      height: 42px;
      display: inline-block;
      float: left;
      background: url("../../static/img/sljclogo.png") no-repeat;
      background-size: 100% 100%;
    }
    h2 {
      display: inline-block;
      font-weight: normal;
      font-size: 42px;
      margin-left: 10px;
      float: left;
    }
  }
  .header-lr {
    float: right;
    font-size: 32px;
    .com-span {
      display: inline-block;
    }
    .time {
    }
    .temperature {
      margin-left: 35px;
    }
  }
}
.night-flight-content {
  position: absolute;
  right: 2%;
  top: 8%;
  width: 20%;
  padding: 14px;
  background: #004b73;
  .top-info {
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    .com-topinfo {
      display: inline-block;
    }
    .topinfo-lf {
      float: left;
      font-size: 16px;
      color: #6df8f0;
    }
    .topinfo-lr {
      float: right;
      font-size: 12px;
      color: #a8e7ff;
    }
  }
  .embellish-img {
    height: 15px;
    background: url("../../static/img/late_passage_anima.gif");
    background-size: 35% 100%;
  }
  .one-floor {
    .nightflight-map {
      // height: 282px;
      height: 400px;
    }
  }
  .two-floor {
    .controlarea-distribution-map {
      height: 143px;
    }
  }
  .three-floor {
    .IHGflight-distribution {
      margin-top: 14px;
      height: 178px;
      overflow: hidden;
      ul {
        width: 100%;
        overflow: hidden;
        li {
          float: left;
          width: 18%;
          margin: 0 7% 14px 7%;
          border: 1px solid #53cfd1;
          border-radius: 10px;
          span {
            display: block;
            width: 18px;
            height: 18px;
            margin: 0 auto;
            border-radius: 50%;
            background: #62ffff;
          }
          p {
            text-align: center;
            height: 16px;
            line-height: 16px;
          }
          .circle-sign {
            margin-top: 10px;
          }
          .flight-name {
            color: #29bf7d;
            font-size: 12px;
          }
          .flight-num {
            color: #ffffff;
            font-size: 14px;
            background: #38cafe;
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .header-cont .header-lf h2{
    font-size: 28px;
  }
  .night-flight-content {
    width: 30%;
  }
  .header-cont .header-lr {
    font-size: 24px;
  }
}
@media screen and (min-width: 1366px) {
  .header-cont .header-lf h2{
    font-size: 30px;
  }
  .header-cont .header-lr {
    font-size: 26px;
  }
  .night-flight-content {
    width: 27%;
  }
}
@media screen and (min-width: 1680px) {
.header-cont .header-lf h2{
    font-size: 33px;
  }
}
@media screen and (min-width: 1920px) {
  .header-cont .header-lf h2{
    font-size: 42px;
  }
  .header-cont .header-lr {
    font-size: 32px;
  }
  .night-flight-content {
    width: 25%;
  }
}

// @media only screen and (max-width: 1550px) {
//   .night-flight-content .three-floor .IHGflight-distribution ul li {
//     width: 24%;
//     margin: 0 4% 14px 4%;
//   }
// }
// @media only screen and (max-width: 1440px) {
// }
// @media only screen and (max-width: 1366px) {
// }
</style>
