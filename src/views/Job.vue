<template>
  <div class="job">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">检测任务/</div>
      <div>
        <span class="span_size">任务列表</span>
      </div>
      <div class="parent">
        <el-button type="success" icon="el-icon-open" round>开始</el-button>
        <el-button type="warning" icon="el-icon-turn-off" round>暂停</el-button>
      </div>
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
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column  label="任务名称" width="300">
              <template slot-scope="scope">
                <el-button  type="text" @click="tosuccessJob(scope.row.JS_ID)">{{ scope.row["JS_JOBNAME"] }}</el-button>
              </template>
            </el-table-column>
             <el-table-column label="表名" width="150">
              <template slot-scope="scope">
                <el-button  type="text">{{scope.row.JS_TABLENAME}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="字段名称" width="150">
              <template slot-scope="scope">
                <el-button  type="text">{{scope.row.JS_TABLEFIELD}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="上次执行时间" width="200">
              <template slot-scope="scope">
                {{ scope.row["JS_LASTEXECUTIONTIME"]}}
              </template>
            </el-table-column>
            <el-table-column prop="time" label="下次执行时间" width="200">
              <template slot-scope="scope">
                {{ scope.row["JS_NEXTEXECUTIONTIME"]}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row['JS_STATUS']==='暂停'" type="danger" >暂停</el-button>
                <el-button v-if="scope.row['JS_STATUS']==='已完成'" type="success" >完成</el-button>
                <el-button v-else-if="scope.row['JS_STATUS']==='执行中'" type="success" >执行</el-button>
                 <!-- <el-button type="danger" plain="">暂停</el-button> -->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <el-button-group slot-scope="scope" >
                <el-button type="primary" icon="el-icon-view"></el-button>
                <el-button type="primary" icon="el-icon-delete" @click="deletejob(scope.row.JS_ID)"></el-button>
                <el-button v-if="scope.row['JS_STATUS']==='执行中'" type="primary" @click="redefine(scope.row.JS_TABLEID)" icon="el-icon-video-pause"></el-button>
                <el-button v-else-if="scope.row['JS_STATUS']==='暂停'" type="primary" @click="openjob(scope.row.JS_TABLEID)" icon="el-icon-video-play"></el-button>
                <el-button v-else-if="scope.row['JS_STATUS']==='已完成'" type="primary" @click="openjob(scope.row.JS_TABLEID)" icon="el-icon-video-play"></el-button>

              </el-button-group>
            </el-table-column>
            <el-table-column label="结果">
              <el-button type="success" icon="el-icon-s-data" circle></el-button>
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
      page: 1,
      total: 0,
      limit: 10
    }
  },

  mounted () {
    this.handleCurrentChange(1)
  },

  methods: {
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
    redefine (jobid) {
      this.$alert('修改任务状态', '结果', {
        confirmButtonText: '确定'
        // callback: () => this.$router.push({ path: '/accuracy/' })
      })
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
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#909399;
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
