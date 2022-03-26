import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { Component, useState, useRef } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';


export const AddThermostat = ({navigation}, props) => {

  // pin stuff
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const buttonRef = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");


  const add = () => {
    // this is was just for testing
    console.log(firebase.auth().currentUser.email);
    navigation.navigate('start');
  }

  return (
    <View style = {styles.container}>
      <View style={{flex: 1}}></View>

        <View style = {styles.titleContainer}>
          <Text style = {styles.bigTitle}>Let's Add a Thermostat</Text>
          <Text style={styles.subTitle}>Enter your registration code</Text>
        </View>

          

      <View style={styles.pinInputContainer}>
        <View style={styles.singlePinContainer}>
          <TextInput
          ref={pin1Ref}
          keyboardType={'number-pad'}
          maxLength={1}
          style={{borderBottomColor: '#979797', borderBottomWidth: 2, textAlign: 'center', borderRadius: 2}}
          onChange={(pin1) => {
            setPin1(pin1.nativeEvent.text);
            if (pin1 != "") {
              pin2Ref.current.focus();
            }
          }}>
          </TextInput>
        </View>
        
        <View style={styles.singlePinContainer}>
          <TextInput
          ref={pin2Ref}
          keyboardType={'number-pad'}
          style={{borderBottomColor: '#979797', borderBottomWidth: 2, textAlign: 'center', borderRadius: 2}}
          maxLength={1}
          onChange={(pin2) => {
            setPin2(pin2.nativeEvent.text);
            if (pin2 != "") {
              pin3Ref.current.focus();
            }
          }}>
          </TextInput>
        </View>

        <View style={styles.singlePinContainer}>
          <TextInput
          ref={pin3Ref}
          keyboardType={'number-pad'}
          style={{borderBottomColor: '#979797', borderBottomWidth: 2, textAlign: 'center', borderRadius: 2}}
          maxLength={1}
          onChange={(pin3) => {
            setPin3(pin3.nativeEvent.text);
            if (pin3 != "") {
              pin4Ref.current.focus();
            }
          }}>
          </TextInput>
        </View>

        <View style={styles.singlePinContainer}>
          <TextInput
          ref={pin4Ref}
          keyboardType={'number-pad'}
          style={{borderBottomColor: '#979797', borderBottomWidth: 2, textAlign: 'center', borderRadius: 2}}
          maxLength={1}
          onChange={(pin4) => {
            setPin4(pin4.nativeEvent.text);
            if (pin3 != "") {
              buttonRef.current.focus();
            }
          }}>
          </TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {add}
          style = {styles.button}
          ref={buttonRef}
          >
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>

      </View>
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5vh',
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'column',
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigTitle: {
    fontSize: 26,
    fontFamily: 'Avenir',
    fontWeight: 900,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 800,
    fontFamily: 'Avenir',
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    marginTop: 80,
    backgroundColor: '#F1B104',
    width: '80%',
    borderRadius: 22,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 800,
    fontFamily: 'Avenir'
  }, pinInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10vh',
  }, singlePinContainer: {
    flex: 1,
    width: '5vh',
    marginHorizontal: '1.5vh'
  }, buttonContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }, textInputText: {
    fontFamily: 'Avenir',
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 16,
  }
})