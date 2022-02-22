export const getStorageItem = (key) => {
  const items = localStorage.getItem(key)
  return items ? JSON.parse(items) : items
}

export const setStorageItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))
