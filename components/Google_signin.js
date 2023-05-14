import { GoogleSignin,statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

GoogleSignin.configure({
  scopes: ['email'], 
  webClientId: '1077410812332-td8aoe9ioq3lcpuuq5080qfd21fumul4.apps.googleusercontent.com',
  offlineAccess: true
});



export default function GoogleSignIn() {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services are not available');
      } else {
        Alert.alert('Something went wrong', error.toString());
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View>
          <Text>Welcome, {userInfo.user.name}!</Text>
          <GoogleSigninButton onPress={signOut} />
        </View>
      ) : (
        <GoogleSigninButton onPress={signIn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
