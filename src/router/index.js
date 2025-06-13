import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/Login.vue'
import MainLayout from '../layouts/Mainlayout/MainLayout.vue'
import CalendarioView from '../views/Calendario/Calendario.vue'
import AsistenciasView from '../views/Asistencia/Asistencias.vue'
import IncidenciasView from '../views/Incidencias/Incidencias.vue'
import FirmaView from '../views/Firma/Firma.vue'
import CursosView from '../views/Cursos/Cursos.vue'
import CursoDetalleView from '../views/CursoDetalle/CursoDetalle.vue'
import CreacionMasivaView from '../views/CreacionMasiva/CreacionMasiva.vue'

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
        path: 'cursos/:id',
        name: 'CursoDetalle',
        component: CursoDetalleView,
        props: true
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