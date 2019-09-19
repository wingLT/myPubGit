<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="lf-topicon comicon"></div>
      <h2>成都双流国际机场候管中心巡检信息统计分析</h2>
      <div class="lr-topicon comicon"></div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="cont-top">
        <div class="cont-left">
          <div class="contlr-top">
            <h3>完成率统计</h3>
            <div class="track-cont">
              <span class="roleicon trackicon-lftop"></span>
              <span class="roleicon trackicon-lrtop"></span>
              <span class="roleicon trackicon-lfbottom"></span>
              <span class="roleicon trackicon-lrbottom"></span>
              <div class="statis-cont">
                <span class="finshrate-total">总计：{{circleEchart.total}}</span>
                <!-- <div id="finshRateGrahp" class="finsh-rate" style="height: 275px;margin: 0 auto;"></div> -->
                <div id="finshRateGrahp" class="finsh-rate" style="height: 23vh;margin: 0 auto;"></div>
                <div class="finshrate-info">
                  <div class="floor" style="margin-top: 20px;">
                    <div>
                      <span class="info-name">已完成</span>
                      <span class="info-price" style="color: #a4ed8d">{{circleEchart.finished}}</span>
                    </div>
                    <div style="border-right: 1px solid #313132;">
                      <span class="info-name">处理中</span>
                      <span class="info-price" style="color: #187dff">{{circleEchart.resloving}}</span>
                    </div>
                    <div style="border-right: 1px solid #313132;">
                      <span class="info-name">已超期</span>
                      <span class="info-price" style="color: #f84a46">{{circleEchart.delay}}</span>
                    </div>
                    <div>
                      <span class="info-name">待处理</span>
                      <span class="info-price" style="color: #ffa628">{{circleEchart.wait}}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="cont-right">
          <!-- <h3>当前不合格巡检项目</h3> -->
          <h3>现场运行状态</h3>
          <div class="track-cont">
            <span class="roleicon trackicon-lftop"></span>
            <span class="roleicon trackicon-lrtop"></span>
            <span class="roleicon trackicon-lfbottom"></span>
            <span class="roleicon trackicon-lrbottom"></span>
            <div class="sett-personcont">
              <div id="projectCont" class="personopll-cont">
                <div class="swiper-container track-swiper">
                  <div class="swiper-wrapper">
                    <!-- <div class="swiper-slide" v-for="(item,index) in 5" :key="index">
                      <div class="personinfo-cont">
                        <div class="allCont">
                          <div class="info-lr">
                            <p>
                              <span class="info-tit">T2值机厅区域第四次巡检-FG安检口（隔离区外）-设施设备</span>
                            </p>
                          </div>
                          <div class="info-cont">
                            <div class="scroll-text" style="height: 4vh;">
                              T2值机厅区域第四次巡检-FG安检口（隔离区外）-设施设备T2值机厅区域第四次巡检-FG安检口（隔离区外）-设施设备
                            </div>
                          </div>
                        </div>
                        <div class="info-img">
                          <img src="http://222.209.86.146:3312/file/PatImagePath_Service/201905/IMG2304403_0.jpg" width="100%">
                        </div>
                      </div>
                    </div> -->

                    <div class="swiper-slide" v-for="(item,index) in unqualified" :key="index">
                      <div class="personinfo-cont">
                        <div class="allCont">
                          <div class="info-lr">
                            <p>
                              <span class="info-tit">{{item.name}}</span>
                            </p>

                          </div>
                          <div class="info-cont">
                            <div class="scroll-text" style="height: 4vh;">
                              {{item.description}}
                            </div>
                          </div>
                        </div>
                        <div class="info-img">
                          <img :src="item.img" width="100%">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-two"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cont-bottom">
        <div class="cont-left">
          <div class="contlr-bottom">
            <h3>巡检进度统计</h3>
            <div class="personpoll-dispose">
              <div class="sett-personcont">
                <div id="personpollCont" class="personopll-cont">
                  <div id="personpollOne" style="overflow: visible;height: 340px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-right">
          <h3>当日巡检统计</h3>
          <div class="track-cont">
            <span class="roleicon trackicon-lftop"></span>
            <span class="roleicon trackicon-lrtop"></span>
            <span class="roleicon trackicon-lfbottom"></span>
            <span class="roleicon trackicon-lrbottom"></span>
            <div class="date-msg">
              <div class="msg-cont-title">
                <span></span>
                <span>巡检任务</span>
                <span>完成节点数</span>
                <span>总节点数</span>
                <span>完成率</span>
              </div>
              <div class="msg-tag">
                <!-- <div id="scrollMsg" style="height: 290px;overflow: hidden"> -->
                <div id="scrollMsg" style="height: 30vh;overflow: hidden">
                  <div class="swiper-container task">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(list,listindex) in statistics" :key="listindex">
                        <div class="items" :style="index%2===0?'background-color:#1d1237':'background-color:#141236'"
                             v-for="(item,index) in list" :key="index">
                          <div class="ball-items"><span class="blue-ball">{{listindex * 5 + index + 1}}</span></div>
                          <span>{{item.taskName}}</span>
                          <span>{{item.doneNodes}}</span>
                          <span>{{item.totalNodes}}</span>
                          <span>{{item.percent}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-one"></div>
                  </div>
                </div>
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
  import Swiper from "swiper";
//  import '../../static/js/jquery.liMarquee'
  // import '../../static/js/fengmap.min'
  import '../../static/js/layerGroup'
  import {inspection} from "../API/inspection"

  export default {
    name: "Echarts",
    created() {
      document.title = "成都双流国际机场巡检护卫统计";
    },
    data() {
      return {
        id: 139,
        finshRateCont: '',
        departmentTask: '',
        circleEchart: {
          total: '',
          finished: '',
          resloving: '',
          delay: '',
          wait: ''
        },
        statistics: [], //巡检统计
        unqualified: [],//不合格的
        tempData: [],
        progressData: [],
        progressTempData: [],
        points: [],
        f2Points: [],
        f3Points: [],
        f1Points: [],
        f4Points: [],
        maintainSwiper: '',
        mapSwiper: '',
        time: 10,
        timer: '',
        timer1: '',
        F2T1Map: null,
        fmapID: 'yfsl-cdairport',
        isFirstEnter:true,
        trackSwiper:''
      };
    },
    mounted() {},
    beforeDestroy() {
      // this.F2T1Map = null;
      if (this.timer) {
        clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
      }
      if (this.timer1) {
        clearInterval(this.timer1); //在vue实例销毁钱，清除我们的定时器
      }
      // $('#mapF2T1').html('')
    },
    created() {
      let self = this;
      self.$nextTick(function () {
        self.initData();
      });
      window.addEventListener("resize", function () {
        if(self.finshRateCont){
          self.finshRateCont.resize();
        }
        if(self.departmentTask){
          self.departmentTask.resize();
        }
      });
    },
    methods: {
      initData() {
        let self = this;
        this.getCompletion();
        this.getStatistics();
        this.getUnqualified();
        this.getDepartmentTask();
        // this.getTrajectory();
        setTimeout(function () {
          self.isFirstEnter = false;
          window.clearTimeout(self.timer);
          window.clearTimeout(self.timer1);
          self.initData();
        }, 1000 * 60 * self.time)
      },
      //当前不合格巡检项目的swiper
      initTrackSwiper(){
        if (this.trackSwiper) {
          this.trackSwiper.destroy(false);
          this.trackSwiper = null;
        }
        this.trackSwiper = new Swiper('.track-swiper', {
          slidesPerView: 3,
          spaceBetween: 10,
          pagination : '.swiper-two',
          speed: 2000,
          loop: true,
          freeMode:true,
          autoplay: {
            // delay: 1,
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        });
        this.trackSwiper.detachEvents();

      },

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
          self.maintainSwiper.destroy(false);
          self.maintainSwiper = null;
        }
        if (len !== 1) {
          self.$nextTick(function () {
            self.maintainSwiper = new Swiper('.task', {
              direction: 'vertical',
              pagination : '.swiper-one',
              speed: 2000,
              loop: true,
              autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
            });
            self.maintainSwiper.detachEvents();
          });
        }

      },

//      弱点部各分队巡检进度Pie
      getDepartmentTaskPie(nameData, data) {
        let self = this;
        let lineData = [100, 100, 100, 100];
        let option = {
          baseOption: {
            timeline: {
              show: false,
              top: 0,
              data: []
            },
            legend: {
              show: false,
            },
            grid: [{
              show: false,
              left: '5%',
              top: '10%',
              bottom: '8%',
              width: '0%'
            }, {
              show: false,
              left: '5%',
              top: '5%',
              right: '5%',
              bottom: '8%',
              width: '0%'
            }, {
              show: false,
              left: '3%',
              top: '4%',
              bottom: '8%',
              right: '5%',
              containLabel: true,
              width: '90%'
            }],
            xAxis: [{
              type: 'value',
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }, {
              gridIndex: 1,
              show: true
            }, {
              gridIndex: 2,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }],
            yAxis: [{
              type: 'category',
              inverse: true,
              position: 'right',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: nameData
            }, {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#ffffff',
                  fontSize: 14,

                }

              },
              data: nameData.map(function (value) {
                return {
                  value: value,
                  textStyle: {
                    align: 'left',
                    verticalAlign: 'bottom',
                    padding: 6,
                    backgroundColor: '#a4a61c',
                    borderWidth: 4,
                    borderColor: '#f6fb00',
                    height: 15,
                    shadowColor: '#f6fb00',
                    shadowBlur: 10

                  }
                }
              })
            }, {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false

              },
              data: nameData
            }],
            series: [

              {
                type: 'pictorialBar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                symbol: 'roundRect',
                barWidth: '20%',
                //  barMaxWidth: '20%',
                itemStyle: {
                  normal: {
                    color: '#0f475b'
                  }
                },

                symbolRepeat: true,
                symbolOffset: [0, '150%'],
                // symbolSize: 14,
                symbolSize: [8, 18],
                data: lineData,
                barGap: '-100%',
                barCategoryGap: 0,

                label: {
                  normal: {
                    show: true,
                    formatter: (series) => {
                        return data[series.dataIndex]
                      // if(data[series.dataIndex].indexOf('%') == -1){
                      //   return data[series.dataIndex] + '%'
                      // }else{
                      //   return data[series.dataIndex]
                      // }
                    },
                    position: 'insideTopRight',
                    textStyle: {
                      color: '#edc422',
                      fontSize: 20,
                    },
                    offset: [0, -15],
                  }
                },
                z: -100,
                animationEasing: 'elasticOut',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30;
                }
              }, {
                name: '2018',
                type: 'pictorialBar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                symbol: 'roundRect',
                barWidth: '20%',
                barMaxWidth: 100,
                // barMaxWidth: '20%',

                symbolOffset: [0, '150%'],
                itemStyle: {
                  normal: {
                    barBorderRadius: 5,
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: '#38c8c1' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#49e3a2' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                symbolRepeat: true,
                symbolSize: [8, 18],
                data: data,
                animationEasing: 'elasticOut',
                animationDelay: function (dataIndex, params) {
                  return params.index * 30 * 1.1;
                }
              }
            ]

          },
          options: []
        }

        self.departmentTask.setOption(option, true);
      },

