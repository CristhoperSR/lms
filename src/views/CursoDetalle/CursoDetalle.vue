<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid class="pa-1 pa-sm-2 pa-md-4 curso-detalle-container">
    <v-card class="curso-detalle-card" elevation="3" rounded="xl">
      <!-- Header con información del curso -->
      <v-card-title class="curso-detalle-header pa-3 pa-sm-4 pa-md-6">
        <div class="d-flex align-center flex-column flex-md-row text-center text-md-start">
          <v-avatar 
            :color="getSubjectColor(curso?.subject || '')" 
            :size="$vuetify.display.xs ? 32 : $vuetify.display.sm ? 40 : 48" 
            class="me-0 me-md-4 mb-3 mb-md-0"
          >
            <v-icon 
              :icon="getSubjectIcon(curso?.subject || '')" 
              :size="$vuetify.display.xs ? 16 : $vuetify.display.sm ? 20 : 28" 
              color="white"
            ></v-icon>
          </v-avatar>
          <div class="flex-grow-1">
            <h2 :class="[
              'font-weight-bold', 
              'text-white', 
              'mb-1', 
              $vuetify.display.xs ? 'text-subtitle-1' : 
              $vuetify.display.sm ? 'text-h6' : 
              $vuetify.display.md ? 'text-h5' : 'text-h4'
            ]">
              {{ curso?.period }} - {{ curso?.campus }} - {{ curso?.level }} {{ curso?.grade }}° {{ curso?.section }}
            </h2>
            <p :class="[
              'text-white opacity-90 mb-0',
              $vuetify.display.xs ? 'text-caption' : 'text-subtitle-1'
            ]">
              Tiene {{ curso?.studentsCount || 0 }} alumnos
            </p>
          </div>
          <!-- Botón para regresar -->
          <v-btn
            @click="goBack"
            color="white"
            variant="outlined"
            :size="$vuetify.display.xs ? 'x-small' : $vuetify.display.sm ? 'small' : 'default'"
            class="mt-3 mt-md-0"
            rounded="lg"
          >
            <v-icon icon="mdi-arrow-left" :size="$vuetify.display.xs ? 12 : 16" class="me-1 me-sm-2"></v-icon>
            <span :class="$vuetify.display.xs ? 'text-caption' : ''">Volver</span>
          </v-btn>
        </div>
      </v-card-title>

      <!-- Nueva sección superior - Flujo de competencias -->
      <v-card-text class="pa-2 pa-sm-3 pa-md-4 pt-0">
        <v-card elevation="1" rounded="lg" class="mb-3 mb-md-4" color="grey-lighten-5">
          <v-card-text class="pa-2 pa-sm-3 pa-md-4">
            <div class="text-center mb-3">
              <h3 :class="[
                'font-weight-bold text-primary mb-2',
                $vuetify.display.xs ? 'text-subtitle-2' : 'text-h6'
              ]">
                ESCRIBE DIVERSOS TIPOS DE TEXTO EN SU LENGUA MATERNA
              </h3>
              <p :class="[
                'text-medium-emphasis mb-0',
                $vuetify.display.xs ? 'text-caption' : 'text-body-2'
              ]">
                Flujo de desarrollo de competencias
              </p>
            </div>
            
            <!-- Flujo de competencias responsive -->
            <div class="competencia-flow">
              <div class="d-none d-sm-flex align-center justify-center flex-wrap gap-2">
                <!-- General -->
                <div class="competencia-item">
                  <v-tooltip text="General" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('general')"
                        color="deep-purple"
                        :variant="selectedFlowItem === 'general' ? 'flat' : 'tonal'"
                        :size="$vuetify.display.xs ? 'small' : $vuetify.display.sm ? 'default' : 'large'"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                        :height="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                      >
                        <span :class="[
                          'font-weight-bold text-white',
                          $vuetify.display.xs ? 'text-body-2' : $vuetify.display.sm ? 'text-body-1' : 'text-h6'
                        ]">G</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div :class="[
                    'text-center mt-1',
                    $vuetify.display.xs ? 'text-caption' : $vuetify.display.sm ? 'text-body-2' : 'text-body-1'
                  ]">
                    <div class="font-weight-bold">General</div>
                  </div>
                </div>

                <!-- Separador -->
                <v-icon 
                  icon="mdi-arrow-right" 
                  :color="$vuetify.display.xs ? 'grey' : 'primary'" 
                  :size="$vuetify.display.xs ? 16 : $vuetify.display.sm ? 20 : 24"
                  class="mx-1 mx-sm-2"
                ></v-icon>

                <!-- Bimestre 1 -->
                <div class="competencia-item">
                  <v-tooltip text="Bimestre 1" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre1')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre1' ? 'flat' : 'tonal'"
                        :size="$vuetify.display.xs ? 'small' : $vuetify.display.sm ? 'default' : 'large'"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                        :height="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                      >
                        <span :class="[
                          'font-weight-bold text-white',
                          $vuetify.display.xs ? 'text-body-2' : $vuetify.display.sm ? 'text-body-1' : 'text-h6'
                        ]">1</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div :class="[
                    'text-center mt-1',
                    $vuetify.display.xs ? 'text-caption' : $vuetify.display.sm ? 'text-body-2' : 'text-body-1'
                  ]">
                    <div class="font-weight-bold">Bimestre 1</div>
                  </div>
                </div>

                <!-- Separador -->
                <v-icon 
                  icon="mdi-arrow-right" 
                  :color="$vuetify.display.xs ? 'grey' : 'primary'" 
                  :size="$vuetify.display.xs ? 16 : $vuetify.display.sm ? 20 : 24"
                  class="mx-1 mx-sm-2"
                ></v-icon>

                <!-- Bimestre 2 -->
                <div class="competencia-item">
                  <v-tooltip text="Bimestre 2" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre2')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre2' ? 'flat' : 'tonal'"
                        :size="$vuetify.display.xs ? 'small' : $vuetify.display.sm ? 'default' : 'large'"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                        :height="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                      >
                        <span :class="[
                          'font-weight-bold text-white',
                          $vuetify.display.xs ? 'text-body-2' : $vuetify.display.sm ? 'text-body-1' : 'text-h6'
                        ]">2</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div :class="[
                    'text-center mt-1',
                    $vuetify.display.xs ? 'text-caption' : $vuetify.display.sm ? 'text-body-2' : 'text-body-1'
                  ]">
                    <div class="font-weight-bold">Bimestre 2</div>
                  </div>
                </div>

                <!-- Separador -->
                <v-icon 
                  icon="mdi-arrow-right" 
                  :color="$vuetify.display.xs ? 'grey' : 'primary'" 
                  :size="$vuetify.display.xs ? 16 : $vuetify.display.sm ? 20 : 24"
                  class="mx-1 mx-sm-2"
                ></v-icon>

                <!-- Bimestre 3 -->
                <div class="competencia-item">
                  <v-tooltip text="Bimestre 3" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre3')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre3' ? 'flat' : 'tonal'"
                        :size="$vuetify.display.xs ? 'small' : $vuetify.display.sm ? 'default' : 'large'"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                        :height="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                      >
                        <span :class="[
                          'font-weight-bold text-white',
                          $vuetify.display.xs ? 'text-body-2' : $vuetify.display.sm ? 'text-body-1' : 'text-h6'
                        ]">3</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div :class="[
                    'text-center mt-1',
                    $vuetify.display.xs ? 'text-caption' : $vuetify.display.sm ? 'text-body-2' : 'text-body-1'
                  ]">
                    <div class="font-weight-bold">Bimestre 3</div>
                  </div>
                </div>

                <!-- Separador -->
                <v-icon 
                  icon="mdi-arrow-right" 
                  :color="$vuetify.display.xs ? 'grey' : 'primary'" 
                  :size="$vuetify.display.xs ? 16 : $vuetify.display.sm ? 20 : 24"
                  class="mx-1 mx-sm-2"
                ></v-icon>

                <!-- Bimestre 4 -->
                <div class="competencia-item">
                  <v-tooltip text="Bimestre 4" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre4')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre4' ? 'flat' : 'tonal'"
                        :size="$vuetify.display.xs ? 'small' : $vuetify.display.sm ? 'default' : 'large'"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                        :height="$vuetify.display.xs ? 40 : $vuetify.display.sm ? 48 : 56"
                      >
                        <span :class="[
                          'font-weight-bold text-white',
                          $vuetify.display.xs ? 'text-body-2' : $vuetify.display.sm ? 'text-body-1' : 'text-h6'
                        ]">4</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div :class="[
                    'text-center mt-1',
                    $vuetify.display.xs ? 'text-caption' : $vuetify.display.sm ? 'text-body-2' : 'text-body-1'
                  ]">
                    <div class="font-weight-bold">Bimestre 4</div>
                  </div>
                </div>
              </div>

              <!-- Versión horizontal para móviles -->
              <div class="d-flex d-sm-none align-center justify-start gap-1 pb-2" style="overflow-x: auto;">
                <!-- General -->
                <div class="competencia-item flex-shrink-0">
                  <v-tooltip text="General" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('general')"
                        color="deep-purple"
                        :variant="selectedFlowItem === 'general' ? 'flat' : 'tonal'"
                        size="small"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="36"
                        :height="36"
                      >
                        <span class="font-weight-bold text-white text-caption">G</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div class="text-center mt-1 text-caption">
                    <div class="font-weight-bold">General</div>
                  </div>
                </div>

                <v-icon icon="mdi-arrow-right" color="grey" size="14" class="mx-1 flex-shrink-0"></v-icon>

                <!-- Bimestre 1 -->
                <div class="competencia-item flex-shrink-0">
                  <v-tooltip text="Bimestre 1" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre1')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre1' ? 'flat' : 'tonal'"
                        size="small"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="36"
                        :height="36"
                      >
                        <span class="font-weight-bold text-white text-caption">1</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div class="text-center mt-1 text-caption">
                    <div class="font-weight-bold">Bim. 1</div>
                  </div>
                </div>

                <v-icon icon="mdi-arrow-right" color="grey" size="14" class="mx-1 flex-shrink-0"></v-icon>

                <!-- Bimestre 2 -->
                <div class="competencia-item flex-shrink-0">
                  <v-tooltip text="Bimestre 2" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre2')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre2' ? 'flat' : 'tonal'"
                        size="small"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="36"
                        :height="36"
                      >
                        <span class="font-weight-bold text-white text-caption">2</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div class="text-center mt-1 text-caption">
                    <div class="font-weight-bold">Bim. 2</div>
                  </div>
                </div>

                <v-icon icon="mdi-arrow-right" color="grey" size="14" class="mx-1 flex-shrink-0"></v-icon>

                <!-- Bimestre 3 -->
                <div class="competencia-item flex-shrink-0">
                  <v-tooltip text="Bimestre 3" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre3')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre3' ? 'flat' : 'tonal'"
                        size="small"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="36"
                        :height="36"
                      >
                        <span class="font-weight-bold text-white text-caption">3</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div class="text-center mt-1 text-caption">
                    <div class="font-weight-bold">Bim. 3</div>
                  </div>
                </div>

                <v-icon icon="mdi-arrow-right" color="grey" size="14" class="mx-1 flex-shrink-0"></v-icon>

                <!-- Bimestre 4 -->
                <div class="competencia-item flex-shrink-0">
                  <v-tooltip text="Bimestre 4" location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click="handleFlowClick('bimestre4')"
                        color="teal"
                        :variant="selectedFlowItem === 'bimestre4' ? 'flat' : 'tonal'"
                        size="small"
                        class="elevation-3 competencia-btn"
                        rounded="circle"
                        :width="36"
                        :height="36"
                      >
                        <span class="font-weight-bold text-white text-caption">4</span>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <div class="text-center mt-1 text-caption">
                    <div class="font-weight-bold">Bim. 4</div>
                  </div>
                </div>
              </div>

              <div class="d-flex d-sm-none flex-column align-center mt-3">
                
              </div>
            </div>

            <!-- Información del elemento seleccionado -->
            <div v-if="selectedFlowItem" class="mt-4 pa-3 bg-light-blue-lighten-5 rounded">
              <div class="text-center">
                <h4 class="font-weight-bold text-primary mb-2">
                  {{ getFlowItemTitle(selectedFlowItem) }}
                </h4>
                <p class="text-body-2 mb-0">
                  {{ getFlowItemDescription(selectedFlowItem) }}
                </p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>

      <!-- Contenido principal -->
      <v-card-text class="pa-2 pa-sm-3 pa-md-4 pt-0">
        <v-row v-if="curso">
          <!-- Navegación lateral con badges - Responsive -->
          <v-col 
            :cols="$vuetify.display.xs ? 12 : $vuetify.display.sm ? 12 : $vuetify.display.md ? 4 : 3"
            :order="$vuetify.display.xs ? 2 : $vuetify.display.sm ? 2 : 1"
          >
            <v-card elevation="2" rounded="lg" class="h-100">
              <v-card-text class="pa-0">
                <div class="d-flex flex-column">
                  <!-- Avatar del curso centrado -->
                  <div class="text-center pa-3 pa-sm-4">
                    <v-avatar 
                      :color="getSubjectColor(curso.subject)" 
                      :size="$vuetify.display.xs ? 48 : 64"
                      class="mb-2 mb-sm-3"
                    >
                      <v-icon 
                        :icon="getSubjectIcon(curso.subject)" 
                        :size="$vuetify.display.xs ? 24 : 32" 
                        color="white"
                      ></v-icon>
                    </v-avatar>
                  </div>

                  <!-- Lista de navegación -->
                  <v-list density="compact" class="py-0">
                    <v-list-item 
                      :class="activeTab === 'perfil' ? 'bg-primary text-white' : ''"
                      @click="activeTab = 'perfil'"
                      rounded="0"
                    >
                      <template v-slot:prepend>
                        <v-icon 
                          icon="mdi-account-circle" 
                          :color="activeTab === 'perfil' ? 'white' : 'primary'"
                          :size="$vuetify.display.xs ? 16 : 20"
                        ></v-icon>
                      </template>
                      <v-list-item-title :class="[
                        'font-weight-medium',
                        $vuetify.display.xs ? 'text-body-2' : ''
                      ]">
                        Perfil académico
                      </v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item 
                      :class="activeTab === 'alumnos' ? 'bg-blue text-white' : ''"
                      @click="activeTab = 'alumnos'"
                      rounded="0"
                    >
                      <template v-slot:prepend>
                        <v-icon 
                          icon="mdi-account-group" 
                          :color="activeTab === 'alumnos' ? 'white' : 'blue'"
                          :size="$vuetify.display.xs ? 16 : 20"
                        ></v-icon>
                      </template>
                      <v-list-item-title :class="[
                        'font-weight-medium',
                        $vuetify.display.xs ? 'text-body-2' : ''
                      ]">
                        Alumnos
                      </v-list-item-title>
                    </v-list-item>

                    <!-- Competencias disponibles -->
                    <v-divider class="my-2"></v-divider>
                    <v-list-item 
                      v-for="competencia in competencias" 
                      :key="competencia.codigo"
                      :class="selectedCompetencia === competencia.codigo ? 'bg-purple text-white' : ''"
                      @click="selectedCompetencia = competencia.codigo"
                      rounded="0"
                    >
                      <template v-slot:prepend>
                        <v-avatar 
                          :color="selectedCompetencia === competencia.codigo ? 'white' : 'purple'" 
                          :size="$vuetify.display.xs ? 20 : 24" 
                          :class="[
                            'font-weight-bold',
                            $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                          ]"
                        >
                          {{ competencia.codigo.replace('C', '') }}
                        </v-avatar>
                      </template>
                      <v-list-item-title :class="[
                        'font-weight-medium',
                        $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                      ]">
                        {{ $vuetify.display.xs ? 
                          competencia.titulo.substring(0, 15) + '...' : 
                          competencia.titulo.substring(0, 25) + '...' 
                        }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Contenido principal -->
          <v-col 
            :cols="$vuetify.display.xs ? 12 : $vuetify.display.sm ? 12 : $vuetify.display.md ? 8 : 9"
            :order="$vuetify.display.xs ? 1 : $vuetify.display.sm ? 1 : 2"
          >
            <!-- Tab de Perfil Académico -->
            <v-card v-if="activeTab === 'perfil'" elevation="2" rounded="lg">
              <v-card-title :class="[
                'font-weight-bold bg-light-blue-lighten-5 pa-3 pa-sm-4',
                $vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'
              ]">
                <v-badge 
                  :color="getCompetenciaColor(selectedCompetencia)" 
                  :content="selectedCompetencia" 
                  class="me-2 me-sm-3"
                >
                  <v-icon 
                    icon="mdi-school" 
                    :color="getCompetenciaColor(selectedCompetencia)"
                    :size="$vuetify.display.xs ? 16 : 20"
                  ></v-icon>
                </v-badge>
                <span :class="$vuetify.display.xs ? 'text-body-2' : ''">
                  {{ getSelectedCompetencia()?.titulo || 'Seleccione una competencia' }}
                </span>
                <v-spacer></v-spacer>
                <v-btn 
                  icon="mdi-plus" 
                  variant="text" 
                  :size="$vuetify.display.xs ? 'x-small' : 'small'"
                ></v-btn>
              </v-card-title>
              
              <v-card-text class="pa-2 pa-sm-3 pa-md-4" v-if="getSelectedCompetencia()">
                <div class="mb-3 mb-sm-4">
                  <h4 :class="[
                    'font-weight-bold mb-2 mb-sm-3',
                    $vuetify.display.xs ? 'text-body-2' : 'text-subtitle-1'
                  ]">
                    Capacidades:
                  </h4>
                  
                  <v-row>
                    <v-col 
                      v-for="(capacidad, index) in getSelectedCompetencia().capacidades" 
                      :key="index"
                      :cols="$vuetify.display.xs ? 12 : 12"
                      :md="getSelectedCompetencia().capacidades.length > 4 ? 6 : 12"
                    >
                      <v-card variant="outlined" class="pa-2 pa-sm-3 mb-2 mb-sm-3">
                        <p :class="[
                          'mb-0',
                          $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                        ]">
                          {{ capacidad }}
                        </p>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>

                <div>
                  <h4 :class="[
                    'font-weight-bold mb-2 mb-sm-3',
                    $vuetify.display.xs ? 'text-body-2' : 'text-subtitle-1'
                  ]">
                    Desempeños:
                  </h4>
                  
                  <v-expansion-panels variant="accordion" class="mb-2 mb-sm-3">
                    <v-expansion-panel 
                      title="Desempeños MINEDU"
                      bg-color="light-green-lighten-4"
                      class="mb-2"
                    >
                      <v-expansion-panel-text>
                        <div v-if="getSelectedCompetencia().desempenosMinedu.length > 0">
                          <v-card 
                            v-for="(desempeno, index) in getSelectedCompetencia().desempenosMinedu" 
                            :key="index"
                            variant="outlined" 
                            class="pa-2 pa-sm-3 mb-2"
                          >
                            <p :class="[
                              'mb-0',
                              $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                            ]">
                              <strong>{{ desempeno.codigo }}:</strong> {{ desempeno.descripcion }}
                            </p>
                          </v-card>
                        </div>
                        <p v-else :class="[
                          'text-medium-emphasis',
                          $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                        ]">
                          No hay desempeños MINEDU disponibles
                        </p>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    
                    <v-expansion-panel 
                      title="Desempeños Precisados"
                      bg-color="pink-lighten-4"
                      class="mb-2"
                    >
                      <v-expansion-panel-text>
                        <div v-if="getSelectedCompetencia().desempenosPrecisados.length > 0">
                          <v-card 
                            v-for="(desempeno, index) in getSelectedCompetencia().desempenosPrecisados" 
                            :key="index"
                            variant="outlined" 
                            class="pa-2 pa-sm-3 mb-2"
                          >
                            <p :class="[
                              'mb-0',
                              $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                            ]">
                              <strong>{{ desempeno.codigo }}:</strong> {{ desempeno.descripcion }}
                            </p>
                          </v-card>
                        </div>
                        <p v-else :class="[
                          'text-medium-emphasis',
                          $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                        ]">
                          No hay desempeños precisados disponibles
                        </p>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    
                    <v-expansion-panel 
                      title="Desempeños Adaptados"
                      bg-color="orange-lighten-4"
                    >
                      <v-expansion-panel-text>
                        <div v-if="getSelectedCompetencia().desempenosAdaptados.length > 0">
                          <v-card 
                            v-for="(desempeno, index) in getSelectedCompetencia().desempenosAdaptados" 
                            :key="index"
                            variant="outlined" 
                            class="pa-2 pa-sm-3 mb-2"
                          >
                            <p :class="[
                              'mb-0',
                              $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                            ]">
                              <strong>{{ desempeno.codigo }}:</strong> {{ desempeno.descripcion }}
                            </p>
                          </v-card>
                        </div>
                        <p v-else :class="[
                          'text-medium-emphasis',
                          $vuetify.display.xs ? 'text-caption' : 'text-body-2'
                        ]">
                          No hay desempeños adaptados disponibles
                        </p>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-card-text>
            </v-card>

            <!-- Tab de Alumnos -->
            <v-card v-if="activeTab === 'alumnos'" elevation="2" rounded="lg">
              <v-card-title :class="[
                'font-weight-bold bg-blue-lighten-5 pa-3 pa-sm-4',
                $vuetify.display.xs ? 'text-subtitle-1' : 'text-h6'
              ]">
                <v-icon 
                  icon="mdi-account-group" 
                  color="blue" 
                  class="me-2 me-sm-3"
                  :size="$vuetify.display.xs ? 16 : 20"
                ></v-icon>
                Lista de Alumnos
              </v-card-title>
              
              <v-card-text class="pa-2 pa-sm-3 pa-md-4">
                <v-alert 
                  type="info" 
                  variant="tonal" 
                  class="mb-3 mb-sm-4"
                >
                  <div class="d-flex align-center">
                    <v-icon 
                      icon="mdi-information" 
                      class="me-2 me-sm-3"
                      :size="$vuetify.display.xs ? 16 : 20"
                    ></v-icon>
                    <div>
                      <div :class="[
                        'font-weight-bold',
                        $vuetify.display.xs ? 'text-body-2' : ''
                      ]">
                        {{ curso.studentsCount }} estudiantes registrados
                      </div>
                      <div :class="$vuetify.display.xs ? 'text-caption' : 'text-body-2'">
                        Grupo de estudio: {{ curso.studyGroup }}
                      </div>
                    </div>
                  </div>
                </v-alert>
                
                <p :class="[
                  'text-center text-medium-emphasis',
                  $vuetify.display.xs ? 'text-body-2' : 'text-body-1'
                ]">
                  Aquí se mostraría la lista detallada de alumnos del curso.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Estado de carga -->
        <div v-else class="text-center py-6 py-sm-8">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="$vuetify.display.xs ? 48 : 64"
            :width="$vuetify.display.xs ? 3 : 4"
          ></v-progress-circular>
          <p :class="[
            'mt-3 mt-sm-4',
            $vuetify.display.xs ? 'text-body-2' : 'text-body-1'
          ]">
            Cargando información del curso...
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router
const route = useRoute()
const router = useRouter()

