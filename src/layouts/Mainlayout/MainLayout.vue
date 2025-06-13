<template>
  <v-app>
    <!-- Modern Navbar - Solo en desktop y tablet -->
    <ModernNavbar v-if="!isMobile" />

    <!-- Curved Side Navigation - Solo desktop -->
    <div v-if="isDesktop" class="sidebar-container">
      <div class="sidebar-curved">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-circle">
            <v-img 
              src="/img/berry.png" 
              alt="Berry Logo" 
              :width="logoSize"
              :height="logoSize"
              class="logo-img"
            />
          </div>
        </div>

        <!-- User Section -->
        <div class="user-section-top">
          <div class="menu-item-wrapper">
            <v-btn
              :size="buttonSize"
              variant="flat"
              class="menu-item user-item"
              :ripple="false"
            >
              <v-icon :size="iconSize">mdi-account</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="menu-items">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="menu-item-wrapper"
          >
            <v-tooltip
              :model-value="hoveredItem === item"
              location="end"
              :offset="10"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  :size="buttonSize"
                  variant="flat"
                  class="menu-item"
                  :class="{ 'active': $route.name === item.name }"
                  @click="navigateTo(item.route)"
                  @mouseenter="setHoveredItem(item)"
                  @mouseleave="setHoveredItem(null)"
                  :ripple="false"
                >
                  <v-icon :size="iconSize">{{ item.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="logout-section">
          <div class="menu-item-wrapper logout-wrapper">
            <v-btn
              :size="buttonSize"
              variant="flat"
              class="menu-item logout-item"
              @click="logout"
              :ripple="false"
            >
              <v-icon :size="iconSize">mdi-logout</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      temporary
      width="280"
      class="mobile-sidebar"
      location="left"
    >
      <div class="mobile-sidebar-content">
        <!-- Logo Section Mobile -->
        <div class="mobile-logo-section">
          <div class="mobile-logo-circle">
            <v-img 
              src="/img/berry.png" 
              alt="Berry Logo" 
              width="32"
              height="32"
              class="mobile-logo-img"
            />
          </div>
          <span class="mobile-logo-text">Berry</span>
        </div>

        <!-- User Section Mobile -->
        <div class="mobile-user-section">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon size="24">mdi-account</v-icon>
            </template>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ userRole }}</v-list-item-subtitle>
          </v-list-item>
        </div>

        <!-- Menu Items Mobile -->
        <v-list class="mobile-menu-list">
          <v-list-item
            v-for="item in menuItems"
            :key="item.name"
            :value="item.name"
            :active="$route.name === item.name"
            @click="navigateTo(item.route)"
            class="mobile-menu-item"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="24"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Logout Button Mobile -->
        <div class="mobile-logout-section">
          <v-list-item @click="logout" class="mobile-logout-item">
            <template v-slot:prepend>
              <v-icon size="24" color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title class="text-error">Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Mobile App Bar -->
    <v-app-bar
      v-if="isMobile"
      :height="56"
      flat
      class="mobile-app-bar"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      
      <!-- Mobile Actions -->
      <template v-slot:append>
        <!-- Notifications -->
        <v-btn
          variant="text"
          icon
          size="small"
          class="mobile-action-btn"
        >
          <v-badge
            :content="notificationCount"
            :model-value="notificationCount > 0"
            color="error"
            overlap
          >
            <v-icon size="20">mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User Menu Mobile -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              icon
              size="small"
              class="mobile-action-btn"
            >
              <v-avatar size="28">
                <v-icon size="16">mdi-account</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list class="mobile-user-menu" min-width="180">
            <v-list-item density="compact">
              <v-list-item-title class="text-caption font-weight-bold">{{ userName }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{ userRole }}</v-list-item-subtitle>
            </v-list-item>
            
            <v-divider />
            
            <v-list-item @click="viewProfile" density="compact">
              <template v-slot:prepend>
                <v-icon size="18">mdi-account-circle</v-icon>
              </template>
              <v-list-item-title class="text-sm">Mi Perfil</v-list-item-title>
            </v-list-item>
            
            <v-list-item @click="openSettings" density="compact">
              <template v-slot:prepend>
                <v-icon size="18">mdi-cog</v-icon>
              </template>
              <v-list-item-title class="text-sm">Configuración</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="logout" class="logout-item" density="compact">
              <template v-slot:prepend>
                <v-icon color="error" size="18">mdi-logout</v-icon>
              </template>
              <v-list-item-title class="text-error text-sm">Cerrar Sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main 
      class="main-content" 
      :class="{ 
        'main-content-mobile': isMobile,
        'main-content-tablet': isTablet,
        'main-content-desktop': isDesktop,
        'main-content-with-navbar': !isMobile 
      }"
    >
      <!-- Router View -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import ModernNavbar from '../Navbar/ModernNavbar.vue'
