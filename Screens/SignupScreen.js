import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { firebase } from '../src/constants/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const database = firebase.database();

export const SignupScreen = ({navigation}, props) => {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
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
      
      database.ref('users/userID').child(uid).set({
        fullname: fullName,
        password: password,
      });

      const name = fullName.split(" ");
      // change sign up page to include first name and last name separately
      let data = {
        firstName: name[0],
        lastName: name[1],
        email: email
      };
      
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
          placeholder='Full Name'
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
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
    backgroundColor: '#0782F9',
    width: '100%', /* to change width of button, got to buttonContainer */
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
