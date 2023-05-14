import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Alert, StyleSheet, KeyboardAvoidingView, View, TextInput, Image,ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as WebBrowser from 'expo-web-browser';
import { collection, addDoc } from "firebase/firestore"; 
import {auth} from './/../config/firebase';
import {db} from './/../config/firebase';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import DefaultUserPic from './/../assets/login-pic.png';
import { showMessage, hideMessage } from "react-native-flash-message";

// import GoogleSignIn from './/../components/Google_signin';



WebBrowser.maybeCompleteAuthSession();
export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setTignupPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
   //Login user
  const LogUserIn = async () => {
    
    if (!email) {
      showMessage({
            message: "Email Error",
            description: "you must have forgotten to enter your email. !!",
            type: "error",
          });
      
    }if (!password) {
      showMessage({
            message: "Password Error",
            description: "you must have forgotten to enter your password. !!",
            type: "error",
          });
    }else{
      setLoading(!loading)
      await signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        //console.log(userCredential.user);
        setLoading(loading)
      })
      showMessage({
        message: "success !!",
        description: "Login was successful",
        type: "success",
          });
      navigation.navigate("Profile")
    }
  };
  
  //CreateUser to firebase
  const CreateUser =() =>{
    if (!email && !password) {
      showMessage({
            message: "Credentials Error",
            description: "please enter email or password",
            type: "error",
          });
      
    } else if (!email) {
      showMessage({
            message: "Email Error",
            description: "please enter email",
            type: "error",
          });
    }else if (!password) {
      showMessage({
            message: "Password Error",
            description: "please enter password",
            type: "error",
          });
    }
    else{
      setLoading(!loading)
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
        setLoading(loading)
        showMessage({
            message: "success !!",
            description: "user added successfully",
            type: "success",
          });
        sendEmailVerification(user).then(() => {
        showMessage({
          message: "success !!",
          description: "Email verification sent!",
          type: "info",
          });
          
        });
        }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
      
    }
  };
 
  function Loader() {
    return (
    <View >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
  
  return (
     <View
      style={styles.container}>
      

           <Image
        style={{width:'95%', height:230, borderRadius:10, marginBottom:20,}}
        source={ DefaultUserPic }
      />
    {  loading && <Loader/> }
      <View style={styles.formContainer}>
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
     {/* <Text style={{ fontWeight:'bold', color:'#fff', alignSelf:'center'}}>or</Text>
         <TouchableOpacity
            style={styles.googleContainer}
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
              <Ionicons
                name="logo-google"
                size={32}
                color="red"
                style={styles.activityIcon}/>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>*/}
            </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    
  },
  inputOutline:{
    backgroundColor:'#efefef',
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:30,
    marginTop:10,
  },
  formContainer:{
    padding:15,
    backgroundColor:'#342352',
    marginHorizontal:5,
    width:'95%',
    borderRadius:20,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
  
  button:{
    backgroundColor:'#DCD7EB',
    height:40,
    marginTop:20,
    marginHorizontal:10,
    width:'40%',
    padding:5,
    borderRadius:30,
  },
  buttonOutlineText:{
    marginTop:5,
    alignSelf:'center',
    fontWeight:'300',
    fontSize:15,
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
