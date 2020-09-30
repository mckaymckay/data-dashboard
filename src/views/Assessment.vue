<template>
  <div class="assessment">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div>
          <el-page-header @back="goBack"></el-page-header>
          <!-- <span class="span_size">检测结果</span> -->
        </div>
        <!-- <el-page-header @back="goBack" content="质量评估"></el-page-header> -->
        <div class="h3">质量评估</div>
      </div>

      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">{{searchname}}
          <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
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
      <!-- 数据表 -->
        <el-table-column label="数据表" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 字段 -->
        <el-table-column label="字段" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.FM_TABLEFIELD }}</span>
          </template>
        </el-table-column>
      <!-- 问题描述 -->
        <el-table-column label="问题描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.PS_PROBLEM }}</span>
          </template>
        </el-table-column>
      <!-- 操作 -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:#409EFF" @click="tofill(scope.row.TM_ID,scope.row.TM_TABLENAME,scope.row.FM_TABLEFIELD)">
              <el-button size="small" type="primary" plain>更改</el-button>
              </span>
          </template>
        </el-table-column>
        <!-- 是否更改完成 -->
        <el-table-column label="是否更改完成" width="300">
          <template slot-scope="">
            <span style="margin-left: 10px;color:#409EFF">
              <!-- <el-button type="primary" plain>已更改</el-button> -->
              <el-button size="small" type="success" icon="el-icon-check" circle></el-button>
              </span>
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
export default {
  data () {
    return {
      input1: '',
      searchname: '',
      select: '',
      tableData: [],
      table_name: '',
      page: 1,
      total: 0,
      limit: 10,
      radio: 1
    }
  },

  mounted () {
    console.log(this.$route.query.tablename)
    if (this.$route.query.tablename === undefined) {
      // this.handleCurrentChange(1)
      this.handlechange()
    } else {
      this.fromassets()
    }
  },
  methods: {
    handlechange () {
      console.log(this.radio)
      const typeEnum = {
        2: 'OD_TPAS',
        3: 'OD_SRMS',
        4: 'OD_YLB'
      }
      if (this.radio === 1) {
        this.handleCurrentChange(1)
      } else {
        axios
          .get('http://47.94.199.242:5000/api/v1.0/problemlist?page=1&size=20&types=' + typeEnum[this.radio] + '_%')
          .then(res => {
            console.log('zheshi sousuo')
            console.log(this.radio)
            console.log(res)
            this.tableData = res.data.data
          })
      }
    },
    tofill (tableid, tablename, fieldname) {
      this.$router.push({ path: '/fill/' + tableid + '/' + tablename + '/' + fieldname })
    },
    // 从数据实体而来
    fromassets () {
      this.table_name = this.$route.query.tablename
      console.log(this.table_name)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/searchresult?tablename=' + this.table_name)
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 根据表名搜索
    search () {
      axios
        .get('http://47.94.199.242:5000/api/v1.0/searchresult?tablename=' + this.input1)
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
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
    },
    goBack () {
      this.$router.back()
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
