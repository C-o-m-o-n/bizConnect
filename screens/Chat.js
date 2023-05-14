import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable, Image, Dimensions, KeyboardAvoidingView, TextInput, StyleSheet,ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';
import io from 'socket.io-client';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;

const auth = getAuth()
const socket = io('http://localhost:3000');

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', {
        text: inputMessage.trim(),
        sender: auth.currentUser.displayName,
      });
      setInputMessage('');
    }
    
    console.log('messages sent');
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>

      <View style={styles.messageItemTop}>
      <Image
      style={{width:30, height:30, borderRadius:30,}}
      source={{ uri: auth.currentUser.photoURL }} />
      <Text style={styles.messageSender}>{item.sender}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    
    <View style={styles.container}>
      <View style={styles.objsTop}>
        <View style={styles.closeModal}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Ionicons name="return-up-back" color="#fff" size={29} />
          </Pressable>
        </View>
        {auth.currentUser && (
          <Text style={styles.detailsEmail}>{auth.currentUser.displayName}</Text>
        )}
      </View>
        <ScrollView>
      <LinearGradient
      style={styles.messagescontainer}
      colors={['#0d0230', '#0d0230', '#120a2cd1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
      />
      </LinearGradient>
      </ScrollView>
      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.textinput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message here..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" color="#fff" size={30} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
       
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#0d0230',
  },
  objsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailsEmail:{
    color:"#fff",
  },
  messagescontainer:{
    backgroundColor:"#fff",
    height:HEIGHT_MODAL-110,
    marginHorizontal:10,
  },
  messageItemTop:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#0c0c0fdc',
    padding:2,
  },
  messageItem: {
    backgroundColor: '#b8aae3',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  messageSender:{
    color:"teal",
    alignSelf:'center',
    marginHorizontal:10,
    fontSize:20,
    fontWeight:'bold',
  },
  messageText:{
    color:"#0c0c0fdc",
  },
  inputContainer:{
    flexDirection:'row',
    padding:10,
    backgroundColor:"#0d0230",
  },
  textinput:{
    width:WIDTH-70,
    marginHorizontal:10,
    height:40,
    borderRadius:10,
    backgroundColor:'#efefef',
  },
  sendButton:{
    alignSelf:'center',
  }
})