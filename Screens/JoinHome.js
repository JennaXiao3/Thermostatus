import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { Component, useState, useRef } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';
import { KeyboardAvoidingView } from 'react-native-web';


export const JoinHome = ({navigation}, props) => {
  const [code, setCode] = useState('')

  // pin stuff
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const buttonRef = useRef(null);

  const [pin1, setPin1] = useState("1");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");


  const onJoinPress = async () => {
    const houseCodes = await getHouseCodes();
    const totalCode = pin1 + pin2 + pin3 + pin4;
    const works = codeExists(houseCodes, totalCode);
    console.log(houseCodes);
    
    if (!works) {
      //alert(`Code ${totalCode} doesn't exist! Try again.`);
      console.log(`Code ${totalCode} doesn't exist! Try again.`);
      return;
    }


    let data = {
      code: totalCode,
      email: firebase.auth().currentUser.email
    }

    axios.post('http://localhost:5000/update/joinHome', data)
      .then(response => {
        console.log(response);
        
      }).catch(error => {
        console.log(error);
      })
      navigation.navigate('home', {houseCode: totalCode, startTemp: 22});
      
  }

  const getHouseCodes = async () => {
    let houseCodes = [];
    await axios.get('http://localhost:5000/search/getHouseCodes')
      .then(response => {
        let data = response.data;
        console.log(response.data);
        data.forEach((item) => {
          houseCodes.push(item);
        });

      }).catch(error => {
        console.log(error);
      });
    
      return houseCodes;
  }

  const codeExists = (data, code) => {
    console.log(code);
    let len = data.length;
    for (let i = 0; i < len; ++i) {
      if (data[i] == code) {
        return true;
      }
    }
    return false;
  }

  return (
    <View style = {styles.container}>
      <View style={{flex: 1}}></View>
      <KeyboardAvoidingView
            keyboardVerticalOffset={50}
            behaviour={'padding'}
            style={styles.containerAvoiddingView}
          >
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Join a Home</Text>
            <Text style = {styles.subTitle}>Ask the homeowner for the code to join!</Text>
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
          onPress = {onJoinPress}
          style = {styles.button}
          ref={buttonRef}
          >
            <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

      </KeyboardAvoidingView>
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
    fontWeight: 900,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 400,
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
    fontWeight: 600,
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
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 16,
  }, 
  containerAvoiddingView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  })


