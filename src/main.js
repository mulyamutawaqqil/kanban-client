import Vue from 'vue';
import App from './App.vue';
import GoogleAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '1068909796777-mkiu0iktteqtodhnmc1lt65i64g91ipn.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');