//      销毁echarts
      destroyEcharts(mapName) {
        if (mapName || mapName !== null) {
          mapName.clear();
          mapName.dispose();
//          mapName.dispose(false);
        }
      },

//      弱点部各分队巡检进度
      async getDepartmentTask() {
        let self = this;
        let id = self.id;
        await inspection.getDepartmentTask(id).then((result) => {
          if (result.status === 200) {
            self.progressData = result.data;
            self.tempData = [];
            let len = Math.ceil(self.progressData.length / 4);
            len = len > 1 ? 4 : self.progressData.length;
            for (let i = 0; i < len; i++) {
              self.tempData.push(self.progressData[i]);
            }
            for (let i = len; i < self.progressData.length; i++) {
              self.progressTempData.push(self.progressData[i])
            }
            let name = [];
            let data = [];
            for (let j in self.tempData) {
              name.push(self.tempData[j].eleName);
              data.push(self.tempData[j].elevalue);
            }
            if (self.departmentTask) {
              self.destroyEcharts(self.departmentTask);
            }
            self.departmentTask = echarts.init(document.getElementById("personpollOne"));
            self.getDepartmentTaskPie(name, data);
            self.timer = setTimeout(function () {
              self.pageTurning()
            }, 5000)
          }
        }).catch(() => {
          console.log("error!");
        });
      },


