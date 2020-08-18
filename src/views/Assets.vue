<template>
  <div class="assets">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据实体</div>
      <div>
        <span class="span_size">数据列表</span>
      </div>
      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%" height="500px">
      <!-- 数据表 -->
        <el-table-column label="数据表" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 数据库 -->
        <el-table-column label="数据库" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_DBNAME }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.TM_CREATETIME}}</span>
          </template>
        </el-table-column>
      <!-- 更新时间 -->
        <el-table-column label="更新时间" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.TM_UPDATETIME}}</span>
          </template>
        </el-table-column>
      <!-- 规则定义情况 -->
        <el-table-column label="规则定义情况" width="200">
          <template slot-scope="scope">
            <span v-for="item in scope.row" :key="item.TM_ISDEFINED">
              <span style="margin-left: 10px" v-if="item === '1'">已定义</span>
              <span style="margin-left: 10px" v-else-if="item === '0'">未定义</span>
            </span>
          </template>
        </el-table-column>
        <!-- 操作  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="todetails(scope.row.tableName)">详情</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">规则定义</el-button>
            <el-button size="mini" type="text" @click="dialogVisible = true">重置规则</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>将删除这个表所有的度量规则，回到默认状态，即'无需检测'，您确认要重置规则吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 @current-change='changePage' -->
    <div class="pagination_parent">
      <div class="pagination">
      <el-pagination
        :total="1000"
        background
        layout="prev, pager, next"
        >
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      dialogVisible: false, // 重置规则的对话框
      input1: '',
      select: '',
      tableData: []
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {
    axios
      .get('http://47.94.199.242:5000/api/v1.0/assets?page=' + 2 + '&size=10')
      // .get('http://localhost:38080/api/v1/metadata/hive/dbs/tables')
      .then(res => {
        console.log('zheshi assets')
        console.log(res)
        console.log(res.data.data)
        // console.log(res.data.default)
        this.tableData = res.data.data
      })
  },

  methods: {
    // isDefined: function (status) {
    //   var i
    //   console.log(status.length)
    //   for (i = 0; i < status.length; i++) {
    //     if (status[i].TM_ISDEFINED === '1') {
    //       return '已定义'
    //     } else {
    //       return '未定义'
    //     }
    //   }
    // },
    dayjs (e) {
      return dayjs(e)
    },
    handleClose (done) {
      this
        // .$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    todetails (tablename) {
      this.$router.push({ path: '/details/' + tablename })
      console.log(tablename)
    }
  }
}
</script>
<style scoped>
.assets {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  margin-top: 60px;
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
