<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="hea-cont">
        <div class="icon-lf comm-heagif">
          <span class="icongif" style="float:right;"></span>
        </div>
        <div class="heacont-tit">
          <h2>候管旅客人流量与安检口展示大屏</h2>
        </div>
        <div class="icon-lr comm-heagif">
          <span class="icongif" style="float:left;"></span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="toplf-icon comm-boricon"></div>
      <div class="toplr-icon comm-boricon"></div>
      <div class="contain">
        <div class="cont-top cont-bot">
          <div class="bot-lf">
            <div class="duty-list comm-heabg">
              <span class="comm-blcoktit duty-list-tit">航站楼旅客情况</span>
            </div>
            <ul class="terminal-passenginfo">
              <li class="commlist">
                <span class="commli-tit">T1已值机未安检</span>
                <span class="commli-num cyan">{{ passInfo.t1AC }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">T1当前隔离区人数</span>
                <span class="commli-num green">{{ passInfo.t1FX }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">T2已值机未安检</span>
                <span class="commli-num cyan">{{ passInfo.t2AC }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">T2当前隔离区人数</span>
                <span class="commli-num green">{{ passInfo.t2FX }}</span>
              </li>
            </ul>
          </div>
          <div class="bot-lr">
            <div class="area-statis comm-heabg">
              <span class="comm-blcoktit">各安检区域放行人数统计</span>
              <span class="icon-gif"></span>
            </div>
            <div id="partitionStatis" class="partition-statis"></div>

          </div>
        </div>
        <div class="cont-bot">
          <div class="bot-lf">
            <div class="area-statis comm-heabg">
              <span class="comm-blcoktit">安检通道实时开闭情况</span>
              <span class="icon-gif"></span>
              <div class="sign-icon">
                <span class="white"><i class="grassgreen"></i>开启</span>
                <span class="white"><i class="waterred"></i>关闭</span>
              </div>
            </div>
            <ul class="securityaccess-info">
              <li v-for="(item,index) in accessInfoData" :key="index">
                <h3 class="lf-tit">{{ item.area }}</h3>
                <ul class="lr-contlist">
                  <li class="accessinfo" v-for="(list,index) in item.details" :key="index">
                    <!-- <span class="comminfo-icon grassgreen"></span> -->
                    <span :class="list.open === 0?'comminfo-icon waterred':'comminfo-icon grassgreen'"></span>
                    <span class="info-name">{{ list.name }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="bot-lr">
            <div class="duty-list comm-heabg">
              <span class="comm-blcoktit duty-list-tit">安检通道实时开闭统计</span>
            </div>
            <ul class="access-statis">
              <li class="commlist">
                <span class="commli-tit">AB安检口</span>
                <span class="commli-num yellow">{{ accessStatisData.abTotal }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">AB开启</span>
                <span class="commli-num yellow">{{ accessStatisData.abOpen }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">AB关闭</span>
                <span class="commli-num yellow">{{ accessStatisData.abClose }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">AC安检口</span>
                <span class="commli-num yellow">{{ accessStatisData.acTotal }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">AC开启</span>
                <span class="commli-num yellow">{{ accessStatisData.acOpen }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">AC关闭</span>
                <span class="commli-num yellow">{{ accessStatisData.acClose }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">DE安检口</span>
                <span class="commli-num yellow">{{ accessStatisData.deTotal }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">DE开启</span>
                <span class="commli-num yellow">{{ accessStatisData.deOpen }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">DE关闭</span>
                <span class="commli-num yellow">{{ accessStatisData.deClose }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">FG安检口</span>
                <span class="commli-num yellow">{{ accessStatisData.fgTotal }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">FG开启</span>
                <span class="commli-num yellow">{{ accessStatisData.fgOpen }}</span>
              </li>
              <li class="commlist">
                <span class="commli-tit">FG关闭</span>
                <span class="commli-num yellow">{{ accessStatisData.fgClose }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="botlf-icon comm-boricon"></div>
      <div class="botlr-icon comm-boricon"></div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import comm from "./Common.vue";
import DateTool from "../../static/js/DateUtils.js";
import {houTube} from "../API/houTubeSecurity"
export default {
  name: "Echarts",
  created() {
    document.title = "侯管旅客人流量与安检口展示大屏";
  },
  data() {
    return {
      date: "",
      disposeDate: "",
      passInfo: {},
      accessInfoData: [],
      accessStatisData: {},
    };
  },
  mounted() {
    const self = this;
    // this.timer = setInterval(function() {
    //   self.date = new Date(); //修改数据date
    //   self.disposeDate = comm.dateFormat(self.date);
    // }, 1000);
    self.getPassInfoData();
    self.getSecurityUserData();
    self.getSecurityAccessInfoData();
    self.getSecurityAccessStatisData();

    if (this.pageTimes) {
      clearInterval(this.pageTimes);
    } else {
      this.pageTimes = setInterval(() => {
        self.getPassInfoData();
        self.getSecurityUserData();
        self.getSecurityAccessInfoData();
        self.getSecurityAccessStatisData();
      }, 180000);
    }
  },
  beforeDestroy() {
    // if (this.timer) {
    //   clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
    // }
  },
  destroyed() {
    clearInterval(this.pageTimes);
  },
  methods: {
    // 安检区域每小时安检旅客
    securityHoursPassengGrahp() {
      const self = this;
    },
    /*
获取航站楼旅客数据信息
*/
    async getPassInfoData() {
      let self = this;
      let result;
      let data = await houTube.getPassInfoData(result).then((result) => {
        if (result.status === 200) {
          self.passInfo = result.data;
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },

    /*
    获取各安检区域放行人数统计数据信息
    */
    async getSecurityUserData() {
      let self = this;
      let result;
      let data = await houTube.getSecurityUserData(result).then((result) => {
        if (result.status === 200) {
          drawSecurityUserStatis(self, result.data);
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },
    /*
    获取安检通道实时开闭情况数据信息
    */
    async getSecurityAccessInfoData() {
      let self = this;
      let result;
      let data = await houTube.getSecurityAccessInfoData(result).then((result) => {
        if (result.status === 200) {
          self.accessInfoData = result.data;
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
    },


    /*
获取安检通道实时开闭统计数据信息
*/
    async getSecurityAccessStatisData() {
      let self = this;
      let result;
      let data = await houTube.getSecurityAccessStatisData(result).then((result) => {
        if (result.status === 200) {
          self.accessStatisData = result.data[0];
        } else {
          comMessageTips(self, result);
        }
      }).catch(() => {
        console.log("error!");
      });
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
折线图
各安检区域放行人数统计
*/
function drawSecurityUserStatis(self, dataInfo) {
  self.areaStatisCont = echarts.init(
    document.getElementById("partitionStatis")
  );
  let seriesColor = ["#327ec8", "#da40c8", "#e8ce65", "#11ffd6"];
  let legendData = [];
  let xaxisList = [];
  let metaDate = [];
  let serieData = [];

  for (let i = 0; i < dataInfo.length; i++) {
    legendData.push(dataInfo[i].name);
    let arrGroup = [];
    for (let j = 0; j < dataInfo[i].count.length; j++) {
      arrGroup.push(dataInfo[i].count[j].total);
    }
    metaDate.push(arrGroup);
  }
  for (let k = 0; k < dataInfo[0].count.length; k++) {
    xaxisList.push(dataInfo[0].count[k].point);
  }
  // console.log(legendData)
  // console.log(xaxisList)
  // console.log(metaDate)

  for (var v = 0; v < legendData.length; v++) {
    var serie = {
      name: legendData[v],
      type: "line",
      symbol: "circle",
      itemStyle: {
        normal: {
          color: seriesColor[v]
        }
      }, //拐点样式
      lineStyle: {
        // 系列级个性化折线样式
        width: 1,
        type: "solid",
        color: seriesColor[v]
      },

      data: metaDate[v]
    };
    serieData.push(serie);
  }
  var option = {
    backgroundColor: "", //背景颜色透明
    tooltip: {
      trigger: "axis" //鼠标经过提示
    },
    legend: {
      icon: "rect", //icon为圆角矩形
      top: "0",
      right: "2%",
      itemWidth: 10,
      itemHeight: 10,
      data: legendData,
      textStyle: {
        //图例文字的样式
        color: "#ffffff",
        fontSize: 13
      }
    },
    grid: {
      left: "3%",
      top: "10%",
      right: "3%",
      bottom: "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xaxisList,
      axisLine: {
        lineStyle: {
          color: "#808286",
          width: 1
        }
      },
      axisLabel: {
        interval: 2,
        color: "#ffffff"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      name: "人",
      nameGap: 8,
      type: "value",
      splitLine: { show: false }, //去除网格线
      axisLine: {
        lineStyle: {
          color: "#808286",
          width: 1
        }
      },
      axisLabel: {
        color: "#ffffff"
      },
      axisTick: {
        show: false
      }
    },
    color: seriesColor,
    series: serieData
  };
  // 使用刚指定的配置项和数据显示图表。
  self.areaStatisCont.setOption(option, true);
  window.addEventListener("resize", function() {
    self.areaStatisCont.resize();
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
  width: 99%;
  height: 1042px;
  padding: 1% 0.5%;
  background: url("../../static/img/vipbg.jpg");
  background-color: #02020b;
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.head {
  overflow: hidden;
  position: relative;
  text-align: center;
  .hea-cont {
    width: 100%;
    .comm-heagif {
      display: inline-block;
      width: 30%;
      height: 36px;
      vertical-align: middle;
    }
    .icongif {
      display: inline-block;
      width: 70%;
      height: 100%;
      background: url("../../static/img/top_comanima.gif") no-repeat;
      background-size: 100% 100%;
    }
    .icon-lf {
      margin-right: 1%;
      left: 25%;
      span {
      }
    }
    .heacont-tit {
      // width: 70%;
      position: relative;
      display: inline-block;
      z-index: 99;
      h2 {
        color: #ffffff;
        // font-size: 30px;
        font-size: 2.3rem;
        font-family: chinese;
        font-weight: bold;
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
      }
      .heatit-lr {
        background: url("../../static/img/top_lr.gif") no-repeat;
        background-position: 100% 100%;
        background-size: 100% 100%;
        transform: rotate(180deg);
        right: -35px;
        top: -8px;
      }
    }
    .icon-lr {
      margin-left: 1%;
      right: 25%;
      top: -3px;
    }
  }

  .horologe {
    position: absolute;
    right: 1%;
    top: 0;
    height: 50px;
    line-height: 50px;
    em {
      width: 18px;
      height: 18px;
      display: inline-block;
      color: #56e2e2;
    }
    span {
      color: #ffffff;
    }
  }
}
.grassgreen {
  background: #00ff91;
}
.waterred {
  background: #f93d6a;
}
.content {
  clear: both;
  width: 100%;
  position: relative;
  .contain {
    position: relative;
    width: 96%;
    margin: 0 2%;
    margin-top: 65px;
    .comm-heabg {
      overflow: hidden;
      padding: 0 2%;
      background: url("../../static/img/com-block-top.bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
    }
    .comm-blcoktit {
      font-size: 18px;
      font-weight: bold;
      color: #8befff;
      display: inline-block;
      float: left;
    }
    .cont-heatotal {
      width: 95.5%;
      height: 68px;
      margin: 0 auto;
      line-height: 68px;
      margin-bottom: 25px;
      .task-total {
        height: 100%;
      }
      .total-num {
        height: 100%;
        font-size: 40px;
        font-weight: bold;
        color: #00c0ff;
        margin-left: 23px;
        display: inline-block;
      }
    }
    .commlist {
      width: 50%;
      float: left;
      text-align: center;
      margin-top: 47px;
      span {
        display: block;
      }
      .commli-tit {
        font-size: 18px;
        line-height: 32px;
        color: #ffffff;
      }
      .commli-num {
        font-size: 34px;
        font-weight: bold;
      }
      .cyan {
        color: #65f5f3;
      }
      .green {
        color: #35dc01;
      }
    }
    .cont-top {
      overflow: hidden;
      width: 100%;
      margin-bottom: 24px;
      .bot-lf {
        width: 24.5% !important;
        .duty-list {
          padding: 0 5%;
          .duty-list-tit {
            height: 57px;
            line-height: 57px;
          }
        }
        .terminal-passenginfo {
          width: 100%;
          // height: 255px;
          height: 300px;
          background: rgba(3, 5, 9, 0.5);
          overflow: hidden;
          li {
            width: 50%;
            float: left;
            text-align: center;
            margin-top: 40px;
            span {
              display: block;
            }
            .commli-tit {
              font-size: 18px;
              color: #ffffff;
            }
            .commli-num {
              font-size: 34px;
              font-weight: bold;
            }
            .cyan {
              color: #65f5f3;
            }
            .green {
              color: #35dc01;
            }
          }
        }
      }
      .bot-lr {
        width: 74% !important;
        .area-statis {
          height: 54px;
          line-height: 54px;
          overflow: hidden;
          span {
            display: inline-block;
            float: left;
          }
          .icon-gif {
            margin-left: 30px;
            width: 25%;
            height: 21px;
            margin-top: 18px;
            background: url("../../static/img/late_passage_anima.gif") no-repeat;
            background-size: 100% 100%;
            background-position: 100% 100%;
          }
        }
        .partition-statis {
          width: 100%;
          // height: 255px;
          height: 300px;
          background: rgba(3, 5, 9, 0.5);
        }
      }
    }
    .cont-bot {
      overflow: hidden;
      .bot-lf {
        width: 74%;
        float: left;
        .area-statis {
          height: 54px;
          line-height: 54px;
          position: relative;
          overflow: hidden;
          span {
            display: inline-block;
            float: left;
          }
          .icon-gif {
            margin-left: 30px;
            width: 25%;
            height: 30px;
            margin-top: 11px;
            background: url("../../static/img/late_passage_anima.gif") no-repeat;
            background-size: 100% 100%;
            background-position: 100% 100%;
          }
          .sign-icon {
            position: absolute;
            right: 0;
            top: 20px;
            overflow: hidden;
            span {
              display: inline-block;
              float: left;
              font-size: 16px;
              font-weight: bold;
              height: 16px;
              line-height: 16px;
              margin-right: 20px;
              i {
                display: inline-block;
                vertical-align: bottom;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                margin-right: 3px;
              }
            }
          }
        }
        .securityaccess-info {
          width: 90%;
          // height: 354px;
          height: 395px;
          background: rgba(3, 5, 9, 0.5);
          padding: 36px 5%;
          color: #ffffff;
          overflow: hidden;
          li::after {
            content: "";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          li {
            overflow: hidden;
            margin-bottom: 70px;
            .lf-tit {
              width: 6%;
              text-align: center;
              font-size: 22px;
              display: inline-block;
              vertical-align: middle;
              // float: left;
            }
            .lr-contlist {
              // float: left;
              display: inline-block;
              vertical-align: middle;
              width: 93%;
              overflow: hidden;
              .accessinfo {
                float: left;
                margin-left: 18px;
                margin-bottom: 6px;
                span {
                  display: inline-block;
                }
                .comminfo-icon {
                  width: 17px;
                  height: 17px;
                  border-radius: 50%;
                  margin-top: 2px;
                  margin-right: 5px;
                  float: left;
                }
                .grassgreen {
                  background: #00ff91;
                }
                .waterred {
                  background: #f93d6a;
                }
                .info-name {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
      .bot-lr {
        width: 24.5%;
        float: right;
        .duty-list {
          padding: 0 5%;
          .duty-list-tit {
            height: 54px;
            line-height: 54px;
          }
        }
        .access-statis {
          width: 100%;
          // height: 354px;
          height: 468px;
          background: rgba(3, 5, 9, 0.5);
          li {
            width: 33.3%;
            margin-top: 30px;
            .yellow {
              color: #fff600;
            }
          }
        }
      }
    }
  }
  .comm-boricon {
    position: absolute;
    // z-index: 999;
    // z-index: 0;
  }
  .toplf-icon {
    width: 504px;
    height: 304px;
    left: -150px;
    top: -69px;
    background: url("../../static/img/viplf-top.gif") no-repeat;
    background-size: 100%;
    background-position: left top;
  }
  .toplr-icon {
    width: 296px;
    height: 296px;
    right: -13px;
    top: -69px;
    background: url("../../static/img/viplr-top.gif") no-repeat;
    background-size: 100%;
    background-position: right bottom;
    transform: rotate(-90deg);
  }
  .botlf-icon {
    width: 504px;
    height: 304px;
    left: -162px;
    bottom: -60px;
    background: url("../../static/img/viplf-bot.gif") no-repeat;
    background-size: 100%;
    background-position: left bottom;
  }
  .botlr-icon {
    width: 296px;
    height: 296px;
    right: -20px;
    bottom: -60px;
    background: url("../../static/img/viplr-bot.gif") no-repeat;
    background-size: 100%;
    background-position: right top;
    transform: rotate(90deg);
  }
}

@media screen and (min-width: 1024px) {
.head .hea-cont .heacont-tit h2 {
    font-size: 1.5rem !important;
  }
  .content .com-tit-hea .com-tit {
    // font-size: 1.2rem !important;
  }
  .content .contain .comm-blcoktit{
    font-size: 16px;
  }
  .content .contain .cont-top .bot-lf .terminal-passenginfo li .commli-tit{
    font-size: 13px;
  }
  .content .contain .commlist .commli-tit{
    font-size: 15px;
  }
  .content .contain .commlist .commli-num{
    font-size: 28px;
  }
  .content .contain .cont-bot .bot-lf .area-statis .sign-icon span{
    font-size: 13px;
  }

}
@media screen and (min-width: 1366px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 1.7rem !important;
  }
  .content .com-tit-hea .com-tit {
    font-size: 1rem !important;
  }
}
@media screen and (min-width: 1680px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 2.1rem !important;
  }
  .content .contain .comm-blcoktit{
    font-size: 18px;
  }
  .content .contain .cont-top .bot-lf .terminal-passenginfo li .commli-tit{
    font-size: 16px;
  }
  .content .contain .commlist .commli-tit{
    font-size: 17px;
  }
  .content .contain .commlist .commli-num{
    font-size: 30px;
  }
  .content .contain .cont-bot .bot-lf .area-statis .sign-icon span{
    font-size: 16px;
  }
}
@media screen and (min-width: 1920px) {
  .head .hea-cont .heacont-tit h2 {
    font-size: 2.3rem !important;
  }.content .contain .comm-blcoktit{
    font-size: 18px;
  }
  .content .contain .cont-top .bot-lf .terminal-passenginfo li .commli-tit{
    font-size: 16px;
  }
  .content .contain .commlist .commli-tit{
    font-size: 18px;
  }
  .content .contain .commlist .commli-num{
    font-size: 34px;
  }
  .content .contain .cont-bot .bot-lf .area-statis .sign-icon span{
    font-size: 16px;
  }
}
</style>
