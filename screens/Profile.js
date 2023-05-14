import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
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
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { getAuth, updateProfile } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import DefaultUserPic from './/../assets/user.jpg';
import bizConnect_icon from './/../assets/Bizconnect_icon.png';

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
  const [myJobs, setMyJobs] = useState('');
  //const [isLogedIn, setIsLogedIn] = useState();
  
  useEffect(() => {
    fetch(`https://flask-production-356c.up.railway.app/my_jobs?user_id=${ auth.currentUser.uid }`,{
      method:'GET'
    }).then((response) => response.json()).then((data) => {
        setMyJobs(data)
        console.log(myJobs);
        }).catch(error=>{
          console.log("error", error);
        });
  }, []);

  
  const selectImage = async () => {
    const options = { 
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };
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
    if (!pic) {
     Alert.alert('please choose a picture') 
    }else{
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
  }
  const UpdateProfile = ()=>{
    auth_usr = getAuth()
    user = auth_usr.currentUser
    if (user !== null) {
      if (name !== null) {
      updateProfile(user, {
        displayName: name,
        photoURL: imageURL }).then(() => {
        console.log("updated");
        Alert.alert("Profile updated!")
      }).catch((error) => {
        Alert.alert("An error occurred")
      });
      }else{
        Alert.alert("name cannot be empty")
      }
    }else{
      Alert.alert("please login first")
    }
}
const renderItem = ({ item }) => (
     <View style={styles.jobItemTopContainer}>
         <Image source={{ uri: item.job_photo }} style={styles.jobPhoto} />
      <View style={styles.jobDetails}>
        <Text style={styles.jobPosterName}>{item.name}</Text>
        <Text style={styles.jobLocation}>{item.phone}</Text>
        <Text style={styles.jobTitle}>{item.job_title}</Text>
        <Text style={styles.jobLocation}>{item.job_location}</Text>
     </View>
     </View>
     )
  return (
    <View
      style={styles.container}
      >
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
              <Text style={{marginHorizontal:20,fontWeight:'bold',  color:'#21180f', alignSelf:'center',}}> Name:
           </Text>
           <Text style={{fontWeight:200,alignSelf:'center',  color:'#21180f',}}>{auth.currentUser.displayName}</Text>
           </View>
           
          <View style={{marginTop:10,}}>
              <Text style={{marginHorizontal:20,fontWeight:'bold',  color:'#21180f', alignSelf:'center',}}> Email:
           </Text>
            <Text style={{fontWeight:200,alignSelf:'center', color:'#21180f'}}>{auth.currentUser.email}</Text>
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
            name="pencil-outline"
            color="#21180f"
            size={23}
            style={styles.menuBar}>
           </Ionicons>
           <Text > Update Profile</Text>
        </TouchableOpacity>
          
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
                      name="return-up-back"
                      color="#fff"
                      size={29}>
                    </Ionicons>
                </Pressable>
              </View>
      
        <Text style={styles.detailsEmail}>{auth.currentUser.email}</Text>
        
        </View>
     <View style={styles.modalItems}>
      <View style={styles.profilePicContainer}>
            {auth.currentUser.photoURL ? ( <Image
                style={styles.profilePicture}
                source={{ uri: auth.currentUser.photoURL }} />): 
                <Image
              style={styles.profilePicture}
              source={DefaultUserPic}/>
              }
           
      </View>
      <TouchableOpacity
        style={styles.buttons}
       onPress={selectImage} >
       <Text style={{alignSelf:'center', marginTop:10}}> choose new Image </Text>
       </TouchableOpacity>
      {showImage &&
        <Image
          source={{ uri: showImage.uri }}
          style={styles.ProfilePic} 
        />}
      <TouchableOpacity
        style={styles.buttons}
        onPress={()=>uploadImage(newImage)}>
        <Text style={{alignSelf:'center', marginTop:10}}> upload new Image </Text>
       </TouchableOpacity>
       
        <TextInput
        placeholder="    Enter new Name"
        style={styles.buttons}
        value={name}
        onChangeText={(text) => setName(text)} />
        
      <TouchableOpacity
        style={styles.buttons}
        onPress={UpdateProfile}>
        <Text style={{alignSelf:'center', marginTop:10}}> update Profile </Text>
      </TouchableOpacity>
       <Image
          style={{width:110, height:110, alignSelf:'center', marginTop:20}}
          source={bizConnect_icon}
         />
       </View>
      </View>

     
    </Modal>
     <View style={styles.BottomContainer}>
       <View style={styles.BottomItems}>
         <View style={styles.objectBottomTxt}>
         <Image
          style={{width:110, height:110}}
          source={bizConnect_icon}
         />
           <Text style={{color:'#fff', fontWeight:'bold', }}>Welcome</Text>
          <Text style={{color:'#fff'}}>Get Started with your bizConnect</Text>
        </View>
          <TouchableOpacity style={styles.BottomItem}>
             <Text
              style={{
                  alignSelf:'center',
                  marginTop:1,
                  marginBottom:10,
                  fontWeight:'300',
                  fontSize:18,}}>
             <Ionicons
            name="share"
            color="#21180f"
            size={33}
            >
           </Ionicons> Share Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomItem}>
             <Text
             style={{
                  alignSelf:'center',
                  marginTop:1,
                  marginBottom:10,
                  fontWeight:'300',
                  fontSize:18,}}>
             <Ionicons
            name="star"
            color="#21180f"
            size={33}
            >
           </Ionicons> Review  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomItem}>

             <Text 
              style={{
                  alignSelf:'center',
                  marginTop:1,
                  marginBottom:10,
                  fontWeight:'300',
                  fontSize:18,}}>
             <Ionicons
            name="add"
            color="#21180f"
            size={33}
            >
           </Ionicons> Invite friends </Text>
          </TouchableOpacity>
          
          <View>
             <Text>  </Text>
             <Text>  </Text>
             <Text>  </Text>
          </View>
          
          <View>
            <FlatList
              data={myJobs}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              
      />
          </View>
          <View>
             <Text>  </Text>
             <Text>  </Text>
             <Text>  </Text>
          </View>
       </View>
         
         
      
      </View> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#DCD7EB',
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
    backgroundColor:'#dfd',
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
    backgroundColor:'#dfd',
    padding:10,
    width:WIDTH-200,
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
    backgroundColor:'#342352',
    borderTopLeftRadius:40,
  },
  objectBottomTxt:{
    marginTop:6,
    flexDirection:'column',
    alignItems:'center',
  },
  BottomItems:{
    marginTop:1,
    marginBottom:10,
  },
  BottomItem:{
    alignSelf:'center',
    marginTop:20,
    padding:10,
    backgroundColor:'#dfd',
    width:WIDTH-50,
    marginHorizontal:10,
    borderRadius:20,
  },
  
  buttons:{
    alignSelf:'center',
    height:50,
    width:WIDTH-159,
    padding:5,
    borderRadius:30,
    marginTop:10,
    backgroundColor:'#fff',
    
  },
  ProfilePic:{
    width:70,
    height:70,
    alignSelf:'center',
    borderRadius:50,
    marginTop:10,
  },
  modalTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
  },
  modalContainer:{
    backgroundColor:'#21180f',
    height:HEIGHT_MODAL-10,
  },
  jobItemTopContainer:{
    backgroundColor:'red',
  }
});










   


