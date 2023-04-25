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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {launchImageLibraryAsync } from 'expo-image-picker'
import { getAuth, updateProfile } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import DefaultUserPic from './/../assets/user.jpg';

const auth = getAuth()
export default function Profile() {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [name, setName] = useState(null);
  const [uploading, setUploading] = useState();
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');
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
      colors={['#cb16f5', 'transparent', '#9116f5']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
     {/*from firebase*/}
     <View style={styles.profilecontainer}>
        <View style={styles.profilePicContainer}>
            {auth.currentUser.photoURL ? ( <Image
                style={styles.profilePicture}
                source={{ uri: auth.currentUser.photoURL }} />): 
                <Image
              style={styles.profilePicture}
              source={DefaultUserPic}/>
              }
           <Text style={{marginHorizontal:20,fontWeight:'500',}}>
           
           </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsEmail}>{auth.currentUser.email}</Text>
        <Text style={styles.detailsName}>{auth.currentUser.displayName}</Text>
        <View style={styles.detailsIcons}>
           <Ionicons
           style={styles.detailsIcon}
            name="star"
            size={23}
           />
           <Ionicons
            style={styles.detailsIcon}
            name="star"
            size={23}
           />
           <Ionicons
            style={styles.detailsIcon}
            name="star-half-outline"
            size={23}
           />
           <Ionicons
            style={styles.detailsIcon}
            name="star-outline"
            size={23}
           />
           <Ionicons
            style={styles.detailsIcon}
            name="star-outline"
            size={23}
           />
        </View>
        </View>
        
      <View style={styles.details}>
        <Text style={styles.detailsEmail}>test</Text>
        <Text style={styles.detailsName}>hey</Text>
        </View>
      </View>

         <View style={{margin:8,}}>
      </View>
     {/*from firebase end */}
       <TouchableOpacity 
       onPress={selectImage} >
       <Text> change Image </Text>
       </TouchableOpacity>
       
      {showImage &&
        <Image
          source={{ uri: showImage.uri }}
          style={styles.ProfilePic} 
        />}
         <Text>Collins Omondi</Text>
      <TextInput placeholder="Enter new Name" value={name} onChangeText={(text) => setName(text)} />
      <TouchableOpacity
        onPress={UpdateProfile}>
        <Text> update Profile </Text>
      </TouchableOpacity>
      
      {auth.currentUser.photoURL ? (
        <View>
          <Text>Image URL:</Text>
          <Text>{auth.currentUser.photoURL}</Text>
        </View>
      ) : null}
      
       <TouchableOpacity
        onPress={()=>uploadImage(newImage)}>
        <Text> upload Image </Text>
       </TouchableOpacity>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ProfilePic:{
    width: 70,
    height: 70,
    borderRadius:50,
    marginHorizontal:30,
  },
  profilecontainer:{
    flexDirection:'row',
    marginTop:3,
    backgroundColor:'#efefef',
    borderRadius:10,
    flexDirection:'row',
    justifyContent: 'center',
    marginHorizontal:5,
  },
  profilePicture:{
    marginHorizontal:5,
    marginTop:10,
    width:70,
    height:70,
    borderRadius:50,
  },
  details:{
    border:2,
    paddingTop:6,
    margin:5,
    paddingHorizontal:5,
    backgroundColor:'#fff',
    borderRadius:10,
    
  },
  activityIcon:{
    marginHorizontal:5,
  },
  detailsEmail:{
    marginTop:5,
    alignSelf:'center',
    fontSize:15,
    fontWeight:'500',
  },
  detailsName:{
    alignSelf:'center',
    marginHorizontal:17,
    fontSize:20,
    fontWeight:'500',
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
});










   


