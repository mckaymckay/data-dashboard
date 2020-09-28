<template>
  <div class="resjob">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div><el-page-header @back="goBack"></el-page-header></div>
        <span class="h3">检测任务</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">任务结果</span>
      </div>
      <div>
        <span class="span_size">任务名称:&nbsp;&nbsp;&nbsp;&nbsp;{{jobname}}    </span>
      </div>
      <!-- <el-page-header @back="goBack"></el-page-header> -->
    </div>
    <div class="content">
      <!-- 表格 -->
      <div class="table">
          <el-table
        :data="tableData" style="width: 100%" height="500px">
          <el-table-column label="" width="200">
            <template slot-scope="">
              <span style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" width="260">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.FL_UPDATETIME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行状态" width="260">
            <template slot-scope="scope">
              <el-button v-if="scope.row['FL_STATUS']==='已完成'" type="success" >{{ scope.row.FL_STATUS }}</el-button>
              <el-button v-else-if="scope.row['FL_STATUS']==='未执行'" type="info" plain>{{ scope.row.FL_STATUS }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="数据量">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.FL_HISTORYNUMBER }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="" width="260">
            <template slot-scope="">
              <span style="margin-left: 10px"></span>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 任务名称
      jobname: '',
      seven_chart: null,
      month_chart: null,
      tableData: []
    }
  },
  mounted () {
    this.get_data()
  },
  methods: {
    back () {
      this.$router.push({ path: '/Job/' })
    },
    get_data () {
      console.log(this.$route.params)
      this.jobname = this.$route.params.jobname
      var jobid = this.$route.params.jobid
      // var status = this.$route.params.status
      axios
        .get('http://47.94.199.242:5000/api/v1.0/accuracyResult?tableid=' + jobid)
        .then(res => {
          console.log(res)
        //   this.tableData = res.data.data
        })
    },
    goBack () {
      this.$router.back()
    }
  }

}
</script>
<style scoped>
.resjob {
  padding: 10px;
}
.lll{
  display: flex;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
  line-height: 24px;
}
.content {
  padding: 10px 0;
  background-color: white;
  /* height: 660px; */
}
.table{
  margin: 0px 10px;
  background-color: white;
  height: 100%;
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
.pagination_parent {
  background: white;
  border-radius: 4px;
}
.pagination {
  padding: 5px;
  border-radius: 4px;
  width: 120px;
  margin: 5px auto;
}
</style>
