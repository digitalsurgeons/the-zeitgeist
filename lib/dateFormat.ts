import dayjs from 'dayjs'

const nthDay = (day: number) => {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const formatZeitgeistDate = (date: string) => {
  const zeitgeistDate = dayjs(date as string)
  const dateSuffix = nthDay(zeitgeistDate.date())
  const formattedDate = zeitgeistDate.format('MMMM D, YYYY')
  const splitDate = formattedDate.split(',')
  return `${splitDate[0]}${dateSuffix},${splitDate[1]}`
}
