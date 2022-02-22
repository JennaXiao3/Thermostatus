import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { firebase } from '../src/constants/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen = ({navigation}, props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogInPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("You are logged in!");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("You haven't registered yet :(");
        console.log(errorMessage);
      });
    }

  return (
    <KeyboardAvoidingView
      style = {styles.container}
      behaviour = "padding"
    > 
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Welcome Back</Text>
        <Text style = {styles.subTitle}>Enter your email and password</Text>
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
          onPress = {onLogInPress}
          style = {styles.button}
        >
          <Text style = {styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.signUpText}>
        <Text>Don't have an account? </Text>
        <Text style = {styles.linkToSignUp}
              onPress={() => navigation.navigate('signup')}>Sign Up</Text>
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
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'column',
    paddingBottom: 25
  },
  bigTitle: {
    fontSize: 36,
  },
  subTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 50
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%', /* to change width of button, got to buttonContainer */
    padding: 15,
    borderRadius: 20,
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
  },
  signUpText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  linkToSignUp: {
    color: '#979797',
    fontWeight: 'bold'
  }
})
