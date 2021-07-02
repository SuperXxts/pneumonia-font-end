<template>

<div style="width: 600px;margin: 0 auto">
    <div style="margin-left: 40%; width: 500px;margin-top: 100px;"></div>
    <div>
        <card v-if="flag==1">
            <h1 style="text-align: center">您已有训练任务正在进行，时间在</h1>
            <div style="text-align: center;">
            <Time :time="time3" :interval="1" style="font-size: 50px;"/>
            </div>
            <h1 style="text-align: center">所需时间为2小时</h1>
        </card>
        <card v-else :bordered="false">
            <Row style="background:#eee;padding:20px">
                <Col span="11" style="text-align: center">
            <card>
                <p slot="title">当前正常训练集数 </p>
                <h1>{{normalTrainNum}}</h1>
            </card>
                </Col>
                <Col span="11" offset="2" style="text-align: center">
                    <card>
                        <p slot="title">当前肺炎训练集数 </p>
                        <h1>{{pneumoniaTrainNum}}</h1>
                    </card>
                </Col>
            </Row>
            <br>
            <Button style="margin-left: 40%" type="primary" @click="train">开始训练</Button>
        </card>
    </div>



</div>
</template>

<script>
    export default {
        name: "time1",
        data(){
            return{
                flag:2,
                time3:localStorage.getItem("traintime"),
                normalTrainNum:0,
                pneumoniaTrainNum:0
            }
        },
        methods:{
            getinfo(){
                let that=this;
                this.axios.get("http://139.159.209.32:8089/train").then(res=>{
                    console.log(res);
                    that.normalTrainNum=res.data['normal'];
                    that.pneumoniaTrainNum = res.data['pneumonia']
                })
            },
            train(){
                let that=this;
                this.axios.get("http://139.159.209.32:8089/traindata").then(res=>{
                    console.log(res)
                    that.$Message.success("正在训练");
                    localStorage.setItem("traintime",new Date());
                    that.flag=1;
                    that.time3=localStorage.getItem("traintime")
                })
            }
        },
        created(){
            this.getinfo();
        }
    }
</script>

<style scoped>

</style>
