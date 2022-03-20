import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { Component, useState } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';
//import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export const JoinHome = ({navigation}, props) => {
    const [code, setCode] = useState('')

    const onJoinPress = () => {
      
      navigation.navigate('home');

      let data = {
        code: code,
        email: firebase.auth().currentUser.email
      }

      axios.post('http://localhost:5000/update/joinHome', data)
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        })
    }

    return (
      <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Join a Home</Text>
            <Text style = {styles.subTitle}>Ask the homeowner for the code to join!</Text>
          </View>
          <TextInput
            placeholder = "Enter Code"
            keyboardType = 'numeric'
            style = {styles.tempInput}
            onChangeText = {code => setCode(code)}
            value = {code}
          />
      {/*
        <View style = {styles.containerInput}>
          <View style = {styles.cellView}>
            <Text 
              style = {styles.cellText}
              >
                1
            </Text>
          </View>
        </View>*/}
        <TouchableOpacity
          onPress = {onJoinPress}
          style = {styles.button}
          >
            <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigTitle: {
    fontSize: 26,
  },
  subTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    marginTop: 80,
    backgroundColor: '#979797',
    width: '80%',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5
  },
  cellText: {
    textAlgin: 'center',
    fontSize: 16
  }
})



/* <SmoothPinCodeInput 
        more info here: https://www.npmjs.com/package/react-native-smooth-pincode-input 
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: 'gray',
          }}
          cellStyleFocused={{
            borderColor: 'black',
          }}
          value={code}
          codeLength={4}
          onTextChange={code => setCode(code)}
        /> */