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
    <v-slider label="Number of shares" thumb-label="always" class="mt-4"
      :value="shareCount" @input="setShareCount" :min="2" :max="16"></v-slider>
    <v-slider label="Unlocking threshold" thumb-label="always" class="mt-4"
      :value="threshold" @input="setThreshold" :min="2" :max="shareCount"></v-slider>
    <div class="text-h6">Results</div>
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
    <v-snackbar :timeout="1000" v-model="snackbar">Copied!</v-snackbar>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import secrets from 'secrets.js'

  const PAD_LENGTH = 1024

  export default Vue.extend({
    data () {
      return {
        snackbar: false,
        secret: '',
        shareCount: 3,
        threshold: 2
      }
    },
    computed: {
      shares (): string[] {
        return secrets.share(
          secrets.str2hex(this.secret),
          this.shareCount,
          this.threshold,
          PAD_LENGTH
        )
      }
    },
    methods: {
      setSecret (value: string): void {
        this.secret = value
      },
      setShareCount (value: number): void {
        this.shareCount = value
        this.threshold = Math.min(this.threshold, value)
      },
      setThreshold (value: number): void {
        this.threshold = value
      },
      async copyShare (index: number): Promise<void> {
        await navigator.clipboard.writeText(this.shares[index])
        this.snackbar = true
      },
      async copyAll (): Promise<void> {
        await navigator.clipboard.writeText(this.shares.join('\n'))
        this.snackbar = true
      }
    }
  })
</script>