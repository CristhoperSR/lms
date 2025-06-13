<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container fluid class="pa-2 pa-md-4 courses-container">
    <v-card class="courses-card" elevation="3" rounded="xl">
      <!-- Header with gradient background -->
      <v-card-title class="courses-header pa-4 pa-md-6">
        <div class="d-flex align-center flex-column flex-sm-row text-center text-sm-start">
          <v-avatar 
            :color="$vuetify.theme.current.colors.primary" 
            :size="isMobile ? 40 : 48" 
            class="me-0 me-sm-4 mb-3 mb-sm-0"
          >
            <v-icon icon="mdi-school" :size="isMobile ? 24 : 28" color="white"></v-icon>
          </v-avatar>
          <div>
            <h2 :class="['font-weight-bold', 'text-white', 'mb-1', isMobile ? 'text-h5' : 'text-h4']">
              Gestión de Cursos
            </h2>
            <p class="text-subtitle-1 text-white opacity-90 mb-0">
              Administra tus asignaturas académicas
            </p>
          </div>
        </div>
      </v-card-title>

      <!-- Filters Section with improved responsive design -->
      <v-card-text class="filters-section pa-4 pa-md-6">
        <!-- Mobile Filter Toggle -->
        <div v-if="isMobile" class="mb-4">
          <v-btn
            @click="showMobileFilters = !showMobileFilters"
            :prepend-icon="showMobileFilters ? 'mdi-chevron-up' : 'mdi-filter'"
            color="primary"
            variant="outlined"
            block
            rounded="lg"
          >
            {{ showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros' }}
          </v-btn>
        </div>

        <!-- Filters Row -->
        <v-expand-transition>
          <div v-show="!isMobile || showMobileFilters">
            <v-row align="end" class="mb-2" no-gutters>
              <v-col 
                v-for="(filter, index) in filters" 
                :key="filter.key"
                :cols="isMobile ? 12 : 'auto'"
                :md="2" 
                :class="[
                  isMobile ? 'mb-3' : 'pe-2 pb-2',
                  index === filters.length - 1 ? '' : (isMobile ? '' : 'pe-2')
                ]"
              >
                <v-select
                  v-model="filter.value"
                  :items="filter.items"
                  :label="filter.label"
                  variant="outlined"
                  :density="isMobile ? 'default' : 'compact'"
                  :prepend-inner-icon="filter.icon"
                  class="filter-select"
                  hide-details
                  clearable
                  @update:model-value="onFilterChange"
                ></v-select>
              </v-col>
              
              <!-- Search Button -->
              <v-col 
                :cols="isMobile ? 12 : 'auto'"
                :md="2" 
                :class="isMobile ? '' : 'pb-2'"
              >
                <v-btn
                  color="primary"
                  :size="isMobile ? 'default' : 'large'"
                  class="search-btn"
                  @click="searchCourses"
                  block
                  elevation="2"
                  rounded="lg"
                  :loading="loading"
                >
                  <v-icon icon="mdi-magnify" class="me-2"></v-icon>
                  Buscar
                </v-btn>
              </v-col>
            </v-row>

            <!-- Clear Filters Button (Mobile) -->
            <v-row v-if="isMobile && hasActiveFilters" class="mt-2">
              <v-col cols="12">
                <v-btn
                  @click="clearFilters"
                  variant="outlined"
                  block
                  rounded="lg"
                  prepend-icon="mdi-filter-off"
                >
                  Limpiar filtros
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>

        <!-- Results Summary -->
        <v-alert
          type="success"
          variant="tonal"
          class="results-alert mt-3"
          v-if="filteredCourses.length > 0"
          rounded="lg"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-check-circle" class="me-2"></v-icon>
          </template>
          <span class="font-weight-medium">
            Se {{ filteredCourses.length === 1 ? 'encontró' : 'encontraron' }} {{ filteredCourses.length }} 
            {{ filteredCourses.length === 1 ? 'asignatura' : 'asignaturas' }}
            {{ isMobile ? ` (Página ${currentPage} de ${totalPages})` : '' }}
          </span>
        </v-alert>
      </v-card-text>

      <!-- Courses Table/Cards with responsive design -->
      <v-card-text v-if="filteredCourses.length > 0" class="table-section pa-4 pa-md-6 pt-0">
        <!-- Desktop Table View -->
        <v-data-table
          v-if="!isMobile"
          :headers="headers"
          :items="filteredCourses"
          class="courses-table elevation-2"
          :items-per-page="itemsPerPage"
          :loading="loading"
          loading-text="Cargando cursos..."
          rounded="lg"
          :items-per-page-options="itemsPerPageOptions"
        >
          <!-- Period Column -->
          <template v-slot:[`item.period`]="{ item }">
            <v-chip
              color="blue"
              variant="flat"
              size="small"
              class="font-weight-medium"
              rounded="lg"
            >
              {{ item.period }}
            </v-chip>
          </template>

          <!-- Campus Column -->
          <template v-slot:[`item.campus`]="{ item }">
            <div class="campus-cell d-flex align-center">
              <v-avatar color="primary" size="24" class="me-2">
                <v-icon icon="mdi-domain" size="14" color="white"></v-icon>
              </v-avatar>
              <span class="font-weight-medium">{{ item.campus }}</span>
            </div>
          </template>

          <!-- Subject Column -->
          <template v-slot:[`item.subject`]="{ item }">
            <div class="subject-cell d-flex align-center">
              <v-avatar :color="getSubjectColor(item.subject)" size="24" class="me-2">
                <v-icon :icon="getSubjectIcon(item.subject)" size="14" color="white"></v-icon>
              </v-avatar>
              <span class="font-weight-medium">{{ item.subject }}</span>
            </div>
          </template>

          <!-- Study Group Column -->
          <template v-slot:[`item.studyGroup`]="{ item }">
            <v-chip
              color="green"
              variant="flat"
              size="small"
              class="font-weight-medium"
              rounded="lg"
            >
              {{ item.studyGroup }}
            </v-chip>
          </template>

          <!-- Students Count Column -->
          <template v-slot:[`item.studentsCount`]="{ item }">
            <div class="count-cell d-flex align-center justify-center">
              <v-chip
                color="info"
                variant="tonal"
                size="small"
                class="font-weight-bold"
                rounded="lg"
              >
                <v-icon icon="mdi-account-group" size="12" class="me-1"></v-icon>
                {{ item.studentsCount }}
              </v-chip>
            </div>
          </template>

          <!-- Tasks Count Column -->
          <template v-slot:[`item.tasksCount`]="{ item }">
            <div class="count-cell d-flex align-center justify-center">
              <v-chip
                color="warning"
                variant="tonal"
                size="small"
                class="font-weight-bold"
                rounded="lg"
              >
                <v-icon icon="mdi-clipboard-list" size="12" class="me-1"></v-icon>
                {{ item.tasksCount }}
              </v-chip>
            </div>
          </template>

          <!-- Actions Column -->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="actions-cell d-flex justify-center">
              <v-btn
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                color="primary"
                @click="viewCourse(item)"
                rounded="lg"
                elevation="1"
              >
                <v-icon>mdi-arrow-right</v-icon>
                <v-tooltip activator="parent" location="top">Ver detalles</v-tooltip>
              </v-btn>
            </div>
          </template>
        </v-data-table>

        <!-- Mobile Card View -->
        <div v-else class="mobile-courses">
          <v-card
            v-for="course in paginatedCourses"
            :key="course.id"
            class="course-card mb-4"
            elevation="2"
            rounded="lg"
            @click="viewCourse(course)"
          >
            <v-card-text class="pa-4">
              <!-- Header Row -->
              <div class="d-flex align-center justify-space-between mb-3">
                <v-chip
                  color="blue"
                  variant="flat"
                  size="small"
                  class="font-weight-medium"
                  rounded="lg"
                >
                  {{ course.period }}
                </v-chip>
                <v-btn
                  icon="mdi-arrow-right"
                  size="small"
                  variant="text"
                  color="primary"
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </div>

              <!-- Subject and Campus -->
              <div class="mb-3">
                <div class="d-flex align-center mb-2">
                  <v-avatar :color="getSubjectColor(course.subject)" size="32" class="me-3">
                    <v-icon :icon="getSubjectIcon(course.subject)" size="18" color="white"></v-icon>
                  </v-avatar>
                  <div>
                    <div class="font-weight-bold text-h6">{{ course.subject }}</div>
                    <div class="text-body-2 text-medium-emphasis">{{ course.campus }}</div>
                  </div>
                </div>
              </div>

              <!-- Study Group -->
              <div class="mb-3">
                <v-chip
                  color="green"
                  variant="flat"
                  size="small"
                  class="font-weight-medium"
                  rounded="lg"
                >
                  {{ course.studyGroup }}
                </v-chip>
              </div>

              <!-- Stats Row -->
              <div class="d-flex justify-space-between">
                <v-chip
                  color="info"
                  variant="tonal"
                  size="small"
                  class="font-weight-bold"
                  rounded="lg"
                >
                  <v-icon icon="mdi-account-group" size="14" class="me-1"></v-icon>
                  {{ course.studentsCount }} alumnos
                </v-chip>
                <v-chip
                  color="warning"
                  variant="tonal"
                  size="small"
                  class="font-weight-bold"
                  rounded="lg"
                >
                  <v-icon icon="mdi-clipboard-list" size="14" class="me-1"></v-icon>
                  {{ course.tasksCount }} tareas
                </v-chip>
              </div>
            </v-card-text>
          </v-card>

          <!-- Mobile Pagination -->
          <div v-if="totalPages > 1" class="pagination-container">
            <v-card elevation="2" rounded="xl" class="pagination-card">
              <v-card-text class="pa-3">
                <!-- Información de página actual -->
                <div class="text-center mb-3">
                  <span class="text-body-2 text-medium-emphasis">
                    Mostrando {{ ((currentPage - 1) * mobileItemsPerPage) + 1 }} - 
                    {{ Math.min(currentPage * mobileItemsPerPage, filteredCourses.length) }} 
                    de {{ filteredCourses.length }} cursos
                  </span>
                </div>
                
                <!-- Paginador principal -->
                <v-pagination
                  v-model="currentPage"
                  :length="totalPages"
                  class="custom-pagination"
                  rounded="circle"
                  :total-visible="5"
                  density="comfortable"
                  color="primary"
                  active-color="primary"
                  variant="elevated"
                  size="default"
                ></v-pagination>
                
                <!-- Controles adicionales -->
                <div class="d-flex justify-space-between align-center mt-3">
                  <v-btn
                    :disabled="currentPage === 1"
                    @click="goToFirstPage"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    color="primary"
                  >
                    <v-icon icon="mdi-chevron-double-left" class="me-1"></v-icon>
                    Primera
                  </v-btn>
                  
                  <div class="d-flex align-center">
                    <v-btn
                      :disabled="currentPage === 1"
                      @click="goToPreviousPage"
                      variant="text"
                      icon="mdi-chevron-left"
                      color="primary"
                      size="small"
                    ></v-btn>
                    
                    <span class="mx-2 font-weight-medium">
                      {{ currentPage }} / {{ totalPages }}
                    </span>
                    
                    <v-btn
                      :disabled="currentPage === totalPages"
                      @click="goToNextPage"
                      variant="text"
                      icon="mdi-chevron-right"
                      color="primary"
                      size="small"
                    ></v-btn>
                  </div>
                  
                  <v-btn
                    :disabled="currentPage === totalPages"
                    @click="goToLastPage"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    color="primary"
                  >
                    Última
                    <v-icon icon="mdi-chevron-double-right" class="ms-1"></v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>

      <!-- Empty State -->
      <v-card-text v-else class="empty-state pa-6 pa-md-8">
        <div class="text-center py-8 py-md-12">
          <v-avatar color="grey-lighten-3" :size="isMobile ? 80 : 96" class="mb-6">
            <v-icon icon="mdi-school-outline" :size="isMobile ? 40 : 48" class="text-grey-darken-1"></v-icon>
          </v-avatar>
          <h3 :class="['text-grey-darken-2', 'mb-3', 'font-weight-medium', isMobile ? 'text-h6' : 'text-h5']">
            No se encontraron cursos
          </h3>
          <p class="text-body-1 text-grey-darken-1 mb-4">
            Ajusta los filtros para encontrar los cursos que buscas
          </p>
          <v-btn 
            color="primary" 
            variant="outlined"
            @click="clearFilters"
            rounded="lg"
            :size="isMobile ? 'default' : 'large'"
          >
            <v-icon icon="mdi-filter-off" class="me-2"></v-icon>
            Limpiar filtros
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import './cursos.css'

// Vuetify display composable for responsive design
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// Reactive data
const showMobileFilters = ref(false)
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const mobileItemsPerPage = ref(4)

// Filter data with direct reactive references
const periodFilter = ref('')
const campusFilter = ref('')
const levelFilter = ref('')
const gradeFilter = ref('')
const sectionFilter = ref('')

const filters = ref([
  {
    key: 'period',
    label: 'Período',
    icon: 'mdi-calendar',
    value: periodFilter,
    items: ['PA 2024', 'PA 2023']
  },
  {
    key: 'campus',
    label: 'Campus',
    icon: 'mdi-domain',
    value: campusFilter,
    items: ['SAN-BORJA', 'LIMA-CENTRO', 'MIRAFLORES']
  },
  {
    key: 'level',
    label: 'Nivel',
    icon: 'mdi-trending-up',
    value: levelFilter,
    items: ['Inicial', 'Primaria', 'Secundaria']
  },
  {
    key: 'grade',
    label: 'Grado',
    icon: 'mdi-certificate',
    value: gradeFilter,
    items: ['2do', '3ro', '4to', '5to', '6to']
  },
  {
    key: 'section',
    label: 'Sección',
    icon: 'mdi-group',
    value: sectionFilter,
    items: ['A', 'B', 'C']
  }
])

// Table configuration
const itemsPerPageOptions = ref([
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: -1, title: 'Todos' }
])