// Reactive data
const curso = ref(null)
const activeTab = ref('perfil')
const selectedCompetencia = ref('C6')
const selectedFlowItem = ref('general')

// Datos de competencias estructurados
const competencias = ref([
  {
    codigo: 'C6',
    titulo: 'SE COMUNICA ORALMENTE EN SU LENGUA MATERNA',
    capacidades: [
      'Obtiene información del texto oral.',
      'Infiere e interpreta información del texto oral.',
      'Adecúa, organiza y desarrolla las ideas de forma coherente y cohesionada.',
      'Utiliza recursos no verbales y paraverbales de forma estratégica.',
      'Interactúa estratégicamente con distintos interlocutores.',
      'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
    ],
    desempenosMinedu: [
      {
        codigo: 'D1',
        descripcion: 'Recupera información explícita de textos orales que escucha seleccionando datos específicos. Integra esta información cuando es dicha en distintos momentos y por distintos interlocutores en textos que incluyen expresiones con sentido figurado, y vocabulario que incluye sinónimos y términos propios de los campos del saber.'
      },
      {
        codigo: 'D2',
        descripcion: 'Explica el tema y el propósito comunicativo del texto oral. Distingue lo relevante de lo complementario clasificando y sintetizando la información. Establece conclusiones sobre lo comprendido; para ello, vincula el texto con su experiencia y los contextos socioculturales en que se desenvuelve'
      },
      {
        codigo: 'D3',
        descripcion: 'Deduce relaciones lógicas (causa-efecto, semejanza-diferencia, etc.) entre las ideas del texto oral, a partir de información explícita e implícita del mismo. Señala las características y cualidades implícitas de personas, personajes, animales, objetos, hechos y lugares, y determina el significado de palabras según el contexto y de expresiones con sentido figurado (expresiones irónicas) cuando hay algunas pistas en el texto'
      },
      {
        codigo: 'D4',
        descripcion: 'Explica la intención de sus interlocutores considerando recursos verbales, no verbales y paraverbales. Asimismo, los puntos de vista y las motivaciones de personas y personajes, así como algunas figuras retóricas (por ejemplo, la hipérbole) considerando algunas características del tipo textual y género discursivo.'
      },
      {
        codigo: 'D5',
        descripcion: 'Adecúa su texto oral a la situación comunicativa considerando el propósito comunicativo y algunas características del género discursivo, manteniendo el registro formal e informal y adaptándose a sus interlocutores y al contexto; para ello, recurre a su experiencia y a algunas fuentes de información complementaria'
      },
      {
        codigo: 'D6',
        descripcion: 'Expresa oralmente ideas y emociones de forma coherente y cohesionada. Ordena y jerarquiza las ideas en torno a un tema y las desarrolla para ampliar la información o mantener el hilo temático. Establece relaciones lógicas entre ellas (en especial, de causa-efecto, consecuencia y contraste), a través de algunos referentes y conectores. Incorpora un vocabulario que incluye sinónimos y algunos términos propios de los campos del saber.'
      },
      {
        codigo: 'D7',
        descripcion: 'Emplea gestos y movimientos corporales que enfatizan lo que dice. Mantiene la distancia física con sus interlocutores, así como el volumen, la entonación y el ritmo de su voz para transmitir emociones, caracterizar personajes o producir efectos en el público, como el suspenso y el entretenimiento.'
      },
      {
        codigo: 'D8',
        descripcion: 'Participa en diversos intercambios orales alternando los roles de hablante y oyente. Recurre a sus saberes previos, usa lo dicho por sus interlocutores y aporta nueva información relevante para argumentar, explicar y complementar ideas. Considera normas y modos de cortesía según el contexto sociocultural.'
      },
      {
        codigo: 'D9',
        descripcion: 'Opina como hablante y oyente sobre ideas, hechos y temas, de textos orales del ámbito escolar, social o de medios de comunicación. Justifica su posición sobre lo que dice el texto oral considerando su experiencia y el contexto en que se desenvuelve.'
      },
      {
        codigo: 'D10',
        descripcion: 'Evalúa la adecuación de textos orales a la situación comunicativa, así como la coherencia de ideas y la cohesión entre ellas; también, la utilidad de recursos verbales, no verbales y paraverbales de acuerdo al propósito comunicativo.'
      }
    ],
    desempenosPrecisados: [
      {
        codigo: 'DP1',
        descripcion: 'D1 Recupera información explícita de textos orales que escucha seleccionando datos específicos. Integra esta información cuando es dicha en distintos momentos y por distintos interlocutores en textos que incluyen expresiones con sentido figurado, y vocabulario que incluye sinónimos y términos propios de los campos del saber.'
      },
      {
        codigo: 'DP2',
        descripcion: 'D1 Recupera información explícita de textos orales que escucha seleccionando datos específicos. Integra esta información cuando es dicha en distintos momentos y por distintos interlocutores en textos que incluyen expresiones con sentido figurado, y vocabulario que incluye sinónimos y términos propios de los campos del saber.'
      },
      {
        codigo: 'DP3',
        descripcion: 'D1 Recupera información explícita de textos orales que escucha seleccionando datos específicos. Integra esta información cuando es dicha en distintos momentos y por distintos interlocutores en textos que incluyen expresiones con sentido figurado, y vocabulario que incluye sinónimos y términos propios de los campos del saber.'
      }
    ],
    desempenosAdaptados: [
      {
        codigo: 'DA1',
        descripcion: 'Recupera información explícita de textos orales que escucha seleccionando datos específicos. Integra esta información cuando es dicha en distintos momentos y por distintos interlocutores en textos que incluyen expresiones con sentido figurado, y vocabulario que incluye sinónimos y términos propios de los campos del saber.'
      }
    ]
  },
  {
    codigo: 'C7',
    titulo: 'LEE DIVERSOS TIPOS DE TEXTOS ESCRITOS EN SU LENGUA MATERNA',
    capacidades: [
      'Obtiene información del texto escrito.',
      'Infiere e interpreta información del texto escrito.',
      'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
    ],
    desempenosMinedu: [],
    desempenosPrecisados: [],
    desempenosAdaptados: []
  },
  {
    codigo: 'C8',
    titulo: 'ESCRIBE DIVERSOS TIPOS DE TEXTO EN SU LENGUA MATERNA',
    capacidades: [
      'Adecúa el texto a la situación comunicativa.',
      'Organiza y desarrolla las ideas de forma coherente y cohesionada.',
      'Utiliza convenciones del lenguaje escrito de forma pertinente.',
      'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
    ],
    desempenosMinedu: [],
    desempenosPrecisados: [],
    desempenosAdaptados: []
  },
  {
    codigo: 'C36',
    titulo: 'SE DESENVUELVE EN ENTORNOS VIRTUALES GENERADOS POR LAS TIC',
    capacidades: [
      'Personaliza entornos virtuales.',
      'Gestiona información del entorno virtual.',
      'Interactúa en entornos virtuales.',
      'Crea objetos virtuales en diversos formatos.'
    ],
    desempenosMinedu: [],
    desempenosPrecisados: [],
    desempenosAdaptados: []
  },
  {
    codigo: 'CT2',
    titulo: 'GESTIONA SU APRENDIZAJE DE MANERA AUTÓNOMA',
    capacidades: [
      'Define metas de aprendizaje.',
      'Organiza acciones estratégicas para alcanzar sus metas de aprendizaje.',
      'Monitorea y ajusta su desempeño durante el proceso de aprendizaje.'
    ],
    desempenosMinedu: [],
    desempenosPrecisados: [],
    desempenosAdaptados: []
  }
])

