<template>
  <div class="details">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据实体/详情</div>
      <div>
        <span class="span_size">TPAS-ZYRY</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          height="580">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column label="字段名" width="200">
            <template slot-scope="scope">
                {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="类型" width="200">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="规则定义" width="250">
            <el-select v-model="value" placeholder="无需检测">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-table-column>
          <el-table-column
            property="address"
            label="结果">
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
    var tname = this.$route.params.tablename
    console.log(this.$route.params.tablename)
    axios
      .get('http://localhost:38080/api/v1/metadata/hive/dbs/tables')
      .then(res => {
        console.log('zheshi details')
        var rows = res.data.default
        if (rows) {
          rows.forEach(item => {
            if (item.tableName === tname) {
              console.log(item.sd.cols)
              this.tableData = item.sd.cols
              console.log(item.sd.cols)
            }
          })
        }
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
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
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
