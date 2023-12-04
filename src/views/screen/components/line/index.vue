<template>
  <div class="box">
    <div class="title">
      <p>未来七天的趋势图</p>
      <img src="../../images/dataScreen-title.png" />
    </div>
    <!--折线图-->
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

//获取图形图表的节点
let line = ref()

onMounted(() => {
  let mycharts = echarts.init(line.value)
  //设置配置项
  mycharts.setOption({
    title: {},
    xAxis: {
      type: 'category',
      //分割线不要
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 50,
      top: 20,
      right: 40,
      bottom: 30,
    },
    //系列
    series: [
      {
        type: 'line',
        data: [212, 159, 785, 126, 452, 846, 956],
        //平滑曲线
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    margin-top: 15px;
    height: calc(100% - 50px);
  }
}
</style>
