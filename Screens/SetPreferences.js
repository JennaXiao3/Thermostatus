import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { Component, useState } from 'react';
import { firebase } from '../src/constants/FirebaseConfig';
import axios from 'axios';
import { manageTemp } from '../helpers/temp';

// images
const arrow = require("../src/assets/next_arrow_orange.png");


export const SetPreferences = ({navigation, route}, props) => {
  const [temp, setTemp] = useState(22);

  const onPlusPress = () => {
    setTemp((prev) => {
      return prev + 1;
    });
  }

  const onMinusPress = () => {
    setTemp((prev) => prev - 1);
  }
  
  const onNextPress = async () => {
    console.log(temp);

    // must be able to get the user's email somehow --> rn a random one
    let data = {
      email: firebase.auth().currentUser.email,
      temperature: temp
    }

    const firstResp = await axios.post('http://localhost:5000/update/setTemp', data)
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
      console.log('here!');
     navigation.navigate('home', {startTemp: temp});
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Set Preferred<br></br>Temperature</Text>
      </View>
      
      <View style={styles.middleContainer}>
        <View style={[styles.middleSubContainer, {flex: 3}]}>
          <TouchableOpacity 
          style={[styles.plusMinusButton,  {borderBottomRightRadius: 50, borderTopRightRadius: 50}]}
          onPress={onMinusPress}
          >
            <Text style={[styles.buttonText, {marginRight: "1vh"}]}>–</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.middleSubContainer, {flex: 7,  textAlign: 'center'}]}>

          <Text style={styles.tempText}>
            {temp}°C
          </Text>
        </View>

        <View style={[styles.middleSubContainer, {flex: 3,}]}>
          <TouchableOpacity 
          style={[styles.plusMinusButton, {borderBottomLeftRadius: 50, borderTopLeftRadius: 50}]}
          onPress={onPlusPress}>
            <Text style={[styles.buttonText, {marginLeft: "1vh"}]}>+</Text>

          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress = {onNextPress}
          style = {styles.nextButton}
          >
            <Image source={arrow} style={styles.arrow}></Image>
        </TouchableOpacity>
      </View>
 
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'stretch',
    backgroundColor: "#F1B104",

  },
  bigTitle: {
    fontSize: 28,
    textAlign: 'center',
    color: '#F0F0F0',
    marginTop: "10vh",
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  middleSubContainer: {
    flex: 1,
  },
  tempText: {
    color: "#F0F0F0",
    fontSize: 68,
    fontWeight: 600,
  },
  plusMinusButton: {
    flex: 1,
    backgroundColor: "#F2C13B",
    alignItems: 'center',
    justifyContent: 'center',
    height: "50%",
    paddingBottom: "3vh",
    paddingTop: "3vh",
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 600,
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextButton: {
    width: "9vh",
    height: "9vh",
    borderRadius: "15vh",
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    width: "50%",
    height: "50%"
  }

})

/*
    <View style = {styles.container}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.bigTitle}>Add Temperature</Text>
      </View>
      <TextInput
        placeholder = "°C"
        keyboardType = 'numeric'
        style = {styles.tempInput}
        onChangeText = {text => setTemp(text)}
        value = {temp}
      />
      <TouchableOpacity
        onPress = {onNextPress}
        style = {styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    */

/*
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
*/