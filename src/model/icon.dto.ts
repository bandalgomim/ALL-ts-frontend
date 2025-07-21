import { StateDto } from "./config"

export interface patchIcon {
    type: "team" | "league",
    id: number,
    uri: string | null
}

export type patchIconReqDto = StateDto<patchIcon>