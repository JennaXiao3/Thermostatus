import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { firebase } from '../src/constants/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import extstyles from '../src/components/Style';

export const LoginScreen = ({navigation}, props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogInPress = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //alert("You are logged in!");
        // ...
        console.log(firebase.auth().currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //alert("You haven't registered yet :(");
        console.log(errorMessage);
      });
      navigation.navigate('home');
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

      <View style = {extstyles.buttonContainer}>
        <TouchableOpacity
          onPress = {onLogInPress}
          style = {extstyles.button}
        >
          <Text style = {extstyles.buttonText}>Login</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    width: 300,
    borderBottomColor: '#A8A6A7',
    borderBottomWidth: 1,
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
  signUpText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  linkToSignUp: {
    color: '#979797',
    fontWeight: 'bold'
  }
})
