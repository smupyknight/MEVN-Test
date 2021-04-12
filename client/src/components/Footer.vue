<template>
  <v-card >
    <v-footer
      :padless=true
    >
      <v-card
        flat
        tile
        width="100%"
        class="grey lighten-2 text-center"
      >
        <v-card-text class="black--text">
            <p>Copyright &copy; 
          {{ new Date().getFullYear() }} — <strong>MEVN Fullstack</strong> </p>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>