<template>
<!-- doctor
        123456 -->
    <div id="myDoctor" style="width: 1000px;margin: 0 auto">
        <div style="margin-left: 40%; width: 900px;margin-top: 20px;"></div>
        <Card :bordered="false">
            <p slot="title">个人资料</p>
            <img src="./touxiang.jpg" style="width:120px;height:120px">
           <Form :label-width="100" inline>
               <br>
            <FormItem label="用户名：">
                <Input placeholder="请输入用户名" v-model="doctor.doctorUser" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="姓  名：">
                <Input placeholder="请输入姓名" v-model="doctor.doctorName" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="密  码：">
                <Input type="password" placeholder="请输入密码" v-model="doctor.doctorPassword" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="性  别：">
                <Input placeholder="请输入性别" v-model="doctor.doctorGender" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="医师级别: ">
                <Input placeholder="请输入医师级别" v-model="doctor.doctorLevel" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="执业类别: ">
                <Input placeholder="请输入执业类别" v-model="doctor.doctorType" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="执业地点: ">
                <Input placeholder="请输入执业类别" v-model="doctor.doctorAddress" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="主要执业机构: ">
                <Input placeholder="请输入主要执业机构" v-model="doctor.doctorMechanism" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="执业范围: ">
                <Input placeholder="请输入执业范围" v-model="doctor.doctorRange" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="执业证书编码: ">
                <Input placeholder="请输入执业证书编码" v-model="doctor.doctorNumber" :disabled="diasabledInput" ></Input>
            </FormItem>
            <FormItem label="所属医院: ">
                <Input placeholder="请输入所属医院" v-model="doctor.hospital" :disabled="diasabledInput" ></Input>
            </FormItem>
            <Button type="info" style="margin-left:75px" @click="change">修改信息</Button>
            <Button type="info" style="margin-left:65px" @click="submit">提交</Button>
           </Form> 
        </Card>
    </div>
</template>

<script>
//"执业地点doctorAddress":"??","性别doctorGender":"?","医师级别doctorLevel":"1",
//"主要执业机构doctorMechanism":"1","姓名doctorName":"dc","执业证书编码doctorNumber":"1",
//"密码doctorPassword":"dc","执业范围doctorRange":"1","执业类别doctorType":"1",
//"用户名doctorUser":"dc","医院hospital":"central"
    export default {
        name: "myDoctor",
        data(){
            return{
                type:'doctor',
                doctor:{
                    doctorUser:"",//用户名
                    doctorName:"",//姓名
                    doctorGender:"",//性别
                    doctorPassword:"",//密码
                    doctorAddress:"",//执业地点
                    doctorLevel:"",//医师级别
                    doctorMechanism:"",//主要执业机构
                    doctorRange:"",//执业范围
                    doctorNumber:"",//执业证书编码
                    doctorType:"",//执业类别
                    hospital:"",//医院  
                },
                diasabledInput:true
            }
        },
        methods:{
            getIfo(){
                let that = this;
                console.log(that);
                this.axios.get('http://139.159.209.32:8909/userController/getUserInfo').then(res=>{
                    res  = res.data;
                    // this.res = res
                    that.doctor.doctorUser = res.doctorUser;
                    that.doctor.doctorName = res.doctorName;
                    that.doctor.doctorGender = res.doctorGender;
                    that.doctor.doctorPassword = res.doctorPassword;
                    that.doctor.doctorAddress = res.doctorAddress;
                    that.doctor.doctorLevel = res.doctorLevel;
                    that.doctor.doctorMechanism = res.doctorMechanism;
                    that.doctor.doctorRange = res.doctorRange;
                    that.doctor.doctorNumber = res.doctorNumber;
                    that.doctor.doctorType = res.doctorType;
                    that.doctor.hospital = res.hospital;
                    console.log(res)
                    console.log(res.doctorUser)

                })
            },
            change(){
            this.diasabledInput=false;
            },
            submit(){
                this.diasabledInput=true;
                let that = this;
                    this.axios.post('http://139.159.209.32:8909/userController/updateDoctorInfo',this.doctor).then(res=>{
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