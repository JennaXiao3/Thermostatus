import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Image} from 'react-native';
import React, { Component, useState, useEffect, useRef } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';
import extstyles from '../src/components/Style';

export const ChoosePref = ({navigation}, props) => {

  const landscape = require("../src/assets/landscape.png");
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={landscape} style={styles.landscapeImg}></Image>
      </View>
      <View style={styles.bottomContainer}>
        <View style = {styles.titleContainer}>
          <Text style = {styles.bigTitle}>Onboarding</Text>
          <Text style = {styles.subTitle}>We will get you connected to your house and thermostat and ask you about your preferences</Text>
        </View>
        <View style = {[extstyles.buttonContainer, {justifyContent: 'flex-start', flex: 3}]}>
          <TouchableOpacity
            onPress = {() => navigation.navigate('joinhome')}
            style = {extstyles.buttonOutline}
          >
            <Text style = {extstyles.buttonOutlineText}>Join Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress = {() => navigation.navigate('createhome')}
            style = {[extstyles.buttonOutline, styles.addSpace]}
          >
            <Text style = {extstyles.buttonOutlineText}>Add Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  landscapeImg : {
    flex: 1,
    marginTop: '20%'
  },
  addSpace: {
    marginTop: 20
  },
  titleContainer: {
    flexDirection: 'column',
    paddingBottom: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  bigTitle: {
    fontSize: 26,
    marginTop: 20
  },
  subTitle: {
    fontSize: 14,
    paddingTop: 10,
    width: '80%',
    textAlign: 'center'
  },
})