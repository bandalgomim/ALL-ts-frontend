import { MainProvider } from './main.context';
import { TeamProvider } from './team.context';
import { LeagueProvider } from './league.context';
import { MatchProvider } from './match.context';
import { AuthProvider } from './auth.context';
import { ModalProvider } from './modal/modal.context';
import { SearchTagProvider } from './searchTag.context';
import { LogoProvider } from './modal/logo.context';
import { SearchProvider } from './modal/serch.context';
import { NextMatchProvider } from './modal/nextMatch.context';

export default function ApiProvider({ children }) {
  return (
    <AuthProvider>
      <LogoProvider>
        <ModalProvider>
          <NextMatchProvider>
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
          </NextMatchProvider>
        </ModalProvider>
      </LogoProvider>
    </AuthProvider>
  );
}