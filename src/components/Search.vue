<template>
  <div class="search">
    <label>
      Search
      <input type="text" v-model="search" @change="fetchResults"/>
    </label>
  </div>
</template>

<script>
import { FETCH_LIST } from '@/store'

export default {
  name: 'Search',
  data () {
    return {
      search: 'vuejs'
    }
  },
  methods: {
    fetchResults () {
      this.$store.dispatch(FETCH_LIST, { search: this.search })
    }
  }
}
</script>

<style scoped>
.search {
  margin: 12px;
}

label {
  font-weight: bold;
  margin-right: 12px;
}
</style>