// Methods
const getSubjectIcon = (subject) => {
  const iconMap = {
    'COMUNICACIÓN': 'mdi-message-text',
    'MATEMÁTICA': 'mdi-calculator',
    'CIENCIAS': 'mdi-flask',
    'HISTORIA': 'mdi-book-open-page-variant',
    'INGLÉS': 'mdi-translate'
  }
  return iconMap[subject] || 'mdi-book'
}

const getSubjectColor = (subject) => {
  const colorMap = {
    'COMUNICACIÓN': 'purple',
    'MATEMÁTICA': 'blue',
    'CIENCIAS': 'green',
    'HISTORIA': 'brown',
    'INGLÉS': 'red'
  }
  return colorMap[subject] || 'grey'
}

const getCompetenciaColor = (codigo) => {
  const colorMap = {
    'C6': 'purple',
    'C7': 'blue',
    'C8': 'green',
    'C36': 'orange',
    'CT2': 'teal'
  }
  return colorMap[codigo] || 'grey'
}

const getSelectedCompetencia = () => {
  return competencias.value.find(c => c.codigo === selectedCompetencia.value)
}

const handleFlowClick = (item) => {
  selectedFlowItem.value = item
  console.log(`Clicked on: ${item}`)
  // Aquí puedes agregar la lógica específica para cada elemento del flujo
}

