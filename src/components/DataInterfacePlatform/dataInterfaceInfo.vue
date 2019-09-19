<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="head-bor">
        <p>成都双流国际机场数据接口平台信息统计分析</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="cont-top ">
        <div class="topitem top-lf">
          <div class="toptwo-item toplf-lf">
            <div class="lf-onefloor">
              <p class="comm-tit">今日调用</p>
              <p class="white-font two-tit">总计</p>
              <div class="floor">
                <span class="yellow-font totalnum">{{ nowDayBusSysData.apiTotal }}</span><i class="white-font">个</i>
              </div>
              <div class="floor twoflex comm-i-num">
                <span class="time">
                  <p class="white-font two-tit">成功次数</p>
                  <span class="green-font timenum">{{ nowDayBusSysData.apiSuccess }}</span><i class="white-font">次</i>
                </span>
                <span class="time" style="width: 38%;">
                  <p class="white-font two-tit">超时次数(30s)</p>
                  <span class="red-font timenum">{{ nowDayBusSysData.apiFail }}</span><i class="white-font">次</i>
                </span>
                <span
                  id="successNumPie"
                  class="time success-numpie"
                  style="width: 29%;"
                ></span>
              </div>
            </div>
            <p class="wire-gif"></p>
            <div class="lf-twofloor">
              <p class="comm-tit">业务系统</p>
              <div class="twoflex comm-i-num">
                <span class="time">
                  <p class="white-font two-tit">总计</p>
                  <span class="yellow-font bus-sysnum">{{ nowDayBusSysData.sysTotal }}</span><i class="white-font">个</i>
                </span>
                <span class="time">
                  <p class="white-font two-tit">已启用</p>
                  <span class="green-font bus-sysnum">{{ nowDayBusSysData.sysUsing }}</span><i class="white-font">个</i>
                </span>
                <span class="time">
                  <p class="white-font two-tit">已禁用</p>
                  <span class="red-font bus-sysnum">{{ nowDayBusSysData.sysForbidden }}</span><i class="white-font">个</i>
                </span>
                <span
                  id="busSysNumPie"
                  class="time bussys-numpie"
                ></span>
              </div>
            </div>
          </div>
          <div class="toptwo-item toplf-lr">
            <div class="center-onefloor">
              <p class="comm-tit">系统调用接口次数占比</p>
              <div
                id="sysPortNumProportion"
                class="sysport-num"
              ></div>
            </div>
            <div class="center-twofloor">
              <p class="comm-tit">超时接口</p>
              <div class="overtime-portlist">
                <div v-if="nowDayBusSysData.apiFailNames == false">
                  <p class="white-font">暂无数据</p>
                  <p class="light-border"></p>
                </div>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
        <div class="topitem top-lr">
          <p class="comm-tit">业务系统调取次数</p>
          <div
            id="busSysTransferNumBar"
            class="bussys-transfer"
          ></div>
        </div>
      </div>
      <div class="cont-bottom">
        <div class="item bott-fl flex-lf">
          <div class="twoitem botcomm-bor bot-lf">
            <p
              class="comm-tit"
              style="margin-bottom: 0;"
            >24小时接口响应时间</p>
            <div
              id="hoursPortLine"
              class="hours-port"
            ></div>
          </div>
          <div class="twoitem botcomm-bor bot-lr">
            <p
              class="comm-tit"
              style="margin-bottom: 0;"
            >当前接口类型调用时长</p>
            <div
              id="atPortStyleTimeLength"
              class="atport-styletimeleng"
            ></div>
          </div>
        </div>
        <div class="item bott-lr botcomm-bor">
          <p
            class="comm-tit"
            style="margin-bottom: 0;"
          >接口调用次数</p>
          <div class="end-flex">
            <div class="bottlr-lf">
              <div id="portCallNumProgress" class="if-portcallnum"></div>
            </div>
            <div class="bottlr-lr">
              <div
                id="portCallNumLeida"
                class="elsePie"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import watePolo from "../../../static/lib/echarts-liquidfill.min.js";
import comm from "../Common.vue";
import DateTool from "../../../static/js/DateUtils.js";
import { dataInterFace } from "../../API/dataInterfaceInfo";

