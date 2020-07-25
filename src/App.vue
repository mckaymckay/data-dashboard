<template>
  <div id="app">
    <div class="nav">
      <div class="logo">
        logo
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">总体大盘</el-menu-item>
        <el-menu-item index="/measure">Measure</el-menu-item>
        <el-menu-item index="/job">Job</el-menu-item>
      </el-menu>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/measure'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
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
  // display: flex;
}
.logo{
  height: 60px;
  color: white;
  background-color:#ccc ;
}
</style>
