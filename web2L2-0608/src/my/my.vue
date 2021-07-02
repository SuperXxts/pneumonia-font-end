<template>
<!--
    a123
    123456
 -->
    <div id="my" style="width: 1000px;margin: 0 auto">
        <div style="margin-left: 40%; width: 900px;margin-top: 20px;"></div>
        <Card :bordered="false">
            <p slot="title">个人资料</p>
            <img src="./touxiang.png" style="width:120px;height:120px">
            <Form :label-width="100" inline>
               <br>
            <FormItem label="用户名：">
                <Input placeholder="请输入用户名" v-model="student.userName" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="姓  名：">
                <Input placeholder="请输入姓名" v-model="student.realName" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="密  码：">
                <Input type="password" placeholder="请输入密码" v-model="student.userPassword" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="性  别：">
                <Input placeholder="请输入性别" v-model="student.sex" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="年  龄：">
                <Input placeholder="请输入年龄" v-model="student.age" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="邮  箱：">
                <Input placeholder="请输入邮箱" v-model="student.mail" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="学  校： ">
                <Input placeholder="请输入学校名称" v-model="student.collage" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="专业班级： ">
                <Input placeholder="请输入专业班级" v-model="student.major" :disabled="diasabledInput" ></Input>
            </FormItem>
            <Button type="info" style="margin-left:75px" @click="change">修改信息</Button>
            <Button type="info" style="margin-left:65px" @click="submit">提交</Button>
           </Form>
        </Card>
    </div>
</template>

<script>

    export default {
        name: "my",
        data(){
            return{
                type:'student',
                student:{
                    userName:"",//用户名
                    realName:"",//姓名
                    collage:"",//大学
                    major:"",//专业班级
                    age:"",//年龄
                    sex:"",//性别
                    userPassword:"",//密码
                    mail:"",//邮箱
                    checkPassword:"",//确认密码
                    nickName:"",
                    school:"",
                },
                diasabledInput:true
            }
        },
        methods:{
            getIfo(){
                let that = this;
                this.axios.get('http://139.159.209.32:8909/userController/getUserInfo').then(res=>{
                    res  = res.data;
                    // this.res = res
                    that.student.userName = res.userName;
                    that.$store.state.userName = res.userName
                    that.student.realName = res.realName;
                    that.student.collage = res.collage;
                    that.student.major = res.major;
                    that.student.age = res.age;
                    that.student.sex = res.sex;
                    that.student.userPassword = res.userPassword;
                    that.student.mail = res.mail;
                    that.student.checkPassword = res.checkPassword;
                    that.student.nickName = res.nickName;
                    that.student.school = res.school;
                    console.log(res)
                    console.log("age")
                    console.log(res.age)
                    // console.log(res.doctorUser)

                })
            },
            change(){
            this.diasabledInput=false;
            },
            submit(){
                this.diasabledInput=true;
                let that = this;
                console.log(that)
                    this.axios.post('http://139.159.209.32:8909/userController/updateUserInfo',this.student).then(res=>{
                        console.log(res)
                        if(res.data.code=='201'){
                            that.$Message.error(res.data.info)
                        }
                        else if(res.data.code=='200'){
                            that.$Message.success("成功")
                            this.$emit('success');

                        }
                    })
            },

        },
        created(){
            this.getIfo();
        }
    }
</script>

<style scoped>

</style>
