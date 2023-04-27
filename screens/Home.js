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
import Ionicons from '@expo/vector-icons/Ionicons';
import Login from './/Login'
import UploadScreen from './/UploadScreen'
import SplashScreen from './/SplashScreen'
import DefaultUserPic from './/../assets/user.jpg';
import homeBl from './/../assets/home-blog.png';
import homePh from './/../assets/home-phone.png';
import angel from './/../assets/analyses.png';

import { getAuth } from "firebase/auth";
import {db} from './/../config/firebase';
import firebase from 'firebase/auth'

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()
export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  
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
      colors={['#ef8d0bdc', 'transparent', '#ef8d0bdc']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
      

    {/*drawer modal*/}
    <View>
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
               { if (auth.currentUser) {
               navigation.navigate("Profile")
               setModalVisible(!modalVisible)
               }else{
                 Alert.alert('please Login')
               }
                 }}>
                   <Image
                style={{width:30, height:30, borderRadius:30,}}
                source={{ uri: auth.currentUser.photoURL }} />
            </Pressable>): 
             <Image
              style={{width:30, height:30, borderRadius:30,}}
              source={DefaultUserPic}/>}
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
          <Text style={{alignSelf:'center', fontWeight:'bold',
            fontSize:40,
            color:'#21180f'
          }}>
          BIZCONNECT </Text>
       </View>
       
       
       <View style={styles.objectBottom}>
        <View style={styles.objectBottomTxt}>
           <Text style={{color:'#fff', fontWeight:'bold', }}>Welcome</Text>
          <Text style={{color:'#fff'}}>Get Started with your bizConnect</Text>
        </View>
          
          <View style={styles.objectBottomBtns}>
             <TouchableOpacity style={styles.objectBottomBtn}>
              <Text style={{
                  alignSelf:'center',
                  marginTop:10,
                  fontWeight:'300',
                  fontSize:18,}}> Find a job </Text>
             </TouchableOpacity >
             <TouchableOpacity
              onPress={()=>{
                navigation.navigate("UploadScreen")}}
              style={styles.objectBottomBtn}>
              <Text style={{
                  alignSelf:'center',
                  marginTop:10,
                  fontWeight:'300',
                  fontSize:18,}}> Post a job </Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.objectBottomBtn}>
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
    marginTop:20,
    marginHorizontal:5,
    padding:5,
    borderRadius:30,
    backgroundColor:'#ef8d0bdc'
  },
  linkText:{
    marginHorizontal:20,
    marginTop:10,
    marginBottom:10,
    color:'#fff',
    fontSize:16,
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
    borderRadius:20,
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