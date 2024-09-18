import { useState } from 'react'

import { Container, Content, Icon } from './styles'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { useNavigation } from '@react-navigation/native'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  const handleGoPlayers = () => {
    navigation.navigate('players', { group })
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          style={{ marginTop: 20 }}
          title="Criar"
          onPress={handleGoPlayers}
        />
      </Content>
    </Container>
  )
}
