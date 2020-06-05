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
    if (!time) return "未知时间"
    const parsed = dayjs(time)
    return `${parsed.format('YYYY.M.D')}，距今约 ${parsed.fromNow()}`
  },
  relative (time) {
    if (!time) return {
      title: `未知时间`,
      subtitle: "遥远的从前...?",
      ts: 0
    }
    const parsed = dayjs(time)
    return {
      title: `${parsed.fromNow()}`,
      subtitle: parsed.format('YYYY.M.D'),
      ts: parsed.unix()
    }
  }
}