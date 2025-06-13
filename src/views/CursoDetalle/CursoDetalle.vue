<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid class="pa-2 pa-md-4 curso-detalle-container">
    <v-card class="curso-detalle-card" elevation="3" rounded="xl">
      <!-- Header con información del curso -->
      <v-card-title class="curso-detalle-header pa-4 pa-md-6">
        <div class="d-flex align-center flex-column flex-sm-row text-center text-sm-start">
          <v-avatar 
            :color="getSubjectColor(curso?.subject || '')" 
            :size="isMobile ? 40 : 48" 
            class="me-0 me-sm-4 mb-3 mb-sm-0"
          >
            <v-icon :icon="getSubjectIcon(curso?.subject || '')" :size="isMobile ? 24 : 28" color="white"></v-icon>
          </v-avatar>
          <div class="flex-grow-1">
            <h2 :class="['font-weight-bold', 'text-white', 'mb-1', isMobile ? 'text-h5' : 'text-h4']">
              Hola Cursos
            </h2>
            <p class="text-subtitle-1 text-white opacity-90 mb-0">
              Detalles del curso: {{ curso?.subject || 'Cargando...' }}
            </p>
          </div>
          <!-- Botón para regresar -->
          <v-btn
            @click="goBack"
            color="white"
            variant="outlined"
            :size="isMobile ? 'small' : 'default'"
            class="mt-3 mt-sm-0"
            rounded="lg"
          >
            <v-icon icon="mdi-arrow-left" class="me-2"></v-icon>
            Volver
          </v-btn>
        </div>
      </v-card-title>

      <!-- Contenido principal -->
      <v-card-text class="pa-4 pa-md-6">
        <v-row v-if="curso">
          <!-- Información básica del curso -->
          <v-col cols="12" md="6">
            <v-card elevation="2" rounded="lg" class="h-100">
              <v-card-title class="text-h6 font-weight-bold">
                <v-icon icon="mdi-information" class="me-2"></v-icon>
                Información General
              </v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-calendar" color="primary"></v-icon>
                    </template>
                    <v-list-item-title class="font-weight-medium">Período</v-list-item-title>
                    <v-list-item-subtitle>{{ curso.period }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-domain" color="primary"></v-icon>
                    </template>
                    <v-list-item-title class="font-weight-medium">Campus</v-list-item-title>
                    <v-list-item-subtitle>{{ curso.campus }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon :icon="getSubjectIcon(curso.subject)" color="primary"></v-icon>
                    </template>
                    <v-list-item-title class="font-weight-medium">Asignatura</v-list-item-title>
                    <v-list-item-subtitle>{{ curso.subject }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-group" color="primary"></v-icon>
                    </template>
                    <v-list-item-title class="font-weight-medium">Grupo de Estudio</v-list-item-title>
                    <v-list-item-subtitle>{{ curso.studyGroup }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Estadísticas del curso -->
          <v-col cols="12" md="6">
            <v-card elevation="2" rounded="lg" class="h-100">
              <v-card-title class="text-h6 font-weight-bold">
                <v-icon icon="mdi-chart-box" class="me-2"></v-icon>
                Estadísticas
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <div class="text-center">
                      <v-avatar color="info" size="64" class="mb-3">
                        <v-icon icon="mdi-account-group" size="32" color="white"></v-icon>
                      </v-avatar>
                      <div class="text-h4 font-weight-bold text-info">{{ curso.studentsCount }}</div>
                      <div class="text-body-2 text-medium-emphasis">Estudiantes</div>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-center">
                      <v-avatar color="warning" size="64" class="mb-3">
                        <v-icon icon="mdi-clipboard-list" size="32" color="white"></v-icon>
                      </v-avatar>
                      <div class="text-h4 font-weight-bold text-warning">{{ curso.tasksCount }}</div>
                      <div class="text-body-2 text-medium-emphasis">Tareas</div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Mensaje de bienvenida -->
          <v-col cols="12">
            <v-card elevation="2" rounded="lg" color="primary" variant="tonal">
              <v-card-text class="text-center pa-6">
                <v-icon icon="mdi-hand-wave" size="48" color="primary" class="mb-4"></v-icon>
                <h3 class="text-h5 font-weight-bold text-primary mb-3">
                  ¡Hola Cursos!
                </h3>
                <p class="text-body-1 text-medium-emphasis mb-0">
                  Bienvenido a los detalles del curso <strong>{{ curso.subject }}</strong>. 
                  Aquí podrás gestionar toda la información relacionada con este curso.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Estado de carga -->
        <div v-else class="text-center py-8">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            width="4"
          ></v-progress-circular>
          <p class="text-body-1 mt-4">Cargando información del curso...</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

// Vuetify display composable for responsive design
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// Router
const route = useRoute()
const router = useRouter()

// Reactive data
const curso = ref(null)

// Methods
const getSubjectIcon = (subject) => {
  const iconMap = {
    'COMUNICACIÓN': 'mdi-message-text',
    'MATEMÁTICA': 'mdi-calculator',
    'CIENCIAS': 'mdi-flask',
    'HISTORIA': 'mdi-book-open-page-variant',
    'INGLÉS': 'mdi-translate'
  }
  return iconMap[subject] || 'mdi-book'
}

const getSubjectColor = (subject) => {
  const colorMap = {
    'COMUNICACIÓN': 'purple',
    'MATEMÁTICA': 'blue',
    'CIENCIAS': 'green',
    'HISTORIA': 'brown',
    'INGLÉS': 'red'
  }
  return colorMap[subject] || 'grey'
}

const goBack = () => {
  router.push({ name: 'Cursos' })
}

// Simular carga de datos del curso
const loadCourseData = (id) => {
  // Datos de ejemplo - en una app real esto vendría de una API
  const allCourses = [
    {
      id: 1,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'COMUNICACIÓN',
      studyGroup: 'Primaria 6to - A',
      studentsCount: 25,
      tasksCount: 4,
      level: 'Primaria',
      grade: '6to',
      section: 'A'
    },
    {
      id: 2,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'MATEMÁTICA',
      studyGroup: 'Primaria 5to - B',
      studentsCount: 23,
      tasksCount: 6,
      level: 'Primaria',
      grade: '5to',
      section: 'B'
    },
    {
      id: 3,
      period: 'PA 2024',
      campus: 'LIMA-CENTRO',
      subject: 'CIENCIAS',
      studyGroup: 'Secundaria 3ro - A',
      studentsCount: 28,
      tasksCount: 3,
      level: 'Secundaria',
      grade: '3ro',
      section: 'A'
    },
    {
      id: 4,
      period: 'PA 2023',
      campus: 'MIRAFLORES',
      subject: 'HISTORIA',
      studyGroup: 'Secundaria 4to - C',
      studentsCount: 22,
      tasksCount: 5,
      level: 'Secundaria',
      grade: '4to',
      section: 'C'
    },
    {
      id: 5,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'INGLÉS',
      studyGroup: 'Primaria 2do - A',
      studentsCount: 20,
      tasksCount: 2,
      level: 'Primaria',
      grade: '2do',
      section: 'A'
    }
  ]

  // Simular delay de API
  setTimeout(() => {
    curso.value = allCourses.find(c => c.id === parseInt(id)) || null
  }, 500)
}

onMounted(() => {
  const courseId = route.params.id
  if (courseId) {
    loadCourseData(courseId)
  }
})
</script>

<style scoped>
.curso-detalle-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.curso-detalle-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>