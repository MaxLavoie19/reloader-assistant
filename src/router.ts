import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '/src/pages/HomePage.vue'
import ReloadPage from '/src/pages/ReloadPage.vue'
import ShootPage from '/src/pages/ShootPage.vue'

const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'reload', path: '/reload', component: ReloadPage },
  { name: 'shoot', path: '/shoot', component: ShootPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
