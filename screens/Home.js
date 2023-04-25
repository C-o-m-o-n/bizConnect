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

  const ListAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
    getAuth().listUsers(10, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.
//listAllUsers();

  return (
     
    <LinearGradient
      style={styles.container}
      colors={['#cb16f5', 'transparent', '#9116f5']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
      
      <View style={styles.objectTop}>
        <TouchableOpacity
          onPress={()=>{
            setModalVisible(!modalVisible);}}
          style={styles.drawer}>
           <Ionicons
            name="grid"
            color="#fff"
            size={30}
            style={styles.menuBar}>
           </Ionicons>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInp}
          placeholder="search"
          value={search}
          onChangeText={text=> setSearch(text)}
          />
          <TouchableOpacity>
          <Ionicons
            name="search"
            color="#fff"
            size={30}
            style={styles.menuBar}/>
          </TouchableOpacity>
      </View>
    
    {/*drawer modal*/}
    <ScrollView>
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
                style={{width:40, height:40, borderRadius:40,}}
                source={{ uri: auth.currentUser.photoURL }} />
            </Pressable>): 
             <Image
              style={{width:40, height:40, borderRadius:40,}}
              source={DefaultUserPic}/>}
              </View>
              {/*bizConnect*/}
              <View style={styles.bizConnect}>
                 <Text style={styles.bizConnectText}>  bizConnect </Text>
              </View>
              
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons
                      name="moon"
                      size={29}>
                    </Ionicons>
                </Pressable>
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
    <ListAllUsers/>
    <View style={styles.users}>
      <View style={styles.usersTop}>
    <Image
      style={{width:40, height:40, borderRadius:40,}}
      source={DefaultUserPic}/>
        <Text style={styles.userDet}> collo </Text>
        <Text style={styles.userDet}> 12335 </Text>
         <Ionicons
        name="flower"
        size={20}
        style={styles.userDet}/>
      </View>
      <View style={{
        backgroundColor:'#efefef',
        height:1,}}></View>
       <View style={styles.useExp}>
       <Image
        style={{width:320, height:170, margin:10,}}
      source={angel}/>
          <Text style={{margin:5}}>Adipisicing voluptate sint nostrud anim elit ex in et culpa qui. Excepteur officia Lorem nostrud duis sunt incididunt nisi.</Text>
       </View>
       </View>
    <View style={styles.users}>
      <View style={styles.usersTop}>
    <Image
      style={{width:40, height:40, borderRadius:40,}}
      source={DefaultUserPic}/>
        <Text style={styles.userDet}> collo </Text>
        <Text style={styles.userDet}> 12335 </Text>
         <Ionicons
        name="flower"
        size={20}
        style={styles.userDet}/>
      </View>
      <View style={{
        backgroundColor:'#efefef',
        height:1,}}></View>
       <View style={styles.useExp}>
       <Image
        style={{width:320, height:170, margin:10,}}
      source={angel}/>
          <Text style={{margin:5}}>Adipisicing voluptate sint nostrud anim elit ex in et culpa qui. Excepteur officia Lorem nostrud duis sunt incididunt nisi.</Text>
       </View>
       </View>
    <View style={styles.users}>
      <View style={styles.usersTop}>
    <Image
      style={{width:40, height:40, borderRadius:40,}}
      source={DefaultUserPic}/>
        <Text style={styles.userDet}> collo </Text>
        <Text style={styles.userDet}> 12335 </Text>
         <Ionicons
        name="flower"
        size={20}
        style={styles.userDet}/>
      </View>
      <View style={{
        backgroundColor:'#efefef',
        height:1,}}></View>
       <View style={styles.useExp}>
       <Image
        style={{width:320, height:170, margin:10,}}
      source={angel}/>
          <Text style={{margin:5}}>Adipisicing voluptate sint nostrud anim elit ex in et culpa qui. Excepteur officia Lorem nostrud duis sunt incididunt nisi.</Text>
       </View>
       </View>
    <View style={styles.users}>
      <View style={styles.usersTop}>
    <Image
      style={{width:40, height:40, borderRadius:40,}}
      source={DefaultUserPic}/>
        <Text style={styles.userDet}> collo </Text>
        <Text style={styles.userDet}> 12335 </Text>
         <Ionicons
        name="flower"
        size={20}
        style={styles.userDet}/>
      </View>
      <View style={{
        backgroundColor:'#efefef',
        height:1,}}></View>
       <View style={styles.useExp}>
       <Image
        style={{width:320, height:170, margin:10,}}
      source={angel}/>
          <Text style={{margin:5}}>Adipisicing voluptate sint nostrud anim elit ex in et culpa qui. Excepteur officia Lorem nostrud duis sunt incididunt nisi.</Text>
       </View>
       </View>
    </ScrollView>  
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  objectTop:{
    flexDirection:'row',
    
  },
  searchInp:{
    padding:4,
    backgroundColor:'#fff',
    borderRadius:15,
    width:WIDTH-100,
    marginTop:5,
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
    marginTop:10,
    marginHorizontal:10,
  },
  modalContainer:{
    marginTop:55,
    width:WIDTH-100,
    height:HEIGHT_MODAL-54,
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
  bizConnect:{
    marginTop:10,
  },
  bizConnectText:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:20,
  },
  closeModal:{
    modalTop:1,
    alignSelf:'flex-end',
    marginHorizontal:5,
  },
  users:{
    width:WIDTH-20,
    marginTop:10,
    backgroundColor:'#fff',
    alignSelf:'center',
    borderRadius:10,
  },
  usersTop:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  userDet:{
    marginHorizontal:10,
    marginTop:20,
  },
  
});