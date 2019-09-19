<template>
  <div id="passengerContainer">
    <header>
      <div class="passenger-title">成都双流国际机场乘客信息统计分析</div>
    </header>
    <div class="passenger-top">
      <div class="top-left">
        <div class="left-top">
          <div></div>
          <div class="left-main">
            <div>
              <div class="square" style="top: 0"></div>
              <p class="pointTitle">已值机</p>
              <p class="font50">
              <span v-for="(i,index) in checkList.totalNum">
                <span class="number-box" :style="'margin-right:'+ (index === number.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="checkList.totalNum.length > 3 && index === checkList.totalNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                <span class="font24" style="color: #fff">人</span>
              </p>
            </div>
            <div>
              <div class="square" style="bottom: 0;top: auto"></div>
              <div style="position: absolute;bottom: 0">
                <p class="font30">
                  <span class="pointTitle">已安检</span>
                  <span v-for="(i,index) in checkList.checkedNum">
                <span class="number-box" :style="'margin-right:'+ (index === checkList.checkedNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="checkList.checkedNum.length > 3 && index === checkList.checkedNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                  <span class="font20" style="color: #fff">人</span>
                </p>
                <p class="font30">
                  <span class="pointTitle">待安检</span>
                  <span v-for="(i,index) in checkList.alreadyNum">
                <span class="number-box" :style="'margin-right:'+ (index === checkList.alreadyNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="checkList.alreadyNum.length > 3 && index === checkList.alreadyNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                  <span class="font20" style="color: #fff">人</span>
                </p>
              </div>

            </div>
            <div class="main-right">
              <p class="pointTitle" style="text-align: center">安检口统计</p>
              <div id="securitySum" class="piePicture"></div>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div></div>
          <div class="left-main">
            <div>
              <div class="square" style="top: 0"></div>
              <p class="pointTitle">出港总量</p>
              <p class="font50">
              <span v-for="(i,index) in inOutList.dNum">
                <span class="number-box" :style="'margin-right:'+ (index === inOutList.dNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="inOutList.dNum.length > 3 && index === inOutList.dNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                <span class="font24" style="color: #fff">人</span>
              </p>
            </div>
            <div>
              <div class="square" style="bottom: 0;top: auto"></div>
              <div style="position: absolute;bottom: 0">
                <p class="pointTitle" style="bottom: 0">进港总量</p>
                <p class="font50">
              <span v-for="(i,index) in inOutList.aNum">
                <span class="number-box" :style="'margin-right:'+ (index === inOutList.aNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="inOutList.aNum.length > 3 && index === inOutList.aNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                  <span class="font24" style="color: #fff">人</span>
                </p>
              </div>

            </div>

            <div class="main-right">
              <p class="pointTitle" style="text-align: center">进出港占比</p>
              <div id="inOutPortSum" class="piePicture"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-center" id="passengerSum"></div>
      <div class="top-right">
        <div class="right-top">
          <p class="pointTitle" style="padding-bottom: 10px">出港热门城市TOP10</p>
          <div class="city-title">
            <span style="width: 10%"></span>
            <span style="width: 30%">名称</span>
            <span style="width: 30%">人数</span>
            <span style="width: 20%">客座率</span>
          </div>
          <div class="outCity swiper-container swiper-top">
            <div class="city-main swiper-wrapper">
              <div class="swiper-slide" v-for="(city,index) in dCityTop10">
                <div v-for="(item,key) in city">
                  <span style="width: 10%">
                    <span class="circle">{{key+(index === 0 ? 1 : 6)}}</span>
                  </span>
                  <span style="width: 30%">{{item.name.length > 5 ? item.name.substring(0,5)+'...':item.name}}</span>
                  <span style="width: 30%;color: #fff;">{{item.number}}</span>
                  <span style="width: 20%">{{item.rate+' %'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <p class="pointTitle" style="padding: 10px 0">进港热门城市TOP10</p>
          <div class="city-title">
            <span style="width: 10%"></span>
            <span style="width: 30%">名称</span>
            <span style="width: 30%">人数</span>
            <span style="width: 20%">客座率</span>
          </div>
          <div class="outCity swiper-container swiper-bottom">
            <div class="city-main swiper-wrapper">
              <div class="swiper-slide" v-for="(city,index) in aCityTop10">
                <div v-for="(item,key) in city">
                  <span style="width: 10%">
                    <span class="circle">{{key+(index === 0 ? 1 : 6)}}</span>
                  </span>
                  <span style="width: 30%">{{item.name.length > 5 ? item.name.substring(0,5)+'...':item.name}}</span>
                  <span style="width: 30%;color: #fff;">{{item.number}}</span>
                  <span style="width: 20%">{{item.rate+' %'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="passenger-bottom">
      <div class="bottom-left">
        <p class="pointTitle" style="margin-bottom: 15px">货邮统计</p>
        <div style="position: relative;height: calc(100% - 40px)">
          <div class="left-main">
            <div>
              <div class="square" style="top: 0;left: 0"></div>
              <p class="pointTitle">货物</p>
              <p class="font42">
              <span v-for="(i,index) in mailList.goodsNum">
                <span class="number-box" :style="'margin-right:'+ (index === mailList.goodsNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="mailList.goodsNum.length > 3 && index === mailList.goodsNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                <span class="font24" style="color: #fff">千克</span>
              </p>
            </div>
            <div>
              <div class="square" style="bottom: 0;left: 0;top: auto"></div>
              <div style="position: absolute;bottom: 0">
                <p class="pointTitle">邮件</p>
                <p class="font42">
              <span v-for="(i,index) in mailList.mailNum">
                <span class="number-box" :style="'margin-right:'+ (index === mailList.mailNum.length-4 ? '0' : '0.2em')">{{i}}</span>
                <span v-if="mailList.mailNum.length > 3 && index === mailList.mailNum.length-4" style="margin-right: 0.2em">,</span>
              </span>
                  <span class="font24" style="color: #fff">千克</span>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
      <div class="bottom-right">
        <div class="right-left">
          <p class="pointTitle">各类别飞机架次</p>
          <div id="flightSorties" class="flightSorties"></div>
        </div>
        <div class="right-right">
          <p class="pointTitle">全天出港客座率统计</p>
          <div id="plfSum" class="plfSum"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import echarts from 'echarts'
  // import BMapLib from 'BMapLib'
  import '../../../static/lib/chain1'
  import '../../../static/lib/world'
  import '../../../static/lib/echarts-wordcloud.min'
  import Swiper from '../../../static/js/swiper.min'
  import '../../../static/css/swiper.min.css'
  import {Utils} from '../../../static/js/Utils'
  import {PassengerMap} from '../../API/PassengerStatistics'
  require("../../../static/js/bmap.js");
  // import NumberGrow from './NumberGrow.vue'
    export default {
      name: "PassengerStatistics",
      created(){
        document.title = '乘客统计';
      },
      data(){
        return {
          number:[5,4,8,7,3],
          securitySum:'',
          inOutPortSum:'',
          // 自动饼图高亮位置
          app: {
            securitySumIndex: -1,
            inOutPortSumIndex: -1,
          },
          // 定时器
          setInterval:['',''],
          // 地图
          passengerSum:'',
          map:'',
          mapList:[],
          // 进出港前十城市
          aCityTop10 : [[],[]],
          dCityTop10 : [[],[]],
          // 安检数据
          checkList:{
            totalNum:null,
            checkedNum:null,
            alreadyNum:null,
            checkNum:[]
          },
          legendData:[],
          // 进出港数据
          inOutList:{
            dNum:null,
            aNum:null,
            totalNum:[]
          },
          // 货邮数据
          mailList:{
            goodsNum:null,
            mailNum:null
          },
          table:[
            [{city:'北京', num:1150,plf:'60%'},
            {city:'长春',num:536,plf:'31.5%'},
            {city:'迪拜',num:220,plf:'47.5%'},
            {city:'拉萨',num:356,plf:'79.2%'},
            {city:'北京',num:1150,plf:'60%'}],
            [{city:'上海浦东',num:1275,plf:'75%'},
            {city:'厦门',num:268,plf:'45%'},
            {city:'乌鲁木齐',num:20,plf:'0.2%'},
            {city:'上海',num:150,plf:'10%'},
            {city:'昆明',num:350,plf:'40%'}]
          ],
          // 飞机架次
          flightList:[],
          flightSorties:'',
          // 客座率统计
          plfList:{
            xAxis:[],
            bgData:[],
            nowData:[],
            lastData:[]
          },
          plfSum:'',
          time: 1,
          swiperTop:'',
          swiperBottom:'',
        }
      },
      mounted(){
        let self = this;
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js";
        document.body.appendChild(script);
        self.getAllData();
      },
      methods:{
        getAllData: function () {
          let self = this;
          self.getACityTop10();
          self.getDCityTop10();
          self.getSecurityCheck();
          self.getADNum();
          self.getMail();
          self.getCityThermodynamic();
          self.getAirportType();
          self.getADGuestSeat();
          setTimeout(function () {
            self.getAllData()
          }, 1000 * 60 * self.time)
        },
        // 获取进港前十
        async getACityTop10(){
          let self = this;
          let result = await PassengerMap.getACityTop10().then((e)=>{
            if(e.status === 200){
              if (self.swiperBottom) {
                self.swiperBottom.destroy(false);
              }
              self.aCityTop10 = [[],[]];
              for(let i=0;i<e.data.length;i++){
                if(i < 5){
                  self.aCityTop10[0].push({
                    name:e.data[i].name,
                    number:e.data[i].number,
                    rate:e.data[i].rate,
                  })
                }else{
                  self.aCityTop10[1].push({
                    name:e.data[i].name,
                    number:e.data[i].number,
                    rate:e.data[i].rate,
                  })
                }
              }
              self.$nextTick(()=>{
                self.swiperBottom = new Swiper('.swiper-bottom', {
                  direction: 'vertical', // 垂直切换选项
                  loop: true, // 循环模式选项
                  autoplay:true,
                })
                self.swiperBottom.detachEvents();
              })
            }
          }).catch((err)=>{

          })
        },
        // 获取出港前十
        async getDCityTop10(){
          let self = this;
          let result = await PassengerMap.getDCityTop10().then((e)=>{
            if(e.status === 200){
              if (self.swiperTop) {
                self.swiperTop.destroy(false);
              }
              self.dCityTop10 = [[],[]];
              for(let i=0;i<e.data.length;i++){
                if(i < 5){
                  self.dCityTop10[0].push({
                    name:e.data[i].name,
                    number:e.data[i].number,
                    rate:e.data[i].rate,
                  })
                }else{
                  self.dCityTop10[1].push({
                    name:e.data[i].name,
                    number:e.data[i].number,
                    rate:e.data[i].rate,
                  })
                }
              }
              self.$nextTick(()=>{
                self.swiperTop = new Swiper('.swiper-top', {
                  direction: 'vertical', // 垂直切换选项
                  loop: true, // 循环模式选项
                  autoplay:true,
                })
                self.swiperTop.detachEvents();
              })
            }
          }).catch((err)=>{

          })
        },
        // 获取安检口统计
        async getSecurityCheck(){
          let self = this;
          let result = await PassengerMap.getSecurityCheck().then((e)=>{
            if(e.status === 200){
              if(self.securitySum){
                self.destroyEcharts(self.securitySum)
              }
              if(self.setInterval[0]){
                clearInterval(self.setInterval[0])
              }
              self.app.securitySumIndex = -1;
              self.checkList = {
                totalNum: e.data.totalNum.toString().split(''),
                checkedNum: (e.data.totalNum - e.data.alreadyNum).toString().split(''),
                alreadyNum: e.data.alreadyNum.toString().split(''),
                checkNum:[]
              }
              self.legendData = [];
              self.legendData = ['B区','C区','DE区','FG区'];
              let total = 0;
              for(let t of e.data.securityChecks){
                if(t.type === 'AB'||t.type === 'Ac'||t.type === 'DE'||t.type === 'FG'){
                  total+=t.number
                }
              }
              for(let num of e.data.securityChecks){
                if(num.type === 'AB'){
                  // self.checkList.checkNum.push({value:num.number,name:(num.number/total*100).toFixed(2) + "%\nB区"})
                  self.checkList.checkNum.push({value:num.number,name:"B区"})
                }else if(num.type === 'AC'){
                  // self.checkList.checkNum.push({value:num.number,name:(num.number/total*100).toFixed(2) + "%\nC区"})
                  self.checkList.checkNum.push({value:num.number,name:"C区"})
                }else if(num.type === 'DE'){
                  // self.checkList.checkNum.push({value:num.number,name:(num.number/total*100).toFixed(2) + "%\nDE区"})
                  self.checkList.checkNum.push({value:num.number,name:"DE区"})
                }else if(num.type === 'FG'){
                  // self.checkList.checkNum.push({value:num.number,name:(num.number/total*100).toFixed(2) + "%\nFG区"})
                  self.checkList.checkNum.push({value:num.number,name:"FG区"})
                }
              }
              self.getPie1();
              self.$nextTick(()=>{
                window.onresize = function() {
                  self.securitySum.resize();
                }
              })
            }
          }).catch((err)=>{

          })
        },
        // 获取进出港人数统计
        async getADNum(){
          let self = this;
          let result = await PassengerMap.getADNum().then((e)=>{
            if(e.status === 200){
              if(self.inOutPortSum){
                self.destroyEcharts(self.inOutPortSum)
              }
              if(self.setInterval[1]){
                clearInterval(self.setInterval[1])
              }
              self.app.inOutPortSumIndex = -1;
              self.legendData = [];
              self.legendData = ['出港','进港'];
              let total = e.data.dnumber + e.data.anumber;
              self.inOutList = {
                dNum: e.data.dnumber.toString().split(''),
                aNum: e.data.anumber.toString().split(''),
                totalNum:[
                  {value:e.data.dnumber, name: "出港"},
                  {value:e.data.anumber, name:"进港"}
                ]
              }
              self.getPie();
              self.$nextTick(()=>{
                window.onresize = function() {
                  self.inOutPortSum.resize();
                }
              })
            }
          }).catch((err)=>{

          })
        },
        // 获取货邮统计
        async getMail(){
          let self = this;
          let result = await PassengerMap.getMail().then((e)=>{
            if(e.status === 200){
              self.mailList = {
                goodsNum:e.data.goodsNum.toString().split(''),
                mailNum:e.data.mailNum.toString().split(''),
              }
            }
          }).catch((err)=>{

          })
        },
        // 获取飞机架次
        async getAirportType(){
          let self = this;
          let result = await PassengerMap.getAirportType().then((e)=>{
            if(e.status === 200){
              if(self.flightSorties){
                self.destroyEcharts(self.flightSorties)
              }
              let map = {};
              self.flightList = [];
              for (let i = 0; i < e.data.length; i++) {
                let ai = e.data[i];
                if (!map[ai.s]) {
                  self.flightList.push({
                    key:ai.s,
                    value:[ai.y]
                  });
                  map[ai.s] = ai;
                } else {
                  for (let j = 0; j < self.flightList.length; j++) {
                    let dj = self.flightList[j];
                    if (dj.key === ai.s) {
                      if(ai.x === '今日'){
                        dj.value.push(ai.y);
                      }else{
                        dj.value.unshift(ai.y);
                      }
                    }
                  }
                }
              }
              self.flightSorties = echarts.init(document.getElementById('flightSorties'));
              self.getBar(self.flightSorties)
            }
          }).catch((err)=>{

          })
        },
        // 获取客座率
        async getADGuestSeat(){
          let self = this;
          let result = await PassengerMap.getADGuestSeat().then((e)=>{
            if(e.status === 200){
              if(self.plfSum){
                self.destroyEcharts(self.plfSum)
              }
              self.plfList = {
                xAxis:[],
                bgData:[],
                nowData:[],
                lastData:[]
              };
              for(let i = 0;i<e.data.guestSeatsNow.length;i++){
                let item = e.data.guestSeatsNow[i];
                self.plfList.xAxis.push(item.point);
                self.plfList.bgData.push(100);
                self.plfList.nowData.push(item.rate === 0 ? '':item.rate);
                self.plfList.lastData.push(e.data.guestSeatsYesterday[i].rate);
              }
              self.plfSum = echarts.init(document.getElementById('plfSum'));
              self.getBarRight(self.plfSum);
            }
          }).catch((err)=>{

          })
        },
        // 获取地图
        async getCityThermodynamic(){
          let self = this;
          let result = await PassengerMap.getCityThermodynamic().then((e)=>{
            if(e.status === 200){
              if(self.passengerSum){
                self.destroyEcharts(self.passengerSum)
              }
              self.mapList = [];
              self.mapList = e.data;
              self.getBMap();
              // self.getHeat();
            }
          }).catch((err)=>{

          })
        },

        //      销毁echarts
        destroyEcharts(mapName) {
          if (mapName || mapName !== null) {
            mapName.clear(false)
            mapName.dispose(false)
          }
        },
        // 顶部左侧饼状图1
        getPie1(){
          let self = this;
          self.securitySum = echarts.init(document.getElementById('securitySum'));
          let index = self.app.securitySumIndex;
          let option = {
            legend: {
              bottom:0,
              left:0,
              itemWidth:10,
              itemHeight:10,
              data:self.legendData,
              textStyle:{
                color:'#fff'
              }
            },
            color:['#fbf321','#fff','#24feb4','#23539b'],
            series: [
              {
                type: 'pie',
                radius: ['50%', '65%'],
                center:['45%','40%'],
                avoidLabelOverlap: false,
                selectedOffset: '10',
                hoverOffset:5,
                legendHoverLink: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center',
                    verticalAlign:'middle'
                  },
                  emphasis: {
                    show: true,
                    formatter: '{d}%\n{b}',
                    textStyle: {
                      fontSize: 14,
                      color:'#fff',
                      fontWeight:'600'
                    }
                  }
                },
                data: this.checkList.checkNum
              },
            ]
          };
          self.securitySum.clear();
          self.securitySum.setOption(option);
          let myChart = echarts.getInstanceByDom(document.getElementById("securitySum"));
          let dataLen = option.series[0].data.length;
          let isSet = true;// 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
          let charPie3currentIndex = 0;
          clearInterval(myChart.startCharts);
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
          self.chartHover = function () {
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
          myChart.startCharts = setInterval(self.chartHover, 2000);
          // 4、鼠标移出之后，恢复自动高亮
          myChart.on('mouseout', function (param) {
            if (!isSet) {
              myChart.startCharts = setInterval(chartHover, 2000);
              isSet = true
            }
          })
        },
        // 顶部左侧饼状图
        getPie() {
          let self = this;
          self.inOutPortSum = echarts.init(document.getElementById('inOutPortSum'));
          let index = self.app.inOutPortSumIndex;
          let option = {
            legend: {
              bottom:0,
              itemWidth:10,
              itemHeight:10,
              data:self.legendData,
              textStyle:{
                color:'#fff'
              }
            },
            color:['#3c9de4','#23539b'],
            series: [
              {
                type: 'pie',
                radius: ['50%', '65%'],
                center:['45%','40%'],
                avoidLabelOverlap: false,
                selectedOffset: '10',
                hoverOffset:5,
                legendHoverLink: false,
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
                      position: 'center',
                      fontWeight: 'bold',
                      color:'#fff'
                    }
                  }
                },
                data: self.inOutList.totalNum
              },
            ]
          };
          self.inOutPortSum.clear();
          self.inOutPortSum.setOption(option);
          let myChart = echarts.getInstanceByDom(document.getElementById("inOutPortSum"));
          let dataLen = option.series[0].data.length;
          let isSet = true;// 为了做判断：当鼠标移动上去的时候，自动高亮就被取消
          let charPie3currentIndex = 0;
          clearInterval(myChart.startCharts);
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
          self.chartHover = function () {
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
          myChart.startCharts = setInterval(self.chartHover, 2000);
          // 4、鼠标移出之后，恢复自动高亮
          myChart.on('mouseout', function (param) {
            if (!isSet) {
              myChart.startCharts = setInterval(chartHover, 2000);
              isSet = true
            }
          })
        },
        // 自动高亮饼图
        autoHightLight(option,flag) {
          let self = this;
          let dataLen = option.series[0].data.length;
          if(flag === 0){
            // 取消之前高亮的图形
            self.securitySum.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: self.app.securitySumIndex
            });
            self.app.securitySumIndex = (self.app.securitySumIndex + 1) % dataLen;
            // 高亮当前图形
            self.securitySum.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: self.app.securitySumIndex
            });
          }else{
            // 取消之前高亮的图形
            self.inOutPortSum.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: self.app.inOutPortSumIndex
            });
            self.app.inOutPortSumIndex = (self.app.inOutPortSumIndex + 1) % dataLen;
            // 高亮当前图形
            self.inOutPortSum.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: self.app.inOutPortSumIndex
            });
          }
        },
        // 地图

        getBMap(){
          let self = this;
          let bmap = {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  'featureType': 'land',     //调整土地颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#081734'
                  }
                },
                {
                  'featureType': '北京',     //调整土地颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#045590'
                  }
                },
                {
                  'featureType': 'building',   //调整建筑物颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#04406F'
                  }
                },
                {
                  'featureType': 'building',   //调整建筑物标签是否可视
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'highway',     //调整高速道路颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#015B99'
                  }
                },
                {
                  'featureType': 'highway',    //调整高速名字是否可视
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'arterial',   //调整一些干道颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color':'#003051'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'water',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#044161'
                  }
                },
                {
                  'featureType': 'subway',    //调整地铁颜色
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#003051'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'all',     //调整所有的标签的边缘颜色
                  'elementType': 'labels.text.stroke',
                  'stylers': {
                    'color': '#313131'
                  }
                },
                {
                  'featureType': 'all',     //调整所有标签的填充颜色
                  'elementType': 'labels.text.fill',
                  'stylers': {
                    'color': '#FFFFFF'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    'lightness': -65
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'all',
                  'stylers': {
                    'lightness': -40
                  }
                },
                {
                  'featureType': 'boundary',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#8b8787',
                    'weight': '0.5',
                    'lightness': -29
                  }
                }]
            }
          };
          self.passengerSum = echarts.init(document.getElementById('passengerSum'));
          self.map = new BMap.Map('passengerSum');
          let provList = new Array(["黑龙江","#0b5e96"],["吉林省","#0b5e96"],["辽宁","#3494b9"],
            ["内蒙古","#045590"],["河北","#558899"],["北京","#3494b9"],["天津","#045590"],
            ["山东省","#0b5e96"],["江苏","#0b5e96"],["上海","#3494b9"],["浙江","#0b5e96"],
            ["福建","#0b5e96"],["台湾","#558899"],["广东","#3494b9"],["香港","#F09ABD"],
            ["澳门","#F09ABD"],["海南","#0b5e96"],["广西","#045590"],["云南","#3494b9"],
            ["西藏","#3494b9"],["新疆","#0b5e96"],["甘肃","#558899"],["青海","#045590"],
            ["四川","#0b5e96"],["贵州","#045590"],["重庆","#558899"],["湖南","#045590"],
            ["江西","#558899"],["湖北","#558899"],["安徽","#045590"],["河南","#0b5e96"],
            ["陕西","#558899"],["山西","#045590"],["宁夏","#558899"]); //通过取色器获取各省颜色

          self.map.centerAndZoom(new BMap.Point(104.114129,37.550339), 5);
          self.map.setMapStyle({styleJson:bmap.mapStyle.styleJson});
          // map.addControl(new BMap.NavigationControl()); // 缩放控件
          // map.addControl(new BMap.ScaleControl()); // 比例尺
          self.map.enableScrollWheelZoom();
          function getBoundary(provItem){
            let bdary = new BMap.Boundary();
            bdary.get(provItem[0], function(rs){       //获取行政区域
              let count = rs.boundaries.length; //行政区域的点有多少个
              if (count === 0) {
                // alert('未能获取当前输入行政区域');
                return ;
              }
              let pointArray = [];
              for (let i = 0; i < count; i++) {
                let ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: provItem[1], fillColor: provItem[1]}); //建立多边形覆盖物
                self.map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
              }
            });
          }
          // setTimeout(function(){
            provList.forEach(function(item){
              getBoundary(item);
            });
          // }, 10);
          function getHeatMap(){
            let heatmapOverlay = new BMapLib.HeatmapOverlay({radius:20,maxOpacity:0.7,gradient:{
                '0.2':'#e803eb',
                '0.4':'#207cca',
                '0.6':'#31ff00',
                '0.8':'#f8ff00',
                '0.95':'#ff0500'
              }});
            self.map.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({data:self.mapList});
            heatmapOverlay.show();
          }

          setTimeout(function () {
            getHeatMap();
          },6000)
          let option = {
            // bmap: bmap,
            backgroundColor: '#404a59',
            bmap: self.map,
            // series: series
            series: {}
          };

          // 使用刚指定的配置项和数据显示图表。
          self.passengerSum.setOption(option, true);
          window.addEventListener("resize", function() {
            self.passengerSum.resize();
          });
        },
        // 热力图加载
        // getHeat(){
        //   let self = this;
        //   let heatmapOverlay = new BMapLib.HeatmapOverlay({radius:20,maxOpacity:0.7,gradient:{
        //       '0.2':'#e803eb',
        //       '0.4':'#207cca',
        //       '0.6':'#31ff00',
        //       '0.8':'#f8ff00',
        //       '0.95':'#ff0500'
        //     }});
        //   self.map.addOverlay(heatmapOverlay);
        //   heatmapOverlay.setDataSet({data:self.mapList});
        //   heatmapOverlay.hide();
        // },

        // 底部右侧左柱状图
        getBar(mapName){
          let self = this;
          let legendData = [];
          let seriesData = [];
          for(let item of self.flightList){
            legendData.push(item.key+'类');
            seriesData.push({
              name: item.key+'类',
              type: 'bar',
              legendHoverLink:false,
              data: item.value,
              barWidth:14,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: 'white',
                    fontSize:14
                  }
                }
              }
            })
          }
          seriesData.push({
            type: "pictorialBar",
            symbol: "image://../../../static/img/triangle.png",
            symbolSize: [43, 36],
            symbolOffset: [-47, 0],
            symbolBoundingData: 300,
            data:[1,2],
            zlevel: 100,
            z: 100
          })
          let option = {
            legend: {
              data: legendData,
              bottom:'10',
              itemWidth:10,
              itemHeight:10,
              textStyle:{
                color:'#fff'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              top:'20',
              containLabel: true
            },
            color:['#65f5f3','#277ace'],
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLabel: {
                textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
              },
              axisLine:{
                show:false
              },
              splitLine:{
                lineStyle:{
                  color:'#494446',
                  type:'dashed'
                },
                interval:1
              }
            },
            yAxis: {
              type: 'category',
              data: ['昨日','今日'],
              axisLine:{
                show:false
              },
              axisLabel: {
                margin: 50,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              },
            },
            series: seriesData
          };
          mapName.setOption(option);
          window.addEventListener("resize", function() {
            mapName.resize();
          });
        },
        // 底部右侧右柱状图
        getBarRight(mapName){
          let self = this;
          let option = {
            grid:{
              top:'25%',
              bottom:'15%'
            },
            legend: {
              data: [{
                name:'昨日客座率',
                icon:'rect'
              },{
                name:'今日客座率',
                icon:'rect'
              }],
              top: 0,
              right:0,
              itemWidth:10,
              itemHeight:10,
              textStyle: {
                color: "#ffffff"
              }
            },
            xAxis: {
              data: self.plfList.xAxis,
              axisTick: {show: false},
              axisLabel:{
                color:'#fff'
              },
              axisLine:{
                lineStyle:{
                  color:'#fff'
                }
              }
            },
            yAxis: [
              {
                type: "value",
                name: "%",
                splitLine: {
                  show: true,
                  lineStyle:{
                    color:'#494446',
                    type:'dashed'
                  }
                },
                axisTick: {show: false},
                axisLabel: {
                  color: '#fff',
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                }
              },
              {
                type: "value",
                name: "%",
                position: "right",
                max:100,
                interval:20,
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle:{
                    color:'#fff'
                  }
                },
                axisLabel: {
                  color: "#fff"
                }
              },
            ],
            animationDurationUpdate: 1200,
            series: [{
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#494446'
                }
              },
              silent: true,
              barWidth: 14,
              barGap: '-100%', // 背景柱图
              data: self.plfList.bgData
            }, {
              name:'今日客座率',
              type: 'line',
              yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              showAllSymbol: true, //显示所有图形。
              symbol: "circle", //标记的图形为实心圆
              symbolSize: 10, //标记的大小
              itemStyle: {
                //折线拐点标志的样式
                color: "#fbf320"
              },
              lineStyle: {
                color: "#fbf320"
              },
              z:11,
              // label:{
              //   formatter: function(params) {
              //     console.log(params.value)
              //     if (params.value === 0) {
              //       params.value = '';
              //     }
              //     return params.value;
              //   },
              // },
              data: self.plfList.nowData
            }, {
              name:'昨日客座率',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#2e7ccb'
                }
              },
              barWidth: 14,
              z: 10,
              data: self.plfList.lastData
            },
            ]
          };
          mapName.setOption(option);
          window.addEventListener("resize", function() {
            mapName.resize();
          });
        }
      }
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
  #passengerContainer{
    height: 100vh;
    width: 100%;
    background-image: url('./img/passengerBg.jpg');
    background-color: rgba(0, 0, 0, 0);
    transform: scale(1);
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    transform-origin: left top 0px;
  }
  #passengerContainer>div{
    box-sizing: border-box;
  }
  .passenger-title{
    color: white;
    height: 8%;
    padding: 1rem 0 0.8rem;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
  .passenger-top{
    width: 100%;
    height: 56%;
  }
  .passenger-top>div{
    display: inline-block;
    vertical-align: middle;
  }
  .passenger-bottom{
    width: 100%;
    height: 33%;
    margin-top: 1%;
  }
  .top-left,.top-right{
    width: 30%;
    height: 100%;
  }
  .top-right{
    width: 21%;
    padding:0 5px;
    margin-top: -10px;
  }
  .top-center{
    width: 48%;
    height: 100%;
  }
  .left-top>div:first-child{
    width: 100%;
    height: 40px;
    background: url("../../../static/img/accessicon.gif") no-repeat;
    background-position: center center;
    background-size: 100%;
  }
  .left-bottom>div:first-child{
    width: 120%;
    height: 20px;
    position: absolute;
    background: url("../../../static/img/donxian.gif") no-repeat;
    background-position: center left;
    background-size: 100%;
  }
  .left-top,.left-bottom{
    height: 50%;
    position: relative;
  }
  .left-main{
    position: absolute;
    width: 100%;
    height: calc(100% - 40px);
    color: #fff;
    font-size: 24px;
    top: 25px;
  }
  .left-main>div{
    position: relative;
    padding-left: 10%;
    height: 50%;
    /*margin-bottom: 10%;*/
  }
  .main-right{
    position: absolute !important;
    right: 0;
    top: 0;
    height: 100% !important;
  }
  .square{
    width: 15px;
    height: 111px;
    position: absolute;
    left: 10px;
    top: 15%;
    background: #084e78;
  }
  .number-box{
    height: auto;
    background-color: rgb(80,54,84);
    display: inline-block;
    letter-spacing: 0.02em;
    text-indent: 0.02em;
    line-height: normal;
    margin-right: 0.2em;
    border-radius: 6px;
  }
  .pointTitle{
    font-weight: bold;
    color: #fff;
    font-size: 24px;
    margin-right: 20px;
  }
  .piePicture{
    height: 85%;
    width: 200px;
  }

  .right-top,.right-bottom{
    width: 100%;
    height: 50%;
  }
  .outCity{
    height: 70%;
    font-size: 20px;
    color: #44d3e4;
  }
  .city-title{
    background: #0c3c50;
    padding: 0.5rem 0;
    font-size: 20px;
    color: #44d3e4;
  }
  .city-title>span{
    display: inline-block;
    text-align: center;
  }
  .city-main>div>div{
    height: 20%;
    line-height: 2rem;
  }
  .city-main>div>div:nth-child(2n){
    background: rgba(6,70,86,0.26);
  }
  .city-main>div>div>span{
    display: inline-block;
    text-align: center;
  }
  .circle{
    padding:0 6px;
    border-radius: 50%;
    background: #0c3c50;
  }

  .passenger-bottom{
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 0 20px;
  }
  .passenger-bottom>div{
    position: relative;
  }
  .bottom-left{
    width: 18%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("img/bottomLeft.png") 10 10;
    border-image: url("img/bottomLeft.png") 10 10;
    background: none;
  }
  .bottom-right{
    width: 81%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("img/bottomRight.png") 10 10;
    border-image: url("img/bottomRight.png") 10 10;
    background: none;
    display: flex;
    justify-content: space-between;
    padding:10px 15px;
  }
  .right-left{
    width: 32%;
  }
  .right-right{
    width: 67%;
  }
  .flightSorties,.plfSum{
    height: 95%;
  }
  .font50{
    color: #63FCFF;
    font-size: 50px;
    display: flex;
    justify-content: left;
    align-items: flex-end;
    padding-top: 1rem;
  }
  .font30{
    color: #63FCFF;
    font-size: 30px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .font30:last-child{
    padding-top:0.6rem;
  }
  .font24{
    font-size: 24px;
  }
  .font20{
    font-size: 20px;
  }
  .font42{
    color: #63FCFF;
    display: flex;
    justify-content: left;
    align-items: flex-end;
    font-size: 42px;
    padding-top: 1rem;
  }
  @media screen and (min-width: 1024px) {
    .piePicture{
      width: 117px;
    }
    .pointTitle{
      font-size: 14px;
      margin-right: 5px;
    }
    .square{
      width: 8px;
      height: 59px;
    }
    .font50{
      font-size: 24px;
    }
    .font42{
      font-size: 20px;
    }
    .font30{
      font-size: 18px;
    }
    .font24{
      font-size: 16px;
    }
    .font20{
      font-size: 12px;
    }
    .passenger-title{
      font-size: 26px;
    }
    .top-left{
      padding-left: 10px;
    }
    .left-bottom>div:first-child{
      left: -30px;
    }
    .city-title{
      font-size: 12px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 12px;
    }
  }
  @media screen and (min-width: 1280px) {
    .piePicture{
      width: 146px;
    }
    .pointTitle{
      font-size: 16px;
      margin-right: 5px;
    }
    .square{
      width: 10px;
      height: 73px;
    }
    .font50{
      font-size: 26px;
    }
    .font42{
      font-size: 24px;
    }
    .font30{
      font-size: 22px;
    }
    .font24{
      font-size: 18px;
    }
    .font20{
      font-size: 14px;
    }
    .passenger-title{
      font-size: 26px;
    }
    .top-left{
      padding-left: 10px;
    }
    .left-bottom>div:first-child{
      left: -40px;
    }
    .city-title{
      font-size: 14px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1366px) {
    .piePicture{
      width: 156px;
    }
    .pointTitle{
      font-size: 18px;
      margin-right: 5px;
    }
    .square{
      width: 10px;
      height: 78px;
    }
    .font50{
      font-size: 28px;
    }
    .font42{
      font-size: 26px;
    }
    .font30{
      font-size: 26px;
    }
    .font24{
      font-size: 20px;
    }
    .font20{
      font-size: 16px;
    }
    .passenger-title{
      font-size: 28px;
    }
    .top-left{
      padding-left: 15px;
    }
    .left-bottom>div:first-child{
      left: -45px;
    }
    .city-title{
      font-size: 14px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1400px) {
    .piePicture{
      width: 160px;
    }
    .pointTitle{
      font-size: 20px;
      margin-right: 5px;
    }
    .square{
      width: 10px;
      height: 80px;
    }
    .font50{
      font-size: 32px;
    }
    .font42{
      font-size: 28px;
    }
    .font30{
      font-size: 26px;
    }
    .font24{
      font-size: 20px;
    }
    .font20{
      font-size: 16px;
    }
    .passenger-title{
      font-size: 28px;
    }
    .top-left{
      padding-left: 15px;
    }
    .left-bottom>div:first-child{
      left: -45px;
    }
    .city-title{
      font-size: 16px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1440px) {
    .piePicture{
      width: 165px;
    }
    .pointTitle{
      font-size: 20px;
      margin-right: 5px;
    }
    .square{
      width: 11px;
      height: 82px;
    }
    .font50{
      font-size: 34px;
    }
    .font42{
      font-size: 28px;
    }
    .font30{
      font-size: 26px;
    }
    .font24{
      font-size: 20px;
    }
    .font20{
      font-size: 16px;
    }
    .passenger-title{
      font-size: 30px;
    }
    .top-left{
      padding-left: 15px;
    }
    .left-bottom>div:first-child{
      left: -45px;
    }
    .city-title{
      font-size: 18px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1600px) {
    .piePicture{
      width: 165px;
    }
    .pointTitle{
      font-size: 20px;
      margin-right: 5px;
    }
    .square{
      width: 11px;
      height: 82px;
    }
    .font50{
      font-size: 34px;
    }
    .font42{
      font-size: 28px;
    }
    .font30{
      font-size: 26px;
    }
    .font24{
      font-size: 20px;
    }
    .font20{
      font-size: 16px;
    }
    .passenger-title{
      font-size: 32px;
    }
    .top-left{
      padding-left: 15px;
    }
    .left-bottom>div:first-child{
      left: -50px;
    }
    .city-title{
      font-size: 16px;
    }
    .bottom-left,.bottom-right{
      padding: 5px 0 5px 5px;
    }
    .bottom-left .left-main{
      bottom: 10px;
      top: 0;
      height: 100%;
    }
    .passenger-bottom>div .square{
      left: 5px;
    }
    .outCity{
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1920px) {
    .piePicture{
      height: 205px;
      width: 200px;
    }
    .pointTitle{
      font-size: 24px;
      margin-right: 20px;
    }
    .square{
      width: 15px;
      height: 111px;
    }
    .font50{
      font-size: 50px;
    }
    .font42{
      font-size: 42px;
    }
    .font30{
      font-size: 30px;
    }
    .font24{
      font-size: 24px;
    }
    .font20{
      font-size: 20px;
    }
    .passenger-title{
      font-size: 40px;
    }
    .top-left{
      padding-left: 30px;
    }
    .left-bottom>div:first-child{
      left: -60px;
    }
    .city-title{
      font-size: 20px;
    }
    .bottom-left,.bottom-right{
      padding: 10px 0 10px 10px;
    }
    .passenger-bottom>div .square{
      left: 20px;
    }
    .city-main>div>div{
      height: 20%;
    }
    .outCity{
      font-size: 20px;
    }
  }
</style>
