<template>
  <div class="a-cdm-container">
    <div class="logistics-title">成都双流国际机场A-CDM</div>
    <div class="a-cdm-content">
      <el-row style="height: calc(100% - 480px);margin-bottom:60px;" class="a-cdm-content-row">
        <el-col :span="6" style="max-width: 307px">
          <div class="left-top-content">
            <div class="left-top-content-title"></div>
            <div class="left-data-container" style="margin-top: -20px">
              <div class="left-data-title">计划出港数</div>
              <div class="left-data">20,532 <span>人</span></div>
            </div>
            <div class="left-data-container">
              <div class="left-data-title">安检数</div>
              <div class="left-data">20,532 <span>人</span></div>
            </div>
            <div class="left-data-container">
              <div class="left-data-title">登机数</div>
              <div class="left-data">20,532 <span>人</span></div>
            </div>
            <div class="left-data-container">
              <div class="left-data-title">滞留数</div>
              <div class="left-data">20,532 <span>人</span></div>
            </div>
          </div>
        </el-col>
        <el-col :span="19" style="width: calc(100% - 307px);">
          <div class="right-data-container">
            <div class="right-charts"></div>
            <div class="right-data-content">
              <div class="left-top-content-title"></div>
              <div class="left-data-container" style="margin-top: -30px">
                <div class="left-data-title" style="font-weight: bold">登机口统计</div>
                <div class="left-data-total"><span>9</span>架次</div>
                <ul class="right-ul">
                  <li v-for="i in 9">
                    <p>MU1562 登机口：226</p>
                    <div class="line-segment" :style="'width: '+((100) - (10*i/2))+'%'"
                         style=" background:rgb(19, 112, 251); ">
                      <i class="light"></i>
                    </div>
                    <div class="line-segment" :style="'width: '+((100) - (10*i/2))+'%'"
                         style=" background: rgb(13, 57, 146);">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="height: 330px;" class="a-cdm-content-row">
        <el-col :span="4">
          <div class="-datav-wraper">
            <div class="-datav-wraper-container">
              <p>前站晚到</p>
              <div class="left-data-total" style="margin-bottom: 18px;"><span>9</span>架次</div>
              <ul class="datav-wraper-ul">
                <li v-for="i in 4">
                  <div>{{i}}</div>
                  <div>
                    <marquee><p>MU1562 深圳宝安机场<i style="width:48px"></i>MU1562 深圳宝安机场</p></marquee>
                    <span class="datav-span" :style="'width: '+((100) - (10*i))+'%'"></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="center-charts-title">
            <p>航班小时延误</p>
            <div class="center-charts-title-img"></div>
          </div>
          <div id="load24" class="load24"></div>
        </el-col>
        <el-col :span="6">
          <div class="left-data-title">停机位统计</div>
          <div class="right-bottom-content">
            <div class="">
              <p>总计开放</p>
              <span>142</span>个
            </div>
            <div class="">
              <p>近机位开放</p>
              <span>142</span>个
            </div>
            <div class="">
              <p>远机位开放</p>
              <span>142</span>个
            </div>
            <div class="">
              <p>远机位开放</p>
              <span>142</span>个
            </div>
          </div>
          <div class="right-bottom-charts">
            <div id="load25"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts"

  export default {
    name: "A-CDM",
    data() {
      return {}
    },
    created() {
      this.initChartsBottom('load24', null);
      this.initChartsBottom1('load25', null);
    },
    methods: {
      initChartsBottom(elementId, data) {
        let self = this;
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          let textStyle = {
            color: "#fff"
          };
          let fillImg ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFhJREFUeNrs3U+O1DgUgHHblUFzhb7GCCHNtnfMFUasOA9HYEWfAQlpZq6AEOIIdPcFZgMVe5L6Q6pLzQjFLZK2fpZSKbVioQ8n9b68+Dnxz39fXYYYrkIIF+Fxt5the5kagQkHhtepEZhvUCk01tLh3Gul3aZQwovxSwMwn8cfhW74+Lul66jJawgQIEB1QJfDdj1s5ZFvI8NzLsfluByX43KAlmzjKRdyTkYIEJeb6XK5JC7H5bhchculmLmcOASoAqjPGyMEiMtVuFyMhctxOS5X4XKlRC4nDgECBIjLLeVyXSnpqhQux+W43FyXi/Jy4hCgKqC+74wQIC5XkZdLKcvLcTkuV+FyOScuJw4Bmt/MlwPE5WprH4LaBy7H5WpcbvjgcuIQIECAuByXe0iXy4eJtOONXilx2NJh238PIYbpmPP9qvpc7O5YU+r351/KB9hyAl7C3WPO9+vqs3O5hkZocrn9H+PJwdP3Y87h/n9sNX24HKBFgLaesQLiclUul9Q+yMvJy1Xl5bLaB3EIUE3biVzvGSsgLjfb5Yb7ci7H5bhchcvFWLicOAQIECAux+W43P1QXcmpuWuotbyc2gdxCFBF29c+FHk5QFzOfDl5OS63jMsFtQ/iECBAgLgcl+Ny34PqcoMrot+cFkzEWIbtuN9/H0/R/yuyWFGf2zR8vBiLIHa5hTsFE3FGkcWifT4Pey63fqDt9hemsOYWSylGaM2t++P6zWUjS7KNuZGX1pdbO5S83Mqb9eXEIUC1gfV4r2GEAP08IHk5LsfluNzkcsEzVnEIULXLFS4HiMvNdrnh+uFyXI7LVbhcTN7hJQ4BqnU5eTlAXG6+y/XbjstxOS5X4XJ93nA5cQhQrcupYwXE5Wa7XLRWMJfjclUuV6wVLA4BAgSIyy3ncl0p6aoULsfluNxcl4vRM1ZxCBAgQFxuybWC25ov1+Wc2nK543tOj/tpeYxpOz9mzX3GERpd7uI4PWZcGuO8Hf82vSr07n5FfW7TZrPlcuIQoAqgL19+NUKAuFyFyw1xyDPWVbtci9dQY/Pl+o7LiUOA5rdD7cPGCAHicubLcTkut4jLmS8nDgF6CJdT+wCIy3kfK5fjcsu43HA/xOXEIUCVLnffhAYjBIjL/ZjLZevLcTkuV+Vyyfpy4hCgKqCvX58YIUBcbr7Lxd8/vb1u6Gf7hstxuZ/tcp6xikOAAAHicubLPYz2BHk5LsfluJzA+tja7hlrr/YBEJeb63Lx2cd38nJcjstVuFyyvpw4BAgQIC7H5bgcl3u0Lpd77/AShwBVNGuSAOJylS739MNf7blcSv1+uFI+LFmbT5avzbv/gOmY8/2q+lzc+ZWbqvZPK76OS9duvrNfV5/2XG4YMS4nDgECBIjLcbmHdLmGzjh5OS7H5cShxoGsLweIy1W63G/v/+FyXI7LVbic+XLiECBAgLgcl+NyXI7LrcXlYilFHAIEaH77T4ABAKzsRPWz+TQ7AAAAAElFTkSuQmCCgg";
          let option = {
            grid: {
              top: "42px",
              left: "50px",
              right: "22px",
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
              data: [0, 6, 6, 9, 7, 1, 6, 87, 1, 3, 2],
            },
            yAxis: {
              name: '人',
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
            series: [
              {
                type: 'pictorialBar',
                z: 3,
                barWidth: '45%',
                data: [0, 6, 6, 9, 7, 1, 6, 87, 1, 3, 2],
                symbol: 'image://'+ fillImg,
                symbolClip: true,
                symbolSize: [15, '100%']
              }]
          };
          myChart.setOption(option);
        });
      },
      initChartsBottom1(elementId, data) {
        let self = this;

        var builderJson = {
          "all": 10887,
          "components": {
            "geo": 2788,
            "title": 9575,
            "legend": 9400,
            "tooltip": 9466,
            "grid": 9266
          },
          "ie": 9743
        };
        this.$nextTick(() => {
          let myChart = echarts.init(document.getElementById(elementId));
          let textStyle = {
            color: "#fff"
          };
          let option = {
            grid: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              containLabel: true
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
              type: 'value',
              boundaryGap: [0, 0.01],
              max: builderJson.all,
            },
            yAxis: {
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
              data: Object.keys(builderJson.components),
              axisLabel: {
                interval: 0,
                rotate: 0
              }
            },
            series: [
              { barWidth: 15,
                type: 'bar',
                stack: 'component',
                z: 3,
                label: {
                  normal: {
                    position: 'right',
                    show: true
                  }
                }, itemStyle: {
                  normal: {
                    color: 'rgb(6, 105, 210)'
                  }
                },
                data: Object.keys(builderJson.components).map(function (key) {
                  return builderJson.components[key];
                })
              }, {
                barWidth: 15,
                type: 'bar',
                stack: 'component',
                silent: true,
                itemStyle: {
                  normal: {
                    color: 'rgb(67, 67, 67)'
                  }
                },
                data: Object.keys(builderJson.components).map(function (key) {
                  return builderJson.all - builderJson.components[key];
                })
              }
            ]
          };
          myChart.setOption(option);
        });
      },
    }
  }
