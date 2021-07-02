<style>
    .ivu-table td.demo-table-info-column{
        background-color: rgb(55,179,177);
        color: #fff;
    }
</style>
<template>
  <div>
    <div id="china_map" style='width:550px;height:550px;background: rgba(0, 0, 0, 0.2);float:left'> </div>
    <Card style="width:710px;height:520px;float:right;background:rgba(0, 0, 0, 0.1);padding:0px;border:rgba(0, 0, 0, 0.1)">
        <Table height="500" size="small" :columns="columns1" :data="data"></Table>
    </Card>
    
  </div>
</template>
<script>
import echarts from "echarts"
require('echarts/map/js/china')
export default {
    name: "state",
    data() {
        return {
            data:[],
            columns1: [
                    {
                        title: '地区',
                        key: 'name',
                        className: 'demo-table-info-column'
                    },
                    {
                        title: '新增确诊',
                        key: 'new_confirm'
                    },
                    {
                        title: '累计确诊',
                        key: 'value'
                    },
                    {
                        title: '治愈',
                        key: 'heal'
                    },
                    {
                        title: '死亡',
                        key: 'dead'
                    }
                ],
                // data1: this.data    
        }
    },


    mounted () {
        // 初始化echarts实例
        this.chinachart = echarts.init(document.getElementById('china_map'))
        // 进行相关配置
        this.chartOption = { 
            tooltip: { // 鼠标移到图里面的浮动提示框
            // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
            formatter (params, ticket, callback) { 
                // params.data 就是series配置项中的data数据遍历
                let localValue,
                perf,
                downloadSpeep,
                usability,
                point
                if (params.data) {
                localValue = params.data.value
                perf = params.data.perf
                downloadSpeep = params.data.downloadSpeep
                usability = params.data.usability
                point = params.data.point
                } else { // 为了防止没有定义数据的时候报错写的
                localValue = 0
                perf = 0
                downloadSpeep = 0
                usability = 0
                point = 0
                }
                let htmlStr = `
                <div style='font-size:18px;'> ${params.name}</div>
                <p style='text-align:left;margin-top:-10px;'>
                    累计确诊：${localValue}<br/>
                </p>
                `
                return htmlStr
            }
            // backgroundColor:"#ff7f50",//提示标签背景颜色
            // textStyle:{color:"#fff"} //提示标签字体颜色
            }, 
            // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
            visualMap: { // 左下角的颜色区域
            type: 'piecewise', // 定义为分段型 visualMap
                min: 0,
                max: 300000,
                itemWidth: 40,
                bottom: 60,
                left: 20,
                pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                {gt: 10000, lte: 100000,label: '>=10000', color: 'orangered'},
                {gt: 1000, lte: 10000, label: '1000-9999', color: '#ff9800'}, // 
                {gt: 100, lte: 1000, label: '100-999', color: '#ffeb3b'}, // 
                {gt: 10, lte: 100, label: '10-99', color: '#9adcfa'}, // 
                {gt: 0, lte: 10, label: '1-9', color: '#6ad86e'}, // (0,9]
                {value: 0, label: '0', color: '#999'} // [0]
                ]
            },
            // geo配置详解： https://echarts.baidu.com/option.html#geo
            geo: { // 地理坐标系组件用于地图的绘制
            map: 'china', // 表示中国地图
            // roam: true, // 是否开启鼠标缩放和平移漫游
            zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
            label: {
                show: true
            },
            itemStyle: { // 地图区域的多边形 图形样式。
                borderColor: 'rgba(0, 0, 0, 0.2)',
                emphasis: { // 高亮状态下的多边形和标签样式
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            },
            series: [
            {
                name: '', // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
                type: 'map',
                geoIndex: 0,
                label: {
                show: true
                },
                // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接
                data: this.data
            }
            ]
        }
        // 使用刚指定的配置项和数据显示地图数据
        this.chinachart.setOption(this.chartOption)

    },
    methods:{
            getMessage(){
                let that = this;
                // http://139.159.209.32/
                //http://127.0.0.1:8000/login
                this.axios.get('http://127.0.0.1:8000/login').then(res=>{
                    console.log(res.data);
                    res= res.data;
                    
                    for(let i=0;i<res.length;i++){
                    
                        that.data.push({
                              'name': res[i]['province'],
                              'value': res[i]['total_confirm'],
                              'heal': res[i]['heal'],
                              'dead': res[i]['dead'],
                              'new_confirm': res[i]['new_confirm'],
                        })
                       
                    }
                     console.log(that.data)
                     //这里要重新初始化echarts，你去百度一下，数据更改侯echarts的更行问题
                       that.chinachart.setOption(that.chartOption)
                        
                })
            }
        },
        created(){
             this.getMessage();
        }
    }

</script>

<style>

</style>
