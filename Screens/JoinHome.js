import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Component, useState } from 'react';
//import SmoothPinCodeInput from 'react-native-smooth-pincode-input';


export const JoinHome = ({navigation}, props) => {
    const [code, setCode] = useState('')

    return (
      <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Join a Home</Text>
            <Text style = {styles.subTitle}>Ask the homeowner for the code to join!</Text>
          </View>
        
        <TouchableOpacity
          onPress = {() => navigation.navigate('home')}
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