export default {
  name: "Echarts",
  created() {
    document.title = "成都双流国际机场数据接口平台信息统计分析";
  },
  data() {
    return {
      app: {
        securitySumIndex: -1,
      },
      nowDayBusSysData: {},
      sysPortNumProportion: [],//系统调用接口次数占比

      busSysTransferCont: "", //业务系统调取次数
      busSysTransferNumBar: [], //业务系统调取次数

      hoursPortCont: "", //24小时接口响应时间
      hoursPortLine: [], //24小时接口响应时间

      atPortStyleTimeLengthCont: "", //当前接口类型调用时长
      atPortStyleTimeLength: [], //当前接口类型调用时长


      portCallNumProgressCont: "", //接口调用次数柱形图
      portCallNumProgress: [], //接口调用次数柱形图

      portCallNumCont: "", //接口调用次数雷达图
      portCallNumLeida: [], //接口调用次数雷达图
    };
  },
  mounted() {
    const self = this;
    this.timer = setInterval(function() {
      self.date = new Date(); //修改数据date
      self.disposeDate = comm.dateFormat(self.date);
    }, 1000);

    self.getNowDayBusSysInfo();
    self.getSysPortSortInfo();
    self.getBusSysNumInfo();
    self.get24HoursInfo();
    self.getNowPortTimeLengthInfo();
    self.getPortUseNumInfo();

    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getNowDayBusSysInfo();
        self.getSysPortSortInfo();
        self.getBusSysNumInfo();
        self.get24HoursInfo();
        self.getNowPortTimeLengthInfo();
        self.getPortUseNumInfo();
      }, 180000);
    }

    window.addEventListener("resize", function() {
      self.$nextTick(function() {});
    });
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
    //今日调用 业务系统 超时接口
    async getNowDayBusSysInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .getNowDayBusSys(result)
        .then(result => {
          if (result.status === 200) {
            self.nowDayBusSysData = result.data;
            let data = result.data;
            let successNumRate = data.apiSuccess / data.apiTotal
            let busSysRate = data.sysUsing / data.sysTotal
            drawWatePoloPie(self,successNumRate,'successNumPie');
            drawWatePoloPie(self,busSysRate,'busSysNumPie');
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
    //系统调用接口次数占比 
    async getSysPortSortInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .getSysPortNumRatio(result)
        .then(result => {
          if (result.status === 200) {
            drawSysPortNumPie(self,result.data);
            drawLeidaPortNumLeida(self,result.data);
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
    //业务系统调取次数
    async getBusSysNumInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .getBusSysNum(result)
        .then(result => {
          if (result.status === 200) {
            drawSysNumProportion(self,result.data);
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
    //24小时接口响应时间
    async get24HoursInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .get24Hours(result)
        .then(result => {
          if (result.status === 200) {
            draw24hoursPortLine(self,result.data)
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })
        .catch(() => {
          console.log("get data error!");
        });
    },
    //当前接口类型调用时长
    async getNowPortTimeLengthInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .getNowPortTimeLength(result)
        .then(result => {
          if (result.status === 200) {
            drawAtPortStyleTimeLeng(self,result.data);
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
    //接口调用次数
    async getPortUseNumInfo() {
      const self = this;
      let result;
      let data = await dataInterFace
        .getPortUseNumBar(result)
        .then(result => {
          if (result.status === 200) {
            portCallNumProgressBar(self,result.data)           
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
  绘制水球图
 */
function drawWatePoloPie(self,value,watePoloBox){
  let pie = echarts.init(document.getElementById(watePoloBox));
  let ifColor;
  if(value < 0.2){
    ifColor = ["#BE154D","#156ACF","#1598ED","#45BDFF"]
  }else if(0.2 < value < 0.8){
    ifColor = ["#294D99 ","#156ACF","#1598ED","#45BDFF"]
  }else{
    ifColor = ["#228920","#156ACF","#1598ED","#45BDFF"]
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
              borderColor:"#4d7de2",
              borderWidth:3,
            }
          },
          backgroundStyle: {
              borderWidth: 3,
              color: 'rgb(255,0,255,0.01)'
          },
          label: {
              normal: {
                  formatter: value * 100 + '%',
                  textStyle: {
                      fontSize: 18
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

/*
  系统调用接口次数占比
 */
function drawSysPortNumPie(self,dataInfo){
  let pie = echarts.init(document.getElementById("sysPortNumProportion"));
  let colorArr = ['#fbf321','#fff','#24feb4','#23539b','#f93d6a','#00c0ff','#facd1e','#00e280'];
  let legendArr = [];
  let seriesData = [];
  if(dataInfo.length === 0){
    self.$message({
      type: "warning",
      message: '系统调用接口次数数据为空！'
    });
  }else{
    for(let i=0; i<dataInfo.length; i++){
      legendArr.push(dataInfo[i].type)
      seriesData.push({
        name: dataInfo[i].type,
        value: dataInfo[i].total
      })
    }
  }
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
            formatter: `{b}\n\n{d}%`
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

  let myChart = echarts.getInstanceByDom(document.getElementById("sysPortNumProportion"));
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
  
  // 使用刚指定的配置项和数据显示图表。
  pie.setOption(option, true);
  window.addEventListener("resize", function() {
    pie.resize();
  });
 


}

/*
  业务系统调取次数
  */
function drawSysNumProportion(self, dataInfo) {
  self.busSysTransferCont = echarts.init(
    document.getElementById("busSysTransferNumBar")
  );
  let legendData = [];
  let barData = [];
  let lineData = [];
  let xAxisData = [];
  let bgMaxData = [];
  for (let i = 0; i < dataInfo.length; i++) {
    if (dataInfo[i].date == "today") {
      dataInfo[i].date = "今日";
      legendData.push(dataInfo[i].date);
      for (let j = 0; j < dataInfo[i].detail.length; j++) {
        lineData.push(dataInfo[i].detail[j].total);
        xAxisData.push(dataInfo[i].detail[j].point);
      }
    } else {
      dataInfo[i].date = "昨日";
      legendData.push(dataInfo[i].date);
      for (let j = 0; j < dataInfo[i].detail.length; j++) {
        barData.push(dataInfo[i].detail[j].total);
      }
    }
  }
  let maxpoint = Math.max.apply(null, barData);
  if (maxpoint < 2500) {
    maxpoint = 2500;
  } else if (maxpoint < 3500) {
    maxpoint = 3500;
  } else if (maxpoint < 4500) {
    maxpoint = 4500;
  } else if (maxpoint < 5500) {
    maxpoint = 5500;
  } else if (maxpoint < 6500) {
    maxpoint = 6500;
  } else if (maxpoint < 7500) {
    maxpoint = 7500;
  } else if (maxpoint < 8500) {
    maxpoint = 8500;
  }
  for (let j = 0; j < dataInfo[0].detail.length; j++) {
    dataInfo[0].detail[j].maxpoint = maxpoint;
    bgMaxData.push(dataInfo[0].detail[j].maxpoint);
  }

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
      top: "8%",
      bottom: "8%",
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: "rect",
      top: "-5",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 12
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
        show: true
      },
      data: xAxisData
    },
    yAxis: [
      {
        name: "次",
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
          show: true,
          lineStyle: {
            color: "#3a3447",
            width: 0.5,
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      },
      {
        name: "计划（架）",
        type: "value",
        show: false,
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
        name: "昨日",
        type: "bar",
        barWidth: 16,
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
                color: "#2a6ed2"
              },
              {
                offset: 1,
                color: "#458efe"
              }
            ])
          }
        },
        data: barData,
        zlevel: 2
      },
      {
        name: "今日",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        smooth: true,
        type: "line",
        symbol: "circle",
        symbolSize: 10,
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "#fff400",
            fontSize: 14
          }
        },
        itemStyle: {
          normal: {
            color: "#fff400"
          }
        }, //拐点样式
        lineStyle: {
          // 系列级个性化折线样式
          width: 2,
          type: "solid",
          color: "#fff400"
        },
        data: lineData,
        zlevel: 3
      },
      {
        name: "",
        type: "bar",
        barWidth: 16,
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
        zlevel: 1
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  self.busSysTransferCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.busSysTransferCont.resize();
  });
}
/*
24小时接口响应时间
 */
function draw24hoursPortLine(self,dataInfo) {
  self.hoursPortCont = echarts.init(document.getElementById("hoursPortLine"));
  let seriesColor = ["#6cf5f2", "#f700ff", "#d4c919"];
  let legendData = [];
  let xaxisList = [];
  let metaDate = [];
  let serieData = [];

  for (let i = 0; i < dataInfo.length; i++) {
    let arrGroup = [];
    if(dataInfo[i].type === 'flight'){
      legendData.push('航班');
      for (let j = 0; j < dataInfo[i].detail.length; j++) {
        arrGroup.push(dataInfo[i].detail[j].avg);
      }
    }else if(dataInfo[i].type === 'passenger'){
      legendData.push('乘客');
      for (let j = 0; j < dataInfo[i].detail.length; j++) {
        arrGroup.push(dataInfo[i].detail[j].avg);
      }
    }else if(dataInfo[i].type === 'baggage'){
      legendData.push('行李');
      for (let j = 0; j < dataInfo[i].detail.length; j++) {
        arrGroup.push(dataInfo[i].detail[j].avg);
      }
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
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: seriesColor[v]
        }
      }, //拐点样式
      lineStyle: {
        // 系列级个性化折线样式
        width: 2,
        type: "solid",
        color: seriesColor[v]
      },

      data: metaDate[v]
    };
    serieData.push(serie);
  }
  var option = {
    // backgroundColor: "#0a2a43",
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    legend: {
      icon: "rect", //icon为圆角矩形
      top: "-5",
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
      left: 0,
      top: "15%",
      right: "4%",
      bottom: "0",
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
        interval: 0,
        color: "#9da3ad"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      name: "毫秒",
      nameGap: 8,
      type: "value",
      splitLine: {
        show: false
      }, //去除网格线
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
  self.hoursPortCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.hoursPortCont.resize();
  });
}
/*
当前接口类型调用时长
 */
function drawAtPortStyleTimeLeng(self,dataInfo) {
  self.atPortStyleTimeLengthCont = echarts.init(
    document.getElementById("atPortStyleTimeLength")
  );
  let legendData = [];
  let barData = [];
  let xAxisData = [];
  let bgMaxData = [];
  for (let i = 0; i < dataInfo.length; i++) {
    xAxisData.push(dataInfo[i].type);
    barData.push(dataInfo[i].total);
  }
  let maxpoint = Math.max.apply(null, barData);
  if (maxpoint < 600) {
    maxpoint = 600;
  } else if (maxpoint < 1200) {
    maxpoint = 1200;
  } else if (maxpoint < 1800) {
    maxpoint = 1800;
  } else if (maxpoint < 2400) {
    maxpoint = 2400;
  } else if (maxpoint < 3000) {
    maxpoint = 3000;
  } else if (maxpoint < 3600) {
    maxpoint = 3600;
  } else if (maxpoint < 4200) {
    maxpoint = 4200;
  }
  for (let j = 0; j < dataInfo.length; j++) {
    dataInfo[j].maxpoint = maxpoint;
    bgMaxData.push(dataInfo[j].maxpoint);
  }
  // console.log(legendData);
  // console.log(maxpoint);
  // console.log(bgMaxData);

  var option = {
    color: ["#2c7ccb"],
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
      top: "13%",
      bottom: "5%",
      containLabel: true
    },
    legend: {
      // data: legendData,
      data: ['接口名称'],
      icon: "rect",
      top: "-5",
      right: "45",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 16
      }
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      //设置字体倾斜
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        rotate: -45, //倾斜度 -90 至 90 默认为0
        margin: 10,
        textStyle: {
          color: "#c4c5c1"
        }
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: "#c4c5c1",
          opacity: 1
        }
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false
      },
      axisTick: {
        show: true
      }
    },
    yAxis: [
      {
        name: "毫秒",
        type: "value",
        min: 0,
        max: maxpoint,
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          // interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
          textStyle: {
            color: "#c4c5c1"
          }
        },
        axisLine: {
          //坐标轴轴线相关设置
          onZero: false,
          lineStyle: {
            color: "#c4c5c1",
            opacity: 1
          }
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            color: "#3a3447",
            width: 0.5,
            type: "dashed"
          }
        },
        axisTick: {
          show: true
        }
      }
    ],
    series: [
      {
        name: "时长",
        type: "bar",
        barWidth: 27,
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
            color: "#65f5f3"
          }
        },
        data: barData,
        zlevel: 2
      },
      {
        name: "",
        type: "bar",
        barWidth: 27,
        xAxisIndex: 0,
        // yAxisIndex: 1,
        // barGap: '-135%',
        barGap: "-100%",
        // data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        data: bgMaxData,
        itemStyle: {
          normal: {
            color: "#484446"
          }
        },
        zlevel: 1
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  self.atPortStyleTimeLengthCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.atPortStyleTimeLengthCont.resize();
  });
}
/*
接口调用次数柱形图
 */
function portCallNumProgressBar(self,dataInfo) {
    self.portCallNumProgressCont = echarts.init(document.getElementById("portCallNumProgress"));   
    let honorData = [];
    let sumNum = null;
    if(dataInfo.length === 0){
      self.$message({
        type: "warning",
        message: '系统调用接口次数数据为空！'
      });
    }else{
      for(let i=0; i<dataInfo.length; i++){
        sumNum += dataInfo[i].total
        let price = [];
        if(dataInfo[i].type === '航班'){
          price.push(dataInfo[i].total)
          honorData.push({
            name: '航班',
            data: price
          })
        }else if(dataInfo[i].type === '旅客'){
          price.push(dataInfo[i].total)
          honorData.push({
            name: '乘客',
            data: price
          })
        }else if(dataInfo[i].type === '行李'){
          price.push(dataInfo[i].total)
          honorData.push({
            name: '行李',
            data: price
          })
        }else if(dataInfo[i].type === '其他'){
          price.push(dataInfo[i].total)
          honorData.push({
            name: '其他',
            data: price
          })
        }
      }
    }
    // console.log(sumNum)
    // console.log(honorData)
    let legendData = [],
        sumArray = [],
        honorXAxisData = ["汇总"];
    let maxArray = [];
    let sumData1 = null;
    let sumData2 = null;
    let sumData3 = null;
    let sumData4 = null;
    let sumData5 = null;
    honorData.map(function(a, b) {
        legendData.push(a.name);
        a.data.map(function(x, y) {
            switch (y) {
                case 0:
                    sumData1 += x;
                    break;
                case 1:
                    sumData2 += x;
                    break;
                case 2:
                    sumData3 += x;
                    break;
            }
        });
    });
    maxArray.push(sumData1, sumData2, sumData3, sumData4, sumData5);
    // 设置灰色背景色的长度
    let isMax = maxArray.sort(function(a, b) {
        return b - a
    })[0] * 1.1;
    let bjData1 = [isMax, isMax, isMax, isMax, isMax];
    let bjData2 = [isMax + 20, isMax + 20, isMax + 20, isMax + 20, isMax + 20];
    let option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "none"
            },
            borderColor: "#ddd",
            textStyle: {
                // color: '#3c3c3c',
                fontSize: 16
            },
            formatter: function(p) {
                var relVal = p[0].name;
                var sum = 0;
                for (var z = 0; z < p.length; z++) {
                    if (!(p[z].seriesName == 1001 || p[z].seriesName == 1000)) {
                        sum += p[z].value;
                    }
                }
                for (var i = 0; i < p.length; i++) {
                    if (!(p[i].seriesName == 1001 || p[i].seriesName == 1000)) {
                        relVal += "<br>" + p[i].marker + p[i].seriesName + " " + p[i].value + " " + "(" + ((100 * parseFloat(p[i].value)) / parseFloat(sum)).toFixed(2) + "%)";
                    }
                }
                return relVal;
            }
        },
        backgroundColor: "#131835",
        color: ["#41f5f3", "#33a5fd", "#2f39cc", "#eef2f7", "#efefef", "#eef2f7"],
        legend: {
            data: legendData,
            top: '-10%',
            right: '7%',
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 14,
            // itemGap: 30, // 例间距
            padding: 30,
            textStyle: {
                color: "#ffffff",
                fontSize: 14
            }
        },
        grid: {
            left: "10%",
            right: "10%",
            bottom: "5%",
            top: "10%",
            containLabel: true
        },
        xAxis: [{
                type: "value",
                show: false
            },
            {
                type: "value",
                show: false
            }
        ],
        yAxis: [{
                type: "category",
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#ffffff",
                    fontSize: 16, // 文字大小
                    fontWeight: 400,
                    interval: 0
                },
                offset: 20,
                data: honorXAxisData
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
                    color: "#fff",
                    fontSize: 36,
                    fontWeight: 300,
                    interval: 0
                }
            }
        ],
        series: [{
                name: "航班",
                type: "bar",
                barWidth: 27,
                stack: "总量",
                itemStyle: {
                    normal: {
                        show: true,
                        barBorderRadius: [30, 0, 0, 30]
                    }
                },
                zlevel: 10,
                data: honorData[0].data
            },
            {
                name: "乘客",
                type: "bar",
                barWidth: 27,
                stack: "总量",
                zlevel: 10,
                data: honorData[1].data
            },
            {
                name: "行李",
                type: "bar",
                stack: "总量",
                barWidth: 27,
                zlevel: 10,
                data: honorData[2].data
            },{
                name: "其他",
                type: "bar",
                stack: "总量",
                barWidth: 27,
                zlevel: 10,
                data: honorData[3].data
            },
            {
                name: "1000",
                type: "bar",
                barGap: "-100%",
                barWidth: 27,
                itemStyle: {
                    normal: {
                        color:'transparent',
                        borderColor:'#525465',
                        borderWidth: 1,
                        barBorderRadius: [30, 30, 30, 30]
                    }
                },
                xAxisIndex: 0,
                data: bjData1,
                emphasis: {
                    itemStyle: {
                    }
                },
                zlevel: 5
            }
        ]
    }

    // 使用刚指定的配置项和数据显示图表。
    self.portCallNumProgressCont.setOption(option, true);
    window.addEventListener("resize", function() {
      self.portCallNumProgressCont.resize();
    });
}
/*
接口调用次数雷达图
 */
