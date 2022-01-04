import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../src/constants/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen = ({navigation}, props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUpPress = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
  }

  //const auth = getAuth();
  /*
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });*/


  return (
    <KeyboardAvoidingView
      style = {styles.container}
      behaviour = "padding"
    > 
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Login</Text>
      </View>
      <View style = {styles.inputContainer}>
        <TextInput 
          placeholder = "Email"
          value = {email}
          onChangeText = {text => setEmail(text)}
          style = {styles.input}
          autoCapitalize="none"
        />
        <TextInput  
          placeholder = "Password"
          value = {password}
          onChangeText = {text => setPassword(text)}
          style = {styles.input}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style = {styles.buttonContainer}>
        <TouchableOpacity
          onPress = {() => { }}
          style = {styles.button}
        >
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {onSignUpPress}
          style = {[styles.button, styles.buttonOutline]}
        >
          <Text style ={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    width: 300
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    paddingBottom: 25
  },
  bigTitle: {
    fontSize: 36,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
})
