import Vue from 'vue'
import VueRouter from 'vue-router'
// import Measure from '../views/Measure.vue'
import Job from '../views/Job.vue'
import Assets from '../views/Assets.vue'
import Details from '../views/Details.vue'
import Perfection from '../views/Perfection.vue'
import Measure from '../views/Measure.vue'
import Accuracy from '../views/Accuracy.vue'
import Successjob from '../views/Successjob.vue'
import Test from '../views/Test.vue'
import Addaccuracy from '../views/Addaccuracy.vue'
import Assessment from '../views/Assessment.vue'
import Fill from '../views/Fill.vue'
import Dapan from '../views/Dapan.vue'

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
    path: '/job',
    name: 'Job',
    component: Job
  },
  {
    path: '/assets',
    name: 'Assets',
    component: Assets
  },
  {
    // path: '/details/:tablename',
    path: '/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/perfection',
    name: 'Perfection',
    component: Perfection
  },
  {
    path: '/measure',
    name: 'Measure',
    component: Measure
  },
  {
    path: '/accuracy',
    name: 'Accuracy',
    component: Accuracy
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
    path: '/fill',
    name: 'Fill',
    component: Fill
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
