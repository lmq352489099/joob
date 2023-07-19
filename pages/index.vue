<template>
  <div>
    index 页面

    <mybutton></mybutton>

    <NuxtLink></NuxtLink>

    <a-button @click="toAbout">跳转到about</a-button>
    <h1>{{ $hello('你好') }}</h1>

    <h1>counter {{ Mystate.doubleCounter }}}</h1>

    <a-button @click="Mystate.add">增加</a-button>

    <div>hook:{{ counter }}</div>
  </div>
</template>

<script setup lang="ts">
// 引入 myStore
// import { useMystate } from '~/stores/myStore'
// import { useConter } from '~/composables/counter'

let Mystate = useMystate()

console.log(Mystate.count, Mystate.doubleCounter)

const router = useRouter()

const { $hello } = useNuxtApp()
// console.log(nuxt!.$hello())

const userInfo = ref({
  id: 1,
  username: '张三',
})
const toAbout = () => {
  router.push({
    path: '/about',
    query: { userInfo: JSON.stringify(userInfo.value) },
  })
}

const counter = useConter()
counter.value = 1022

//调用API

const { data: userData } = await userInfoFetch({})
console.log('111111111111111221==>',userData)


await useHttpFetch('/api/user',{server:false})
</script>

<style scoped></style>
