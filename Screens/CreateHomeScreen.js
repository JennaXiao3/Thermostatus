import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

// firebase
import { firebase } from '../src/constants/FirebaseConfig';
const database = firebase.database();

// creating a new home
export function CreateHomeScreen({navigation}) {
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

    return(
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Create new home</Text>
            <Text style={styles.subtitle}>Give your Home a name and address.</Text>
            <TextInput
             style={styles.input}
             onChangeText={setHomeName}
             value={homeName}
             placeholder='Home Name'
             placeholderTextColor='black'
             />

            <TextInput
             style={styles.input}
             onChangeText={setHomeAddress}
             value={homeAddress}
             placeholder='Home Address'
             placeholderTextColor='black'
             />

            <TouchableOpacity  style={styles.button} onPress={() => onPress(homeAddress)}>
                <Text>printing geocode</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.button} onPress={checkGeocode}>
                <Text>printing geocode</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                <Text>Next (to homescreen)</Text>
            </TouchableOpacity>
            
            <StatusBar style="auto" />
      </View>
    );
}



// Joining an existing code
export function JoinHomeScreen({navigation}) {
    const [code, setCode] = useState(null);

    return(
        <View style={[styles.screenContainer, {backgroundColor: '#3b7a57'}]}>
            <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Ask the homeowner for the code to join.</Text>
                <Text style={styles.title}>Join a home</Text>
                <Text>
                    Current code: {code}
                </Text>
            </View>

            <View style={styles.codeContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setCode}
                    value={code}
                    placeholder='Enter code here'
                    keyboardType='numeric'
                    placeholderTextColor='black'
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                    <Text>Next (to homescreen)</Text>
                </TouchableOpacity>
            </View>
            
            <StatusBar style="auto" />
        </View>
    );
}


// function that takes code and checks if it is in the database
function checkInDatabase(code) {
    //first check existence
    
    // 
}




const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a8e4a0',
    },
    textContainer: {
        flex: 2,
        flexDirection: 'column-reverse',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',         
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'semi-bold',
    },

    buttonContainer: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    codeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    input: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '1vh',
    }
});
