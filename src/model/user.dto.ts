export interface getUserDto {
    email: string,
    name: string,
    teamId: number,
    iconUrl: string,
    backgroundUrl: string,
    createdAt: string
}

export interface patchUserDto {
    teamId: number,
    iconUrl: string,
    backgroundUrl: string
}
