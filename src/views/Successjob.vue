<template>
  <div class="successjob">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">检测任务/任务列表</div>
      <div>
        <span class="span_size">任务执行实例</span>
      </div>
      <div class="parent">
        <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          height="500">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="任务ID" width="300">
            <template slot-scope="scope">
                {{ scope.row["appId"] }}
              </template>
          </el-table-column>
          <el-table-column label="时间" width="300">
            <template slot-scope="scope">
                {{dayjs(scope.row["expireTimestamp"]).format('YYYY-MM-DD HH:mm:ss')}}
              </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row["state"] }}
            </template>
          </el-table-column>
        </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="pagination_parent">
      <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      tableData: [],
      value: '',
      currentRow: null
    }
  },
  mounted () {
    var jobId = this.$route.params.jobId
    console.log(this.$route.params.jobId)
    axios
      .get('http://localhost:38080/api/v1/jobs/instances?jobId=' + jobId + '&page=' + 0 + '&size=' + 200)
      .then(res => {
        console.log('zheshi successjob')
        console.log(res.data)
        this.tableData = res.data
      })
  },
  methods: {
    dayjs (e) {
      return dayjs(e)
    },
    back () {
      this.$router.push({ path: '/job' })
    }
  }
}
</script>
<style scoped>
.successjob {
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
  margin-right: 10px;
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
  width: 400px;
  margin: 5px auto;
}
</style>
