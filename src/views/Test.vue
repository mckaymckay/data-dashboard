<template>
  <div>
    这是商品列表页面
    <router-link to='/goods/title'>显示商品标题</router-link>
    <router-link to='/goods/image'>显示商品图片</router-link>
    // 跳转到购物车页面
    <router-link to='/cart'>跳转到购物车页面</router-link>
    <button @click="jump">Button-跳转到购物车页面</button>
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    jump () {
    // this.$router.push("/cart")
    // 传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({ path: '/cart?goodsId=12' })
    // this.$router.go(-2)
    // 后退两步
    }
  }
}
</script>
<style>
</style>
