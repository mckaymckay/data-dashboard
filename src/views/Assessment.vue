<template>
  <div class="assessment">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">质量评估</div>
      <div>
        <span class="span_size">检测结果</span>
      </div>
      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
          <!-- style="background-color:#3894FF" -->
        </el-input>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%" height="500px">
      <!-- 数据表 -->
        <el-table-column label="数据表" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.table }}</span>
          </template>
        </el-table-column>
      <!-- 数据库 -->
        <el-table-column label="字段" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.fields }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column label="问题描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.question }}</span>
          </template>
        </el-table-column>
      <!-- 更新时间 -->
        <el-table-column label="更改建议" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.modify }}</span>
          </template>
        </el-table-column>
        <!-- 操作  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">更改</el-button>
          </template>
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
export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      input1: '',
      select: '',
      tableData: [
        {
          table: 'TPAS_ZYRY',
          fields: 'Orgnazition',
          question: '含有空值',
          modify: '填充'
        },
        {
          table: 'TPAS_ZYRY',
          fields: 'Orgnazition',
          question: '含有空值',
          modify: '填充'
        },
        {
          table: 'TPAS_ZYRY',
          fields: 'Orgnazition',
          question: '含有空值',
          modify: '填充'
        },
        {
          table: 'TPAS_ZYRY',
          fields: 'Orgnazition',
          question: '含有空值',
          modify: '填充'
        }
      ]
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
