<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <p>成都双流国际机场手机值机情况信息统计</p>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="cont-lf">
        <div class="lf-top comm-bor">
          <div class="one-floor comm-lfbor">
            <p class="onecomm-tit">当月手机值机累计人数</p>
            <span class="onecomm-num qianblue">{{ MonthDayYestedayData.nowMonthNumber }}</span><i>人</i>
          </div>
          <div class="two-floor comm-lfbor">
            <p class="twocomm-tit">当日手机值机人数</p>
            <span class="twocomm-num qianblue">{{ MonthDayYestedayData.nowNumber }}</span><i>人</i>
            <p class="twocomm-tit" style="margin-top: 24px;">昨日手机值机人数</p>
            <span class="twocomm-num qianblue">{{ MonthDayYestedayData.yesterdayNumber }}</span><i>人</i>
          </div>
        </div>
        <div class="lf-bottom comm-bor">
          <div class="comm-lfbor">
            <p class="onecomm-tit" style="margin-bottom: 15px;">手机值机用户安检口统计</p>
          </div>
          <div id="UserSecurityStatis" class="security-statis"></div>
          <div class="statis-list">
            <span v-for="(item,index) in userSecurityList" :key="index">{{ item.name }}：{{ item.value }}</span>
            <!-- <span>C区：167</span>
            <span>DE区：126</span>
            <span>FG区：374</span> -->
          </div>
        </div>
      </div>
      <div class="cont-lr">
        <div class="lr-top">
          <!-- 地图区域 -->
          <div class="lftop-lf">
            <div id="chinaMap" class="map-box">

            </div>
          </div>
          <div class="lftop-lr">
            <p class="onecomm-tit">航空公司手机值机TOP10</p>
            <div class="mobileTOP-list">
              <div class="msg-cont-title">
                <span></span>
                <span>航空公司</span>
                <span>手机值机数</span>
              </div>
              <div class="msg-tag">
                <div id="scrollMsg" style="height: 500px;overflow: hidden">
                  <div class="swiper-container task">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(list,listindex) in airlineTop10Data" :key="listindex">
                        <div class="items"
                             v-for="(item,index) in list" :key="index">
                          <div class="ball-items"><span class="blue-ball">{{listindex * 10 + index + 1}}</span></div>
                          <span>{{ item.name }}</span>
                          <span>{{ item.number }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lr-bottom">
          <p class="onecomm-tit" style="margin-bottom: 8px;">手机值机月增长情况</p>
          <div id="mobileMonthIncrease" class="monthadd-info"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import echarts from "echarts";
  import comm from "../Common.vue";
  import Swiper from "swiper";
  import DateTool from "../../../static/js/DateUtils.js";
  import { mobile } from "../../API/mobileOperator"
  require("../../../static/lib/echarts-gl.min.js");
  require("../../../static/js/bmap.js");
  require("../../../static/lib/chain1.js");

  export default {
    name: "Echarts",
    created() {
      document.title = "手机值机";
    },
    data() {
      return {
        app: {
          securitySumIndex: -1,
        },
        userSecurityList: [],
        MonthDayYestedayData: {},
        airlineTop10Data: [],
        maintainSwiper: '',

        getSecurityCheckCont: "",
        getSecurityCheck: [],

        mobileMonthIncreaseCont: "",
        mobileMonthIncrease: [],
      };
    },
    mounted() {
      const self = this;
      this.timer = setInterval(function () {
        self.date = new Date(); //修改数据date
        self.disposeDate = comm.dateFormat(self.date);
      }, 1000);

      self.getMonthDayYestedayInfo();
      self.getChinaMapInfo();
      self.getAirlineTop10Info();
      self.getUserSecurityInfo();
      self.getMonthAddInfo();

      if (this.pageTimes) {
        clearInterval(this.pageTimes);
      } else {
        this.pageTimes = setInterval(() => {
          self.getMonthDayYestedayInfo();
          self.getChinaMapInfo();
          self.getAirlineTop10Info();
          self.getUserSecurityInfo();
          self.getMonthAddInfo();
        }, 180000);
      }

      window.addEventListener("resize", function () {
        self.$nextTick(function () {

        });
      })

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
      //当月，当日，昨日手机值机人数
      async getMonthDayYestedayInfo(){
        const self = this;
        let result;
        let data = await mobile.getLeftTop(result).then((result) => {
          if (result.status === 200) {
            self.MonthDayYestedayData = result.data;
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //地图数据
      async getChinaMapInfo(){
        const self = this;
        let result;
        let data = await mobile.getMap(result).then((result) => {
          if (result.status === 200) {
            drawChinaMap3D(self,result.data)
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //航空公司手机值机TOP10
      async getAirlineTop10Info(){
        const self = this;
        let result;
        let data = await mobile.getAirlineTOP10(result).then((result) => {
          if (result.status === 200) {
            // self.airlineTop10Data = result.data;
            self.handleData(result.data);
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //手机值机用户安检口统计
      async getUserSecurityInfo(){
        const self = this;
        let result;
        let data = await mobile.getSecurityCheck(result).then((result) => {
          if (result.status === 200) {
            // drawUserSecurityPie(self,result.data);
            let dataInfo = result.data;
            let legendArr = [];
            let seriesData = [];
            //处理所需数据
            for(let i=0; i<dataInfo.length; i++){
              if(dataInfo[i].type === 'AB'){
                seriesData.push({
                  name: 'B区',
                  value: dataInfo[i].value
                })
                legendArr.push('B区')
              }else if(dataInfo[i].type === 'AC'){
                seriesData.push({
                  name: 'C区',
                  value: dataInfo[i].value
                })
                legendArr.push('C区')
              }else if(dataInfo[i].type === 'DE'){
                seriesData.push({
                  name: 'DE区',
                  value: dataInfo[i].value
                })
                legendArr.push('DE区')
              }else if(dataInfo[i].type === 'FG'){
                seriesData.push({
                  name: 'FG区',
                  value: dataInfo[i].value
                })
                legendArr.push('FG区')
              }
            }
            self.userSecurityList = seriesData;
            //绘制环形图
            drawUserSecurityPie(self,legendArr,seriesData);
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //手机值机月增长
      async getMonthAddInfo(){
        const self = this;
        let result;
        let data = await mobile.getMonthAdd(result).then((result) => {
          if (result.status === 200) {
            drawMonthAddBar(self,result.data);
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        }).catch(() => {
          console.log("error!");
        });
      },
      //处理top10滚动整屏数据
      handleData(data) {
        let self = this;
        let temp = [];
        let len = Math.ceil(data.length / 10);
        for (let i = 0; i < len; i++) {
          let arr = [];
          let acLen = ((i + 1) * 10) >= data.length ? data.length : (i + 1) * 10;
          for (let k = (i * 10); k < acLen; k++) {
            arr.push(data[k])
          }
          temp.push(arr);
        }
        self.airlineTop10Data = temp;
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
手机值机用户安检口统计
*/
  function drawUserSecurityPie(self, legendArr,seriesData){
    let pie = echarts.init(document.getElementById("UserSecurityStatis"));
    let colorArr = ['#fbf321','#fff','#24feb4','#23539b'];
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

    let myChart = echarts.getInstanceByDom(document.getElementById("UserSecurityStatis"));
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
   
  };
  function drawTestUserSecurityPie(self, legendArr,seriesData){
    let pie = echarts.init(
      document.getElementById("UserSecurityStatis")
    );
    let colorArr = ['#fbf321','#fff','#24feb4','#23539b'];
    console.log(legendArr)
    console.log(seriesData)
    var option = {
      legend: {
        icon: 'rect',
        bottom:'5%',
        left:'center',
        itemWidth:14,
        itemHeight:14,
        data: legendArr,
        textStyle:{
          color:'#fff',
          fontSize: 14
        }
      },
      color: colorArr,
      series: [
        {
          type: 'pie',
          radius: ['50%', '65%'],
          center:['45%','40%'],
          hoverOffset:5,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter:"{d}%\n{b}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '14',
                fontWeight: 'bold',
                color:'#fff'
              }
            }
          },
          data: seriesData
        },
      ]
    };
  
    // 使用刚指定的配置项和数据显示图表。
    pie.setOption(option, true);
    window.addEventListener("resize", function() {
      pie.resize();
    });
    setInterval(function () {
      autoHightLight(self,pie,option)
      // self.autoHightLight(mapName,option,self.app.securitySumIndex);
      // self.autoHightLight(mapName,option,0);
    },2000)
  };
  //饼图高亮样式
  function autoHightLight(self,mapName, option) {
    let dataLen = option.series[0].data.length;
      // 取消之前高亮的图形
      mapName.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: self.app.securitySumIndex
      });
      self.app.securitySumIndex = (self.app.securitySumIndex + 1) % dataLen;
      // 高亮当前图形
      mapName.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: self.app.securitySumIndex
      });
  }

/*
手机值机月增长情况
*/
function drawMonthAddBar(self,dataInfo) {
  self.mobileMonthIncreaseCont = echarts.init(
    document.getElementById("mobileMonthIncrease")
  );
  let legendData = [];
  let barData = [];
  let xAxisData = [];
  let bgMaxData = [];
  for (let i = 0; i < dataInfo.length; i++) { 
      barData.push(dataInfo[i].number);  
      xAxisData.push(dataInfo[i].month + '月');  
  }
  let maxpoint = Math.max.apply(null, barData);
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
  for (let j = 0; j < dataInfo.length; j++) {
    dataInfo.maxpoint = maxpoint;
    bgMaxData.push(dataInfo.maxpoint);
  }
  // console.log(legendData);
  // console.log(maxpoint);
  // console.log(bgMaxData);

  var option = {
    color: ["#2c7ccb"],
    tooltip: {},
    grid: {
      left: "1%",
      right: "5%",
      top: "15%",
      bottom: "5%",
      containLabel: true
    },
    legend: {
      // data: legendData,
      data: ['本月'],
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
        rotate:-45,//倾斜度 -90 至 90 默认为0
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
      },
      
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
            type:"dashed",
          }
        },
        axisTick: {
          show: true,
          
        }
      }
    ],
    series: [
      {
        name: "本月",
        type: "bar",
        barWidth: 42,
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
            color: "#2c7ccb"
          }
        },
        data: barData,
        zlevel: 2
      },
      {
        name: "",
        type: "bar",
        barWidth: 42,
        xAxisIndex: 0,
        barGap: "-100%",
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
  self.mobileMonthIncreaseCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.mobileMonthIncreaseCont.resize();
  });
}

/*
绘制中国地图
*/
function drawChinaMap3D(self,dataInfo){
  let chinaMap = echarts.init(document.getElementById("chinaMap"));

  let geoCoordMap = {
    "海门": [121.15, 31.89],
    "鄂尔多斯": [109.781327, 39.608266],
    "招远": [120.38, 37.35],
    "舟山": [122.207216, 29.985295],
    "齐齐哈尔": [123.97, 47.33],
    "盐城": [120.13, 33.38],
    "赤峰": [118.87, 42.28],
    "青岛": [120.33, 36.07],
    "乳山": [121.52, 36.89],
    "金昌": [102.188043, 38.520089],
    "泉州": [118.58, 24.93],
    "莱西": [120.53, 36.86],
    "日照": [119.46, 35.42],
    "胶南": [119.97, 35.88],
    "南通": [121.05, 32.08],
    "拉萨": [91.11, 29.97],
    "云浮": [112.02, 22.93],
    "梅州": [116.1, 24.55],
    "文登": [122.05, 37.2],
    "上海": [121.48, 31.22],
    "攀枝花": [101.718637, 26.582347],
    "威海": [122.1, 37.5],
    "承德": [117.93, 40.97],
    "厦门": [118.1, 24.46],
    "汕尾": [115.375279, 22.786211],
    "潮州": [116.63, 23.68],
    "丹东": [124.37, 40.13],
    "太仓": [121.1, 31.45],
    "曲靖": [103.79, 25.51],
    "烟台": [121.39, 37.52],
    "福州": [119.3, 26.08],
    "瓦房店": [121.979603, 39.627114],
    "即墨": [120.45, 36.38],
    "抚顺": [123.97, 41.97],
    "玉溪": [102.52, 24.35],
    "张家口": [114.87, 40.82],
    "阳泉": [113.57, 37.85],
    "莱州": [119.942327, 37.177017],
    "湖州": [120.1, 30.86],
    "汕头": [116.69, 23.39],
    "昆山": [120.95, 31.39],
    "宁波": [121.56, 29.86],
    "湛江": [110.359377, 21.270708],
    "揭阳": [116.35, 23.55],
    "荣成": [122.41, 37.16],
    "连云港": [119.16, 34.59],
    "葫芦岛": [120.836932, 40.711052],
    "常熟": [120.74, 31.64],
    "东莞": [113.75, 23.04],
    "河源": [114.68, 23.73],
    "淮安": [119.15, 33.5],
    "泰州": [119.9, 32.49],
    "南宁": [108.33, 22.84],
    "营口": [122.18, 40.65],
    "惠州": [114.4, 23.09],
    "江阴": [120.26, 31.91],
    "蓬莱": [120.75, 37.8],
    "韶关": [113.62, 24.84],
    "嘉峪关": [98.289152, 39.77313],
    "广州": [113.23, 23.16],
    "延安": [109.47, 36.6],
    "太原": [112.53, 37.87],
    "清远": [113.01, 23.7],
    "中山": [113.38, 22.52],
    "昆明": [102.73, 25.04],
    "寿光": [118.73, 36.86],
    "盘锦": [122.070714, 41.119997],
    "长治": [113.08, 36.18],
    "深圳": [114.07, 22.62],
    "珠海": [113.52, 22.3],
    "宿迁": [118.3, 33.96],
    "咸阳": [108.72, 34.36],
    "铜川": [109.11, 35.09],
    "平度": [119.97, 36.77],
    "佛山": [113.11, 23.05],
    "海口": [110.35, 20.02],
    "江门": [113.06, 22.61],
    "章丘": [117.53, 36.72],
    "肇庆": [112.44, 23.05],
    "大连": [121.62, 38.92],
    "临汾": [111.5, 36.08],
    "吴江": [120.63, 31.16],
    "石嘴山": [106.39, 39.04],
    "沈阳": [123.38, 41.8],
    "苏州": [120.62, 31.32],
    "茂名": [110.88, 21.68],
    "嘉兴": [120.76, 30.77],
    "长春": [125.35, 43.88],
    "胶州": [120.03336, 36.264622],
    "银川": [106.27, 38.47],
    "张家港": [120.555821, 31.875428],
    "三门峡": [111.19, 34.76],
    "锦州": [121.15, 41.13],
    "南昌": [115.89, 28.68],
    "柳州": [109.4, 24.33],
    "三亚": [109.511909, 18.252847],
    "自贡": [104.778442, 29.33903],
    "吉林": [126.57, 43.87],
    "阳江": [111.95, 21.85],
    "泸州": [105.39, 28.91],
    "西宁": [101.74, 36.56],
    "宜宾": [104.56, 29.77],
    "呼和浩特": [111.65, 40.82],
    "成都": [104.06, 30.67],
    "大同": [113.3, 40.12],
    "镇江": [119.44, 32.2],
    "桂林": [110.28, 25.29],
    "张家界": [110.479191, 29.117096],
    "宜兴": [119.82, 31.36],
    "北海": [109.12, 21.49],
    "西安": [108.95, 34.27],
    "金坛": [119.56, 31.74],
    "东营": [118.49, 37.46],
    "牡丹江": [129.58, 44.6],
    "遵义": [106.9, 27.7],
    "绍兴": [120.58, 30.01],
    "扬州": [119.42, 32.39],
    "常州": [119.95, 31.79],
    "潍坊": [119.1, 36.62],
    "重庆": [106.54, 29.59],
    "台州": [121.420757, 28.656386],
    "南京": [118.78, 32.04],
    "滨州": [118.03, 37.36],
    "贵阳": [106.71, 26.57],
    "无锡": [120.29, 31.59],
    "本溪": [123.73, 41.3],
    "克拉玛依": [84.77, 45.59],
    "渭南": [109.5, 34.52],
    "马鞍山": [118.48, 31.56],
    "宝鸡": [107.15, 34.38],
    "焦作": [113.21, 35.24],
    "句容": [119.16, 31.95],
    "北京": [116.46, 39.92],
    "徐州": [117.2, 34.26],
    "衡水": [115.72, 37.72],
    "包头": [110, 40.58],
    "绵阳": [104.73, 31.48],
    "乌鲁木齐": [87.68, 43.77],
    "枣庄": [117.57, 34.86],
    "杭州": [120.19, 30.26],
    "淄博": [118.05, 36.78],
    "鞍山": [122.85, 41.12],
    "溧阳": [119.48, 31.43],
    "库尔勒": [86.06, 41.68],
    "安阳": [114.35, 36.1],
    "开封": [114.35, 34.79],
    "济南": [117, 36.65],
    "德阳": [104.37, 31.13],
    "温州": [120.65, 28.01],
    "九江": [115.97, 29.71],
    "邯郸": [114.47, 36.6],
    "临安": [119.72, 30.23],
    "兰州": [103.73, 36.03],
    "沧州": [116.83, 38.33],
    "临沂": [118.35, 35.05],
    "南充": [106.110698, 30.837793],
    "天津": [117.2, 39.13],
    "富阳": [119.95, 30.07],
    "泰安": [117.13, 36.18],
    "诸暨": [120.23, 29.71],
    "郑州": [113.65, 34.76],
    "哈尔滨": [126.63, 45.75],
    "聊城": [115.97, 36.45],
    "芜湖": [118.38, 31.33],
    "唐山": [118.02, 39.63],
    "平顶山": [113.29, 33.75],
    "邢台": [114.48, 37.05],
    "德州": [116.29, 37.45],
    "济宁": [116.59, 35.38],
    "荆州": [112.239741, 30.335165],
    "宜昌": [111.3, 30.7],
    "义乌": [120.06, 29.32],
    "丽水": [119.92, 28.45],
    "洛阳": [112.44, 34.7],
    "秦皇岛": [119.57, 39.95],
    "株洲": [113.16, 27.83],
    "石家庄": [114.48, 38.03],
    "莱芜": [117.67, 36.19],
    "常德": [111.69, 29.05],
    "保定": [115.48, 38.85],
    "湘潭": [112.91, 27.87],
    "金华": [119.64, 29.12],
    "岳阳": [113.09, 29.37],
    "长沙": [113, 28.21],
    "衢州": [118.88, 28.97],
    "廊坊": [116.7, 39.53],
    "菏泽": [115.480656, 35.23375],
    "合肥": [117.27, 31.86],
    "武汉": [114.31, 30.52],
    "大庆": [125.03, 46.58]
  };
  // let hadleUseList = [];
  // for(let i=0; i<dataInfo.length; i++){
  //   if(dataInfo[i].name === null){

  //   }else{
  //     hadleUseList.push({
  //       name: dataInfo[i].name,
  //       value: dataInfo[i].number
  //     });
  //   }
  // }
  // console.log(dataInfo)
  // console.log(hadleUseList)
  let convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push({
                  name: data[i].name,
                  // value: geoCoord.concat(data[i].value)
                  value: geoCoord.concat(data[i].number)
              });
          }
      }
      // console.log(res)
      return res;
  };
  var option = {
      tooltip: {
          show: true,
          formatter:(params)=>{
            let data = params.name + "<br/>"+"值:"+ params.value[2]+"<br/>"+"地理坐标:[" + params.value[0]+","+params.value[1] +"]";
            return data;
          },
      },
      visualMap: [],
      geo3D: {
          map: 'china',
          roam: true,
          regionHeight: 0.2,//3d地图的厚度【找好久 哭唧唧】
          itemStyle: {
              areaColor: '#05657b',
              opacity: 1,
              borderWidth: 0.8,
              borderColor: '#47c2d7'
          },
          label: {
              show: true,
              textStyle: {
                  color: '#fff', //地图初始化区域字体颜色
                  fontSize: 12,
                  opacity: 1,
                  backgroundColor: 'rgba(0,0,0,0)'
                  //backgroundColor: 'rgba(53,171,199,0)'
              },
          },
          emphasis: { //当鼠标放上去  地区区域是否显示名称
              label: {
                  show: false,
                  textStyle: {
                      color: '#fff',
                      fontSize: 16,
                      backgroundColor: '#206ea5'
                  }
              }
          },
          light: { //光照阴影
              main: {
                  color: '#fff', //光照颜色
                  intensity: 1.2, //光照强度
                  //shadowQuality: 'high', //阴影亮度
                  shadow: false, //是否显示阴影
                  alpha: 55,
                  beta: 10

              },
              ambient: {
                  intensity: 0.3
              }
          },
          realisticMaterial:{
              detailTexture:'asset/leather/leather_albedo.jpg'
          }
      },
      series: [
        {
            name: 'bar3D',
            type: "bar3D",
            coordinateSystem: 'geo3D',
            barSize: 0.6, //柱子粗细
            shading: 'lambert',
            opacity: 1,
            bevelSize:0.3,
            itemStyle: {
                // color: '#18d96d',
                color: '#23ffb5',
                // color: '#12ffd9',
                opacity: 0.5
            },
            label: {
                show: false,
                formatter: '{b}'
            },
            data: 
            // convertData( hadleUseList ),
            convertData(dataInfo),
        }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  chinaMap.setOption(option, true);
  window.addEventListener("resize", function() {
    chinaMap.resize();
  });
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  // @import "../../static/font/font.css";
  html{ font-size:16px;}
  body {font-size: 16px;}

  .body-bg {
    width: 99%;
    height: 1042px;
    // height: 100%;
    padding: 1% 0.5%;
    background: url("../../../static/img/mobilebg.jpg");
    background-color: #141a3a;
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
    height: 85px;
    line-height: 85px;
    p{
      color: #ffffff;
      font-weight: bold;
      font-size: 40px;
    }
  }

  .content {
    width: 99%;
    padding: 0 0.5%;
    position: relative;
    overflow: hidden;
    .cont-lf{
      width: 26%;
      float: left;
    }
    .cont-lr{
      width: 74%;
      float: right;
    }
    .qianblue{
      color: #62fcfe;
    }
    i{
      font-style: normal;
    }
    .onecomm-tit{
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 26px;
    }
  }
  .comm-bor{
    // width: 415px;
    height: 425px;
    border-style: solid;
    border-width: 14px 14px;
    border-image: url("../../../static/img/one-bord.png") 14 14 / 1;
    background: none;
    padding: 10px 15px;
    .one-floor{
      margin-bottom: 18px;
      i{
        font-size: 30px;
      }
    }
    .two-floor{
      i{
        font-size: 23px;
      }
    }
    .comm-lfbor{
      border-left: 16px solid #044c76;
      padding-left: 24px;
      .twocomm-tit{font-size: 24px;font-weight: bold;margin-bottom: 19px;}
      .onecomm-num{font-size: 48px;}
      .twocomm-num{font-size: 32px;}
    }
    .one-floor{
      height: 152px;
    }
    .two-floor{
      height: 224px;
    }
  }
  .lf-bottom{
    margin-top: 5px;
    .security-statis{
      width: 100%;
      height: 287px;
    }
    .statis-list{
      width: 100%;
      overflow: hidden;
      span{
        display: inline-block;
        float: left;
        line-height: 40px;
        width: 50%;
        color: #ffffff;
        font-size: 25px;
      }
    }
  }
  .lr-top{
    width: 100%;
    height: 646px;
    overflow: hidden;
    .lftop-lf{
      width: 75%;
      height: 100%;
      float: left;
      .map-box{
        width: 100%;
        height: 100%;
      }
    }
    .lftop-lr{
      width: 25%;
      height: 100%;
      float: right;
    }
  }
  .mobileTOP-list{
    .msg-cont-title {
      height: 58px;
      background-color: #124457;
      color: #46d4e5;
      font-size: 18px;
      font-weight: bold;
      line-height: 58px;
      white-space: nowrap;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        width: 20%;
        text-align: center;
      }
      span:nth-child(2) {
        width: 40%;
        text-align: center;
        white-space: nowrap;
    /* overflow: hidden; */
    /* text-overflow: ellipsis;*/
      }
      span:nth-child(2) {
        width: 40%;
        text-align: center;
      }
    }
    .msg-tag {
      height: 520px;
      background-color: #0a2632;
      overflow: hidden;
      div.items {
        background-color: #0a2632;
        color: #42c1df;
        height: 50px;
        line-height: 50px;
        div.ball-items {
          width: 10%;
          display: inline-block;
          text-align: center;
        }
        span:nth-child(2) {
          width: 50%;
          display: inline-block;
          text-align: center;
          white-space: nowrap;
          //  overflow: hidden;
          //  text-overflow: ellipsis;
        }
        span:nth-child(3) {
          width: 35%;
          display: inline-block;
          text-align: center;
        }
      }
      .blue-ball {
        background-color: #184e5a;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        line-height: 25px;
        text-align: center;
        margin-left: 5%;
      }
    }

  }
  .lr-bottom{
    .monthadd-info{
      widows: 100%;
      height: 260px;
    }
  }


  @media screen and (min-width: 1024px) {
    .head p {
      font-size: 1.8rem;
    }
    .content .onecomm-tit{
      font-size: 1.1rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.1rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.3rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.1rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 0.6rem;
    }
    .mobileTOP-list .msg-tag div.items span:nth-child(2) {
      font-size: 0.5rem;
    }
  }

  @media screen and (min-width: 1280px) {
    .head p {
      font-size: 1.8rem;
    }
    .content .onecomm-tit{
      font-size: 1.1rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.1rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.3rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.1rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 0.6rem;
    }
    .mobileTOP-list .msg-tag div.items span:nth-child(2) {
      font-size: 0.5rem;
    }
  }

  @media screen and (min-width: 1366px) {
    .head p {
      font-size: 1.9rem;
    }
    .content .onecomm-tit{
      font-size: 1.2rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.2rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.4rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.2rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 0.7rem;
    }
    .mobileTOP-list .msg-tag div.items span:nth-child(2) {
      font-size: 0.5rem;
    }

  }

  @media screen and (min-width: 1400px) {
    .head p {
        font-size: 2rem;
    }
    .content .onecomm-tit{
      font-size: 1.3rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.3rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.5rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.3rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 0.8rem;
    }
    .mobileTOP-list .msg-tag div.items span:nth-child(2) {
      font-size: 0.6rem;
    }

  }

  @media screen and (min-width: 1440px) {
    .head p {
        font-size: 2.1rem;
    }
    .content .onecomm-tit{
      font-size: 1.4rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.4rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.6rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.4rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 0.9rem;
    }
    .mobileTOP-list .msg-tag div.items span:nth-child(2) {
      font-size: 0.7rem;
    }

  }

  @media screen and (min-width: 1600px) {
    .head p {
        font-size: 2.3rem;
    }
    .content .onecomm-tit{
      font-size: 1.5rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.5rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 1.7rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.5rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 1rem;
    }

  }

  @media screen and (min-width: 1920px) {
    .head p {
        font-size: 2.5rem;
    }
    .content .onecomm-tit{
      font-size: 1.8rem;
    }
    .comm-bor .one-floor i {
      font-size: 1.9rem;
    }
    .comm-bor .comm-lfbor .twocomm-num {
      font-size: 2rem;
    }
    .lf-bottom .statis-list span {
      font-size: 1.6rem;
    }
    .mobileTOP-list .msg-cont-title {
      font-size: 1.1rem;
    }

  }

</style>
