import React from 'react';
import StackNavigator from './src/navigation/stackNavigater';
if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
  });
}

function App(): React.JSX.Element {



  return (
    <>
      <StackNavigator />
    </>
  );
}

export default App;
