<template>
  <div class="container">
    <table>
      <thead>
      <tr>
        <th>Repository</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td colspan="2">Loading...</td>
          </tr>
        </template>
        <template v-else>
          <template v-if="items.length > 0">
          <tr v-for="item in items" :key="item.id">
            <td><a :href="item.url">{{ item.full_name }}</a></td>
            <td>{{ item.description }}</td>
          </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">No items found.</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>

    <PageButton
        v-for="page of pages"
        :page="page"
        :key="page"
    />
  </div>
</template>

<script>
import store, { FETCH_LIST, SET_LOADING } from '../store'
import PageButton from '@/components/PageButton'

export default {
  name: 'List',
  components: { PageButton },
  async mounted() {
    await store.commit(SET_LOADING, true)
    await store.dispatch(FETCH_LIST)
    await store.commit(SET_LOADING, false)
  },
  computed: {
    loading() {
      return store.state.loading
    },
    items() {
      return store.state.items
    },
    total() {
      return store.state.total
    },
    pages() {
      const numberOfPages = Math.round(this.total / 20)

      const pages = []
      for(let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        pages.push(pageNumber)
      }

      return pages.slice(0, 10)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
}
table {
  width: calc(100% - 24px);
  margin: 12px;
  border-collapse: collapse;
}

td, th {
  border: 1px solid gray;
  padding: 8px;
  text-align: left;
}

th {
  background-color: lightgray;
  color: #2c3e50;
}
</style>
