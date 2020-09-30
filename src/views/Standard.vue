<template>
  <div class="standard">
    <!-- 页面标识 -->
    <div class="pages">
        <span class="h3">质量评估</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">质量改进</span>
        <el-divider direction="vertical"></el-divider>
        <span class="h3">标准化改进</span>
        <div style="height:20px"></div>
      <div>
        <span class="span_size" style="margin-left:20px;font-size:larger">{{tablename}}</span>
      </div>
      <div style="height:10px"></div>
      <span style="margin-left:20px;font-size:small;color:#606266">吧啦啦啦我不知道写点啥。</span>
    </div>
    <!-- 表格 -->
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
            <el-form-item label="数据表" prop="field">
              <el-input v-model="ruleForm.field" style="width: 300px" placeholder="Orgnization"></el-input>
            </el-form-item>
            <el-form-item label="问题字段" prop="question">
              <el-input v-model="ruleForm.question" style="width: 300px" placeholder="含有空值"></el-input>
            </el-form-item>
            <!-- ///// -->
            <el-form-item label="问题列表" prop="advice">
            <template>
              <el-table
                :data="tableData"
                border
                style="width:400px">
                <el-table-column
                  label="问题"
                  width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="标准"
                  width="230">
                  <el-select v-model="value" clearable placeholder="请选择" style="width:200px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                  <!-- <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                  </template> -->
                </el-table-column>
              </el-table>
            </template>
            </el-form-item>
            <!-- <el-form-item label="问题列表" prop="advice">
              <el-input v-model="ruleForm.advice" style="width: 300px" placeholder="[1:国家级；2:省级；3：区级；4:校级]"></el-input>
            </el-form-item>
            <el-form-item label="更改建议" prop="fill">
              <el-input v-model="ruleForm.fill" style="width: 300px" placeholder="请输入填充值"></el-input>
            </el-form-item> -->
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
