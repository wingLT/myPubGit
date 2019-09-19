<template>
  <div>
    <div id="mapDemo"></div>
    <div id="describe" style="left: 2%;bottom: 2%">
      <p class="describe-p">
        <span>实际出港人数：&nbsp;20</span>
        <span>已值机人数：&nbsp;50</span>
        <span>已安检人数：&nbsp;100</span>
      </p>
    </div>
    <div class="shade"></div>
  </div>
</template>

<script>
  import comm from "../Common.vue";
  import {Utils} from '../../../static/js/Utils'
  import '../../../static/js/fengmap.min'
  import {AOCMap} from '../../API/AOC_Heat_Map'

  export default {
    data() {
      return {
        heatMapInstance: null,
        groupLayer: '',
        imageLayer: null,
        imageMark: '',
        textLayer: null,
        textMark: '',
        allPath: []
      }
    },
    created(){
      document.title = 'AOC登机口热力图（T1-F2）'
    },
    methods: {
      allRequestInterface(map, navigationObj, bubbleObj) {
        let self = this;
        if(self.textLayer){self.textLayer.removeAll();self.textLayer=null;}
        if(self.imageLayer){self.imageLayer.removeAll();self.imageLayer=null;}
        if(!Utils.isEmptyObject(self.allPath)){
          for(let i = 0;i<self.allPath.length;i++){
            self.allPath[i].clearAll();self.allPath[i]=null;
          }
        }
        if(bubbleObj)bubbleObj.closeBubble();
        self.getTotalPerson();
        self.getFlightInfo(map,bubbleObj);
        self.getGatePlan(navigationObj,map);
//        setTimeout(function () {
//          self.allRequestInterface(map,navigationObj,bubbleObj);
//        },1000* 60 *Utils.Time)
      },
      //得到总人数
      async getTotalPerson() {
        await AOCMap.getTotalPerson({terminall:'T1'}).then(function (result) {
          let html = [];
          if (result.status === 200) {
            let data = result.data;
            html.push('<span>实际出港人数：&nbsp;' + data.tookoff + '</span>');
            html.push('<span>已值机人数：&nbsp;' + data.verified + '</span>');
            html.push('<span>已安检人数：&nbsp;' + data.unVerified + '</span>');
          } else {
            html.push('<span>实际出港人数：&nbsp;</span>');
            html.push('<span>已值机人数：&nbsp;</span>');
            html.push('<span>已安检人数：&nbsp;</span>');
          }
          $('.describe-p').html(html.join(''));
        })
      },
      /*
      * 得到飞机数据，包括热力值，登录口，登记人数，航班号
       * */
      async getFlightInfo(map, bubbleObj) {
        let self = this;
        await AOCMap.getFlightInfo({terminall: 'T1', floor: 2}).then(function (result) {
          if (result.status === 200) {
            self.handleHeatData(result.data, map, map.focusGroupID);
            self.drawFlightAndPerson(map, result.data);
            self.createFlightBubble(bubbleObj, map, result.data);
          }
        });

      },
      //画飞机，航班信息，登记人数
      drawFlightAndPerson(map, data) {
        let self = this;
        if(!Utils.isEmptyObject(data)){
          for(let i = 0;i<data.length;i++){
            if(data[i].deviation === 'right'){
              self.addImgMarkers(map, parseFloat(data[i].cx) + 2, parseFloat(data[i].cy)+ 11, require("./img/plan.png"));
            }else if(data[i].deviation === 'left'){
              self.addImgMarkers(map, parseFloat(data[i].cx) - 2, parseFloat(data[i].cy)- 11, require("./img/plan.png"));
            }else {
              self.addImgMarkers(map, parseFloat(data[i].cx) -10, parseFloat(data[i].cy) - 11, require("./img/plan.png"));
            }
          }
        }
      },
      async getGatePlan(navigationObj,map) {
        let self = this;
        self.allPath = [];
        await AOCMap.getGatePlan({terminall: 'T1', floor: 2}).then(function (result) {
          if (result.status === 200) {
            let data = result.data;
            if(!Utils.isEmptyObject(data)){
              for(let i = 0;i<data.length;i++){
                let path =[];
                if(parseInt(data[i].flag) === 0){
                  path.push({x:data[i].areaCx,y:data[i].areaCy})
                }else {
                  path.push({x:11572282.833987877,y:3578504.5253466396});
                }
                path.push({x:data[i].gateCx,y:data[i].gateCy});
                self.planARoute(navigationObj,map,path);
              }
            }
          }
        });
      },
      /*
       * 规划路径
       * map:map对象
       * navigationObj:路径规划对象（FMNavigation）
       * pathData:路径json {x:111,y:111}
       * */
      planARoute(navigationObj, map, pathData) {
        let self = this;
        //初始化导航对象
        navigationObj = new fengmap.FMNavigation({
          map: map,
          locationMarkerUrl:  require("./img/peopleMarker.png"),
          speed: 1,
          scaleLevel: 2,
          //设置Marker尺寸
          locationMarkerSize: 43,
          followPosition: false,//模拟导航时是否地图跟随,默认true
          changeTiltAngle: false,//是否在导航开始时改变地图的倾斜角度
          followAngle: false,
          // 设置导航线的样式
          lineStyle: {
            //设置线为导航线样式
            lineType: fengmap.FMLineType.FMARROW,
            lineWidth: 6,
          }
        });

        //添加起点
        navigationObj.setStartPoint({
          x: pathData[0].x,
          y: pathData[0].y,
          groupID: map.groupIDs[0],
          url: require("./img/start.png"),
          size: 32,
          callback: function () {
          }
        });
        //添加终点
        navigationObj.setEndPoint({
          x: pathData[1].x,
          y: pathData[1].y,
          groupID: map.groupIDs[0],
          url: require("./img/end.png"),
          size: 32,
          callback: function () {
          }
        });
        // 画导航线
        navigationObj.drawNaviLine();
        self.allPath.push(navigationObj);

      },
      /*
      * 创建航班数据气泡
      * bubbleObj：气泡对象
      * map:map对象,
      * flightData:航班数据
      * */
      createFlightBubble(bubbleObj, map, flightData) {
        let self = this;
        if (!bubbleObj || !map) return;
        bubbleObj.closeBubble();
        for (let k = 0; k < flightData.length; k++) {
          let NoHtml = [];
          if (flightData[k].flightNos) {
            let flight = [];
            let person = [];
            if (flightData[k].flightNos.indexOf(',') >= 0) {
              flight = flightData[k].flightNos.split(',');
              person = flightData[k].count.split(',');
              for (let i = 0; i < flight.length; i++) {
                NoHtml.push('<span>' + flight[i] + '（' + person[i] + '人）</span>');
              }
            } else {
              NoHtml.push('<span>' + flightData[k].flightNos + '（' + flightData[k].count + '人）</span>');
            }
          }
          if (flightData[k].deviation === 'right') {
            flightData[k].cx = flightData[k].cx + 2;
            flightData[k].cy = flightData[k].cy + 21;
          } else if (flightData[k].deviation === 'left') {
            flightData[k].cx = flightData[k].cx - 2;
            flightData[k].cy = flightData[k].cy - 21;
          } else {
            flightData[k].cx = flightData[k].cx - 10;
            flightData[k].cy = flightData[k].cy - 21;
          }
          let position = {
            //设置气泡的x坐标
            x: flightData[k].cx,
            //设置气泡的y坐标
            y: flightData[k].cy,
            //设置气泡的高度
            z: map.getGroupHeight(map.focusGroupID) + map.layerLocalHeight,
            //设置气泡的自定义属性
            name: NoHtml.join('')
          }
          bubbleObj.bubbledomEvent(position);
        }
      },
      /*
      * 添加图片的标注
      * map:map对象
      * x:标注地图位置x值
      * y:标注地图位置y值
      * url:图片的路径
      * imageLayer: 当前层中第一个imageMarkerLayer
      * imageMark: 标注对象
      * */
      addImgMarkers(map, x, y, url) {
        let self = this;
        //获取第一层
        let group = map.getFMGroup(map.groupIDs[0]);
        //返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
        self.imageLayer = group.getOrCreateLayer('imageMarker');
        //图标标注对象，默认位置为该楼层中心点
        self.imageMark = new fengmap.FMImageMarker({
          x: x,
          y: y,
          //设置图片路径
          url: url,
          //设置图片显示尺寸
          size: 46,
          callback: function () {
            //图片不需要一直可见，因为图片上面需要显示航班号
            // 在图片载入完成后，设置 "一直可见"，不被其他层遮挡
//                imageMark.alwaysShow();
          }
        });
        self.imageLayer.addMarker(self.imageMark);
      },

      //移除热力图
      removeHeatMap(map) {
        let self = this;
        this.groupLayer = map.getFMGroup(map.focusGroupID);
        this.groupLayer.removeHeatMap(self.heatMapInstance);
      },
      //处理热力值
      handleHeatData(result, map, groupID) {
        let self = this;
        let points = [];
        if (!Utils.isEmptyObject(result)) {
          for (let i = 0; i < result.length; i++) {
            points.push(
              {
                'x': result[i].cx,
                'y': result[i].cy,
                'value': result[i].count
              }
            )
          }
        }
        self.createHotPoint(map, groupID, points);
      },
      /*
     * 创建热点
     * map :地图对象
     * groupID：楼层id
     * data：热点对应的值
     * */
      createHotPoint(map, groupID, data) {
        let self = this;
        if (self.heatMapInstance) {
          self.removeHeatMap(map);
          self.heatMapInstance = null;
        }
        if (!self.heatMapInstance) {
          /*
          * create(map,config)
          * map:map对象
          * config:基础配置json
          * */
          self.heatMapInstance = fengmap.FMHeatMap.create(map, {
            radius: 20,//热点半径
            opacity: 1,//热力透明度0-1
            max: 20,//热力点value的最大值
            gradient: {0.65: "rgb(0,204,0)", 0.85: "rgb(241,155,4)", 1.0: "rgb(255,0,0)"}
          })
          let hotData = data;
          //创建之前先清除之前的热力点
          self.heatMapInstance.clearPoints();
          //addPoints ( data.数组的每一个值是{x,y,value}对象。 )
          self.heatMapInstance.addPoints(hotData);
          //根据楼层ID，获取某一层模型数据。
          self.groupLayer = map.getFMGroup(groupID);
          //应用热力图(类型，对生成的热力图应用到该楼层上)
          self.groupLayer.applyHeatMap(self.heatMapInstance);
          return;
        }
      },
      initMap() {
        let self = this;
        let map;
        let positionID = 'yfsl-cdairport';
        //气泡对象
        let bubbleObj = null;
        //导航对象
        let navigationObj;
        map = new fengmap.FMMap({
          //渲染dom
          container: document.getElementById('mapDemo'),
          //地图数据位置
          mapServerURL: './static/data/'+ positionID,
//          mapServerURL: '../data/'+ positionID,
          //主题数据位置
          mapThemeURL: './static/data/theme',
//          mapThemeURL: './../data/data/theme',
          //设置主题
          defaultThemeName: '652557',
          //对不可见图层启用透明设置 默认为true
          focusAlphaMode: true,
          //关闭聚焦层切换的动画显示
          focusAnimateMode: false,
          //对不聚焦图层启用透明设置，当focusAlphaMode = true时有效
          focusAlpha: 0.1,
          // 默认比例尺级别设置为20级
          //得到/设置地图的比例尺级别 1~29 级, 一般室内地图所用到的级别范围在 16~23级 在设置时, 可以传入Json, {level:18, duration:1, callback: function() {}}
          defaultMapScaleLevel: 18,
          //开启2维，3维切换的动画显示
          viewModeAnimateMode: true,
          //开发者申请应用下web服务的key
          key: 'c8e2472ac27d3a1cb9b30c6669fcb8ff',
          //开发者申请应用名称
          appName: 'AOC登记口热力图',
//            defaultControlsPose:-70.5,
          defaultControlsPose: {//旋转使其放平
            target: "-150.227,0.000,606.432",
            position: "-302.646,898.686,550.763"
          },
          //初始二维还是三维状态,默认是3D状态
          defaultViewMode: fengmap.FMViewMode.MODE_2D,
          //默认背景
          defaultBackgroundColor: '#191f1f',
          //设置比例尺级别可缩放范围， 通常室内地图使用到的范围为16级到23级。即：[16,23]。
          mapScaleLevelRange: [18, 23],
          //设置地图初始显示自定义比例尺级别。如设置1000，为1:1000（厘米）的显示状态。defaultMapScale的优先级比defaultMapScaleLevel的优先级高。
          defaultMapScale: 1690
        });
        //打开Fengmap服务器的地图数据和主题
        map.openMapById(positionID);
        //地图添加点击事件
        map.on('mapClickNode', function (event) {
          //点击位置的地图坐标
          console.log(event.eventInfo.coord);
        });
        //地图加载完成回调
        map.on('loadComplete', function () {
          map.gestureEnableController.enableMapPinch = false;//不可缩放
          map.gestureEnableController.enableMapPan = false;//不能移动
//          map.fullScreen = true;
//          //初始化气泡对象
          bubbleObj = new createBubble(map);
          self.allRequestInterface(map, navigationObj, bubbleObj);
//          self.addImgMarkers(map, 11572178.143286148, 3578558.150614805, require("./img/plan.png"));
        })
      }
    },
    mounted() {
      this.initMap();
    }
  }
</script>

<style scoped>
  @import "css/style.css";
</style>
