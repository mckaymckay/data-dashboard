<template>
  <div class="job">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div>
          <el-page-header @back="goBack"></el-page-header>
        </div>
        <div class="h3">检测任务</div>
      </div>

      <div class="search_button">
        <!-- <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">{{searchname}} -->
          <!-- <el-button type="primary" slot="append" icon="el-icon-search" @click="search">搜索</el-button> -->
        <!-- </el-input> -->
          <template>
              <el-select
                v-model="value"
                filterable
                clearable
                size="5px"
                style="width:400px"
                allow-create
                default-first-option
                placeholder="请选择表或主题库">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
        </template>
        <el-button slot="append" icon="el-icon-search" @click="search" style="background-color:">搜索</el-button>
      </div>
      <!-- <div class="parent">
        <el-button type="success" icon="el-icon-open" round>开始</el-button>
        <el-button type="warning" icon="el-icon-turn-off" round>暂停</el-button>
      </div> -->
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="500px"
        @selection-change="handleSelectionChange">
            <el-table-column type="" width="20">
            </el-table-column>
            <el-table-column  label="任务名称" width="300">
              <template slot-scope="scope">
                <el-button  type="text" @click="tosuccessJob(scope.row.JS_ID)">{{ scope.row["JS_JOBNAME"] }}</el-button>
              </template>
            </el-table-column>
             <el-table-column label="表名" width="200">
              <template slot-scope="scope">
                <el-button  type="text">{{scope.row.JS_TABLENAME}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="规则定义" width="150">
              <template slot-scope="scope">
                <el-button  type="text">{{scope.row.JS_MEASURE}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="字段名称" width="150">
              <template slot-scope="scope">
                <el-button  type="text">{{scope.row.JS_TABLEFIELD}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="下次执行时间" width="200">
              <template slot-scope="scope">
                {{ scope.row["JS_NEXTEXECUTIONTIME"]}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="150">
              <template slot-scope="scope">
                <el-button size="small" v-if="scope.row['JS_STATUS']==='暂停'" type="danger" >未开启</el-button>
                <el-button size="small" v-if="scope.row['JS_STATUS']==='已完成'" type="success" >已完成</el-button>
                <el-button size="small" v-else-if="scope.row['JS_STATUS']==='等待下次执行'" type="warning" >待执行</el-button>
                 <!-- <el-button type="danger" plain="">暂停</el-button> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <el-button-group slot-scope="scope" >
                <el-button size="small" type="primary" icon="el-icon-view" @click="chakan(scope.row.JS_TABLEID,scope.row.JS_TABLENAME)"></el-button>
                <el-button size="small" type="primary" icon="el-icon-delete" @click="deletejob(scope.row.JS_ID)"></el-button>
                <el-button size="small" v-if="scope.row['JS_STATUS']==='暂停'" type="primary" icon="el-icon-video-play"></el-button>
                <el-button size="small" v-else-if="scope.row['JS_STATUS']==='等待下次执行'" type="primary" @click="openjob(scope.row.JS_TABLEID)" icon="el-icon-video-play"></el-button>
                <el-button size="small" v-else-if="scope.row['JS_STATUS']==='已完成'" type="primary" @click="openjob(scope.row.JS_TABLEID)" icon="el-icon-video-play"></el-button>

              </el-button-group>
            </el-table-column>
            <el-table-column label="结果">
              <template slot-scope="scope">
              <el-button size="small" type="success" icon="el-icon-s-data" circle @click="toresjob(scope.row.JS_JOBNAME,scope.row.JS_ID)"></el-button>
              </template>
            </el-table-column>
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
import dayjs from 'dayjs'
export default {
  data () {
    return {
      input1: '',
      select: '',
      selected: [],
      tableData: [],
      table_name: '',
      page: 1,
      total: 0,
      limit: 10,
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: []
    }
  },
  mounted () {
    console.log(this.$route.params)
    if (this.$route.params.tablename === undefined) {
      this.handleCurrentChange(1)
    } else {
      this.fromassets()
    }
  },
  methods: {
    // 搜索框根据表名搜索
    search () {
      axios
        .get('http://47.94.199.242:5000/api/v1.0/searchjob?tablename=' + this.value)
        .then(res => {
          console.log('zheshi sousuo')
          console.log(res)
          this.tableData = res.data.data
        })
    },
    dayjs (e) {
      return dayjs(e)
    },
    // 分页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/jobs?page=' + val + '&size=10')
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
        })
    },
    // 从数据实体页而来
    fromassets () {
      this.table_name = this.$route.params.tablename
      axios
        .get('http://47.94.199.242:5000/api/v1.0/searchjob?tablename=' + this.table_name)
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 查看任务
    chakan (tableid, tablename) {
      console.log('todetails')
      this.$router.push({ path: '/details/' + tableid + '/' + tablename })
      // console.log(tableid)
    },
    // 删除任务
    deletejob (jobid) {
      this.$confirm('此操作将删除该表所有的任务及相关数据，您确认要删除任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios
          .delete('http://47.94.199.242:5000/api/v1.0/jobs/' + jobid)
          .then(res => {
            console.log(res)
            if (res.data.code === '200') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleCurrentChange(1)
            // location.reload()
            } else if (res.data.code === '2003') {
              this.$message({
                type: 'info',
                message: '任务正在执行,无法删除!'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    openjob (tableid) {
      console.log(tableid)
      this.$router.push({ path: '/openjob2/' + tableid })
    },
    tosuccessJob (jobid) {
      // console.log(jobid)
      this.$router.push({ path: '/successjob/' + jobid })
    },
    toresjob (jobname, jobid) {
      console.log(jobname, jobid)
      this.$router.push({ path: '/resjob/' + jobname + '/' + jobid })
    },
    handleSelectionChange (rows) {
      this.multipleSelection = rows
      this.selected = []
      console.log(rows)
      if (rows) {
        // console.log(rows.length)
        rows.forEach(s => this.selected.push(s.id)
        )
        console.log(this.selected)
      }
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.job {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
}
.lll{
display: flex;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#909399;
  line-height: 24px;
}
.parent {
  text-align: right;
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
