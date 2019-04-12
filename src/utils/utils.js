export function bind (el, event, fn, boolean) {
  if (el.addEventListener) {
    if (boolean) {
      el.addEventListener(event, fn, { passive: false })
    } else {
      el.addEventListener(event, fn)
    }
  } else {
    if (boolean) {
      el.attachEvent('on' + event, (ev) => {
        const e = ev || window.event
        fn.call(el)
        e.preventDefault()
      })
    } else {
      el.attachEvent('on' + event, () => {
        fn.call(el)
      })
    }
  }
}
