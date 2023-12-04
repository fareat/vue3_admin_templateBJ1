<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量为
        <span class="col">99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">
        <p>{{ item }}</p>
      </span>
    </div>
    <!--盒子，将来放置echarts展示图形图标的节点-->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入水球图的echares
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref('216908人')
//获取节点
let charts = ref()
//当组件挂载完毕的时候，绘制水球图
onMounted(() => {
  //获取echatrs的实例
  let mycharts = echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption({
    //标题的设置
    /*         title:{
            text:'水球图'
        }, */
    /*
        //x|y 轴的组件
        xAxis:{},
        yAxis:{},*/
    //系列：决定你展示什么样的图形图标
    series: {
      type: 'liquidFill',
      data: [0.9, 0.6, 0.7, 0.2, 0.4, 0.5, 0.4],
      shape: 'container',
      outline: {
        show: false,
      },
      backgroundStyle: {
        borderWidth: 5,

        color: '#11144e',
      },
      label: {
        formatter: '预估值{c}',
        fontSize: 28,
      },
      radius: '85%',
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  margin-left: 20px;
  .top {
    .title {
      color: white;
      font-size: 25px;
      margin-top: 10px;
      margin-left: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
      margin-left: 20px;
    }
    .right {
      float: right;
      color: white;
      margin-right: 25px;
      font-size: 15px;
      .col {
        color: rgb(197, 189, 69);
        font-size: 14px;
      }
    }
  }
  .number {
    margin: 60px 20px 0px 20px;
    display: flex;

    span {
      flex: 1;
      height: 50px;
      text-align: center;
      //行高
      line-height: 50px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      p {
        font-size: 25px;
      }
    }
  }
  .charts {
    width: 100%;
    height: 220px;
    margin: 20px;
  }
}
</style>
