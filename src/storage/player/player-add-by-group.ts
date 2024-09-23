import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storage-config'
import { AppError } from '@utils/app-error'

import { PlayerStorageDTO } from './player-storage-dto'
import { playersGetByGroup } from './players-get-by-group'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name,
    )

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
