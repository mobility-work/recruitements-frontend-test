import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export const FETCH_LIST = 'FETCH_LIST'
export const SET_ITEMS = 'SET_ITEMS'
export const SET_LOADING = 'SET_LOADING'

const store = new Store({
    state: {
        loading: false,
        items: [],
        total: 0,
        search: ''
    },
    actions: {
        async [FETCH_LIST](context, payload = {}) {
            const response = await fetch(`https://api.github.com/search/repositories?q=${payload.search || 'vuejs' }&sort=stars&order=desc&page=${payload.page || 1}&per_page=20`)

            context.commit(SET_ITEMS, await response.json())
        }
    },
    mutations: {
        [SET_LOADING](state, payload) {
          state.loading = payload
        },
        [SET_ITEMS](state, payload) {
            state.items = payload.items
            state.total = payload.total_count
        }
    }
})

export default store
