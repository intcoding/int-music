function setRem() {
  document.documentElement.style.fontSize =
    (document.documentElement.clientWidth / 750) * 16 + 'px'
}

window.addEventListener('DOMContentLoaded', () => {
  setRem()
})

window.addEventListener('resize', () => {
  setRem()
})
