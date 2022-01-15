import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const HomeScreen = ({navigation}, props) => {

    const [positionNow, setPositionNow] = useState(null);
    const [ watchPosition, setWatchPosition ] = useState(null);
    const [ currentTime, setCurrentTime ] = useState('now');
 
    //geolocation upon mounting
    useEffect(
        () => {
            Geolocation.getCurrentPosition((position) => {
                setInterval(() => {
                    setPositionNow(() => position.coords);
                    setCurrentTime(() => Date.now);
                }, 10000);
                
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

    const handlePress = () => {
        console.log(currentTime);
    }


    return(
        <View style={styles.screenContainer}>
            <Text>CONGRATS THIS APP FINALLY WORKS</Text>
            <Image source={{uri: "https://thumbs.dreamstime.com/b/puppies-celebrating-birthday-singing-14013137.jpg"}}
            style={{width: 200, height: 200}}></Image>
            <TouchableOpacity onPress={() => navigation.navigate('managehomes')}>
                <Text>Go to Manage Homes</Text>
            </TouchableOpacity>

            <Button onPress={handlePress}/>
            <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    }
});