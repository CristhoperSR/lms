<template>
  <div class="page-content">
    <v-card class="content-card" elevation="2">
      <v-card-title class="page-header">
        <v-icon icon="mdi-calendar-month" class="mr-3" color="primary"></v-icon>
        Calendario
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">Contenido del calendario aquí...</p>
        <v-btn color="primary" variant="tonal">
          Agregar Evento
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CalendarioView'
}
</script>