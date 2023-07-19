export const useMystate = defineStore('myStore', {



  state: () => ({
    count: 0,
    token: '222'
  }),
  getters: {
    doubleCounter: (state) => state.count * 2
  },
  actions: {
    add() {
      if (process.server) {
        console.log('This is running on the server');
      }
      if (process.client) {
        console.log('object :>> ', this.count);
        this.count++
        console.log('object :>> ', this.count);
      }
    }
  },
  persist: {
    storage: persistedState.localStorage,
    paths: ['token']
  },

})
