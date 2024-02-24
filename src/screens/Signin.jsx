/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/Theme';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      if (!email.length > 0 && !password.length > 0) {
        setError('Email and Password fields are required');
        return;
      }
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (response.user) {
        navigation.dispatch(StackActions.replace('Drawer'))  // use dispatch so that can can't move back to splash screen
        setEmail('');
        setPassword('');
        setError('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/other/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.mainText}>Login to your Account</Text>
          <TextInput
            placeholder="Email"
            style={styles.inputStyle}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={styles.inputStyle}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Pressable style={styles.signinButton} onPress={handleSignIn}>
            <Text style={styles.signinText}>Sign In</Text>
          </Pressable>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.socialContainer}>
          <Text style={styles.navigateText}>Or sign in with</Text>
          <View style={styles.socialIcons}>
            <FontAwesomeIcon name="google" size={30} color="#4267B2" />
            <FontAwesomeIcon name="facebook" size={30} color="#4267B2" />
            <FontAwesomeIcon name="twitter" size={30} color="#1DA1F2" />
          </View>
        </View>
        <View style={styles.navigateContainer}>
          <Text style={styles.navigateText}>Don't have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Signup');
              setEmail('');
              setPassword('');
              setError('');
            }}>
            <Text
              style={[styles.navigateText, { opacity: 0.7, fontWeight: '900' }]}>
              Sign up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: COLORS.whiteColor,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    gap: 30,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.blackColor,
    opacity: 0.5,
  },
  inputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 8,
    color: COLORS.blackColor,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  signinButton: {
    backgroundColor: COLORS.orangeColor,
    borderRadius: 8,
    padding: 20,
  },
  signinText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  socialContainer: {
    gap: 30,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navigateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  navigateText: {
    color: COLORS.blackColor,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Signin;
