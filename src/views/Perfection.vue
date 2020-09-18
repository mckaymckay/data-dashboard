<template>
  <div class="perfection">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据实体/详情</div>
      <div>
        <span class="span_size">{{tablename}}</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
          height="550">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="date"
            label="字段名"
            width="200">
          </el-table-column>
          <el-table-column
            property="name"
            label="规则定义"
            width="200">
          </el-table-column>
          <el-table-column
            property="address"
            label="问题描述"
            width="250"
            >
          </el-table-column>
          <el-table-column
            property="address"
            label="操作">
                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                更改
                </el-button>
          </el-table-column>
        </el-table>
    </div>
    <!-- 操作 -->
    <!-- <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left">返回</el-button>
        </el-button-group>
      </div>
    </div> -->
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
export default {
  data () {
    return {
      tablename: '',
      tableData: [{
        date: 'TPAS-ZYRY',
        name: '无需检测',
        address: '有缺失值'
      },
      {
        date: 'Orgnization',
        name: 'string',
        address: '有缺失值'
      },
      {
        date: 'Orgname',
        name: 'string',
        address: '有缺失值  '
      },
      {
        date: 'JB',
        name: 'string',
        address: '有缺失值'
      }],
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
  methods: {
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
.perfection {
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
