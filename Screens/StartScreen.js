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

            <TouchableOpacity onPress={() => navigation.navigate('createhome')}>
                <Text>Create new home.</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('joinhome')}>
                <Text>Join existing home.</Text>
            </TouchableOpacity>

            <Button title="try me" onPress={handleClick} > </Button>

            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text>Go to Login Page.</Text>
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