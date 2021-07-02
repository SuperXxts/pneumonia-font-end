import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	count:0,
	sessionid:'',
	authority:'',
	userName:'',
	isLogin:true,//是否登录，初始值为true，是为了防止
	firstLogin:false,//第一次登录
	url:'http://localhost:8088',//服务器地址
	//url:'http://139.159.209.32:8088',
	nowTitle:'00',//用户当前所处节点
	localUUID:'',//本地的localuuid
	msg:{
		isRead:false//未读信息
		}
}
const msg={
	isRead:false
}
export default new Vuex.Store({
	msg,
	state
})
