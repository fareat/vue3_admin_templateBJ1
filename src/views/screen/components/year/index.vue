<template>
  <div class="box">
    <div class="title">
      <p>年度游客量占比</p>
      <img src="../../images/dataScreen-title.png" />
    </div>
    <!--图形图表的容器-->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    title: {
      //主标题
      text: '景区排行',
      link: 'http://www.baidu.com',
      //标题位置
      left: '50%',
      //主标题的样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      //子标题
      subtext: '各大景区的排行',
      //子标题样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 15,
      },
    },
    //x轴
    xAxis: {
      type: 'category',
      show: false,
    },
    //y轴
    yAxis: {
      show: false,
    },
    //布局组件
    grid: {
      left: 20,
      bottom: 0,
      top: 20,
      right: 0,
    },
    //系列
    series: [
      {
        type: 'scatter',
        data: [212, 54, 54, , 453, 15, 754, 37, 68, 486, 4],
        //标记的图形的设置
        symbol: 'arrow',
        symbolSize: 10,
        //图形上的文本标签
        label: {
          show: true,
          //文字位置放在顶部
          position: 'top',
          color: 'red',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          color: 'red',
        },
        //柱子的样式
        itemStyle: {
          borderRadius: 20,
          //颜色
          color: 'red',
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true,
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 20px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    margin-top: 25px;
    height: 200px;
  }
}
</style>
