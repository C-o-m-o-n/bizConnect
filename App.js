import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './/screens/Home'
import SplashScreen from './/screens/SplashScreen'
import UploadScreen from './/screens/UploadScreen'
import Login from './/screens/Login'

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="UploadScreen"
          component={ UploadScreen }
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

