import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, }}>
  
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
          name="Profile"
          component={Profile}/>
        
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
    
  );
}

