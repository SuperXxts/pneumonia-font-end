import  myDoctor from './myDoctor.vue'
const reg1 = {
    install(Vue){
        Vue.component('myDoctor',myDoctor)
    }
}
export  default reg1
