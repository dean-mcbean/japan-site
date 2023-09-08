import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import { createPinia } from 'pinia'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes = [
    { path: '', component: App },
    { path: '/about', component: About },
  ]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory('/japan/'),
    routes, // short for `routes: routes`
})
//
const pinia = createPinia()


createApp(App).use(router).use(pinia).mount('#app')

/* .use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyDfuVx0OlVZMtM6OaYTdtBSnIKG8nG7AYE',
      libraries: "places"
  },
}) */