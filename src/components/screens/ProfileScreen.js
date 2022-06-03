import { Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../navigation/AuthProvider';
import { styles } from '../../styles/ProfileStyles';
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'

const ProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);


  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 280,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg :
              'https://1.bp.blogspot.com/-BZbzJ2rdptU/XhWLVBw58CI/AAAAAAAADWI/DnjRkzns2ZQI9LKSRj9aLgB4FyHFiZn_ACEwYBhgL/s1600/yet-not-died-whatsapp-dp.jpg'

          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname : ''}
        </Text>
        <Text style={styles.aboutUser}>
          {userData ? userData.about : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.userBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {
            firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                status: firestore.FieldValue.serverTimestamp()
              }).then(() => {
                logout()
              })
          }}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

export default ProfileScreen;
