<template>
  <div class="page-content">
    <v-card class="content-card" elevation="2">
      <v-card-title class="page-header">
        <v-icon icon="mdi-account-check" class="mr-3" color="success"></v-icon>
        Asistencias
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">Gestión de asistencias aquí...</p>
        <v-btn color="success" variant="tonal">
          Marcar Asistencia
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AsistenciasView'
}
</script>