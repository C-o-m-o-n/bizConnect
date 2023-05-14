import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";


import { getAuth }from "firebase/auth";

const auth = getAuth();
const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      const user = auth.currentUser;
      if (user !== null) {
        navigation.navigate( "Home" );
        console.log(user);
      }else{
        navigation.navigate( "Login" );
      }
    }, 5000);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#91bbfa61" }}
    >
      <View style={styles.container}>
        <Image
          source={require(".//../assets/Hands_holding_business_plan-removebg-preview.png")}
          style={{
            width: "90%",
            resizeMode: "contain",
            margin: 30,
          }}
        /> 
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white",
        }}
      >welcome to bizConnect
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "white",
        }}>
      
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});