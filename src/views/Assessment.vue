<template>
  <div class="assessment">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div>
          <el-page-header @back="goBack"></el-page-header>
          <!-- <span class="span_size">检测结果</span> -->
        </div>
        <!-- <el-page-header @back="goBack" content="质量评估"></el-page-header> -->
        <div class="h3">质量评估</div>
      </div>

      <div class="search_button">
        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">{{searchname}}
          <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <!-- 主题库搜索 -->
    <div style="background-color:white">
      <div style="line-height: 50px;margin-left: 40px">
        <span style="color:#409EFF;margin-right:20px">主 题 库: </span>
        <template>
          <el-radio-group v-model="radio" @change="handlechange">
            <el-radio :label="1">全部数据</el-radio>
            <el-radio :label="2">教师档案库</el-radio>
            <el-radio :label="3">教师课题库</el-radio>
            <el-radio :label="4">云录播</el-radio>
            <el-radio :label="5">数据分析</el-radio>>
          </el-radio-group>
        </template>
      </div>
      <div style="height:10px;background-color:#edeff3"></div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table
      :data="tableData" style="width: 100%">
      <!-- 数据表 -->
        <el-table-column label="数据表" min-width="30%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
          </template>
        </el-table-column>
      <!-- 字段 -->
        <el-table-column label="字段" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text">{{ scope.row.FM_TABLEFIELD }}</el-button>
          </template>
        </el-table-column>
      <!-- 问题描述 -->
        <el-table-column label="问题描述" min-width="20%">
          <template slot-scope="scope">
            <span>{{ scope.row.PS_PROBLEM }}</span>
          </template>
        </el-table-column>
      <!-- 操作 -->
        <el-table-column label="操作" min-width="20%">
          <el-button-group slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="添加即时任务" placement="top-start">
              <!-- FM_STATUS：0-没问题，无需更改；1-有问题，需要更改；2-已改进，无需更改 -->
              <el-button v-if="scope.row.FM_STATUS==='1'&scope.row.PS_PROBLEM==='含有空值'" @click="tofill(scope.row.TM_ID,scope.row.TM_TABLENAME,scope.row.FM_TABLEFIELD)" size="small" type="primary" plain>更改</el-button>
              <el-button v-else-if="scope.row.FM_STATUS==='1'&scope.row.PS_PROBLEM==='不符合标准值'" @click="tostandard(scope.row.TM_ID,scope.row.TM_TABLENAME,scope.row.FM_TABLEFIELD)" size="small" type="primary" plain>更改</el-button>
              <el-button v-else-if="scope.row.FM_STATUS==='1'&scope.row.PS_PROBLEM==='含有奇异值'" @click="tostandard1(scope.row.TM_ID,scope.row.TM_TABLENAME,scope.row.FM_TABLEFIELD)" size="small" type="primary" plain>更改</el-button>
              <el-button v-else type="success" plain @click="handlechoice" size="small">无需更改</el-button>
            </el-tooltip>
            <!-- 问题展示 -->
            <el-popover
              placement="right"
              width="1000"
              trigger="click">
              <el-table
              :data="gridData"
              height="400">

                <el-table-column
                      v-for="(value,key,index) in items"
                      :key="index"
                      :label="key"
                    >
                  <template slot-scope="scope">
                  {{scope.row[key]}}
                  </template>
                </el-table-column>
              </el-table>
              <el-button size="small" slot="reference" type="primary" @click="detail(scope.row.TM_ID,scope.row.FM_TABLEFIELD)" plain>详情</el-button>
            </el-popover>
            <!-- <el-button size="small" type="primary" @click="detail(scope.row.TM_ID,scope.row.FM_TABLEFIELD)" plain>详情</el-button> -->
          </el-button-group>
        </el-table-column>

        <!-- 是否更改完成 -->
        <el-table-column label="是否更改完成" min-width="10%">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color:#409EFF">
              <el-button v-if="scope.row.FM_STATUS==='0'||scope.row.FM_STATUS==='2'" size="small" type="success" icon="el-icon-check" circle></el-button>
              <el-button v-else-if="scope.row.FM_STATUS==='1'" size="small" type="info" icon="el-icon-close" circle></el-button>
              </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination_parent">
      <div class="pagination">
      <el-pagination
      @current-change="handleCurrentChange"
        :total="total"
        :current-page.sync="page"
        background
        layout="prev, pager, next">
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../request'
export default {
  data () {
    return {
      input1: '',
      searchname: '',
      select: '',
      tableData: [],
      table_name: '',
      page: 1,
      total: 0,
      limit: 10,
      radio: 1,
      items: [],
      // 表数据
      gridData: []
    }
  },

  mounted () {
    console.log(this.$route.query.tablename)
    if (this.$route.query.tablename === undefined) {
      this.handleCurrentChange(1)
      // this.handlechange()
    } else {
      this.fromassets()
    }
  },
  methods: {
    handlechange () {
      this.page = 1
      console.log(this.radio)
      if (this.radio === 1) {
        // this.handleCurrentChange(1)
        this.fenye(1)
      } else {
        this.fenye2(1)
      }
    },
    // 分页
    fenye (val) {
      request({
        url: '/problemlist?page=' + val + '&size=20'
      })
        .then(res => {
          console.log('assessment')
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
        })
    },
    // 分页2
    fenye2 (val) {
      const typeEnum = {
        2: 'OD_TPAS',
        3: 'OD_SRMS',
        4: 'OD_YLB'
      }
      request({
        url: '/problemlist?page=' + val + '&size=20&types=' + typeEnum[this.radio] + '_%'
      })
        .then(res => {
          console.log('zheshi sousuo')
          console.log(this.radio)
          console.log(res)
          this.tableData = res.data.data
          this.total = res.data.pages * this.limit
        })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      if (this.radio === 1) {
        this.fenye(val)
      } else {
        this.fenye2(val)
      }
    },
    // 空值改进
    tofill (tableid, tablename, fieldname) {
      this.$router.push({ path: '/fill/' + tableid + '/' + tablename + '/' + fieldname })
    },
    // 标准化改进
    tostandard (tableid, tablename, fieldname) {
      this.$router.push({ path: '/standard/' + tableid + '/' + tablename + '/' + fieldname })
    },
    // 奇异值改进
    tostandard1 (tableid, tablename, fieldname) {
      this.$router.push({ path: '/standard/' + tableid + '/' + tablename + '/' + fieldname })
    },
    // 无需改进
    handlechoice () {
      this.$alert('此问题已修改完成', '提示', {
        confirmButtonText: '确定'
      })
    },
    // 从数据实体而来
    fromassets () {
      this.table_name = this.$route.query.tablename
      console.log(this.table_name)
      request({
        url: '/searchresult?tablename=' + this.table_name
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 根据表名搜索
    search () {
      request({
        url: '/searchresult?tablename=' + this.input1
      })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    // 查看问题列表详情
    detail (tableid, fieldname) {
      console.log(tableid, fieldname)
      request({
        url: '/problemfieldlist?tableid=' + tableid + '&fieldname=' + fieldname
      })
        .then(res => {
          console.log(res.data.data)
          this.gridData = res.data.data

          // console.log(this.gridData.length)
          this.items = this.gridData[0]
          Object.keys(this.items).forEach(key => {
            console.log(key)
          })
        })
    },
    goBack () {
      this.$router.back()
    }
  }
}

</script>
<style scoped>
.assessment  {
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
  display: flex;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#909399;
  line-height: 24px;
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
