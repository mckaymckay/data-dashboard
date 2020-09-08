<template>
  <div class="standard">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">规则定义</div>
      <div>
        <span class="span_size">标准化检测    </span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
            <el-form-item label="选择字段" prop="field">
              <el-input v-model="ruleForm.field" style="width: 300px" placeholder="Orgnization"></el-input>
            </el-form-item>
            <el-form-item label="选择分类" prop="question">
              <el-input v-model="ruleForm.question" style="width: 300px" placeholder="含有空值"></el-input>
            </el-form-item>
            <el-form-item label="更改建议" prop="advice">
              <el-input v-model="ruleForm.advice" style="width: 300px" placeholder="[1:国家级；2:省级；3：区级；4:校级]"></el-input>
            </el-form-item>
            <el-form-item label="填充值" prop="fill">
              <el-input v-model="ruleForm.fill" style="width: 300px" placeholder="请输入填充值"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 操作 -->
    <!-- <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left">返回</el-button>
          <el-button type="primary">改进  <i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
      }
    }
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
