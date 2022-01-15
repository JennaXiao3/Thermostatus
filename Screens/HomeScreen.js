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

            Geolocation.watchPosition(
                (position) => {
                    setWatchPosition(() => position.coords);
                    
                    setInterval(() => {
                        let d = new Date;
                        setWatchPosition(() => position.coords);
                        setCurrentTime(() => d.getUTCSeconds());
                    }, 2000);
                }, (error) => {
                    console.log('rip')
                }
            );
        }, 
    []);

    const handlePress = () => {
        console.log(currentTime);
        console.log(watchPosition);
    }

    if (!watchPosition){
        return <Text>Loading...</Text>;
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
            <Text>{watchPosition.latitude}</Text>
            <Text>{currentTime}</Text>
            
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