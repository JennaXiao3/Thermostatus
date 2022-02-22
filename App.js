import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
//import * as firebase from "firebase";
import { render } from 'react-dom';
import { firebase } from './src/constants/FirebaseConfig';

//importing screen components
import { StartScreen } from './Screens/StartScreen.js';
import { HomeScreen } from './Screens/HomeScreen.js';
import { ManageHomes } from './Screens/ManageHomesScreen';
import { LoginScreen } from './Screens/LoginScreen.js';
import { CreateHomeScreen, JoinHomeScreen } from './Screens/CreateHomeScreen';


//navigation
const Stack = createNativeStackNavigator();

const database = firebase.database();

export default function App() {
  database.ref().update({try: "connie's attempt"});

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='start'>
        <Stack.Screen name='home' component={HomeScreen} />
        <Stack.Screen name='start' component={StartScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='managehomes' component={ManageHomes}/>
        <Stack.Screen name='createhome' component={CreateHomeScreen}/>
        <Stack.Screen name='joinhome' component={JoinHomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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
