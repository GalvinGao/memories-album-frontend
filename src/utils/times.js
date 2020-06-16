import dayjs from 'dayjs'
import i18n from "@/i18n";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

dayjs.extend(relativeTime)

const events = {
  graduationCeremony: {
    begin: new Date(2020, 6, 20, 8, 0, 0),
    end: new Date(2020, 6, 20, 12, 0, 0),
  }
}

export default {
  events,
  get dayjs () {
    dayjs.locale(i18n.locale)
    return dayjs
  },
  format (time) {
    if (!time) return i18n.t('time.unknown.title')
    const parsed = dayjs(time)
    return i18n.t('time.format', {date: parsed.format('YYYY.M.D'), relative: parsed.fromNow()})
  },
  relative (time) {
    if (!time) return {
      title: i18n.t('time.unknown.title'),
      subtitle: i18n.t('time.unknown.subtitle'),
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