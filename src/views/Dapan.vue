<template>
  <div class="dapan">
    <!-- <div class="count">100</div> -->
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">总体大盘</div>
      <div>
        <span class="span_size" style="margin-left: 100px;">数据表数量:</span>
        <span style="color:#409EFF;font-size: x-large">{{tablenumber}}</span>
      </div>
    </div>
    <div class="head flex">
      <div class="data-table flex container flex-1">
        <div class="flex-1">
          <div class="table-title">表量top10</div>
          <el-table :data="tableData1" stripe>
            <el-table-column label="表名">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
              </template>
            </el-table-column>
            <el-table-column label="大小" width="90px">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_HISTORYSIZE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="条数" width="90px">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_HISTORYSIZE }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider direction="vertical"></el-divider>
        <el-divider direction="vertical"></el-divider>
        <!-- <div class="flex-2 flex column data-table_info">
          <div class="title flex-2" style="color:#303133">数据表信息</div>
          <div class="flex-2" style="color:#409EFF">数据表总数:
            <span>{{tablenumber}}</span>
          </div>
          <img :src="ajpg" alt />
        </div> -->
        <div class="flex-1">
          <div class="table-title">表增量top10</div>
          <el-table :data="tableData2" stripe>
            <el-table-column label="表名">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
              </template>
            </el-table-column>
            <el-table-column label="大小" width="90px">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_HISTORYSIZE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="条数" width="90px">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_HISTORYSIZE }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- <div class="person-info container flex-0">
        <div class="title">用户信息</div>
        <div>
          <i class="user-icon el-icon-s-custom"></i>
        </div>
      </div> -->
    </div>
    <div class="body flex container">
      <div class="flex-1 data-task">
        <!-- <div class="title" style="color:#303133">数据任务</div> -->
        <div class="instance-status_monitor">
          <div class="table-title">实例状态监控</div>
          <!-- <template> -->
          <el-table :data="tableData2" height="180px">
            <el-table-column label="检测类型">完整性检测</el-table-column>
            <!-- <el-table-column prop="total" label="总数"></el-table-column> -->
            <el-table-column label="执行时间">2020-09-24 00:00:00</el-table-column>
            <el-table-column label="执行状态"><el-button type="info" >未执行</el-button></el-table-column>
            <!-- <el-table-column prop="end" label="终止"></el-table-column> -->
          </el-table>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="flex-1">
        <div class="table-title">质量检测有问题top10</div>
        <el-table :data="tableData3" stripe>
          <el-table-column label="表名">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TM_TABLENAME }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字段">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FM_TABLEFIELD }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.PS_PROBLEM }}</span>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="质量改进" center :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="问题字段">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="更改建议">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="填充值">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import ajpg from '../assets/a.jpg'
const tableData1 = []
const tableData2 = []
const tableData3 = []
export default {
  data () {
    return {
      tableData1,
      tableData2,
      tableData3,
      ajpg,
      dialogVisible: false,
      tablenumber: null
    }
  },

  mounted () {
    axios.get('http://47.94.199.242:5000/api/v1.0/tablesize').then((res) => {
      console.log(res.data.data)
      this.tableData1 = res.data.data
      this.tableData2 = res.data.data
    })
    axios.get(' http://47.94.199.242:5000/api/v1.0/problemlist').then((res) => {
      console.log(res.data.data)
      this.tableData3 = res.data.data
    })
    axios.get(' http://47.94.199.242:5000/api/v1.0/tablenumber').then((res) => {
      console.log(res.data.data)
      this.tablenumber = res.data.data
    })
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.dapan {
  padding: 10px;
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
  color:#909399;
}
.span_size {
  font-size: 20px;
  color: #303133;
}
  .flex {
    display: flex;
  }
  .flex-0 {
    flex: 0 0 auto;
  }
  .flex-1 {
    flex: 1 1 auto;
    min-width: 0;
    width: 250px;
  }
  .flex-2 {
    flex: 1 1 auto;
    min-width: 0;
    width: 200px;
  }
  .justify {
    justify-content: center;
  }
  .column {
    flex-direction: column;
  }
  .container {
    background-color: white;
    border-radius: 4px;
    padding: 20px;
  }
  .data-table {
    margin-right: 10px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 100px;
  }
  .head {
    margin-bottom: 20px;
  }
  .data-task {
    width: 400px;
    margin-right: 10px;
  }
  .person-info {
    width: 200px;
  }
  .data-table_info {
    text-align: center;
    margin: 0 20px;
  }
  .table-title {
    background-color: #fafafa;
    padding: 10px;
    font-size: 18px;
  }
  .user-icon {
    font-size: 40px;
  }
  .instance-status_monitor {
    // margin-top: 20px;
  }
}
</style>
