<template>
  <div class="body-bg">
    <!-- 顶部 -->
    <div class="head">
      <div class="hea-cont">
        <div class="icon-lf comm-heagif">
          <span class="icongif" style="float:right;"></span>
        </div>
        <div class="heacont-tit">
          <div class="heacont-titbg"></div>
          <!--<span class="heatit-lf com-borgif"></span>-->
          <h2>综合运维报修大数据分析大屏</h2>
          <!--<span class="heatit-lr com-borgif"></span>-->
        </div>
        <div class="icon-lr comm-heagif">
          <span class="icongif" style="float:left;"></span>
        </div>
      </div>
      <div class="horologe">
        <!--<em class="el-icon-time"></em>-->
        <!-- <span>2018-10-15 11:55:56</span> -->
        <!--<span v-cloak>{{ disposeDate }}</span>-->
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="toplf-icon comm-boricon"></div>
      <div class="toplr-icon comm-boricon"></div>
      <!-- <div class="outbord"></div> -->
      <div class="contain">
        <div class="cont-top">
          <div class="lf-block topcom-bord" id="circleBlock">
            <div class="com-tit-hea comm-heabg">
              <span class="yellow-sign com-span"></span>
              <span class="com-tit com-span ">航站楼故障报修热门区域及平均报修时长</span>

              <!--<span class="bedeck-gif com-span"></span>-->
            </div>
            <!--<div id="circle" style="height: 800px;">-->

            <!--</div>-->
            <!--<canvas id="myCanvas" width="500" height="800">-->

            <!--</canvas>-->
            <!--<div class="hotArea" id="hotArea" style="height: 800px;z-index: 10000;">-->

            <!--</div>-->
            <div class="circle-area" style="width: 100%;">

              <svg width="100%" height="100%" ref="svg" id="svg" font-family="sans-serif" font-size="16"
                   text-anchor="middle"></svg>
            </div>
          </div>
          <div class="center-block ">
            <div class="topcom-bord" style="margin-bottom: 20px;">
              <div class="com-tit-hea comm-heabg">
                <span class="yellow-sign com-span"></span>
                <span class="com-tit com-span">各系统故障关联链分析</span>
                <span class="bedeck-gif com-span"></span>
              </div>
              <div class="links-icon">
                <div class="links-icon-item">
                  <i class="icon-item icon-blue"></i><span class="icon-text">区域</span>
                </div>
                <div class="links-icon-item">
                  <i class="icon-item icon-green"></i><span class="icon-text">系统</span>
                </div>
                <div class="links-icon-item">
                  <i class="icon-item icon-red"></i><span class="icon-text">故障</span>
                </div>
              </div>
              <div class="swiper-container links">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(list,listindex) in linkSwiper">
                    <div v-for="(item,index) in list">
                      <div class="relevantLinks">
                        <!--<div class="relevantLinks" :style="index==1?'width: 50%;float: left;':'width: 20%;float: left;'">-->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>

              <!--<div class="relevantLinks" id="relevantLinks2" style="width: 32%;float: left">-->

              <!--</div>-->
              <!--<div class="relevantLinks" id="relevantLinks3" style="width: 32%;float: left">-->

              <!--</div>-->
            </div>
            <div class="col-side topcom-bord" style="margin-right: 3.5%;">
              <div class="com-tit-hea comm-heabg">
                <span class="yellow-sign com-span"></span>
                <span class="com-tit com-span">时间段故障报修TOP10</span>
              </div>
              <div class="list-div">
                <div class="list-div-title"><span>时间</span><span>次数</span></div>
                <div class="list-content">
                  <div id="scroll1" class="scroll-swiper">
                    <div class="swiper-container repairOfTime">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(list,listindex) in repairOfTime">
                          <div class="list-item" v-for="(item,index) in list">
                            <span class="blue-ball">{{listindex * 5 + index + 1}}</span>
                            <span>{{item.name}}</span>
                            <span>{{item.total}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-side topcom-bord">
              <div class="com-tit-hea comm-heabg">
                <span class="yellow-sign com-span"></span>
                <span class="com-tit com-span">区域故障报修TOP10</span>
              </div>
              <div class="list-div">
                <div class="list-div-title"><span>区域</span><span>次数</span></div>
                <div class="list-content">
                  <div id="scroll2" class="scroll-swiper" style="overflow: hidden">
                    <div class="swiper-container repairOfArea">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(list,listindex) in repairOfArea">
                          <div class="list-item" v-for="(item,index) in list">
                            <span class="blue-ball">{{listindex * 5 + index + 1}}</span>
                            <span>{{item.name}}</span>
                            <span>{{item.total}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-side topcom-bord">
              <div class="com-tit-hea comm-heabg">
                <span class="yellow-sign com-span"></span>
                <span class="com-tit com-span">系统类型故障报修TOP10</span>
              </div>
              <div class="list-div">
                <div class="list-div-title"><span>系统</span><span>次数</span></div>
                <div class="list-content">
                  <div id="scroll3" class="scroll-swiper" style="overflow: hidden">
                    <div class="swiper-container repairOfType">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(list,listindex) in repairOfType">
                          <div class="list-item" v-for="(item,index) in list">
                            <span class="blue-ball">{{listindex * 5 + index + 1}}</span>
                            <span>{{item.name}}</span>
                            <span>{{item.total}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="botlf-icon comm-boricon"></div>
      <div class="botlr-icon comm-boricon"></div>
      <!--<div class="bottombord"></div>-->
    </div>

  </div>
</template>

<script>
  import echarts from "echarts";
  import comm from "./Common.vue";
  import Swiper from "swiper";
  import DateTool from "../../static/js/DateUtils.js";
  import * as d3 from "d3";
  import {OperationMain} from '../API/operationMaintenance'

  var el;
  export default {
    name: "Echarts",
    created() {
      document.title = "综合运维报修大数据分析大屏";
    },
    data() {
      return {
        date: "",
        disposeDate: "",
        distributeList: [],
        spaceNum: 0,
        spaceNumHour: 0,
        plant: "",

        svg: null,
        circleData: [],
        repairOfTime: [],
        repairOfArea: [],
        repairOfType: [],
        linkArray: [],
        linkSwiper: [],
        maintainSwiper1: '',
        maintainSwiper2: '',
        maintainSwiper3: '',
        linksSwiper: '',
        linksArray: [],
        time: 1
      };
    },
    mounted() {
      const self = this;
      this.timer = setInterval(function () {
        self.date = new Date(); //修改数据date
        self.disposeDate = comm.dateFormat(self.date);
      }, 1000);

      if (this.pageTimes) {
        clearInterval(this.pageTimes);
      } else {
        this.pageTimes = setInterval(() => {

        }, 180000);
      }
      window.addEventListener("resize", function () {
        self.$nextTick(function () {
//          self.links1.resize()
//          self.links2.resize()
//          self.links3.resize()
          self.updateWindow()
        });
      })


      self.initEchartData()

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); //在vue实例销毁钱，清除我们的定时器
      }
    },
    destroyed() {
      if (this.maintainSwiper1) {
        this.maintainSwiper1.destroy(false)
      }
      if (this.maintainSwiper2) {
        this.maintainSwiper2.destroy(false)
      }
      if (this.maintainSwiper3) {
        this.maintainSwiper3.destroy(false)
      }
      clearInterval(this.pageTimes);
    },
    created() {
      el = this;
      let self = this;

    },
    methods: {
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      initEchartData: function () {
        let self = this;
        $('canvas').css('z-index', '100')
        self.RepairOftime()
        self.RepairOfType()
        self.RepairOfArea()
        self.errorTerminall()
        self.getLinks();
//        setTimeout(function () {
//          self.initEchartData()
//        }, 1000 * 60 * self.time)
      },

      async getLinks() {
        let self = this;
        await OperationMain.getLinks().then(function (result) {
          if (result.status === 200) {
            self.linkArray = result.data;
            if (self.linksSwiper) {
              self.linksSwiper.destroy(false);
            }
            for (let j in self.linksArray) {
              self.destroyEcharts(self.linksArray[j])
            }
            self.handleLinks(result.data)
            self.$nextTick(function () {
              self.linksSwiper = new Swiper('.links', {
//                  direction: 'vertical',
                autoplay: {
                  delay: 20000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false,
                },
//                  autoplay:false,
                speed: 3000,
                loop: false,
                pagination: {
                  el: '.swiper-pagination',
                  clickable :true,
                },
              });
              self.linksSwiper.detachEvents();
              let links = $('.relevantLinks')
              self.linksArray = []
//              self.linksArray.push(echarts.init(links[0]))
//              setRelevantLinks(echarts.init(links[0]), self.linkArray[12], self.getAllCount(self.linkArray[12]))
              for (let i in self.linkArray) {
                self.linksArray.push(echarts.init(links[i]))
                setRelevantLinks(echarts.init(links[i]), self.linkArray[i], self.getAllCount(self.linkArray[i]))
              }

            });
          } else {
          }
        })

      },


//      获得节点数
      getAllCount(arr) {
        let Arr = []
        Arr.push(arr.area)
        for (let j in arr.systems) {
          Arr.push(arr.systems[j].systemName)
          if (arr.systems[j].problems.length > 0) {
            for (let n in arr.systems[j].problems) {
              Arr.push(arr.systems[j].problems[n].problem)
            }
          }
        }
        return Arr.length
      },

      //      销毁echarts
      destroyEcharts(mapName) {
        if (mapName || mapName !== null) {
          mapName.clear(false)
          mapName.dispose(false)
        }
      },

//      处理关系链图数组分组
      handleLinks(data) {
        let self = this;
        let temp = [];
        let len = Math.ceil(data.length / 3);
        for (let i = 0; i < len; i++) {
          let arr = [];
          let acLen = ((i + 1) * 3) >= data.length ? data.length : (i + 1) * 3;
          for (let k = (i * 3); k < acLen; k++) {
            arr.push(data[k])
          }
          temp.push(arr);
        }
        self.linkSwiper = temp;
      },

      handleRepair(data, flag) {
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

        switch (flag) {
          case 'repairOfArea':
            self.repairOfArea = []
            self.repairOfArea = temp;
            break;
          case 'repairOfType':
            self.repairOfType = []
            self.repairOfType = temp;
            break;
          case 'repairOfTime':
            self.repairOfTime = [];
            self.repairOfTime = temp;
            break;
        }
        if(len==1){
          return;
        }
        switch (flag) {
          case 'repairOfArea':
            self.$nextTick(function () {
              self.maintainSwiper1 = new Swiper('.repairOfArea', {
                direction: 'vertical',
                speed: 2000,
                loop: true,
                autoplay: {
                  delay: 7000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
              });
              self.maintainSwiper1.detachEvents();
            });
            break;
          case 'repairOfType':
            self.$nextTick(function () {
              self.maintainSwiper2 = new Swiper('.repairOfType', {
                direction: 'vertical',
                autoplay: {
                  delay: 7000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
                speed: 2000,
                loop: true
              });
              self.maintainSwiper2.detachEvents();
            });
            break;
          case 'repairOfTime':
            self.$nextTick(function () {
              self.maintainSwiper3 = new Swiper('.repairOfTime', {
                direction: 'vertical',
                autoplay: {
                  delay: 7000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
                speed: 2000,
                loop: true
              });
              self.maintainSwiper3.detachEvents();
            });
            break;
        }



        document.onvisibilitychange = function () {
          if (document.visibilityState == "visible") {
            self.RepairOftime()
            self.RepairOfType()
            self.RepairOfArea()
          } else {
            if (self.maintainSwiper1) {
              self.maintainSwiper1.destroy(false);
            }
            if (self.maintainSwiper2) {
              self.maintainSwiper2.destroy(false);
            }
            if (self.maintainSwiper3) {
              self.maintainSwiper3.destroy(false);
            }
          }
        }

      },

      //      时间段报修TOP10
      async RepairOftime() {
        let self = this;
        await OperationMain.RepairOftime().then(function (result) {
          if (result.status === 200) {
            if (self.maintainSwiper3) {
              self.maintainSwiper3.destroy(false);
            }
            self.handleRepair(result.data, 'repairOfTime')

//              self.$nextTick(function(){
//                $("#scroll1").Scroll({
//                  line: 5,
//                  speed: 500,
//                  timer: 3000,
//                });
//              })
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })

      },


      //      区域报修TOP10
      async RepairOfArea() {
        let self = this;
        await OperationMain.RepairOfArea().then(function (result) {
          if (result.status === 200) {
            if (self.maintainSwiper1) {
              self.maintainSwiper1.destroy(false);
            }
            self.handleRepair(result.data, 'repairOfArea')

//              self.$nextTick(function(){
//                $("#scroll2").Scroll({
//                  line: 5,
//                  speed: 500,
//                  timer: 3000,
//                });
//              })
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })

      },



      //      类型报修TOP10
      async RepairOfType() {
        let self = this;
        await OperationMain.RepairOfType().then(function (result) {
          if (result.status === 200) {
//              self.repairOfType = result.data;
            if (self.maintainSwiper2) {
              self.maintainSwiper2.destroy(false);
            }
            self.handleRepair(result.data, 'repairOfType')

//              self.$nextTick(function(){
//                $("#scroll3").Scroll({
//                  line: 5,
//                  speed: 500,
//                  timer: 3000,
//                });
//              })
          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })

      },


      //航站楼故障报修热门区域及平均报修时长
      async errorTerminall() {
        let self = this;
        await OperationMain.errorTerminall().then(function (result) {
          if (result.status === 200) {
            let arr = [];
            for (let i = 0; i < result.data.length; i++) {
              arr.push({
                name: result.data[i].area,
                count: result.data[i].detail.total,
                time: Math.round(result.data[i].detail.avg / 60)
              })
            }
            self.circleData = arr;
            self.updateWindow()
//              self.initCircle(self.circleData)


          } else {
            self.$message({
              type: "error",
              message: result.msg
            });
          }
        })

      },


      //      接口调用总量
      numUp: function () {
        let counter = $('.content')
        let counterArr = counter.find('.num-up')
        let num = "";
        for (let j = 0; j < counterArr.length; j++) {
//          console.log(counterArr[j].innerText)
          countUp(counterArr[j].innerText, counterArr[j])
        }
      },

      updateWindow: function () {
        let size = 1;
        if (window.screen.width < 1024) {
          size = 0.8
        } else if (window.screen.width < 1366) {
          size = 0.9
        } else if (window.screen.width < 1680) {
          size = 0.95
        } else if (window.screen.width < 1920) {
          size = 1
        }
        this.initCircle(this.circleData, size)
      },


      initCircle: function (data, size) {
        d3.select("svg").selectAll("g").remove();//清空作图区域
        this.svg = d3.select("svg");
//        this.svg.attr("width",'100%');
//        this.svg.attr("height",'800px');
//        console.log($('.circle-area').width())
//        console.log($('.circle-area'))
        var width = $('.circle-area').width(),
          height = $('.circle-area').height();
        var format = d3.format(",d");

//       var color = d3.scaleOrdinal(d3.schemeCategory20c);
        var color = ["rgb(0, 129, 255)"];//自定义颜色
        var pack = d3.pack()
          .size([width, height])
          .padding(40)
//          .radius(20);
        var num, pid;
        var root = d3.hierarchy({children: data})
          .sum(function (d) {
            return d.count;
          })
          .each(function (d) {
            if (d.parent == null) {
              num = d.value
            }
            ;
            if (id = d.data.name) {
              var id
              d.id = id;
              d.class = id;
              pid = num / (d.value);
              d.colorPick = pid > 100 ? 5 : (pid > 50 ? 4 : (pid > 10 ? 3 : (pid > 2 ? 2 : 1)));
            }
          });
        var node = this.svg.selectAll(".node")
          .data(pack(root).leaves())
          .enter().append("g")
          .attr("class", "node")
          .classed("svg-container", true)
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0")
          //class to make it responsive
          .classed("svg-content-responsive", true)
          //          .attr("preserveAspectRatio", "xMidYMid meet")
          //          .attr("viewBox", "0 0 400 400")
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.append("circle")
          .attr("id", function (d) {
            return d.id;
          })
          .attr("r", function (d) {
            if (d.r < 25) {
              return (d.r + 10) * size;
            } else {
              return (d.r) * size;
            }
//            return d.r;
          })
          .style("fill", function (d) {
            return color[0];
          });

        node.append("clipPath")
          .attr("id", function (d) {
            return "clip-" + d.id;
          })
          .append("use")
          .attr("xlink:href", function (d) {
            return "#" + d.id;
          });

        node.append("text")
          .style("fill", function (d) {
            return '#fff';
          })
          .attr("font-size", function (d) {
            if (d.r < 10) {
              return '0.7rem'
            } else if (d.r < 20) {
              return '0.7rem'
            } else if (d.r < 30) {
              return '0.7rem'
            } else if (d.r < 50) {
              return '0.8rem'
            } else if (d.r < 100) {
              return '1rem'
            }

          })
          .attr("clip-path", function (d) {
            return "url(#clip-" + d.id + ")";
          })
          .selectAll("tspan")
          .data(function (d) {
            var arr = new Array();
            arr.push(d.class);
            arr.push(d.data.time + 'h');
            return arr;//圆内显示内容
          })
          .enter().append("tspan")
          .attr("x", 0)
          .attr("y", function (d, i, nodes) {
//            console.log(nodes)

            if (i == 0) {
              return 25 + (i - nodes.length / 2 - 0.5) * 20;
            } else {
              return 20 + (i - nodes.length / 2 - 0.5) * 20;
            }


          })
          .text(function (d) {
            return d;
          });

        node.append("title")
          .text(function (d) {
            return d.id + "\n" + format(d.value);
          });
        node.on("click", function (d) {
          //clickBubble(d.id);//自定义点击事件
        })

//        d3.select(window).on('resize.updatesvg', this.updateWindow(this.svg));
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

  // 关系图绘制
  function setRelevantLinks(ele, arr, length) {
    let arry = [];
    let linksArr = [];
    let problemArr = [];
    let per;
    let screenPer = 1;
    if (length < 5) {
      per = 1.3;
    } else if (length < 7) {
      per = 1
    } else if (length < 10) {
      per = 0.8
    } else if (length < 20) {
      per = 0.6
    } else if (length < 30) {
      per = 0.5
    } else if (length < 40) {
      per = 0.4
    } else if (length < 50) {
      per = 0.35
    } else if (length < 50) {
      per = 0.35
    } else if (length < 100) {
      per = 0.2
    } else if (length < 150) {
      per = 0.2
    } else {
      per = 0.15
    }

    if (document.body.offsetWidth < 1366) {
      screenPer = 0.5
    } else if (document.body.offsetWidth < 1440) {
      screenPer = 0.7
    } else if (document.body.offsetWidth < 1680) {
      screenPer = 0.8
    } else if (document.body.offsetWidth < 1920) {
      screenPer = 0.9
    }

    // 第一层数据
    arry.push({
      rank: 'one',
      name: arr.area,
      focusNodeAdjacency: true,
      symbolSize: [50 * per * screenPer, 50 * per * screenPer],
      draggable: "false",
      itemStyle: {
        color: "#00b9ff"
      },
      label: {
        color: '#ffffff',
      }
    });
    // 第二层数据
    for (let j in arr.systems) {
      if (arr.systems[j].systemName !== null) {
        // console.log(arr.systems[j].problems)
        problemArr = arr.systems[j].problems;
        arry.push({
          rank: 'two',
          problemArr: problemArr,
          focusNodeAdjacency: true,
          name: arr.systems[j].systemName + '  数值：' + arr.systems[j].problems.length,
          symbolSize: [40 * per * screenPer, 40 * per * screenPer],
          draggable: "false",
          itemStyle: {
            color: "#3ce79c"
          },
          label: {
            // color: '#adadad'
            color: 'red',
            position: 'top',
          }
        });
        linksArr.push({
          rank: 'one',
          source: arr.systems[j].systemName + '  数值：' + arr.systems[j].problems.length,
          target: arr.systems[j].area,
        })
      }

    }
    // 第三层数据
    // for (let m in arr.systems) {
    //   for (let n in arr.systems[m].problems) {
    //     arry.push({
    //       name: arr.systems[m].problems[n].problem,
    //       symbolSize: [30 * per * screenPer, 30 * per * screenPer],
    //       draggable: "false",
    //       itemStyle: {
    //         color: "red"
    //       },
    //       label: {
    //         color: '#adadad'
    //       }
    //     })
    //     linksArr.push({
    //       source: arr.systems[m].problems[n].problem,
    //       target: arr.systems[m].systemName,
    //     })
    //   }
    // }
    let option = {
      title: {
        show: false,
        top: "top",
        left: "center"
      },
      tooltip: {
        // show: false,
        confine: true,
        position: function (point, params, dom, rect, size) {
          // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置
        
          // 当前鼠标位置
          var pointX = point[0];
          var pointY = point[1];
        
          // 外层div大小
          // var viewWidth = size.viewSize[0];
          // var viewHeight = size.viewSize[1];
        
          // 提示框大小
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];
        
          // boxWidth > pointX 说明鼠标左边放不下提示框
          if (boxWidth > pointX) {
            x = 5;
          } else { // 左边放的下
            x = pointX - boxWidth;
          }
        
          // boxHeight > pointY 说明鼠标上边放不下提示框
          if (boxHeight > pointY) {
            y = 5;
          } else { // 上边放得下
            y = pointY - boxHeight;
          }
        
          return [x, y];
        },
        formatter : function(params){
          if(params.data.rank === 'one'){

          }else{
            // console.log(params)
            if(params.data.problemArr.length > 20){
              let result = '';
              result += '<ul style="overflow: hidden;width: 100%;min-height: 300px;">'
              for(let i=0; i<params.data.problemArr.length; i++){
                result += '<li style="float: left;width: 50%;">'
                result += params.data.problemArr[i].problem
                result += '</li>'
              }
              result += '</ul>'
              return result;
            }else{
              let result = '';
              result += '<ul style="">'
              for(let i=0; i<params.data.problemArr.length; i++){
                result += '<li>'
                result += params.data.problemArr[i].problem
                result += '</li>'
              }
              result += '</ul>'
              return result;
            }
          }
          
        }

      },
      toolbox: {
        show: false,
      },
      grid: {
        top: 0,
        left: 0
      },
      roam: false,
      nodeScaleRatio: false,
      focusNodeAdjacency: true,
      animationDuration: 1000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 300 * per * screenPer,
          edgeLength: 70 * per * screenPer,
          initLayout: 'circular'
        },
        width: '100%',
        height: '100%',
        data: uniqueArray(arry, 'name'),
        links: linksArr,
        scaling: 0.2,
        left: 5,
        top: 5,
        center: ['50%', '50%'],
        label: {
          normal: {
            show: true,
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0,
            type: "solid"
          }
        }
      }]
    };
    ele.setOption(option, true);
  }

  //  热门区域情况
  function setHotArea(ele) {
    var plantCap = [{
      name: 'T2进港大厅',
      value: '1.2'
    }, {
      name: 'DE连廊',
      value: '2'
    }, {
      name: 'D连廊',
      value: '3'
    }, {
      name: 'T2出港大厅',
      value: '1.5'
    }, {
      name: 'A指廊',
      value: '4.8'
    }, {
      name: 'B指廊',
      value: '7.9'
    }, {
      name: 'C指廊',
      value: '1.8'
    }, {
      name: 'T1出港时间',
      value: '5.3'
    }];
    var datalist = [{
      offset: [30, 40],
      symbolSize: 200,
      fontSize: 10
    }, {
      offset: [60, 60],
      symbolSize: 95,
      fontSize: 14

    }, {
      offset: [20, 70],
      symbolSize: 90,
      fontSize: 14
    }, {
      offset: [83, 80],
      symbolSize: 90,
      fontSize: 14
    }, {
      offset: [36, 60],
      symbolSize: 85,
      fontSize: 14
    }, {
      offset: [64, 50],
      symbolSize: 100,
      fontSize: 14
    }, {
      offset: [75, 75],
      symbolSize: 80,
      fontSize: 14
    }, {
      offset: [88, 62],
      symbolSize: 90,
      fontSize: 14
    }];
    let datas = [];
    for (let i = 0; i < plantCap.length; i++) {
      let item = plantCap[i];
      let itemToStyle = datalist[i];
      datas.push({
        name: item.name + '\n' + item.value + 'h',
        value: itemToStyle.offset,
        symbolSize: itemToStyle.symbolSize,
        label: {
          show: true,
          fontSize: itemToStyle.fontSize,
          normal: {
            textStyle: {
//              fontSize: 11
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#00acea',
            opacity: 0.9

          }
        },
      })
    }
    let option = {
      grid: {
        show: false,
        top: 10,
        bottom: 10
      },
      xAxis: [{
        gridIndex: 0,
        type: 'value',
        show: false,
        min: 0,
        max: 100,
        nameLocation: 'middle',
        nameGap: 5
      }],
      yAxis: [{
        gridIndex: 0,
        min: 0,
        show: false,
        max: 100,
        nameLocation: 'middle',
        nameGap: 30
      }],
      series: [{
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 120,
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            color: '#fff',
            textStyle: {
              fontSize: '16'
            }
          },
        },
        itemStyle: {
          normal: {
            color: '#00acea'
          }
        },
//        data:[]
        data: datas
      }]
    };
    ele.setOption(option, true);
  }

  //  去重
  function uniqueArray(array, key) {
    let result = [array[0]];
    for (let i = 1; i < array.length; i++) {
      let item = array[i];
      let repeat = false;
      for (let j = 0; j < result.length; j++) {
        if (item[key] == result[j][key]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        result.push(item);
      }
    }
    return result;
  }

  //  数字增长
  function countUp(count, object) {
    var div_by;
    if (count > 100) {
      div_by = 15;
    } else {
      div_by = 2;
    }

    var speed = Math.round(count / div_by),
      $display = $(object),
      run_count = 1,
      int_speed = 20;
    var int = setInterval(function () {
      if (run_count < div_by) {
        $display.text(speed * run_count);
        run_count++;
      } else if (parseInt($display.text()) < count) {
        var curr_count = parseInt($display.text()) + 1;
        $display.text(curr_count);
      } else if (parseInt($display.text()) == count) {
        $display.text(count);
        clearInterval(int);
      }
    }, int_speed);
  }

  //  console.log(p.circleArray)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../static/font/font.css";

  body {
    font-size: 16px;
  }

  .lucky-circle {
    border-radius: 50%;
    position: absolute;
  }

  .svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* aspect ratio */
    vertical-align: top;
    overflow: hidden;
  }

  .svg-content-responsive {
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 0;
  }

  g:hover {
    opacity: 0.8;
  }

  .body-bg {
    width: 99%;
    height: 1042px;
    // height: 100%;
    padding: 1% 0.5%;
    background: url("../../static/img/vipbg.jpg");
    background-color: #02020b;
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
    height: 88px;
    .hea-cont {
      width: 100%;
      // overflow: hidden;

      .comm-heagif {
        /*float: left;*/
        display: inline-block;
        width: 27%;
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
        display: inline-block;
        position: relative;
        padding: 0 2%;
        /*float: left;*/
        z-index: 99;
        .heacont-titbg {
          width: 100%;
          height: 80px;
          line-height: 80px;
          border-radius: 0 0 9px 9px;
          /*background: rgba(0, 0, 0, 0.7);*/
          position: absolute;
          left: 0;
          top: -18px;
          z-index: -1;
        }
        .com-borgif {
          display: inline-block;
          width: 100px;
          height: 80px;
          position: absolute;
        }
        .heatit-lf {
          background: url("../../static/img/top_lf.gif") no-repeat;
          background-position: 100% 100%;
          background-size: 100% 100%;
          left: -35px;
          top: -9px;
        }
        h2 {
          color: #ffffff;
          // font-size: 30px;
          font-size: 2.3rem;
          /*font-family: chinese;*/
          font-weight: bold;

          /*background-image: -webkit-gradient(*/
          /*linear,*/
          /*0 0,*/
          /*0 bottom,*/
          /*from(#deeff7),*/
          /*to(#8bdaee)*/
          /*);*/
          /*-webkit-background-clip: text;*/
          /*-webkit-text-fill-color: transparent;*/
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

  .content {
    clear: both;
    width: 96%;
    padding: 0 2%;
    position: relative;
    .comm-boricon {
      position: absolute;
      z-index: 0;
    }
    /*.toplf-icon {*/
    /*width: 504px;*/
    /*height: 304px;*/
    /*left: -150px;*/
    /*top: -69px;*/
    /*background: url("../../static/img/viplf-top.gif") no-repeat;*/
    /*background-size: 100%;*/
    /*background-position: left top;*/
    /*}*/
    /*.toplr-icon {*/
    /*width: 296px;*/
    /*height: 296px;*/
    /*right: -13px;*/
    /*top: -69px;*/
    /*background: url("../../static/img/viplr-top.gif") no-repeat;*/
    /*background-size: 100%;*/
    /*background-position: right bottom;*/
    /*transform: rotate(-90deg);*/
    /*}*/
    /*.botlf-icon {*/
    /*width: 504px;*/
    /*height: 304px;*/
    /*left: -162px;*/
    /*bottom: -70px;*/
    /*background: url("../../static/img/viplf-bot.gif") no-repeat;*/
    /*background-size: 100%;*/
    /*background-position: left bottom;*/
    /*}*/
    /*.botlr-icon {*/
    /*width: 296px;*/
    /*height: 296px;*/
    /*right: -20px;*/
    /*bottom: -69px;*/
    /*background: url("../../static/img/viplr-bot.gif") no-repeat;*/
    /*background-size: 100%;*/
    /*background-position: right top;*/
    /*transform: rotate(90deg);*/
    /*}*/
    .num-content {
      color: #fff;
      padding-left: 30px;
      .num {
        font-size: 40px;
        font-family: HighlandGothicFLF;
        letter-spacing: 8px;
        color: rgb(73, 245, 251);
      }
      .text {
        color: #c1c1c1;
        font-size: 22px;

      }
    }
    .content-title {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      padding-top: 20%;
      padding-bottom: 3%;
    }
    .comm-heabg {
      overflow: hidden;
      padding: 0 2%;
      background: url("../../static/img/com-block-top.bg.png") no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
    }
    .com-tit-hea {
      overflow: hidden;
      /*width: 95%;*/
      padding: 10px 20px;
      .right-gif {
        margin-left: 1.5%;
        width: 47%;
        height: 40px;
        line-height: 40px;
        background: url("../../static/img/late_passage_anima.gif") no-repeat;
        background-size: 100% 100%;
        background-position: 100% 100%;
      }
      .bedeck-gif {
        margin-left: 1.5%;
        width: 47%;
        height: 40px;
        line-height: 40px;
        background: url("../../static/img/late_passage_anima.gif") no-repeat;
        background-size: 100% 100%;
        background-position: 100% 100%;
      }
      .com-span {
        float: left;
        display: inline-block;
      }
      .yellow-sign {
        width: 8px;
        height: 30px;
        margin-right: 10px;
        background: rgb(255, 241, 184);
        margin-top: 7px;
      }
      .com-tit {
        color: #fff;
        // font-size: 24px;
        font-size: 2rem;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
      }
    }
    .topcom-bord {
      // width: 1252px;
      // width: 78.3%;
      background: rgba(0, 0, 0, 0.4);
      min-height: 365px;
      .table-container {
        padding: 20px;
      }
      .table {
        color: #fff;
        font-size: 1.9rem;
        width: 100%;
        table-layout: fixed;
      }
      .table thead {
        background-color: rgba(73, 245, 251, 0.15);

      }
      .table tbody tr:first-child {
        color: rgb(193, 193, 193);
      }
      .table td {
        text-align: center;
        padding: 5px;
      }
      .table .td-content > td:not(:first-child) {
        font-family: HighlandGothicFLF;
        letter-spacing: 5px;
        color: rgb(73, 245, 251);
      }
    }
    .contain {
      position: relative;
      width: 100%;
      .cont-top {
        overflow: hidden;
        white-space: nowrap;
        .lf-block {
          width: 30%;
          float: left;
        }
        .center-block {
          width: 66%;
          margin: 0 1%;
          float: right;
          .relevantLinks{
            float: left;
          }
          .links-icon {
            position: absolute;
            right: 20px;
            margin-top: 8px;
            .links-icon-item {
              display: inline-block;
              margin-right: 10px;
              .icon-item {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 5px;
                position: relative;
                display: inline-block;
              }
              .icon-red {
                background-color: red;
              }
              .icon-green {
                background-color: #3ce79c;
              }
              .icon-blue {
                background-color: #00b9ff;
              }
              .icon-text {
                vertical-align: top;
              }
            }
          }
          .col-side:last-child {
            float: right;
          }
          .col-side {
            width: 31%;
            float: left;
            min-height: 355px;
            .list-div {
              padding: 20px 15px 25px 15px;
              .list-div-title {
                background-color: rgb(0, 186, 255);
                color: #fff;
                height: 60px;
                line-height: 60px;
                span:first-child {
                  /*padding: 20px 0;*/
                  display: inline-block;
                  width: 80%;
                  text-align: center;
                }
                span:last-child {
                  /*padding: 20px 0;*/
                  display: inline-block;
                  width: 20%;
                  text-align: left;
                }
              }
              .list-content {
                overflow: hidden;
                height: 305px;
                .scroll-swiper {
                  height: 305px;
                }
                .blue-ball {
                  background-color: rgb(0, 186, 255);
                  width: 17px;
                  height: 17px;
                  border-radius: 50%;
                  color: #fff;
                  display: inline-block;
                  line-height: 17px;
                  text-align: center;
                }
                div > div.list-item {
                  padding: 21px 0 21px 10px;
                  span:first-child {
                    /*width:20%;*/
                    display: inline-block;
                  }
                  span:nth-child(2) {
                    width: 70%;
                    color: #a9a9a9;
                    display: inline-block;
                    text-align: center;
                  }
                  span:last-child {
                    width: 20%;
                    color: #a9a9a9;
                    display: inline-block;
                    text-align: left;
                  }

                }
                div:nth-child(odd) {
                  background-color: rgb(10, 39, 50);
                }
                div:nth-child(even) {
                  background-color: rgb(0, 59, 81);
                }
              }
            }
          }
        }

      }
      .bot-insidebord {
        margin-top: 2%;
        .topcom-bord {
          min-height: 370px;
        }
      }
      .cont-bot {
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
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.2rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 0.7rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 0.7rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }
    .relevantLinks {
      /*height: 269px;*/
      width:33%;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -130px;
      top: -41px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -16px;
      top: -41px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -127px;
      bottom: -47px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -16px;
      bottom: -47px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }

    .head {
      height: 50px;
    }

    .circle-area {
      height: 616px;
    }

    .body-bg {
      height: 1024px;
    }

    .content .topcom-bord {
      min-height: 337px;
    }

    .relevantLinks {
      height: 303px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-div-title {
      height: 30px;
      line-height: 30px;
      font-size: 11px;
    }

    .content .contain .cont-top .center-block .col-side .list-div {
      padding: 8px 10px 10px 8px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content {
      height: 185px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content .scroll-swiper {
      height: 185px;
      overflow: hidden
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content div > div.list-item {
      padding: 10px 0 10px 10px;
      font-size: 11px;
    }

    .content .contain .cont-top .center-block .col-side {
      min-height: 293px;
    }

    .content .com-tit-hea .yellow-sign {
      width: 5px;
      height: 18px;
      margin-right: 10px;
      background: #fff1b8;
      margin-top: 12px
    }

    .content .com-tit-hea {
      padding: 1px 20px;
      overflow: hidden;
    }

  }

  @media screen and (min-width: 1280px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.6rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 0.9rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 0.9rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }
    .relevantLinks {
      /*height: 269px;*/
      width:33%;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -118px;
      top: -63px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -13px;
      top: -63px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -120px;
      bottom: -70px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -69px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }
  }

  @media screen and (min-width: 1366px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.6rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 1rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -118px;
      top: -44px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -13px;
      top: -44px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -120px;
      bottom: -39px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -39px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }

    .head {
      height: 59px;
    }

    .circle-area {
      height: 600px;
    }

    .body-bg {
      height: 768px;
    }

    .content .topcom-bord {
      min-height: 280px;
    }

    .relevantLinks {
      height: 269px;
      width:33%;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-div-title {
      height: 40px;
      line-height: 40px;
    }

    .content .contain .cont-top .center-block .col-side .list-div {
      padding: 10px 15px 15px 15px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content {
      height: 195px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content .scroll-swiper {
      height: 195px;
      overflow: hidden
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content div > div.list-item {
      padding: 11px 0 11px 10px;
    }

    .content .com-tit-hea .yellow-sign {
      width: 5px;
      height: 18px;
      margin-right: 10px;
      background: #fff1b8;
      margin-top: 12px
    }

    .content .com-tit-hea {
      padding: 5px 20px;
      overflow: hidden;
    }

  }

  @media screen and (min-width: 1400px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.6rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 1rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }
    .relevantLinks {
      /*height: 484px;*/
      width:33%;
    }
    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -118px;
      top: -63px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -13px;
      top: -63px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -120px;
      bottom: -70px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -69px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }

  }

  @media screen and (min-width: 1440px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 1.6rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 1rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }
    .relevantLinks {
      /*height: 484px;*/
      width:33%;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -118px;
      top: -63px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -13px;
      top: -63px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -120px;
      bottom: -70px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -69px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }

  }

  @media screen and (min-width: 1680px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 2rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.3rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 1.3rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 30%;
      margin-left: 1%
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
    }

    .toplf-icon {
      width: 400px;
      height: 304px;
      left: -118px;
      top: -49px;
      background: url("../../static/img/viplf-top.gif") no-repeat;
      background-size: 100%;
      background-position: left top;
    }

    .toplr-icon {
      width: 296px;
      height: 296px;
      right: -13px;
      top: -49px;
      background: url("../../static/img/viplr-top.gif") no-repeat;
      background-size: 75%;
      background-position: right bottom;
      transform: rotate(-90deg);
    }

    .botlf-icon {
      width: 400px;
      height: 304px;
      left: -120px;
      bottom: -48px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -48px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 75%;
      background-position: right top;
      transform: rotate(90deg);
    }

    .head {
      height: 70px;
    }

    .circle-area {
      height: 850px;
    }

    .body-bg {
      height: 1050px;
    }

    .content .topcom-bord {
      min-height: 484px;
    }

    .relevantLinks {
      height: 484px;
      width:33%;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-div-title {
      height: 45px;
      line-height: 45px;
      font-size: 14px;
    }

    .content .contain .cont-top .center-block .col-side .list-div {
      padding: 8px 10px 10px 8px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content {
      height: 232px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content .scroll-swiper {
      height: 232px;
      overflow: hidden
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content div > div.list-item {
      padding: 14px 0 14px 10px;
      font-size: 14px;
    }

    .content .com-tit-hea .yellow-sign {
      width: 5px;
      height: 18px;
      margin-right: 10px;
      background: #fff1b8;
      margin-top: 12px
    }

    .content .com-tit-hea {
      padding: 5px 20px;
      overflow: hidden;
    }

  }

  @media screen and (min-width: 1920px) {
    .head .hea-cont .heacont-tit h2 {
      font-size: 2.3rem;
    }

    .content .com-tit-hea .com-tit {
      font-size: 1.5rem;
      color: rgb(139, 239, 255)
    }

    .content .content-title {
      font-size: 1.5rem;
    }

    .content .contain .cont-top .center-block {
      width: 66%;
      float: right;
    }

    .content .com-tit-hea .right-gif {
      width: 41%;
    }

    .content .com-tit-hea .bedeck-gif {
      width: 47%;
    }

    .content .contain .cont-top .lf-block {
      width: 31%;
      margin-left: 1%;
    }

    .content .num-content .num {
      font-size: 40px;
    }

    .head .hea-cont .heacont-tit .com-borgif {
      height: 80px;
    }

    .content .topcom-bord .table {
      font-size: 1.9rem;
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
      bottom: -70px;
      background: url("../../static/img/viplf-bot.gif") no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }

    .botlr-icon {
      width: 296px;
      height: 296px;
      right: -20px;
      bottom: -69px;
      background: url("../../static/img/viplr-bot.gif") no-repeat;
      background-size: 100%;
      background-position: right top;
      transform: rotate(90deg);
    }

    .head {
      height: 88px;
    }

    .circle-area {
      height: 839px;
    }

    .body-bg {
      height: 1024px;
    }

    .content .topcom-bord {
      min-height: 484px;
    }

    .relevantLinks {
      height: 473px;
      width:33%;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-div-title {
      height: 45px;
      line-height: 45px;
      font-size: 14px;
    }

    .content .contain .cont-top .center-block .col-side .list-div {
      padding: 20px 15px 25px 15px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content {
      height: 205px;
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content .scroll-swiper {
      height: 205px;
      overflow: hidden
    }

    .content .contain .cont-top .center-block .col-side .list-div .list-content div > div.list-item {
      padding: 11px 0 11px 10px;
      font-size: 14px;
    }

    .content .com-tit-hea .yellow-sign {
      width: 5px;
      height: 18px;
      margin-right: 10px;
      background: #fff1b8;
      margin-top: 12px;
      
      
    }

    .content .com-tit-hea {
      padding: 5px 20px;
      overflow: hidden;
    }

  }

</style>
