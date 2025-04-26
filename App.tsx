import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/stackNavigater';
import { initializeNotifications } from './src/notification/initializeNotifications';

function App(): React.JSX.Element {
  useEffect(() => {
    const setup = async () => {
      // 알림 초기화
      await initializeNotifications();

    };
    setup();
  }, []);
  return (
    <>
      <StackNavigator />
    </>
  );
}

export default App;
