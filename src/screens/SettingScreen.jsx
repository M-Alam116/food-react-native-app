/* eslint-disable prettier/prettier */
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <HeaderBar title={'Edit Profile'} profileShown={false}/>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/other/user.jpg')}
            style={styles.profileImage}
          />
          <Pressable style={styles.editBtn}>
            <Icon name="edit" size={25} color={COLORS.blackColor} />
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>Name</Text>
            <TextInput style={styles.inputField} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>Email</Text>
            <TextInput style={styles.inputField} />
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}>Change password</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Old Password</Text>
              <TextInput secureTextEntry={true} style={styles.inputField} />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>New Password</Text>
              <TextInput secureTextEntry={true} style={styles.inputField} />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  infoContainer: {
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.blackColor,
    opacity: 0.8,
  },
  inputField: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.blackColor,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  passwordContainer: {
    gap: 20,
    marginTop: 30,
  },
  passwordText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.orangeColor,
    opacity: 0.8,
  },
  btnText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },
  saveBtn: {
    backgroundColor: COLORS.orangeColor,
    borderRadius: 8,
    padding: 20,
  },
});

export default SettingScreen;