import './Mainlayout.css'

export default {
  name: 'MainLayout',
  components: {
    ModernNavbar
  },
  setup() {
    const router = useRouter()
    const { mobile, mdAndDown, lgAndUp } = useDisplay()
    
    const hoveredItem = ref(null)
    const drawer = ref(false)
    const notificationCount = ref(3)

    const menuItems = ref([
      {
        title: 'Calendario',
        name: 'Calendario',
        icon: 'mdi-calendar-month',
        route: '/app/calendario'
      },
      {
        title: 'Asistencias',
        name: 'Asistencias',
        icon: 'mdi-account-check',
        route: '/app/asistencias'
      },
      {
        title: 'Incidencias',
        name: 'Incidencias',
        icon: 'mdi-alert-circle',
        route: '/app/incidencias'
      },
      {
        title: 'Firma',
        name: 'Firma',
        icon: 'mdi-draw-pen',
        route: '/app/firma'
      },
      {
        title: 'Cursos',
        name: 'Cursos',
        icon: 'mdi-school',
        route: '/app/cursos'
      },
      {
        title: 'Creación Masiva',
        name: 'CreacionMasiva',
        icon: 'mdi-account-multiple-plus',
        route: '/app/creacion-masiva'
      }
    ])

    // Computed properties for responsive design
    const isMobile = computed(() => mobile.value)
    const isTablet = computed(() => mdAndDown.value && !mobile.value)
    const isDesktop = computed(() => lgAndUp.value)

    const userName = computed(() => 'Juan Pérez')
    const userRole = computed(() => 'DOCENTE')

    const sidebarWidth = computed(() => {
      if (isMobile.value) return 280
      if (isTablet.value) return 0 // No sidebar en tablet
      return 80
    })

    const buttonSize = computed(() => {
      if (isMobile.value) return 'default'
      if (isTablet.value) return 'small'
      return 'default'
    })

    const iconSize = computed(() => {
      if (isMobile.value) return 24
      if (isTablet.value) return 20
      return 22
    })

    const logoSize = computed(() => {
      if (isMobile.value) return 32
      if (isTablet.value) return 24
      return 28
    })

    const setHoveredItem = (item) => {
      if (!isMobile.value) {
        hoveredItem.value = item
      }
    }

    const navigateTo = (routePath) => {
      router.push(routePath)
      if (isMobile.value) {
        drawer.value = false
      }
    }

    const logout = () => {
      router.push('/login')
      if (isMobile.value) {
        drawer.value = false
      }
    }

    const viewProfile = () => {
      router.push('/app/perfil')
    }

    const openSettings = () => {
      router.push('/app/configuracion')
    }

    onMounted(() => {
      // Initialize drawer state based on screen size
      drawer.value = false
    })

    return {
      drawer,
      hoveredItem,
      menuItems,
      isMobile,
      isTablet,
      isDesktop,
      userName,
      userRole,
      notificationCount,
      sidebarWidth,
      buttonSize,
      iconSize,
      logoSize,
      setHoveredItem,
      navigateTo,
      logout,
      viewProfile,
      openSettings
    }
  }
}
</script>