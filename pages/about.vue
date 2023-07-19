<template>
  <div>
    <div>about页面</div>

    <h1>{{ route.query }}}</h1>

    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()




definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped></style>
