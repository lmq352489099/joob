declare module '#app' {
  interface NuxtApp {
    $format(date?: Date, msg?: string): string
    $alert: (msg: string) => any
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $format(date?: Date, msg?: string): string
    $alert: (msg: string) => any
  }
}

declare module '@vue/runtime-core' {
  // declare your own store states
  // interface State {
  //   cb: (msg: string) => any
  // }
  type State = (msg: string) => any

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $alert: State,
    $format(date?: Date, msg?: string): string
  }
}

export {}
