<template>
    <div id="list" style="width: 1000px;margin: 0 auto">
        <div style="margin-left: 10%; width: 900px;margin-top: 20px;"></div>
        <card>
            <List item-layout="vertical">
                <!-- <h1 v-for="item in res" :key="item.userName">{{item.sex+item.age}}-</h1> -->
                <ListItem v-for="item in res" :key="item.userName" style="height:90px">
                    <ListItemMeta :avatar="item.avatar" :description="item.date" />
                    年龄：<font color="blue" style="text-decoration:underline">{{ item.age }}</font> &nbsp; 
                    性别：<font color="blue" style="text-decoration:underline">{{item.sex}} </font>&nbsp; 
                    过敏史：<font color="blue" style="text-decoration:underline">{{item.allergy}}</font>&nbsp; &nbsp;
                    主诉：<font color="blue" style="text-decoration:underline">{{item.textarea}}</font>&nbsp;
                    <!-- 诊断医生：<font color="blue" style="text-decoration:underline">{{item.uploadUserName}}</font>&nbsp;  -->
                    诊断结果：<font color="blue" style="text-decoration:underline">{{item.result}}</font>
                    <template slot="extra">
                        <img v-image-preview :src="item.imgSrc" style="width: 190px;height:70px">
                    </template>
                </ListItem>
            </List>
        </card>
        <!-- 分页 -->
        <div style="position: absolute;bottom: -10px;left: 50%;transform: translate(-50%, -50%);">
            <Page :total="total" :page-size="pageSize" show-elevator show-total @on-change="next"/>
        </div>
    </div>
        
        
</template>

<script>
    export default {
        name: "list",
        data(){
            return{
                res:[],
                avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                // src:'',
                src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584983724981&di=bb0a74080d293487774cc440bf5363a2&imgtype=0&src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F31798608.jpeg',
                userName:'',
                // probability:'',
                description:'',
                age:'',
                pageSize:5,
                allInfo:[],
                total:0,
                data:'',
            }
        },
        methods:{
            //http://139.159.209.32:8909/analysisController/getAllMR
            getIfo(){
                let that = this;
                this.axios.get('http://139.159.209.32:8909/analysisController/getAllMR').then(res=>{
                    res  = res.data;
                    that.allInfo=res;
                    that.total=res.length
                    this.res = res

                    //that.images=res
                    // console.log("description");
                    // console.log(res.sex,res.age)
                    console.log("res.length")
                    console.log(res.length)
                    console.log("res")
                    console.log(res)
                    for(let i = 0;i<res.length;i++){
                        // console.log("res[i]");
                        // console.log(res[i])
                        if(res.length==0){
                            that.flag=2;
                            this.page=1;
                        }else{
                            if(res.length < this.pageSize){
                                
                                // console.log('**********************');
                                // console.log('res[i].avatar');
                                // console.log(this.avatar);
                                // console.log('this.src');
                                // console.log(this.src);
                                // console.log('this.userName');
                                // console.log(this.userName);
                                // console.log('this.age');
                                // console.log(this.age);
                                // this.avatar = res[i].avatar;
                                // this.src = res[i].src;
                                // this.userName = res[i].userName;
                                // this.age = res[i].age;
                                this.res = res;

                            }else{
                                // this.userName = res[i].userName.slice(0,this.pageSize);
                                // this.age = res[i].age;
                                this.res = res.slice(0,this.pageSize);
                            }                          
                    }
                }   

                })
            },
             next(e){
                var _start = ( e - 1 ) * this.pageSize;
                var _end = e * this.pageSize;
                this.res=[];
                for(let i=_start;i<this.allInfo.length;i++){
                    if(this.res.length<5){
                        this.res.push(this.allInfo[i])
                    }      
                }
                console.log(this.res.length)  
            }
        
        },
        created(){
            this.getIfo();
        }
    }
</script>

<style scoped>
    
</style>
