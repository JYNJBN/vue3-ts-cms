class LocalCache {
  setLocalCache(key: string, value: any) {
    // 因为value可以是如何类型，但是setItem里的value只能是string类型故使用JSON.stringify去转换
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getLocalCache(key: string) {
    let value = localStorage.getItem(key)
    if (value) {
      //转化成原来的格式
      value = JSON.parse(value)
    }
    return value
  }
  deleteLocalCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearLocalCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
