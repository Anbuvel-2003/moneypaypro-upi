import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GlassView from '../components/GlassView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming,
  Easing,
  runOnJS 
} from 'react-native-reanimated';
import { useTabBarVisibility } from './TabBarVisibilityContext';

import Svg, { Path, Circle } from 'react-native-svg';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { translateY, showTabBar } = useTabBarVisibility();
  const [containerWidth, setContainerWidth] = React.useState(0);
  const numTabs = state.routes.length;
  const padding = 16; // px-2 is 8px * 2
  const tabWidth = (containerWidth - padding) / numTabs;

  React.useEffect(() => {
    showTabBar();
  }, [state.index]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ 
        translateX: withTiming(state.index * tabWidth + padding / 2, { 
          duration: 250, 
          easing: Easing.out(Easing.quad) 
        }) 
      }],
      width: tabWidth,
    };
  });

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 500 || Math.abs(event.translationX) > tabWidth / 2) {
        if (event.translationX < 0 && state.index < numTabs - 1) {
          runOnJS(navigation.navigate)(state.routes[state.index + 1].name);
        } else if (event.translationX > 0 && state.index > 0) {
          runOnJS(navigation.navigate)(state.routes[state.index - 1].name);
        }
      }
    });

  const getIcon = (name, color, size, isFocused) => {
    const strokeWidth = isFocused ? 2.5 : 1.8;
    switch (name) {
      case 'Home':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Path d="M9 22V12h6v10" />
          </Svg>
        );
      case 'Payments':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h12a2 2 0 0 0 2-2v-3a2 2 0 0 0 0-4z" />
            <Path d="M2 7h1" />
            <Path d="M22 7h1" />
          </Svg>
        );
      case 'Scan':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 12h-7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1zm-10 0H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a1 1 0 0 1-1 1zm-7 7H2v-5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm12 0h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2z" />
          </Svg>
        );
      case 'History':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 12a9 9 0 1 0 9-9h1a2 2 0 0 1 2 2v3" />
            <Path d="M12 7v5l4 2" />
          </Svg>
        );
      case 'Profile':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <Circle cx="12" cy="7" r="4" />
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.container, { bottom: insets.bottom + 20 }, animatedContainerStyle]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View 
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          className="mx-5"
          style={styles.floatingContainer}
        >
          <GlassView className="flex-row items-center rounded-[32px] px-2 py-2 border border-white/20" blurAmount={40}>
            <Animated.View 
              style={[
                indicatorStyle, 
                { 
                  position: 'absolute', 
                  top: 6, 
                  bottom: 6, 
                  left: 0, 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: 26,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderWidth: 1.5,
                }
              ]} 
            />

            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const iconColor = isFocused ? '#fff' : 'rgba(255, 255, 255, 0.4)';

              // Local Animated style for scaling and dimming
              const ItemAnimatedComponent = ({ children }) => {
                const style = useAnimatedStyle(() => {
                  return {
                    transform: [{ scale: withTiming(isFocused ? 1.1 : 1, { duration: 200 }) }],
                    opacity: withTiming(isFocused ? 1 : 0.5, { duration: 200 }),
                  };
                });
                return <Animated.View style={[style, { alignItems: 'center', justifyContent: 'center' }]}>{children}</Animated.View>;
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  className="flex-1"
                  activeOpacity={0.8}
                >
                  <ItemAnimatedComponent>
                    <View className="items-center py-2">
                      {getIcon(route.name, iconColor, 24, isFocused)}
                      <Text 
                        className={`text-[10px] mt-1 font-bold tracking-tight ${isFocused ? 'text-white' : 'text-white/40'}`}
                      >
                        {label}
                      </Text>
                    </View>
                  </ItemAnimatedComponent>
                </TouchableOpacity>
              );
            })}
          </GlassView>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  floatingContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
});

export default CustomTabBar;
