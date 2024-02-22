/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';

import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/Theme';

const SettingScreen = () => {
  const currentUser = auth().currentUser;
  const userId = currentUser.uid;
  const db = firestore();

  useEffect(() => {
    const getUsername = async () => {
      const user = await db.collection('users').doc(userId).get();
      setName(user._data.name);
    };

    getUsername();
  }, [userId, db]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(currentUser.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSaveChanges = async () => {
    try {
      const userRef = db.collection('users').doc(userId);

      // Update name
      await userRef.update({
        name: name,
      });

      // Update email
      if (email !== currentUser.email) {
        await currentUser.updateEmail(email);
      }

      // Change password
      if (oldPassword && newPassword) {
        // Re-authenticate the user with their old password
        const credential = auth.EmailAuthProvider.credential(
          currentUser.email,
          oldPassword,
        );
        await currentUser.reauthenticateWithCredential(credential);

        // If re-authentication is successful, update the password
        await currentUser.updatePassword(newPassword);
      }

      // Update image
      if (selectedImage) {
        const imageUri = selectedImage.uri;
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload the image to Firebase Storage
        const storageRef = db.storage().ref().child(`userImages/${userId}`);
        await storageRef.put(blob);

        // Get the download URL of the uploaded image
        const downloadURL = await storageRef.getDownloadURL();

        // Update user document with the download URL of the image
        await userRef.update({
          image: downloadURL,
        });
      }

      // Display success message or navigate to another screen
      console.log('User information updated successfully');
    } catch (error) {
      console.error('Error updating user information:', error.message);
    }

    setNewPassword('');
    setOldPassword('');
  };

  // Function to handle image selection
  const handleEditImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setSelectedImage(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <HeaderBar title={'Edit Profile'} profileShown={false} />

        <View style={styles.imageContainer}>
          <Image
            source={
              selectedImage
                ? selectedImage
                : require('../assets/other/user.jpg')
            }
            style={styles.profileImage}
          />
          <Pressable style={styles.editBtn} onPress={handleEditImage}>
            <Icon name="edit" size={25} color={COLORS.blackColor} />
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>Name</Text>
            <TextInput
              style={styles.inputField}
              value={name}
              onChangeText={value => setName(value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>Email</Text>
            <TextInput
              style={styles.inputField}
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}>Change password</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>Old Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                value={oldPassword}
                onChangeText={value => setOldPassword(value)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldName}>New Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                value={newPassword}
                onChangeText={value => setNewPassword(value)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
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
