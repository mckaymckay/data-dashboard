<template>
  <div class="accuracy">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">波动检测</div>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="tomeasure">波动检测</el-button>
      </div>
      <div class="search_button">
        <el-alert
            type="success"
            description="例子：假设表A上次更新后有1000条数据，此次更新后有999条数据可以与之吻合，
那么准确度(%)=999/1000 * 100% = 99.9%"
            show-icon>
        </el-alert>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="500px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!-- 度量名称 -->
        <el-table-column label="度量名称" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_MISSIONNAME }}</span>
          </template>
        </el-table-column>
      <!-- 度量类型 -->
        <el-table-column label="度量类型" width="250">
          <template slot-scope="">
            <span style="margin-left: 10px">accuracy</span>
          </template>
        </el-table-column>
      <!-- 描述 -->
        <el-table-column label="描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_DESCRIPTION}}</span>
          </template>
        </el-table-column>
      <!-- 操作 -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button-group>
            <el-button type="primary" icon="el-icon-view" @click="checkjob">*</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deletejob"></el-button>
            <!-- <el-button type="primary" icon="el-icon-video-play" @click="openjob(scope.row.FM_ID)"></el-button> -->
            <el-button v-if="scope.row['FM_STATUS']==='执行'" type="primary" @click="redefine(scope.row.JS_ID)" icon="el-icon-video-pause"></el-button>
            <el-button v-else-if="scope.row['FM_STATUS']==='暂停'" type="primary" @click="redefine(scope.row.JS_ID)" icon="el-icon-video-play"></el-button>
            </el-button-group>
          </template>
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
// import dayjs from 'dayjs'
export default {

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
    tomeasure () {
      this.$router.push({ path: '/createac/' })
    },
    checkjob () {
      console.log('checkjob')
    },
    deletejob () {
      console.log('deletejob')
    },
    openjob (jobid) {
      console.log(jobid)
      this.$router.push({ path: '/openjob/' + jobid })
    },
    // 分页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/accuracy?page=' + val + '&size=10')
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
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
    }
  }
}
</script>
<style scoped>
.accuracy {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 120px;
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
