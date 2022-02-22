<template>
  <ToDoList></ToDoList>
  <div id="lineChart" class="box_shadow"></div>
</template>

<script setup>
import ToDoList from './components/ToDoList.vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  lineEcharts()
})

const lineEcharts = () => {
  // const myChart = echarts.init(document.getElementById('lineChart'), 'dark') // 参数二是主题颜色，可在官网下载
  const myChart = echarts.init(document.getElementById('lineChart'))

  const option = {
    // color: ['#91cc75', '#FE92AE', '#fac858', '#73c0de', '#4C6FFF', '#3ba272'],
    title: {
      show: false, //是否显示标题，默认显示，可以不设置
      text: '综合预览', //图表标题文本内容
      // link: 'http://echarts.baidu.com/', //点击标题内容要跳转的链接
      // target: 'blank', //跳转链接打开方式，blank是新窗口打开，self是自身窗口打开，跟a标签一样
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
}
</script>
<style lang="scss" scoped>
.box_shadow {
  padding: 20px 0;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
}

#lineChart {
  width: 100%;
  height: 60%;
}
</style>
