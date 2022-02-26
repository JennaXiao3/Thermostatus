import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

export const HomeScreen = ({navigation}, props) => {

    const [positionNow, setPositionNow] = useState(null);
    const [ watchPosition, setWatchPosition ] = useState(null);
    const [ currentTime, setCurrentTime ] = useState('now');
 
    //geolocation upon mounting
    // issue: why does it take so long to load

    const handlePress = () => {
        console.log(currentTime);
        //console.log(watchPosition);
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
            {/*<Text>{watchPosition.latitude}</Text>*/}
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