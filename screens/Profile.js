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
    auth = getAuth()
    user = auth.currentUser
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
                source={{ uri: auth.currentUser.photoURL }} />): null }
           <Text style={{marginHorizontal:20,fontWeight:'500',}}>
           {auth.currentUser.displayName}
           </Text>
        </View>
        <View style={styles.activity}>
        <Ionicons
          name="analytics"
          size={42}
          color="teal"
          style={styles.activityIcon}/>
           <Text style={styles.activityTxt}>donated</Text>
           <Text style={styles.activityNum}>65</Text>
        </View>
        <View style={styles.activity}>
       <Ionicons
          name="sync"
          size={42} color="teal"
          style={styles.activityIcon}/>
           <Text style={styles.activityTxt}>recycled</Text>
           <Text style={styles.activityNum}>45</Text>
        </View>
        <View style={styles.activity}>
           <Ionicons
            name="cash-outline"
            size={42}
            color="teal"
            style={styles.activityIcon}/>
           <Text style={styles.activityTxt}>Sold</Text>
           <Text style={styles.activityNum}>98</Text>
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
        onPress={UpdateProfile}
      >
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
    width: 100,
    height: 100,
    borderRadius:50,
    marginHorizontal:30,
  },
  profilecontainer:{
    flexDirection:'row',
    justifyContent: 'center',
    marginHorizontal:5,
  },
  profilePicture:{
    alignItems:'center',
    margin:5,
    width:100,
    height:100,
    borderRadius:50,
  },
  activity:{
    margin:3,
    border:2,
    paddingTop:16,
    marginTop:16,
    paddingHorizontal:5,
    backgroundColor:'#efefef',
    borderRadius:10,
  },
  activityIcon:{
    marginHorizontal:5,
  },
  activityTxt:{
    marginHorizontal:4,
    fontSize:15,
    fontWeight:'500',
  },
  activityNum:{
    marginHorizontal:17,
    fontSize:20,
    fontWeight:'500',
  },
});










   


