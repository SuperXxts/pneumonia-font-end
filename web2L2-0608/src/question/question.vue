<template>
    <div id="question" style="width: 900px;margin: 0 auto">
    <div style="margin-left: 40%; width: 900px;margin-top: 100px;"></div>
        <card>
            <Input v-model="value" maxlength="100" show-word-limit type="textarea"
                   placeholder="请输入反馈信息"  /><br><br>
            <Button style="margin-left: 410px;" type="primary" @click="sub">提交</Button>

        </card>

    </div>
</template>

<script>
    export default {
        name: "question",
        data(){
            return{
                value:''
            }
        },
        methods:{
            sub(){
                let that = this;
                let data={
                    name:localStorage.getItem("name"),
                    info:this.value
                }
                that.axios.post('http://139.159.209.32:8909/analysisController/saveFeedback',data).then(res=>{
                    if(res.data.code=='201'){
                        that.$Message.error(res.data.info)
                    }
                    else{
                        that.$Message.success("成功")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #question{
        zoom: 78%; 
    }
</style>

