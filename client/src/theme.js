import { useState } from 'react'
const primaryColor = '#ff4100'
const secondaryColor = '#ef6c00'

const Palette = {
  type: 'light',
  primary: {
    dark: '#c30000',
    main: primaryColor,
    light: '#ff783a'
  },
  secondary: {
    dark: '#b53d00',
    main: secondaryColor,
    light: '#ff9d3f'
  },
  success: {
    main: '#5cb860'
  },
  warning: {
    main: '#ffa21a'
  },
  error: {
    main: '#f55a4e'
  },
  info: {
    main: '#00d3ee'
  }
}

const Typography = {
  fontSize: 14,
  htmlFontSize: 14,
  useNextVariants: true,
  fontFamily: ['Roboto', 'sans-serif'].join(','),
  h1: {
    fontWeight: 600,
    fontSize: '1.6rem'
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.5rem'
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.35rem'
  },
  h4: {
    fontWeight: 500,
    fontSize: '1.3rem'
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.3rem'
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.2rem'
  }
}

const Theme = {
  palette: Palette,
  typography: Typography
}

export function useDarkMode() {
  const [theme, setTheme] = useState(Theme)
  const {
    palette: { type }
  } = theme

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updatedTheme)
  }

  return [theme, toggleDarkMode]
}

export default Theme
