<template>
  <v-app dark style="overflow-x: hidden">
    <v-app-bar fixed app elevate-on-scroll color="white">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="!$vuetify.breakpoint.mobile"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text--secondary">
        <span class="font-weight-medium">Scan</span> Toolkit
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!$vuetify.breakpoint.mobile">
        <v-btn
          text
          class="text--secondary font-weight-regular"
          style="text-transform: none"
        >
          <span>About</span>
        </v-btn>

        <v-btn
          text
          class="text--secondary font-weight-regular"
          style="text-transform: none"
        >
          <span>Contact</span>
        </v-btn>

        <v-btn
          text
          class="text--secondary font-weight-regular"
          style="text-transform: none"
        >
          <span>Donate</span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer dark padless style="margin-top: 300px">
      <v-card
        flat
        tile
        class="black--text text-center"
        style="background: #f8f9fa"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 black--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="black--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="black--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>