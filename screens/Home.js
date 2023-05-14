import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";

import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './/Login'
import UploadScreen from './/UploadScreen'
import SplashScreen from './/SplashScreen'
import DefaultUserPic from './/../assets/user.jpg';
import BizconnectImg from './/../assets/Hands_holding_business_plan-removebg-preview.png';
import BizconnectOrange from './/../assets/Bizconnect3.png';
import homeBl from './/../assets/home-blog.png';
import homePh from './/../assets/home-phone.png';
import angel from './/../assets/analyses.png';

import { getAuth, signOut } from "firebase/auth";
import {db} from './/../config/firebase';
import firebase from 'firebase/auth'

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  
  const Logout=()=>{
    const user = auth.currentUser;
    if (user !== null) {
      signOut(auth).then(() => {
      Alert.alert('Loggedout successfully')}
      ).catch((error) => {
  //Alert.alert('Not .... Loggedout successfully')
    console.log(error);
  })}else{
      Alert.alert('You are not logged in!')
    };

  }
  return (
     
    <View style={styles.container}>
    {/*drawer modal*/}
    <View>
     <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{
        
        setModalVisible(!modalVisible);
      }}>

        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
          <View style={ styles.profilePic} >
           {auth.currentUser ? ( <Pressable
              onPress={() =>
               { if (auth.currentUser) {
               navigation.navigate("Profile")
               setModalVisible(!modalVisible)
               }else{
                 Alert.alert('please Login first before you access this page')
               }}}>
                  {auth.currentUser.photoURL ? ( <Image
                style={{width:40, height:40, borderRadius:30,}}
                source={{ uri: auth.currentUser.photoURL }} />): <Image
              style={{width:40, height:40, borderRadius:30,}}
              source={DefaultUserPic}/>}
            </Pressable>): 
            <Pressable
              onPress={() =>Alert.alert('please Login first before you access this page')}>
             <Image
              style={{width:40, height:40, borderRadius:30,}}
              source={DefaultUserPic}/>
              </Pressable>}
              </View>
              {/*bizConnect*/}
              <View style={styles.bizConnect}>
                  
              </View>
              
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons
                      name="close"
                      color="#fff"
                      size={39}>
                    </Ionicons>
                </Pressable>
              </View>
             </View>

      <View style={[styles.modalItems, {flexGrow:1}]}>
        <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        navigation.navigate("Login")
        setModalVisible(modalVisible)}
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
        navigation.navigate("Jobs")
        setModalVisible(modalVisible);}
      }>
      <Ionicons
        style={styles.linkText}
        name="log-in-outline">
       <Text > Jobs </Text>
      </Ionicons>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.link}
      onPress={()=>{
      if (auth.currentUser===null) {
      setModalVisible(!modalVisible)
      showMessage({
      message: "Login Error",
      description: "Please Login first to access this page !!!",
      type: "error",})
        
      }else{
      setModalVisible(modalVisible);
      navigation.navigate("UploadScreen")
      }}
      }>
      <Ionicons
        style={styles.linkText}
        size={23}
        name="cloud-upload-outline">
       <Text > Post a job </Text>
      </Ionicons>
    </TouchableOpacity>
        
    <TouchableOpacity 
    style={styles.link}
      onPress={()=>{
        Alert.alert("sorry this feature is still under developement")
      }
      }>
       <Ionicons
        style={styles.linkText}
        name="share-outline"
        color="#21180f"
        size={33}>
       <Text > Share Profile </Text>
      </Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
      onPress={()=>{
        Alert.alert("sorry this feature is still under developement")
      }}>
      <Ionicons
        style={styles.linkText}
        name="star-outline"
        color="#21180f"
        size={33}>
       <Text > Review </Text>
      </Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={()=>{
        Alert.alert("sorry this feature is still under developement")
      }}>
       <Ionicons
        style={styles.linkText}
        name="add"
        color="#21180f"
        size={33}>
       <Text > Invite friends </Text>
      </Ionicons>
     </TouchableOpacity>
  
      </View> 
        <TouchableOpacity
      style={styles.logoutlink}
      onPress={()=>{
        Logout()
        setModalVisible(modalVisible);}
      }>
         <Ionicons
        style={styles.logoutText}
        name="log-out-outline">
       <Text > Logout </Text>
      </Ionicons>
    </TouchableOpacity>
    <View style={{alignSelf:'center',}}>
        <Image
        style={{
          width:70,
          height:70,
          }}
        source={BizconnectOrange}
       />
       <Text style={{color:'#fabc66'}}> version 1.0.0 </Text>
       </View>
    </View>
    </Modal>

    {/*end of drawer modal*/}
    <View style={styles.userscreen}>
     <View style={styles.objectTop}>
        <TouchableOpacity
          onPress={()=>{
            setModalVisible(!modalVisible);}}
          style={styles.drawer}>
           <Ionicons
            name="grid"
            color="#342352"
            size={23}
            style={styles.menuBar}>
           </Ionicons>
        </TouchableOpacity>
      </View>
    
       <View style={styles.objectCenter}>
        <Image
        style={{
          width:400,
          height:300,
          alignSelf:'center',
          justifyContent:'center'
        }}
        source={BizconnectImg}
       />
       </View>
       
       
       <View style={styles.objectBottom}>
        <View style={styles.objectBottomTxt}>
           <Text style={{color:'#DCD7EB', fontWeight:'bold', }}>Welcome</Text>
          <Text style={{color:'#DCD7EB'}}>Get Started with your bizConnect</Text>
        </View>
          
          <View style={styles.objectBottomBtns}>
             <TouchableOpacity
              style={styles.objectBottomBtn}
              onPress={()=>{
                navigation.navigate('Jobs')
              }}>
              <Text style={{
                  alignSelf:'center',
                  marginTop:10,
                  fontWeight:'300',
                  fontSize:18,}}> Find a job </Text>
             </TouchableOpacity >
             <TouchableOpacity
              onPress={()=>{
                if (auth.currentUser===null) {
                  showMessage({
                    message: "Login Error",
                    description: "Please Login first to access this page !!!",
                    type: "error",
                    });
                }else{
                  navigation.navigate("UploadScreen")}
                }
              }
              style={styles.objectBottomBtn}>
              <Text style={{
                  alignSelf:'center',
                  marginTop:10,
                  fontWeight:'300',
                  fontSize:18,}}> Post a job </Text>
             </TouchableOpacity>
             <TouchableOpacity
              onPress={()=>{
                if (auth.currentUser===null) {
                  showMessage({
                    message: "Login Error",
                    description: "Please Login first to access this page !!!",
                    type: "error",
                    });
                }else{
                  navigation.navigate("Profile")}
                }
              }
             style={styles.objectBottomBtn}>
              <Text
                style={{
                  alignSelf:'center',
                  marginTop:10,
                  fontWeight:'300',
                  fontSize:18,}}>
                  My Account </Text>
             </TouchableOpacity>
          </View>
       </View>
    </View>
           
    </View>  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#DCD7EB',
  },
  objectTop:{
    marginTop:40,
    flexDirection:'row',
    
  },
  link:{
    height:40,
    width:WIDTH-110,
    padding:5,
    margin:10,
    
    borderBottomWidth:1,

  },
  logoutlink:{
    height:40,
    width:WIDTH-110,
    padding:5,
    margin:10,
    
    borderTopWidth:1,
  },
  linkText:{
    marginTop:10,
    fontWeight:'300',
    fontSize:18,
    color:"#DCD7EB",
  },
  logoutText:{
    fontWeight:'300',
    fontSize:18,
    color:"#fff",
  },
  menuBar:{
    marginTop:10,
    marginHorizontal:20,
  },
  modalContainer:{
    width:WIDTH-100,
    height:HEIGHT_MODAL,
   /*backgroundColor:'#13110f',*/
    backgroundColor:'#342352',
    borderRadius:10,
  },
  modalTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:1,
    marginTop:10,
  },
  profilePic:{
    marginHorizontal:2,
    marginTop:3,
    borderColor:'#DCD7EB',
    borderWidth:2,
    borderRadius:50,
  },
  
  bizConnect:{
    flexDirection:'row',
    marginTop:5,
  },
  closeModal:{
    marginTop:5,
    marginHorizontal:5,
  },
  userscreen:{
    width:WIDTH,
    height:HEIGHT_MODAL,
    
    alignSelf:'center',
    borderRadius:10,
  },
  objectCenter:{
    height:HEIGHT_MODAL-400,
    flexDirection:'column',
    justifyContent:'center',
    
  },
  objectBottom:{
    borderTopLeftRadius:40,
    height:HEIGHT_MODAL-200,
    backgroundColor:'#342352'
  },
  objectBottomTxt:{
    marginTop:29,
    flexDirection:'column',
    alignItems:'center',
  },
  objectBottomBtns:{
    marginTop:29,
    flexDirection:'column',
    alignItems:'center',
  },
  
  objectBottomBtn:{
    height:50,
    width:WIDTH-59,
    padding:5,
    borderRadius:30,
    marginTop:10,
    backgroundColor:'#DCD7EB',
    
  },
  
});