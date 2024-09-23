import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchGroups } from './fetch-groups'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storage-config'

export async function groupRemoveByName(groupName: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedGroups = await fetchGroups()
    const groups = storedGroups.filter((group) => group !== groupName)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)
  } catch (error) {
    throw error
  }
}
