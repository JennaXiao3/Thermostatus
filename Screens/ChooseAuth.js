import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import React, { Component, useState, useEffect, useRef } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';

export const ChooseAuth = ({navigation}, props) => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    background: 'white'
  }
})