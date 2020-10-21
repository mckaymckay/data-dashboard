<template>
  <div class="openjob">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <!-- <div><el-page-header @back="goBack"></el-page-header></div> -->
        <div class="h3">波动检测</div>
      </div>
      <div>
        <span class="span_size">执行波动检测任务</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <div class="content1">
        <div class="title">
          请选择任务执行时间
          <span style="color:#909399">(最多选择6个时间)</span>
        </div>
        <template>
          <div class="block" v-for="(item,index) in timeList" :key="index">
            <span style="margin-right:12px">{{index+1}}</span>
            <el-date-picker
              v-model="item.value"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-button @click="add" v-if="index===timeList.length-1&&index<5">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </template>
      </div>
      <div class="content2">
        <el-form label-width="300px" class="demo-ruleForm">
          <el-form-item style="margin-left: 50px;">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import day from 'dayjs'
import request from '../request'
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            onClick (picker) {
              console.log(1)
            }
          }
        ],
        disabledDate (time) {
          return time.getTime() <= Date.now()
        }
      },
      timeList: [
        {
          id: '',
          value: ''
        }
      ]
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.timeList[0].id = this.$route.params.tableid
    this.add()
    this.gettime()
    this.timer = setInterval(this.gettime, 4.5 * 60 * 1000)
  },
  methods: {
    // 可选6个时间
    add () {
      for (let i = 0; i < 5; i++) {
        this.timeList.push({ id: this.$route.params.tableid, value: '' })
      }
    },
    // 获取6个时间
    gettime () {
      const result = []
      var dd = new Date()
      result.push(day(dd).add(5, 'minute').format('YYYY-MM-DD HH:mm:ss'))
      this.timeList[0].value = result[0]
      for (let i = 1; i < 6; i++) {
        result.push(day(dd).add(i, 'month').format('YYYY-MM-DD HH:mm:ss'))
        this.timeList[i].value = result[i]
      }
      console.log(result)
    },
    goBack () {
      this.$router.push({ path: '/accuracy/' })
    },
    back () {
      this.$router.push({ path: '/accuracy/' })
    },

    submit () {
      console.log(this.timeList)
      const arr = JSON.parse(JSON.stringify(this.timeList.map((v) => ({
        FL_TABLEID: v.id,
        FL_UPDATETIME: v.value
      }))))
      for (let i = 0; i < 6 - this.timeList.length; i++) {
        arr.push({
          FL_TABLEID: this.$route.params.tableid,
          FL_UPDATETIME: ''
        })
      }
      console.log(arr)
      request({
        url: '/accuracymission',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          data: arr
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.code === '200') {
            console.log(res.data.message)
            this.$alert('提交成功', '结果', {
              confirmButtonText: '确定',
              callback: () => this.$router.push({ path: '/accuracy/' })
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.openjob {
  padding: 10px;
  flex: 1 1 auto;
  overflow: auto;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
}
.content {
  padding: 50px;
  background-color: white;
  height: 500px;
}
.content1 {
  /* background-color: #fafafa; */
  /* height: 400px; */
  width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.content2 {
  /* background-color: #fafafa; */
  width: 600px;
  /* margin: 0 auto; */
}
.title {
  display: inline-block;
  flex: 1 1;
  padding: 16px 0;
  margin-left: 15px;
  color: #303133;
}
.block {
  margin-left: 15px;
  margin-top: 5px;
  color: #606266;
}
.lll{
  display: flex;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #909399;
  line-height: 24px;
}
.span_size {
  font-size: 20px;
  color: #303133;
}
.pagination_parent {
  background: white;
  border-radius: 4px;
}
.pagination {
  padding: 5px;
  border-radius: 4px;
  width: 305px;
  margin: 5px auto;
}
</style>
