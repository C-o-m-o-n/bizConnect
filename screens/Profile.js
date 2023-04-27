import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {launchImageLibraryAsync } from 'expo-image-picker'
import { getAuth, updateProfile } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import DefaultUserPic from './/../assets/user.jpg';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()
export default function Profile({navigation}) {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [name, setName] = useState(null);
  const [uploading, setUploading] = useState();
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  //const [isLogedIn, setIsLogedIn] = useState();
  
  const selectImage = async () => {
    const options = { mediaTypes: 'Images' };
    const img = await launchImageLibraryAsync(options);
    setImage(img.assets[0].uri);
    setShowImage(img);
    const newPic = ({
      uri: img.assets[0].uri,
      type:`test/${ img.assets[0].uri.indexOf(".")+3}`,
      name:`test.${ img.assets[0].uri.indexOf(".")+3}`,
    })
    setNewImage(newPic)
  };
  
  
  const uploadImage = (pic) => {
    setUploading(true)
    const data = new FormData();
    data.append('file', pic)
    data.append('upload_preset', 'bizConnect')
    data.append('cloud_name', 'dqb01jzej')
    
    fetch('https://api.cloudinary.com/v1_1/dqb01jzej/image/upload', {
      method:'post',
      body:data,
    }).then(res => res.json()).then(
      data=>{
        setImageURL(data.url)
        console.log("imageURL: ", imageURL);
        console.log("name: ", name);
        Alert.alert("picture uploaded successfully!")})
  }
  const UpdateProfile = ()=>{
    auth_usr = getAuth()
    user = auth_usr.currentUser
    if (user !== null) {
      updateProfile(user, {
        displayName: name,
        photoURL: imageURL }).then(() => {
        console.log("updated");
        Alert.alert("Profile updated!")
      }).catch((error) => {
        Alert.alert("An error occurred")
      });
    }else{
      Alert.alert("please login first")
    }
}


  return (
    <LinearGradient
      style={styles.container}
      colors={['#ef8d0bdc', 'transparent', '#ef8d0bdc']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
     {/*from firebase*/}
     
     <View style={styles.TopContainer}>
     <TouchableOpacity
      onPress={()=>navigation.navigate('Home')}>
      <Ionicons
           style={styles.backIcon}
            name="return-up-back"
            size={33}
           />
      </TouchableOpacity>
        <Text style={styles.detailsName}>{auth.currentUser.displayName}</Text>
     </View>
     
     <View style={styles.xyx}>
       
     <View style={styles.profilecontainer}>
        <View style={styles.profilePicContainer}>
            {auth.currentUser.photoURL ? ( <Image
                style={styles.profilePicture}
                source={{ uri: auth.currentUser.photoURL }} />): 
                <Image
              style={styles.profilePicture}
              source={DefaultUserPic}/>
              }
           
      </View>
      <View style={styles.profileText}>
        <View style={styles.profileTextContainer}>
           <View style={{marginTop:10,}}>
              <Text style={{marginHorizontal:20,fontWeight:500,  color:'#fff', alignSelf:'center',}}> Name:
           </Text>
           <Text style={{fontWeight:400,alignSelf:'center',  color:'#fff',}}>{auth.currentUser.displayName}</Text>
           </View>
           
          <View style={{marginTop:10,}}>
              <Text style={{marginHorizontal:20,fontWeight:500,  color:'#fff', alignSelf:'center',}}> Email:
           </Text>
            <Text style={{fontWeight:400,alignSelf:'center', color:'#fff'}}>{auth.currentUser.email}</Text>
          </View>
            </View>
      </View>
        </View>
        
        <View >
          <TouchableOpacity
          onPress={()=>{
            setModalVisible(!modalVisible);}}
          style={styles.updateBtn}>
           <Ionicons
            name="grid-outline"
            color="#21180f"
            size={23}
            style={styles.menuBar}>
           </Ionicons>
           <Text > Update Profile</Text>
        </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            setModalVisible(!modalVisible);}}
          style={styles.updateBtn}>
           <Ionicons
            name="grid-outline"
            color="#21180f"
            size={23}
            style={styles.menuBar}>
           </Ionicons>
           <Text > Update Profile</Text>
        </TouchableOpacity>
       </View>
       
       
         <View style={{backgroundColor:'#21180f', borderTopLeftRadius:60,}}>
            <Text>  </Text>
            <Text>  </Text>
         </View>
         
         
       </View>
      
    
     {/*from firebase end */}
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
      
        <Text style={styles.detailsEmail}>{auth.currentUser.email}</Text>
        
        </View>
     <View style={styles.modalItems}>
      {showImage &&
        <Image
          source={{ uri: showImage.uri }}
          style={styles.ProfilePic} 
        />}
         
      <TextInput placeholder="Enter new Name" value={name} onChangeText={(text) => setName(text)} />
      <TouchableOpacity
        style={styles.buttons}
       onPress={selectImage} >
       <Text> change Image </Text>
       </TouchableOpacity>
       
       <TouchableOpacity
        style={styles.buttons}
        onPress={()=>uploadImage(newImage)}>
        <Text> upload Image </Text>
       </TouchableOpacity>
       
      <TouchableOpacity
        style={styles.buttons}
        onPress={UpdateProfile}>
        <Text> update Profile </Text>
      </TouchableOpacity>
       
       </View>
      </View>

     
    </Modal>
     <View style={styles.BottomContainer}>
       <View style={styles.BottomItems}>
          <View style={styles.BottomItem}>
             <Text> item 1 </Text>
          </View>
       </View>
      
      </View> 
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TopContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
  },
  backIcon:{
    color:'#fff',
    marginHorizontal:5,
  },
  detailsName:{
    marginHorizontal:17,
    fontSize:20,
    fontWeight:500,
  },
  xyx:{
    flexDirection:'column',
    alignSelf:'center',
    backgroundColor:'#dfd',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  profilecontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:WIDTH,
    margin:0,
  },
  profilePicture:{
    alignSelf:'center',
    marginTop:10,
    marginHorizontal:10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    width:WIDTH-200,
    height:HEIGHT_MODAL-600,
    marginBottom:10,
  },
  profileText:{
    alignSelf:'center',
    marginTop:10,
    marginHorizontal:10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    width:WIDTH-200,
    height:HEIGHT_MODAL-600,
    backgroundColor:'#ddd',
    marginBottom:10,
  },
  profileTextContainer:{
    alignSelf:'center',
    marginTop:10,
    marginHorizontal:10,
    marginBottom:10,
  },
  updateBtn:{
    flexDirection:'row',
    justifyContent:'center',
    marginHorizontal:100,
    marginBottom:10,
    borderRadius:30,
    backgroundColor:'#ddd',
    padding:10,
    width:WIDTH-200,
  },
  
  details:{
    marginTop:0,
    backgroundColor:'blue',
    borderTopLeftRadius:20,
  },
  activityIcon:{
    marginHorizontal:5,
  },
  detailsEmail:{
    marginTop:5,
    alignSelf:'center',
    fontSize:25,
    color:'#21180f',
    fontWeight:500,
  },
  
  detailsIcons:{
    alignSelf:'center',
    flexDirection:'row',
    marginHorizontal:5,
  },
  detailsIcon:{
    color:'#718f00a7',
    marginHorizontal:5,
  },
  
  BottomContainer:{
    backgroundColor:'#21180f',
  },
  
  buttons:{
    marginTop:5,
    padding:10,
    width:200,
    backgroundColor:'#dff',
  },
  ProfilePic:{
    width:70,
    height:70,
  },
  modalTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
  },
  modalContainer:{
    backgroundColor:'green',
  },
});










   


