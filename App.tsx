import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  // eslint-disable-next-line camelcase
  Roboto_400Regular,
  // eslint-disable-next-line camelcase
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Loading } from '@components/Loading'

import theme from './src/theme'
import { StatusBar } from 'react-native'
import { Routes } from 'src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Roboto_400Regular,
    // eslint-disable-next-line camelcase
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
