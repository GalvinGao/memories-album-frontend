import ObjectManager from '@/utils/objectManager'
import commons from './_common'

const merged = new ObjectManager({
  name: 'merged',
  api: "/merged",
  transform: (data) => {
    data.people = data.people.sort((a, b) => {
      if (!a.englishName || !b.englishName) return 0;
      return a.englishName.split("|").pop().localeCompare(b.englishName.split("|").pop())
    })
    return data
  },
  ttl: 1000 * 60 * 60 * 1,
  ajaxHooks: commons.defaultAjaxHooks
});

export default merged