<style scoped>
  pre {
    white-space: pre-wrap;
    word-break: break-all;
  }

  .v-list-item {
    cursor: pointer;
  }
</style>

<template>
  <v-container>
    <div class="text-h6">Parameters</div>
    <v-textarea label="Secret to split" solo no-resize class="mt-4"
      :value="secret" @input="setSecret"></v-textarea>
    <v-range-slider thumb-label="always" class="mt-4"
      :value="[threshold, shareCount]" @input="updateRange" :min="2" :max="16">
    </v-range-slider>
    <p>
      It will be enough to provide <strong>{{ threshold }}</strong> shares out of
      <strong>{{ shareCount }}</strong> below to restore the original secret.
    </p>
    <div class="text-h6">Shares</div>
    <p class="mt-2">
      You can click each individual share to copy, or just
      <a href="#" @click.prevent="copyAll">copy all</a>.
    </p>
    <v-card>
      <v-list class="py-0">
        <template v-for="(share, index) in shares">
          <v-divider v-if="index > 0" :key="`divider-${index}`"></v-divider>
          <v-list-item :key="`share-${index}`" class="py-2" @click="copyShare(index)">
            <pre>{{ share }}</pre>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import {
    SPLITTING_NAMESPACE,
    SplittingState,
    GET_SHARES,
    SET_SECRET,
    SET_SHARE_COUNT,
    SET_THRESHOLD,
    SNACKBAR_NAMESPACE,
    SHOW_SNACKBAR
  } from '@/store/domain'

  export default Vue.extend({
    computed: {
      ...mapState<SplittingState>(SPLITTING_NAMESPACE, {
        secret: (state: SplittingState) => state.secret,
        shareCount: (state: SplittingState) => state.shareCount,
        threshold: (state: SplittingState) => state.threshold
      }),
      ...mapGetters(SPLITTING_NAMESPACE, [GET_SHARES])
    },
    methods: {
      ...mapMutations(SPLITTING_NAMESPACE, [
        SET_SECRET, SET_SHARE_COUNT, SET_THRESHOLD
      ]),
      ...mapMutations(SNACKBAR_NAMESPACE, [SHOW_SNACKBAR]),
      updateRange ([lower, upper]: [number, number]): void {
        this.setShareCount(upper)
        this.setThreshold(lower)
      },
      async copyShare (index: number): Promise<void> {
        await navigator.clipboard.writeText(this.shares[index])
        this.showSnackbar('Copied')
      },
      async copyAll (): Promise<void> {
        await navigator.clipboard.writeText(this.shares.join('\n'))
        this.showSnackbar('Copied')
      }
    }
  })
</script>
