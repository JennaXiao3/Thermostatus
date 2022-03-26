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
import { ManageHomes } from './Screens/ManageHomes';
import { LoginScreen } from './Screens/LoginScreen';
import { SignupScreen } from './Screens/SignupScreen';
import { AddThermostat } from './Screens/AddThermostat';
import { JoinHome } from './Screens/JoinHome';
import { CreateHome } from './Screens/CreateHome';
import { SetPreferences } from './Screens/SetPreferences';
import { ChooseAuth } from './Screens/ChooseAuth';
import { Onboarding } from './Screens/Onboarding';
import { ChoosePref } from './Screens/ChoosePref';


// geolocation
import Geolocation from 'react-native-geolocation-service';


//navigation
const Stack = createNativeStackNavigator();

const database = firebase.database();

export default function App() {
  /*
  const [watchPosition, setWatchPosition] = useState(null);
  
    useEffect(
      () => {
          Geolocation.watchPosition(
              (position) => {
                  setWatchPosition(() => position.coords);
              }, (error) => {
                  console.log('rip')
              }
          );
        }, 
    []);


  if (!watchPosition) {
    return(<Text>Getting position...</Text>);
  }*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='start'>
        <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='start' component={StartScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='signup' component={SignupScreen} />
        <Stack.Screen name='managehomes' component={ManageHomes} options={{ headerShown: false }}/>
        <Stack.Screen name='addthermostat' component={AddThermostat}/>
        <Stack.Screen name='joinhome' component={JoinHome}/>
        <Stack.Screen name='createhome' component={CreateHome}/>
        <Stack.Screen name='setpreferences' component={SetPreferences}/>
        <Stack.Screen name='chooseauth' component={ChooseAuth} options={{ headerShown: false }}/>
        <Stack.Screen name='onboarding' component={Onboarding} options={{ headerShown: false }}/>
        <Stack.Screen name='choosepref' component={ChoosePref} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
