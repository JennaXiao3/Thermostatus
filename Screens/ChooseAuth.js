import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Image} from 'react-native';
import React, { Component, useState, useEffect, useRef } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';
import extstyles from '../src/components/Style';

export const ChooseAuth = ({navigation}, props) => {

  const landscape = require("../src/assets/landscape.png");
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={landscape} style={styles.landscapeImg}></Image>
      </View>
      <View style={styles.bottomContainer}>
      <View style = {extstyles.buttonContainer}>
      <TouchableOpacity
          onPress = {() => navigation.navigate('signup')}
          style = {extstyles.buttonOutline}
        >
          <Text style = {extstyles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => navigation.navigate('login')}
          style = {[extstyles.buttonOutline, styles.addSpace]}
        >
          <Text style = {extstyles.buttonOutlineText}>Log In</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  landscapeImg : {
    flex: 1,
    marginTop: '20%'
  },
  addSpace: {
    marginTop: 30
  }
})