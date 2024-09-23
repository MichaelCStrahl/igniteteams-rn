import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from './player-storage-dto'
import { playersGetByGroup } from './players-get-by-group'
import { AppError } from '@utils/app-error'

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
      throw new AppError('Essa pessoa já está adicionada em um time')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    const storageKey = `${GROUP_COLLECTION}-${group}`

    await AsyncStorage.setItem(storageKey, storage)
  } catch (error) {
    throw error
  }
}
