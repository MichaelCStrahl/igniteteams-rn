import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { fetchGroups } from './fetch-groups'
import { AppError } from '@utils/app-error'

export async function createGroup(newGroup: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedGroups = await fetchGroups()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
