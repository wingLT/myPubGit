import Vue from 'vue'
import Router from 'vue-router'
/*成都双流国际机场微信公众号信息统计分析*/
import wechatPubAccountInfo from '@/components/wechatPubAccountInfo'
/*成都双流国际机场微信公众号信息统计分析 */
import latePassenger from '@/components/latePassenger'
/**航空市场部过夜飞机数统计 */
import marketingNightFlight from '@/components/marketOvernightFlight'
/**AOC航空保障数据大屏 */
import AOCaviationSecurity from '@/components/AOCaviationSecurity'
/**成都双流国际机场贵宾信息统计分析 */
import VIPinfoStatis from '@/components/VIPinfoStatis'
/**综合运维报修大数据分析大屏 */
import operationMaintenance from '@/components/operationMaintenance'
/**成都双流国际机场候管中心巡检信息统计分析 */
import inspection from '@/components/inspection'
/**成都双流国际机场候管中心巡检信息统计分析 */
import inspectionCopy from '@/components/inspectionCopy'
/**成都双流国际机场侯管中心巡检信息统计分析 */
import inspectionT2 from '@/components/inspectionT2'

// 成都双流国际机场巡检护卫统计
import checkGuardStatisA from '@/components/checkGuardStatisA'
import checkGuardStatisBC from '@/components/checkGuardStatisBC'
import checkGuardStatisDE from '@/components/checkGuardStatisDE'
import checkGuardStatisFG from '@/components/checkGuardStatisFG'

//侯管旅客人流量与安检口展示大屏
import houTubeSecurity from '@/components/houTubeSecurity'

//安监部门旅客人流量实时监控大屏
import securityCheckMonitorOne from '@/components/securityCheckMonitorOne'
import securityCheckMonitorTwo from '@/components/securityCheckMonitorTwo'
// import securityCheckMonitorThree from '@/components/securityCheckMonitorThree'
import securityCheckMonitorFour from '@/components/securityCheckMonitorFour'
/*用户画像*/
import UserPortrait from '../components/UserPortrsit/UserPortrsit.vue'
/*AOC热力图*/
// import T1Floor2 from '../components/AOC_Heat_Map/T1-F2.vue'
// import T2Floor2 from '../components/AOC_Heat_Map/T2-F2.vue'
// import T2Floor3 from '../components/AOC_Heat_Map/T2-F3.vue'
// 进出港旅客
import statisticsInOut from '../components/StatisticsOfInout/StatisticsOfInout.vue'
/*物流*/
import Logistics from '../components/Logistics/Logistics.vue'
/*A-CDM*/
import ACDM from '../components/A-CDM/A-CDM.vue'
/*手机值机*/
import mobileOperator from '../components/mobileStatis/mobileOperator.vue'
/*数据接口平台信息统计分析*/
import dataInterfaceInfo from '../components/dataInterfacePlatform/dataInterfaceInfo.vue'
/*乘客统计*/
import PassengerStatistics from '../components/CombStatistics/PassengerStatistics.vue'
/*报修统计*/
import RepairInformationStatistics from '../components/CombStatistics/RepairInformationStatistics.vue'

/*成都双流国际机场航班实时运行数据统计分析*/
import FlightDelayStatistics from '../components/FlightDelayStatistics/FlightDelayStatistics.vue'
/*航班延误统计第二版*/
import FlightInfoOutPortTwo from '../components/FlightInfoOutPortTwo/FlightInfoOutPortTwo.vue'

/*航班分布状况大屏*/
import DistributionFlight from '../components/DistributionFlight/DistributionFlight.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/PassengerStatistics',
      name: 'PassengerStatistics',
      component: PassengerStatistics
    },
    {
      path: '/RepairInformationStatistics',
      name: 'RepairInformationStatistics',
      component: RepairInformationStatistics
    },
    {
      path: '/wechatPubAccountInfo',
      name: 'wechatPubAccountInfo',
      component: wechatPubAccountInfo
    },
    {
      path: '/latePassenger',
      name: 'latePassenger',
      component: latePassenger
    },
    {
      path: '/marketingNightFlight',
      name: 'marketingNightFlight',
      component: marketingNightFlight
    },
    {
      path: '/AOCaviationSecurity',
      name: 'AOCaviationSecurity',
      component: AOCaviationSecurity
    },
    {
      path: '/VIPinfoStatis',
      name: 'VIPinfoStatis',
      component: VIPinfoStatis
    },{
      path: '/operationMaintenance',
      name: 'operationMaintenance',
      component: operationMaintenance
    },{
      path: '/inspection',
      name: 'inspection',
      component: inspection
    },{
      path: '/inspectionCopy',
      name: 'inspectionCopy',
      component: inspectionCopy
    },{
      path: '/inspectionT2',
      name: 'inspectionT2',
      component: inspectionT2
    },{
      path: '/checkGuardStatisA',
      name: 'checkGuardStatisA',
      component: checkGuardStatisA
    },
    {
      path: '/checkGuardStatisBC',
      name: 'checkGuardStatisBC',
      component: checkGuardStatisBC
    },
    {
      path: '/checkGuardStatisDE',
      name: 'checkGuardStatisDE',
      component: checkGuardStatisDE
    },
    {
      path: '/checkGuardStatisFG',
      name: 'checkGuardStatisFG',
      component: checkGuardStatisFG
    },{
      path: '/houTubeSecurity',
      name: 'houTubeSecurity',
      component: houTubeSecurity
    },{
      path: '/securityCheckMonitorOne',
      name: 'securityCheckMonitorOne',
      component: securityCheckMonitorOne
    },{
      path: '/securityCheckMonitorTwo',
      name: 'securityCheckMonitorTwo',
      component: securityCheckMonitorTwo
    }
    // ,{
    //   path: '/securityCheckMonitorThree',
    //   name: 'securityCheckMonitorThree',
    //   component: securityCheckMonitorThree
    // }
    ,{
      path: '/securityCheckMonitorFour',
      name: 'securityCheckMonitorFour',
      component: securityCheckMonitorFour
    },
    {
      path:'/userPortrait',
      name:'UserPortrait',
      component:UserPortrait
    },
    // {
    //   path:'/t1Floor2',
    //   name:'T1Floor2',
    //   component:T1Floor2
    // },
    // {
    //   path:'/t2Floor2',
    //   name:'T2Floor2',
    //   component:T2Floor2
    // },
    // {
    //   path:'/t2Floor3',
    //   name:'T2Floor3',
    //   component:T2Floor3
    // },
     {
      path:'/statisticsInOut',
      name:'statisticsInOut',
      component:statisticsInOut
    },
    {
      path:'/Logistics',
      name:'Logistics',
      component:Logistics
    },
    {
      path:'/A-CDM',
      name:'A-CDM',
      component:ACDM
    },
    {
      path:'/mobileOperator',
      name:'mobileOperator',
      component:mobileOperator
    },
    {
      path:'/dataInterfaceInfo',
      name:'dataInterfaceInfo',
      component:dataInterfaceInfo
    },
    {
      path:'/FlightDelayStatistics',
      name:'FlightDelayStatistics',
      component:FlightDelayStatistics
    },
    {
      path:'/FlightInfoOutPortTwo',
      name:'FlightInfoOutPortTwo',
      component:FlightInfoOutPortTwo
    },
    {
      path:'/DistributionFlight',
      name:'DistributionFlight',
      component:DistributionFlight
    },
  ]
})
