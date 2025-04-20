import { MainProvider } from './main.context';
import { TeamProvider } from './team.context';
import { LeagueProvider } from './league.context';
import { MatchProvider } from './match.context';
import { AuthProvider } from './auth.context';
import { ModalProvider } from './modal.context';

export default function ApiProvider({ children }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <MainProvider>
          <TeamProvider>
            <LeagueProvider>
              <MatchProvider>
                {children}
              </MatchProvider>
            </LeagueProvider>
          </TeamProvider>
        </MainProvider>
      </ModalProvider>
    </AuthProvider>
  );
}