<template>
<!-- doctor 123456 -->
<div id="login" style="width:400px;margin: 0 auto">

    <div style="margin-left: 40%; width: 400px;margin-top: 100px;"></div>
    <card>
        <Form :label-width="120">
            <FormItem label="请输入用户名">
               <Input v-model="userName">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
               </Input>
            </FormItem>
            <FormItem label="请输入密码">
                <Input type="password" v-model="userPassword">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>

        <FormItem>
            <Button type="primary" @click="login">登录</Button>
            <Button type="info" @click="reg">注册</Button>
        </FormItem>
        </Form>
    </card>



</div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                userPassword: '123456',
                userName:'doctor'
            }
        },
        methods:{
            login(){

                if(this.userPassword==''||this.userName==''){
                    this.$Message.error("请输入完整")
                }
                else {
                    let that = this;
                    let data={
                        userName:this.userName,
                        userPassword: this.userPassword
                    };
                    this.axios.post('http://localhost:8000/login',data).then(res=>{
                        console.log("-------",res)
                        if(res.data!=='error'){
                            that.$Message.success("成功，正在跳转");
                            localStorage.setItem("name",that.userName);
                            this.$emit('success',res.data);
                            
                        }
                        else{
                            that.$Message.error("密码错误")
                        }
                    })
                }
            },
            reg(){
                this.$emit('reg');
            }
        },
        created(){
           localStorage.removeItem("name")
        }
    }
</script>

<style scoped>
    #login{
        zoom: 78%;
    }
</style>
