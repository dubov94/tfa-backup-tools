<template>
  <v-container>
    <div class="text-h6">Shares</div>
    <v-textarea label="Hexadecimal strings, one per line" solo no-resize class="mt-4"
      :value="input" @input="setInput"></v-textarea>
    <div class="text-h6">Original</div>
    <v-alert v-if="error.length > 0" type="error" class="mt-4">{{ error }}</v-alert>
    <v-textarea v-else solo no-resize readonly class="mt-2" :value="secret"
      prepend-icon="content_copy" @click:prepend="copyText"></v-textarea>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import {
    COMBINING_NAMESPACE,
    CombiningState,
    GET_COMBINATION,
    SET_COMBINING_INPUT,
    SNACKBAR_NAMESPACE,
    SHOW_SNACKBAR
  } from '@/store/domain'

  export default Vue.extend({
    computed: {
      ...mapState<CombiningState>(COMBINING_NAMESPACE, {
        input: (state: CombiningState) => state.input
      }),
      ...mapGetters(COMBINING_NAMESPACE, [GET_COMBINATION]),
      secret (): string {
        const [secret, ] = this.combination
        return secret
      },
      error (): string {
        const [, error] = this.combination
        return error
      }
    },
    methods: {
      ...mapMutations(COMBINING_NAMESPACE, {
        setInput: SET_COMBINING_INPUT
      }),
      ...mapMutations(SNACKBAR_NAMESPACE, [SHOW_SNACKBAR]),
      async copyText (): Promise<void> {
        await navigator.clipboard.writeText(this.secret)
        this.showSnackbar('Copied')
      }
    }
  })
</script>