const getFlowItemTitle = (item) => {
  const titles = {
    'general': 'General',
    'bimestre1': 'Bimestre 1',
    'bimestre2': 'Bimestre 2',
    'bimestre3': 'Bimestre 3',
    'bimestre4': 'Bimestre 4'
  }
  return titles[item] || ''
}

const getFlowItemDescription = (item) => {
  const descriptions = {
    'general': 'Vista general del desarrollo de competencias durante todo el año académico.',
    'bimestre1': 'Primer período académico - Marzo a Mayo. Desarrollo inicial de competencias.',
    'bimestre2': 'Segundo período académico - Mayo a Julio. Consolidación de aprendizajes.',
    'bimestre3': 'Tercer período académico - Agosto a Octubre. Profundización de conocimientos.',
    'bimestre4': 'Cuarto período académico - Octubre a Diciembre. Evaluación final y síntesis.'
  }
  return descriptions[item] || ''
}

const goBack = () => {
  router.push({ name: 'Cursos' })
}

// Simular carga de datos del curso
const loadCourseData = (id) => {
  // Datos de ejemplo - en una app real esto vendría de una API
  const allCourses = [
    {
      id: 1,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'COMUNICACIÓN',
      studyGroup: 'Primaria 6to - A',
      studentsCount: 1,
      tasksCount: 4,
      level: 'PRIMARIA',
      grade: '6TO',
      section: 'A'
    },
    {
      id: 2,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'MATEMÁTICA',
      studyGroup: 'Primaria 5to - B',
      studentsCount: 23,
      tasksCount: 6,
      level: 'PRIMARIA',
      grade: '5TO',
      section: 'B'
    },
    {
      id: 3,
      period: 'PA 2024',
      campus: 'LIMA-CENTRO',
      subject: 'CIENCIAS',
      studyGroup: 'Secundaria 3ro - A',
      studentsCount: 28,
      tasksCount: 3,
      level: 'SECUNDARIA',
      grade: '3RO',
      section: 'A'
    },
    {
      id: 4,
      period: 'PA 2023',
      campus: 'MIRAFLORES',
      subject: 'HISTORIA',
      studyGroup: 'Secundaria 4to - C',
      studentsCount: 22,
      tasksCount: 5,
      level: 'SECUNDARIA',
      grade: '4TO',
      section: 'C'
    },
    {
      id: 5,
      period: 'PA 2024',
      campus: 'SAN-BORJA',
      subject: 'INGLÉS',
      studyGroup: 'Primaria 2do - A',
      studentsCount: 20,
      tasksCount: 2,
      level: 'PRIMARIA',
      grade: '2DO',
      section: 'A'
    }
  ]

  // Simular delay de API
  setTimeout(() => {
    curso.value = allCourses.find(c => c.id === parseInt(id)) || allCourses[0]
  }, 500)
}

