import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStackNavigator from './MainStackNavigator';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import {useTheme} from '../context/ThemeContext';
import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const {theme} = useTheme();

  const themedStyles = getStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: themedStyles.tabBar,
        tabBarLabelStyle: themedStyles.tabLabel,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarIconStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen name="Products" component={MainStackNavigator} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

// Helper to normalize font size and tab bar sizing
const getStyles = (theme: any) => {
  const {width, height} = Dimensions.get('window');
  const fontScale = PixelRatio.getFontScale();
  const scale = width / 375;

  const normalize = (size: number) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  return StyleSheet.create({
    tabBar: {
      height: normalize(60),
      paddingBottom: normalize(6),
      paddingTop: normalize(4),
      backgroundColor: theme.header,
    },
    tabLabel: {
      fontSize: normalize(14 / fontScale),
      marginTop: normalize(10),
      fontWeight: '600',
    },
  });
};
