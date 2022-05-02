import { lightTheme } from './theme/light'
import { darkTheme } from './theme/dark'
import type { ITheme } from './types/index'

let isDark: boolean | null = null

function getIsDark(): boolean {
  const isDark: string | null = localStorage.getItem('isDark')

  if (isDark !== null) return isDark === 'true'

  const { matches } = window.matchMedia('(prefers-color-scheme: dark)')
  return matches
}

function getTheme(isDark: boolean): ITheme {
  return isDark ? darkTheme : lightTheme
}

function mountTheme(theme: ITheme) {
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
