import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './/Login'
import UploadScreen from './/UploadScreen'
import SplashScreen from './/SplashScreen'


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.link}
      onPress={()=>navigation.navigate("Login")}>
       <Text> Login </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.link}
      onPress={()=>
        navigation.navigate("UploadScreen")}>
       <Text> Upload </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    marginTop:10,
    padding:12,
    borderRadius:30,
    backgroundColor:"red"
  },
});