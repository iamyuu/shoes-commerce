import LRU from 'lru-cache'

const lruCache = new LRU({
  max: 500,
  ttl: 1000 * 60 * 60 * 1 // 1 hour
})

export default lruCache
