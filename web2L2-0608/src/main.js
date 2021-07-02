import Vue from 'vue'

import app from './app.vue'

import ViewUI from 'view-design';

import 'view-design/dist/styles/iview.css';

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(ViewUI);

import VueRouter from 'vue-router'
Vue.use(VueRouter);


//导入自己的router模块
import routes from './router.js'

import login from './login'
Vue.use(login)

import reg from './reg'
Vue.use(reg)

import question from './question'
Vue.use(question)

import list from './list'
Vue.use(list)

import upload from './upload'
Vue.use(upload)

import state from './state'
Vue.use(state)

import test from './test'
Vue.use(test)

import train from './train'
Vue.use(train)

import forum from './forum'
Vue.use(forum)

import my from './my'
Vue.use(my)

import myDoctor from './myDoctor'
Vue.use(myDoctor)

import myApply from './myApply'
Vue.use(myApply)

import myList from './myList'
Vue.use(myList)


import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import time1 from './time'
Vue.use(time1)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// axios.defaults.withCredentials=true

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
	zIndexInline: 9999
})

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import '@/styles/index.css' // global css
Vue.use(VueQuillEditor)

import Vuex from 'vuex'

import store from './store.js'
Vue.use(Vuex);
axios.defaults.withCredentials = true;
var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router: routes,
	store,
});
