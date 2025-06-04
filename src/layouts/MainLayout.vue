<template>
  <v-app>
    <!-- Curved Side Navigation -->
    <div v-if="!isMobile" class="sidebar-container">
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
            @mouseenter="setHoveredItem(item)"
            @mouseleave="setHoveredItem(null)"
          >
            <v-btn
              :size="buttonSize"
              variant="flat"
              class="menu-item"
              :class="{ 'active': $route.name === item.name }"
              @click="navigateTo(item.route)"
              :ripple="false"
            >
              <v-icon :size="iconSize">{{ item.icon }}</v-icon>
            </v-btn>
            
            <!-- Tooltip -->
            <v-tooltip
              v-if="!isMobile"
              :model-value="hoveredItem === item"
              location="end"
              :offset="10"
            >
              <template v-slot:activator="{ props }">
                <div v-bind="props"></div>
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
            <v-list-item-title>Usuario</v-list-item-title>
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

    <!-- Mobile Menu Toggle -->
    <v-app-bar
      v-if="isMobile"
      :height="56"
      flat
      class="mobile-app-bar"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="mobile-title">
        {{ currentPageTitle }}
      </v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="main-content" :class="{ 'main-content-mobile': isMobile }">
      <!-- Page Header - Hidden on mobile -->
      <div v-if="!isMobile" class="page-header">
        <div class="breadcrumb-section">
          <h1 class="page-title">{{ currentPageTitle }}</h1>
          <v-breadcrumbs
            :items="breadcrumbs"
            class="pa-0"
            density="compact"
          >
            <template v-slot:divider>
              <v-icon size="14">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>

      <!-- Router View -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

export default {
  name: 'MainLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { mobile, smAndDown, mdAndDown } = useDisplay()
    
    const hoveredItem = ref(null)
    const drawer = ref(true)
    const windowWidth = ref(window.innerWidth)

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

    const sidebarWidth = computed(() => {
      if (mobile.value) return 280
      if (smAndDown.value) return 70
      if (mdAndDown.value) return 75
      return 80
    })

    const buttonSize = computed(() => {
      if (mobile.value) return 'default'
      if (smAndDown.value) return 'small'
      return 'default'
    })

    const iconSize = computed(() => {
      if (mobile.value) return 24
      if (smAndDown.value) return 20
      return 22
    })

    const logoSize = computed(() => {
      if (mobile.value) return 32
      if (smAndDown.value) return 24
      return 28
    })

    const currentPageTitle = computed(() => {
      const currentItem = menuItems.value.find(item => item.name === route.name)
      return currentItem ? currentItem.title : 'Dashboard'
    })

    const breadcrumbs = computed(() => [
      {
        title: 'Inicio',
        disabled: false,
        href: '/app'
      },
      {
        title: currentPageTitle.value,
        disabled: true,
        href: route.path
      }
    ])

    const setHoveredItem = (item) => {
      if (!mobile.value) {
        hoveredItem.value = item
      }
    }

    const navigateTo = (routePath) => {
      router.push(routePath)
      if (mobile.value) {
        drawer.value = false
      }
    }

    const logout = () => {
      router.push('/login')
      if (mobile.value) {
        drawer.value = false
      }
    }

    const handleResize = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
      // Initialize drawer state based on screen size
      drawer.value = !mobile.value
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      drawer,
      hoveredItem,
      menuItems,
      currentPageTitle,
      breadcrumbs,
      isMobile,
      isTablet,
      sidebarWidth,
      buttonSize,
      iconSize,
      logoSize,
      setHoveredItem,
      navigateTo,
      logout
    }
  }
}
</script>

<style scoped>
/* Sidebar Container - Desktop */
.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

.sidebar-curved {
  width: 80px;
  height: 80vh;
  max-height: 700px;
  min-height: 550px;
  background: linear-gradient(135deg, #9E52D8 0%, #B366E8 50%, #9E52D8 100%);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-radius: 0 45px 45px 0;
  box-shadow: 0 15px 40px rgba(158, 82, 216, 0.4);
  backdrop-filter: blur(20px);
}

/* Logo Section */
.logo-section {
  margin-bottom: 20px;
  flex-shrink: 0;
}

.logo-circle {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.logo-img {
  border-radius: 14px;
}

/* User Section */
.user-section-top {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Menu Items */
.menu-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 5px;
}

/* Logout Section */
.logout-section {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Menu Item Wrapper */
.menu-item-wrapper {
  position: relative;
  cursor: pointer;
}

/* Menu Item Buttons */
.menu-item {
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: none !important;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  transform: translateX(-5px) scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3) !important;
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.35) !important;
  transform: translateX(-8px) scale(1.1);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.4) !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
}

