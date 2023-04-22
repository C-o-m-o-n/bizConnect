import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Alert, StyleSheet, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as WebBrowser from 'expo-web-browser';
import { collection, addDoc } from "firebase/firestore"; 
import {auth} from './/../config/firebase';
import {db} from './/../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import {Ionicons} from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setTignupPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  
   //Login user
  const LogUserIn = async () => {
    if (!email) {
      Alert.alert('please enter email')
    }if (!password) {
      Alert.alert('please enter password')
    }else{
      await signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        //console.log(userCredential.user);
      })
      Alert.alert('Login was successful')
      navigation.navigate("UploadScreen")
    }
  };
  
  //CreateUser to firebase
  const CreateUser =() =>{
    if (!email && !password) {
      Alert.alert('please enter email or password')
    } else if (!email) {
      Alert.alert('please enter email')
    }else if (!password) {
      Alert.alert('please enter password')
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("user added successfully")}).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
      
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behaviour="padding"
      >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputOutline}
          placeholder="Email"
          value={email}
          onChangeText={text=> setEmail(text)}
          />
           
        <TextInput
          style={styles.inputOutline}
          placeholder="Password"
          value={password}
          onChangeText={text=> setPassword(text)}
          secureTextEntry
          />
      </View>
      <View
        style={styles.buttonContainer} >
        <TouchableOpacity
        onPress={LogUserIn}
          style={styles.button}>
          <Text
            style={styles.buttonOutlineText}>
            Login
         </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={CreateUser}
          style={styles.button}
        >
          <Text
            style={styles.buttonOutlineText}>
            Register
         </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontWeight:'bold',}}>or</Text>
         <TouchableOpacity
            style={styles.googleContainer}
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
              <Ionicons
                name="logo-google"
                size={32}
                color="red"
                style={styles.activityIcon}/>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
        
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    width: '80%',
  },
  inputOutline:{
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:10,
  },
  buttonContainer:{
    
    flexDirection:'row',
    justifyContent:'center'
  },
  button:{
    backgroundColor:'teal',
    margin:10,
    marginTop:20,
    width:'35%',
    padding:10,
    borderRadius:10,
  },
  buttonOutlineText:{
    marginHorizontal:30,
    fontWeight:'400',
    color:'#fff',
  },
  googleContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    flexDirection:'row',
    alignSelf:"center",
    width:290,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:20,
  },
  googleButtonText: {
    fontSize: 18,
    marginHorizontal:15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    
  },
});
