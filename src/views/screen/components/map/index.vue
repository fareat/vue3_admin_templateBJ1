<template>
  <div class="box" ref="map">我是地图组件</div>
</template>

<!-- <script setup lang="ts">
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts'
//引入中国地图的JS数据
import chinaJSON from './china.json'

//获取DOM
let map=ref()
//注册中国地图
echarts.registerMap('china',chinaJSON)
onMounted(()=>{
    let mychart= echarts.init(map.value)
    // 发光的小圈的经纬度，数组的话就是该经纬度的小圈使用默认样式，对象可自定义样式

    var point_circle = [
    {
        value: [109.754859, 19.189767],
        label: {
        name: '海口市'
        },
        itemStyle: {
        color: 'red',
        },
    },
    {
        value: [116.41995, 40.18994],
        label: {
        name: '北京市'
        },
    },
    {
        value: [85.294711, 41.371801],
        label: {
        name: '乌鲁木齐市'
        },
    },
    {
        value: [110.3467, 41.4899],
        label: {
        name: '呼和浩特市'
        },
    },
    {
        value: [125.8154, 44.2584],
        label: {
        name: '长春市'
        },
    },
    {
        value: [114.4995, 38.1006],
        label: {
        name: '石家庄市'
        },
    },
    {
        value: [117.4219, 39.4189],
        label: {
        name: '天津市'
        },
    },
    {
        value: [106.3586, 38.1775],
        label: {
        name: '银川市'
        },
    },
    {
        value: [103.5901, 36.3043],
        label: {
        name: '兰州市'
        },
    },
    {
        value: [119.4543, 25.9222],
        label: {
        name: '福州市'
        },
    }
    ];

    // 流向线条的经纬度，可自定义样式
    var point_line = [
    {
        coords: [
        [109.754859, 19.189767],   // 初始点经纬度
        [116.41995, 40.18994],    //目标点经纬度
        ],
        label: {
        start: '海口',
        end: '北京'
        }
    },
    {
        coords: [
        [109.754859, 19.189767],
        [85.294711, 41.371801],
        ],
        label: {
        start: '海口',
        end: '乌鲁木齐'
        }
    },
    {
        coords: [
        [110.3467, 41.4899],
        [109.754859, 19.189767],
        ],
        lineStyle: {            // 自定样样式
        color: '#52b9c7',
        },
        label: {
        start: '呼和浩特',
        end: '海口'
        }
    },
    {
        coords: [
        [125.8154, 44.2584],
        [103.5901, 36.3043],
        ],
        lineStyle: {
        color: '#5abead',
        },
        label: {
        start: '长春',
        end: '兰州'
        }
    },
    {
        coords: [
        [119.4543, 25.9222],
        [103.5901, 36.3043],
        ],
        label: {
        start: '福州',
        end: '兰州'
        }
    },
    {
        coords: [
        [106.3586, 38.1775],
        [119.4543, 25.9222],
        ],
        label: {
        start: '银川',
        end: '福州'
        }
    },
    {
        coords: [
        [114.4995, 38.1006],
        [119.4543, 25.9222],
        ],
        label: {
        start: '石家庄',
        end: '福州'
        }
    },
    {
        coords: [
        [117.4219, 39.4189],
        [109.754859, 19.189767],
        ],
        label: {
        start: '天津',
        end: '海口'
        }
    },
    ];

    mychart.setOption({
    //  tooltip 该版本需在 option中定义才开启
    //  子图层可自定义内容
    tooltip: {
      //格式化内容，返回为空，地图组件不起作用，得在地图组件重新定义
      formatter: () => '',
      textStyle: {
        color: '#fff'
      }
    },
    
    geo: {
      map: 'china',
      zoom: 1,
      roam: true,
      layoutCenter: ['50%', '50%'],
      // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
      layoutSize: '100%',
      itemStyle: {
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
            },
          ],
        },
        shadowColor: 'rgba(128, 217, 248, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
        borderColor: 'rgba(147, 235, 248, 1)',
      },
      tooltip: {
        formatter: () => ''
      },
      emphasis: {   //地图高亮
        itemStyle: {
          color: '#93EBF8'
        }
      }
    },
    series: [
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          symbolSize: 5,
          color: '#E4AA0C',
          symbol: 'arrow',
        },
        lineStyle: {
          color: '#F56828',
          width: 1, //线条宽度
          curveness: 0.3,
        },
        tooltip: {
          formatter({ data }) {
            return `流向走向如下：<br />
              起点：${data.label.start}<br />
              终点：${data.label.end}
              `
          },
          backgroundColor: 'rgba(245,108,45,0.5)',
        },
        data: point_line,
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        rippleEffect: {
          number: 2,
          scale: 3,
          brushType: 'stroke',
        },
        itemStyle: {
          color: '#F56828',
        },
        tooltip: {
          formatter({ data }) {
            return `地点位于：${data.label.name}`
          },
          backgroundColor: 'rgba(232,85,160,0.5)',
        },
        label:{
          show:true,
          offset:[40,0],
          color:'#fff',
          fontSize:15,
          formatter({data}){
            return `${data.label.name}`
          }
        },
        data: point_circle,
      }, //地图线的动画效果,
    ],

    })
})

</script>

<style scoped>

</style> -->
