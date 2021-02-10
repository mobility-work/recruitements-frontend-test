<template>
  <button @click="changePage" class="button">{{ page }}</button>
</template>

<script>
import { FETCH_LIST } from '@/store'

export default {
  name: 'PageButton',
  props: ['page'],
  methods: {
    changePage() {
      this.$store.dispatch(FETCH_LIST, { page: this.page })
    }
  }
}
</script>
<style>
  .button {
    margin: 0 8px;
    font-weight: bold;
  }
</style>
