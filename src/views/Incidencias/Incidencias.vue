<template>
  <div class="page-content">
    <v-card class="content-card" elevation="2">
      <v-card-title class="page-header">
        <v-icon icon="mdi-alert-circle" class="mr-3" color="warning"></v-icon>
        Incidencias
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">Gestión de incidencias aquí...</p>
        <v-btn color="warning" variant="tonal">
          Reportar Incidencia
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'IncidenciasView'
}
</script>