<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="lf-topicon comicon"></div>
      <h2>成都双流国际机场护卫巡检DE指廊统计</h2>
      <div class="lr-topicon comicon"></div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="cont-lf">
        <h3>DE指廊实时轨迹</h3>
        <div class="track-cont">
          <span class="roleicon trackicon-lftop"></span>
          <span class="roleicon trackicon-lrtop"></span>
          <span class="roleicon trackicon-lfbottom"></span>
          <span class="roleicon trackicon-lrbottom"></span>
          <div
            id="DErealtimeTrack"
            class="realtime-track"
          ></div>
        </div>
      </div>
      <div class="cont-lr">
        <div class="contlr-top">
          <h3>总体完成率统计</h3>
          <div class="percentage-complete">
            <div class="statis-cont">
              <span class="finshrate-total">总计：{{ checkComplete.total }}</span>
              <div
                id="finshRateGrahp"
                class="finsh-rate"
              ></div>
              <div class="finshrate-info">
                <div
                  class="floor"
                  style="margin-top: 25px;"
                >
                  <div style="border-right: 1px solid #313132;">
                    <span class="info-name">已完成</span>
                    <span
                      class="info-price"
                      style="color: #a4ed8d"
                    >{{ checkComplete.done }}</span>
                  </div>
                  <div>
                    <span class="info-name">处理中</span>
                    <span
                      class="info-price"
                      style="color: #187dff"
                    >{{ checkComplete.solving }}</span>
                  </div>
                </div>
                <div
                  class="floor"
                  style="margin-top: 40px;"
                >
                  <div style="border-right: 1px solid #313132;">
                    <span class="info-name">已超期</span>
                    <span
                      class="info-price"
                      style="color: #f84a46"
                    >{{ checkComplete.overtime }}</span>
                  </div>
                  <div>
                    <span class="info-name">待处理</span>
                    <span
                      class="info-price"
                      style="color: #ffa628"
                    >{{ checkComplete.pending }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contlr-bottom">
          <h3>DE指廊个人巡检任务处理情况</h3>
          <div class="personpoll-dispose">
            <div class="sett-personcont">
              <div
                id="personpollCont"
                class="personopll-cont"
              >
                <div id="personpollOne">
                  <ul>
                    <li
                      v-for="(item,index) in checkTaskData"
                      :key="index"
                    >
                      <div class="personinfo-cont">
                        <div class="info-lf">
                          <!-- <div class="infolf-icon"> -->
                          <img
                            class="infolf-icon"
                            :src=item.img
                            alt=""
                          >
                          <!-- </div> -->
                        </div>
                        <div class="info-lr">
                          <p>
                            <span class="info-tit">{{ item.name }}</span>
                            <span class="info-user">{{ item.user }}</span>
                          </p>
                          <p style="font-size:13px">
                            <span class="info-time">{{ item.date }}</span>
                            <span class="infotime-quentum">{{ item.duration }}&nbsp;&nbsp;共计：{{item.timespan}}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div id="personpollTwo"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import {checkGuard} from "../API/checkGuardStatis"
export default {
  name: "Echarts",
  created() {
    document.title = "成都双流国际机场巡检护卫统计";
  },
  data() {
    return {
      finshRateCont: "",
      id: 159,
      porch: "D,E",
      checkComplete: {},
      checkTaskData: [],
      time: 1,
    };
  },
  mounted() {
    const self = this;
    self.$nextTick(function () {
        self.initData();
        // creatMap()
    });
  },
  methods: {
    initData() {
        let self = this;
        self.getCheckCompleteInfo(self);
        self.getPersonCheckTaskInfo(self);
        self.getTrackMapInfo(self);
        setTimeout(function () {
          self.initData()
        }, 1000 * 60 * self.time)
    },

    /*
获取巡检完成率数据信息
*/
    async getCheckCompleteInfo() {
      let self = this;
      let id=self.id;
      let data = await checkGuard.getCheckCompleteInfo(id).then((result) => {
        if (result.status === 200) {
          self.checkComplete = result.data;
          //求完成率 小数点后第一位四舍五入
          const complete = Number((result.data.done / result.data.total) * 100).toFixed(0);
          // console.log(complete)
          if(result.data.done==0||result.data.total==0){
            drawSecurityLatePassage(self, 0);
          }else{
            drawSecurityLatePassage(self, complete);
          }
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },

    /*
获取个人巡检任务处理情况数据信息
*/
    async getPersonCheckTaskInfo() {
      let self = this;
      let parse ={
        id:self.id,
        porch:self.porch
      };
      let data = await checkGuard.getPersonCheckTaskInfo(parse).then((result) => {
        if (result.status === 200) {
          self.checkTaskData = result.data;
          self.$nextTick(function() {
            comm.scrollTop(
              "personpollCont",
              "personpollOne",
              "personpollTwo",
              30
            );
          });
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },

    async getTrackMapInfo() {
      let self = this;
      let id = self.id;
      let data = await checkGuard.getTrackMapInfo(id).then((result) => {
        if (result.status === 200) {
          let trackData = result.data;
          let dotArr = [];
          for(let i in trackData){
            if(trackData[i].traceFloor === '293a12e79117416aa4d0729cc7e62cc6'){
              dotArr.push({
                x: trackData[i].traceX,
                y: trackData[i].traceY,
              })
            }
          }
          self.$nextTick(function () {
            creatMap(self,dotArr)
          })

        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },
  }
};

//DE指廊实时轨迹地图
function creatMap(self,dotArr) {
  var map;
  var fmapID = "yfsl-cdairport";
  var isDynamicMarker = true;
  //当前的路线
  var naviLines = [];
  var locationMarker = null;
  var defaultGroupID = 1;
  map = new fengmap.FMMap({
    //渲染dom
    container: document.getElementById("DErealtimeTrack"),
    //地图数据位置
    mapServerURL: "./static/data/" + fmapID,
    //主题数据位置
    //      mapThemeURL: '../../static/data/theme',
    mapThemeURL: "./static/data/theme",
    //设置主题
    defaultThemeName: "652557",
    // 默认比例尺级别设置为20级
    defaultMapScaleLevel: 20,
    defaultMapScale: 2000,
    //开发者申请应用下web服务的key
    key: "c8e2472ac27d3a1cb9b30c6669fcb8ff",
    //开发者申请应用名称
    appName: "AOC登记口热力图",
//    defaultControlsPose: -70.5,
    defaultControlsPose: {
      target:"-0.036,0.000,-483.540",
      position:"-33.033,3284.134,-495"
    },
    defaultViewMode: fengmap.FMViewMode.MODE_2D
  });

  //地图加载完成事件
  map.on("loadComplete", function() {
    var naviResults = [
      {
        groupId: 1,
        points: dotArr
        // points: [
        //   {
        //     x: 11572077.95790758,
        //     y: 3577909.516832049
        //   },
        //   {
        //     x: 11572127.657879276,
        //     y: 3578049.2295816797
        //   },
        //   {
        //     x: 11572139.200286161,
        //     y: 3578106.7351547135
        //   }
        // ]
      }
    ];

    //配置线型、线宽、透明度等
    var lineStyle = {
      //设置线的宽度
      lineWidth: 4,
      //设置线的透明度
      alpha: 0.8,
      //设置线的类型为导航线
      lineType: fengmap.FMLineType.FMARROW,
      //设置线动画,false为动画
      noAnimate: true
    };
    if (naviLines.length > 0) {
      clearNaviLines();
    }
    if (locationMarker) {
      locationMarker.dispose();
    }
    //绘制线
    drawLines(naviResults, lineStyle);
    //添加定位点标注，并设置定位点坐标为地图中心点
    addLocationMarker({
      x: dotArr[dotArr.length - 1].x,
      y: dotArr[dotArr.length - 1].y
    })
    // addLocationMarker({ x: 11572139.200286161, y: 3578106.7351547135 });
    // addLocationMarker({ x: 11572150.200286161, y: 3578150.7351547135 });
    //展示按模拟轨迹移动定位按钮
    //      var points = points
  });
  //绘制线图层
  function drawLines(results, lineStyle) {
    //绘制部分
    if (results.length < 2) {
      return;
    }
    var line = new fengmap.FMLineMarker();
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var gid = result.groupId;
      var points = result.points;
      var seg = new fengmap.FMSegment();
      seg.groupId = gid;
      seg.points = points;
      line.addSegment(seg);
      var lineObject = map.drawLineMark(line, lineStyle);
      naviLines.push(lineObject);
    }
  }

  //清除路线
  var clearNaviLines = function() {
    //方法一：清除所有路径线
    map.clearLineMark();
  };

  //创建定位点标注
  function addLocationMarker(coord) {
    locationMarker = new fengmap.FMLocationMarker({
      url: require("../../static/img/pointer.png"),
      //        url: "../../static/img/pointer.png",
      //设置图片显示尺寸
      size: 30,
      //设置图片高度，默认是5
      height: 5,
      callback: function() {
        // 设置LocationMarker的，初始方向
        locationMarker.direction = -90;
      }
    });

    map.addLocationMarker(locationMarker);

    locationMarker.setPosition({
      //设置定位点的x坐标
      x: coord.x,
      //设置定位点的y坐标
      y: coord.y,
      //设置定位点所在楼层
      groupID: defaultGroupID,
      //设置定位点的高于楼层多少
      zOffset: 1
    });
  }

  //打开Fengmap服务器的地图数据和主题
  map.openMapById(fmapID, function(error) {
    //打印错误信息
    console.log(error);
  });
}

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
完成率 统计
*/
function drawSecurityLatePassage(self, completeValue) {
  self.finshRateCont = echarts.init(document.getElementById("finshRateGrahp"));
  var data = {
    value: completeValue,
    text: "完成率",
    color: "#a4ed8d",
    title: "饼图"
  };
  let value = data.value || 0;
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "完成率",
        type: "pie",
        clockwise: false,
        radius: ["80%", "86%"],
        label: {
          normal: {
            position: "center"
          }
        },
        data: [
          {
            value: value,
            name: "完成",
            itemStyle: {
              normal: {
                color: data.color
              }
            },
            label: {
              normal: {
                formatter: "{d}%",
                textStyle: {
                  fontSize: 34,
                  color: data.color
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#a4ed8d",
                shadowColor: "#a4ed8d",
                shadowBlur: 10
              },
              emphasis: {}
            },
            hoverAnimation: false
          },
          {
            value: 100 - value,
            name: "完成率",
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#2c3b46"
              }
            },
            label: {
              normal: {
                formatter: "完成率",
                textStyle: {
                  fontSize: 14,
                  color: data.color
                }
              }
            }
          }

          //  {
          //   value: 75,
          //   name: "完成",
          //   label: {
          //     normal: {
          //       formatter: "{d}%",
          //       textStyle: {
          //         fontSize: 34,
          //         color: '#a4ed8d',
          //       }
          //     }
          //   },
          //   tooltip: {
          //     show: false
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#a4ed8d",
          //       shadowColor: '#a4ed8d',
          //       shadowBlur: 10,
          //     },
          //     emphasis: {
          //     }
          //   },
          //   hoverAnimation: false
          // },
          // {
          //   value: 25,
          //   name: "完成率",
          //   label: {
          //     normal: {
          //       formatter: "\n完成率",
          //       textStyle: {
          //         fontSize: 14,
          //         color: '#a4ed8d',
          //       }
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#2c3b46"
          //     },
          //     emphasis: {
          //       color: "#2c3b46"
          //     }
          //   },
          //   hoverAnimation: false
          // },
        ]
      }
    ]
  };
  self.finshRateCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.finshRateCont.resize();
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../static/font/font.css";

.body-bg {
  // width: 100%;
  // height: 1042px;
  // background-color: #02020b;
  // // checkGradeStatisbg
  // position: relative;
  // overflow: hidden;

  width: 100%;
  height: 1042px;
  padding: 1% 0.5%;
  background: url("../../static/img/checkGradeStatisbg.jpg");
  background-color: #02020b;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
h2,
h3 {
  font-family: chinese;
  font-weight: normal;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#deeff7),
    to(#8bdaee)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.head {
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  h2 {
    text-align: center;
    // color: #ffffff;
    color: #8bdaee;
    font-size: 32px;
  }
  .comicon {
    width: 35%;
    height: 70px;
    position: absolute;
  }
  .lf-topicon {
    top: 0;
    left: 0;
  }
  .lr-topicon {
    top: 0;
    right: 0;
  }
}
.content {
  position: relative;
  // overflow: hidden;
  width: 96%;
  margin: 0 2%;
  h3 {
    text-align: center;
    color: #ffffff;
    font-size: 21px;
    margin-bottom: 8px;
  }
  .cont-lf {
    width: 65%;
    float: left;
    .track-cont {
      width: 98%;
      height: 867px;
      margin-top: 20px;
      border: 1px solid #ffffff;
      border-radius: 20px;
      position: relative;
      .roleicon {
        // width: 5%;
        // height: 8%;
        width: 58px;
        height: 60px;
        display: inline-block;
        background: url("../../static/img/jio.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: 100;
      }
      .trackicon-lftop {
        left: -9px;
        top: -9px;
      }
      .trackicon-lrtop {
        right: -7px;
        top: -10px;
        transform: rotate(90deg);
      }
      .trackicon-lfbottom {
        left: -9px;
        bottom: -10px;
        transform: rotate(-90deg);
      }
      .trackicon-lrbottom {
        right: -9px;
        bottom: -10px;
        transform: rotate(180deg);
      }
      .realtime-track {
        width: 100%;
        height: 100%;
      }
    }
  }
  .cont-lr {
    width: 35%;
    float: right;
    .contlr-top {
      .percentage-complete {
        width: 100%;
        // height: 318px;
        height: 330px;
        background: url("../../static/img/wanchenlv.png") no-repeat;
        background-size: 100% 100%;
        .statis-cont {
          padding: 0 9%;
          padding-top: 60px;
          width: 82%;
          height: 208px;
          position: relative;
          overflow: hidden;
          .finshrate-total {
            position: absolute;
            left: 6%;
            top: 12%;
            color: #ffffff;
            font-size: 14px;
          }
          .finsh-rate {
            width: 40%;
            height: 100%;
            float: left;
          }
          .finshrate-info {
            width: 60%;
            height: 100%;
            float: right;
            .floor {
              width: 100%;
              height: 70px;
              overflow: hidden;
              div {
                width: 49%;
                float: left;
                text-align: center;
                color: #ffffff;
                .info-name {
                  width: 100%;
                  font-size: 17px;
                  display: inline-block;
                }
                .info-price {
                  font-family: num1;
                  // font-size: 33px;
                  font-size: 50px;
                  display: inline-block;
                  // font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
    .contlr-bottom {
      .personpoll-dispose {
        width: 100%;
        // height: 490px;
        height: 534px;
        background: url("../../static/img/gerenxunjian.png") no-repeat;
        background-size: 100% 100%;
        .sett-personcont {
          overflow: hidden;
          padding: 6% 6% 0 6%;
          height: 85%;
          .personopll-cont {
            overflow: hidden;
            height: 100%;
          }
        }
        ul {
          li {
            position: relative;
            overflow: hidden;
            height: 94px;
            margin-bottom: 10px;
            background: url("../../static/img/sbg.png") no-repeat 100%;
            background-size: 100% 100%;
            .personinfo-cont {
              width: 95%;
              height: 60px;
              padding: 19px 15px;
              .info-lf {
                width: 12%;
                height: 58px;
                float: left;
                .infolf-icon {
                  width: 58px;
                  height: 58px;
                  background-color: #cccccc;
                  border-radius: 50%;
                  border: 2px solid #8fdbff;
                }
              }
              .info-lr {
                width: 86%;
                margin-left: 2%;
                float: right;
                p {
                  color: #8fdbff;
                  line-height: 30px;
                  .info-tit {
                    font-size: 16px;
                  }
                  .info-user {
                    font-size: 12px;
                    height: 20px;
                    line-height: 20px;
                    padding: 2px 12px;
                    background: #09bf70;
                    border-radius: 15px;
                    color: #ffffff;
                  }
                  .info-time {
                  }
                  .infotime-quentum {
                    float: right;
                  }
                  .info-tataltime {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
