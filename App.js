import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './/screens/Home'
import UploadScreen from './/screens/UploadScreen'
import Login from './/screens/Login'

export default function App() {
  return (
    <UploadScreen/>
    
  );
}

