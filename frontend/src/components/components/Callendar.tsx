'use client'

import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = [
    { date: new Date(2025, 3, 25), title: 'Spotkanie' },
    { date: new Date(2025, 3, 30), title: 'Urodziny' }
  ]

  const header = format(currentDate, 'MMMM yyyy')

  const generateDays = () => {
    const startMonth = startOfMonth(currentDate)
    const endMonth = endOfMonth(currentDate)
    const startDate = startOfWeek(startMonth, { weekStartsOn: 1 })
    const weeks = []
    let day = startDate

    while (day <= endMonth || weeks.length < 6) {
      const days = []
      for (let i = 0; i < 7; i++) {
        days.push(day)
        day = addDays(day, 1)
      }
      weeks.push(days)
    }
    return weeks
  }

  const weeks = generateDays()

  return (
    <section className="flex flex-col  items-center w-full max-w-10xl mx-auto px-4 ">

      <div className="w-full text-left mb-4 flex justify-center">
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium">
          Dodaj wydarzenie do kalendarza
        </button>
      </div>

      <div className="p-4 border rounded-xl shadow bg-white">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">{header}</h2>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm text-muted-foreground font-medium mb-2">
          {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center text-sm gap-y-2">
          {weeks.map((week, i) =>
            week.map((day, j) => {
              const isToday = isSameDay(day, new Date())
              const isCurrentMonth = isSameMonth(day, currentDate)
              const hasEvent = events.some((e) => isSameDay(e.date, day))

              return (
                <div
                  key={`${i}-${j}`}
                  className={`
                    p-1 h-8 w-8 md:h-10 md:w-10 mx-auto flex items-center justify-center rounded-md cursor-pointer transition-all hover:bg-slate-400
                    ${hasEvent ? 'bg-blue-500 text-white' : ''}
                    ${isToday && !hasEvent ? 'border-2 border-primaryColor text-primaryColor font-semibold' : ''}
                    ${!isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}
                  `}
                >
                  {day.getDate()}
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
