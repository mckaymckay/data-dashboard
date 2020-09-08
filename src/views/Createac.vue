<template>
  <div class="createac">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">波动检测/新建</div>
      <div>
        <span class="span_size">新建波动检测</span>
      </div>
    </div>
    <!-- 页面标识 -->
    <div class="content">
      <div style="height:50px"></div>
      <el-form :model="ruleForm" :rules="rules" label-width="300px" class="demo-ruleForm">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name" style="width: 300px" placeholder="请输入任务名称">{{job_name}}</el-input>
        </el-form-item>
        <div style="height:20px"></div>
        <el-form-item label="任务描述" prop="description">
          <el-input
            v-model="ruleForm.description"
            style="width: 300px"
            placeholder="请输入任务描述"
          >{{job_description}}</el-input>
        </el-form-item>
        <div style="height:20px"></div>
        <el-form-item label="选择数据表" prop="table">
          <el-select v-model="ruleForm.table" @change="func2()" style="width: 300px" placeholder="请选择数据表">
            {{tables}}
            <el-option
              v-for="item in dataList"
              :key="item.TM_ID"
              :label="item.TM_TABLENAME"
              :value="item.TM_ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
          <el-button type="primary" @click="tijiao">
            提交
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <template>
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </template>-->
    <!-- 操作 -->
    <!-- <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
          <el-button type="primary" @click="toperfection()">详细  <i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
      </div>
    </div>-->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      jobname: '',
      jobdescription: '',
      table: '',
      job_name: null,
      job_description: null,
      tables: null,

      dataList: {},

      ruleForm: {
        name: '',
        description: '',
        table: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入任务描述', trigger: 'change' }
        ],
        table: [
          { required: true, message: '请选择数据表', trigger: 'change' }
        ]
      }
    }
  },

  mounted () {
    axios
      .get('http://47.94.199.242:5000/api/v1.0/detect')
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          this.dataList = res.data.data
        }
      }
      )
  },

  methods: {
    back () {
      console.log('back')
      this.$router.push({ path: '/accuracy/' })
    },
    tijiao () {
      this.job_name = this.ruleForm.name
      this.job_description = this.ruleForm.description
      this.tables = this.ruleForm.table
      console.log(this.job_name)
      console.log(this.job_description)
      console.log(this.tables)
      // this.$refs.ruleForm.name((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      if (!this.job_name) {
        alert('请输入任务名称')
        return false
      }
      if (!this.job_description) {
        alert('请输入任务描述')
        return false
      }
      if (!this.tables) {
        alert('请选择数据表')
        return false
      }
      axios
        .post('http://47.94.199.242:5000/api/v1.0/accuracy?tableid=' + this.tables + '&missionname=' + this.job_name + '&description=' + this.job_description)
        .then(res => {
          // if (res.status === 200) {
          console.log(res)
          if (res.data.code === '200') {
            console.log(res.data.message)
            this.$alert('提交成功', '结果', {
              confirmButtonText: '确定',
              callback: () => this.$router.push({ path: '/accuracy/' })
            })
          }
          // }
        })
        // .catch(res => {
        //   console.error()
        // })
    }
    // open () {
    //   this.$alert('提交成功', '结果', {
    //     confirmButtonText: '确定'
    // callback: action => {
    //   console.log(this.$message)
    //   this.$message({
    //     type: 'info',
    //     message: `action: ${action}`
    //   })
    // }
    //   })
    // }
  }
}
</script>
<style scoped>
.createac {
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
.content {
  height: 540px;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
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
