import { Alert } from 'react-native'
import { useState } from 'react'

import { Container, Content, Icon } from './styles'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { useNavigation } from '@react-navigation/native'
import { createGroup } from '@storage/group/group-create'
import { AppError } from '@utils/app-error'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  const handleGoPlayers = async () => {
    try {
      if (group.trim().length === 0) {
        Alert.alert('Novo Grupo', 'Informe o nome da turma')
      }

      await createGroup(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      }

      Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')
      console.error(error)
    }
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
