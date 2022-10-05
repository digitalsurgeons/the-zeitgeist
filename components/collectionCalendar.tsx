import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { CalendarDay, CollectionItem } from '../pages/collection'
import CollectionItemDialog from './collectionItemDialog'

const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(' ')
}

type CollectionCalendarProps = {
  calendarDays: Array<CalendarDay>
}

const CollectionCalendar = ({ calendarDays }: CollectionCalendarProps) => {
  console.log(calendarDays)

  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<CollectionItem | undefined>()

  return (
    <>
      <div className="mx-auto flex max-w-8xl flex-col justify-center bg-zinc-900 px-4 focus:ring-teal-500">
        <header className="relative z-20 flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="text-lg font-semibold text-white">
            <time dateTime="2022-08">August 2022</time>
          </h1>
          <div className="flex items-center">
            <div className="flex items-center rounded-md shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex items-center justify-center rounded-l-md border border-r-0 border-zinc-700 bg-black py-2 pl-3 pr-4 text-gray-400 hover:text-teal-500 focus:relative md:w-9 md:px-2"
              >
                <span className="sr-only">Previous month</span>
                <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-r-md border border-l-0 border-zinc-700 bg-black py-2 pl-4 pr-3 text-gray-400 hover:text-teal-500 focus:relative md:w-9 md:px-2"
              >
                <span className="sr-only">Next month</span>
                <HiChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <div className="bg-black shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-zinc-700 bg-zinc-700 text-center text-xs font-semibold leading-6 lg:flex-none">
            <div className="bg-black py-2  text-white">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="bg-black py-2 text-white">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-black py-2 text-white">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-black py-2 text-white">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-black py-2 text-white">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-black py-2 text-white">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-black py-2 text-white">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
          </div>
          <div className="flex text-xs leading-6 lg:flex-auto">
            <div className="hidden w-full bg-zinc-700 lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    'relative py-2 px-3',
                    day.isCurrentMonth ? 'bg-black text-white ' : 'bg-zinc-900 text-gray-600',
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isCurrentMonth ? 'text-teal-500' : 'text-white',
                      'text-sm',
                    )}
                  >
                    {day.date.split('-').pop()?.replace(/^0/, '') ?? ''}
                  </time>
                  <div>
                    <button
                      className="rounded-full px-2 hover:bg-teal-500 hover:text-black"
                      onClick={() => {
                        setActiveItem(day.item ?? undefined)
                        setIsOpen(true)
                      }}
                    >
                      <p>{day.item?.trend}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {/* {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  day.isSelected || day.isToday ? 'font-semibold' : '',
                  day.isSelected ? 'text-white' : '',
                  !day.isSelected && day.isToday ? 'text-indigo-600' : '',
                  !day.isSelected && day.isCurrentMonth && !day.isToday ? 'text-gray-900' : '',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday ? 'text-gray-500' : '',
                  'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10',
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected ? 'flex h-6 w-6 items-center justify-center rounded-full' : '',
                    day.isSelected && day.isToday ? 'bg-indigo-600' : '',
                    day.isSelected && !day.isToday ? 'bg-gray-900' : '',
                    'ml-auto',
                  )}
                >
                  {day.date.split('-').pop()?.replace(/^0/, '') ?? ''}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))} */}
            </div>
          </div>
        </div>
      </div>

      <CollectionItemDialog
        item={activeItem}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setActiveItem(undefined)
        }}
      />
    </>
  )
}

export default CollectionCalendar
