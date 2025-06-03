import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../view/Login.vue'
import AsistenceView from '../view/attendance/Asistence.vue'

const routes = [
  {
    path: '/',
    redirect: '/login' // redirige la raíz al login
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/asistence',
    name: 'AsistenceView',
    component: AsistenceView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login' // redirige cualquier ruta desconocida al login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router