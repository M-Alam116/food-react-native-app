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
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    setEmail('');
    setPassword('');
    navigation.replace('Tab');
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logos/food-logo2.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.mainText}>Login to your Account</Text>
          <TextInput
            placeholder="Email"
            style={styles.inputStyle}
            value={email}
            onChange={value => setEmail(value)}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={styles.inputStyle}
            value={password}
            onChange={value => setPassword(value)}
          />
          <Pressable style={styles.signinButton} onPress={handleSignIn}>
            <Text style={styles.signinText}>Sign In</Text>
          </Pressable>
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
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text
              style={[styles.navigateText, {opacity: 0.7, fontWeight: '900'}]}>
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
    backgroundColor: '#ffffff',
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
    width: 180,
    height: 80,
  },
  formContainer: {
    gap: 30,
  },
  mainText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    opacity: 0.5,
  },
  inputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 8,
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  signinButton: {
    backgroundColor: '#1f319d',
    borderRadius: 8,
    padding: 20,
  },
  signinText: {
    color: '#fff',
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
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default Signin;
