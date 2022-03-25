import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { firebase } from '../src/constants/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

const database = firebase.database();

export const SignupScreen = ({navigation}, props) => {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onSignUpPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    } 
    // password needs to be atleast 6 characters
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      // Signed in 
      var user = userCredential.user;
      alert("You have been registered!");
      // ...
      //database.ref().set({whoop: "work"});
      
      /*
      database.ref('users/userID').child(uid).set({
        firstName: firstName,
        lastName: lastName,
        password: password,
      });*/

      const name = fullName.split(" ");
      // change sign up page to include first name and last name separately
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email
      };

      /*
      fetch('http://localhost:5000/update/setUsers', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,

      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
      */
     axios.post('http://localhost:5000/update/setUsers', data)
      .then(response => {
        console.log(response);
      }).catch(error => {
        console.log(response);
      })
      
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert('Not working :(');
      // ..
    });
  }

  return (
    <KeyboardAvoidingView
      style = {styles.container}
      behaviour = "padding"
    > 
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Sign Up</Text>
        <Text style = {styles.subTitle}>Create your account to use the thermostat</Text>
      </View>
      <View style = {styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='First Name'
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput 
          placeholder = "Email"
          value = {email}
          onChangeText = {text => setEmail(text)}
          style = {styles.input}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput  
          placeholder = "Password"
          value = {password}
          onChangeText = {text => setPassword(text)}
          style = {styles.input}
          secureTextEntry
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>

      <View style = {styles.buttonContainer}>
        <TouchableOpacity
          onPress = {onSignUpPress}
          style = {styles.button}
        >
          <Text style ={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.logInText}>
        <Text>Already have an account? </Text>
        <Text style = {styles.linkToLogIn}
              onPress={() => navigation.navigate('login')}>Log In</Text>
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
    justifyContent: 'center',
    paddingBottom: 25
  },
  bigTitle: {
    fontSize: 36,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 50,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#F1B104',
    width: '100%', /* to change width of button, go to buttonContainer */
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  logInText: {
    flexDirection: 'row',
    paddingTop: 20
  },
  linkToLogIn: {
    color: '#979797',
    fontWeight: 'bold'
  }
})