function drawLeidaPortNumLeida(self,dataInfo) {
  self.portCallNumCont = echarts.init(document.getElementById("portCallNumLeida"));
  let radius = "50%";
  let leiDaCenter = ["50%", "45%"];

  let sumNum = null;
  let price = [];
  let radarAllDatas = [];
  let indicatorData = [];
  for(let i=0; i<dataInfo.length; i++){
    sumNum += dataInfo[i].total
  }
  let oneArr = [];
  for(let i=0; i<dataInfo.length; i++){
    if(dataInfo[i].type === '公众号'){
      price.push(dataInfo[i].total)
      indicatorData.push({
        name: "公众号",
        max: 9000,
        pre: dataInfo[i].total
      })
    }else if(dataInfo[i].type === '智能引导屏'){
      price.push(dataInfo[i].total)
      indicatorData.push({
        name: "智能引导屏",
        max: 9000,
        pre: dataInfo[i].total
      })
    }else if(dataInfo[i].type === '民航'){
      price.push(dataInfo[i].total)
      indicatorData.push({
        name: "民航",
        max: 9000,
        pre: dataInfo[i].total
      })
    }else if(dataInfo[i].type === '贵宾'){
      price.push(dataInfo[i].total)
      indicatorData.push({
        name: "贵宾",
        max: 9000,
        pre: dataInfo[i].total
      })
    }
  }
  
  oneArr.push({
    value: price,
    name: '占比'
  })
  radarAllDatas.push(oneArr);
  // console.log(price)
  // console.log(radarAllDatas)
  let leiDadata = [
    {
        name: "贵宾",
        max: 9000,
        pre: 1000
    }, {
        name: "公众号",
        max: 9000,
        pre: 1000
    }, {
        name: "智能引导屏",
        max: 9000,
        pre: 1000
    }, {
        name: "民航",
        max: 9000,
        pre: 1000
    }
  ];

  let colorListRadar = ["#65f5f3", "#277ace", "#00e606", "#ffb900"];
  let leiDaArr = []; //雷达图
  let leiDaXzhou = []; //轮播的名称
  let legendLeiDa = []; //用于装legend的
  let displayLeiDaAllTitle = []; //显示雷达图的参数
  for (let z = 0; z < radarAllDatas.length; z++) {
    leiDaXzhou.push(radarAllDatas[z][0].name);
    legendLeiDa.push({
      name: radarAllDatas[z][0].name,
      icon: "rect"
    });
    leiDaArr.push({
      name: radarAllDatas[z][0].name,
      type: "radar",
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: colorListRadar[z]
        }
      },
      areaStyle: {
        normal: {
          color: colorListRadar[z],
          opacity: 0.7
        }
      },
      lineStyle: {
        normal: {
          color: colorListRadar[z],
          type: "solid",
          width: 2,
          opacity: 1
        }
      },
      data: radarAllDatas[z]
    });
  }

  var option = {
    baseOption: {
      timeline: {
        show: false,
        type: "slider",
        axisType: "category",
        bottom: "0",
        currentIndex: 0, //0 时表示当前选中项为 timeline.data[0]（即使用 options[0]
        autoPlay: true, //是否自动播放
        loop: true,
        rewind: true, //反向轮播
        realtime: true, //拖动圆点的时候，是否实时更新视图。
        controlPosition: "left",
        label: {
          normal: {
            color: "#2998ff"
          }
        },
        itemStyle: {
          normal: {
            color: "#fff",
            borderColor: "#2998ff",
            borderWidth: 2
          }
        },
        checkpointStyle: {
          //『当前项』（checkpoint）的图形样式
          color: "rgb(215, 0, 0)"
        },
        lineStyle: {
          show: true, //false 不显示轴线
          color: "#2998ff"
        },
        controlStyle: {
          //控制按钮的样式
          show: true,
          showPrevBtn: true,
          showNextBtn: true,
          itemGap: 50,
          itemSize: 36,
          normal: {
            color: "rgb(215, 0, 0)",
            borderColor: "rgb(215, 0, 0)"
          },
          emphasis: {
            color: "rgb(215, 0, 0)",
            borderColor: "rgb(215, 0, 0)"
          }
        },
        data: leiDaXzhou
      },
      legend: {
        show: true,
        top: "92%",
        x: "center",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 14,
          color: "#fff"
        },
        data: legendLeiDa
      },
      radar: [
        {
          indicator: leiDadata,
          radius: radius,
          center: leiDaCenter,
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
          name: {
            show: true,
            fontSize: 12,
            color: "#fff",
            formatter: function(value, indicator) {
              return indicator.name + " " + indicator.pre + "次";
            }
          },
          nameGap: 8,
          splitArea: {
            areaStyle: {
              color: "transparent",
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              // color: '#0095B0'
              color: "#5d606e",
              width: 1,
              type: "dashed"
            }
          },
          splitLine: {
            lineStyle: {
              // color: 'rgba(0,155,226,0.6)'
              color: "rgba(93,96,110,0.6)",
              width: 1,
              type: "dashed"
            }
          },
          indicator: leiDadata
        }
      ],

      series: leiDaArr //series结束
    },
    options: [
      {
        radar: [
          {
            indicator: indicatorData
          }
        ],
        series: [
          {
            z: 1,
            itemStyle: {
              normal: {
                opacity: 0.6
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.6
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.6
              }
            },
            data: [
              {
                value: price
              }
            ]
          }
        ]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  self.portCallNumCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.portCallNumCont.resize();
  });
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

