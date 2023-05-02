import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { getAuth } from 'firebase/auth';
import {MediaTypeOptions,launchImageLibraryAsync } from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient';
import bizConnect_icon from './/../assets/Bizconnect_icon.png';

const auth = getAuth()

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;


export default function UplpadScreen ({navigation}) {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [uploading, setUploading] = useState();
  const [imageName, setImageName] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobPhoto, setJobPhoto] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  
  
  const selectImage = async () => {
    if (name === null) {
      showMessage({
            message: "Form Error",
            description: "please enter job name before uploading the image",
            type: "error",
          });
          
    }else{
      const options = {
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        
      };
      const img = await launchImageLibraryAsync(options);
      setImage(img.assets[0].uri);
      
      setShowImage(img);
      const newImage = ({
        uri: img.assets[0].uri,
        type:`test/${ img.assets[0].uri.indexOf(".")+3}`,
        name:`test.${ img.assets[0].uri.indexOf(".")+3}`,
      })
      uploadImage(newImage)
    }
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
        setImageURL(data.url)
        Alert.alert("picture uploaded successfully!")
      })
  }
  
  const handleFormSubmit = () => {
    const auth = getAuth();
    const formData = new FormData();
    formData.append('user_id', auth.currentUser.uid);
    formData.append('name', auth.currentUser.displayName);
    formData.append('job_name', name);
    formData.append('email', auth.currentUser.email);
    formData.append('user_photo', auth.currentUser.photoURL);
    formData.append('phone', phone);
    formData.append('jobPhoto', imageURL);
    formData.append('jobDescription', jobDescription);
    formData.append('jobLocation', jobLocation);

    fetch('http://127.0.0.1:5000/jobs', {
      method: 'POST',
      body: formData,
    }).then(response => {
          if (response.ok) {
          
          showMessage({
            message: "Job saved",
            description: "Job details saved successfully",
            type: "success",
          });
          
        } else {
          
          showMessage({
            message: "Job saved Failed",
            description: "Failed to save job details, check you internet connection and try again",
            type: "error",
          });
        }
        
      }).catch(error => {
        console.error('errrrrr', error);
      });
  };
  
  return (
    <LinearGradient
      style={styles.container}
      colors={['#ef8d0bdc', 'transparent', '#ef8d0bdc']}
      start={{x:0, y:0}}
      end={{x:0.5, y:1}}>
      
      <View style={styles.objsTop}>
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => navigation.navigate("Home")}>
                    <Ionicons
                      name="return-up-back"
                      color="#fff"
                      size={29}>
                    </Ionicons>
                </Pressable>
              </View>
      
        {auth.currentUser && <Text style={styles.detailsEmail}>{auth.currentUser.displayName}</Text>}
        
        </View>
      <ScrollView>
      <View style={styles.formContainer}>
      <Text style={styles.labelText}><Ionicons
                      name="pricetag"
                      color="#0c0c0fdc"
                      size={19}>
                    </Ionicons> Job Name:</Text>
      <TextInput
        value={name}
        placeholder="Enter Job Name"
        style={styles.formInput}
        onChangeText={setName} />
      <Text style={styles.labelText}>
      <Ionicons
        name="call"
        color="#0c0c0fdc"
        size={19}>
        </Ionicons>  Job Phone Number:</Text>
      <TextInput
        value={phone}
        keyboardType="numeric"
        placeholder="Enter Job phone Number"
        style={styles.formInput}
        onChangeText={setPhone} />

      <Text style={styles.labelText}><Ionicons
                      name="location"
                      color="#0c0c0fdc"
                      size={19}>
                    </Ionicons>  Job Location:</Text>
      <TextInput
        value={jobLocation}
        placeholder="Enter Job Location"
        style={styles.formInput}
        onChangeText={(text)=>
          setJobLocation(text)} />
          
      <Text style={styles.labelText}><Ionicons
                      name="document-text"
                      color="#0c0c0fdc"
                      size={19}>
                    </Ionicons>  Job Description:</Text>
      <TextInput
        placeholder="Enter Job Description (100 words)"
        style={{width:WIDTH-50,
          height:HEIGHT_MODAL-650,
          borderRadius:20,
          marginHorizontal:20,
          marginTop:10,
          backgroundColor:'#efefef',
          flexDirection:'row',
          backgroundColor:'#fff',}}
        multiline
        value={jobDescription} 
        onChangeText={(text) =>
          setJobDescription(text)} />

          <Text style={styles.labelText}><Ionicons
                      name="image"
                      color="#0c0c0fdc"
                      size={19}>
                    </Ionicons> Job Photo:</Text>

      {showImage && <Image source={{ uri: showImage.uri }} style={{ width: 70, height: 70, borderRadius:20,}} />}
        <TouchableOpacity
              onPress={selectImage}
              style={{
                width:WIDTH-200,
                borderRadius:30,
                margin:10,
                backgroundColor:'#ffdd',}}>
               
              <Text style={{
                  alignSelf:'center',
                  marginTop:10,
                  marginBottom:10,
                  fontWeight:'300',
                  fontSize:18,}}>   <Ionicons
                      name="cloud-upload-outline"
                      color="#0c0c0fdc"
                      size={19}>
                    </Ionicons>  Upload Image  </Text>
             </TouchableOpacity>
    
      <View style={styles.objectBottomBtns}>
        <TouchableOpacity
                onPress={handleFormSubmit}
                style={styles.objectBottomBtn}>
                <Text style={{
                    alignSelf:'center',
                    marginTop:10,
                    color:'#fff',
                    fontWeight:'300',
                    fontSize:18,}}> Submit   </Text>
               </TouchableOpacity>
          </View>
          <Image
          style={{width:110, height:110, alignSelf:'center', marginTop:20}}
          source={bizConnect_icon}
         />
    </View>
      </ScrollView>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  objsTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
  },
  
  formContainer: {
    height:HEIGHT_MODAL,
    height:HEIGHT_MODAL-20,
    marginTop:10,
  },
  labelText:{
    margin:10,
    marginHorizontal:20,
    color:'#0c0c0fdc',
  },
  formInput:{
    width:WIDTH-50,
    padding:10,
    borderRadius:10,
    marginHorizontal:20,
    marginTop:10,
    backgroundColor:'#efefef',
    flexDirection:'row',
    backgroundColor:'#fff',
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
    width:WIDTH-259,
    padding:5,
    borderRadius:30,
    marginTop:10,
    backgroundColor:'#0c0c0fdc',
    
  },
});
