import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './/Login'
import UploadScreen from './/UploadScreen'
import SplashScreen from './/SplashScreen'
//import auth from './/../config/firebase';
import { getAuth } from "firebase/auth";
import {db} from './/../config/firebase';
import firebase from 'firebase/auth'

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()
export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const showUser = () =>{
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      console.log("uid:", uid);
      console.log("photoURL:", photoURL);
      console.log("email: ", email);
      console.log("displayName: ", displayName);
      console.log(auth.currentUser.photoURL);
    }else{
      console.log('no user');
    }
    
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#cb16f5', 'transparent', '#9116f5']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
    <TouchableOpacity
      onPress={()=>{
        setModalVisible(!modalVisible);}}
      style={styles.drawer}>
       <Ionicons
        name="grid"
        color="#fff"
        size={20}
        style={styles.menuBar}>
       </Ionicons>
    </TouchableOpacity>
    
    {/*drawer modal*/}
     <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{
        Alert.alert("drawer closed");
        setModalVisible(!modalVisible);
      }}>
      
      
      
        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
          <View style={ styles.profilePic} >
           {auth.currentUser ? ( <Pressable
              onPress={() =>
               { navigation.navigate("Profile")
              setModalVisible(!modalVisible)}}>
                   <Image
                style={{width:40, height:40, borderRadius:40,}}
                source={{ uri: auth.currentUser.photoURL }} />
            </Pressable>): null}
              </View>
              
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons
                      name="close"
                      size={29}>
                    </Ionicons>
                </Pressable>
              </View>
             </View>

      <View style={styles.modalItems}>
        <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        navigation.navigate("Login")
        setModalVisible(modalVisible);}
      }>
         <Ionicons
        style={styles.linkText}
        name="log-in-outline">
       <Text > Login </Text>
      </Ionicons>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        navigation.navigate("UploadScreen")
        setModalVisible(modalVisible);}
      }>
         <Ionicons
        style={styles.linkText}
        size={23}
        name="cloud-upload-outline">
       <Text > Upload </Text>
      </Ionicons>
    </TouchableOpacity>
        <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        navigation.navigate("Login")
        setModalVisible(modalVisible);}
      }>
      <Ionicons
        style={styles.linkText}
        name="log-in">
       <Text > Login </Text>
      </Ionicons>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        navigation.navigate("UploadScreen")
        setModalVisible(modalVisible);}
      }>
         <Ionicons
        style={styles.linkText}
        name="cloud-upload">
       <Text > Upload </Text>
      </Ionicons>
    </TouchableOpacity>
      </View> 
    </View>
    </Modal>
    
    
    {/*end of drawe modal*/}
    
    <View style={styles.user}>
       <TouchableOpacity
        onPress={showUser}
       >
       <Text> showUser </Text>
       </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  link:{
    marginTop:20,
    marginHorizontal:5,
    padding:5,
    borderRadius:30,
    backgroundColor:'#4113a2a7'
  },
  linkText:{
    marginHorizontal:20,
    marginTop:10,
    marginBottom:10,
    color:'#fff',
    fontSize:16,
  },
  menuBar:{
    marginTop:6,
    marginHorizontal:5,
  },
  modalContainer:{
    width:WIDTH-100,
    height:HEIGHT_MODAL,
    paddingTop: 10,
    backgroundColor:'#93899bf7',
    borderRadius:10,
  },
  modalTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:1,
  },
  profilePic:{
    marginHorizontal:5,
  },
  closeModal:{
    modalTop:1,
    alignSelf:'flex-end',
    marginHorizontal:5,
  },
  user:{
    alignSelf:'center'
  }
});