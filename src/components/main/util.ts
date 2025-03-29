/* eslint-disable @typescript-eslint/no-unused-vars */
import { teamDto, leagueDto, patchMainReqDto } from '../../model/main.dto';

const transformToPatchMainReqDto = (list: (teamDto | leagueDto)[]): patchMainReqDto[] => {
    return list.map(item => {
        if ('teamName' in item) {
            // team 타입인 경우 teamName과 teamLogo를 제외
            const { teamName, teamLogo, ...rest } = item;
            return rest; // team에 필요한 필드만 반환
        } else {
            // league 타입인 경우 leagueName과 leagueLogo를 제외
            const { leagueName, leagueLogo, ...rest } = item;
            return rest; // league에 필요한 필드만 반환
        }
    });
};
