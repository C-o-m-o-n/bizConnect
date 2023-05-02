import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Pressable, Image, Dimensions, TextInput, StyleSheet, Text, View } from 'react-native';
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
      <Text style={styles.messageSender}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={['#ef8d0bdc', 'transparent', '#ef8d0bdc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
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
      <View style={styles.messagescontainer}>
         <Text> hi </Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textinput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message here..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  objsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  messageItem: {
    backgroundColor: '#red',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  inputContainer:{
    flexDirection:'row'
  },
  textinput:{
    width:WIDTH-70,
    marginHorizontal:10,
    height:40,
    borderRadius:10,
    backgroundColor:'green',
  },
  sendButton:{
    alignSelf:'center',
  }
})