import { MainProvider } from './main.context';
import { TeamProvider } from './team.context';
import { LeagueProvider } from './league.context';
import { MatchProvider } from './match.context';
import { AuthProvider } from './auth.context';
import { ModalProvider } from './modal/modal.context.tsx';
import { SearchTagProvider } from './searchTag.context';
import { LogoModalProvider } from './modal/logoModal.context';
import { SearchProvider } from './modal/search.context';
import { ModalNextMatchProvider } from './modal/modalNextMatch.context';

export default function ApiProvider({ children }) {
  return (
    <AuthProvider>
      <LogoModalProvider>
        <ModalProvider>
          <ModalNextMatchProvider>
            <SearchProvider>
              <MainProvider>
                <TeamProvider>
                  <LeagueProvider>
                    <MatchProvider>
                        <SearchTagProvider>
                          {children}
                        </SearchTagProvider>
                    </MatchProvider>
                  </LeagueProvider>
                </TeamProvider>
              </MainProvider>
            </SearchProvider>
          </ModalNextMatchProvider>
        </ModalProvider>
      </LogoModalProvider>
    </AuthProvider>
  );
}