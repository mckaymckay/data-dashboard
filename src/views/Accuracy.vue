<template>
  <div class="accuracy">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
          <div><el-page-header @back="goBack"></el-page-header></div>
          <span class="h3">波动检测</span>
      </div>
      <div class="search_button">
        <el-input placeholder="请输入数据表" v-model="input1" class="input-with-select">{{searchname}}
          <el-button type="primary" slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>
      <!-- <div class="search_button">
        <el-alert
            type="success"
            description="例子：假设表A上次更新后有1000条数据，此次更新后有999条数据可以与之吻合，
那么准确度(%)=999/1000 * 100% = 99.9%"
            show-icon>
        </el-alert>
      </div> -->
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
            <el-radio :label="5">数据分析</el-radio>>
          </el-radio-group>
        </template>
      </div>
      <div style="height:10px;background-color:#edeff3"></div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <div style="background-color:white;height:60px">
        <span style="line-height: 60px;padding: 30px;color: #909399;font-size:small">任务列表></span>
        <el-button type="primary" style="margin:10px 100px 0px;float:right" icon="el-icon-circle-plus-outline" @click="tomeasure">波动检测</el-button>
      </div>
      <div style="background-color:#E4E7ED;height:1px"></div>
      <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="" width="20">
      </el-table-column>
      <!-- 度量名称 -->
        <el-table-column label="度量名称" min-width="32%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <el-button type="text">
                {{ scope.row.FM_MISSIONNAME }}
                </el-button></span>
          </template>
        </el-table-column>
        <!-- 数据表 -->
        <el-table-column label="数据表" min-width="30%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_TABLENAME}}</span>
          </template>
        </el-table-column>
      <!-- 描述 -->
        <!-- <el-table-column label="描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_DESCRIPTION}}</span>
          </template>
        </el-table-column> -->
        <!-- 下次执行时间 -->
        <!-- <el-table-column prop="time" label="下次执行时间" width="250">
              <template slot-scope="scope">
                {{ scope.row["FM_NEXTEXECUTIONTIME"]}}
              </template>
            </el-table-column> -->
        <!-- 执行状态 -->
        <el-table-column prop="status" label="状态"  min-width="12%">
              <template slot-scope="scope">
                <el-button size="small" v-if="scope.row['FM_STATUS']==='暂停'" type="danger" >未开启</el-button>
                <el-button size="small" v-if="scope.row['FM_STATUS']==='已完成'" type="success" >已完成</el-button>
                <el-button size="small" v-else-if="scope.row['FM_STATUS']==='等待下次执行'" type="warning" >待执行</el-button>
                 <!-- <el-button type="danger" plain="">暂停</el-button> -->
              </template>
            </el-table-column>
      <!-- 操作 -->
        <el-table-column label="操作" min-width="18%">
          <template slot-scope="scope">
            <el-button-group>
              <!-- 删除任务 -->
              <el-button size="small" type="primary" icon="el-icon-delete" @click="deletejob(scope.row.FM_ID)"></el-button>
              <!-- 添加即时任务 -->
              <el-tooltip class="item" effect="dark" content="添加即时任务" placement="top-start">
                <el-button size="small" v-if="scope.row['FM_STATUS']==='等待下次执行'" type="primary" @click="imme(scope.row.FM_ID)" icon="el-icon-video-play"></el-button>
                <el-button size="small" v-else-if="scope.row['FM_STATUS']==='暂停'" type="primary" @click="imme(scope.row.FM_ID)" icon="el-icon-video-play"></el-button>
                <el-button size="small" v-else-if="scope.row['FM_STATUS']==='已完成'" type="primary" @click="imme(scope.row.FM_ID)" icon="el-icon-circle-check"></el-button>
              </el-tooltip>
              <!-- 添加定时任务 -->
              <el-tooltip  class="item" effect="dark" content="添加定时任务" placement="top-start">
                <el-button size="small" type="primary" icon="el-icon-alarm-clock" @click="openjob(scope.row.FM_ID)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column label="结果" min-width="8%">
          <template slot-scope="scope">
              <el-button size="small" type="success" icon="el-icon-s-data" circle @click="toresult(scope.row.FM_ID,scope.row.FM_MISSIONNAME,scope.row.FM_STATUS)"></el-button>
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
      :current-page.sync="page"
        background
        layout="prev, pager, next">
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import day from 'dayjs'
import request from '../request'

export default {

  data () {
    return {
      input1: '',
      searchname: '',
      select: '',
      tableData: [],
      page: 1,
      total: 0,
      limit: 10,
      radio: 1
    }
  },

  mounted () {
    // this.handleCurrentChange(1)
    console.log(this.$route.params)
    if (this.$route.params.tablename === undefined) {
      this.handleCurrentChange(1)
      // this.handlechange()
    } else {
      this.fromassets()
    }
  },

  methods: {
    handlechange () {
      this.page = 1
      console.log(this.radio)
      if (this.radio === 1) {
        this.handleCurrentChange(1)
      } else {
        this.fenye2(1)
      }
    },
    // 分页
    fenye (val) {
      request({
        url: '/accuracy?page=' + val + '&size=20'
      })
        .then(res => {
          // console.log('zheshi accuracy')
          // console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
        })
    },
    // 分页2
    fenye2 (val) {
      const typeEnum = {
        2: 'OD_TPAS',
        3: 'OD_SRMS',
        4: 'OD_YLB'
      }
      request({
        url: '/accuracy?page=' + val + '&size=20&types=' + typeEnum[this.radio] + '_%'
      })
        .then(res => {
          // console.log(this.radio)
          // console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
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
    search () {
      this.request({
        url: '/searchaccuracy?tablename=' + this.input1
      })
        .then(res => {
          console.log('zheshi sousuo')
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 新建任务
    tomeasure () {
      this.$router.push({ path: '/createac/' })
    },
    // 开启任务
    openjob (tableid) {
      console.log(tableid)
      this.$router.push({ path: '/openjob/' + tableid })
    },
    // 即时任务
    imme (tableid) {
      console.log(111)
      console.log(tableid)
      request({
        url: '/accuracymissionImmediately?tableid=' + tableid,
        method: 'post'
      })
        .then(res => {
          console.log(res)
          if (res.data.code === '200') {
            this.$message({
              type: 'success',
              message: '开启成功!'
            })
            this.handleCurrentChange(1)
            // location.reload()
          } else {
            this.$message({
              type: 'info',
              message: res.data.message
            })
          }
        })
    },
    // 删除任务
    deletejob (tableid) {
      this.$confirm('此操作将删除该表所有的任务及相关数据，您确认要删除任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/accuracy?tableid=' + tableid,
          method: 'delete'
        })
          .then(res => {
            console.log(res)
            console.log(res.data.code)
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
    // 查看结果
    toresult (tableid, missionname, status) {
      this.$router.push({ path: '/resac/' + tableid + '/' + missionname + '/' + status })
    },
    // 从数据实体页而来
    fromassets () {
      this.table_name = this.$route.params.tablename
      request({
        url: '/searchaccuracy?tablename=' + this.table_name
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 多选
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
.accuracy {
  padding: 10px;
  width:100%;
  height: 100%;
  /* margin-top: 60px; */
  /* background: yellow; */
  /* position: absolute; */
}
.lll{
   display:flex
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
  line-height: 24px;
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
