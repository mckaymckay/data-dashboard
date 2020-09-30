<template>
  <div class="resac">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
      <div><el-page-header @back="goBack"></el-page-header></div>
        <span class="h3">波动检测</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">任务列表</span>
          <el-divider direction="vertical"></el-divider>
        <span class="h3">任务结果</span>
      </div>
      <div>
        <span class="span_size">任务名称:&nbsp;&nbsp;&nbsp;&nbsp;{{missionname}}    </span>
      </div>

    </div>
    <!-- 折线图 -->
    <div class="content">
      <div class="res">
        <p class="prompt_p">&nbsp;&nbsp;&nbsp;数据量变化折线图</p>
        <div class="seven_echarts"  id="seven"></div>
      </div>
      <el-divider><i class="el-icon-loading"></i>
      <span style="color:#909399">这是分割线</span>
      <i class="el-icon-loading"></i></el-divider>
      <!-- 表格 -->
      <div class="table">
          <el-table
        :data="tableData" style="width: 100%" height="380px">

          <el-table-column label="" width="200">
            <template slot-scope="">
              <span style="margin-left: 10px"></span>
            </template>
          </el-table-column>
          <el-table-column label="执行时间" width="260">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.FL_UPDATETIME }}</span>
            </template>
          </el-table-column>

          <el-table-column label="执行状态" width="260">
            <template slot-scope="scope">
              <el-button v-if="scope.row['FL_STATUS']==='已完成'" type="success" >{{ scope.row.FL_STATUS }}</el-button>
              <el-button v-else-if="scope.row['FL_STATUS']==='未执行'" type="info" plain>{{ scope.row.FL_STATUS }}</el-button>
              <el-button v-if="scope.row['FL_STATUS']==='失败'" type="danger" >{{ scope.row.FL_STATUS }}</el-button>
            </template>
          </el-table-column>

          <el-table-column label="数据量">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.FL_HISTORYNUMBER }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" width="260">
            <template slot-scope="">
              <span style="margin-left: 10px"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <!-- <div class="pagination_parent">
      <div class="pagination">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </el-button-group>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 任务名称
      missionname: '',
      seven_chart: null,
      month_chart: null,
      dx: '', // x轴
      dy: '', // 数值
      getnumber: '',
      tableData: [],
      seven_option: {
        backgroundColor: '#283b46',
        title: {
          // text: '未来一周气温变化', // 感觉头部有点乱，没使用自带的标题
          // subtext: '单位',
          x: 'left',
          align: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [{
            name: '数据量变化率',
            textStyle: {
              color: '#909399' // 图例文字颜色
            }
          }]
          // color: 'white'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            magicType: { type: ['line', 'bar'] }, // 柱状图和西和折线图切换
            dataView: { readOnly: false },
            restore: {}, // 刷新
            saveAsImage: {} // 将图表以折线图的形式展现
          }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          // data: ['10-11', '11-26', '11-27', '11-28', '11-29', '11-30', '12-01', '12-02', '11-26', '10-11']
          data: {},
          axisLine: {
            lineStyle: {
              color: '#909399'
            }
          },
          splitLine: {
            show: false
          }

        },
        yAxis: {
          name: '条',
          nameLocation: 'end',
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          },
          axisLine: {
            lineStyle: {
              color: '#909399'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true
          }
        },
        dataZoom: [{
          type: 'inside'
        }],
        series: [
          {
            name: '数据量',
            type: 'line',
            data: [],
            lineStyle: { // 设置折线色颜色
              color: '#f8e124',
              width: 1.5
            },
            itemStyle: { // 设置折线折点的颜色
              normal: {
                color: '#f8e124',
                width: 5
              }
            }
          },
          {
            name: '平行于y轴的趋势线',
            type: 'line'
            // markLine: {
            //   name: 'aa',
            //   data: [
            //     {
            //       name: '50%标准线',
            //       yAxis: 50,
            //       lineStyle: { // 设置折线色颜色
            //         color: '#f8e124 '
            //       }
            //     }
            //   ],
            //   // symbol: ['arrow', 'none'], // 将箭头向左  默认值是向右的
            //   label: {
            //     show: true,
            //     position: 'middle', // markline描述位于中间   right，left，middle
            //     formatter: '{b}' // 显示name中的描述
            //   }
            // }
          }
        ]
      }
    }
  },
  mounted () {
    this.get_data()
    this.get_echarts()
  },
  methods: {
    back () {
      this.$router.push({ path: '/Accuracy/' })
    },
    get_data () {
      console.log(this.dx)
      this.dx = ['10-11', '11-26', '11-27', '11-28', '11-29', '11-30', '12-01', '12-02', '11-26', '10-11']
      this.dy = [0, 80, 90, 30, 40, 80, 60, 70, 80, 100]
      console.log(this.$route.params)
      this.missionname = this.$route.params.missionname
      var tableid = this.$route.params.tableid
      // var status = this.$route.params.status
      axios
        .get('http://47.94.199.242:5000/api/v1.0/accuracyResult?tableid=' + tableid)
        .then(res => {
          console.log(res)
          // 获取x轴时间
          const ddx = []
          // 获取y轴数值
          const ddy = []
          this.getnumber = res.data.data
          for (let i = 0; i < this.getnumber.length; i++) {
            ddx.push(this.getnumber[i].FL_UPDATETIME)
            ddy.push(this.getnumber[i].FL_HISTORYNUMBER)
          }
          console.log(ddx)
          console.log(ddy)
          this.tableData = res.data.data
          this.seven_chart.setOption({
            xAxis: {
              data: ddx
            },
            series: [{
              data: ddy
            }]
          })
        })
    },
    get_echarts: function () {
      this.seven_chart = this.echarts.init(document.getElementById('seven'))
      // 把配置和数据放这里
      this.seven_chart.setOption(this.seven_option)
    },
    goBack () {
      this.$router.back()
    }
  }

}
</script>
<style scoped>
.resac {
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
  padding: 10px 0;
  background-color: white;
  height: 660px;
}
.res{
  margin: 0px 10px;
  background-color: white;
  height: 35%;
}
.table{
  /* margin: 0px 10px; */
  /* background-color: white; */
  height: 65%;
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
.pagination_parent {
  background: white;
  border-radius: 4px;
}
.pagination {
  padding: 5px;
  border-radius: 4px;
  width: 120px;
  margin: 5px auto;
}
</style>
