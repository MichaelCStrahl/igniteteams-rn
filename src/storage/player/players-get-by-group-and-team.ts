import { playersGetByGroup } from './players-get-by-group'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await playersGetByGroup(group)

    const players = storage.filter((player) => player.team === team)

    return players
  } catch (error) {
    throw error
  }
}
