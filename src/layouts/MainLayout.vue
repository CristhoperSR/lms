<template>
  <v-app>
    <!-- Curved Side Navigation -->
    <div class="sidebar-container">
      <div class="sidebar-curved">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-circle">
            <img src="/img/berry.png" alt="Berry Logo" class="logo-img">
          </div>
        </div>

        <!-- User Section - Moved right after logo -->
        <div class="user-section-top">
          <div class="menu-item-wrapper">
            <div class="menu-item user-item">
              <v-icon icon="mdi-account" size="22"></v-icon>
            </div>
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
            @click="navigateTo(item.route)"
          >
            <div 
              class="menu-item"
              :class="{ 'active': $route.name === item.name }"
            >
              <v-icon :icon="item.icon" size="22"></v-icon>
            </div>
            
            <!-- Tooltip -->
            <div 
              v-if="hoveredItem === item"
              class="tooltip"
            >
              {{ item.title }}
              <div class="tooltip-arrow"></div>
            </div>
          </div>
        </div>

        <!-- Logout Button - Ahora dentro del sidebar principal -->
        <div class="logout-section">
          <div class="menu-item-wrapper logout-wrapper" @click="logout">
            <div class="menu-item logout-item">
              <v-icon icon="mdi-logout" size="22"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <v-main class="main-content">
      <!-- Page Header -->
      <div class="page-header">
        <div class="breadcrumb-section">
          <h1 class="page-title">{{ currentPageTitle }}</h1>
          <v-breadcrumbs
            :items="breadcrumbs"
            class="pa-0"
            density="compact"
          >
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right" size="14"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </div>

      <!-- Router View -->
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'MainLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const hoveredItem = ref(null)

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
      hoveredItem.value = item
    }

    const navigateTo = (route) => {
      router.push(route)
    }

    const logout = () => {
      router.push('/login')
    }

    return {
      hoveredItem,
      menuItems,
      currentPageTitle,
      breadcrumbs,
      setHoveredItem,
      navigateTo,
      logout
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
}

.sidebar-curved {
  width: 80px;
  height: 80vh; /* Aumentado para incluir el botón de logout */
  max-height: 700px; /* Aumentado */
  min-height: 550px; /* Aumentado */
  background: linear-gradient(135deg, #9E52D8 0%, #B366E8 50%, #9E52D8 100%);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 0;
  border-radius: 0 45px 45px 0;
  box-shadow: 0 15px 40px rgba(158, 82, 216, 0.4);
  backdrop-filter: blur(20px);
}

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
  width: 28px;
  height: 28px;
  border-radius: 14px;
}

/* User section positioned right after logo */
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

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1; /* Toma el espacio disponible entre user y logout */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 5px;
}

/* Nueva sección de logout dentro del sidebar */
.logout-section {
  margin-top: auto; /* Empuja el botón hacia abajo */
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-item-wrapper {
  position: relative;
  cursor: pointer;
}

.menu-item {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-5px) scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.35);
  transform: translateX(-8px) scale(1.1);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.user-item {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-item:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateX(-3px) scale(1.02);
}

.logout-wrapper {
  margin: 0;
}

.logout-item {
  background: linear-gradient(135deg, #FF4757, #FF3742) !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
}

.logout-item:hover {
  background: linear-gradient(135deg, #FF3742, #FF2D3A) !important;
  transform: translateX(-5px) scale(1.05) !important;
  box-shadow: 0 8px 25px rgba(255, 71, 87, 0.5) !important;
}

.tooltip {
  position: absolute;
  left: 55px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1001;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tooltip-arrow {
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid rgba(0, 0, 0, 0.85);
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(-50%) translateX(-10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(-50%) translateX(0); 
  }
}

.main-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  margin-left: 100px;
  transition: margin-left 0.3s ease;
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

.breadcrumb-section .v-breadcrumbs {
  font-size: 14px;
}

.content-wrapper {
  padding: 28px 36px;
  min-height: calc(100vh - 140px);
}

/* Mobile Responsive Design */
@media (max-width: 1024px) {
  .sidebar-curved {
    width: 75px;
    height: 75vh;
    max-height: 650px;
    min-height: 500px;
    border-radius: 0 40px 40px 0;
    padding: 18px 0 18px 0;
  }
  
  .main-content {
    margin-left: 90px;
  }
  
  .logo-circle {
    width: 47px;
    height: 47px;
    border-radius: 15px;
  }
  
  .logo-img {
    width: 26px;
    height: 26px;
    border-radius: 13px;
  }
  
  .menu-item {
    width: 47px;
    height: 47px;
    border-radius: 15px;
  }
  
  .menu-items {
    gap: 14px;
  }
}

@media (max-width: 768px) {
  .sidebar-curved {
    width: 70px;
    height: 70vh;
    max-height: 600px;
    min-height: 450px;
    border-radius: 0 35px 35px 0;
    padding: 15px 0 15px 0;
  }
  
  .main-content {
    margin-left: 85px;
  }
  
  .content-wrapper {
    padding: 20px 16px;
  }
  
  .page-header {
    padding: 20px 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .menu-item {
    width: 44px;
    height: 44px;
    border-radius: 14px;
  }
  
  .logo-circle {
    width: 44px;
    height: 44px;
    border-radius: 14px;
  }
  
  .logo-img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
  
  .menu-items {
    gap: 12px;
  }
  
  .user-section-top {
    margin-bottom: 18px;
    padding-bottom: 15px;
  }
  
  .tooltip {
    left: 50px;
  }
}

@media (max-width: 480px) {
  .sidebar-curved {
    width: 65px;
    height: 65vh;
    max-height: 550px;
    min-height: 400px;
    border-radius: 0 30px 30px 0;
    padding: 12px 0 12px 0;
  }
  
  .main-content {
    margin-left: 80px;
  }
  
  .content-wrapper {
    padding: 16px 12px;
  }
  
  .page-header {
    padding: 16px 12px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .menu-item {
    width: 40px;
    height: 40px;
    border-radius: 13px;
  }
  
  .logo-circle {
    width: 40px;
    height: 40px;
    border-radius: 13px;
  }
  
  .logo-img {
    width: 22px;
    height: 22px;
    border-radius: 11px;
  }
  
  .menu-items {
    gap: 10px;
  }
  
  .user-section-top {
    margin-bottom: 15px;
    padding-bottom: 12px;
  }
  
  .tooltip {
    left: 45px;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 8px;
  }
}

/* Extra small devices */
@media (max-width: 360px) {
  .sidebar-curved {
    width: 60px;
    border-radius: 0 25px 25px 0;
    height: 60vh;
    max-height: 500px;
    min-height: 350px;
    padding: 10px 0 10px 0;
  }
  
  .main-content {
    margin-left: 75px;
  }
  
  .menu-item {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }
  
  .logo-circle {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }
  
  .logo-img {
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }
  
  .menu-items {
    gap: 8px;
  }
}

/* Large screens */
@media (min-width: 1200px) {
  .sidebar-curved {
    width: 85px;
    height: 80vh;
    max-height: 750px;
    min-height: 580px;
    border-radius: 0 50px 50px 0;
    padding: 22px 0 22px 0;
  }
  
  .main-content {
    margin-left: 105px;
  }
  
  .logo-circle {
    width: 53px;
    height: 53px;
    border-radius: 17px;
  }
  
  .logo-img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  
  .menu-item {
    width: 53px;
    height: 53px;
    border-radius: 17px;
  }
  
  .menu-items {
    gap: 18px;
  }
  
  .tooltip {
    left: 58px;
  }
}
</style>