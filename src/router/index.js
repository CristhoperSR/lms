import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'
import CalendarioView from '../views/Calendario.vue'
import AsistenciasView from '../views/Asistencias.vue'
import IncidenciasView from '../views/Incidencias.vue'
import FirmaView from '../views/Firma.vue'
import CursosView from '../views/Cursos.vue'
import CreacionMasivaView from '../views/CreacionMasiva.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/app/calendario'
      },
      {
        path: 'calendario',
        name: 'Calendario',
        component: CalendarioView
      },
      {
        path: 'asistencias',
        name: 'Asistencias',
        component: AsistenciasView
      },
      {
        path: 'incidencias',
        name: 'Incidencias',
        component: IncidenciasView
      },
      {
        path: 'firma',
        name: 'Firma',
        component: FirmaView
      },
      {
        path: 'cursos',
        name: 'Cursos',
        component: CursosView
      },
      {
        path: 'creacion-masiva',
        name: 'CreacionMasiva',
        component: CreacionMasivaView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router