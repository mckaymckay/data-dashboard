<template>
  <div class="assessment">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">质量评估</div>
      <div>
        <span class="span_size">检测结果</span>
      </div>
      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
          <!-- style="background-color:#3894FF" -->
        </el-input>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%" height="500px">
      <!-- 数据表 -->
        <el-table-column label="数据表" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 数据库 -->
        <el-table-column label="字段" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_TABLEFIELD }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column label="问题描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.PS_PROBLEM }}</span>
          </template>
        </el-table-column>
      <!-- 更新时间 -->
        <el-table-column label="操作" width="300">
          <template slot-scope="">
            <span style="margin-left: 10px;color:#409EFF" @click="tofill">更改</span>
          </template>
        </el-table-column>
        <!-- 操作  -->
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">更改</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination_parent">
      <div class="pagination">
      <el-pagination
      @current-change="handleCurrentChange"
        :total="total"
        :current-page="page"
        background
        layout="prev, pager, next">
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      input1: '',
      select: '',
      tableData: [],
      page: 1,
      total: 0,
      limit: 10
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {
    this.handleCurrentChange(1)
  },

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    tofill () {
      this.$router.push({ path: '/fill/' })
    },
    // 分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/problemlist?page=' + val + '&size=10')
        .then(res => {
          console.log('zheshi assessment')
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.counts
        })
    }
  }
}
</script>
<style scoped>
.assessment  {
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
.el-select .el-input {
    width: 130px;
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