onMounted(() => {
  const courseId = route.params.id
  if (courseId) {
    loadCourseData(courseId)
  } else {
    // Cargar el primer curso por defecto para demostración
    loadCourseData(1)
  }
})
</script>

<style scoped>
.curso-detalle-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.curso-detalle-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.competencia-flow {
  overflow-x: auto;
  padding: 12px 0;
}

.competencia-item {
  min-width: fit-content;
  text-align: center;
  flex-shrink: 0;
}

.competencia-btn {
  transition: all 0.3s ease;
  min-width: unset !important;
}

.competencia-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Mejoras responsive */
@media (max-width: 600px) {
  
  
  .gap-2 {
    gap: 6px;
  }
}

@media (min-width: 601px) {
  
  
  .gap-2 {
    gap: 12px;
  }
}

@media (min-width: 960px) {
  .gap-2 {
    gap: 16px;
  }
}

/* Scrollbar mejorado */
.competencia-flow::-webkit-scrollbar {
  height: 6px;
}

.competencia-flow::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.competencia-flow::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.competencia-flow::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Animaciones suaves para los avatares */
.v-avatar {
  transition: all 0.3s ease;
}

.v-avatar:hover {
  transform: scale(1.05);
}

/* Mejoras para las tarjetas */
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}

/* Espaciado responsive para los gaps */
.gap-2 {
  gap: 8px;
}

@media (max-width: 600px) {
  .gap-2 {
    gap: 4px;
  }
}
</style>
