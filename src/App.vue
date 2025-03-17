<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script setup>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const tg = window.Telegram.WebApp
const router = useRouter()
const route = useRoute()

// Watch for route changes to control the back button visibility
watch(() => route.name, (newRoute) => {
  if (newRoute === 'PostDetail') {
    tg.BackButton.show()
  } else {
    tg.BackButton.hide()
  }
})

// Attach BackButton functionality onClick
tg.BackButton.onClick(() => { router.go(-1) })
</script>


<style lang="scss" scoped>
  #app {
    background-color: var(--tg-theme-bg-color);
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: auto;
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }</style>
