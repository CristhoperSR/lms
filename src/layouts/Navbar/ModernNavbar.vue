<template>
  <v-app-bar
    :height="navbarHeight"
    flat
    class="modern-navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <v-container fluid class="navbar-container">
      <!-- Logo Section -->
      <div class="navbar-brand">
        <div class="logo">
          <v-img 
            src="/img/berry.png" 
            alt="Berry Logo" 
            :width="32"
            :height="32"
            class="brand-logo"
          />
          <span class="brand-text">Berry</span>
        </div>
      </div>

      <!-- Spacer to push actions to the right -->
      <v-spacer />

      <!-- Right Section -->
      <div class="navbar-actions">
        <!-- Notifications -->
        <v-btn
          variant="text"
          icon
          class="action-btn notification-btn"
          @click="toggleNotifications"
        >
          <v-badge
            :content="notificationCount"
            :model-value="notificationCount > 0"
            color="error"
            overlap
          >
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User Profile -->
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text" 
              class="user-profile-btn"
              :ripple="false"
            >
              <v-avatar size="36" class="user-avatar">
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              <div v-if="!isMobile" class="user-info">
                <span class="user-name">{{ userName }}</span>
                <span class="user-role">{{ userRole }}</span>
              </div>
              <v-icon v-if="!isMobile" size="16" class="dropdown-icon">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list class="user-menu" min-width="200">
            <v-list-item @click="viewProfile">
              <template v-slot:prepend>
                <v-icon>mdi-account-circle</v-icon>
              </template>
              <v-list-item-title>Mi Perfil</v-list-item-title>
            </v-list-item>
            
            <v-list-item @click="openSettings">
              <template v-slot:prepend>
                <v-icon>mdi-cog</v-icon>
              </template>
              <v-list-item-title>Configuración</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item @click="logout" class="logout-item">
              <template v-slot:prepend>
                <v-icon color="error">mdi-logout</v-icon>
              </template>
              <v-list-item-title class="text-error">Cerrar Sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import './ModernNavbar.css'

export default {
  name: 'ModernNavbar',
  setup() {
    const router = useRouter()
    const { mobile } = useDisplay()
    
    const isScrolled = ref(false)
    const notificationCount = ref(3)

    // Computed properties
    const isMobile = computed(() => mobile.value)
    const navbarHeight = computed(() => isMobile.value ? 64 : 72)
    const userName = computed(() => 'Juan Pérez')
    const userRole = computed(() => 'DOCENTE')

    // Methods
    const logout = () => {
      router.push('/login')
    }

    const viewProfile = () => {
      router.push('/app/perfil')
    }

    const openSettings = () => {
      router.push('/app/configuracion')
    }

    const toggleNotifications = () => {
      // Implementar lógica de notificaciones
      console.log('Toggle notifications')
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      notificationCount,
      isMobile,
      navbarHeight,
      userName,
      userRole,
      logout,
      viewProfile,
      openSettings,
      toggleNotifications
    }
  }
}
</script>

