<template>
  <div>
    <div>
      {{age}}
    </div>
      <div @click="onClick(index)" v-for="(item,index) in list" :key="index">
          {{item}}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    age: String || Number
  },
  data () {
    return {
      list: [8, 4, 3, 4, 5]
    }
  },
  methods: {
    onClick (index) {
      console.log('children', this.list[index])
      this.$emit('haha', this.list[index])
    }
  }
}
</script>

<style>
</style>
