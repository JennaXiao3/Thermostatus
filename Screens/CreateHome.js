import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { LocationItem } from '../src/components/LocationItem';

// firebase
import { firebase } from '../src/constants/FirebaseConfig';
const database = firebase.database();

// creating a new home
export function CreateHome({navigation}) {
    const [homeName, setHomeName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [homeGeocode, setHomeGeocode] = useState(null);

    useEffect(() => {
        Location.setGoogleApiKey("AIzaSyCL19fVJbd8NIPC53P_WNrL5CcfhEOff9k");
    });

    function onPress(address) {
        setHomeGeocode(() => {
            return Location.geocodeAsync(address);
        });
    }

    function checkGeocode() {
        console.log(homeGeocode);
    }

    const onCreatePress = () => {
      navigation.navigate('home');
  
      let uid = "";
  
      //create random 4-num iD
      for (let i = 0; i < 4; i++) {
        let val = Math.floor(Math.random() * 10);
        uid = uid + val;
      }
      database.ref('houses/houseID').child(uid).set({
        housename: homeName
      });
    }

      return (
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Add a Home</Text>
            <Text style = {styles.subTitle}>Choose where your home is located</Text>
          </View>
          <TextInput 
            style = {styles.textInput}
            placeholder = "Home Name"
            value = {homeName}
            onChangeText = {text => setHomeName(text)}
          />
          <GoogleAutoComplete apiKey='AIzaSyCL19fVJbd8NIPC53P_WNrL5CcfhEOff9k' debounce={300} minLength={2}>
            {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearchs}) => (
              <React.Fragment>
                {console.log('locationResults', locationResults)}
                <View style = {styles.inputWrapper}>
                  <TextInput 
                    style = {styles.textInput}
                    placeholder = "Search an address"
                    onChangeText = {handleTextChange}
                    value = {inputValue}
                  />
                  {/*<Button title = "clear" onPress = {clearSearchs}></Button>*/}
                </View>
                {isSearching && <ActivityIndicator size = "large" color="gray"/>} 
                {/*loading bar above - might look like glitch*/}
                <ScrollView>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                  />
                ))}
                </ScrollView>
    
              </React.Fragment>
            )}
          </GoogleAutoComplete>
          <TouchableOpacity
              onPress = {onCreatePress}
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
  textInput: {
    height: 40,
    width: 300,
    borderBottomWidth: 1,
    paddingHorizontal: 16
  },  
  inputWrapper: {
    marginTop: 20,
    flexDirection: 'row'
  },
  titleContainer: {
    flexDirection: 'column',
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 80,
    backgroundColor: '#979797',
    width: '80%',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 80
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
}) 

//AIzaSyCwUWmUHb42cz1Sn8YAWx25sKynAxCNdSY
//AIzaSyCL19fVJbd8NIPC53P_WNrL5CcfhEOff9k