import React, { useState } from 'react';
import {StyleSheet, View, Text, Button, Image, TextInput, Alert } from 'react-native';
import { storage } from './/../config/firebase';
import { auth } from './/../config/firebase';
import {launchImageLibraryAsync } from 'expo-image-picker'
export default function UplpadScreen () {
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [uploading, setUploading] = useState();
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');

  const uploadImageTo = async () => {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const ref = storage.ref().child(`images/${imageName}`);
    const uploadTask = ref.put(blob);
    try{
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }catch(e){
        console.log('Error....', e);
      };
  };

  const selectImage = async () => {
    const options = { mediaTypes: 'Images' };
    const img = await launchImageLibraryAsync(options);
    setImage(img.assets[0].uri);
    setShowImage(img);
    console.log(image);
    
  };
  
  const uploadImage = async () => {
    setUploading(true)
    const response = await fetch(image.uri)
    const blob = response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
    var ref = storage.ref().child(filename).put(blob)
    try {
        await ref;
        setUploading(false)
        Alert.alert('Photo uploaded!');
        setImage(null);
      } catch (e){
          console.log(e)
        }
    }
  
  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImage} />
      {showImage && <Image source={{ uri: showImage.uri }} style={{ width: 200, height: 200 }} />}
      <TextInput placeholder="Enter Image Name" value={imageName} onChangeText={(text) => setImageName(text)} />
      <Button title="Upload Image" onPress={uploadImage} />
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
