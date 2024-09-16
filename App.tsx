import { Groups } from '@screens/Groups'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular as Roboto400Regular,
  Roboto_700Bold as Roboto700Regular,
} from '@expo-google-fonts/roboto'

import { Loading } from '@components/Loading'

import theme from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto400Regular,
    Roboto700Regular,
  })

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
