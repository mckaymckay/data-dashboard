<template>
  <div id="app">
    <div class="nav">

      <!-- logo -->

      <div class="logo">
        <i class="el-icon-coordinate"></i>
        闵    行
      </div>
      <!-- 侧栏 -->
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#041528"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="/">
        <i class="el-icon-data-analysis"></i>
          <span slot="title">总体大盘</span>
        </el-menu-item>
        <el-menu-item index="/Assets">
          <i class="el-icon-menu"></i>
          <span slot="title">数据实体</span>
        </el-menu-item>
        <el-menu-item index="/Measure1">
          <i class="el-icon-menu"></i>
          <span slot="title">规则定义</span>
        </el-menu-item>
        <el-menu-item index="/Accuracy">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">波动检测</span>
        </el-menu-item>
        <el-menu-item index="/Job">
        <i class="el-icon-edit"></i>
          <span slot="title" >检测任务</span>
        </el-menu-item>
        <el-menu-item index="/Assessment">
        <i class="el-icon-finished"></i>
          <span slot="title">质量评估</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="header"></div>
      <router-view />
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import Job from '../views/job'

export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      activeIndex: '/measure',
      isRouterAlive: true
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path
    }
  },
  mounted () {
    console.log(this.$route.path)
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  background-color: #edeff3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  display: flex;
  height: 100vh;
}
.el-menu-vertical-demo {
  width: 200px;
  flex: 1 1 auto;
}
.nav{
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.header{
  height: 60px;
  background-color: white;
  flex:  0 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.logo{
  height: 60px;
  color: white;
  background-color:#041528;
  font-size: x-large;
  line-height: 60px;
  text-align: center;
  font-family:"Hiragino Sans GB";
}
</style>
