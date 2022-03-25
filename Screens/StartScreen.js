import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { requestAuthorization } from 'react-native-geolocation-service';
import Geolocation from 'react-native-geolocation-service';

export const StartScreen = ({navigation}) => {

    const [positionNow, setPositionNow] = useState(null);
    const [ watchPosition, setWatchPosition ] = useState(null);
 
    //geolocation upon mounting
    useEffect(
        () => {
            Geolocation.getCurrentPosition((position) => {
                setPositionNow(() => position.coords);
            }, (error) => {
                console.log(
                    `This is why location isn't working: ${error.code}, ${error.message}`
                )
            });

            Geolocation.watchPosition(
                (position) => {
                    setWatchPosition(() => position.coords);
                }, (error) => {
                    console.log('rip')
                }
            );
        }, 
    []);


    function handleClick() {
        console.log(watchPosition);
    }


    return(
        <View style={styles.screenContainer}>
            <Text>Starting Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Text>Go to Home Page.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text>Go to Login Page.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text>Go to Signup Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('addthermostat')}>
                <Text>Go to Add Thermostat Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('joinhome')}>
                <Text>Go to Join Home Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('createhome')}>
                <Text>Go to Create Home Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('setpreferences')}>
                <Text>Go to Set Preferences Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('chooseauth')}>
                <Text>Go to Choose Auth Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('onboarding')}>
                <Text>Go to Onboarding Page</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                console.log(watchPosition);
                }}>
                <Text>Check geolocation</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCCCFF'
    }
});