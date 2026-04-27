<script setup>
import Calendar from './Calendar.vue'
</script>

<template>
  <section class="calendar-shell">
    <Calendar />
  </section>
</template>

<style scoped>
.calendar-shell {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}
</style>

