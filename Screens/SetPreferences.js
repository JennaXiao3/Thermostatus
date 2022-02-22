import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { Component, useState } from 'react';

export const SetPreferences = ({navigation}, props) => {
  const [temp, setTemp] = useState('')

  return (
    <View style = {styles.container}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Add Temperature</Text>
        <Text style = {styles.subTitle}>Set your preferred temperature {"\n"}when you are at home</Text>
      </View>
      <TextInput
        placeholder = "°C"
        keyboardType = 'numeric'
        style = {styles.tempInput}
        onChangeText = {text => setTemp(text)}
        value = {temp}
      />
      <TouchableOpacity
        onPress = {() => navigation.navigate('home')}
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
  bigTitle: {
    fontSize: 36,
    textAlign: 'center'
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 50,
    textAlign: 'center'
  },
  tempInput: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 26,
    width: 100,
    textAlign: 'center',
    borderRadius: 20
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
