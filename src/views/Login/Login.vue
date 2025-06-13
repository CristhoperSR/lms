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
import './Login.css'
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

