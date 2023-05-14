import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,DefaultTheme,
  DarkTheme,  } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './/screens/Home'
import Users from './/screens/Users'
import Feeds from './/screens/Feeds'
import Profile from './/screens/Profile'
import SplashScreen from './/screens/SplashScreen'
import UploadScreen from './/screens/UploadScreen'
import Login from './/screens/Login'
import Jobs from './/screens/Jobs'
import JobProfile from './/screens/Jobprofile'
import Chat from './/screens/Chat'
import { useColorScheme } from 'react-native';


import { createStackNavigator} from '@react-navigation/stack';


export const ThemeContext = React.createContext();
const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState('Light');

  const themeData = { theme, setTheme };

  return (
    <ThemeContext.Provider value={themeData}>
    <NavigationContainer
      theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, }}>
          
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          
          name="UploadScreen"
          component={ UploadScreen }/>
        <Stack.Screen
          
          name="Login"
          component={ Login }/>

        <Stack.Screen
          
          name="Feeds"
          component={Feeds}/>
        <Stack.Screen
          name="Jobs"
          component={Jobs}/>
        <Stack.Screen
          name="JobProfile"
          component={JobProfile}/>
          
        <Stack.Screen
          name="Chat"
          component={Chat}/>
          
        <Stack.Screen
          name="Profile"
          component={Profile}/>
        
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
    </ThemeContext.Provider>
  );
}

