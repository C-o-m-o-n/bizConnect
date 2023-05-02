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
import BizconnectImg from './/../assets/Bizconnect-blue.png';
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
     
    <LinearGradient
      style={styles.container}
      colors={['#ef8d0bdc', 'transparent', '#ef8d0bdc']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
      

    {/*drawer modal*/}
    <View>
     <Modal
      animationType='fade'
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
               { if (auth.currentUser) {
               navigation.navigate("Profile")
               setModalVisible(!modalVisible)
               }else{
                 Alert.alert('please Login first before you access this page')
               }}}>
                  {auth.currentUser.photoURL ? ( <Image
                style={{width:30, height:30, borderRadius:30,}}
                source={{ uri: auth.currentUser.photoURL }} />): <Image
              style={{width:30, height:30, borderRadius:30,}}
              source={DefaultUserPic}/>}
            </Pressable>): 
            <Pressable
              onPress={() =>Alert.alert('please Login first before you access this page')}>
             <Image
              style={{width:30, height:30, borderRadius:30,}}
              source={DefaultUserPic}/>
              </Pressable>}
              </View>
              {/*bizConnect*/}
              <View style={styles.bizConnect}>
                  <TextInput
          style={styles.searchInp}
          placeholder="search"
          value={search}
          onChangeText={text=> setSearch(text)}
          />
          <TouchableOpacity
            style={styles.searchIcon}
          >
          <Ionicons
            name="search"
            color="#fff"
            size={20}/>
          </TouchableOpacity>
              </View>
              
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons
                      name="close"
                      color="#fff"
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
        name="log-in-outline">
       <Text > Login </Text>
      </Ionicons>
    </TouchableOpacity>
        
    <TouchableOpacity
      style={styles.link}
      onPress={()=>{
        Logout()
        setModalVisible(modalVisible);}
      }>
         <Ionicons
        style={styles.linkText}
        name="log-out-outline">
       <Text > Logout </Text>
      </Ionicons>
    </TouchableOpacity>
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
            name="grid-outline"
            color="#21180f"
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
          
        }}
        source={BizconnectImg}
       />
       </View>
       
       
       <View style={styles.objectBottom}>
        <View style={styles.objectBottomTxt}>
           <Text style={{color:'#fff', fontWeight:'bold', }}>Welcome</Text>
          <Text style={{color:'#fff'}}>Get Started with your bizConnect</Text>
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
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  objectTop:{
    marginTop:40,
    flexDirection:'row',
    
  },
  searchInp:{
    backgroundColor:'#fff',
    borderRadius:10,
    marginHorizontal:5,
    width:WIDTH-130,
  },
  searchIcon:{
    marginTop:3,
    marginHorizontal:5,
  },
  link:{
    alignSelf:'center',
    height:50,
    width:WIDTH-59,
    padding:5,
    borderRadius:30,
    marginTop:10,
    backgroundColor:'#fff',
  },
  linkText:{
    alignSelf:'center',
    marginTop:10,
    fontWeight:'300',
    fontSize:18,
  },
  menuBar:{
    marginTop:10,
    marginHorizontal:20,
  },
  modalContainer:{
    width:WIDTH,
    height:HEIGHT_MODAL,
    backgroundColor:'#13110f',
    
  },
  modalTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:1,
    marginTop:30,
  },
  profilePic:{
    marginHorizontal:2,
    marginTop:3,
  
  },
  bizConnect:{
    flexDirection:'row',
    marginTop:5,
  },
  closeModal:{
    marginTop:3,
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
    borderTopLeftRadius:20,
    height:HEIGHT_MODAL-200,
    backgroundColor:'#0c0c0fdc'
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
    backgroundColor:'#fff',
    
  },
  
});