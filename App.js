import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image } from 'react-native';
//import * as firebase from "firebase";
import { render } from 'react-dom';
import { firebase } from './src/constants/FirebaseConfig';

//importing screen components
import { StartScreen } from 'StartScreen';
import { HomeScreen } from 'HomeScreen';

//navigation
const Stack = createNativeStackNavigator();

const db = firebase.firestore();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='start'>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name='start' component={StartScreen} />
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