.user-item {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateX(-3px) scale(1.02);
}

.logout-item {
  background: linear-gradient(135deg, #FF4757, #FF3742) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3) !important;
}

.logout-item:hover {
  background: linear-gradient(135deg, #FF3742, #FF2D3A) !important;
  transform: translateX(-5px) scale(1.05) !important;
  box-shadow: 0 8px 25px rgba(255, 71, 87, 0.5) !important;
}

/* Mobile Sidebar */
.mobile-sidebar {
  background: linear-gradient(135deg, #9E52D8 0%, #B366E8 50%, #9E52D8 100%) !important;
}

.mobile-sidebar-content {
  padding: 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-logo-section {
  display: flex;
  align-items: center;
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.mobile-logo-circle {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.mobile-logo-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.mobile-user-section {
  margin-bottom: 20px;
  padding: 0 10px;
}

.mobile-user-section :deep(.v-list-item) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 10px;
  color: white;
}

.mobile-menu-list {
  flex: 1;
  background: transparent !important;
  padding: 0 10px;
}

.mobile-menu-item {
  margin-bottom: 8px;
  border-radius: 12px !important;
  color: white !important;
}

.mobile-menu-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.mobile-menu-item.v-list-item--active {
  background: rgba(255, 255, 255, 0.2) !important;
}

.mobile-logout-section {
  margin-top: auto;
  padding: 20px 10px 0 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.mobile-logout-item {
  border-radius: 12px !important;
  background: rgba(255, 71, 87, 0.2) !important;
}

/* Main Content */
.main-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  margin-left: 100px;
  transition: margin-left 0.3s ease;
}

.main-content-mobile {
  margin-left: 0 !important;
}

.page-header {
  background: white;
  padding: 28px 36px;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 20px 20px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.breadcrumb-section :deep(.v-breadcrumbs) {
  font-size: 14px;
}

.content-wrapper {
  padding: 28px 36px;
  min-height: calc(100vh - 140px);
}

/* Mobile App Bar */
.mobile-app-bar {
  background: linear-gradient(135deg, #9E52D8 0%, #B366E8 50%, #9E52D8 100%) !important;
  color: white !important;
}

.mobile-title {
  color: white !important;
  font-weight: 600;
}

.content-wrapper {
  padding: 28px 36px;
  min-height: calc(100vh - 140px);
}

/* Responsive Design */

/* Mobile */
@media (max-width: 599px) {
  .content-wrapper {
    padding: 20px 16px;
    min-height: calc(100vh - 120px);
  }
  
  .page-header {
    padding: 20px 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
}

/* Tablet */
@media (min-width: 600px) and (max-width: 1024px) {
  .sidebar-curved {
    width: 75px;
    height: 75vh;
    max-height: 650px;
    min-height: 500px;
    border-radius: 0 40px 40px 0;
    padding: 18px 0;
  }
  
  .main-content {
    margin-left: 90px;
  }
  
  .logo-circle {
    width: 47px;
    height: 47px;
    border-radius: 15px;
  }
  
  .menu-item {
    width: 47px !important;
    height: 47px !important;
    min-width: 47px !important;
    border-radius: 15px !important;
  }
  
  .menu-items {
    gap: 14px;
  }
}

/* Small Desktop */
@media (min-width: 1025px) and (max-width: 1199px) {
  .sidebar-curved {
    width: 80px;
  }
  
  .main-content {
    margin-left: 100px;
  }
}

/* Large Desktop */
@media (min-width: 1200px) {
  .sidebar-curved {
    width: 85px;
    height: 80vh;
    max-height: 750px;
    min-height: 580px;
    border-radius: 0 50px 50px 0;
    padding: 22px 0;
  }
  
  .main-content {
    margin-left: 105px;
  }
  
  .logo-circle {
    width: 53px;
    height: 53px;
    border-radius: 17px;
  }
  
  .menu-item {
    width: 53px !important;
    height: 53px !important;
    min-width: 53px !important;
    border-radius: 17px !important;
  }
  
  .menu-items {
    gap: 18px;
  }
}

/* Override Vuetify styles */
:deep(.v-btn--size-default) {
  min-width: unset;
}

:deep(.v-btn--size-small) {
  min-width: unset;
}

:deep(.v-list-item__prepend) {
  color: inherit;
}

:deep(.v-overlay__scrim) {
  background: rgba(0, 0, 0, 0.6) !important;
}
</style>