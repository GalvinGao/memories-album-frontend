import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh'

dayjs.locale(zh)
dayjs.extend(relativeTime)

const events = {
  graduationCeremony: {
    begin: new Date(2020, 6, 20, 8, 0, 0),
    end: new Date(2020, 6, 20, 12, 0, 0),
  }
}

export default {
  events,
  dayjs,
  format (time) {
    const parsed = dayjs(time)
    return `${parsed.format('YYYY.M.D')}，距今约 ${parsed.fromNow()}`
  }
}