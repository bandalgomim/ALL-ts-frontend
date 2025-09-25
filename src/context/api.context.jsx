import { MainProvider } from './main.context';
import { TeamProvider } from './team.context';
import { LeagueProvider } from './league.context';
import { MatchProvider } from './match.context';
import { AuthProvider } from './auth.context';
import { ModalProvider } from './modal.context';
import { SearchTagProvider } from './searchTag.context';

export default function ApiProvider({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>
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
      </ModalProvider>
    </AuthProvider>
  );
}