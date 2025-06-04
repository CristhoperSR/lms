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
              <v-icon :icon="item.icon" size="24"></v-icon>
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

        <!-- User Section -->
        <div class="user-section">
          <div class="menu-item-wrapper">
            <div class="menu-item">
              <v-icon icon="mdi-account" size="24"></v-icon>
            </div>
          </div>
          
          <div class="menu-item-wrapper" @click="logout">
            <div class="menu-item logout-item">
              <v-icon icon="mdi-logout" size="24"></v-icon>
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
  height: 100vh;
  background: #9E52D8;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.sidebar-curved::after {
  content: '';
  position: absolute;
  top: 0;
  right: -30px;
  width: 30px;
  height: 100%;
  background: #9E52D8;
  border-radius: 0 50px 50px 0;
}

.logo-section {
  margin-bottom: 30px;
}

.logo-circle {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  align-items: center;
}

.menu-item-wrapper {
  position: relative;
  cursor: pointer;
}

.menu-item {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.tooltip {
  position: absolute;
  left: 65px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1001;
  animation: fadeIn 0.2s ease;
}

.tooltip-arrow {
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid rgba(0, 0, 0, 0.8);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
  to { opacity: 1; transform: translateY(-50%) translateX(0); }
}

.user-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.logout-item {
  background: rgba(255, 0, 0, 0.2) !important;
}

.logout-item:hover {
  background: rgba(255, 0, 0, 0.3) !important;
}

.main-content {
  background: #f8f9fa;
  margin-left: 110px;
}

.page-header {
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.breadcrumb-section .v-breadcrumbs {
  font-size: 14px;
}

.content-wrapper {
  padding: 24px 32px;
  min-height: calc(100vh - 120px);
}

/* Responsive */
@media (max-width: 960px) {
  .sidebar-curved {
    width: 70px;
  }
  
  .main-content {
    margin-left: 100px;
  }
  
  .content-wrapper {
    padding: 16px 20px;
  }
  
  .page-header {
    padding: 16px 20px;
  }
  
  .menu-item {
    width: 45px;
    height: 45px;
  }
  
  .logo-circle {
    width: 45px;
    height: 45px;
  }
}
</style>