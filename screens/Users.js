import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth } from "firebase/auth";

export default function Users () {
  const listAllUsers = () => {
    const auth = getAuth()
  // List batch of users, 1000 at a time.
  auth.listUsers(1000).then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      console.log('user', userRecord.toJSON());});
      }).catch((error) => {
    console.log('Error listing users:', error)
        
      });
// Start listing users from the beginning, 1000 at a time.
}
listAllUsers();

  return (
    <View style={styles.container}>
      <Text>My first text</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});