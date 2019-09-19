<template>
  <div id="userLikeness">
    <header>
      <div>
        <div class="gif gif-left" style="transform: rotate(180deg)">
          <div></div>
        </div>
        <div class="header">
          <div class="header-name"></div>
        </div>
        <div class="gif gif-right">
          <div></div>
        </div>
      </div>
    </header>
    <section>
      <div class="section-top">
        <!--进出港-->
        <div class="inward-outward">
          <div class="left-top bg-link">
            <div></div>
          </div>
          <div class="left-bottom bg-link">
            <div></div>
          </div>
          <div class="right-bottom bg-link">
            <div></div>
          </div>
          <div class="right-top bg-link">
            <div></div>
          </div>
          <!--出港-->
          <div class="outward content-flight">
            <div class="title">
              <i></i>
              <i style="background-color: rgb(61, 231, 201)"></i>
              <span style="color: rgb(61, 231, 201)">出港</span>
            </div>
            <div class="picture-logo">
              <div class="man-logo ward-logo"></div>
              <div id="outwardMap" class="picture"></div>
              <div class="woman-logo ward-logo"></div>
            </div>
          </div>
          <!--进港-->
          <div class="inward content-flight">
            <div class="title">
              <i></i>
              <i style="background-color:rgb(0, 186, 255)"></i>
              <span style="color:rgb(0, 186, 255);">进港</span>
            </div>
            <div class="picture-logo">
              <div class="man-logo ward-logo"></div>
              <div id="inwardMap" class="picture"></div>
              <div class="woman-logo ward-logo"></div>
            </div>
          </div>
        </div>
        <div class="map">
          <div id="earthMap"></div>
        </div>
        <!--服务偏好-->
        <div class="server-like">
          <div class="outward-server">
            <div class="title ">
              <div class="name" style="color: rgb(61, 231, 201)">出港贵宾服务偏好</div>
              <div class="logo"></div>
            </div>
            <div class="server-map" id="outwardServerMap"></div>
          </div>
          <div class="inward-server">
            <div class="title" style="margin-top: 40px;">
              <div class="name" style="color: rgb(0, 186, 255)">进港贵宾服务偏好</div>
              <div class="logo"></div>
            </div>
            <div class="server-map" id="inwardServerMap"></div>
          </div>
        </div>
      </div>
      <div class="section-bottom">
        <!--年龄统计-->
        <div class="black-bg age-statistics">
          <div class="block-area"></div>
          <div class="block-content">
            <div class="block-header">
              <span style="background-color: rgb(0, 186, 255)"></span><span>贵宾年龄段统计</span>
            </div>
            <div id="ageMap"></div>
          </div>
        </div>
        <!--年龄统计 end-->
        <!--贵宾飞行频次统计 -->
        <div class="black-bg fly-rate-statistics">
          <div class="block-area"></div>
          <div class="block-content">
            <div class="block-header">
              <span style="background-color: rgb(61, 231, 201)"></span><span>贵宾飞行频次统计</span>
            </div>
            <div id="flyingRateMap"></div>
          </div>
        </div>
        <!--贵宾飞行频次统计 end-->
        <!--贵宾职位分析 -->
        <div class="black-bg job-statistics">
          <div class="block-area"></div>
          <div class="block-content">
            <div class="block-header">
              <span style="background-color: rgb(255, 197, 61)"></span><span>贵宾职位分析</span>
            </div>
            <div id="jobMap">

            </div>
          </div>
        </div>
        <!--贵宾职位分析 end-->
      </div>
    </section>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import '../../../static/lib/chain1'
  import '../../../static/lib/echarts-wordcloud.min'
  import {Utils} from '../../../static/js/Utils'

  export default {
    name: 'userLikeness',
    data() {
      return {
        outwardMap: "",
        inwardMap: '',
        outwardServerMap: '',
        inwardServerMap: '',
        ageMap: '',
        flyingRateMap: '',
        earthMap: '',
        jobMap:'',
      }
    },
    methods: {
      getPie(mapName) {
        let self = this;
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          grid:{
            left:'11%',
            right:'11%',
          },
          series: [
            {
              name: '进出港',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              data: [
                {
                  value: 335,
                  name: '20%',
                  itemStyle: {
                    normal: {
                      color: 'rgb(61, 231, 201)'
                    }
                  }
                },
                {
                  value: 456,
                  name: '23%',
                  itemStyle: {
                    normal: {
                      color: 'rgb(0, 186, 255)'
                    }
                  }
                }
              ]
            }
          ]
        };
        mapName.setOption(option)
      },
      getRadarMap(mapName, colorName) {
        let self = this;
        let option = {
          grid: {
            left: '1%',
            right: '1%',
            top: '1%',
            bottom: '1%'
          },
          radar: {
            name: {
              textStyle: {
                color: '#fff',
                fontSize: '14',
                padding: [3, 5]
              }
            },
            indicator: [
              {name: '点餐服务', max: 100},
              {name: '行李托运', max: 100},
              {name: '2小时专属房间', max: 100},
              {name: '会议接待', max: 100},
              {name: '鲜花接送', max: 100},
              {name: '专车服务', max: 100},
            ],
            center: ['50%', '50%'],
            radius: 75,
            shape: 'circle',
            splitLine: {
              lineStyle: {
                color: 'rgba(192, 192, 192, 0.5)',
                type: 'dashed'
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(192, 192, 192, 0.5)'
              }
            }
          },
          series: [{
            name: '贵宾偏好服务',
            type: 'radar',
            data: [
              {
                value: [20, 20, 20, 35, 56, 78, 45],
                name: '贵宾偏好服务'
              }

            ],
            symbolSize: 0,
            lineStyle: {
              normal: {
//                color:"rgb(0, 186, 255)",
                color: colorName,
              }
            },
            areaStyle: {
              normal: {
                color: colorName,
                opacity: 0.5
              }
            }
          }]
        };
        mapName.setOption(option);
      },
      getHasShadowBarMap(category, barData) {
        let self = this;
        self.destroyEcharts(self.ageMap);
        self.ageMap = echarts.init(document.getElementById('ageMap'));
        let bgData = [];
        barData.sort(function (a, b) {
          return a - b;
        });
        if (barData) {
          for (let i = 0; i < barData.length; i++) {
            bgData.push(barData.length - 1);
          }
        }
        let option = {
          tooltip: {
            show: true,
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
            }
          },
          grid: {
            top: '0',
            left: '2%',
            right: '9%',
            bottom: '2%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            name: '单位',
            nameTextStyle: {
              color: '#868d90',
              align: 'center',
              padding: [29, 0, 0, 6]
            },
            show: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#868d90',
              fontSize: 14
            },
            axisTick: {
              show: false
            },
          },
          yAxis: [
            {
              type: 'category',
              data: category,
              splitLine: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#868d90',
                  fontSize: 14
                }
              },
              axisTick: {
                show: false
              },
              offset: 10,
              nameTextStyle: {
                fontSize: 14
              }
            },
            {
              type: 'category',
              data: category,
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              splitArea: {show: false},
              splitLine: {show: false}
            }
          ],
          series: [
            {
              name: '背景',
              type: 'bar',
              barWidth: 14,
              barGap: 10,
              yAxisIndex: 1,
              legendHoverLink: false,
              silent: true,
              //颜色需要有透明度
              itemStyle: {
                emphasis: {
                  barBorderRadius: 10
                },
                normal: {
                  barBorderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(98,98,98,.7)',
                  color: 'rgba(0, 0, 0,0.2)',
                  label: {
                    show: true,
                    color: '#555555',
                    position: 'right',
                    formatter: function (params) {
                      let num = barData[params.dataIndex];
                      return '';
                    }
                  }
                }
              },
              data: bgData
            },
            {
              name: '',
              type: 'bar',
              data: barData,
              barWidth: 14,
              barGap: 10,
              smooth: true,
              legendHoverLink: false,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 10
                },
                normal: {
                  barBorderRadius: 10,
                  color: 'rgb(0, 186, 255)',
                  label: {
                    show: false,
                    position: 'right',
                    formatter: function (params) {
                    }
                  }
                }
              }
            }
          ]
        };
        self.ageMap.setOption(option);
      },
      getPictorialBar(xData, yData) {
        let self = this;
        self.flyingRateMap = echarts.init(document.getElementById("flyingRateMap"));
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#333'
              }
            },
            formatter: '{a}: {c}'
          },
          grid: {
            left: '6%',
            right: '4%',
            top: '11%',
            bottom: '18%',
          },
          xAxis: {
            data: xData,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#6f7881',
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#868d90',
                fontWeight: 'normal',
                fontSize: '12',
              },
              interval: 0,
              rotate: -40,
              formatter: '{value}',
            },
          },
          yAxis: {
            type: 'value',
            name: '单位',
            nameTextStyle: {
              color: '#868d90',
              align: 'center'
            },
            axisLine: {
              lineStyle: {
                color: '#868d90'
              }
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: '#868d90',
              formatter: '{value}',

            },
            axisTick: {
              show: false
            },
          },
          series: [{
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              normal: {
                color: 'rgb(61, 231, 201)'
              }
            },
            symbolRepeat: true,
            symbolSize: [25, 3],
            symbolMargin: 1,
            z: -10,
            data: yData
          }]
        };

        self.flyingRateMap.setOption(option, true);
      },
      getEarthMap() {
        let self = this;
        self.earthMap = echarts.init(document.getElementById("earthMap"));
        let data = [
          {
            "name": "安徽",
            "value": 66700
          }, {
            "name": "北京",
            "value": 60365
          }, {
            "name": "福建",
            "value": 69003
          }, {
            "name": "甘肃",
            "value": 13821
          }, {
            "name": "广东",
            "value": 179419
          }, {
            "name": "广西",
            "value": 32148
          }, {
            "name": "贵州",
            "value": 23958
          }, {
            "name": "海南",
            "value": 8833
          }, {
            "name": "河北",
            "value": 68955
          }, {
            "name": "河南",
            "value": 89746
          }, {
            "name": "黑龙江",
            "value": 24985
          }, {
            "name": "湖北",
            "value": 65377
          }, {
            "name": "湖南",
            "value": 56366
          }, {
            "name": "吉林",
            "value": 20140
          }, {
            "name": "江苏",
            "value": 155869
          }, {
            "name": "江西",
            "value": 40243
          }, {
            "name": "辽宁",
            "value": 45475
          }, {
            "name": "内蒙古",
            "value": 18158
          }, {
            "name": "宁夏",
            "value": 4870
          }, {
            "name": "青海",
            "value": 2780
          }, {
            "name": "山东",
            "value": 109596
          }, {
            "name": "山西",
            "value": 33375
          }, {
            "name": "陕西",
            "value": 38842
          }, {
            "name": "上海",
            "value": 68829
          }, {
            "name": "四川",
            "value": 62467
          }, {
            "name": "天津",
            "value": 22681
          }, {
            "name": "西藏",
            "value": 962
          }, {
            "name": "新疆",
            "value": 12374
          }, {
            "name": "云南",
            "value": 31154
          }, {
            "name": "浙江",
            "value": 233131
          }, {
            "name": "重庆",
            "value": 27925
          }];
        let geoCoordMap = Utils.geoCoordMap;
        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let option = {
          visualMap: {
            show: false,
            inRange: {
              color: ['#00467F', '#A5CC82'] // 蓝绿
            }
          },
          geo: {
            map: 'china',
            show: true,
            roam: true,
            label: {
              emphasis: {
                show: false
              },
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7',
              }
            }
          },
          series: [
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function (val) {
                return val[2] / 10000;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#05C3F9'
                }
              }
            },
            {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },

            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
              }).slice(0, 5)),
              symbolSize: function (val) {
                return val[2] / 10000;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'yellow'
                }
              },
              zlevel: 1
            },
          ]
        };
        self.earthMap.setOption(option);
      },
      getMap() {
        let self = this;
        self.earthMap = echarts.init(document.getElementById("earthMap"));
        let mapData = [
          {name: '北京', value: randomData()}, {name: '天津', value: randomData()},
          {name: '上海', value: randomData()}, {name: '重庆', value: randomData()},
          {name: '河北', value: randomData()}, {name: '河南', value: randomData()},
          {name: '云南', value: randomData()}, {name: '辽宁', value: randomData()},
          {name: '黑龙江', value: randomData()}, {name: '湖南', value: randomData()},
          {name: '安徽', value: randomData()}, {name: '山东', value: randomData()},
          {name: '新疆', value: randomData()}, {name: '江苏', value: randomData()},
          {name: '浙江', value: randomData()}, {name: '江西', value: randomData()},
          {name: '湖北', value: randomData()}, {name: '广西', value: randomData()},
          {name: '甘肃', value: randomData()}, {name: '山西', value: randomData()},
          {name: '内蒙古', value: randomData()}, {name: '陕西', value: randomData()},
          {name: '吉林', value: randomData()}, {name: '福建', value: randomData()},
          {name: '贵州', value: randomData()}, {name: '广东', value: randomData()},
          {name: '青海', value: randomData()}, {name: '西藏', value: randomData()},
          {name: '四川', value: randomData()}, {name: '宁夏', value: randomData()},
          {name: '海南', value: randomData()}, {name: '台湾', value: randomData()},
          {name: '香港', value: randomData()}, {name: '澳门', value: randomData()}
        ];
        let geoCoordMap = Utils.geoCoordMap;
        let data = [
          {name: '北京', value: 19},
          {name: '西安', value: 21},
          {name: '杭州', value: 23},
          {name: '拉萨', value: 24},
          {name: '上海', value: 25},

        ];
        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        let optionMap = {
          //左侧小导航图标
          visualMap: {
            show:false,
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text: ['High','Low'],
            seriesIndex: [1],
            inRange: {
              color: ['#00508c', '#136a9c','#4e8092']
            },
            calculable : true
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.4)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          //配置属性
          series: [
            {
              name:'点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function(val) {
                return val[2];
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  show: false
                },
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#05C3F9'
                }
              },
              zlevel: 1
            },
            {
              name: 'categoryA',
              type: 'map',
              geoIndex:0,
              roam: true,
              mapType: 'china',
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: mapData  //数据
            },
          ]
        };
        self.earthMap.setOption(optionMap);
      },
      getHeatMap(){
        let self = this;
        self.earthMap = echarts.init(document.getElementById("earthMap"));
        let mapData = [
          {name: '北京', value: '100'}, {name: '天津', value: randomData()},
          {name: '上海', value: randomData()}, {name: '重庆', value: randomData()},
          {name: '河北', value: randomData()}, {name: '河南', value: randomData()},
          {name: '云南', value: randomData()}, {name: '辽宁', value: randomData()},
          {name: '黑龙江', value: randomData()}, {name: '湖南', value: randomData()},
          {name: '安徽', value: randomData()}, {name: '山东', value: randomData()},
          {name: '新疆', value: randomData()}, {name: '江苏', value: randomData()},
          {name: '浙江', value: randomData()}, {name: '江西', value: randomData()},
          {name: '湖北', value: randomData()}, {name: '广西', value: randomData()},
          {name: '甘肃', value: randomData()}, {name: '山西', value: randomData()},
          {name: '内蒙古', value: randomData()}, {name: '陕西', value: randomData()},
          {name: '吉林', value: randomData()}, {name: '福建', value: randomData()},
          {name: '贵州', value: randomData()}, {name: '广东', value: randomData()},
          {name: '青海', value: randomData()}, {name: '西藏', value: randomData()},
          {name: '四川', value: randomData()}, {name: '宁夏', value: randomData()},
          {name: '海南', value: randomData()}, {name: '台湾', value: randomData()},
          {name: '香港', value: randomData()}, {name: '澳门', value: randomData()}
        ];
        let geoCoordMap = Utils.geoCoordMap;
        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push(geoCoord.concat(data[i].value));
            }
          }
          return res;
        };
        let option = {
          visualMap: {
            show:false,
            min: 0,
            max: 500,
            splitNumber: 5,
            inRange: {
              color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: convertData([
              {name: "海门", value: 9},
              {name: "鄂尔多斯", value: 12},
              {name: "招远", value: 12},
              {name: "舟山", value: 12},
              {name: "齐齐哈尔", value: 14},
              {name: "盐城", value: 15},
              {name: "赤峰", value: 16},
              {name: "青岛", value: 18},
              {name: "乳山", value: 18},
              {name: "金昌", value: 19},
              {name: "泉州", value: 21},
              {name: "莱西", value: 21},
              {name: "日照", value: 21},
              {name: "胶南", value: 22},
              {name: "南通", value: 23},
              {name: "拉萨", value: 24},
              {name: "云浮", value: 24},
              {name: "梅州", value: 25},
              {name: "文登", value: 25},
              {name: "上海", value: 25},
              {name: "攀枝花", value: 25},
              {name: "威海", value: 25},
              {name: "承德", value: 25},
              {name: "厦门", value: 26},
              {name: "汕尾", value: 26},
              {name: "潮州", value: 26},
              {name: "丹东", value: 27},
              {name: "太仓", value: 27},
              {name: "曲靖", value: 27},
              {name: "烟台", value: 28},
              {name: "福州", value: 29},
              {name: "瓦房店", value: 30},
              {name: "即墨", value: 30},
              {name: "抚顺", value: 31},
              {name: "玉溪", value: 31},
              {name: "张家口", value: 31},
              {name: "阳泉", value: 31},
              {name: "莱州", value: 32},
              {name: "湖州", value: 32},
              {name: "汕头", value: 32},
              {name: "昆山", value: 33},
              {name: "宁波", value: 33},
              {name: "湛江", value: 33},
              {name: "揭阳", value: 34},
              {name: "荣成", value: 34},
              {name: "连云港", value: 35},
              {name: "葫芦岛", value: 35},
              {name: "常熟", value: 36},
              {name: "东莞", value: 36},
              {name: "河源", value: 36},
              {name: "淮安", value: 36},
              {name: "泰州", value: 36},
              {name: "南宁", value: 37},
              {name: "营口", value: 37},
              {name: "惠州", value: 37},
              {name: "江阴", value: 37},
              {name: "蓬莱", value: 37},
              {name: "韶关", value: 38},
              {name: "嘉峪关", value: 38},
              {name: "广州", value: 38},
              {name: "延安", value: 38},
              {name: "太原", value: 39},
              {name: "清远", value: 39},
              {name: "中山", value: 39},
              {name: "昆明", value: 39},
              {name: "寿光", value: 40},
              {name: "盘锦", value: 40},
              {name: "长治", value: 41},
              {name: "深圳", value: 41},
              {name: "珠海", value: 42},
              {name: "宿迁", value: 43},
              {name: "咸阳", value: 43},
              {name: "铜川", value: 44},
              {name: "平度", value: 44},
              {name: "佛山", value: 44},
              {name: "海口", value: 44},
              {name: "江门", value: 45},
              {name: "章丘", value: 45},
              {name: "肇庆", value: 46},
              {name: "大连", value: 47},
              {name: "临汾", value: 47},
              {name: "吴江", value: 47},
              {name: "石嘴山", value: 49},
              {name: "沈阳", value: 50},
              {name: "苏州", value: 50},
              {name: "茂名", value: 50},
              {name: "嘉兴", value: 51},
              {name: "长春", value: 51},
              {name: "胶州", value: 52},
              {name: "银川", value: 52},
              {name: "张家港", value: 52},
              {name: "三门峡", value: 53},
              {name: "锦州", value: 54},
              {name: "南昌", value: 54},
              {name: "柳州", value: 54},
              {name: "三亚", value: 54},
              {name: "自贡", value: 56},
              {name: "吉林", value: 56},
              {name: "阳江", value: 57},
              {name: "泸州", value: 57},
              {name: "西宁", value: 57},
              {name: "宜宾", value: 58},
              {name: "呼和浩特", value: 58},
              {name: "成都", value: 58},
              {name: "大同", value: 58},
              {name: "镇江", value: 59},
              {name: "桂林", value: 59},
              {name: "张家界", value: 59},
              {name: "宜兴", value: 59},
              {name: "北海", value: 60},
              {name: "西安", value: 61},
              {name: "金坛", value: 62},
              {name: "东营", value: 62},
              {name: "牡丹江", value: 63},
              {name: "遵义", value: 63},
              {name: "绍兴", value: 63},
              {name: "扬州", value: 64},
              {name: "常州", value: 64},
              {name: "潍坊", value: 65},
              {name: "重庆", value: 66},
              {name: "台州", value: 67},
              {name: "南京", value: 67},
              {name: "滨州", value: 70},
              {name: "贵阳", value: 71},
              {name: "无锡", value: 71},
              {name: "本溪", value: 71},
              {name: "克拉玛依", value: 72},
              {name: "渭南", value: 72},
              {name: "马鞍山", value: 72},
              {name: "宝鸡", value: 72},
              {name: "焦作", value: 75},
              {name: "句容", value: 75},
              {name: "北京", value: 79},
              {name: "徐州", value: 79},
              {name: "衡水", value: 80},
              {name: "包头", value: 80},
              {name: "绵阳", value: 80},
              {name: "乌鲁木齐", value: 84},
              {name: "枣庄", value: 84},
              {name: "杭州", value: 84},
              {name: "淄博", value: 85},
              {name: "鞍山", value: 86},
              {name: "溧阳", value: 86},
              {name: "库尔勒", value: 86},
              {name: "安阳", value: 90},
              {name: "开封", value: 90},
              {name: "济南", value: 92},
              {name: "德阳", value: 93},
              {name: "温州", value: 95},
              {name: "九江", value: 96},
              {name: "邯郸", value: 98},
              {name: "临安", value: 99},
              {name: "兰州", value: 99},
              {name: "沧州", value: 100},
              {name: "临沂", value: 103},
              {name: "南充", value: 104},
              {name: "天津", value: 105},
              {name: "富阳", value: 106},
              {name: "泰安", value: 112},
              {name: "诸暨", value: 112},
              {name: "郑州", value: 113},
              {name: "哈尔滨", value: 114},
              {name: "聊城", value: 116},
              {name: "芜湖", value: 117},
              {name: "唐山", value: 119},
              {name: "平顶山", value: 119},
              {name: "邢台", value: 119},
              {name: "德州", value: 120},
              {name: "济宁", value: 120},
              {name: "荆州", value: 127},
              {name: "宜昌", value: 130},
              {name: "义乌", value: 132},
              {name: "丽水", value: 133},
              {name: "洛阳", value: 134},
              {name: "秦皇岛", value: 136},
              {name: "株洲", value: 143},
              {name: "石家庄", value: 147},
              {name: "莱芜", value: 148},
              {name: "常德", value: 152},
              {name: "保定", value: 153},
              {name: "湘潭", value: 154},
              {name: "金华", value: 157},
              {name: "岳阳", value: 169},
              {name: "长沙", value: 175},
              {name: "衢州", value: 177},
              {name: "廊坊", value: 193},
              {name: "菏泽", value: 194},
              {name: "合肥", value: 229},
              {name: "武汉", value: 273},
              {name: "大庆", value: 279}
            ])
          },
            {
              name: '数据',
              type: 'map',
              geoIndex:0,
              mapType: 'china',
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: mapData  //数据
            }]
        }
        self.earthMap.setOption(option);
      },
      gerWordCloudMap(mapName){
        let self = this;
        let option = {
          tooltip: {},
          grid: {
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
          },
          series: [ {
            type: 'wordCloud',
            gridSize: 3,
            sizeRange: [18, 40],//最小文字---最大文字
            rotationRange: [-90, 90],//旋转角度区间
            shape: 'pentagon',
            width: 600,
            height: 400,
            drawOutOfBound: true,
            textStyle: {
              normal: {
                color: function () {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')';
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data:Utils.jobData
          } ]
        };
        mapName.setOption(option);
      },
      //销毁echarts
      destroyEcharts(echarts) {
        //销毁echars里面的数据，重新绘图渲染
        if (echarts && !echarts.isDisposed()) {
          echarts.clear();
          echarts.dispose();
        }
      },
      onresizeEcharts(){
        let self = this;
        window.onresize = function () {
          self.outwardMap.resize();
          self.inwardMap.resize();
          self.outwardServerMap.resize();
          self.inwardServerMap.resize();
          self.jobMap.resize();
          self.ageMap.resize();
          self.flyingRateMap.resize();
          self.earthMap.resize();
        }
      },
    },
    mounted() {
      let self = this;
      self.outwardMap = echarts.init(document.getElementById('outwardMap'));
      self.inwardMap = echarts.init(document.getElementById('inwardMap'));
      self.getPie(self.outwardMap);
      self.getPie(self.inwardMap);
      self.outwardServerMap = echarts.init(document.getElementById('outwardServerMap'));
      self.inwardServerMap = echarts.init(document.getElementById('inwardServerMap'));
      self.getRadarMap(self.outwardServerMap, 'rgb(61, 231, 201)');
      self.getRadarMap(self.inwardServerMap, ' rgb(0, 186, 255)');
      let category = ['0-14', '15-30', '30-44', '45-65', '65及以上'];
      let barData = [400, 180, 50, 180, 90];
      let xValue = ['1次', '2-3次', '4-5次', '6-7次', '8-9次', '10-11次', '12-13次', '14次以上'];
      let yValue = [89, 178, 12, 178, 84, 189, 366, 366];
      self.getHasShadowBarMap(category, barData);
      self.getPictorialBar(xValue, yValue);
//      self.getEarthMap();
      self.getMap();
//      self.getHeatMap();

      self.jobMap =  echarts.init(document.getElementById('jobMap'));
      self.gerWordCloudMap(self.jobMap);
      self.$nextTick(function () {
        self.onresizeEcharts();
      })
    }

  }

  function randomData() {
    return Math.round(Math.random() * 1000);
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -icab-box-sizing: border-box;
    -khtml-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  #userLikeness {
    height: 100%;
    width: 100%;
    background-image: url('./img/bg.png');
    background-color: rgba(0, 0, 0, 0);
    transform: scale(1);
    transform-origin: left top 0px;
    background-size: 100%;
  }

  header,
  section {
    width: 98%;
    margin: 0 auto;
    /*background-color: darkolivegreen;*/
  }

  div.black-bg {
    background-color: rgba(0, 0, 0, .5);
    position: relative;
  }

  header {
    position: relative;
    text-align: center;
    height: 80px;
    overflow: hidden;
    margin-top: 10px;
  }

  header > div > div {
    display: inline-block;
    vertical-align: top;
  }

  header div.header {
    width: 24.53%;
    height: 37px;
    z-index: 0;
    transform: rotate(0deg);
    opacity: 1;
    pointer-events: auto;
    margin: 0 auto;
  }

  header .header-name {
    margin-top: 10px;
    /*width: 540px;*/
    width: 100%;
    height: 100%;
    background-image: url('./img/header.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    image-rendering: -webkit-optimize-contrast;
  }

  header div.gif {
    /*width: 806px;*/
    width: 37.5%;
    height: 54px;
    z-index: 0;
    position: relative;
    opacity: 1;
    pointer-events: auto;
  }

  header div.gif-left > div {
    left: -12%;
    top: 0;
    position: absolute;
  }

  header div.gif-right > div {
    position: absolute;
    right: -9%;
    top: 8px;
  }

  header div.gif > div {
    width: 122%;
    height: 100%;
    opacity: 1;
    background-image: url('./img/line.gif');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center
  }

  /*进去港*/
  section > div > div {
    display: inline-block;
    vertical-align: top;
  }

  section div.inward-outward {
    /*width: 474px;*/
    height: 608px;
    border: none;
    border-radius: 0px;
    background: rgb(0, 25, 46);
    filter: blur(0px);
    position: relative;
  }

  div.inward-outward > div.bg-link {
    position: absolute;
  }

  div.inward-outward > div.bg-link > div {
    width: 100%;
    height: 100%;
    opacity: 1;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: left top;
  }

  div.left-top {
    width: 300px;
    height: 130px;
    left: -102px;
    top: -22px;
  }

  div.left-top > div {
    background-image: url('./img/left-top.gif');
  }

  div.left-bottom {
    width: 300px;
    height: 151px;
    left: -102px;
    bottom: 0px;
  }

  div.left-bottom > div {
    background-image: url("./img/left-bottom.gif");
  }

  div.right-bottom {
    width: 147px;
    height: 133px;
    right: -16px;
    bottom: -34px;
  }

  div.right-bottom > div {
    background-image: url("./img/right-bottom.gif");
  }

  div.right-top > div {
    background-image: url("./img/right-top.gif");
  }

  div.right-top {
    width: 165px;
    height: 131px;
    right: -18px;
    top: -16px;
  }

  div.content-flight > div.title {
    position: relative;
    height: 40px;
    top: 20px;
  }

  div.content-flight > div.title span {
    font-weight: bold;
    /*font-size: 22px;*/
    font-size: 1.3rem;
    display: inline-block;
    margin-left: 55px;
  }

  div.content-flight > div.title > i {
    display: inline-block;
    position: absolute;
  }

  div.content-flight > div.title > i:first-child {
    width: 12px;
    height: 12px;
    display: block;
    z-index: 0;
    transform: rotate(45deg);
    opacity: 1;
    pointer-events: auto;
    border: none;
    border-radius: 0px;
    background: rgb(255, 197, 61);
    filter: blur(0px);
    left: 25px;
    top: 10px;
  }

  div.content-flight > div.title > i:nth-child(2) {
    width: 16px;
    height: 16px;
    display: block;
    z-index: 0;
    transform: rotate(45deg);
    opacity: 1;
    pointer-events: auto;
    border: none;
    border-radius: 0px;
    filter: blur(0px);
    left: 35px;
    top: 8px;
  }

  div.inward-outward div.picture {
    height: 236px;
    /*width: 266px;*/
    margin: 0 auto;
  }

  div.picture-logo {
    width: 100%;
    position: relative;
    margin-top: 20px;
  }

  div.picture-logo div.ward-logo {
    position: absolute;
    top: 50px;
    /*width: 106px;*/
    height: 105px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    image-rendering: -webkit-optimize-contrast;
  }

  div.picture-logo div.man-logo {
    background-image: url("./img/man.png");
    left: 0;
  }

  div.picture-logo div.woman-logo {
    background-image: url("./img/woman.png");
    right: 0;
  }

  /*地图*/
  div.map {
    /*width: 1016px;*/
    height: 605px;
    background-color: rgb(0, 25, 46);
    margin: 0 .5%;
  }

  #earthMap {
    width: 100%;
    height: 100%;
  }

  /*服务偏好*/
  div.server-like {
    /*width: 345px;*/
    height: 608px;
    background-color: rgb(0, 25, 46);
    text-align: center;
  }

  div.server-like > div {
    position: relative;
  }

  div.server-like div.title {
    margin: 10px 0 20px 0;
  }

  div.server-like div.title > div.logo {
    /*width: 329px;*/
    height: 48px;
    background-image: url("./img/hint.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 13px;
  }

  div.server-like div.title > div.name {
    background-color: rgba(0, 0, 0, 0);
    font-weight: bold;
    /*font-size: 20px;*/
    font-size: 1.25rem;
  }

  div.server-like div.server-map {
    /*width: 318px;*/
    height: 226px;
    margin: 0 auto;
  }

  /*底部*/
  div.section-bottom {
    margin-top: 20px;
  }

  div.section-bottom > div {
    display: inline-block;
    vertical-align: top;
  }

  div.section-bottom div.age-statistics {
    /*width: 565px;*/
    height: 321px;
  }

  div.section-bottom div.block-area {
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 32px 37px;
    border-image-source: url('./img/block-bg.png');
    border-image-slice: 32 37 fill;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    background: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  div.section-bottom div.block-header > span {
    display: inline-block;
  }

  div.section-bottom div.block-header > span:first-child {
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    border: none;
    border-radius: 0px;
    margin-right: 10px;
  }

  div.section-bottom div.block-header > span:nth-child(2) {
    font-size: 1.3rem;
    color: rgb(255, 255, 255);
    font-weight: bold;
  }

  div.section-bottom div.block-content {
    width: 92%;
    margin: 12px auto;
  }

  #ageMap, #flyingRateMap, #jobMap {
    width: 100%;
    height: 245px;
    margin-top: 14px;
  }

  div.fly-rate-statistics {
    /*width: 565px;*/
    height: 321px;
    margin: 0 0.3%;
  }

  div.job-statistics {
    /*width: 714px;*/
    height: 321px;
  }




  @media screen and (min-width: 1024px) {
    div.inward-outward{
      width: 25.66%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21.0851%;
    }
    div.picture{
      width: 50%;
    }
    div.picture-logo div.ward-logo{
      width: 20%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 60%;
    }
    div.section-bottom div.age-statistics{
      width: 28.72%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39%;
    }
  }

  @media screen and (min-width: 1280px) {
    div.inward-outward{
      width: 25.66%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21.0851%;
    }
    div.picture{
      width: 50%;
    }
    div.picture-logo div.ward-logo{
      width: 25%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 28.92%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39%;
    }
  }

  @media screen and (min-width: 1366px) {

    div.inward-outward{
      width: 25.9%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21.0851%;
    }
    div.picture{
      width: 50%;
    }
    div.picture-logo div.ward-logo{
      width: 25%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 28.92%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39.1%;
    }
  }

  @media screen and (min-width: 1400px) {
    div.inward-outward{
      width: 26%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21%;
    }
    div.picture{
      width: 50%;
    }
    div.picture-logo div.ward-logo{
      width: 25%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 28.92%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39.1%;
    }
  }

  @media screen and (min-width: 1440px) {
    div.inward-outward{
      width: 26%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21%;
    }
    div.picture{
      width: 50%;
    }
    div.picture-logo div.ward-logo{
      width: 25%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 28.92%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39.1%;
    }
  }

  @media screen and (min-width: 1600px) {
    div.inward-outward{
      width: 26%;
    }
    div.map{
      width: 51.39%;
    }
    div.server-like{
      width: 21%;
    }
    div.picture{
      width: 60%;
    }
    div.picture-logo div.ward-logo{
      width: 23%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 28.92%;
    }
    div.fly-rate-statistics{
      width: 30.72%;
    }
    div.job-statistics{
      width: 39.1%;
    }
  }

  @media screen and (min-width: 1920px) {
    div.inward-outward{
      width: 25.5%;
    }
    div.map{
      width: 53%;
    }
    div.server-like{
      width: 20.04%;
    }
    div.picture{
      width: 60%;
    }
    div.picture-logo div.ward-logo{
      width: 23%;
    }
    div.server-like div.title > div.logo{
      width: 90%;
    }
    div.server-like div.server-map{
      width: 90%;
    }
    div.section-bottom div.age-statistics{
      width: 29.8%;
    }
    div.fly-rate-statistics{
      width: 30%;
    }
    div.job-statistics{
      width: 39.1%;
    }
  }


</style>
