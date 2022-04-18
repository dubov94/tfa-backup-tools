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
      <v-snackbar :timeout="1000" :value="snackbarIndicator" @input="snackbarInput">
        {{ snackbarText }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapMutations } from 'vuex'
  import { SnackbarState, SNACKBAR_NAMESPACE, HIDE_SNACKBAR } from '@/store/domain'

  export default Vue.extend({
    computed: {
      ...mapState<SnackbarState>(SNACKBAR_NAMESPACE, {
        snackbarText: (state: SnackbarState) => state.text,
        snackbarIndicator: (state: SnackbarState) => state.indicator
      })
    },
    methods: {
      ...mapMutations(SNACKBAR_NAMESPACE, [HIDE_SNACKBAR]),
      snackbarInput (value: boolean): void {
        console.assert(value === false, '`<v-snackbar>` fired `input` with `false`')
        this.hideSnackbar()
      }
    }
  })
</script>
