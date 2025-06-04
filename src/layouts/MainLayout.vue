<template>
  <v-app>
    <!-- Side Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      width="280"
      class="sidemenu-drawer"
    >
      <!-- Header con logo -->
      <div class="drawer-header">
        <div class="logo-section">
          <img src="/img/berry.png" alt="Berry Logo" class="header-logo">
          <span class="app-name">Berry</span>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="menu-section">
        <v-list nav class="menu-list">
          <v-list-item
            v-for="item in menuItems"
            :key="item.name"
            :to="item.route"
            :class="{ 'active-item': $route.name === item.name }"
            class="menu-item"
            @mouseenter="setHoveredItem(item)"
            @mouseleave="setHoveredItem(null)"
          >
            <template v-slot:prepend>
              <div class="icon-container">
                <v-icon :icon="item.icon" size="20"></v-icon>
              </div>
            </template>

            <v-list-item-title class="item-title">
              {{ item.title }}
            </v-list-item-title>

            <!-- Tooltip on hover -->
            <v-tooltip
              v-if="hoveredItem === item"
              activator="parent"
              location="end"
              :text="item.title"
            ></v-tooltip>
          </v-list-item>
        </v-list>
      </div>

      <!-- User Section -->
      <template v-slot:append>
        <div class="user-section">
          <v-divider class="mb-4"></v-divider>
          <v-list-item class="user-item">
            <template v-slot:prepend>
              <v-avatar color="primary" size="32">
                <v-icon icon="mdi-account"></v-icon>
              </v-avatar>
            </template>
            <v-list-item-title class="user-name">Usuario</v-list-item-title>
            <v-list-item-subtitle class="user-role">Administrador</v-list-item-subtitle>
          </v-list-item>
          
          <v-btn
            icon="mdi-logout"
            variant="text"
            color="error"
            size="small"
            class="logout-btn"
            @click="logout"
          ></v-btn>
        </div>
      </template>
    </v-navigation-drawer>

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
    const drawer = ref(true)
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

    const logout = () => {
      router.push('/login')
    }

    return {
      drawer,
      hoveredItem,
      menuItems,
      currentPageTitle,
      breadcrumbs,
      setHoveredItem,
      logout
    }
  }
}
</script>

<style scoped>
.sidemenu-drawer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-right: none !important;
}

.drawer-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.app-name {
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
}

.menu-section {
  padding: 16px 0;
}

.menu-list {
  background: transparent;
}

.menu-item {
  margin: 4px 12px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.menu-item:hover::before {
  opacity: 1;
}

.menu-item.active-item {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-item.active-item::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: white;
  border-radius: 0 4px 4px 0;
}

.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  margin-right: 12px;
}

.menu-item.active-item .icon-container {
  background: rgba(255, 255, 255, 0.2);
}

.item-title {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 14px;
}

.menu-item.active-item .item-title {
  color: white;
  font-weight: 600;
}

.user-section {
  padding: 16px;
  background: rgba(0, 0, 0, 0.1);
}

.user-item {
  color: white;
  margin-bottom: 8px;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  opacity: 0.8;
}

.logout-btn {
  width: 100%;
  margin-top: 8px;
}

.main-content {
  background: #f8f9fa;
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
  .sidemenu-drawer {
    width: 260px !important;
  }
  
  .content-wrapper {
    padding: 16px 20px;
  }
  
  .page-header {
    padding: 16px 20px;
  }
}
</style>