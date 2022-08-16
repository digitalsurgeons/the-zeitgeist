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
      <div className="flex flex-col justify-center px-4 mx-auto max-w-8xl">
        <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-gray-200 lg:flex-none">
          <h1 className="text-lg font-semibold text-white">
            <time dateTime="2022-08">August 2022</time>
          </h1>
          <div className="flex items-center">
            <div className="flex items-center rounded-md shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-400 bg-white border border-r-0 border-gray-300 rounded-l-md hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative w-px h-5 -mx-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex items-center justify-center py-2 pl-4 pr-3 text-gray-400 bg-white border border-l-0 border-gray-300 rounded-r-md hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <HiChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px text-xs font-semibold leading-6 text-center text-gray-700 bg-gray-200 border-b border-gray-300 lg:flex-none">
            <div className="py-2 bg-white">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="py-2 bg-white">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="py-2 bg-white">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="py-2 bg-white">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="py-2 bg-white">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="py-2 bg-white">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="py-2 bg-white">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
          </div>
          <div className="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {calendarDays.map((day, idx) => (
                <div key={idx} className={classNames('bg-white relative py-2 px-3')}>
                  <time dateTime={day.date}>
                    {day.date.split('-').pop()?.replace(/^0/, '') ?? ''}
                  </time>
                  <div>
                    <button
                      className="hover:text-blue-200"
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
            <div className="grid w-full grid-cols-7 grid-rows-6 gap-px isolate lg:hidden">
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
