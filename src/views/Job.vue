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
            <el-table-column label="任务名称" width="200">
              <template slot-scope="scope">
                <el-button  type="text" @click="tosuccessJob(scope.row.id)">{{ scope.row["job.name"] }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="上次执行时间" width="200">
              <template slot-scope="scope">
                {{ dayjs(scope.row["job.state"].previousFireTime).format('YYYY-MM-DD HH:mm:ss')}}
              </template>
            </el-table-column>
            <el-table-column prop="time" label="下次执行时间" width="200">
              <template slot-scope="scope">
                {{ dayjs(scope.row["job.state"].nextFireTime).format('YYYY-MM-DD HH:mm:ss')}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.row['job.state'].state=='PAUSED'" type="danger" plain="">{{ scope.row["job.state"].state }}</el-button>
                <el-button v-else-if="scope.row['job.state'].state=='NORMAL'" type="success" plain="">{{ scope.row["job.state"].state }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <el-button-group>
                <el-button type="primary" icon="el-icon-view"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
                <el-button type="primary" icon="el-icon-video-pause"></el-button>
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
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      input1: '',
      select: '',
      selected: [],
      tableData: []
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {
    axios
      .get('http://localhost:38080/api/v1/jobs')
      .then(res => {
        console.log('zheshi job')
        console.log(res.data)
        this.tableData = res.data
      })
  },

  methods: {
    dayjs (e) {
      return dayjs(e)
    },
    tosuccessJob (jobid) {
      // console.log(jobid)
      this.$router.push({ path: '/successjob/' + jobid })
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
  margin-top: 60px;
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
