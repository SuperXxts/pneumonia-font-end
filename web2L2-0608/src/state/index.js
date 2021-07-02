import state from './state.vue'
const reg1 = {
    install(Vue){
        Vue.component('state',state)
    }
}
export  default reg1
