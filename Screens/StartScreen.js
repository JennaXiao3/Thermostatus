import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { requestAuthorization } from 'react-native-geolocation-service';
import Geolocation from 'react-native-geolocation-service';

export const StartScreen = ({navigation}) => {
  
    const [positionNow, setPositionNow] = useState('hi');
/*
    //geolocation upon mounting
    useEffect(
        () => {
            Geolocation.getCurrentPosition((position) => {
                //setPositionNow(position)?
                console.log(position);
                console.log(positionNow);
            }, (error) => {
                console.log(
                    `This is why location isn't working: ${error.code}, ${error.message}`
                )
            })
        }, 
    []);*/

    return(
        <View style={styles.screenContainer}>
            <Text>Starting Screen</Text>
            <Text>{positionNow}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Text>Go to Home Page.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text>Go to Login Page.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text>Go to Signup Page</Text>
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