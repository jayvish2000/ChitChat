import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import React, { useState, useRef } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import FormInput from '../FormInput';
import FormButton from '../FormButton';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import FormInputPassword from '../FormInputPassword';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [fname, setFname] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const refRBSheet = useRef();

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);

    const storageRef = storage().ref(`photos/users/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      // console.log('urlsignup', url)
      setUploading(false);
      setImage(image);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 320,
      height: 280,
      cropping: true,
      compressImageQuality: 0.1,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const register = async () => {
    let imgUrl = await uploadImage();

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .set({
              uid: auth().currentUser.uid,
              fname: fname,
              phone: phone,
              email: email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: imgUrl,
              status: "online"
            });
        });
      ToastAndroid.show('Registration successfull', ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={240}>
        <Text style={styles.chooseimg}>Choose Picture</Text>
        <View
          style={{
            borderBottomWidth: 1,
            marginBottom: 20,
            borderBottomColor: '#D4D4D4',
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              marginLeft: 10,
            }}
            onPress={takePhotoFromCamera}>
            <View
              style={{
                position: 'relative',
                borderRadius: 20,
                elevation: 2,
                height: 40,
                width: 40,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#fff'
              }}>
              <MaterialCommunityIcons name="camera" size={25} color="#fff" />
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                padding: 12,
              }}>
              From Camera
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              marginLeft: 10,
            }}
            onPress={choosePhotoFromLibrary}>
            <View
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                elevation: 2,
                height: 40,
                width: 40,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#fff'
              }}>
              <MaterialCommunityIcons
                name="folder-image"
                size={25}
                color="#fff"
              />
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                padding: 12,
              }}>
              From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>


      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => refRBSheet.current.open()}>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={styles.imgbg}
              imageStyle={{ borderRadius: 50 }}
            />
          ) : (
            <Image
              source={{
                uri: 'https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png',
              }}
              style={styles.imgbg}
              imageStyle={{ borderRadius: 50 }}
            />
          )}
          <View
            style={{
              bottom: '25%',
              left: '75%',
              backgroundColor: '#fff',
              width: 26,
              height: 26,
              borderRadius: 26 / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="add-circle" size={25} color="#2e64e5" />
          </View>
        </TouchableOpacity>
      </View>
      <FormInput
        placeholderText="Name"
        iconType="user"
        autoCaitalize="none"
        labelValue={fname}
        onChangeText={fname => setFname(fname)}
      />
      <FormInput
        keyboardType="email-address"
        placeholderText="Email"
        iconType="user"
        autoCaitalize="none"
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
      />

      <FormInput
        placeholderText="Phone"
        iconType="phone"
        autoCaitalize="none"
        value={phone}
        onChangeText={phone => setPhone(phone)}
      />

      <FormInputPassword
        placeholderText="Password"
        iconType="lock"
        labelValue={password}
        secureTextEntry
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormInputPassword
        placeholderText="ConfirmPassword"
        iconType="lock"
        labelValue={confirmpassword}
        secureTextEntry
        onChangeText={userPassword => setConfirmPassword(userPassword)}
      />
      {uploading ? (
        <View style={styles.StatusWrapper}>
          <ActivityIndicator size="large" color="#2e64e5" />
        </View>
      ) : (
        <FormButton buttonTitle="Signup" onPress={() => register()} />
      )}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', borderWidth: 0.2, borderColor: '#ECECEC', width: '42%', height: 0 }} />

        <Text style={{ color: '#9b9b9b', fontSize: 14, fontWeight: '500', marginLeft: 12, marginRight: 12 }}>OR</Text>

        <View style={{ flexDirection: 'row', borderWidth: 0.2, borderColor: '#ECECEC', width: '42%', height: 0 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.navbtntext}>
       Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={[styles.forgotbtn, { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }]}>
          <Text style={[styles.navbtntext, { color: '#3897f1', marginLeft: 4 }]}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navbtn: {
    marginTop: 15,
  },
  forgotbtn: {
    marginVertical: 35,
  },
  navbtntext: {
    fontSize: 15,
    fontWeight: '500',
    color: '#949fa7',
  },
  actioncontainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#2e64e5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  icon: { paddingLeft: 8, backgroundColor: '#fff' },
  textInput: {
    flex: 1,
    padding: 10,
    color: '#333333',
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
  },
  imgbg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  chooseimg: {
    textAlign: 'center',
    padding: 6,
    fontSize: 18,
    color: '#000',
  },
});
