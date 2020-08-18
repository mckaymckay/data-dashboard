<template>
  <div class="addaccuracy">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">波动检测/</div>
      <div>
        <span class="span_size">新建波动检测</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 190px" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="数据表" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择源数据">
                <el-option label="TPAS_ZYRY" value="zyry"></el-option>
                <el-option label="TPAS_SFYL" value="sfyl"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字段名称" prop="ziduan">
                <el-select v-model="ruleForm.ziduan" placeholder="请选择字段">
                <el-option label="ID" value="ID"></el-option>
                <el-option label="Name" value="Name"></el-option>
                <el-option label="Orgnization" value="Orgnization"></el-option>
                <el-option label="Orgname" value="Orgname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上次更新时间" prop="time">
              <el-input v-model="ruleForm.time" style="width: 190px" placeholder="2020-08-07/22:10"></el-input>
            </el-form-item>
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="ruleForm.description" style="width: 190px" placeholder="请输入任务描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择源数据', trigger: 'change' }
        ],
        ziduan: [
          { required: true, message: '请选择字段', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入任务描述', trigger: 'change' }
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
.addaccuracy {
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
