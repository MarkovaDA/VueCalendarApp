<script setup>
import { computed, ref } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const monthLabel = computed(() => {
  const rawLabel = new Date(currentYear.value, currentMonth.value).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
})

const days = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
  const offset = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const daysInPreviousMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()

  return Array.from({ length: 42 }, (_, index) => {
    const rawDateNumber = index - offset + 1
    const inCurrentMonth = rawDateNumber > 0 && rawDateNumber <= daysInMonth
    const dateNumber =
      rawDateNumber <= 0
        ? daysInPreviousMonth + rawDateNumber
        : rawDateNumber > daysInMonth
          ? rawDateNumber - daysInMonth
          : rawDateNumber
    
    const isToday =
      inCurrentMonth &&
      rawDateNumber === today.getDate() &&
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
    currentMonth.value = 11;
    currentYear.value -= 1;
    return;
  }

  currentMonth.value -= 1
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
    return;
  }

  currentMonth.value += 1
}
</script>

<template>
  <section class="calendar">
    <div class="calendar-header">
      <button type="button" class="nav-btn" @click="previousMonth" aria-label="Previous month">
        <span class="chevron chevron-left" aria-hidden="true"></span>
      </button>
      <h3>{{ monthLabel }}</h3>
      <button type="button" class="nav-btn" @click="nextMonth" aria-label="Next month">
        <span class="chevron chevron-right" aria-hidden="true"></span>
      </button>
    </div>

    <div class="week-grid labels">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>

    <div class="week-grid days" role="grid" aria-label="Calendar month">
      <span
        v-for="(day, index) in days"
        :key="`${day.dateNumber}-${index}`"
        :class="{
          muted: !day.inCurrentMonth,
          today: day.isToday,
        }"
        role="gridcell"
      >
        {{ day.dateNumber }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  width: 100%;
  max-width: 380px;
  padding: 1.25rem;
  border: 1px solid rgba(46, 54, 69, 0.12);
  border-radius: 28px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%);
  box-shadow:
    0 1px 2px rgba(16, 24, 40, 0.1),
    0 6px 20px rgba(16, 24, 40, 0.08);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: capitalize;
  color: #1e2a3a;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 0;
  border-radius: 999px;
  background: #eef2ff;
  cursor: pointer;
  color: #3150d6;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.chevron {
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.chevron-left {
  transform: rotate(-135deg);
}

.chevron-right {
  transform: rotate(45deg);
}

.nav-btn:hover {
  background: #dfe7ff;
}

.nav-btn:active {
  transform: scale(0.96);
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.5rem;
}

.labels {
  margin-bottom: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #5f6b7a;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.days span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  font-size: 0.9rem;
  color: #253042;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.days span:not(.muted) {
  background: lavender;
}

.days span:hover {
  cursor: pointer;
}

.days span:not(.muted):hover {
  background: rgba(61, 90, 254, 0.1);
}

.days .today {
  background: #3f51b5;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(63, 81, 181, 0.35);
}

.days .muted {
  color: #a3abbb;
}

@media (prefers-color-scheme: dark) {
  .calendar {
    border-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, #1f2430 0%, #161b24 100%);
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.28),
      0 10px 24px rgba(0, 0, 0, 0.32);
  }

  .calendar-header h3 {
    color: #e9ecf3;
  }

  .labels {
    color: #a9b3c8;
  }

  .days span {
    color: #d7deeb;
  }

  .days span:not(.muted):hover {
    background: rgba(152, 171, 255, 0.18);
  }

  .days .muted {
    color: #647089;
  }

  .nav-btn {
    background: #2a3345;
    color: #b8c6f8;
  }

  .nav-btn:hover {
    background: #34415a;
  }
}
</style>
