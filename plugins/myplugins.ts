


export default defineNuxtPlugin(() => {
  // return {
  //   provide: {
  //     hello: () => 'world'
  //   }
  // }

  return {
    provide: {
      hello: (msg: string = '是我') => `Hello ${msg}`
    }

  }

})