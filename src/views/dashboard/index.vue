<template>
  <div class="cockpit">
    <!-- 顶部数据统计 -->
    <div class="data_collect marBo20">
      <div
        :class="['collect_box', 'box_shadow', { marTop15: index > 2 }]"
        v-for="(item, index) in collectData"
        :key="item"
      >
        <div class="icon_box">
          <svg-icon :icon-class="item.iconName"></svg-icon>
        </div>
        <div class="text_box">
          <div>
            <p class="nowTitle">{{ item.nowTitle }}</p>
            <p class="nowMoney">
              {{ item.nowMoney }}
              {{ item.unit }}
              <span class="rate_add" v-if="item.rate >= 0"
                >(+{{ item.rate }}%)</span
              >
              <span class="rate_reduce" v-else>({{ item.rate }}%)</span>
            </p>
          </div>
          <div>
            <p class="preTitle">{{ item.preTitle }}</p>
            <p class="preMoney">
              {{ item.preMoney }}
              {{ item.unit }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 折线图统计 -->
    <div class="lineChart_container marBo20">
      <div class="chart_box box_shadow">
        <div class="title_box">
          <h2 class="title">综合分析</h2>
          <div class="export_button">导出数据</div>
        </div>
        <div id="lineChart"></div>
      </div>
      <div class="wait_thing box_shadow">
        <div class="title_box">
          <span class="title">待办中心</span>
          <span class="more fr">查看更多</span>
        </div>
        <ul>
          <li
            class="news_li"
            :style="[
              { 'border-bottom': index === waitData.length - 1 && 'none' }
            ]"
            v-for="(item, index) in waitData"
            :key="index"
          >
            <div class="title">{{ item.title }}</div>
            <div>
              <span class="date">{{ item.date }}</span>
              <span class="user">{{ item.user }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 饼图统计 -->
    <div class="pieChart_container box_shadow">
      <div class="pie_box">
        <div class="title_box">
          <h2 class="title">按时间统计</h2>
          <el-date-picker
            v-model="timeValue"
            size="mini"
            style="width: 240px"
            :clearable="false"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="chart_box">
          <div id="buyChart" class="chart"></div>
          <div id="saveChart" class="chart"></div>
          <div id="incomeChart" class="chart"></div>
        </div>
      </div>
      <div class="options_box">
        <div class="title_box">选择采购类型</div>
        <div class="options">
          <el-radio-group v-model="radio">
            <div class="radio_box">
              <el-radio :label="0">小额直采</el-radio>
              <el-radio :label="1">招标采购</el-radio>
            </div>
            <div class="radio_box">
              <el-radio :label="2">单一来源</el-radio>
              <el-radio :label="3">邀标采购</el-radio>
            </div>
            <div class="radio_box">
              <el-radio :label="4">竞价采购</el-radio>
              <el-radio :label="5">竞价磋商</el-radio>
            </div>
            <div class="radio_box">
              <el-radio :label="6">商场直采</el-radio>
              <el-radio :label="7">竞争谈判</el-radio>
            </div>
            <div class="radio_box">
              <el-radio :label="8">线下采购</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  components: {},
  data() {
    return {
      collectData: [
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月采购额',
          nowMoney: '12.5',
          preTitle: '上月采购额',
          preMoney: '6.2',
          rate: 100,
          unit: '万'
        },
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月增收额',
          nowMoney: '3.1',
          preTitle: '上月增收额',
          preMoney: '6.2',
          rate: -50,
          unit: '万'
        },
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月节资额',
          nowMoney: '12.5',
          preTitle: '上月节资额',
          preMoney: '6.2',
          rate: 100,
          unit: '万'
        },
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月供应商',
          nowMoney: '32',
          preTitle: '上月供应商',
          preMoney: '24',
          rate: 54,
          unit: '家'
        },
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月应付款',
          nowMoney: '3.1',
          preTitle: '上月应付款',
          preMoney: '6.2',
          rate: -50,
          unit: '万'
        },
        {
          iconName: 'danyilaiyuanIndex',
          nowTitle: '本月应收货',
          nowMoney: '12.5',
          preTitle: '上月应收货',
          preMoney: '6.2',
          rate: 100,
          unit: '万'
        }
      ],
      waitData: [
        {
          title: '待办主题',
          date: '2021/10/01',
          user: '赵经理'
        },
        {
          title: '待办主题',
          date: '2021/10/01',
          user: '赵经理'
        },
        {
          title: '待办主题',
          date: '2021/10/01',
          user: '赵经理'
        },
        {
          title: '待办主题',
          date: '2021/10/01',
          user: '赵经理'
        },
        {
          title: '待办主题',
          date: '2021/10/01',
          user: '赵经理'
        }
      ],
      radio: 0,
      timeValue: ''
    }
  },
  mounted() {
    console.log(222)
    this.lineEcharts()
    this.pieEcharts()
  },
  methods: {
    lineEcharts() {
      const myChart = echarts.init(document.getElementById('lineChart'))

      const option = {
        color: [
          '#91cc75',
          '#FE92AE',
          '#fac858',
          '#73c0de',
          '#4C6FFF',
          '#3ba272'
        ],
        title: {
          show: false, //是否显示标题，默认显示，可以不设置
          text: '综合预览', //图表标题文本内容
          textStyle: {
            //标题内容的样式
            color: '#000', //京东红
            fontStyle: 'normal', //主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight: 'bolder', //可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily: 'san-serif', //主题文字字体，默认微软雅黑
            fontSize: 18 //主题文字字体大小，默认为18px
          },
          padding: [1, 0, 0, 0], //各个方向的内边距，默认是5，可以自行设置
          left: '28' //left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['综合', '销售额', '客户数量', '应收款', '应发货', '商机数量'],
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 40,
          left: 15,
          top: 0,
          inactiveColor: '#A6B7D4',
          inactiveBorderColor: '#A6B7D4',
          textStyle: {
            color: '#9696B1'
          },
          selected: {
            综合: false,
            销售额: true,
            客户数量: false,
            应收款: false,
            应发货: false,
            商机数量: false
          }
        },
        grid: {
          left: '2%',
          right: '3%',
          top: '14%',
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            // color: '#7AB9FF',
            // fontSize: 12,
            margin: 20 //刻度标签与轴线之间的距离。
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // color: '#7AB9FF',
            // fontSize: 12,
            margin: 20 //刻度标签与轴线之间的距离。
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        series: [
          {
            name: '综合',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [1022, 357, 101, 134, 666, 230, 210, 101, 134, 450, 230, 21],
            lineStyle: {
              width: 2,
              shadowColor: '#91cc75',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          },
          {
            name: '销售额',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [100, 130, 156, 190, 180, 120, 112, 250, 380, 380, 376, 410],
            connectNulls: true,
            lineStyle: {
              width: 2,
              shadowColor: '#FE92AE',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          },
          {
            name: '客户数量',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330],
            lineStyle: {
              width: 2,
              shadowColor: '#fac858',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          },
          {
            name: '应收款',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390],
            lineStyle: {
              width: 2,
              shadowColor: '#73c0de',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          },
          {
            name: '应发货',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [25, 25, 250, 325, 250, 252, 330, 402, 234, 340, 360, 355],
            lineStyle: {
              width: 2,
              shadowColor: '#4C6FFF',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          },
          {
            name: '商机数量',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: [820, 932, 901, 934, 770, 880, 1050, 932, 901, 934, 600, 430],
            lineStyle: {
              width: 2,
              shadowColor: '#3ba272',
              shadowBlur: 6,
              shadowOffsetY: 2,
              opacity: 0.6
            }
          }
        ]
      }

      option && myChart.setOption(option)
    },
    pieEcharts() {
      this.buyChart()
      this.saveChart()
      this.incomeChart()
    },
    buyChart() {
      const myChart = echarts.init(document.getElementById('buyChart'))
      const option = {
        color: ['#FF92AE', '#D4DFFB', '#4C6FFF'],
        tooltip: {
          trigger: 'item'
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '采购额',
            textAlign: 'center',
            fill: '#333',
            fontSize: 16,
            fontWeight: 600
          }
        },
        series: [
          {
            type: 'pie',
            name: 'big',
            radius: ['60%', '90%'],
            label: {
              show: false
            },
            data: [
              { value: 38, name: '搜索引擎' },
              { value: 37, name: '直接访问' },
              { value: 25, name: '视频广告' }
            ]
          },
          {
            type: 'pie',
            radius: ['54%', '62%'],
            label: {
              show: false
            },
            silent: true,
            data: [
              { value: 38, name: '搜索引擎', itemStyle: { color: '#F5C1D3' } },

              { value: 37, name: '直接访问', itemStyle: { color: '#DFE8FA' } },

              { value: 25, name: '视频广告', itemStyle: { color: '#9BB0FC' } }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
    },
    saveChart() {
      const myChart = echarts.init(document.getElementById('saveChart'))
      const option = {
        color: ['#FF92AE', '#D4DFFB', '#4C6FFF'],
        tooltip: {
          trigger: 'item'
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '节资额',
            textAlign: 'center',
            fill: '#333',
            fontSize: 16,
            fontWeight: 600
          }
        },
        series: [
          {
            type: 'pie',
            name: 'big',
            radius: ['60%', '90%'],
            label: {
              show: false
            },
            data: [
              { value: 38, name: '搜索引擎' },
              { value: 37, name: '直接访问' },
              { value: 25, name: '视频广告' }
            ]
          },
          {
            type: 'pie',
            radius: ['54%', '62%'],
            label: {
              show: false
            },
            silent: true,
            data: [
              { value: 38, name: '搜索引擎', itemStyle: { color: '#F5C1D3' } },

              { value: 37, name: '直接访问', itemStyle: { color: '#DFE8FA' } },

              { value: 25, name: '视频广告', itemStyle: { color: '#9BB0FC' } }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
    },
    incomeChart() {
      const myChart = echarts.init(document.getElementById('incomeChart'))
      const option = {
        color: ['#FF92AE', '#D4DFFB', '#4C6FFF'],
        tooltip: {
          trigger: 'item'
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: '增收额',
            textAlign: 'center',
            fill: '#333',
            fontSize: 16,
            fontWeight: 600
          }
        },
        series: [
          {
            type: 'pie',
            name: 'big',
            radius: ['60%', '90%'],
            label: {
              show: false
            },
            data: [
              { value: 38, name: '搜索引擎' },
              { value: 37, name: '直接访问' },
              { value: 25, name: '视频广告' }
            ]
          },
          {
            type: 'pie',
            radius: ['54%', '62%'],
            label: {
              show: false
            },
            silent: true,
            data: [
              { value: 38, name: '搜索引擎', itemStyle: { color: '#F5C1D3' } },

              { value: 37, name: '直接访问', itemStyle: { color: '#DFE8FA' } },

              { value: 25, name: '视频广告', itemStyle: { color: '#9BB0FC' } }
            ]
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.box_shadow {
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
}
.cockpit {
  padding: 20px 20px 0;
  .marBo20 {
    margin-bottom: 20px;
  }
}

.data_collect {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .collect_box {
    width: 32%;
    padding: 18px;
    background: #fff;
    border-radius: 8px;
    display: flex;

    .icon_box {
      width: 18%;
      min-width: 80px;
      .svg-icon {
        width: 56px;
        height: 56px;
      }
    }

    .text_box {
      width: 55%;
      min-width: 220px;
      display: flex;
      justify-content: space-between;

      .nowTitle {
        color: #7e7ea0;
        margin-bottom: 5px;
        font-size: 14px;
      }
      .nowMoney {
        font-weight: 600;
        font-size: 20px;
      }
      .rate_add {
        color: #66cb9f;
        font-size: 14px;
      }
      .rate_reduce {
        color: #f16265;
        font-size: 14px;
      }
      .preTitle {
        color: #d8d8e2;
        margin-bottom: 5px;
        font-size: 14px;
      }
      .preMoney {
        color: #b3b4ba;
        font-weight: 600;
        font-size: 20px;
      }
    }
  }
  .marTop15 {
    margin-top: 15px;
  }
}
.lineChart_container {
  display: flex;
  background-color: #f7fafc;
  position: relative;

  .chart_box {
    background-color: #fff;
    border-radius: 8px;
    width: 66%;
    height: 330px;
    padding: 20px 0;
    .title_box {
      padding: 0 20px 12px;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: bolder;
      }
      .export_button {
        padding: 0 20px;
        background-color: #4c6fff;
        text-align: center;
        line-height: 28px;
        border-radius: 6px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
      }
    }
    #lineChart {
      width: 100%;
      height: calc(100% - 32px);
    }
  }

  .wait_thing {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    border-radius: 8px;
    height: 100%;
    width: calc(32%);
    padding: 20px 20px 0;
    .title_box {
      height: 35px;
      border-bottom: 1px solid #edf2f7;

      .title {
        font-size: 18px;
        font-weight: 600;
      }
      .more {
        font-size: 14px;
        color: #4c6fff;
        cursor: pointer;
      }
    }
    .news_li {
      display: flex;
      justify-content: space-between;
      min-height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #edf2f7;
      font-size: 15px;
      color: #566676;
      font-weight: 500;

      .title {
        color: #4c6fff;
      }
      .date {
        margin-right: 10px;
      }
    }
  }
}
.pieChart_container {
  display: flex;
  position: relative;
  border-radius: 8px;
  background-color: #fff;

  .pie_box {
    background-color: #fff;
    border-radius: 8px;
    width: 66%;
    height: 270px;
    padding: 20px 20px 0;
    position: relative;

    .title_box {
      padding: 0 0px 12px;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: bolder;
      }
      .el-date-editor {
        position: absolute;
        top: 20px;
        right: 0;
      }
      :deep(.el-range-separator) {
        width: 30px !important;
        color: #a3a9ae;
        line-height: 18px;
      }
    }
    .chart_box {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .chart {
        width: 33%;
        height: calc(100% - 30px);
      }
    }
  }
  .options_box {
    position: absolute;
    top: 20px;
    right: 40px;
    padding: 20px;
    box-sizing: border-box !important;
    border: 1px solid #ebecf0;
    box-sizing: content-box;
    background-color: #fff;
    border-radius: 8px;
    height: calc(100% - 40px);
    width: calc(25% - 0px);

    .title_box {
      height: 35px;
      border-bottom: 1px solid #edf2f7;
      font-weight: 600;
      color: #4b5c6d;
      margin-bottom: 15px;
    }
    .options {
      width: 250px;
      margin: 0 auto;

      .el-radio-group {
        width: 100%;
      }
      .radio_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 30px;
        :deep(.el-radio__input .el-radio__inner) {
          border-color: #c9ced6 !important;
        }
        :deep(.el-radio__label) {
          color: #1b3147;
        }
        :deep(.is-checked .el-radio__inner) {
          border-color: #4c6fff !important;

          &:after {
            width: 8px;
            height: 8px;
            background-color: #4c6fff !important;
          }
        }
      }
    }
  }
}
</style>
