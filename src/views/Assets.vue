<template>
  <div class="assets">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据实体</div>
      <div class="search_button">
        <el-input
        placeholder="请输入数据表"
        clearable
        v-model="input1"
        class="input-with-select">{{searchname}}
          <el-button type="primary" slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <!-- 主题库搜索 -->
    <div style="background-color:white">
      <div style="line-height: 50px;margin-left: 40px">
        <span style="color:#409EFF;margin-right:20px">主 题 库: </span>
        <template>
          <el-radio-group v-model="radio" @change="handlechange">
            <el-radio :label="1">全部数据</el-radio>
            <el-radio :label="2">教师档案库</el-radio>
            <el-radio :label="3">教师课题库</el-radio>
            <el-radio :label="4">云录播</el-radio>
          </el-radio-group>
        </template>
      </div>
      <div style="height:10px;background-color:#edeff3"></div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%">
      <el-table-column type="" width="20">
      </el-table-column>
      <!-- 数据表 -->
        <el-table-column label="数据表" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 数据库 -->
        <el-table-column label="数据库" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_DBNAME }}</span>
          </template>
        </el-table-column>
        <!-- 数据量 -->
        <el-table-column label="数据量" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_HISTORYNUMBER }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.TM_CREATETIME}}</span>
          </template>
        </el-table-column>
        <!-- 数据波动 -->
        <el-table-column label="数据波动" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px" @click="toaccuracy(scope.row.TM_TABLENAME)">
              <el-button type="text" v-if="scope.row['TM_ISACCURACY']==='0'">未创建</el-button>
              <el-button type="text" v-else-if="scope.row['TM_ISACCURACY']==='1'">{{scope.row.TM_ACCURACYCOMPLETIONRATE*100}}%</el-button>
              </span>
          </template>
        </el-table-column>
      <!-- 规则定义情况 -->
        <el-table-column label="规则定义情况" width="150">
          <template slot-scope="scope">
            <!-- <span v-for="item in scope.row" :key="item.TM_ISDEFINED"> -->
              <span style="margin-left: 10px" v-if="scope.row.TM_ISDEFINED === '1'">
                <el-button type="text" @click="todetails(scope.row.TM_ID,scope.row.TM_TABLENAME)">已定义</el-button>
              </span>
              <span style="margin-left: 10px" v-else-if="scope.row.TM_ISDEFINED === '0'">
                <el-button type="text" @click="todetails(scope.row.TM_ID,scope.row.TM_TABLENAME)">未定义</el-button>
                </span>
            <!-- </span> -->
          </template>
          <!-- 检测任务执行情况 -->
        </el-table-column><el-table-column label="检测任务执行情况" width="150">
          <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button type="text" v-if="scope.row['TM_ISDEFINED']==='0'" @click="tojob(scope.row.TM_TABLENAME)"></el-button>
                <el-button type="text" v-else-if="scope.row['TM_ISDEFINED']==='1'" @click="tojob(scope.row.TM_TABLENAME)">{{scope.row.measure_rate}}%已完成</el-button>
              </span>
          </template>
        </el-table-column>
        <!-- 数据质量情况 -->
        <el-table-column label="数据质量情况" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px"><el-button type="text" @click="toassessment(scope.row.TM_TABLENAME)">5个问题
              <!-- {{ scope.row.TM_DBNAME }} -->
              </el-button></span>
          </template>
        </el-table-column>
        <!-- 数据治理情况 -->
        <el-table-column label="数据治理情况" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px"><el-button type="text" @click="toassessment(scope.row.TM_TABLENAME)">30%已改进
              <!-- {{ scope.row.TM_DBNAME }} -->
              </el-button></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 @current-change='changePage' -->
    <div class="pagination_parent">
      <div class="pagination">
      <el-pagination
      @current-change="handleCurrentChange"
        :total="total"
        :current-page.sync="page"
        background
        layout="prev, pager, next"
        >
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {

  data () {
    return {
      dialogVisible: false, // 重置规则的对话框
      input1: '',
      searchname: null,
      select: '',
      tableData: [],
      page: 1,
      total: 0,
      limit: 10,
      radio: 1,
      measure_rate: ''
    }
  },
  // 开始执行分页函数
  mounted () {
    this.handleCurrentChange(1)
  },
  methods: {
    // 处理不同的库调用接口
    handlechange () {
      this.page = 1
      console.log(this.radio)
      if (this.radio === 1) {
        this.fenye(1)
      } else {
        this.fenye2(1)
      }
    },
    // 分页
    fenye (val) {
      axios
        .get('http://47.94.199.242:5000/api/v1.0/assets?page=' + val + '&size=20')
        .then(res => {
          console.log('zheshi assets')
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
          this.tableData.forEach(v => {
            v.measure_rate = Math.round(v.TM_MEASURECOMPLETIONRATE * 100)
          })
        })
    },
    // 分页2
    fenye2 (val) {
      const typeEnum = {
        2: 'OD_TPAS',
        3: 'OD_SRMS',
        4: 'OD_YLB'
      }
      axios
        .get('http://47.94.199.242:5000/api/v1.0/assets?page=' + val + '&size=20&types=' + typeEnum[this.radio] + '_%')
        .then(res => {
          console.log('zheshi sousuo')
          console.log(this.radio)
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
          this.tableData.forEach(v => {
            v.measure_rate = Math.round(v.TM_MEASURECOMPLETIONRATE * 100)
            console.log(this.measure_rate)
          })
        })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      if (this.radio === 1) {
        this.fenye(val)
      } else {
        this.fenye2(val)
      }
    },
    dayjs (e) {
      return dayjs(e)
    },
    todetails (tableid, tablename) {
      console.log('todetails')
      this.$router.push({ path: '/measure/' + tableid + '/' + tablename })
      console.log(tableid)
    },
    // 根据表名查找波动检测
    toaccuracy (tablename) {
      this.$router.push({
        name: 'Accuracy',
        params: {
          tablename: tablename
        }
      })
    },
    // 根据表名查找任务列表
    tojob (tablename) {
      this.$router.push({
        name: 'Job',
        params: {
          tablename: tablename
        }
      })
    },
    // 根据表名查找检测结果
    toassessment (tablename) {
      this.$router.push({
        name: 'Assessment',
        query: {
          tablename: tablename
        }
      })
    },
    // 根据表名搜索
    search () {
      this.searchname = this.input1
      console.log(this.searchname)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/search?tablename=' + this.searchname)
        .then(res => {
          console.log('zheshi sousuo')
          console.log(res)
          this.tableData = res.data.data
        })
    }
  }
}
</script>
<style scoped>
.assets {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#909399;
}
.span_size {
  font-size: 20px;
  color: #303133;
}
.search_button {
  margin-top: 15px;
  max-width:500px;
  margin:0 auto
}
.el-select>.el-input {
    width: 400px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.pagination_parent {
  background: white;
  border-radius: 4px;
}
.pagination {
  padding: 5px;
  border-radius: 4px;
  width: 500px;
  margin: 5px auto;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