const headers = ref([
  { title: 'Período', key: 'period', sortable: true, width: '120px' },
  { title: 'Campus', key: 'campus', sortable: true, width: '160px' },
  { title: 'Asignatura', key: 'subject', sortable: true, width: '180px' },
  { title: 'Grupo de estudio', key: 'studyGroup', sortable: true, width: '180px' },
  { title: 'Alumnos', key: 'studentsCount', sortable: true, width: '100px', align: 'center' },
  { title: 'Tareas', key: 'tasksCount', sortable: true, width: '100px', align: 'center' },
  { title: 'Acciones', key: 'actions', sortable: false, width: '100px', align: 'center' }
])

// Datos de cursos reducidos a 5 elementos
const allCourses = ref([
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
])

// Computed properties
const hasActiveFilters = computed(() => {
  return periodFilter.value !== '' || 
         campusFilter.value !== '' || 
         levelFilter.value !== '' || 
         gradeFilter.value !== '' || 
         sectionFilter.value !== ''
})

// Filtros aplicados en tiempo real
const filteredCourses = computed(() => {
  let filtered = allCourses.value

  if (periodFilter.value) {
    filtered = filtered.filter(course => course.period === periodFilter.value)
  }
  if (campusFilter.value) {
    filtered = filtered.filter(course => course.campus === campusFilter.value)
  }
  if (levelFilter.value) {
    filtered = filtered.filter(course => course.level === levelFilter.value)
  }
  if (gradeFilter.value) {
    filtered = filtered.filter(course => course.grade === gradeFilter.value)
  }
  if (sectionFilter.value) {
    filtered = filtered.filter(course => course.section === sectionFilter.value)
  }

  return filtered
})

