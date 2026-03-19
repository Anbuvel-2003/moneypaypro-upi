import React, { createContext, useContext } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

const TabBarVisibilityContext = createContext(null);

export const TabBarVisibilityProvider = ({ children }) => {
  const translateY = useSharedValue(0);

  const hideTabBar = () => {
    'worklet';
    translateY.value = withTiming(150, { 
      duration: 350, 
      easing: Easing.inOut(Easing.quad) 
    });
  };

  const showTabBar = () => {
    'worklet';
    translateY.value = withTiming(0, { 
      duration: 300, 
      easing: Easing.out(Easing.quad) 
    });
  };

  return (
    <TabBarVisibilityContext.Provider value={{ translateY, hideTabBar, showTabBar }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error('useTabBarVisibility must be used within a TabBarVisibilityProvider');
  }
  return context;
};
