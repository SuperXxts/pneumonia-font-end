import  myList from './myList.vue'
const reg1 = {
    install(Vue){
        Vue.component('myList',myList)
    }
}
export  default reg1
