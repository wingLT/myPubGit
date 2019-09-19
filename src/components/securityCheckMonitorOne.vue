<template>
  <div class="body-bg">
    <div class="carouse-head"></div>
    <div class="carouse-foot"></div>
    <!-- 顶部 -->
    <div class="head">
      <span class="comicon healf-icon"></span>
      <h2>安检部门旅客人流量实时监控大屏</h2>
      <span class="comicon healr-icon"></span>
    </div>
    <!-- 内容 -->
    <div class="contaion">
      <div class="cont-lf comm-con commodel-bg">
        <div class="lf-top">
          <div class="comtit">
            <i class="tit-icon"></i>
            <span class="tit-name">各区域等待安检人数</span>
          </div>
          <ul class="await-list">
            <li class="list-tit">
              <span
                class=""
                style="width: 18%;color: transparent;"
              >·</span>
              <span class="titname-one">预估等待人数</span>
              <span class="titname-two">每分钟变化人数</span>
            </li>
            <li
              class="list-row"
              v-for="(item,index) in areaWaitPerson"
              :key="index"
            >
              <span :class="index === 0?'area-name shallow-red':index === 1?'area-name green':index === 2?'area-name blue':index === 3?'area-name orange':''">
                <i :class="index === 0?'bgshallow-red':index === 1?'bggreen':index === 2?'bgblue':index === 3?'bgorange':''"></i>
                {{ item.area }}
              </span>
              <span class="area-price">{{ item.wait }}</span>
              <span class="area-price">{{ item.add }}</span>
            </li>
          </ul>
        </div>
        <div
          class="lf-bottom"
          id="testBox"
        >
          <svg
            width="0"
            height="0"
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                ></feColorMatrix>
                <feComposite
                  in="SourceGraphic"
                  in2="goo"
                  operator="atop"
                ></feComposite>
              </filter>
            </defs>
          </svg>
          <ul class="block-list">
            <li class="hierarchy">
              <span class="white bigsize">T1</span>
              <div
                class="aside-nav red bounceInUp animated"
                id="asideNavOne"
              >
                <div
                  class="aside-menu"
                  style="background: #f93d6a;"
                >
                  <p
                    class="bigsize"
                    style="line-height: 3;"
                  >AB</p>
                  <p class="smallsize">{{ ABawait }}</p>
                </div>

                <a
                  href="javascript:void(0)"
                  class="menu-item menu-first bgshallow-red"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-second bgshallow-red"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-third bgshallow-red"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-line menu-fourth bgshallow-red"
                ></a>
              </div>
              <div
                class="aside-nav green bounceInUp animated"
                id="asideNavTwo"
              >
                <div
                  class="aside-menu"
                  style="background: #00e280;"
                >
                  <p
                    class="bigsize"
                    style="line-height: 2;"
                  >AC</p>
                  <p class="smallsize">{{ ACawait }}</p>
                </div>

                <a
                  href="javascript:void(0)"
                  class="menu-item menu-first bggreen"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-second bggreen"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-third bggreen"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-line menu-fourth bggreen"
                ></a>
              </div>
            </li>
            <li class="hierarchy">
              <span class="white bigsize">T2</span>
              <div
                class="aside-nav blue bounceInUp animated"
                id="asideNavThree"
              >
                <div
                  class="aside-menu"
                  style="background: #00c0ff;"
                >
                  <p
                    class="bigsize"
                    style="line-height: 4;"
                  >DE</p>
                  <p class="smallsize">{{ DEawait }}</p>
                </div>

                <a
                  href="javascript:void(0)"
                  class="menu-item menu-first bgblue"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-second bgblue"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-third bgblue"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-line menu-fourth bgblue"
                ></a>
              </div>
              <div
                class="aside-nav orange bounceInUp animated"
                id="asideNavFour"
              >
                <label
                  class="aside-menu"
                  style="background: #facd1e;"
                >
                  <p
                    class="bigsize"
                    style="line-height: 3;"
                  >FG</p>
                  <p class="smallsize">{{ FGawait }}</p>
                </label>

                <a
                  href="javascript:void(0)"
                  class="menu-item menu-first bgorange"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-second bgorange"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-third bgorange"
                ></a>
                <a
                  href="javascript:void(0)"
                  class="menu-item menu-line menu-fourth bgorange"
                ></a>
              </div>
              <!-- <span class="bgblue white bigsize"><i class="circle">DE</i> <i>243</i></span> -->
              <!-- <span class="bgorange white bigsize circle"><i>FG </i><i>86</i></span> -->
            </li>
          </ul>

        </div>
      </div>
      <div class="cont-center comm-con commodel-bg">
        <!-- <div class="carouse-head"></div>
        <div class="carouse-foot"></div> -->
        <div class="cent-top">
          <div class="head-icon"></div>
          <div class="lunbo-contain">
            <div class="lunbo-bg">
              <span class="circle-list">
                <i class="comm-radius bgshallow-red"></i>
                <i
                  class="comm-radius bgshallow-red twored"
                  style="margin-left: 3%;"
                ></i>
                <i
                  class="comm-radius bggreen"
                  style="margin-left: 3%;"
                ></i>
              </span>
            </div>
            <div class="lunbo-box">
              <div id="certify">
                <div
                  id="swiperContainerTwo"
                  class="swiper-container"
                >
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="(item,index) in 7"
                      :key="index"
                    ><img src="../../static/img/anjianren-light.png" />
                      <p></p>
                    </div>
                  </div>
                </div>
                <div
                  id="swiperPaginTwo"
                  class="swiper-pagination"
                ></div>
              </div>
            </div>
            <div class="lunbo-foot"></div>
          </div>
        </div>
        <div class="cent-bottom">
          <div class="cent-bot-tit">
            <i class="commcent-titicon lf-icon"></i>
            <h5 class="white">安检区当前状况</h5>
            <i class="commcent-titicon lr-icon"></i>
          </div>
          <ul class="present-statelist">
            <li
              class="state-listrow"
              v-for="(item,index) in SecurityCheckInfo"
              :key="index"
            >
              <span class="icon-box"><i :class="item.flag === 0?'state-icon successicon':'state-icon warnicon'"></i></span>
              <span class="state-name white">{{ item.area }}:</span>
              <div class="state-text white" id="adviceBox" style="display: inline-block;white-space: nowrap;
          position: relative;
          overflow: hidden;">
                <p id="adviceOne" style="display: inline-block;overflow: hidden;">
                  {{ item.advice }}
                  <!-- 好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶好顶顶顶顶顶 -->
                </p>
                <p id="adviceTwo" style="display: inline-block;overflow: hidden;"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cont-lr comm-con">
        <div class="lr-top lrcom-bg">
          <div class="comtit">
            <i class="tit-icon"></i>
            <span class="tit-name">安检评价指标</span>
          </div>
          <div class="first-floor">
            <p
              class="comm-modename"
              style="margin-top: 39px;margin-bottom: 0;"
            >当前各区域放行速率（单位：人/小时）</p>
            <ul class="greenlight-list">
              <li>
                <span class="map-name white">AB</span>
                <span class="white map-price">{{ oneMapPrice }}</span>
                <div
                  class="mapbox"
                  id="oneMap"
                ></div>
              </li>
              <li>
                <span class="map-name white">AC</span>
                <span class="white map-price">{{ twoMapPrice }}</span>
                <div
                  class="mapbox"
                  id="twoMap"
                ></div>
              </li>
              <li>
                <span class="map-name white">DE</span>
                <span class="white map-price">{{ threeMapPrice }}</span>
                <div
                  class="mapbox"
                  id="threeMap"
                ></div>
              </li>
              <li>
                <span class="map-name white">FG</span>
                <span class="white map-price">{{ fourMapPrice }}</span>
                <div
                  class="mapbox"
                  id="fourMap"
                ></div>
              </li>
            </ul>
          </div>
          <div class="two-floor">
            <p
              class="comm-modename"
              style="margin-top: 39px;"
            >当前等待安检团队人数</p>
            <ul class="passqueue-list">
              <li
                v-for="(item,index) in waitGroupPass"
                :key="index"
              >
                <span :class="index === 0?'line bgshallow-red':index === 1?'line bggreen':index === 2?'line bgblue':index === 3?'line bgorange':''"></span>
                <div class="lrbox">
                  <span :class="index === 0?'area-name shallow-red':index === 1?'area-name green':index === 2?'area-name blue':index === 3?'area-name orange':''">{{ item.area }}</span>
                  <span class="area-time white">{{ item.wait }}<i>人</i></span>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <div class="lr-bottom lrcom-bg">
          <div class="comtit">
            <i class="tit-icon"></i>
            <span class="tit-name">通道开闭情况</span>
          </div>
          <ul class="accesslockage-info">
            <li class="info-head">
              <span style="color:transparent;">.</span>
              <span>总计</span>
              <span>开启</span>
              <span>关闭</span>
            </li>
            <li
              class="info-list"
              v-for="(item,index) in accessLockageInfo"
              :key="index"
            >
              <span :class="index === 0?'access-name shallow-red':index === 1?'access-name green':index === 2?'access-name blue':index === 3?'access-name orange':''">{{ item.area }}</span>
              <span class="white access-price">{{ item.channelTotal }}</span>
              <span class="white access-price">{{ item.channelWorking }}</span>
              <span class="white access-price">{{ item.channelClosing }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Swiper from "swiper";
import echarts from "echarts";
import comm from "./Common.vue";
import DateTool from "../../static/js/DateUtils.js";
import testAnimation from "../../static/js/testAnimation.js";
import {SecurityOne} from '../API/securityCheckMonitorOne'
export default {
  name: "Echarts",
  created() {
    document.title = "安检部门旅客人流量实时监控大屏";
  },
  data() {
    return {
      oneMapPrice: "",
      twoMapPrice: "",
      threeMapPrice: "",
      fourMapPrice: "",
      ABawait:'',
      ACawait:'',
      DEawait:'',
      FGawait:'',
      RateInfo: [],
      SecurityCheckInfo: [],
      waitGroupPass: [],
      areaWaitPerson: [],
      accessLockageInfo: []
    };
  },
  mounted() {
    const self = this;
    self.$nextTick(function() {
      self.initData();
    });
    $(".aside-menu").addClass("animated infinite");
  },

  methods: {
    initData() {
      let self = this;
      self.getSecurityCheckSuggestData(); //安检区域当前状况
      self.getWaitGroupPass(); //当前等待团队旅客
      self.getAccessLockageData(); //通道开闭情况
      screenStatisAnima();
      setTimeout(function() {
        self.initData();
      }, 180000);
    },
    //绘制四个块状地图
    drawMap(self, rateData) {
      for (let i = 0; i < rateData.length; i++) {
        if (rateData[i].area === "AB") {
          drawBulkProgressbar(
            self,
            "oneMap",
            "#f93f6b",
            "#ffcac6",
            rateData[i].rate
          );
          self.oneMapPrice = rateData[i].rate;
          // self.oneMapPrice = 10
        } else if (rateData[i].area === "AC") {
          drawBulkProgressbar(
            self,
            "twoMap",
            "#6bbb6f",
            "#c8e5c9",
            rateData[i].rate
          );
          self.twoMapPrice = rateData[i].rate;
        } else if (rateData[i].area === "DE") {
          drawBulkProgressbar(
            self,
            "threeMap",
            "#1a91ff",
            "#b8e6ff",
            rateData[i].rate
          );
          self.threeMapPrice = rateData[i].rate;
        } else if (rateData[i].area === "FG") {
          drawBulkProgressbar(
            self,
            "fourMap",
            "#ffc53e",
            "#fff0b7",
            rateData[i].rate
          );
          self.fourMapPrice = rateData[i].rate;
        }
      }
    },
    // 安检区域每小时安检旅客
    securityHoursPassengGrahp() {
      const self = this;
    },
    //获取通道安检速率和各安检区域建议
    async getSecurityCheckSuggestData(){
      let self = this;
      await SecurityOne.getSecurityCheckSuggestData().then(function (result) {
        if (result.status === 200) {
          self.SecurityCheckInfo = result.data.advInfo; //建议
          self.RateInfo = result.data.rateInfo; //速率
          self.drawMap(self, self.RateInfo);
          self.$nextTick(() => {
            //鼠标移上去内容左右滚
            comm.scrollLeft("adviceBox", "adviceOne", "adviceTwo", 35);
          });
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取当前等待团队旅客
    async getWaitGroupPass(){
      let self = this;
      await SecurityOne.getWaitGroupPass().then(function (result) {
        if (result.status === 200) {
          self.waitGroupPass = result.data;
        } else {
          comMessageTips(self, result);
        }
      })
    },
    //获取通道开闭情况
    async getAccessLockageData(){
      let self = this;
      await SecurityOne.getAccessLockageData().then(function (result) {
        if (result.status === 200) {
          self.areaWaitPerson = result.data;
          self.accessLockageInfo = result.data;
          let data = result.data;
          for(let i in data){
            if(data[i].area === 'AB'){
              self.ABawait = data[i].wait;
            }else if(data[i].area === 'AC'){
              self.ACawait = data[i].wait;
            }else if(data[i].area === 'DE'){
              self.DEawait = data[i].wait;
            }else if(data[i].area === 'FG'){
              self.FGawait = data[i].wait;
            }
          }
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
块状进度条
当前放行速率
*/
function drawBulkProgressbar(self, idName, startColor, endColor, value) {
  // console.log(self,idName,startColor,endColor,value)
  var el = echarts.init(document.getElementById(idName));
  let min = 0;
  let max = 150;

  var option = {
    backgroundColor: "transparent", //背景必须与symbal颜色一样
    grid: {
      // top: 36,
      top: 0,
      left: 2,
      right: 2,
      bottom: 12
    },
    xAxis: {
      type: "value",
      min: min,
      max: max,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: "category",
        inverse: false,
        data: [],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: -4,
          textStyle: {
            // "color": "#fff",
            fontSize: 60
          }
        }
      }
    ],
    series: [
      {
        //内
        type: "bar",
        barWidth: 19,
        label: {
          normal: {
            show: false,
            position: "right",
            distance: -40,
            offset: [0, -30],
            textStyle: {
              color: "#fff"
            },
            formatter: function(e) {
              // return ((e.value / max) * 100).toFixed(2) + "%";
              return value;
            }
          }
        },
        legendHoverLink: false,
        silent: true,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: startColor // 0% 处的颜色
              },
              {
                offset: 1,
                color: endColor // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          } //底色
        },
        data: [value]
      },
      {
        //框
        type: "bar",
        barWidth: 26,
        barGap: "-115%",
        label: {
          normal: {
            show: false,

            position: "right",
            textStyle: {
              color: "#000"
            }
          }
        },
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)", //底色
            borderWidth: 1,
            borderColor: "grey"
          }
        },
        data: [max],
        z: 5
      },
      {
        //分隔
        type: "pictorialBar",
        itemStyle: {
          color: "#000"
        },
        symbolRepeat: "fixed",
        symbolMargin: "2",
        symbol: "rect",
        symbolClip: true,
        symbolSize: [2, 48],
        symbolPosition: "start",
        symbolOffset: [0, -2],
        symbolBoundingData: max,
        data: [value]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  el.setOption(option, true);
  window.addEventListener("resize", function() {
    el.resize();
  });
}
// 整屏页面轮播
function screenLarge() {
  new Swiper("#swiperContainerOne", {
    watchSlidesProgress: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: false,
    initialSlide: 2,
    loopedSlides: 2,
    dynamicBullets: true,
    dynamicMainBullets: 2,
    autoplay: false,
    keyboard: true,
    pagination: {
      el: "#swiperPaginOne"
    }

  });
}
// 安检门人员轮播
function screenStatisAnima() {
  // new Swiper("#certify .swiper-container", {
  new Swiper("#swiperContainerTwo", {
    watchSlidesProgress: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    loopedSlides: 7,
    dynamicBullets: true,
    dynamicMainBullets: 7,
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: "#swiperPaginTwo"
      //clickable :true,
    },
    on: {
      progress: function(progress) {
        for (var i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          var slideProgress = this.slides[i].progress;
          var modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
          }
          var translate = slideProgress * modify * 260 + "px";
          var scale = 1 - Math.abs(slideProgress) / 8;
          var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
          slide.transform("translateX(" + translate + ") scale(" + scale + ")");
          slide.css("zIndex", zIndex);
          slide.css("opacity", 1);
          if (Math.abs(slideProgress) % 2 !== 0) {
            slide.css("opacity", 0.3);
          }
          if (Math.abs(slideProgress) > 3) {
            slide.css("opacity", 0);
          }
        }
      },
      setTransition: function(transition) {
        for (var i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          slide.transition(transition);
        }
      }
    }
  });
}
// 圆球黏连的运动
function circleAnimation() {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../static/font/font.css";
@import "../../static/css/testAnimation.css";
@import "../../static/css/certify.css";
@import "../../static/css/swiper.min.css";
// @import "../../static/css/animate.min.css";
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
      to(#0163b3)
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
  // background-color: #dc375f;
  background-color: #f93d6a;
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
  height: 300px;
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
      // color: #ff733f;
      // color: #3398DB;
      // color: #9fa49b;
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
/*==================== 第一屏样式开始====================*/
.contaion {
  width: 100%;
  position: relative;
  overflow: hidden;
  .comm-con {
    width: 32.5%;
    height: 926px;
  }
  .commodel-bg {
    background: rgba(0, 0, 0, 0.5);
  }
  .cont-lf {
    margin-right: 1.2%;
    float: left;
    .lf-top {
      margin: 23px;
      // .await-list {
      //   width: 100%;
      //   .list-tit {
      //     width: 100%;
      //     height: 44px;
      //     line-height: 44px;
      //     background-color: #1c1f22;
      //     overflow: hidden;
      //     span {
      //       display: inline-block;
      //       color: #bfbfbf;
      //       font-size: 20px;
      //     }
      //     .titname-one {
      //       width: 50%;
      //       text-align: right;
      //     }
      //     .titname-two {
      //       width: 45%;
      //       margin-right: 3%;
      //       text-align: right;
      //     }
      //   }
      //   .list-row {
      //     width: 100%;
      //     height: 60px;
      //     font-size: 24px;
      //     line-height: 60px;
      //     border-bottom: 2px solid #35383c;
      //     span {
      //       display: inline-block;
      //       float: left;
      //     }
      //     .area-name {
      //       margin-left: 2%;
      //       width: 18%;
      //       text-align: left;
      //       i {
      //         display: inline-block;
      //         background-color: #dc375f;
      //         width: 16px;
      //         height: 16px;
      //         border-radius: 50%;
      //         margin-right: 8px;
      //       }
      //     }
      //     .area-price {
      //       width: 40%;
      //       text-align: center;
      //       color: #ffffff;
      //     }
      //   }
      // }
    }
    .lf-bottom {
      height: 520px;
      margin: 23px;
      .block-list {
        width: 100%;
        position: relative;
        .hierarchy {
          width: 100%;
          height: 240px;
          line-height: 240px;
          text-align: center;
          overflow: hidden;
          .bigsize {
            font-size: 28px;
          }
          span {
            width: 33.3%;
            height: 100%;
            display: inline-block;
            float: left;
            i {
              display: inline-block;
              width: 100%;
              height: 50%;
              font-style: normal;
            }
            .circle {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .aside-menu {
            .bigsize {
              font-weight: bold;
            }
            .smallsize {
              line-height: 0;
            }
          }
        }
      }
    }
  }
  .cont-center {
    float: left;
    position: relative;
    // .carouse-head {
    //   position: absolute;
    //   left: -1%;
    //   // top: -3%;
    //   top: 0;
    //   width: 103%;
    //   height: 110px;
    //   background: url("../../static/img/lunbo-tou.png") no-repeat;
    //   background-position: 100% 100%;
    //   background-size: 100% 100%;
    //   z-index: 10;
    // }
    // .carouse-foot {
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
    .cent-top {
      margin: 23px;
      height: 524px;
      .head-icon {
        width: 45%;
        height: 30px;
        margin: 43px auto 23px auto;
        background: url("../../static/img/late_passage_anima.gif") no-repeat;
        background-position: 100% 100%;
        background-size: 100% 100%;
      }
      .lunbo-contain {
        width: 100%;
        height: 92%;
        position: relative;
        .lunbo-bg {
          position: absolute;
          left: 32%;
          width: 36.3%;
          height: 400px;
          overflow: hidden;
          background: url("../../static/img/anjianmeng.png") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          z-index: 1;
          .circle-list {
            display: inline-block;
            float: left;
            width: 100%;
            margin: 1.5% 0 0 12.6%;
            .comm-radius {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              display: inline-block;
              // margin-left: 25px;
            }
            .twored {
              margin: 16px 0 0 7px;
            }
            .bggreen {
              margin: 16px 0 0 6.5px;
            }
          }
        }
        .lunbo-box {
          width: 100%;
          padding-top: 153px;
          // height: 352px;
          height: 385px;
        }
        .lunbo-foot {
        }
      }
    }
    .cent-bottom {
      margin: 23px;
      overflow: hidden;
      .cent-bot-tit {
        width: 100%;
        height: 22px;
        line-height: 22px;
        position: relative;
        text-align: center;
        margin-bottom: 20px;
        h5 {
          display: inline-block;
          font-size: 22px;
        }
        .commcent-titicon {
          position: absolute;
          display: inline-block;
          width: 30%;
          height: 100%;
          background: url("../../static/img/late_passage_anima.gif") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
        }
        .lf-icon {
          left: 0;
        }
        .lr-icon {
          right: 0;
        }
      }
      .present-statelist {
        width: 100%;
        .state-listrow {
          width: 100%;
          height: 37px;
          line-height: 37px;
          margin-bottom: 37px;
          overflow: hidden;
          .icon-box {
            width: 11%;
            .state-icon {
              width: 35px;
              height: 35px;
              // margin-right: 25px;
              vertical-align: top;
            }
            .warnicon {
              background: url("../../static/img/waringicon.png") no-repeat;
              background-position: 100% 100%;
              background-size: 100% 100%;
            }
            .successicon {
              background: url("../../static/img/sefatyicon.png") no-repeat;
              background-position: 100% 100%;
              background-size: 100% 100%;
            }
          }
          i,
          span {
            display: inline-block;
            float: left;
          }
          .state-name {
            width: 6%;
            font-size: 20px;
            font-weight: bold;
            margin-right: 20px;
          }
          .state-text {
            font-size: 18px;
            // width: 60%;
            width: 76%;
            // white-space: nowrap;
            .app-p {
                  display: inline;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
            }
          }
        }
      }
    }
  }
  .cont-lr {
    float: right;
    .lrcom-bg {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .lr-top {
      height: 454px;
      padding: 23px;
      margin-bottom: 20px;
      .comm-modename {
        width: 100%;
        font-size: 22px;
        color: #d9d9d9;
        margin-bottom: 39px;
      }
      .first-floor {
        width: 100%;
        .greenlight-list {
          width: 100%;
          overflow: hidden;
          li {
            width: 46%;
            float: left;
            overflow: hidden;
            // margin-bottom: 49px;
            padding-top: 20px;
            .map-price {
              float: right;
              margin-right: 30px;
            }
            span {
              display: inline-block;
            }
            .map-name {
              display: inline-block;
              float: left;
              width: 12%;
              font-size: 20px;
              font-weight: bold;
              margin-top: 26px;
              margin-right: 18px;
            }
            .mapbox {
              clear: both;
              display: inline-block;
              width: 75%;
              height: 60px;
              // height: 73px;
              // border: 1px solid #cccccc;
            }
          }
        }
      }
      .two-floor {
        width: 100%;
        .passqueue-list {
          width: 100%;
          overflow: hidden;
          li {
            width: 25%;
            text-align: left;
            float: left;
            span {
              display: inline-block;
              width: 100%;
            }
            .line {
              // width: 4px;
              width: 3%;
              margin-right: 5%;
              height: 60px;
            }
            .lrbox {
              width: 85%;
              display: inline-block;
              .area-name {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 16px;
              }
              .area-time {
                font-size: 22px;
                font-weight: bold;
                i {
                  font-size: 17px;
                  font-weight: normal;
                  font-style: normal;
                }
              }
            }
          }
        }
      }
    }
    .lr-bottom {
      padding: 23px;
      height: 458px;
      .accesslockage-info {
        width: 100%;
        span {
          display: inline-block;
        }
        li:nth-of-type(odd) {
          //奇数
          background-color: rgba(191, 191, 191, 0.1);
        }
        li:nth-of-type(even) {
          //偶数
          background-color: rgba(191, 191, 191, 0.2);
        }
        .info-head {
          width: 100%;
          height: 44px;
          font-size: 17px;
          line-height: 44px;
          text-align: center;
          overflow: hidden;
          span {
            width: 25%;
            color: #bfbfbf;
            float: left;
          }
        }
        .info-list {
          width: 100%;
          height: 65px;
          line-height: 65px;
          text-align: center;
          overflow: hidden;
          span {
            float: left;
            font-size: 22px;
            width: 25%;
          }
          .access-name {
            font-weight: bold;
          }
          .access-price {
          }
        }
      }
    }
  }
}
/*==================== 第一屏样式开始====================*/
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
    width: 68%;
    float: left;
    .twolf-top {
      width: 100%;
      margin-bottom: 10px;
      overflow: hidden;
      .twolftop-lf {
        width: 49%;
        height: 442px;
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
        float: right;
        position: relative;
        .icon-head {
          position: absolute;
          left: -1%;
          top: -1%;
          width: 104%;
          height: 110px;
          background: url("../../static/img/lunbo-tou.png") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          z-index: 10;
        }
        .icon-foot {
          transform: rotate(180deg);
          position: absolute;
          left: -2%;
          bottom: 0%;
          width: 103%;
          height: 80px;
          background: url("../../static/img/lunbo-jio.png") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          z-index: 10;
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
        height: 200px;
      }
    }
  }
  .twoscar-lr {
    width: 30%;
    height: 922px;
    float: right;
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
  .head span {
    width: 35%;
  }
  .head h2 {
    font-size: 23px;
  }
  .comtit .tit-icon{width: 30px;vertical-align: 0;}
  .comtit .tit-name,
  .contaion .cont-center .cent-bottom .cent-bot-tit h5{font-size: 17px;}
  .contaion .cont-lr .lr-top .comm-modename{
    font-size: 16px;
    margin-top: 20px;
  }
  .await-list .list-tit span{font-size: 12px;}
  .await-list .list-tit span:nth-child(2),
  .await-list .list-tit span:nth-child(3){
    width: 33%;
  }
  .await-list .list-tit span:first-child{
    width: 25%;
  }
  .contaion .cont-center .cent-bottom .cent-bot-tit .commcent-titicon{
    width: 27%;
  }
}
@media screen and (min-width: 1366px) {
  .head span{width: 35%;}
  .head h2{font-size: 30px;}
  .comtit .tit-icon{width: 32px;vertical-align: 0;}
  .comtit .tit-name{font-size: 19px;}
  .contaion .cont-center .cent-bottom .cent-bot-tit h5{font-size: 18px;}
}
@media screen and (min-width: 1680px) {
.head span{width: 36%;}
  .head h2{font-size: 33px;}
    .comtit .tit-icon{width: 35px;vertical-align: 0;}
  .comtit .tit-name,
  .contaion .cont-center .cent-bottom .cent-bot-tit h5{font-size: 21px;}
  .contaion .cont-lr .lr-top .comm-modename{
    font-size: 18px;
    margin-top: 20px;
  }
  .await-list .list-tit span{font-size: 16px;}
}
@media screen and (min-width: 1920px) {
  .head span{width: 37%;}
  .head h2{font-size: 39px;}
  .comtit .tit-icon{width: 46px;vertical-align: 0;}
  .comtit .tit-name,
  .contaion .cont-center .cent-bottom .cent-bot-tit h5{font-size: 24px;}
  .contaion .cont-lr .lr-top .comm-modename{
    font-size: 18px;
    margin-top: 20px;
  }
  .await-list .list-tit span{font-size: 16px;}
  .await-list .list-tit span:nth-child(2),
  .await-list .list-tit span:nth-child(3){
    width: 40%;
  }
}
</style>
<style>
@media screen and (min-width: 1366px) {
  #swiperPaginTwo .swiper-pagination-bullet {
  width: 35px !important;
  }
}
@media screen and (min-width: 1920px) {
  #swiperPaginTwo .swiper-pagination-bullet {
  width: 48px !important;
  }
}
#swiperPaginTwo .swiper-pagination-bullet {
  width: 48px;
  height: 12px;
  margin: 0 8px;
  border-radius: 0;
  /* background-color: #055143 !important; */
  opacity: 1;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(1) {
  background-color: #072521;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(2) {
  background-color: #055041;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(3) {
  background-color: #047b55;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(4) {
  background-color: #02a466;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(5) {
  background-color: #047b55;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(6) {
  background-color: #055041;
}
#swiperPaginTwo .swiper-pagination-bullet:nth-child(7) {
  background-color: #072521;
}
#swiperPaginTwo .swiper-pagination-bullet-active {
  background-color: #03a567 !important;
}
</style>
