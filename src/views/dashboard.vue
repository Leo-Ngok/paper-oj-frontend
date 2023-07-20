<script setup lang="ts">


import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import initUser from '@/utils/initUser';

const router = useRouter()
const user = userStore()
try {
  initUser.setRouter(router)
  initUser.setUser(user)
  initUser.initPages()
} catch(error) {
  console.log(error)
}
</script>

<template>
  <section class="block shadow flex-center" style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
    To be continued
  </section>
</template>

<style>
</style>