<template>
  <div class="page-content">
    <v-card class="content-card" elevation="2">
      <v-card-title class="page-header">
        <v-icon icon="mdi-account-multiple-plus" class="mr-3" color="error"></v-icon>
        Creación Masiva
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">Herramientas de creación masiva aquí...</p>
        <v-btn color="error" variant="tonal">
          Crear Masivamente
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CreacionMasivaView'
}
</script>

<style scoped>
.page-content {
  max-width: 1200px;
  margin: 0 auto;
}

.content-card {
  border-radius: 16px;
  overflow: hidden;
}

.page-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-size: 24px;
  font-weight: 600;
  padding: 24px;
}

.content-card .v-card-text {
  padding: 32px;
}

.text-body-1 {
  margin-bottom: 24px;
  color: #666;
}
</style>