html {
  font-size: 16px;
}
body {
  font-size: 16px;
}

.body-bg {
  width: 99%;
  height: 1042px;
  // height: 100%;
  padding: 1% 0.5%;
  // background: url("../../static/img/late_bg.jpg");
  background-color: #091a36;
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
  height: 80px;
  margin-bottom: 10px;
  .head-bor {
    width: 600px;
    height: 46px;
    margin: 0 auto;
    border-style: solid;
    border-width: 14px 14px;
    border-image: url("../../../static/img/one-bord.png") 14 14 / 1;
    background: none;
    p {
      color: rgb(255, 255, 255);
      font-weight: bold;
      font-family: "Microsoft Yahei", Arial, sans-serif;
      font-size: 28px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.content {
  clear: both;
  width: 99%;
  padding: 0 0.5%;
  position: relative;
  .comm-tit {
    height: 50px;
    line-height: 50px;
    font-size: 22px;
    color: #8befff;
    margin-bottom: 8px;
  }
  .white-font {
    color: #ffffff;
  }
  .yellow-font {
    color: #fff600;
  }
  .green-font {
    color: #6fe637;
  }
  .red-font {
    color: #ff3e05;
  }
  i {
    font-style: normal;
  }
  .cont-top {
    width: 97.5%;
    // height: 600px;
    height: 540px;
    border-style: solid;
    border-width: 30px 23px;
    border-image: url("../../../static/img/datainterbor.png") 30 23;
    background: none;
    display: flex;
    .topitem {
      width: 50%;
    }
    .top-lr {
      .bussys-transfer {
        height: 500px;
      }
    }
    .top-lf {
      margin-right: 15px;
      display: flex;
      .toptwo-item {
        width: 50%;
        .toplf-lf {
          margin-right: 15px;
        }
      }
    }
  }
  .cont-bottom {
    width: 100%;
    display: flex;
    .item {
      width: 50%;
      margin: 20px 0 0 0;
    }
    .botcomm-bor {
      height: 290px;
      border-style: solid;
      border-width: 10px 10px 30px 20px;
      border-image: url("../../../static/img/dataintertwobor.png") 10 10 30 20;
      background-color: #131835;
    }
    .bott-fl {
      margin-right: 15px;
    }
    .bott-fr {
      width: 100%;
      margin-left: 15px;
    }
    .bott-lr {
      .end-flex {
        width: 100%;
        height: 245px;
        display: flex;
        .bottlr-lf {
          width: 65%;
          height: 100%;
          .if-portcallnum{
            height: 100%;
          }
        }
        .bottlr-lr {
          width: 35%;
          height: 100%;
          .elsePie {
            height: 100%;
          }
        }
      }
    }
  }
}
.toptwo-item {
  .two-tit {
    font-size: 20px;
    height: 45px;
    line-height: 45px;
  }
  .floor {
    margin-bottom: 20px;
    .time {
      .timenum {
        font-size: 40px;
      }
    }
    .success-numpie {
      height: 97px;
    }
  }
  .twoflex {
    width: 100%;
    height: 97px;
    display: flex;
    .time {
      width: 33%;
      height: 100%;
    }
  }
  .totalnum {
    font-size: 60px;
  }
  .lf-onefloor {
  }
  .wire-gif {
    width: 100%;
    margin-left: -45px;
    height: 15px;
    background-image: url("../../../static/img/donxian.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .lf-twofloor {
    .bus-sysnum {
      font-size: 25px;
    }
    i {
      font-size: 18px;
    }
  }
  .comm-i-num {
    i {
      font-size: 18px;
    }
  }
  i {
    font-size: 30px;
  }
}
.toplf-lf {
}
.toplf-lr {
  .sysport-num {
    width: 100%;
    height: 265px;
  }
  .light-border{
    width: 100%;
    height: 2px;
    // background: -webkit-linear-gradient(-30deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0) 230px, rgba(255, 255, 255, 0.1) 260px, rgba(255, 255, 255, 0.1) 270px, rgba(255, 255, 255, 0) 300px, rgba(255, 255, 255, 0) 310px) no-repeat -270px 0, #1370fb, no-repeat;
    background:  #1370fb;
    transition: 1s;
  }
}
.flex-lf {
  width: 100%;
  display: flex;
  .twoitem {
    width: 50%;
    height: 100%;
  }
  .bot-lf {
    margin-right: 15px;
    .hours-port {
      height: 245px;
    }
  }
  .bot-lr {
    .atport-styletimeleng {
      height: 245px;
    }
  }
}

@media screen and (min-width: 1024px) {
}

@media screen and (min-width: 1280px) {
  
}

@media screen and (min-width: 1366px) {
  .head .head-bor p {
    font-size: 1.8rem;
  }
  .content .comm-tit {
    font-size: 1.2rem;
  }
  .toptwo-item .totalnum {
    font-size: 3rem;
  }
  .toptwo-item .floor .time .timenum {
    font-size: 1.8rem;
  }
  .toptwo-item .two-tit {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 1400px) {
  .head .head-bor p {
    font-size: 1.8rem;
  }
  .content .comm-tit {
    font-size: 1.2rem;
  }
  .toptwo-item .totalnum {
    font-size: 3.8rem;
  }
  .toptwo-item .floor .time .timenum {
    font-size: 2.5rem;
  }
  .toptwo-item .two-tit {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 1440px) {
  .head .head-bor p {
    font-size: 1.8rem;
  }
  .content .comm-tit {
    font-size: 1.3rem;
  }
  .toptwo-item .totalnum {
    font-size: 3.8rem;
  }
  .toptwo-item .floor .time .timenum {
    font-size: 2.5rem;
  }
  .toptwo-item .two-tit {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 1600px) {
  .head .head-bor p {
    font-size: 1.8rem;
  }
  .content .comm-tit {
    font-size: 1.3rem;
  }
  .toptwo-item .totalnum {
    font-size: 3.8rem;
  }
  .toptwo-item .floor .time .timenum {
    font-size: 2.5rem;
  }
  .toptwo-item .two-tit {
    font-size: 1.3rem;
  }
}

@media screen and (min-width: 1920px) {
  .head .head-bor p {
    font-size: 1.8rem;
  }
  .content .comm-tit {
    font-size: 1.4rem;
  }
  .toptwo-item .totalnum {
    font-size: 3.8rem;
  }
  .toptwo-item .floor .time .timenum {
    font-size: 2.5rem;
  }
  .toptwo-item .two-tit {
    font-size: 1.3rem;
  }

}
</style>
