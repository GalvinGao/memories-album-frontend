import ObjectManager from '@/utils/objectManager'

const merged = new ObjectManager({
  name: 'merged',
  api: "/merged",
  transform: (data) => data,
  ttl: 1000 * 60 * 60 * 1
});

export default merged