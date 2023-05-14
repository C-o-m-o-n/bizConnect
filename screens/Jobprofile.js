import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";

import { getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';

const auth = getAuth()
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

export default function JobProfile({ route, navigation }) {
  const { jobId } = route.params;
  const [job, setJob] = useState({});
  
  useEffect(() => {
    fetch(`https://flask-production-356c.up.railway.app/jobs/${jobId}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data)
        }).catch((error) => {
          console.log(error);
  });
  }, [jobId]);


  return (
    <View style={styles.container}>
      <View style={styles.objsTop}>
        <Ionicons
          name="return-up-back"
          color="#fff"
          size={29}
          onPress={() => navigation.goBack()}
        />
        {auth.currentUser && <Text style={{ color: '#fff' }}>{auth.currentUser.displayName}</Text>}
      </View>
      
      <ScrollView>
     
      <View style={styles.JobProfileBody}>
      <Image
        style={{width:WIDTH, height:HEIGHT_MODAL-460, borderTopLeftRadius: 20,}}
        source={{uri: job.job_photo}}
        />
         <View style={styles.JobProfileTop}>
           <Image
          style={styles.user_photo}
          source={{uri: job.user_photo}}
          />
          <View style={styles.JobProfileTopText}>
            
            <Text style={{alignSelf:'center',color:'#342352', fontSize:18,}}> {job.name} </Text>
            <Text style={{alignSelf:'center',color:'#342352', fontSize:18,}}> {job.email} </Text>
          </View>
      </View>
        <View style={styles.JobProfileBodyItems}>
           
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf:'center', color:'#999999',}}>{job.job_title}</Text>
       
        
        <Text style={{alignSelf:'center',marginHorizontal:10, marginTop:10,color: '#000000',}}>{job.job_description}</Text>

        <Text style={{alignSelf:'center', color: '#888',}}>{job.job_location}</Text>
        <View style={styles.JobProfileBottom}>
          <TouchableOpacity
            style={styles.JobProfileBottomBtn}
          >
             <Text style={{color:'#fff'}}> Save task </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              if (auth.currentUser){
                navigation.navigate("Chat")
              }else{
                showMessage({
                    message: "Login Error",
                    description: "Please Login first to take the task !",
                    type: "error",
                    });
              }
            }
            }
            style={styles.JobProfileBottomBtn}
          >
             <Text style={{color:'#fff'}}> Take task </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#91bbfa61',
  },
  objsTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
    marginHorizontal:10,
  },
  JobProfileTop:{
    justifyContent:'center',
    position:'absolute',
    alignSelf:'center',
    marginTop:5,
    padding:5,
    borderRadius:30,
  },
  user_photo:{
    width:150,
    height:150,
    marginHorizontal:1,
    borderRadius: 100,
  },
  JobProfileTopText:{
    alignSelf:'center',
  },
  JobProfileBodyItems:{
    
    marginTop:-20,
    backgroundColor:'#fff',
    borderTopLeftRadius: 20,
  },
  JobProfileBottom:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  JobProfileBottomBtn:{
    width:WIDTH-259,
    padding:10,
    borderRadius:20,
    marginTop:10,
    marginBottom:30,
    marginHorizontal:20,
    backgroundColor:'#342352',
  },
})