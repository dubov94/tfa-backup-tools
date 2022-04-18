<style scoped>
  .v-tabs {
    flex: 0 1 auto;
    width: auto;
  }
</style>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>2FA Backup Splitter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs class="flex-grow-0">
        <v-tab to="/splitting">Split</v-tab>
        <v-tab to="/combining">Combine</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>