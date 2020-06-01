import ObjectManager from '@/utils/objectManager'

const merged = new ObjectManager({
  name: 'merged',
  api: "/merged",
  transform: (data) => {
    data.people = data.people.sort((a, b) => {
      if (("chineseName" in a && "chineseName" in b) && window.Intl && window.Intl.Collator) {
        return Intl.Collator("zh").compare(a.chineseName, b.chineseName)
      } else {
        return a.englishName - b.englishName
      }
    })
    return data
  },
  ttl: 1000 * 60 * 60 * 1
});

export default merged