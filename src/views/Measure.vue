<template>
  <div class="measure">
    <!-- 页面标识 -->
    <div class="pages">
        <span class="h3">数据实体</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">规则定义</span>
      <div>
        <span class="span_size">{{table_name}}</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" highlight-current-row style="width: 100%" height="500">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="字段名" width="400">
          <template slot-scope="scope">{{ scope.row.FM_TABLEFIELD }}</template>
        </el-table-column>
        <el-table-column label="规则定义" width="">
          <template slot-scope="scope"  style="color:#409EFF">
            <el-select v-model="measures[scope.$index]"  style="color:#409EFF">
              <el-option style="color:#409EFF"
                v-for="item in options"
                :key="item.MS_MEASURE"
                :label="item.MS_MEASURE"
                :value="item.MS_MEASURE"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 操作 -->
    <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-upload" @click="tijiao">提交</el-button>
          <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 嵌套表单的 Dialog -->
    <el-dialog title="请输入任务名称" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form.missionname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="quding">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
// import dayjs from 'dayjs'
export default {
  data () {
    return {
      tableData: [],
      measures: [],
      options: [],
      table_name: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        missionname: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    console.log(this.$route.params)
    // var tableid = this.$route.params.tableid
    this.table_name = this.$route.params.tablename
    console.log(this.$route.params.tableid)
    axios
      .get('http://47.94.199.242:5000/api/v1.0/assets/' + this.$route.params.tableid + '?page=1&size=50')
      .then((res) => {
        console.log('zheshi measure')
        console.log(res)
        this.tableData = res.data.data
        this.tableData.forEach((value, index) => {
          this.measures[index] = value.MS_MEASURE
          // '无需检测'
        })
      })
    axios
      .get('http://47.94.199.242:5000/api/v1.0/measurelist')
      .then((res) => {
        console.log('zheshi measurelist')
        // console.log(res.data.data)
        this.options = res.data.data
        console.log(this.options)
      })
  },

  methods: {
    tijiao () {
      this.dialogFormVisible = true
    },
    quding () {
      if (this.form.missionname.length !== 0) {
        this.dialogFormVisible = false
        this.submit()
      } else {
        this.$alert('请输入任务名称', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    submit () {
      console.log(this.tableData)
      console.log(this.measures)
      const result = {
        JS_JOBNAME: this.form.missionname,
        JS_TABLENAME: this.$route.params.tablename,
        data: this.tableData.map((value, index) => {
          return {
            JS_TABLEFIELD: value.FM_TABLEFIELD,
            MS_MEASURE: this.measures[index]
          }
        }).filter(v => v.MS_MEASURE !== '无需检测')
      }
      console.log(result.data.length)
      if (result.data.length !== 0) {
        axios({
          url: 'http://47.94.199.242:5000/api/v1.0/measure',
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          data: result
        })
          .then(res => {
            console.log(res)
            if (res.data.code === '200') {
              console.log(res.data.message)
              this.$alert('提交成功', '结果', {
                confirmButtonText: '确定'
              })
              this.$router.push({ path: '/measure1/' })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$alert('请至少创建一项规则', '提示', {
          confirmButtonText: '确定'
        })
        // this.dialogFormVisible = false
      }
    },
    back () {
      console.log('back')
      this.$router.push({ path: '/measure1/' })
    }
  }
}
</script>
<style scoped>
.measure {
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
  color: #909399;
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
  width: 200px;
  margin: 5px auto;
}
</style>
