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
                <el-radio-group v-model="radio">
                  <el-radio :label="3">统一填充</el-radio>
                  <el-radio :label="6">条件填充</el-radio>
                </el-radio-group>
              </template>
             </el-form-item>
            <el-form-item label="填充值" prop="fill">
              <el-input v-model="ruleForm.fillkey" style="width: 300px" placeholder="请输入填充值">{{modifyvalue}}</el-input>
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
      radio: 3,
      ruleForm: {
        tablename: '',
        fieldname: '',
        problem: '含有空值',
        fillkey: '系统自动填充' + this.$route.params.fieldname
      },
      rules: {
        // fields: [
        //   { required: true, message: '', trigger: 'blur' },
        //   { min: 3, max: 5, message: '', trigger: 'blur' }
        // ],
        // fill: [
        //   { required: true, message: '', trigger: 'change' }
        // ]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
    submitForm (formName) {
      this.modifyvalue = this.ruleForm.fillkey
      // console
      if (!this.modifyvalue) {
        alert('请输入填充值')
        return false
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
