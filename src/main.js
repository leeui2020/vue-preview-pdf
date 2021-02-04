import Vue from 'vue'
import App from './App.vue'
import PreviewPDF from './PreviewPDF'

Vue.use(PreviewPDF)

new Vue({
  render: h => h(App),
}).$mount('#app')
