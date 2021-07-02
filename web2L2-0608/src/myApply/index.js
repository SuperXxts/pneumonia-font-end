import  myApply from './myApply.vue'
const reg1 = {
    install(Vue){
        Vue.component('myApply',myApply)
    }
}
export  default reg1
