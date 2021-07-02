<template>

	<div id="main">

	
		<Menu @on-select="select1" active-name="1" mode="horizontal" theme="dark" >
			<MenuItem name="1" v-if="type=='doctor'">
				<Icon type="ios-paper" />
				上传信息
			</MenuItem>
			<MenuItem name="2">
				<Icon type="ios-construct" />
				查看所有病例
			</MenuItem>
			<MenuItem name="8"  v-if="type=='doctor'">
				<Icon type="ios-construct" />
				查看本院病例
			</MenuItem>
			<MenuItem name="7">
				<Icon type="ios-map"  />
				查看实时疫情
			</MenuItem>
			<!-- <MenuItem name="9"  v-if="type=='doctor'">
				<Icon type="ios-construct" />
				更改结果申请
			</MenuItem> -->
			<MenuItem name="10">
				<Icon type="ios-map"  />
				讨论区
			</MenuItem>
			<MenuItem name="11">
				<Icon type="ios-map"  />
				我的信息
			</MenuItem>
			<MenuItem name="4" style="float:right" v-if="name!=''">
				<Icon type="ios-construct" />
				{{name}}
			</MenuItem>
			<MenuItem name="5" style="float:right" v-else>
				<Icon type="ios-construct" />
				请登录
			</MenuItem>

		</Menu>


		<!-- <div style="margin-left: 40%; width: 500px;margin-top: 100px;"> -->

			<reg @success="regsuccess" v-if="flag==1"></reg>
			<login @reg="toreg" @success="login" v-if="flag==2"></login>
			<upload @success="uploadsuccess" v-if="flag==3"></upload>
			<list v-if="flag==5"></list>
			<state v-if="flag==7"></state>
			<myList v-if="flag==8"></myList>
			<myApply v-if="flag==9"></myApply>
			<forum v-if="flag==10"></forum>
			<my v-if="flag==11"></my>
			<myDoctor v-if="flag==12"></myDoctor>
			</div>

</template>

<script>

	export default {
        data() {
            return {
                flag:2,
				name:'',
                type:'doctor',
                searid:'',
                cookie:1,
				spin:false,
				email:'',
				src:'',
				model1:true,
				getinfotimer:1,
				model2:false,
				modeluuid:'',
				rate:''
            }
        },

		methods:{
            toreg(){
              this.flag=1;
			},
			regsuccess(){
			  this.flag=2;
			},
            select1(name){
                if(this.name==''&&name!='5'){
                    this.$Message.error("请登录")
				}
				else if(name==1&&this.type=='doctor'){
				    this.flag=3
				}
                else if(name==2){
				    this.flag=5
				}
                else if(name==3){
				    this.flag=4
				}
                else if(name==5){
				    this.flag=2
				}
                else if(name==6){
				    this.flag=6
				}
				else if(name==7){
				    this.flag=7
				}
				else if(name==8&&this.type=='doctor'){
				    this.flag=8
				}
				// else if(name==9&&this.type=='doctor'){
				//     this.flag=9
				// }
				else if(name==10){
				    this.flag=10
				}
				else if(name==11&&this.type=='user'){
				    this.flag=11
				}
				else if(name==11&&this.type=='doctor'){
				    this.flag=12
				}
			},
			login(flag){
			    this.name=localStorage.getItem('name')
                let that = this;
				if(flag==100){
					that.type='doctor'
					that.flag=3
					that.$store.state.authority = 'doctor'
				}
				if(flag==101){
					that.type='user'
					that.flag=5
					that.$store.state.authority = 'user'
				}
			},
            uploadsuccess(){

               this.getinfotimer=new Date();
			},
			sear(){

                let that =this;
              	this.axios.get("http://139.159.209.32:8909/getinfo/"+localStorage.getItem("imguuid")).then(e=>{
                            console.log(e.data)
                            that.model2=true;
                            that.modeluuid=newvalue;
                            that.rate=e.data.split("#[")[1].split("]")[0]
                        })
			},

			upload(){
              this.$Message.success("上传成功，请等待结果")
				this.$Loading.start();
              let that = this;
              let data={
                  src:that.src
			  };



			},


			getinfo(){
                let that = this;
                this.axios.get("http://139.159.209.32:8909/getinfo/"+uuid).then(e=>{
                    console.log(e.data)
				})
			}
		},
		// watch: {
        //     getinfotimer: function (newvalue,old) {
        //         //当不断输入字符时，因为延时执行还没有开始，就被清除，然后重新生成新的延时器
        //         //虽然不停的清除，生成新的延时器，但在输入的时候延时器内部的方法都一直没有被执行
        //         clearTimeout(this.timer);  //清除延迟执行
		// 		let that =this;
        //         this.timer = setTimeout(() => {   //设置延迟执行http://139.159.209.32:8089/getinfo/
        //             this.axios.get("http://139.159.209.32:8909/getinfo/"+localStorage.getItem("imguuid")).then(e=>{
        //                 console.log(e.data)
		// 				that.model2=true;
		// 				that.modeluuid=localStorage.getItem("name");
		// 				if(e.data.split("#")[1]==0){
		// 				    that.rate=0+'%'
		// 				}else{
        //                     that.rate=parseFloat(e.data.split("#[")[1].split("]")[0])*100+0+'%'
		// 				}

        //             })

        //         }, 10000);
        //     }
        // },
        created() {

        }
    }
</script>
<style>
	#main{
		width: 100%;
		height: 100%;
		min-height: 600px;
		background-image: url('./background.jpg');
		background-size: cover;
		background-attachment: fixed;
		background-repeat: repeat;

		/* zoom: 78%; */

	}
</style>

