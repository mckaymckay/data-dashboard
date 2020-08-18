<template>
  <div class="dapan">
    <el-row :gutter="20">
      <!-- 前边一列：数据量 -->
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="9">
              <div class="grid-content2">
                <template>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width></el-table-column>
                    <el-table-column prop="name" label="姓名" width></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
            <!-- 中间一列 -->
            <el-col :span="6">
              <div class="grid-content2">
                <div>数据总量</div>
              </div>
            </el-col>
            <!-- 最后一列  数据增量-->
            <el-col :span="9">
              <div class="grid-content2">
                <template>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width></el-table-column>
                    <el-table-column prop="name" label="姓名" width></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '弄'
        }
      ]
    }
  }
}
</script>
<style lang='scss'>
.dapan {
  padding: 10px;
  border-radius: 4px;
  //   background-color: white;
  margin-bottom: 10px;
  margin-top: 60px;
  height: 660px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 320px;
  margin-bottom: 10px;
}
.grid-content2 {
  border-radius: 4px;
  height: 320px;
  margin-bottom: 10px;
  background: red;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
