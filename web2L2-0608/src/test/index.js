import test from './test.vue'
const reg1 = {
    install(Vue){
        Vue.component('test',test)
    }

}
export  default reg1
