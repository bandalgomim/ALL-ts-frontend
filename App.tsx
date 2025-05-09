import React, { useContext, useEffect } from 'react';
import StackNavigator from './src/navigation/stackNavigater';
import { initializeNotifications } from './src/notification/initializeNotifications';
import { AuthContext } from './src/context/auth.context';
import { hookRefreshToken } from './src/hooks/IAM.hook';

function App(): React.JSX.Element {
  const {setLogin} = useContext(AuthContext);
  useEffect(() => {
      // 알림 초기화
      initializeNotifications();
      hookRefreshToken(setLogin);
  }, []);
  return (
    <>
      <StackNavigator />
    </>
  );
}

export default App;
