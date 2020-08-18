<template>
  <div class="dapan">
    <div class="head flex">
      <div class="data-table flex container flex-1">
        <div class="flex-1">
          <div class="table-title">表量top10</div>
          <el-table :data="tableData1" stripe>
            <el-table-column prop="name" label="表名"></el-table-column>
            <el-table-column prop="content" label="大小"></el-table-column>
          </el-table>
        </div>
        <div class="flex-1 flex column data-table_info">
          <div class="title flex-1">数据表信息</div>
          <div class="flex-1">数据表总数:110</div>
          <img :src="ajpg" alt />
        </div>
        <div class="flex-1">
          <div class="table-title">表量top10</div>
          <el-table :data="tableData1" stripe>
            <el-table-column prop="name" label="表名"></el-table-column>
            <el-table-column prop="content" label="大小"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="person-info container flex-0">
        <div class="title">用户信息</div>
        <div>
          <i class="user-icon el-icon-s-custom"></i>
        </div>
      </div>
    </div>
    <div class="body flex container">
      <div class="flex-0 data-task">
        <div class="title">数据任务</div>
        <div class="instance-status_monitor">
          <div class="table-title">实例状态监控</div>
          <el-table :data="tableData2" stripe>
            <el-table-column prop="type" label="检测类型"></el-table-column>
            <el-table-column prop="total" label="总数"></el-table-column>
            <el-table-column prop="success" label="成功"></el-table-column>
            <el-table-column prop="fail" label="失败"></el-table-column>
            <el-table-column prop="end" label="终止"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="flex-1">
        <div class="table-title">质量检测有问题top10</div>
        <el-table :data="tableData3" stripe>
          <el-table-column prop="name" label="表名"></el-table-column>
          <el-table-column prop="field" label="字段"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
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
import ajpg from '../assets/a.jpg'
const tableData1 = [
  {
    name: 'TPAS-ZYRY',
    content: '234.9k'
  },
  {
    name: 'TPAS-ZYRY',
    content: '234.7k'
  },
  {
    name: 'TPAS-ZYRY',
    content: '234.5k'
  },
  {
    name: 'TPAS-ZYRY',
    content: '234.3k'
  },
  {
    name: 'TPAS-ZYRY',
    content: '234.3k'
  }
]
const tableData2 = [
  {
    type: '波动检测',
    total: 5,
    success: 5,
    fail: 0,
    end: 0
  },
  {
    type: '标准化检测',
    total: 5,
    success: 5,
    fail: 0,
    end: 0
  }
]
const tableData3 = [
  {
    name: 'TPAS-ZYRY',
    field: 'status',
    desc: '含有空值'
  },
  {
    name: 'TPAS-ZYRY',
    field: 'status',
    desc: '含有空值'
  },
  {
    name: 'TPAS-ZYRY',
    field: 'status',
    desc: '含有空值'
  },
  {
    name: 'TPAS-ZYRY',
    field: 'status',
    desc: '含有空值'
  },
  {
    name: 'TPAS-ZYRY',
    field: 'status',
    desc: '含有空值'
  }
]
export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      tableData1,
      tableData2,
      tableData3,
      ajpg,
      dialogVisible: true
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}
}
</script>
<style scoped lang="scss">
.dapan {
  padding: 20px;
  .flex {
    display: flex;
  }
  .flex-0 {
    flex: 0 0 auto;
  }
  .flex-1 {
    flex: 1 1 auto;
    min-width: 0;
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
    margin-right: 20px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .head {
    margin-bottom: 20px;
  }
  .data-task {
    width: 400px;
    margin-right: 20px;
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
    margin-top: 20px;
  }
}
</style>
