<template>
  <v-container fluid class="login-container pa-0" :style="{ backgroundImage: `url(${currentBackground})` }">
    <div class="overlay"></div>

    <!-- Login Popup -->
    <v-dialog 
      v-model="showDialog" 
      max-width="400" 
      persistent
      no-click-animation
    >
      <v-card class="login-popup" elevation="24" rounded="xl">
        <v-card-text class="pa-8 text-center">
          <!-- Logo Section -->
          <div class="mb-8">
            <div class="logo-container">
              <img 
                :src="logoImage" 
                alt="Logo" 
                class="logo-image"
              />
            </div>
            <h2 class="mt-4 text-h5 font-weight-medium">Bienvenido</h2>
            <p class="text-body-2 text-grey-darken-1 mt-2">Inicia sesión para continuar</p>
          </div>

          <!-- Google Login Button -->
          <v-btn
            block
            size="x-large"
            class="google-btn"
            elevation="3"
            prepend-icon="mdi-google"
            :loading="loading"
            @click="loginWithGoogle"
          >
            <span class="btn-text">Iniciar sesión con Google</span>
          </v-btn>

          <!-- Berry Watermark -->
          <div class="berry-watermark mt-6">
            berry
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter()
    
    // Reactive variables
    const showDialog = ref(true)
    const loading = ref(false)

    // Background images array
    const backgrounds = [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=2073&q=80'
    ]

    const currentBackground = ref('')
    const logoImage = ref('img/berry.png')

    // Select background and persist during session
    const selectRandomBackground = () => {
      const savedBackground = sessionStorage.getItem('loginBackground')
      if (savedBackground) {
        currentBackground.value = savedBackground
      } else {
        const randomIndex = Math.floor(Math.random() * backgrounds.length)
        const selectedBackground = backgrounds[randomIndex]
        sessionStorage.setItem('loginBackground', selectedBackground)
        currentBackground.value = selectedBackground
      }
    }

    const loginWithGoogle = async () => {
      loading.value = true
      try {
        // Simulate Google login
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Simulando login con Google...')
        showDialog.value = false

        // Redirección al layout principal
        setTimeout(() => {
          router.push('/app/calendario')
        }, 300)

      } catch (error) {
        console.error('Error en el login:', error)
      } finally {
        loading.value = false
      }
    }

    // Lifecycle hook
    onMounted(() => {
      selectRandomBackground()
    })

    return {
      showDialog,
      loading,
      currentBackground,
      logoImage,
      loginWithGoogle
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

.login-popup {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: white;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 3px solid #f8f9fa;
}

.logo-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.google-btn {
  background: #4285f4 !important;
  color: white !important;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  height: 56px !important;
  border-radius: 28px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.google-btn:hover {
  background: #3367d6 !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 133, 244, 0.4) !important;
}

.google-btn:active {
  transform: translateY(0);
}

.btn-text {
  margin-left: 12px;
  font-size: 16px;
}

.berry-watermark {
  color: rgba(102, 126, 234, 0.6);
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: lowercase;
}

/* Animaciones */
.login-popup {
  animation: popupFade 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes popupFade {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .login-popup {
    margin: 16px;
  }

  .logo-container {
    width: 80px;
    height: 80px;
  }

  .logo-image {
    width: 60px;
    height: 60px;
  }

  .google-btn {
    height: 48px !important;
    border-radius: 24px !important;
  }

  .btn-text {
    font-size: 14px;
  }
}
</style>