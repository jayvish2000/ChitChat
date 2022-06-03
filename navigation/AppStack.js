import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/components/screens/Home';
import ProfileScreen from '../src/components/screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image } from 'react-native';
import ChatScreen from '../src/components/screens/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import EditProfileScreen from '../src/components/screens/EditProfileScreen';
import moment from 'moment';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabBar({ navigation }) {
  const [userProfile, setUserProfile] = useState(null)

  const { user } = useContext(AuthContext);

  const getuserProfile = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        setUserProfile(documentSnapshot.data())
      })
  }

  useEffect(() => {
    getuserProfile()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#949494',
        tabBarStyle: {
          height: 52,
          shadowColor: '#fff'
        },
        tabBarLabelStyle: {
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: true,
          tabBarLabel: () => null,
          headerLeft: () => (
            <Image style={{ width: 130, height: 45, resizeMode: 'cover', marginLeft: 6 }}
              source={{ uri: 'https://chitchatagency.com/wp-content/uploads/2022/02/chit-chat-logo-1-1.png' }} />
          ),
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons name='home' size={32} color={focused ? "#000" : "#7f7f7f"} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: userProfile?.email,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ backgroundColor: focused ? '#000' : "#fff", width: 35, height: 35, borderRadius: 35 / 2, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: userProfile?.userImg }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function AppStack({ navigation }) {
  const [userProfile, setUserProfile] = useState(null)

  const { user } = useContext(AuthContext);

  const getuserProfile = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        setUserProfile(documentSnapshot.data())
      })
  }

  useEffect(() => {
    getuserProfile()
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Tab' component={TabBar} options={{ headerShown: false }} />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params.email,
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Chats"
        component={ChatScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: "#000" }}>{route.params.userName}</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color: "#949494" }}>{moment(route.params.status).calendar()}</Text>
            </View>
          ),
          headerTitleStyle: {
            color: '#2e64e5',
          },
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ route }) => ({
          headerShadowVisible: false,
          headerShown: false
        })}
      />
    </Stack.Navigator>
  )
}
export default AppStack;
