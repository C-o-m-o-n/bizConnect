import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable,Image,Dimensions, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()
export default function Jobs({navigation}) {
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('https://flask-production-356c.up.railway.app/jobs')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setJobs(data)
        });
  }, []);

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
     <View style={styles.jobItemTopContainer}>
         <Image source={{ uri: item.job_photo }} style={styles.jobPhoto} />
      <View style={styles.jobDetails}>
        <Text style={styles.jobPosterName}>{item.name}</Text>
        <Text style={styles.jobLocation}>{item.phone}</Text>
        <Text style={styles.jobTitle}>{item.job_title}</Text>
        <Text style={styles.jobLocation}>{item.job_location}</Text>
     </View>
     </View>
     
     
     <View style={styles.separstor}>
        <Text>  </Text>
     </View>
        
       <View style={styles.jobDescriptionContainer}>
          <Text style={styles.jobDescription}>{item.job_description.slice(122, 199)+'  ..........'}</Text>
        
       </View>
     <View style={styles.posterBtn}>
        <TouchableOpacity
          onPress={() => {navigation.navigate("JobProfile", { jobId: item.id })}
            }
          style={{
            width:WIDTH-229,
            padding:10,
            borderRadius:30,
            marginTop:10,
            backgroundColor:'#342352',
            flexDirection:'row',
            alignSelf:'flex-end',
          }}>
          <Text style={{color:"#f9f9f9"}}> view job profile</Text>
        <Ionicons
          name="arrow-forward"
          color="#f9f9f9"
          size={20}>
          </Ionicons>
        </TouchableOpacity>
     </View>
    </View>
  );
  return (
    <View
      style={styles.container}>
      <View style={styles.objsTop}>
              <View style={styles.closeModal}>
                <Pressable
                  onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="return-up-back"
                      color="#fff"
                      size={29}>
                    </Ionicons>
                </Pressable>
              </View>
      
        {auth.currentUser && <Text style={styles.detailsEmail}>{auth.currentUser.displayName}</Text>}
        
        </View>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#DCD7EB',
  },
  objsTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
  },
  jobItem: {
    flexDirection: 'column',
    marginVertical: 10,
    backgroundColor:'#f9f9f9',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 10,
    padding: 10,
  },
  jobItemTopContainer: {
    flexDirection:'row',
  },
  jobDescriptionContainer:{
    
    borderTopLeftRadius:20,
    marginTop:10,
  },
  jobPhoto: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius:20,
  },
  jobDetails: {
    flex: 1,
    marginHorizontal:20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  jobPosterName: {
    fontSize: 18,
    color:'red',
    fontWeight: 'bold',
  },
  jobLocation: {
    fontSize: 14,
    color: '#888',
  },
  jobDescription: {
    fontSize: 12,
    color:'#0c0c0fdc',
    margin: 10,
    fontWeight:300,
  },
  separstor:{
    backgroundColor:'#0c0c0fdc',
    height:1,
    marginTop:5,
  },
  
});
