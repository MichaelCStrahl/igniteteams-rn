import { Header } from '@components/Header'
import { Container } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { fetchGroups } from '@storage/group/fetch-groups'
import { Loading } from '@components/Loading'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  const handleNewGroup = () => {
    navigation.navigate('new')
  }

  const handleFetchGroups = async () => {
    try {
      setIsLoading(true)

      const data = await fetchGroups()
      setGroups(data)
    } catch (error) {
      console.error(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    }

    setIsLoading(false)
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading && <Loading />}

      {!isLoading && (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