// Paginación para móvil
const paginatedCourses = computed(() => {
  if (!isMobile.value) return filteredCourses.value
  
  const start = (currentPage.value - 1) * mobileItemsPerPage.value
  const end = start + mobileItemsPerPage.value
  return filteredCourses.value.slice(start, end)
})

const totalPages = computed(() => {
  if (!isMobile.value) return 1
  return Math.ceil(filteredCourses.value.length / mobileItemsPerPage.value)
})

// Pagination methods
const goToFirstPage = () => {
  currentPage.value = 1
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Watch for mobile/desktop changes to reset pagination
watch(isMobile, (newValue) => {
  if (newValue) {
    currentPage.value = 1
  }
}, { immediate: false })

// Watch for changes in filtered courses to reset pagination
watch(() => filteredCourses.value.length, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
}, { immediate: true })

// Methods
const onFilterChange = () => {
  // Reset pagination when filters change
  currentPage.value = 1
  showMobileFilters.value = false // Hide filters on mobile after change
}

const searchCourses = () => {
  loading.value = true
  showMobileFilters.value = false
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    currentPage.value = 1
  }, 500)
}

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

const viewCourse = (course) => {
  console.log('Viewing course:', course)
  // Implement navigation logic here
}

const clearFilters = () => {
  periodFilter.value = ''
  campusFilter.value = ''
  levelFilter.value = ''
  gradeFilter.value = ''
  sectionFilter.value = ''
  currentPage.value = 1
}

onMounted(() => {
  console.log('Course management component mounted')
  console.log('Total cursos:', allCourses.value.length)
})
</script>