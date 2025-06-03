<template>
  <div class="asistence-container">
    <div class="welcome-content">
      <h1 class="welcome-title">¡Hola! Bienvenido a la asistencia</h1>
      <p class="welcome-message">Has iniciado sesión correctamente</p>
      
      <v-card class="mt-6 pa-6" elevation="2" rounded="lg">
        <v-card-title class="text-center">
          <v-icon size="48" color="success" class="mb-2">mdi-check-circle</v-icon>
          <br>
          Sesión Iniciada
        </v-card-title>
        <v-card-text class="text-center">
          <p class="text-body-1">Tu sesión se ha iniciado exitosamente con Google</p>
          <v-chip color="success" variant="outlined" class="mt-2">
            <v-icon start>mdi-account</v-icon>
            Usuario autenticado
          </v-chip>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsistenceView',
  mounted() {
    console.log('Componente AsistenceView cargado correctamente')
  }
}
</script>

<style scoped>
.asistence-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.welcome-content {
  text-align: center;
  color: white;
  max-width: 600px;
  width: 100%;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.welcome-message {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-message {
    font-size: 1rem;
  }
}</style>