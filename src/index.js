import { lightTheme } from './theme/light.js'
import { darkTheme } from './theme/dark.js'
let isDark = null
function getIsDark() {
  const isDark = localStorage.getItem('isDark')
  if (isDark !== null) return isDark === 'true'
  const { matches } = window.matchMedia('(prefers-color-scheme: dark)')
  return matches
}
function getTheme(isDark) {
  return isDark ? darkTheme : lightTheme
}
function mountTheme(theme) {
  Object.keys(theme).forEach((key) => {
    document.documentElement.style.setProperty(key, theme[key])
  })
}
function init() {
  isDark = getIsDark()
  mountTheme(getTheme(isDark))
}
function toggle() {
  isDark = getIsDark()
  isDark = !isDark
  localStorage.setItem('isDark', isDark.toString())
  mountTheme(getTheme(isDark))
}
export { init, toggle, isDark }
