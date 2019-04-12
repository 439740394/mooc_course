/* 引入localstorage */
import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}

export function setCourseIdObject (id, key, value) {
  let courseid = getLocalStorage(`${id}-info`)
  if (!courseid) {
    courseid = {}
  }
  courseid[key] = value
  setLocalStorage(`${id}-info`, courseid)
}

export function getCourseIdObject (id, key) {
  let courseid = getLocalStorage(`${id}-info`)
  if (courseid) {
    return courseid[key]
  } else {
    return null
  }
}

/* 目录 */
export function saveCatalog (id, value) {
  return setCourseIdObject(id, 'catalog', value)
}

export function getCatalog (id) {
  return getCourseIdObject(id, 'catalog')
}
