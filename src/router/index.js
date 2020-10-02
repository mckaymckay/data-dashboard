import Vue from 'vue'
import VueRouter from 'vue-router'
// import ECharts from 'vue-echarts'
// import Measure from '../views/Measure.vue'
import Job from '../views/Job.vue'
import Assets from '../views/Assets.vue'
import Details from '../views/Details.vue'
import Perfection from '../views/Perfection.vue'
import Measure from '../views/Measure.vue'
import Accuracy from '../views/Accuracy.vue'
import Successjob from '../views/Successjob.vue'
import Addaccuracy from '../views/Addaccuracy.vue'
import Assessment from '../views/Assessment.vue'
import Fill from '../views/Fill.vue'
import Dapan from '../views/Dapan.vue'
import Createac from '../views/Createac.vue'
import Standard from '../views/Standard.vue'
import Measure1 from '../views/Measure1.vue'
import Openjob from '../views/Openjob.vue'
import Openjob2 from '../views/Openjob2.vue'
import Resac from '../views/Resac.vue'
import Resjob from '../views/Resjob.vue'
import Test from '../views/Test.vue'
// import Test22 from '../views/Test22.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dapan',
    component: Dapan
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets
  },
  {
    path: '/details/:tableid/:tablename',
    // path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/perfection/:tableid/:tablename',
    name: 'Perfection',
    component: Perfection
  },
  {
    path: '/measure1',
    name: 'Measure1',
    component: Measure1
  },
  {
    path: '/measure/:tableid/:tablename',
    name: 'Measure',
    component: Measure
  },
  {
    path: '/accuracy',
    name: 'Accuracy',
    component: Accuracy
  },
  {
    path: '/createac',
    name: 'Createac',
    component: Createac
  },
  {
    // 波动检测任务开启
    path: '/openjob/:tableid',
    name: 'Openjob',
    component: Openjob
  },
  {
    // 波动检测任务结果
    path: '/resac/:tableid/:missionname/:status',
    name: 'Resac',
    component: Resac
  },
  {
    // 实体检测任务结果
    path: '/resjob/:jobname/:jobid',
    name: 'Resjob',
    component: Resjob
  },
  {
    // 实体检测任务开启
    path: '/openjob2/:tableid',
    name: 'Openjob2',
    component: Openjob2
  },
  {
    path: '/job',
    name: 'Job',
    component: Job
  },
  {
    path: '/successjob/:jobId',
    name: 'Successjob',
    component: Successjob
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/addaccuracy',
    name: 'Addaccuracy',
    component: Addaccuracy
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: Assessment
  },
  {
    path: '/fill/:tableid/:tablename/:fieldname',
    // path: '/fill',
    name: 'Fill',
    component: Fill
  },
  {
    path: '/standard/:tableid/:tablename/:fieldname',
    name: 'Standard',
    component: Standard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
