<template>
  <div class="details">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div><el-page-header @back="goBack"></el-page-header></div>
        <!-- <span class="span_size">检测结果</span> -->
        <div class="h3">数据实体/详情</div>
      </div>

      <div>
        <span class="span_size">{{table_name}}</span>
        <!-- <span class="span_size">TPAS-LZ</span> -->
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          height="550">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="字段名" width="200">
            <template slot-scope="scope">
                {{ scope.row.FM_TABLEFIELD }}
            </template>
          </el-table-column>
          <el-table-column label="质量报告" width="200">
            <template slot-scope="scope">
              {{ scope.row.PS_PROBLEM }}
            </template>
          </el-table-column>
          <el-table-column label="规则定义" width="250">
            <template slot-scope="scope">
              {{ scope.row.MS_MEASURE }}
            </template>
          </el-table-column>
          <el-table-column
            property="address"
            label="质量改进">
            <template slot-scope="scope">
              <span v-if="scope.row.PS_PROBLEM" style="color:#409EFF" @click="tofill(scope.row.FM_TABLEFIELD)">
                <el-button type="primary" plain>更改</el-button>
                </span>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import dayjs from 'dayjs'
import request from '../request'
export default {
  data () {
    return {
      tableData: [],
      table_name: '',
      value: '',
      currentRow: null
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.table_name = this.$route.params.tablename
    var tableid = this.$route.params.tableid
    console.log(this.$route.params.tableid)
    request({
      url: '/assets/' + tableid + '?page=1&size=50'
    })
      .then(res => {
        console.log('zheshi details')
        console.log(res.data.data)
        this.tableData = res.data.data
      })
  },
  methods: {
    dayjs (e) {
      return dayjs(e)
    },
    goBack () {
      // this.$router.push({ path: '/Assets' })
      this.$router.back()
    },
    tofill (fieldname) {
      this.$router.push({ path: '/fill/' + this.$route.params.tableid + '/' + this.$route.params.tablename + '/' + fieldname })
    },
    toperfection () {
      var tname = this.$route.params.tablename
      console.log(tname)
      this.$router.push({ path: '/perfection/' + tname })
    }
  }
}
</script>
<style scoped>
.details {
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
  width: 305px;
  margin: 5px auto;
}
</style>
