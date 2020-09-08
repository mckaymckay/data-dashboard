<template>
  <div class="details">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据实体/详情</div>
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
          height="500">
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
            <!-- <el-select v-model="value" placeholder="无需检测">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select> -->
          </el-table-column>
          <el-table-column
            property="address"
            label="质量改进">
            <template slot-scope="scope">
              <span v-if="scope.row.PS_PROBLEM" style="color:#409EFF">更改</span>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <!-- 操作 -->
    <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
          <el-button type="primary" @click="toperfection()">详细  <i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
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
      tableData: [],
      table_name: '',
      options: [{
        value: '选项1',
        label: '无需检测'
      }, {
        value: '选项2',
        label: '标准化检查'
      }, {
        value: '选项3',
        label: '完整性检查'
      }, {
        value: '选项4',
        label: '标准化检查'
      }, {
        value: '选项5',
        label: '奇异值检查'
      }],
      value: '',
      currentRow: null
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.table_name = this.$route.params.tablename
    var tableid = this.$route.params.tableid
    console.log(this.$route.params.tableid)
    axios
      // .get('http://localhost:38080/api/v1/metadata/hive/dbs/tables')
      .get('http://47.94.199.242:5000/api/v1.0/assets/' + tableid + '?page=1&size=10')
      .then(res => {
        console.log('zheshi details')
        console.log(res.data.data)
        this.tableData = res.data.data
        // var rows = res.data.default
        // if (rows) {
        //   rows.forEach(item => {
        //     if (item.tableName === tname) {
        //       console.log(item.sd.cols)
        //       this.tableData = item.sd.cols
        //       console.log(item.sd.cols)
        //     }
        //   })
        // }
      })
  },
  methods: {
    dayjs (e) {
      return dayjs(e)
    },
    back () {
      this.$router.push({ path: '/Assets' })
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
