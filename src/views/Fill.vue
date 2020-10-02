<template>
  <div class="fill">
    <!-- 页面标识 -->
    <div class="pages">
        <span class="h3">质量评估</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">质量改进</span>
        <el-divider direction="vertical"></el-divider>
        <span class="h3">空值填充</span>
        <div style="height:20px"></div>
      <div>
        <span class="span_size" style="margin-left:20px;font-size:larger">{{tablename}}</span>
      </div>
      <div style="height:10px"></div>
      <span style="margin-left:20px;font-size:small;color:#606266">统一填充：使用同一个值填充字段;条件填充：根据条件分类处理空值。</span>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="400px"
        class="demo-ruleForm">
            <el-form-item label="数据表">
              <el-input v-model="ruleForm.tablename" style="width: 300px" placeholder="">
                <span>{{tablename}}</span>
                </el-input>
            </el-form-item>
            <el-form-item label="问题字段">
              <el-input v-model="ruleForm.fieldname" style="width: 300px" placeholder="">{{fieldname}}</el-input>
            </el-form-item>
            <el-form-item label="问题描述">
              <el-input v-model="ruleForm.problem" style="width: 300px" placeholder="">含有空值</el-input>
              <!-- <el-select v-model="value" clearable placeholder="请选择" style="width:300px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="填充方式">
              <template>
                <el-radio-group v-model="radio" @change="handlechange">
                  <div>
                    <el-radio :label="1">统一填充</el-radio>
                  </div>
                  <div style="margin-top:10px">
                    <el-radio :label="2">条件填充:请输入正确的sql语句</el-radio>
                  </div>
                </el-radio-group>
              </template>
             </el-form-item>
            <el-form-item label="填充值" prop="fill">
              <!-- <el-input v-model="ruleForm.fillkey" style="width: 300px" placeholder="请输入sql语句">{{modifyvalue}}</el-input> -->
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="ruleForm.fillkey"
                style="width: 300px"
                clearable>
                {{modifyvalue}}
              </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableid: '',
      tablename: '',
      fieldname: '',
      modifyvalue: '',
      radio: 1,
      ruleForm: {
        tablename: '',
        fieldname: '',
        problem: '含有空值',
        fillkey: '系统自动填充“' + this.$route.params.fieldname + '”字段'
      },
      rules: {
        // fields: [
        //   { required: true, message: '', trigger: 'blur' },
        //   { min: 3, max: 5, message: '', trigger: 'blur' }
        // ],
        // fill: [
        //   { required: true, message: '', trigger: 'change' }
        // ]
      }
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.tableid = this.$route.params.tableid
    this.tablename = this.$route.params.tablename
    this.ruleForm.tablename = this.$route.params.tablename
    this.ruleForm.fieldname = this.$route.params.fieldname
  },
  methods: {
    handlechange () {
      console.log(this.radio)
      if (this.radio === 2) {
        this.ruleForm.fillkey = ''
      } else {
        this.ruleForm.fillkey = '系统自动填充' + this.$route.params.fieldname
      }
    },
    submitForm (formName) {
      this.modifyvalue = this.ruleForm.fillkey
      console.log(this.modifyvalue)
      if (!this.modifyvalue) {
        this.$alert('请输入填充值', '提示', {
          confirmButtonText: '确定'
        })
      }
      axios
        .put('http://47.94.199.242:5000/api/v1.0/quality?tableid=' + this.tableid + '&fieldname=' + this.$route.params.fieldname + '&modifyvalue=' + this.modifyvalue)
        .then(res => {
          if (res.data.code === '200') {
            console.log(res)
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({ path: '/assessment/' })
              }
            })
          }
        }
        )
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    back () {
      console.log('back')
      // console.log(this.ruleForm.fillkey)
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.fill {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
}
.content {
  padding: 50px;
  background-color: white;
  height: 500px;
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
