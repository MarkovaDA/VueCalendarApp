import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Calendar from '../Calendar.vue'

describe('Calendar.vue', () => {
  let wrapper

  beforeEach(() => {
    // Mock today's date for consistent testing
    const mockDate = new Date(2024, 0, 15) // January 15, 2024
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
    
    wrapper = mount(Calendar)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the calendar component', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.calendar').exists()).toBe(true)
  })

  it('displays the month and year label', () => {
    const monthLabel = wrapper.find('.calendar-header h3')
    expect(monthLabel.exists()).toBe(true)
    expect(monthLabel.text()).toContain('January')
    expect(monthLabel.text()).toContain('2024')
  })

  it('displays all week day labels', () => {
    const weekDaysContainer = wrapper.findAll('.week-grid.labels span')
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    expect(weekDaysContainer).toHaveLength(7)
    weekDaysContainer.forEach((day, index) => {
      expect(day.text()).toBe(weekDays[index])
    })
  })

  it('displays 42 day cells (6 weeks)', () => {
    const dayCells = wrapper.findAll('.week-grid.days span')
    expect(dayCells).toHaveLength(42)
  })

  it('renders navigation buttons', () => {
    const buttons = wrapper.findAll('.nav-btn')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].attributes('aria-label')).toBe('Previous month')
    expect(buttons[1].attributes('aria-label')).toBe('Next month')
  })

  it('highlights today date with "today" class', () => {
    const todayCell = wrapper.find('.week-grid.days span.today')
    expect(todayCell.exists()).toBe(true)
    expect(todayCell.text()).toBe('15') // January 15, 2024
  })

  it('marks days from other months with "muted" class', () => {
    const dayCells = wrapper.findAll('.week-grid.days span')
    const mutedCells = wrapper.findAll('.week-grid.days span.muted')
    
    // January 2024 starts on Monday, so days from December should be muted
    expect(mutedCells.length).toBeGreaterThan(0)
  })

  it('navigates to next month when next button is clicked', async () => {
    const nextButton = wrapper.findAll('.nav-btn')[1]
    await nextButton.trigger('click')

    const monthLabel = wrapper.find('.calendar-header h3')
    expect(monthLabel.text()).toContain('February')
  })

  it('navigates to previous month when previous button is clicked', async () => {
    const prevButton = wrapper.findAll('.nav-btn')[0]
    await prevButton.trigger('click')

    const monthLabel = wrapper.find('.calendar-header h3')
    expect(monthLabel.text()).toContain('December')
  })

  it('wraps around year when navigating from January to December', async () => {
    const prevButton = wrapper.findAll('.nav-btn')[0]
    await prevButton.trigger('click')

    const monthLabel = wrapper.find('.calendar-header h3')
    expect(monthLabel.text()).toContain('December')
    expect(monthLabel.text()).toContain('2023')
  })

  it('wraps around year when navigating from December to January', async () => {
    // Set to December first
    const prevButton = wrapper.findAll('.nav-btn')[0]
    await prevButton.trigger('click')
    
    const nextButton = wrapper.findAll('.nav-btn')[1]
    await nextButton.trigger('click')
    await nextButton.trigger('click')

    const monthLabel = wrapper.find('.calendar-header h3')
    expect(monthLabel.text()).toContain('January')
    expect(monthLabel.text()).toContain('2025')
  })

  it('has proper grid role and aria attributes', () => {
    const grid = wrapper.find('[role="grid"]')
    expect(grid.exists()).toBe(true)
    expect(grid.attributes('aria-label')).toBe('Calendar month')
    
    const cells = wrapper.findAll('[role="gridcell"]')
    expect(cells.length).toBeGreaterThan(0)
  })

  it('maintains correct day numbers when navigating months', async () => {
    const nextButton = wrapper.findAll('.nav-btn')[1]
    
    // Get initial days
    const initialDays = wrapper.findAll('.week-grid.days span')
    const initialFirstDay = initialDays[0].text()
    
    // Navigate to next month and back
    await nextButton.trigger('click')
    const prevButton = wrapper.findAll('.nav-btn')[0]
    await prevButton.trigger('click')
    
    // Days should be same
    const finalDays = wrapper.findAll('.week-grid.days span')
    expect(finalDays[0].text()).toBe(initialFirstDay)
  })
})
