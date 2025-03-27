/* eslint-disable react/react-in-jsx-scope */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ApiProvider } from './src/context/context';  // ApiProvider import

// ApiProvider로 App을 감싸서 제공
const AppWithProvider = () => (
  <ApiProvider>
    <App />
  </ApiProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);
