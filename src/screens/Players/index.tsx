import { useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Button } from '@components/Button'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<string[]>(['Michael', 'Vini'])

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => console.log('removi')} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
      />

      <Button title="Remover turma" type="secondary" />
    </Container>
  )
}
