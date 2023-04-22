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
        headerColor="#cb16f5"
      >
        <Tab.Screen
          options={{tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-home"
            size={20}
            color="#9116f5" />
        )}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="UploadScreen"
          component={ UploadScreen }
        />
        <Tab.Screen
          name="Login"
          component={Login}
        />
        <Tab.Screen
          name="Feeds"
          component={Feeds}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
        />
      
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

