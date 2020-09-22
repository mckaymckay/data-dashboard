<template>
  <div class="measure1">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">规则定义</div>
      <div>
        <span class="span_size">数据列表</span>
      </div>
      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">{{searchname}}
          <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%" height="500px">
      <!-- 数据表 -->
        <el-table-column label="数据表" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 数据库 -->
        <el-table-column label="数据库" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_DBNAME }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.TM_CREATETIME}}</span>
          </template>
        </el-table-column>
      <!-- 更新时间 -->
        <!-- <el-table-column label="更新时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.TM_UPDATETIME}}</span>
          </template>
        </el-table-column> -->
      <!-- 规则定义情况 -->
        <el-table-column label="规则定义情况" width="200">
          <template slot-scope="scope">
            <!-- <span v-for="item in scope.row" :key="item.TM_ISDEFINED"> -->
              <span style="margin-left: 10px" v-if="scope.row.TM_ISDEFINED === '1'">已定义</span>
              <span style="margin-left: 10px" v-else-if="scope.row.TM_ISDEFINED === '0'">未定义</span>
            <!-- </span> -->
          </template>
        </el-table-column>
        <!-- 操作  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="text" @click="todetails(scope.row.TM_ID)">详情</el-button> -->
            <el-button size="mini" type="text" @click="tomeasure(scope.row.TM_ID,scope.row.TM_TABLENAME)">规则定义</el-button>
            <el-button size="mini" type="text"  v-if="scope.row.TM_ISDEFINED === '1'" @click="reset(scope.row.TM_ID)">重置规则</el-button>
            <el-button size="mini" type="text"  v-else-if="scope.row.TM_ISDEFINED === '0'" @click="reset(2)">重置规则</el-button>
            <!-- <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%">
              <span>将删除这个表所有的度量规则，回到默认状态，即'无需检测'，您确认要重置规则吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 @current-change='changePage' -->
    <div class="pagination_parent">
      <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
        :total="total"
        :current-page="page"
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
// import ECharts from 'vue-echarts'
export default {
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false, // 重置规则的对话框
      input1: '',
      searchname: null,
      select: '',
      tableData: [],
      page: 1,
      total: 0,
      limit: 10
    }
  },
  // 开始执行分页函数
  mounted () {
    this.handleCurrentChange(1)
  },

  methods: {
    dayjs (e) {
      return dayjs(e)
    },
    tomeasure (tableid, tablename) {
      console.log('to measure')
      console.log(tableid)
      this.$router.push({ path: '/measure/' + tableid + '/' + tablename })
    },
    // 重置
    reset (tableid) {
      console.log(tableid)
      this.$confirm("此操作将删除该表所有的度量规则,回到默认状态,即'无需检测';相应的检测任务也会删除,您确认要重置规则吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios
          .delete('http://47.94.199.242:5000/api/v1.0/measure/' + tableid)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '已重置!'
              })
            }
            // location.reload()
            this.handleCurrentChange(1)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 不需要重置
    reset2 () {
      this.$alert('无需重置规则', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    // 分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/assets?page=' + val + '&size=10')
        .then(res => {
          console.log('zheshi assets')
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
        })
    },
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
.measure1 {
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
