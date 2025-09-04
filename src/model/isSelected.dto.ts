import { StateDto } from "./config"

export interface patchIsTeamSelected {
    teamId: number | null
}
export interface patchIsLeagueSelected {
    leagueId: number | null
}

export interface patchIsMatchSelected {
    matchId: string | null
}

export type patchIsSelected = patchIsTeamSelected | patchIsLeagueSelected | patchIsMatchSelected

export type patchIsSelectedReqDto = StateDto<patchIsSelected>
