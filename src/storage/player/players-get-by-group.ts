import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from './player-storage-dto'

export async function playersGetByGroup(group: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storageKey = `${GROUP_COLLECTION}-${group}`

    const storage = await AsyncStorage.getItem(storageKey)

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    return players
  } catch (error) {
    throw error
  }
}
