<template>
  <!-- PastYearStatistics -->
  <!-- <div >
              状态：
              <el-select v-model="listQuery.QueryType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
  <div>
    <div style="margin-bottom:20px"> 
年：
<el-select v-model="year1" placeholder="请选择年份" @change="changeTime">
      <el-option v-for="item in option" :value="item.value" :label="item.label" :key="item.value"></el-option>
    </el-select>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="updateClick">搜索</el-button>
    </div>
    
    <!-- <el-date-picker style="width: 100px; marginBottom:10px" v-model="year1" align="right" type="year" placeholder="选择年" @change="changeTime">
    </el-date-picker> -->
    
    <!-- 往年统计表 -->
    <el-table :data="tableData" border="">
      <el-table-column prop="Msg1" align="center">
      </el-table-column>
      <el-table-column prop="SumModel" label="样板数" align="center">
      </el-table-column>
      <el-table-column prop="SumOrder" label="生产单数" align="center">
      </el-table-column>
      <el-table-column prop="SumNumber" label="件数" align="center">
      </el-table-column>
      <el-table-column prop="SumBed" label="床数" align="center">
      </el-table-column>
      <el-table-column prop="SumLen" label="铺布总长度" align="center">
      </el-table-column>
      <el-table-column prop="SumPod" label="特体Pod数" align="center">
      </el-table-column>
    </el-table>
    <!-- 列表总数 -->
    <el-table :data="tableData" :show-header="false" border="">
      <el-table-column prop="Msg2" align="center">
        <!-- <template scope="scope">
          {{scope.row.Msg2.toFixed(2)}}
        </template> -->
      </el-table-column>
      <el-table-column prop="AvgModel" label="AvgModel" align="center">
        <template scope="scope">
          {{scope.row.AvgModel!=null?parseFloat(scope.row.AvgModel).toFixed(2):''}}
        </template>
      </el-table-column>
      <el-table-column prop="AvgOrder" label="AvgOrder" align="center">
        <template scope="scope">
          {{scope.row.AvgOrder!=null?parseFloat(scope.row.AvgOrder).toFixed(2):''}}
        </template>
      </el-table-column>
      <el-table-column prop="AvgNumber" label="AvgNumber" align="center">
        <template scope="scope">
          {{scope.row.AvgNumber!=null?parseFloat(scope.row.AvgNumber).toFixed(2):''}}
        </template>
      </el-table-column>
      <el-table-column prop="AvgBed" label="AvgBed" align="center">
        <template scope="scope">
          {{scope.row.AvgBed!=null?parseFloat(scope.row.AvgBed).toFixed(2):''}}
        </template>
      </el-table-column>
      <el-table-column prop="AvgLen" label="AvgLen" align="center">
        <template scope="scope">
          {{scope.row.AvgLen!=null?parseFloat(scope.row.AvgLen).toFixed(2):''}}
        </template>
      </el-table-column>
      <el-table-column prop="AvgPod" label="AvgPod" align="center">
        <template scope="scope">
          {{scope.row.AvgPod!=null?parseFloat(scope.row.AvgPod).toFixed(2):''}}
        </template>
      </el-table-column>
    </el-table>
    <!-- 往年统计图 -->
    <div class="chart" id="chart">
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { page, pageTable } from "api/admin/chart/index";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    }
  },
  data() {
    return {
      tableData: null,
      chart: null,
      legend: [],
      year1: new Date().getFullYear(),
      xAxis: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      yAxis: [],
      listQuery: {
        year: new Date().getFullYear(),
        PLID: "",
        random: Math.random()
      },
      series: [],
      option: []
    };
  },
  created() {
    // console.log(new Date().getFullYear());
    this.setYear(new Date().getFullYear());
    this.listQuery.PLID = this.$store.state.user.PLID;
  },
  mounted() {
    // 加载后台数据
    // this.listQuery.QueryType = 1  //上传  1
    this.updateStatic();
    // 更新数据表格
    pageTable(this.listQuery).then(res => {
      this.tableData = res.data.rows;
      this.tableData[0].Msg1 = "总数";
      this.tableData[0].Msg2 = "平均";
      // console.log(this.dataTable[0]);
      // console.log(this.tableData);
      // console.log(res.data);
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //更新图
    updateStatic() {
      page(this.listQuery).then(res => {
        let arr = [];
        let array = [];
        if (res.status == 200) {
          this.legend = res.data.legend;
          arr = res.data.series;
          arr.forEach(element => {
            let obj = {};
            obj.type = "line";
            obj.name = element.CompanyName;
            obj.data = element.Data;
            array.push(obj);
          });
          // console.log(arr)
          // console.log(array)
          this.series = array;
          this.initChart();
        } else {
          this.legend = [];
          this.series = [];
          this.chart.dispose();
        }
      });
    },
    //获取以前年份
    setYear(year) {
      for (var i = 0; i < 10; i++) {
        var obj = {};
        obj.value = year - i;
        obj.label = year - i;
        this.option.push(obj);
      }
      // console.log(this.option);
    },
    changeTime(year) {
      this.listQuery.year = year;
      if (this.listQuery.year !== undefined) {
        pageTable(this.listQuery).then(res => {
          this.tableData = res.data.rows;
          this.tableData[0].Msg1 = "总数";
          this.tableData[0].Msg2 = "平均";
        });
        this.updateStatic();
      } else {
        this.$message({
          type: "error",
          message: "请输入年份",
          offset: 700
        });
        this.chart.dispose();
      }
      // console.log(year);
    },
    updateClick() {
      // console.log(""+this.year1.getFullYear());
      // console.log(this.year1);
      // this.listQuery.year = this.year1.getFullYear();
      this.updateStatic();
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.legend
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["line", "bar", "stack", "tiled"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 10% 的位置。
            end: 100 // 右边在 60% 的位置。
          }
        ],
        series: this.series
      });
    }
  }
};
</script>
<style>
.chart {
  width: 1200px;
  height: 600px;
}
</style>
