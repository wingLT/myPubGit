<template>
  <div id="RepairContainer">
    <header>
      <div class="repair-title">
        <div class="title-bg">
          <span class="title-gif"></span>
          成都双流国际机场报修信息统计展示
        </div>
      </div>
    </header>
    <div class="repair-main">
      <div style="width: 71%;">
        <div style="display: flex;justify-content: space-between;height: 64%">
          <div style="width: 66%">
            <div class="main-top-top">
              <div class="top-title">
                <div class="title-size">
                  短期工单实况
                </div>
                <div>
                  <span>
                    <span class="circle waitCir"></span>
                    <span>待处理</span>
                  </span>
                  <span>
                    <span class="circle inCir"></span>
                    <span>处理中</span>
                  </span>
                  <span>
                    <span class="circle outCir"></span>
                    <span>已作废</span>
                  </span>
                </div>
              </div>
              <div>
                <div class="main-title">
                  <p>
                    <span class="circle inCir"></span>
                    <!--<marquee behavior="scroll" style="width: 85%;" class="repairTop-title animated flipInX spanNone">-->
                      <!-- - {{orderList.shortIng.title}}-->
                    <!--</marquee>-->
                    <span style="display: inline-block;width: 85%;overflow: hidden;vertical-align: middle">
                      <span class="repairTop-title animated flipInX">- {{orderList.shortIng.title}}</span>
                    </span>
                  </p>
                  <p>
                    {{orderList.shortIng.time}}
                  </p>
                  <p>
                    {{orderList.shortIng.step}}
                  </p>
                  <div class="autoLine"></div>
                  <div class="title-ab">
                    {{orderList.shortIng.state}}
                  </div>
                </div>
                <div class="main-title">
                  <p>
                    <span class="circle outCir"></span>
                    <!--<marquee behavior="scroll" style="width: 85%;" class="repairTop-title animated flipInX spanNone">-->
                      <!-- - {{orderList.shortEnd.title}}-->
                    <!--</marquee>-->
                    <span style="display: inline-block;width: 85%;overflow: hidden;vertical-align: middle">
                      <span class="repairTop-title animated flipInX">- {{orderList.shortEnd.title}}</span>
                    </span>
                  </p>
                  <p>
                    {{orderList.shortEnd.time}}
                  </p>
                  <p>
                    {{orderList.shortEnd.note}}
                  </p>
                  <div class="autoLine"></div>
                  <div class="title-ab">
                    {{orderList.shortEnd.state}}
                  </div>
                </div>
                <div class="main-title">
                  <p>
                    <span class="circle waitCir"></span>
                    <!--<marquee behavior="scroll" style="width: 85%;" class="repairTop-title animated flipInX spanNone">-->
                      <!-- - {{orderList.shortStart.title}}-->
                    <!--</marquee>-->
                    <span style="display: inline-block;width: 85%;overflow: hidden;vertical-align: middle">
                      <span class="repairTop-title animated flipInX">- {{orderList.shortStart.title}}</span>
                    </span>
                  </p>
                  <div class="title-ab" style="top: auto;bottom: 0;transform: none">
                    {{orderList.shortStart.state}}
                  </div>
                </div>
              </div>
            </div>
            <div class="main-top-bottom">
              <div class="top-title">
                <div class="title-size">
                  长期工单实况
                </div>
              </div>
              <div class="main-title">
                <p>
                  <span class="circle inCir"></span>
                  <!--<marquee behavior="scroll" style="width: 85%;" class="repairTop-title animated flipInX spanNone">-->
                    <!-- - {{orderList.longTerm.title}}-->
                  <!--</marquee>-->
                  <span style="display: inline-block;width: 85%;overflow: hidden;vertical-align: middle">
                    <span class="repairTop-title animated flipInX">- {{orderList.longTerm.title}}</span>
                  </span>
                </p>
                <p>
                  {{orderList.longTerm.time}}
                </p>
                <p>
                  {{orderList.longTerm.step}}
                </p>
                <div class="title-ab">
                  {{orderList.longTerm.state}}
                </div>
              </div>
            </div>
          </div>
          <div style="width: 34%">
            <div class="main-top-center">
             <div class="top-title">
               <div class="title-size">
                 当前维修人员排名
               </div>
             </div>
              <div class="top-main">
                <div class="person-title">
                  <span style="width: 10%"></span>
                  <span style="width: 40%">姓名</span>
                  <span style="width: 20%">数量</span>
                  <span style="width: 20%">分数</span>
                </div>
                <div class="repair-person swiper-container">
                  <div class="person-main swiper-wrapper">
                    <div class="swiper-slide" v-for="(person,index) of repairPerson" :key="index">
                      <div v-for="(item,key) in person" class="slide-li">
                       <span style="width: 10%">
                         <span class="person-circle">{{(key+1)+index*10}}</span>
                       </span>
                        <span style="width: 40%">{{item.USER_NAME}}</span>
                        <span style="width: 20%;">{{item.COUNT}}</span>
                        <span style="width: 20%">{{item.SCORE}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;height: 35%">
          <div class="main-bottom-left">
            <div class="top-title">
              <div class="title-size">
                故障标签数量统计
              </div>
            </div>
            <div id="faultLabelSum" class="faultLabelSum"></div>
          </div>
          <div class="main-bottom-center">
            <div class="top-title">
              <div class="title-size">
                各系统数量统计
              </div>
            </div>
            <div id="systemSum" class="systemSum"></div>
          </div>
        </div>
      </div>
      <div style="width: 28%;">
        <div class="main-top-right">
          <div class="top-title">
            <div class="title-size">
              当前工单统计
            </div>
          </div>
          <div class="right-top">
            <div>
              <p>总计</p>
              <div>
                <span class="right-fontB font01">{{countList.total}}</span>单
              </div>
            </div>
            <div>
              <p>待审核</p>
              <div>
                <span class="right-fontB font29">{{countList.toBeAudited}}</span>单
              </div>
            </div>
          </div>
          <div class="autoLine"></div>
          <div class="right-bottom">
            <div>
              <p>待处理</p>
              <div>
                <span class="right-fontS font29">{{countList.pending}}</span>单
              </div>
            </div>
            <div>
              <p>处理中</p>
              <div>
                <span class="right-fontS font16">{{countList.processing}}</span>单
              </div>
            </div>
            <div>
              <p>已完成</p>
              <div>
                <span class="right-fontS font01">{{countList.solved}}</span>单
              </div>
            </div>
            <div>
              <p>已作废</p>
              <div>
                <span class="right-fontS font92">{{countList.abandoned}}</span>单
              </div>
            </div>
          </div>
        </div>
        <div class="main-bottom-right">
          <div class="top-title">
            <div class="title-size">
              区域报修均值对比
            </div>
          </div>
          <div id="regionSum" class="regionSum"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import '../../../static/lib/chain1'
  import '../../../static/lib/world'
  import '../../../static/lib/echarts-wordcloud.min'
  import Swiper from '../../../static/js/swiper.min'
  import '../../../static/css/swiper.min.css'
  import {Utils} from '../../../static/js/Utils'
  import {repairMap} from "../../API/RepairInformationStatistics";

  export default {
      name: "RepairInformationStatistics",
      created(){
        document.title = '报修信息统计';
      },
      mounted(){
        let self = this;
        this.getWidth();
        window.onresize = function(){
          self.getWidth();
        };
        this.getAllData();
      },
      data(){
          return {
            // 当前工单统计
            countList:{
              total: null,
              toBeAudited: null,
              pending: null,
              processing: null,
              solved: null,
              abandoned: null
            },
            // 短/长期工单统计
            orderList:{
              shortIng:[],
              shortEnd:[],
              shortStart:[],
              longTerm:[]
            },
            // swiper
            repairPerson:[],
            swiperMap:'',
            // 故障标签左下
            faultLabelList:{
              xAxis:[],
              data:[],
              max:[]
            },
            faultLabelSum:'',
            // 系统统计下中
            systemList:{
              yAxis:[],
              finishList:[],
              allList:[],
              max:[]
            },
            systemSum:'',
            // 区域报修右下
            regionSum:'',
            regionList:{
              day:[],
              month:[],
              xAxis:[]
            },
            time:1,
            // 动画
            animation:{
              animation0:null,
              animation1:null,
              animation2:null,
              animation3:null,
            },
            // 标题是否需要滚动
            rollList:[]
          }
      },
      methods:{
        getAllData(){
          let self = this;
          self.getRepairArea();
          self.getCount();
          self.getOrder();
          self.getPerson();
          self.getSystem();
          self.getTag();
          setTimeout(function () {
            self.getAllData()
          }, 1000 * 60 * self.time)
        },
        // 获取区域报警
        async getRepairArea(){
            let self = this;
            let result = await repairMap.getRepairArea().then((e)=>{
              if(e.status === 200){
                if(self.regionSum){
                  self.destroyEcharts(self.regionSum)
                }
                self.regionList = {
                  day:[],
                  month:[],
                  xAxis:[]
                };
                for(let item of e.data){
                  self.regionList.day.push(item.Day);
                  self.regionList.month.push(item.Month);
                  self.regionList.xAxis.push(item.Name);
                }
                self.getBarRight();
              }
            }).catch((err)=>{

            })
          },
        // 获取当前工单统计
        async getCount(){
          let self = this;
          let result = await repairMap.getCount().then((e)=>{
            if(e.status === 200){
              self.countList = {
                total: e.data.total,
                toBeAudited: e.data.toBeAudited,
                pending: e.data.pending,
                processing: e.data.processing,
                solved: e.data.solved,
                abandoned: e.data.abandoned
              }
            }
          }).catch((err)=>{

          })
        },
        // 短/长期工单实况
        async getOrder(){
          let self = this;
          if(self.animation.animation0){
            clearInterval(self.animation.animation0);
          }
          if(self.animation.animation1){
            clearInterval(self.animation.animation1);
          }
          if(self.animation.animation2){
            clearInterval(self.animation.animation2);
          }
          if(self.animation.animation3){
            clearInterval(self.animation.animation3);
          }
          let result = await repairMap.getOrder().then((e)=>{
            if(e.status === 200){
              self.orderList = {
                shortIng:null,
                shortEnd:null,
                shortStart:null,
                longTerm:null
              };
              self.orderList = {
                shortIng:e.data.shortIng[0],
                shortEnd:e.data.shortEnd[0],
                shortStart:e.data.shortStart[0],
                longTerm:e.data.longTerm[0]
              };
              self.$nextTick(()=>{
                self.titleMove();
              })
              self.flipSpan();
            }
          }).catch((err)=>{

          })
        },
        // 维修人员
        async getPerson(){
          let self = this;
          let result = await repairMap.getPerson().then((e)=>{
            if(e.status === 200){
              if (self.swiperMap) {
                self.swiperMap.destroy(false);
              }
              self.repairPerson = [];
              let num = 10 - (e.data.length%10);
              let length = (e.data.length + (num === 10 ? 0 : num))/10;
              let list = e.data;
              for(let i = 0;i<length;i++){
                self.repairPerson.push([])
              }
              for(let j = 0;j<num;j++){
                list.push({
                  SCORE: '-',
                  COUNT: '-',
                  USER_NAME: '-',
                  RANKING: '-'
                })
              }
              for(let x = 0 ; x < length;x++){
                for(let y = (x*10);y < (x+1)*10 ; y++){
                  self.repairPerson[x].push(list[y]);
                }
              }
              self.$nextTick(()=>{
                self.swiperMap = new Swiper('.swiper-container', {
                  direction: 'vertical', // 垂直切换选项
                  loop: true, // 循环模式选项
                  autoplay:true,
                })
                // self.swiperMap.detachEvents();
                // self.swiperMap.resize();
              })
            }
          }).catch((err)=>{

          })
        },
        // title滚动
        titleMove(){
          let pWidth = $('.main-title>p:first-child');
          let titleWidth = $('.main-title>p:first-child span.repairTop-title');
          for(let i = 0 ; i < pWidth.length ;i++){
            if(titleWidth[i].clientWidth > (pWidth[i].clientWidth-126)){
              titleWidth.eq(i).liMarquee({
                circular: false
              });
            }
          }
        },
        // 系统数量统计
        async getSystem(){
          let self = this;
          let result = await repairMap.getSystem().then((e)=>{
            if(e.status === 200){
              if(self.systemSum){
                self.systemSum.destroy(false);
              }
              self.systemList = {
                yAxis:[],
                finishList:[],
                allList:[],
                max:[]
              }
              let allMax = 0;
              let finishMax = 0;
              for(let item of e.data){
                if(item.State === '全部工单'){
                  self.systemList.yAxis.push(item.Name);
                  if(parseInt(item.Num) > parseInt(allMax)){
                    allMax = parseInt(item.Num);
                  }
                }else{
                  if(parseInt(item.Num) > parseInt(finishMax)){
                    finishMax = parseInt(item.Num);
                  }
                }
              }
              let max = parseInt(10-(allMax+finishMax)%10) + parseInt(allMax+finishMax);
              for(let item1 of self.systemList.yAxis){
                for(let item2 of e.data){
                  if(item2.Name === item1 && item2.State === '已完成工单'){
                    self.systemList.finishList.push(item2.Num);
                  }else if(item2.Name === item1 && item2.State === '全部工单'){
                    self.systemList.allList.push(item2.Num);
                  }
                }
                self.systemList.max.push(max);
              }
              self.getSystemSum();
            }
          }).catch((err)=>{

          })
        },
        // 故障标签
        async getTag(){
          let self = this;
          let result = await repairMap.getTag().then((e)=>{
            if(e.status === 200){
              if(self.faultLabelSum){
                self.faultLabelSum.destroy(false);
              }
              self.faultLabelList = {
                xAxis:[],
                data:[],
                max:[]
              };
              let max = 0;
              for(let item of e.data){
                if(item.NUM > max){
                  max = item.NUM;
                }
              }
              for(let item of e.data){
                self.faultLabelList.xAxis.push(item.NAME);
                self.faultLabelList.data.push(item.NUM);
                self.faultLabelList.max.push(max);
              }

              self.getPictorialBar();
            }
          }).catch((err)=>{

          })
        },
        flipSpan(){
          let self = this;
          let titleList = $('.repairTop-title');
          for(let i = 0 ; i< titleList.length;i++){
            self.animation['animation'+i] = setInterval(function () {
              $('.repairTop-title').eq(i).removeClass('flipInX').addClass('flipOutX')
              setTimeout(function () {
                $('.repairTop-title').eq(i).removeClass('flipOutX').addClass('flipInX')
              },500)
            },10000)
          }
        },
        // 左下柱状
        getPictorialBar() {
          let self = this;
          self.faultLabelSum = echarts.init(document.getElementById("faultLabelSum"));
          let option = {
            grid: {
              left: '6%',
              right: '2%',
              top: '15%',
              bottom: '30%',
            },
            xAxis: [{
              data: self.faultLabelList.xAxis,
              splitLine: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#9696a4',
                  type: 'solid'
                }
              },

              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '10',
                },
                interval: 0,
                rotate: -40,
                formatter: '{value}',
              },
            }],
            yAxis: {
              type: 'value',
              name: '单位',
              minInterval: .6,
              nameTextStyle: {
                color: '#fff',
                align: 'left'
              },
              axisLine: {
                lineStyle: {
                  color: '#9696a4'
                }
              },
              splitLine: {
                show: true,
                lineStyle:{
                  type:'dashed',
                  color:'#2e2f3e'
                }
              },
              axisLabel: {
                color: '#fff',
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
                  color: '#65f5f3'
                }
              },
              symbolRepeat: true,
              symbolSize: [25, 2],
              symbolMargin: 1,
              z:10,
              label:{
                normal:{
                  show:true,
                  position: 'top',
                  textStyle:{
                    color:'#fff',
                    fontSize:'12'
                  }
                }
              },
              data: self.faultLabelList.data
            },{
              name: 'dotted',
              type: 'pictorialBar',
              symbol: 'rect',
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              },
              barGap:'-100%',
              symbolRepeat: true,
              symbolSize: [1, 1],
              symbolMargin: 1,
              z: 9,
              data: self.faultLabelList.max
            }]
          };

          self.faultLabelSum.setOption(option, true);
          window.addEventListener("resize", function() {
            self.faultLabelSum.resize();
          });
        },
        // 下中柱图
        getSystemSum(){
          let self = this;
          self.systemSum = echarts.init(document.getElementById("systemSum"));

          let option = {
            grid:{
              top:'8%',
              bottom:'15%',
              left:'15%'
            },
            legend:{
              top:0,
              right:10,
              itemWidth:10,
              itemHeight:10,
              textStyle:{
                color:'#fff',
                fontSize:'10'
              }
            },
            xAxis: {
              show: true,
              name:'单',
              nameTextStyle:{
                color:'#fff'
              },
              type:'value',
              axisLabel:{
                color:'#fff',
                fontSize:'12'
              },
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#9896a4'
                }
              },
              minInterval:self.systemList.max[0],
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
            },
            yAxis: [{
              type:'category',
              show: true,
              data: self.systemList.yAxis,
              axisLabel:{
                color:'#fff',
                fontSize:'12',
                interval:0
              },
              inverse: true,
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#9896a4'
                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
            },{
              type:'category',
              show: false,
              data: self.systemList.yAxis,
            }],
            series: [
              {
                name: '已完成工单',
                type: 'bar',
                stack: '总量',
                yAxisIndex:0,
                barWidth:5,
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: '#65f5f3',
                  }
                },
                data: self.systemList.finishList
              },
              {
                name: '全部工单',
                yAxisIndex:0,
                type: 'bar',
                barWidth:5,
                stack: '总量',
                itemStyle: {
                  normal: {
                    barBorderRadius: 30,
                    color: '#277ace',
                  }
                },
                data: self.systemList.allList
              },
              {
                type: 'bar',
                barGap: '-100%',
                data: self.systemList.max,
                barWidth: 10,
                yAxisIndex:1,
                itemStyle: {
                  normal: {
                    color: 'none',
                    borderColor: '#00c1de',
                    borderWidth: 1,
                    barBorderRadius: 15,
                  }
                }
              }
            ]
          };
          self.systemSum.setOption(option, true);
          window.addEventListener("resize", function() {
            self.systemSum.resize();
          });
        },
        // 底部右侧右柱状图
        getBarRight(){
          let self = this;
          self.regionSum = echarts.init(document.getElementById("regionSum"));
          let option = {
            grid:{
              top:'15%',
              bottom:'15%'
            },
            legend: {
              data: [{
                name:'月均值',
                icon:'rect'
              },{
                name:'当日',
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
              data:self.regionList.xAxis,
              axisTick: {show: false},
              axisLine:{
                lineStyle:{
                  color:'#fff'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '10',
                },
                interval: 0,
                rotate: -40,
                formatter: '{value}',
              },
            },
            yAxis: [
              {
                type: "value",
                name: "个",
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
                name: "个",
                position: "right",
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
                  color: "#fff",
                }
              },
            ],
            animationDurationUpdate: 1200,
            series: [{
              name:'当日',
              type: 'line',
              yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              showAllSymbol: true, //显示所有图形。
              symbol: "circle", //标记的图形为实心圆
              symbolSize: 7, //标记的大小
              itemStyle: {
                //折线拐点标志的样式
                color: "#fbf320"
              },
              lineStyle: {
                color: "#fbf320"
              },
              z:11,
              label:{
                normal:{
                  show:true,
                  position: 'top',
                  textStyle:{
                    color:'#fff',
                    fontSize:'12'
                  }
                }
              },
              data: self.regionList.day
            }, {
              name:'月均值',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#2e7ccb'
                }
              },
              barWidth: 8,
              z: 10,
              data: self.regionList.month
            },
            ]
          };
          self.regionSum.setOption(option);
          window.addEventListener("resize", function() {
            self.regionSum.resize();
          });
        },
        // 实时获取屏幕宽度
        getWidth(){
          let docWidth = document.body.clientWidth;
          let html=document.documentElement;
          if(docWidth >= 1920){
            html.style.fontSize= '16px'
          }else if(docWidth >= 1600){
            html.style.fontSize= '13px'
          }else if(docWidth >= 1440){
            html.style.fontSize= '13px'
          }else if(docWidth >= 1400){
            html.style.fontSize= '12px'
          }else if(docWidth >= 1366){
            html.style.fontSize= '12px'
          }else if(docWidth >= 1280){
            html.style.fontSize= '12px'
          }else{
            html.style.fontSize= '12px'
          }
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/animate.min.css';
  * {
    box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -icab-box-sizing: border-box;
    -khtml-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  #RepairContainer{
    width: 100%;
    height: 100vh;
    background-image: url('./img/passengerBg.jpg');
    background-color: rgba(0, 0, 0, 0);
    transform: scale(1);
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    transform-origin: left top 0px;
  }
  .repair-title{
    color: white;
    height: 10%;
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    padding-top: 30px;
    overflow: hidden;
  }
  .title-gif{
    position: absolute;
    top: -120px;
    display: inline-block;
    width: 100%;
    height: 200px;
    left: 50%;
    transform: translateX(-50%);
    background: url("../../../static/img/accessicon.gif") no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .title-bg{
    display: inline-block;
    position: relative;
    width: 50rem;
    height: 100%;
    padding: .5rem;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
  }
  .repair-main{
    height: 89%;
    display: flex;
    flex-wrap: wrap;
    padding:10px 20px;
  }
  .repair-main>div{
    display: inline-block;
    box-sizing: border-box;
  }
  .main-top-top{
    height: 64%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 0 10px 15px;
  }
  .top-title{
    padding-bottom: .6rem;
    font-size: 1.2rem;
  }
  .top-title>div{
    display: inline-block;
    width: 69%;
    text-align: right;
  }
  .main-top-top div.title-size,.main-top-bottom div.title-size{
    width: 30%;
  }
  .title-size{
    font-weight: bold;
    color: #bbefff;
    width: 100%;
    text-align: left !important;
    font-size: 1.3rem;
  }
  .circle{
    display: inline-block;
    vertical-align: middle;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin-left: 0.8rem;
  }
  .circle+span>.repairTop-title{
    display: inline-block;
    vertical-align: middle;
    font-size: 1.4rem!important;
    height: 1.8rem !important;
    line-height: 1.8rem !important;
  }

  .waitCir{
    background: #f93d6a;
  }
  .inCir{
    background: #00ff91;
  }
  .outCir{
    background: #797979;
  }
  .main-title{
    position: relative;
    font-size: 1.1rem;
  }
  .title-ab{
    width: 100%;
    position: absolute;
    text-align: right;
    padding-right: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .main-title>p{
    padding-left: 40px;
    padding-bottom: 5px;
    color: #dee1e3;
  }
  .main-title>p:first-child{
    font-size: 1.4rem !important;
    padding-left: 0;
    color: #fff;
  }
  .autoLine{
    width: 100%;
    height: .6rem;
    background: url("../../../static/img/donxian.gif") no-repeat;
    background-position: 65% 48%;
    background-size: 120%;
  }
  .main-top-bottom{
    height: 35%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 0 10px 15px;
  }
  .main-top-center{
    height: 100%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 15px;
    font-size: 1.2rem;
  }
  .person-title{
    padding: 0.5rem;
    background: #264252;
    color: #19def3;
  }
  .top-main{
    height: 93%;
  }
  .repair-person{
    height: 90%;
  }
  .person-main{
    height: 100%;
  }
  .person-main span,.person-title span{
    display: inline-block;
    text-align: center;
  }
  .slide-li{
    height: 10%;
    padding-top: 2%;
    background: #17303c;
  }
  .slide-li:nth-child(2n){
    background: #183f4d;
  }
  .person-circle{
    padding: .1rem .3rem;
    border-radius: 50%;
    font-size: 1rem;
    background: #0a6977;
  }
  .main-top-right{
    width: 100%;
    height: 40%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: .6rem 1.56rem;
  }
  .right-top,.right-bottom{
    width: 100% !important;
    text-align: left !important;
  }
  .right-top>div{
    display: inline-block!important;
    width: 49%;
    font-size: 1.4rem;
  }
  .right-bottom>div{
    display: inline-block!important;
    width: 23%;
    font-size: 1.2rem;
  }
  .right-bottom>div>p{
    padding: 1rem 0;
  }
  .right-fontB{
    font-size: 3.5rem;
  }
  .right-fontS{
    font-size: 2.5rem;
  }
  .font01{
    color: #fff601;
  }
  .font29{
    color: #f46729;
  }
  .font16{
    color: #36c716;
  }
  .font92{
    color: #929292;
  }
  .main-bottom-left{
    width: 568px;
    height: 100%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 15px;
  }
  .main-bottom-center{
    width: 768px;
    height: 100%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 15px;
  }
  .main-bottom-right{
    width: 100%;
    height: 59%;
    border-style: solid;
    border-width: 10px 10px;
    -o-border-image: url("../../../static/img/one-bord.png") 10 10;
    border-image: url("../../../static/img/one-bord.png") 10 10;
    background: none;
    padding: 10px 15px;
  }
  .faultLabelSum,.regionSum{
    width: 100%;
    height: calc(100% - 1.8rem);
  }
  .systemSum{
    width: 100%;
    height: calc(100% - .8rem);
  }
  .repairTop-title{
    white-space:nowrap;
  }
</style>
