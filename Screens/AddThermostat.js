import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component, useState } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
//import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export const AddThermostat = ({navigation}, props) => {
    const [code, setCode] = useState('')

    const add = () => {
      // this is was just for testing
      console.log(firebase.auth().currentUser.email);
      navigation.navigate('start');
    }

    return (
      <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Let's Add a Thermostat</Text>
            <Text style = {styles.subTitle}>Enter your registration code</Text>
          </View>
        {/* <SmoothPinCodeInput 
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
        /> */}
        <TouchableOpacity
          onPress = {add}
          style = {styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: '#F1B104',
    width: '80%',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
})