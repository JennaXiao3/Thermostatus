import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import { LocationItem } from '../src/components/LocationItem';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

// firebase
import { firebase } from '../src/constants/FirebaseConfig';
const database = firebase.database();

// creating a new home
export function CreateHome({navigation}) {
    const [homeName, setHomeName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [homeGeocode, setHomeGeocode] = useState(null);
    const [watchPosition, setWatchPosition] = useState(null);

    const geocoding= (address) => {
      let addressIsString = (typeof(address) == 'string');

      if (addressIsString) {
        const params = {
          access_key: 'f1d5ed3c2d2419317b30ae90e82950eb',
          query: address,
        }
      }
    }

    useEffect(
      () => {
          Geolocation.watchPosition(
              (position) => {
                  setWatchPosition(() => position.coords);
              }, (error) => {
                  console.log('rip')
              }
          );
        }, 
    []);

    // actually make this to check home code
    const getUsers = () => {
      axios.get('http://localhost:5000/search/getUsers')
        .then(response => {
          console.log(response.data);

        }).catch(error => {
          console.log(error);
        });
    }

    // fetching all houses
    const getHouseCodes = () => {
      let houseCodes = [];
      axios.get('http://localhost:5000/search/getHouseCodes')
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

    //checking if that code is in the array
    const codeExists = (data, code) => {
      return data.includes(code);
    }

    const useCurrentLocation = () => {
      // set home address to watchPosition in Firebase
      console.log(watchPosition);
    }

    const onCreatePress = () => {
      if (!(homeAddress == "")) {
        navigation.navigate('home');
        geocoding(homeAddress);
    
        let exists = true;
        const houseCodes = getHouseCodes();
        let houseid = "";

        do {
          //create random 4-num iD
          for (let i = 0; i < 4; i++) {
            let val = Math.floor(Math.random() * 10);
            houseid = houseid + val;
          }
          
          exists = codeExists(houseCodes, houseid);

        } while (exists);

        // if doesn't exist, add a house

        let data = {
          code: houseid,
          email: firebase.auth().currentUser.email,
          houseName: homeName
        }
        /* use http://localhost:5000/update/setHome
           and for the body, create a json object (in this case, called "data") with the following format

           let data = {
              code: [home code from above],
              email: [the email of the user who created it],
              longitude: [of home],
              latititude: [of home],
              houseName: [homeName] 
           }

        */
        axios.post('http://localhost:5000/update/setHome', data)
           .then(response => {
             console.log(response);
           }).catch(error => {
             console.log(error);
           })


           /*
           axios.get('http://localhost:5000/update/setHome', {params})
           .then(response => {
             // instead of console.logging, set home coords to data (long, lat) in Firebase
             console.log(response.data);
 
           }).catch(error => {
             console.log(error);
           });*/
      }
    }
    /*
    if(!watchPosition) {
      return(
      <View>
        <Text>Fetching current position...</Text>
      </View>);
    }*/
      return (
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text style = {styles.bigTitle}>Add a Home</Text>
            <Text style = {styles.subTitle}>Choose where your home is located</Text>
          </View>
          <TextInput 
            style = {styles.textInput}
            placeholder = "Home Nickname"
            value = {homeName}
            onChangeText = {text => setHomeName(text)}
          />

          <TextInput 
            style = {styles.textInput}
            placeholder = "Home Address"
            value = {homeAddress}
            onChangeText = {text => setHomeAddress(text)}
          />

          <TouchableOpacity
            onPress={useCurrentLocation}
            style = {[styles.button, {marginBottom: 5}]}>
            <Text style={styles.buttonText}>Use Current Location</Text>
          </TouchableOpacity>

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
    marginTop: 20,
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

/*<GoogleAutoComplete apiKey='AIzaSyCL19fVJbd8NIPC53P_WNrL5CcfhEOff9k' debounce={300} minLength={2}>
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
                </View>
                {isSearching && <ActivityIndicator size = "large" color="gray"/>} 
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
          </GoogleAutoComplete>*/