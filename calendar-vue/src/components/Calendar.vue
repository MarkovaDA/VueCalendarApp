<script setup>
import { computed, ref } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const monthLabel = computed(() =>
  new Date(currentYear.value, currentMonth.value).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  }),
)

const days = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const offset = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  return Array.from({ length: 42 }, (_, index) => {
    const dateNumber = index - offset + 1
    const inCurrentMonth = dateNumber > 0 && dateNumber <= daysInMonth
    const isToday =
      inCurrentMonth &&
      dateNumber === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear()

    return {
      dateNumber,
      inCurrentMonth,
      isToday,
    }
  })
})

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
    return
  }

  currentMonth.value -= 1
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
    return
  }

  currentMonth.value += 1
}
</script>

<template>
  <section class="calendar">
    <div class="calendar-header">
      <button type="button" class="nav-btn" @click="previousMonth" aria-label="Previous month">
        <span>&lt;</span>
      </button>
      <h3>{{ monthLabel }}</h3>
      <button type="button" class="nav-btn" @click="nextMonth" aria-label="Next month">
        <span>&gt;</span>
      </button>
    </div>

    <div class="week-grid labels">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>

    <div class="week-grid days">
      <span
        v-for="(day, index) in days"
        :key="`${day.dateNumber}-${index}`"
        :class="{
          muted: !day.inCurrentMonth,
          today: day.isToday,
        }"
      >
        {{ day.inCurrentMonth ? day.dateNumber : '' }}
      </span>
    </div>
  </section>
</template>

<!-- залить код календарика -->
<style scoped>
.calendar {
  width: 100%;
  max-width: 360px;
  padding: 1rem;
  border: 1px solid rgba(60, 60, 60, 0.2);
  border-radius: 12px;
  background: var(--color-background-soft);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1rem;
  text-transform: capitalize;
}

.nav-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: var(--color-text);
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.4rem;
}

.labels {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
}

.days span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.days .today {
  background: hsla(160, 100%, 37%, 0.2);
  color: hsla(160, 100%, 25%, 1);
  font-weight: 600;
}

.days .muted {
  opacity: 0.2;
}
</style>
