/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/Theme';

import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {useFavorites} from '../store/FavoriteContext';

const SettingScreen = () => {
  const {user} = useFavorites();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = auth().currentUser;
  const userId = currentUser.uid;
  const db = firestore();

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const userRef = db.collection('users').doc(userId);

      // Update name
      if (name) {
        await userRef.update({
          name: name,
        });
      }

      // Update email
      // if (email && email !== currentUser.email) {
      //   try {
      //     const response = await currentUser.updateEmail(email);
      //     if (response) {
      //       await userRef.update({
      //         email: email,
      //       });
      //     }
      //   } catch (err) {
      //     console.log(err.message);
      //     setError(err.message);
      //   }
      // }

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

      ToastAndroid.show('Profile updated successfully', ToastAndroid.LONG);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    setNewPassword('');
    setOldPassword('');
  };

  const handleDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory', // for solving storage error
      });
      setImageData(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const uploadImage = async () => {
    try {
      setImageLoading(true);
      const reference = storage().ref(`/userImages/${userId}`);
      const response = await reference.putFile(imageData.fileCopyUri); // we use copyTo option so that we access have to fileCopyUri instead of uri

      if (response.state === 'success') {
        const downloadURL = await reference.getDownloadURL();
        const userRef = db.collection('users').doc(userId);

        // Update profileImg with the download URL
        await userRef.update({
          profileImg: downloadURL,
        });

        setImageData(null);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  setTimeout(() => {
    setError('');
  }, 5000);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.whiteColor} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <HeaderBar title={'Edit Profile'} profileShown={false} />

        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            {user?.profileImg ? (
              <Image
                source={{uri: user.profileImg}}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('../assets/other/blank-profile.png')}
                style={styles.profileImage}
              />
            )}

            <Pressable style={styles.uploadBtn} onPress={uploadImage}>
              {imageLoading ? (
                <ActivityIndicator size="small" color={COLORS.whiteColor} />
              ) : (
                <Text style={styles.uploadText}>Upload</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={
                imageData
                  ? imageData
                  : require('../assets/other/blank-profile.png')
              }
              style={styles.profileImage}
            />
            <Pressable style={styles.editBtn} onPress={handleDocumentPicker}>
              <Icon name="edit" size={25} color={COLORS.blackColor} />
            </Pressable>
          </View>
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
              readOnly
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

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.whiteColor} />
            ) : (
              <Text style={styles.btnText}>Save</Text>
            )}
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
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 30,
  },
  imageContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadBtn: {
    backgroundColor: COLORS.orangeColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 14,
    color: COLORS.whiteColor,
    fontWeight: '700',
    opacity: 0.9,
  },
});

export default SettingScreen;
