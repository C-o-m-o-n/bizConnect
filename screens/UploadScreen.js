import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TextInput,
  Alert,
} from 'react-native';
//import { storage } from './/../config/firebase';
import { auth } from './/../config/firebase';
import {launchImageLibraryAsync } from 'expo-image-picker'

import { utils } from 'firebase/app';
import storage from 'firebase/storage';


export default function UplpadScreen () {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [uploading, setUploading] = useState();
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  const selectImage = async () => {
    const options = { mediaTypes: 'Images' };
    const img = await launchImageLibraryAsync(options);
    setImage(img.assets[0].uri);
    setShowImage(img);
    const newImage = ({
      uri: img.assets[0].uri,
      type:`test/${ img.assets[0].uri.indexOf(".")+3}`,
      name:`test.${ img.assets[0].uri.indexOf(".")+3}`,
    })
    uploadImage(newImage)
   
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
        //console.log(data);
        Alert.alert("picture uploaded successfully!")
      })
  }
  
  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImage} />
      {showImage && <Image source={{ uri: showImage.uri }} style={{ width: 200, height: 200 }} />}
      <TextInput placeholder="Enter Image Name" value={imageName} onChangeText={(text) => setImageName(text)} />
      
      {imageURL ? (
        <View>
          <Text>Image URL:</Text>
          <Text>{imageURL}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
