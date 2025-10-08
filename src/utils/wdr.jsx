import React from 'react';

if (__DEV__) {
  try {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
      trackAllPureComponents: true,
      collapseGroups: true,
      logOwnerReasons: true,
    });
    console.log('[wdyr] initialized');
  } catch (e) {
    console.warn('[wdyr] init failed:', e);
  }
}