//      push新的柱状图
      pageTurning() {
        let self = this;
        if (self.progressTempData.length <= 0) {
          self.progressTempData = JSON.parse(JSON.stringify(self.progressData))
        }
        self.tempData.shift();
        self.tempData.push(self.progressTempData[0]);
        self.progressTempData.shift();
        let name = [];
        let data = [];
        for (let j in self.tempData) {
          name.push(self.tempData[j].eleName);
          data.push(self.tempData[j].elevalue);
        }
        self.getDepartmentTaskPie(name, data);
        self.timer1 = setTimeout(function () {
          self.pageTurning();
        }, 5000)
      },

//      巡检完成率统计
      async getCompletion(){
        let self = this;
        let id = self.id;
        await inspection.getCompletion(id).then((result) => {
          if (result.status === 200) {
            self.circleEchart.total = result.data.total;
            self.circleEchart.resloving = result.data.solving;
            self.circleEchart.delay = result.data.overtime;
            self.circleEchart.wait = result.data.pending;
            self.circleEchart.finished = result.data.done;
            if (self.finshRateCont) {
              self.destroyEcharts(self.finshRateCont)
            }
            self.finshRateCont = echarts.init(document.getElementById("finshRateGrahp"));
            drawSecurityLatePassage(self, Math.round(result.data.done / result.data.total * 100), result.data.done)
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

//      当日巡检统计
      async getStatistics(){
        let self = this;
        let id = self.id;
        await inspection.getStatistics(id).then((result) => {
          if (result.status === 200) {
            self.handleData(result.data)

            // self.statistics = result.data;
            // self.$nextTick(function () {
            //   self.handleData();
            // })
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

      // 个人巡检任务处理
      async getPersonalTask() {
        let self = this;
        let id = self.id;
        await inspection.getPersonalTask(id).then((result) => {
          if (result.status === 200) {
            self.statistics = result.data;
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
      destroyMarquee() {
        this.$nextTick(function () {
          for (let i = 0; i < $('.scroll-text').length; i++) {
            $('.scroll-text').eq(i).liMarquee('destroy')
          }
        });

        $('#projectOne').liMarquee('destroy')

      },
      // 当前不合格的巡检
      async getUnqualified() {
        let self = this;
        let id = self.id;
        await inspection.getUnqualified(id).then((result) => {
          if (result.status === 200) {
          //  self.destroyMarquee();
            self.unqualified = [];
            self.unqualified = result.data;
            self.$nextTick(function () {
              self.initTrackSwiper();
            })
//            $('.scroll-text').liMarquee({
//              direction: 'up',
//              scrollamount: '20',
//              runshort: false,
//              circular: false
//            });
//            setTimeout(function () {
//              $('#projectOne').liMarquee({
//                direction: 'left',
//                scrollamount: '20'
//              });
//            }, 2000)

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
      // 巡检轨迹
      async getTrajectory() {
        let self = this;
        let id = self.id;
        await inspection.getTrajectory(id).then((result) => {
          if (result.status === 200) {
            self.f2Points = [];
            self.f3Points = [];
            self.f1Points = [];
            for (let i = 0; i < result.data.length; i++) {
              if (result.data[i].floor == 'F2') {
                self.f2Points.push({
                  x: result.data[i].traceX,
                  y: result.data[i].traceY,
                })
              } else if (result.data[i].floor == 'F3') {
                self.f3Points.push({
                  x: result.data[i].traceX,
                  y: result.data[i].traceY,
                })
              } else if (result.data[i].floor == 'F1') {
                self.f1Points.push({
                  x: result.data[i].traceX,
                  y: result.data[i].traceY,
                })
              } else if (result.data[i].floor == 'F4') {
                self.f4Points.push({
                  x: result.data[i].traceX,
                  y: result.data[i].traceY,
                })
              }
            }
            if(self.isFirstEnter){
              // self.currentMapF2T1()
            }else {
              self.F2T1Map.clearLineMark();
              self.drawLineAndMarker(2, self.f1Points, null);
              self.drawLineAndMarker(4, self.f3Points, null);
              self.drawLineAndMarker(5, self.f4Points, null);
            }

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

//      绘制路线
      drawLines(map, results, lineStyle, groupId) {
        let line = new fengmap.FMLineMarker();
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          let gid = groupId;
          let points = result.points;
          let seg = new fengmap.FMSegment();
          seg.groupId = gid;
          seg.points = points;
          line.addSegment(seg);
          map.drawLineMark(line, lineStyle);
        }

      },

//      绘制定位点
      addLocationMarker(map, coord, locationMarker, groupId) {
        locationMarker = new fengmap.FMLocationMarker({
          url: require("../../static/img/pointer.png"),
          //设置图片显示尺寸
          size: 30,
          //设置图片高度，默认是5
          height: 5,
          callback: function () {
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
          groupID: groupId,
          //设置定位点的高于楼层多少
          zOffset: 1,
        });
      },

      currentMapF2T1() {
        let self = this;
        let groups = [2, 4, 5];
        if (!self.F2T1Map) {
          self.F2T1Map = new fengmap.FMMap({
            //渲染dom
            container: document.getElementById('mapF2T1'),
            //地图数据位置
            mapServerURL: './static/data/' + self.fmapID,
            //主题数据位置
            mapThemeURL: './static/data/theme',
//            mapThemeURL: 'http://192.168.1.6/data/theme',
            //设置主题
            defaultThemeName: '652557',
            // 默认比例尺级别设置为20级
            defaultMapScaleLevel: 10,
            defaultMapScale: 200000,
//            defaultMapScale: 7000,
//            scaleLevel:6,
            //关闭聚焦层切换的动画显示
            focusAnimateMode: true,
            focusAlphaMode: false,
            //设置最大倾斜角
//            defaultMaxTiltAngle: 180,
//            defaultTiltAngle: 120,
            //开发者申请应用下web服务的key
            key: 'c8e2472ac27d3a1cb9b30c6669fcb8ff',
            //开发者申请应用名称
            appName: 'AOC登记口热力图',
            defaultControlsPose: {
              target:"277.155,-0.000,202.112",
              position:"-866.989,700.767,-203.050"
            },
            defaultViewMode: fengmap.FMViewMode.MODE_3D,
            defaultVisibleGroups: [1], //初始显示楼层，默认[2]
            defaultFocusGroup: 1,
            offset: {
              x: 10000000,
              y: 10000000
            }
          });
          self.F2T1Map.openMapById(self.fmapID);
          self.F2T1Map.on('mapClickNode', function (event) {
//            console.log(fengmap.MapUtil.getControlsInfo())
          });
          self.F2T1Map.on('loadComplete', function () {
            self.F2T1Map.tiltAngle = 20;
            self.F2T1Map.groupSpace = 90;
            self.F2T1Map.visibleGroupIDs = groups;
            self.F2T1Map.focusGroupID = 1; //设置聚焦楼层为第一层。
            self.drawLineAndMarker(2, self.f1Points, null);
            self.drawLineAndMarker(4, self.f3Points, null);
            self.drawLineAndMarker(5, self.f4Points, null);
          })
        }
      },

      drawLineAndMarker(groupId, arr, locationMarker) {
        if (arr.length == 0) {
          return;
        }
        let self = this;
        let naviResults = [{
          groupId: groupId,
          points: arr
        }];
        //配置线型、线宽、透明度等
        let lineStyle = {
          //设置线的宽度
          lineWidth: 4,
          //设置线的透明度
          alpha: 0.8,
          //设置线的类型为导航线
          lineType: fengmap.FMLineType.FMARROW,
          //设置线动画,false为动画
          noAnimate: true,
        };
        //绘制线
        self.drawLines(self.F2T1Map, naviResults, lineStyle, groupId);
        //添加定位点标注，并设置定位点坐标为地图中心点
        self.addLocationMarker(self.F2T1Map, {
          x: arr[arr.length - 1].x,
          y: arr[arr.length - 1].y
        }, locationMarker, groupId);
      }

    }
  }
  /*
  完成率 统计
  */
  function drawSecurityLatePassage(self, data, count) {
    let seat = 100 - data;
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : " + count + " ({d}%)"
      },
      series: [
        {
          name: "完成率统计",
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
              value: data,
              name: "完成",
              label: {
                normal: {
                  formatter: "{d}%",
                  textStyle: {
                    fontSize: 34,
                    color: '#a4ed8d',
                  }
                }
              },
              tooltip: {
                show: true
              },
              itemStyle: {
                normal: {
                  color: "#a4ed8d",
                  shadowColor: '#a4ed8d',
                  shadowBlur: 10,
                },
              },
              hoverAnimation: false
            },
            {
              value: seat,
              name: "完成率",
              label: {
                normal: {
                  formatter: "\n完成率",
                  textStyle: {
                    fontSize: 14,
                    color: '#a4ed8d',
                  }
                }
              },
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: "#2c3b46"
                },
                emphasis: {
                  color: "#2c3b46"
                }
              },
              hoverAnimation: false
            },
          ]
        }
      ]
    };
    self.finshRateCont.setOption(option, true);
  }




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../static/font/font.css";

  .body-bg {
    width: 100%;
    // height: 1042px;
    // height: 100%;
    height: 96vh;
    position: relative;
    overflow: hidden;
    padding: 1% 0.5%;
    background: url("../../static/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
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
    // margin-bottom: 40px;
    margin-bottom: 2.5vh;
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
    .cont-top {
      .cont-left {
        width: 22%;
        float: left;
        margin-right: 1.5%;
      }
      .cont-right {
        width: 76%;
        float: right;
        .track-cont {
          // height: 420px;
          // height: 40vh;
          height: 37vh;
          .sett-personcont {
            overflow: hidden;
            // padding: 2%;
            padding: 1.5vh 2vh;
            // height: 91%;
            height: 34vh;
            .personopll-cont {
              overflow: hidden;
              height: 100%;
              width: 100%;
            }
          }
          .swiper-container{
            width: 100%;
            height: 100%;
            .swiper-slide{
              // height: 382px;
              height: 100%;
              width: 285px;
              background: url("../../static/img/scroll-bg.png") no-repeat 100%;
              background-size: 100% 100%;
              .personinfo-cont {
                width: 89%;
                // height: 345px;
                height: 30vh;
                padding: 19px 15px;
                white-space: initial;
                position: absolute;
                .allCont {
                  // height: 126px;
                  height: 10vh;
                }
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
                .info-cont {
                  color: #8fdbff;
                  font-size: 14px;
                  margin-bottom: 3%;
                  overflow: hidden;
                }
                .info-img {
                  margin: 0 auto;
                  // width: 238px;
                  width: 95%;
                  height: 20vh;
                }
                .info-lr {
                  // width: 82%;
                  p {
                    color: #8fdbff;
                    line-height: 20px;
                    // margin-bottom: 7%;
                    margin-bottom: 0.5vh;
                    // max-height: 72px;
                    max-height: 6vh;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    .info-tit {
                      font-size: 15px;
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
          ul {
            white-space: nowrap;
            width: auto;
            width: 100%;

            li {
              position: relative;
              overflow: hidden;
              height: 382px;
              margin-bottom: 10px;
              background: url("../../static/img/scroll-bg.png") no-repeat 100%;
              background-size: 100% 100%;
              width: 285px;
              display: inline-block;
              /*float: left;*/
              margin-right: 10px;

              .personinfo-cont {
                width: 89%;
                height: 345px;
                padding: 19px 15px;
                white-space: initial;
                position: absolute;
                .allCont {
                  // height: 126px;
                  height: 10vh;
                }
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
                .info-cont {
                  color: #8fdbff;
                  font-size: 14px;
                  margin-bottom: 3%;
                  overflow: hidden;
                }
                .info-img {
                  margin: 0 auto;
                  // width: 238px;
                  width: 95%;
                  height: 20vh;
                }
                .info-lr {
                  // width: 82%;
                  /*margin-left: 2%;*/
                  /*float: right;*/
                  p {
                    color: #8fdbff;
                    line-height: 20px;
                    margin-bottom: 7%;
                    max-height: 63px;
                    .info-tit {
                      font-size: 15px;
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
    .cont-bottom {
      margin-top: 2%;
      position: relative;
      display: inline-block;
      width: 100%;
      .cont-left {
        width: 30%;
        float: left;
        
      }
      .cont-right {
        width: 68%;
        float: right;
        .track-cont {
          // height: 420px;
          height: 39vh;
          .date-msg {
            /*height: 385px;*/
            /*margin-top: 40px;*/
            padding: 0 20px;
            // padding-top: 4%;
            padding-top: 2vh;
            color: #fff;
            .msg-cont-title {
              // height: 62px;
              // height: 50px;
              height: 5vh;
              background-color: #152f49;
              color: #80f9f2;
              line-height: 5vh;
              white-space: nowrap;
              span {
                display: inline-block;
              }
              span:nth-child(1) {
                width: 10%;
                text-align: center;
              }
              span:nth-child(2) {
                width: 36%;
                text-align: center;
              }
              span:nth-child(3) {
                width: 15%;
                text-align: center;
              }
              span:nth-child(4) {
                width: 17%;
                text-align: center;
              }
              span:nth-child(5) {
                width: 17%;
                text-align: center;
              }
            }
            .msg-tag {
              // height: 291px;
              height: 32vh;
              overflow: hidden;
              /*div:nth-child(odd) {*/
              /*background-color: #1d1237;*/
              /*}*/
              /*div:nth-child(even) {*/
              /*background-color: #141236;*/
              /*}*/
              div.items {
                color: #41c5d7;
                height: 6vh;
                line-height: 6vh;
                // height: 58px;
                // line-height: 58px;
                div.ball-items {
                  width: 10%;
                  display: inline-block;
                  text-align: center;
                }
                span:nth-child(2) {
                  width: 36%;
                  display: inline-block;
                  text-align: center;
                }
                span:nth-child(3) {
                  width: 15%;
                  display: inline-block;
                  text-align: center;
                }
                span:nth-child(4) {
                  width: 17%;
                  display: inline-block;
                  text-align: center;
                }
                span:nth-child(5) {
                  width: 17%;
                  display: inline-block;
                  text-align: center;
                  color: #fff;
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
            }

          }
        }
      }
    }
    .track-cont {
      width: 98%;
      height: 370px;
      margin-top: 20px;
      border: 1px solid #ffffff;
      border-radius: 20px;
      position: relative;
      .marker {
        position: absolute;
        color: black;
        z-index: 4000;
        left: 23px;
        font-size: 22px;
        top: 5px;
      }
      .roleicon {
        // width: 5%;
        // height: 8%;
        // width: 58px;
        width: 66px;
        // height: 60px;
        height: 7vh;
        display: inline-block;
        background: url('../../static/img/jio.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: 100;
      }
      .trackicon-lftop {
        left: -9px;
        top: -9px;
      }
      .trackicon-lrtop {
        // right: -7px;
        // top: -10px;
        right: -2vh;
        // top: -10px;
        top: -0.5vh;
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
      }
    }

    .contlr-top {
      .track-cont {
        width: 96%;
        // height: 318px;
        // height: 370px;
        // height: 419px;
        // height: 40vh;
        height: 37vh;
        background-size: 100% 100%;
        .statis-cont {
          /*padding: 0 19%;*/
          padding-top: 20px;
          /*width: 82%;*/
          // height: 370px;
          height: 35vh;
          position: relative;
          /*overflow: hidden;*/
          .finshrate-total {
            position: absolute;
            right: 6%;
            color: #ffffff;
            font-size: 14px;
          }
          .finsh-rate {
            width: 80%;
            /*height: 100%;*/
            /*float: left;*/
          }
          .finshrate-info {
            /*width: 80%;*/
            height: 100px;
            /*float: right;*/
            .floor {
              width: 100%;
              height: 70px;
              overflow: hidden;
              /*<!--box-shadow: 0 -3px 3px -1px #fff;-->*/
              padding-top: 10px;
              div {
                width: 24%;
                float: left;
                text-align: center;
                color: #ffffff;
                .info-name {
                  width: 100%;
                  font-size: 1rem;
                  display: inline-block;
                }
                .info-price {
                  font-family: num1;
                  // font-size: 33px;
                  font-size: 1.6rem;
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
        // height: 400px;
        // height: 445px;
        height: 42vh;
        background: url("../../static/img/gerenxunjian.png") no-repeat;
        background-size: 100% 100%;
        .sett-personcont {
          overflow: hidden;
          padding: 6% 5% 0 6%;
          // height: 85%;
          height: 88%;
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
                // width: 86%;
                margin-left: 2%;
                float: right;
                p {
                  color: #8fdbff;
                  line-height: 30px;
                  .info-tit {
                    font-size: 15px;
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

  div.swiper-container {
    width: 100%;
    height: 100%;
  }

  div.swiper-slide {
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 1024px) {
    .content .cont-top .cont-right .track-cont .swiper-container .swiper-slide .personinfo-cont .allCont{
      height: 10vh;
    }
    .content .cont-top .cont-right .track-cont .swiper-container .swiper-slide .personinfo-cont .info-img{
      height: 20vh;
    }
    .content .cont-top .cont-right .track-cont .swiper-container .swiper-slide .personinfo-cont .info-img>img{
      height: 100%;
    }
    .content .contlr-bottom .personpoll-dispose .sett-personcont{
        padding: 9% 5% 0 6%;
        height: 75%;
    }
    .content .contlr-top .track-cont .statis-cont .finshrate-info>.floor{
      margin-top: 8px;
    }
    .content .cont-top .cont-right .track-cont .swiper-container .swiper-slide .personinfo-cont .info-lr p .info-tit{
      font-size: 14px;
    }



    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      // width: 80%;
      margin-left: 2%;
      float: right;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 14px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 0.5rem;
    }

    
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-time {
      font-size: 12px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .infotime-quentum {
      float: right;
      white-space: nowrap;
      display: inline-block;
      font-size: 12px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont {
      width: 98%;
      height: 60px;
      padding: 19px 3px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lf .infolf-icon {
      width: 45px;
      height: 45px;
      background-color: #cccccc;
      border-radius: 50%;
      border: 2px solid #8fdbff;
    }

  }

  @media screen and (min-width: 1280px) {
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      width: 80%;
      margin-left: 2%;
      float: right;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 15px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 0.8rem;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .infotime-quentum {
      float: right;
      white-space: nowrap;
      display: inline-block;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont {
      width: 95%;
      height: 60px;
      padding: 19px 15px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lf .infolf-icon {
      width: 58px;
      height: 58px;
      background-color: #cccccc;
      border-radius: 50%;
      border: 2px solid #8fdbff;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 0.8rem;
    }

    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(2) {*/
    /*width: 36%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(3) {*/
    /*width: auto;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(4) {*/
    /*width: 17%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(5) {*/
    /*width: 13%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-tag div span:nth-child(5) {*/
    /*width: 10%;*/
    /*}*/

  }

  @media screen and (min-width: 1366px) {
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      width: 80%;
      margin-left: 2%;
      float: right;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 1rem;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 16px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 0.8rem;
    }

    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(2) {*/
    /*width: 36%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(3) {*/
    /*width: auto;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(4) {*/
    /*width: 17%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(5) {*/
    /*width: 16%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-tag div span:nth-child(5) {*/
    /*width: 10%;*/
    /*}*/
  }

  @media screen and (min-width: 1440px) {
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      width: 81%;
      margin-left: 2%;
      float: right;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 16px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 1rem;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 0.8rem;
    }

    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(2) {*/
    /*width: 36%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(3) {*/
    /*width: 15%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(4) {*/
    /*width: 17%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-cont-title span:nth-child(5) {*/
    /*width: 17%;*/
    /*}*/
    /*.content .cont-bottom .cont-left .track-cont .date-msg .msg-tag div span:nth-child(5) {*/
    /*width: 10%;*/
    /*}*/
  }

  @media screen and (min-width: 1600px) {
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      width: 82%;
      margin-left: 2%;
      float: right;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 1rem;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 16px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }
  }

  @media screen and (min-width: 1920px) {
    .content .contlr-bottom .personpoll-dispose .sett-personcont{
        padding: 6% 5% 0 6%;
        height: 88%;
    }
    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr {
      width: 86%;
      margin-left: 2%;
      float: right;
    }
    .content .cont-top .cont-right .track-cont .swiper-container .swiper-slide .personinfo-cont .info-lr p .info-tit{
      font-size: 16px;
    }

    .content .contlr-top .track-cont .statis-cont .finshrate-info .floor div .info-name {
      font-size: 1rem;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-tit {
      font-size: 16px;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p .info-user {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding: 2px 12px;
      background: #09bf70;
      border-radius: 15px;
      color: #ffffff;
    }

    .content .contlr-bottom .personpoll-dispose ul li .personinfo-cont .info-lr p {
      color: #8fdbff;
      line-height: 30px;
      font-size: 12px;
    }
  }
</style>
