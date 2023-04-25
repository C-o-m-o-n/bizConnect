import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './/screens/Home'
import Feeds from './/screens/Feeds'
import Profile from './/screens/Profile'
import SplashScreen from './/screens/SplashScreen'
import UploadScreen from './/screens/UploadScreen'
import Login from './/screens/Login'

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
    tabBarStyle: { backgroundColor:'#9116f5' },
  }}>
  
        <Tab.Screen
          options={{
            headerStyle: {
            backgroundColor: '#cb16f5'
            },
            tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-home"
            size={20}
            color="#fff" />
        )}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-home"
            size={20}
            color="#fff" />
        )}}
          name="UploadScreen"
          component={ UploadScreen }/>
        <Tab.Screen
          options={{
            Style:{
              display:'none',
            },
            tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="log-in"
            size={20}
            color="#fff" />)
            
          }}
          name="Login"
          component={ Login }/>

        <Tab.Screen
          options={{tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-home"
            size={20}
            color="#fff" />
        )}}
          name="Feeds"
          component={Feeds}/>
        <Tab.Screen
          options={{tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="person"
            size={20}
            color="#fff" />
        )}}
          name="Profile"
          component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

