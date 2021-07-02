<template>
<div id="reg" style="width: 800px;margin: 0 auto">
<div style="margin-left: 40%; width: 800px;margin-top: 100px;"></div>

    <card style="width:800px">
    <Form :label-width="140" inline>
        <FormItem label="注册类型">
            <RadioGroup v-model="type" type="button">
                <Radio label="user" checked>普通用户</Radio>
            </RadioGroup>
        </FormItem>
        <div v-if="type=='user'">
            <FormItem label="用户名">
                <Input type="text"  placeholder="请输入用户名" v-model="user.userName"/>
            </FormItem>
            <FormItem label="邮箱">
                <Input type="text" placeholder="请输入邮箱"  @on-blur="checkEmail" v-model="user.mail"/>
            </FormItem>
            <FormItem label="密码">
                <Input type="password" placeholder="请输入密码" v-model="user.userPassword"/>
            </FormItem>
            <FormItem label="确认密码">
                <Input type="password" placeholder="请再次输入密码" v-model="user.checkPassword"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="usersubmit">注册</Button>
            </FormItem>
        </div>
    </Form>
    </card>
</div>
</template>

<script>
    export default {
        name: "reg",
        data(){
            return{
                type:'user',
                user:{
                    userName:'',
                    userPassword:'',
                    checkPassword:''
                }
            }
        },
        methods:{
            checkEmail() {
                var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                if (this.user.mail != '' && !regEmail.test(this.user.mail)) {
                    this.$message({
                        message: '邮箱格式不正确',
                        type: 'error'
                    })
                    this.user.mail = ''
                }
            },
            usersubmit(){
                console.log(this.user)
                if(this.user.checkPassword==this.user.userPassword){
                    let data={
                        userName:this.user.userName,
                        userPassword:this.user.userPassword
                    }
                    let that = this;
                    this.axios.post('http://139.159.209.32:8909/userController/registerUser',this.user).then(res=>{
                        console.log(res)
                        if(res.data.code=='201'){
                            that.$Message.error(res.data.info)
                        }
                        else if(res.data.code=='200'){
                            that.$Message.success("成功")
                            this.$emit('success');

                        }
                    })
                }
                else {
                    this.$Message.error("两次输入的用户名密码不匹配")
                }
            }
        },
        created(){
            localStorage.removeItem("name")
        }
    }
</script>

<style>
    #reg{
        zoom: 78%; 
    }
</style>
