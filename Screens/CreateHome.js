import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useMemo } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import { LocationItem } from '../src/components/LocationItem';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

// firebase
import { firebase } from '../src/constants/FirebaseConfig';
import { PanResponder } from 'react-native-web';
// import { useMemo } from 'react/cjs/react.production.min';
const database = firebase.database();
let houseid = "";
const tempUsername = "cocopuff@gmail.com";
const defaultTemp = 22;

//location helper
import { userAtHome } from '../helpers/location';

// creating a new home
export function CreateHome({navigation}) {
    const [homeName, setHomeName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [homeGeocode, setHomeGeocode] = useState({longitude: 0, latitude: 0});
    const [watchPosition, setWatchPosition] = useState({longitude: 0, latitude: 0});
    const [email, setEmail] = useState(tempUsername);
    const [userLocationDatabase, setUserLocationDatabase] = useState({longitude: 0, latitude: 0});

     async function geocoding (address) {
      let addressIsString = (typeof(address) == 'string');

      if (addressIsString) {
        const params = {
          access_key: 'f1d5ed3c2d2419317b30ae90e82950eb',
          query: address,
        }
        axios.get('http://api.positionstack.com/v1/forward', {params})
          .then(response => {
            // instead of console.logging, set home coords to data (long, lat) in Firebase
            console.log(response.data);
            console.log(response.data.data[0]);
            setHomeGeocode({
              longitude: response.data.data[0].longitude,
              latitude: response.data.data[0].latitude,
            });

          }).catch(error => {
            console.log(error);
          });

      }
    }

    useEffect(
      () => {
        setEmail(firebase.auth().currentUser.email);
        console.log(email);
          Geolocation.watchPosition(
              (position) => {
                  setWatchPosition(() => position.coords);
              }, (error) => {
                  console.log('rip')
              }
          );

        });

    useMemo(() => addHouse(houseid, email, homeName), [homeGeocode]);


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

    async function addHouse (code, email, name) {
      console.log(homeAddress);
      console.log(homeGeocode);
      console.log(watchPosition);

      let longitudeNum = parseFloat(homeGeocode.longitude);
      let latitudeNum = parseFloat(homeGeocode.latitude);

      let at_Home = userAtHome(watchPosition.longitude, watchPosition.latitude, homeGeocode.longitude, homeGeocode.latitude);

      const homeObj = {
        code: code, 
        email: email, 
        longitude: longitudeNum,
        latitude: latitudeNum,
        houseName: name,
        address: homeAddress,
        isCurrentHome: true,
        isAtHome: at_Home,
      };

      axios.post('http://localhost:5000/update/setHome', homeObj)
      .then(response => {
        console.log(`added house ${code} to firestore!`);
        console.log(`atHome: ${at_Home}`);
      })
      .catch(error => {
      console.log(error);
    });

    }

    //checking if that code is in the array
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


    const makeHouseCode = () => {
      let exists = true;
      const houseCodes = getHouseCodes();
      do {
        //create random 4-num iD
        for (let i = 0; i < 4; i++) {
          let val = Math.floor(Math.random() * 10);
          houseid = houseid + val.toString();
        }
        console.log("in while loop");
        console.log(houseCodes);
        exists = codeExists(houseCodes, houseid);
        console.log(exists);

      } while (exists);
    }


    const useCurrentLocation = () => {
      makeHouseCode();

      const homeObj = {
        code: houseid, 
        email: email, 
        longitude: watchPosition.longitude,
        latitude: watchPosition.latitude,
        houseName: homeName,
        isAtHome: true,
        isCurrentHome: true,
      };

      axios.post('http://localhost:5000/update/setHome', homeObj)
      .then(response => {
        console.log(`added house ${houseid} to firestore!`);
      })
      .catch(error => {
      console.log(error);
      });
      
      navigation.navigate('home', {houseCode: houseid, startTemp: defaultTemp});

    }

    async function onCreatePress() {
      if (!(homeAddress == "")) {
        makeHouseCode();
        geocoding(homeAddress);
        
        console.log("next step");
        navigation.navigate('home', {houseCode: houseid, startTemp: defaultTemp});

      }
    }
    
    
    if(!watchPosition) {
      return(
      <View>
        <Text>Fetching current position...</Text>
      </View>);
    }
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

          <TouchableOpacity onPress={() => console.log(homeGeocode)}>
            <Text>checking setGeocode</Text>
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
