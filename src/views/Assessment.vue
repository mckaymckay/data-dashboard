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
        <!-- <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">{{searchname}}
          <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input> -->
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
      select: '',
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
    console.log(this.$route.query.tablename)
    if (this.$route.query.tablename === undefined) {
      this.handleCurrentChange(1)
    } else {
      this.fromassets()
    }
  },
  methods: {
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
        .get('http://47.94.199.242:5000/api/v1.0/searchresult?tablename=' + this.value)
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
