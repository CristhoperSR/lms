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
        <div class="logo-container">
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

<style scoped>
/* Main Navbar */
.modern-navbar {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
}

.navbar-container {
  display: flex;
  align-items: center;
  padding: 0 24px;
  max-width: none;
}

/* Brand Section */
.navbar-brand {
  flex-shrink: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  border-radius: 8px;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #9E52D8, #B366E8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Actions Section */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  width: 44px !important;
  height: 44px !important;
  border-radius: 12px !important;
  color: #64748b !important;
  transition: all 0.3s ease !important;
}

.action-btn:hover {
  background: rgba(100, 116, 139, 0.08) !important;
  color: #475569 !important;
}

.notification-btn:hover {
  background: rgba(239, 68, 68, 0.08) !important;
  color: #ef4444 !important;
}

/* User Profile Button */
.user-profile-btn {
  height: 48px !important;
  padding: 0 16px !important;
  border-radius: 12px !important;
  color: #64748b !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
}

.user-profile-btn:hover {
  background: rgba(100, 116, 139, 0.08) !important;
}

.user-avatar {
  background: linear-gradient(135deg, #9E52D8, #B366E8) !important;
  color: white;
  margin-right: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 8px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.2;
}

.user-role {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  line-height: 1.2;
}

.dropdown-icon {
  margin-left: 4px;
  transition: transform 0.3s ease;
}

/* User Menu */
.user-menu {
  border-radius: 12px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.user-menu :deep(.v-list-item) {
  padding: 12px 20px;
  transition: all 0.2s ease;
}

.user-menu :deep(.v-list-item:hover) {
  background: rgba(100, 116, 139, 0.05);
}

.logout-item:hover {
  background: rgba(239, 68, 68, 0.05) !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .navbar-container {
    padding: 0 16px;
  }
  
  .brand-text {
    font-size: 20px;
  }
}

@media (max-width: 600px) {
  .navbar-container {
    padding: 0 12px;
  }
  
  .brand-text {
    display: none;
  }
  
  .user-info {
    display: none;
  }
}

/* Override Vuetify styles */
:deep(.v-btn--size-default) {
  min-width: unset;
}

:deep(.v-list-item__prepend) {
  color: inherit;
}

:deep(.v-badge__badge) {
  font-size: 10px;
  min-width: 18px;
  height: 18px;
}
</style>