</script>

<style scoped>
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

  .a-cdm-container {
    width: 100vw;
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

  .a-cdm-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 0 20px 0;
  }

  .a-cdm-content-row {
    width: 90vw;
    margin: 0 auto;
  }

  .a-cdm-content-row > div {
    height: 100%;
  }

  .left-top-content {
    width: 100%;
    height: 100%;
  }

  .left-top-content-title {

    background-image: url("./img/left.gif");
    width: 307px;
    height: 104px;
    opacity: 1;
    background-size: 348px;
    background-repeat: no-repeat;
    background-position: -50px top;
  }

  .left-data-container {
    width: 100%;
  }

  .left-data-title {
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgb(234, 234, 234);
    font-weight: normal;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: 26px;
    border-left: 10px solid rgb(226, 0, 0);
  }

  .left-data {
    padding-left: 20px;
    font-size: 56px;
    font-weight: 500;
    color: rgb(139, 239, 255);
  }

  .left-data span {
    font-size: 26px;
    color: #fff;
  }

  .right-data-container {
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 0 0 0 193px;
    border-image-source: url(https://img.alicdn.com/tfs/TB16jdqQXXXXXcVaXXXXXXXXXXX-731-407.png);
    border-image-slice: 0 0 0 193 fill;
    border-image-width: initial;
    border-image-outset: initial;
    /*border-image-repeat: repeat;*/
    background: none;
    box-sizing: border-box;
    position: relative;
  }

  .right-charts {
    box-sizing: border-box;
    position: absolute;
    left: -193px;
    top: 0;
    width: calc(100% - 242px + 193px);
    padding: 30px 0 25px 25px;
    height: 100%;
  }

  .right-data-content {
    width: 242px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }

  .left-data-total {
    font-size: 22px;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 6px;
  }

  .left-data-total span {
    color: rgb(139, 239, 255);
    font-size: 48px;
    font-weight: 500;
  }

  .right-ul {
    width: 100%;
    height: 380px;
    list-style: none;
  }

  .right-ul li {
    padding-left: 20px;
    position: relative;
    font-size: 18px;
    min-height: 22px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .right-ul li p {
    margin-bottom: 6px;
  }

  .light {
    cursor: pointer;
    position: absolute;
    /*left: 100%;*/
    top: 0;
    width: 40px;
    height: 2px;
    background-image: -webkit-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: -moz-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: -o-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: -ms-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    -webkit-transform: skewx(-25deg);
    -moz-transform: skewx(-25deg);
    -o-transform: skewx(-25deg);
    -ms-transform: skewx(-25deg);
    transform: skewx(-25deg);
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    transition: 0.5s;
    animation: infinite 3s light;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0);
  }

  @keyframes light {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }

  .line-segment {
    height: 2px;
    width: 100%;
    display: block;
    overflow: hidden;
    position: relative;
    border-radius: 2px;
  }

  .-datav-wraper {
    width: 507px;
    height: 262px;
    border-style: solid;
    border-width: 56px 69px 27px 13px;
    border-image-source: url(./img/left_bottom.png);
    border-image-slice: 52 4 27 13 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: repeat;
    background: none;
  }

  .-datav-wraper-container {
    width: 265px;
    height: 100%;
    position: relative;
  }

  .-datav-wraper-container > p {
    position: absolute;
    top: -55px;
    font-size: 24px;
    color: rgb(234, 234, 234);
    padding-left: 10px;
  }

  .datav-wraper-ul {
    list-style: none;
    padding-left: 14px;
  }

  .datav-wraper-ul li {
    min-height: 20px;
    overflow: hidden;
    margin-bottom: 16px;
    width: 100%;
  }

  .datav-wraper-ul li > div {
    float: left;
    height: 100%;
  }

  .datav-wraper-ul li > div:nth-child(1) {
    flex: 0 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: rgb(255, 255, 255);
    margin-right: 10px;
    width: 58px;
    border-radius: 10px;
    background: rgb(15, 26, 121);
  }

  .datav-wraper-ul li > div:nth-child(2) {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
    transform-style: preserve-3d;
    transform-origin: 50% 50% 0px;
    background: rgba(55, 33, 82, 0);
    border-radius: 5px;
    width: calc(100% - 68px);
    line-height: 31px;
    font-size: 24px;
  }

  .datav-wraper-ul li > div:nth-child(2) i {
    display: inline-block;
    height: 1px;
  }

  .datav-wraper-ul li > div:nth-child(2) marquee {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .datav-wraper-ul li > div:nth-child(2) p {

    padding: 0 6px;
  }

  .datav-span {
    position: absolute;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    background: linear-gradient(90deg, rgb(16, 12, 85) 0%, rgb(10, 28, 98) 32%, rgb(60, 1, 92) 100%);
    z-index: 0;
  }

  .center-charts-title {
    font-size: 24px;
    padding-left: 10px;
  }

  .center-charts-title-img {
    background: url(./img/left_top.gif) no-repeat -191px -120px;
    width: 100%;
    height: 13px;
    background-size: 1197px;
  }

  .right-bottom-charts {
    height: 224px;
    border-style: solid;
    border-width: 29px 107px 109px 16px;
    border-image-source: url(./img/right_bottom.png);
    border-image-slice: 29 107 109 16 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: repeat;
    background: none;
    box-sizing: border-box;
    width: 100%;
    position: relative;
  }

  .right-bottom-charts > div {
    position: absolute;
    width: 326px;
    height: 169px;
    left: 0;
    top: 0;
  }

  .right-bottom-content {
    overflow: hidden;
  }

  .right-bottom-content > div {
    float: left;
    width: 25%;
    height: 72px;
    display: block;
    align-items: start;
    box-sizing: border-box;
    padding-top: 10px;
    font-size: 18px;
  }

  .right-bottom-content span {
    color: rgb(255, 246, 0);
    font-size: 28px;
    font-family: "Microsoft Yahei";
  }

  .load24 {
    height: calc(100% - 60px);
    width: 100%;
  }
</style>
