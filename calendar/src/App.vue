<script setup>
import Container from './components/Container.vue'
</script>

<template>
  <main>
    <Container />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(138, 160, 255, 0.22) 0%, transparent 38%),
    linear-gradient(180deg, #f2f5ff 0%, #edf1ff 100%);
}

@media (prefers-color-scheme: dark) {
  main {
    background:
      radial-gradient(circle at top, rgba(86, 100, 158, 0.34) 0%, transparent 40%),
      linear-gradient(180deg, #111622 0%, #0c1018 100%);
  }
}
</style>
