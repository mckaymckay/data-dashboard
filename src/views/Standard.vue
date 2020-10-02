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
                style="width:500px">
                <el-table-column
                  label="问题"
                  min-width="50%">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="标准"
                  min-width="50%">
                  <template slot-scope="scope">
                  <el-select v-model="scope.row.value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left:100px" type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      tableid: '',
      tablename: '',
      fieldname: '',
      modifyvalue: '',
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎'
      }, {
        date: '2016-05-04',
        name: '王小虎'
      }, {
        date: '2016-05-01',
        name: '王小虎'
      }, {
        date: '2016-05-03',
        name: '王小虎'
      }],
      options: [{
        value: '选项1',
        label: '1'
      }, {
        value: '选项2',
        label: '2'
      }, {
        value: '选项3',
        label: '3'
      }, {
        value: '选项4',
        label: '4'
      }, {
        value: '选项5',
        label: '5'
      }],
      value: ''
    }
  },
  mounted () {
    console.log(this.$route.params)
    // this.tableid = this.$route.params.tableid
    this.tablename = this.$route.params.tablename
    this.ruleForm.tablename = this.$route.params.tablename
    this.ruleForm.fieldname = this.$route.params.fieldname
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
