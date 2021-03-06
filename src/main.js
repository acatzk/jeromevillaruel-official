import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faSpinner, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { apolloProvider } from '@/services';
import VueTimeago from 'vue-timeago';
import VuePageTransition from 'vue-page-transition';
import BackToTop from 'vue-backtotop';
import AOS from 'aos';
import { fb } from '@/services'
import VueSocialSharing from 'vue-social-sharing'
 
library.add(faUserSecret)
library.add(faFontAwesome)
library.add(faSpinner, faAlignLeft)
library.add(faFacebook)
library.add(faTwitter)
library.add(faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.use(VuePageTransition)
Vue.use(BackToTop)
Vue.use(VueSocialSharing)

Vue.use(VueTimeago, {
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn')
  }
})

import 'aos/dist/aos.css'; // You can also use <link> for styles


let app = ''

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      apolloProvider,
      created () {
        AOS.init()
      },
      render: h => h(App)
    }).$mount("#app")
  }
})