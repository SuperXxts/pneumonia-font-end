<template>
    <div id="myApply" style="width: 900px;margin: 0 auto"></div>
    
</template>

<script>
    export default {
        name: "myApply",
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

