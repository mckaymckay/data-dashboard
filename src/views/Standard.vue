<template>
  <div class="standard">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div><el-page-header @back="goBack"></el-page-header></div>
          <span class="h3">质量评估</span>
          <el-divider direction="vertical"></el-divider>
          <span class="h3">质量改进</span>
          <el-divider direction="vertical"></el-divider>
          <span class="h3">标准化改进</span>
      </div>

        <div style="height:20px"></div>
      <div>
        <span class="span_size" style="margin-left:20px;font-size:larger">{{tablename}}</span>
      </div>
      <div style="height:10px"></div>
      <span style="margin-left:20px;font-size:small;color:#606266">吧啦啦啦我不知道写点啥。</span>
    </div>
    <!-- 表格 -->
    <div class="content">
      <div class="content1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">

            <el-form-item label="数据表">
              <el-input v-model="ruleForm.tablename" style="width: 300px" placeholder="Orgnization"></el-input>
            </el-form-item>

            <el-form-item label="问题字段">
              <el-input v-model="ruleForm.fieldname" style="width: 300px" placeholder="含有空值"></el-input>
            </el-form-item>

            <!-- ///// -->
            <el-form-item label="问题列表">
            <template>
              <el-table
                :data="tableData"
                border
                :cell-style="handlestyle"
                style="width:500px">
                <el-table-column
                  label="问题"
                  min-width="50%">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ITEMS }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="标准"
                  min-width="50%">
                  <template slot-scope="scope">
                  <el-select v-model="standard[scope.$index]" placeholder="请选择">
                    <el-option style="color:#409EFF"
                      v-for="item in options"
                      :key="item.ID"
                      :label="item.ID"
                      :value="item.ID">
                    </el-option>
                  </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left:100px" type="primary" @click="submitForm()">修改</el-button>
                <!-- <el-button @click="resetForm('numberValidateForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import request from '../request'
export default {
  data () {
    return {
      standard: [],
      tablename: '',
      ruleForm: {
        tableid: '',
        tablename: '',
        fieldname: ''
      },
      rules: {
        fields: [
          { required: true, message: '', trigger: 'blur' },
          { min: 3, max: 5, message: '', trigger: 'blur' }
        ],
        question: [
          { required: true, message: '', trigger: 'change' }
        ],
        advice: [
          { required: true, message: '', trigger: 'change' }
        ],
        fill: [
          { required: true, message: '请输入填充值', trigger: 'change' }
        ]
      },
      tableData: [],
      options: [],
      value: ''
    }
  },
  mounted () {
    // console.log(this.$route.params)
    this.tablename = this.$route.params.tablename
    this.ruleForm.tablename = this.$route.params.tablename
    this.ruleForm.fieldname = this.$route.params.fieldname
    // 获取出现的标准化的问题
    this.getpro()
    // 获取标准表
    this.getdata()
  },

  methods: {
    // 获取出现的问题
    getpro () {
      request({
        url: '/problemfield?tableid=' + this.$route.params.tableid + '&fieldname=' + this.$route.params.fieldname
      })
        .then(res => {
          console.log(res)
          if (res.data.code === '200') {
            this.tableData = res.data.data
          } else {
            this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    // 获取标准表
    getdata () {
      request({
        url: '/standard?fieldname=' + this.$route.params.fieldname
      })
        .then(res => {
          console.log(res)
          if (res.data.code === '200') {
            this.options = res.data.data
          } else {
            this.$alert(res.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    // 改变问题颜色
    handlestyle (row, column, rowIndex, columnIndex) {
      if (row.column.label === '问题') {
        return 'color:rgb(64, 158, 255)'
      } else {
        return ''
      }
    },
    // 质量改进
    submitForm (formName) {
      const result = {
        table_name: this.$route.params.tablename,
        field_name: this.$route.params.fieldname,
        data: this.tableData.map((value, index) => {
          return {
            source_data: value.ITEMS,
            target_data: this.standard[index]
          }
        }).filter(v => v.target_data !== undefined)
      }
      console.log(result)
      if (result.data.length !== 0) {
        request({
          url: '/quality-singular',
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          data: result
        })
          .then(res => {
            console.log(res)
            if (res.data.code === '200') {
              this.$alert('修改成功', '结果', {
                confirmButtonText: '确定'
              })
            } else {
              console.log(res.data.message)
              this.$alert('res.data.message', '结果', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$alert('请选择填充值', '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.standard {
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
   display:flex
}
.content {
  /* padding: 50px; */
  background-color: white;
  /* height: 500px; */
}
.content1{
  padding:50px
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
