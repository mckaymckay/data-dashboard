<template>
  <div class="accuracy">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">波动检测</div>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline">波动检测</el-button>
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
      :data="tableData" style="width: 100%" height="500px">
      <!-- 度量名称 -->
        <el-table-column label="度量名称" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      <!-- 度量类型 -->
        <el-table-column label="度量类型" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
      <!-- 描述 -->
        <el-table-column label="描述" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description}}</span>
          </template>
        </el-table-column>
      <!-- 操作 -->
        <el-table-column label="操作">
            <el-button-group>
            <el-button type="primary" icon="el-icon-view"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-button-group>
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
          name: 'measure_accuracy',
          type: 'accuracy',
          description: 'measure of accuracy'
        },
        {
          name: 'measure_accuracy',
          type: 'accuracy',
          description: 'measure of accuracy'
        },
        {
          name: 'measure_accuracy',
          type: 'accuracy',
          description: 'measure of accuracy'
        },
        {
          name: 'measure_accuracy',
          type: 'accuracy',
          description: 'measure of accuracy'
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
