import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export const HomeScreen = ({navigation}, props) => {

    const [positionNow, setPositionNow] = useState(null);
    const [ watchPosition, setWatchPosition ] = useState(null);
    const [ currentTime, setCurrentTime ] = useState('now');
    const [code, setCode] = useState('')
 
    //geolocation upon mounting
    // issue: why does it take so long to load

    const handlePress = () => {
        console.log(currentTime);
        //console.log(watchPosition);
    }

    const dropdownPress = () => {

    }

    const profilePic = require("../src/assets/userIcon.png");
    const thermoPic = require("../src/assets/thermo.png");
    const downArrow = require("../src/assets/downArrow.png");
    
    return(
        <View style={styles.screenContainer}>
          <View style={styles.topContainer}>
            <View style={styles.bigCircle}>        
              <View style={styles.profileContainer}>
                <Image source={profilePic} style={styles.profilePic}></Image>
              </View>
              <View style={styles.homeNameContainer}>
                <TouchableOpacity 
                  style={styles.downArrowButton}
                  onPress={dropdownPress}
                >
                  <Image source={downArrow} style={styles.downArrow}></Image>
                </TouchableOpacity>
                <Text style={styles.homeName}>Manage Homes</Text>
              </View>
            </View>
            <View style={styles.tempCircle}>
              <Image source={thermoPic} style={styles.thermoPic}></Image>
              <Text style={styles.temperature}>28</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.prefButton}>
              <View style={styles.prefView}>
                <FontAwesome5 name="thermometer-half" size={24} color="#F0F0F0" />
              </View>
            </TouchableOpacity>
          </View>
           {/*
            <Text>CONGRATS THIS APP FINALLY WORKS</Text>
            <Image source={{uri: "https://thumbs.dreamstime.com/b/puppies-celebrating-birthday-singing-14013137.jpg"}}
            style={{width: 200, height: 200}}></Image>
            <TouchableOpacity onPress={() => navigation.navigate('managehomes')}>
                <Text>Go to Manage Homes</Text>
            </TouchableOpacity>

            <Button onPress={handlePress}/>
            <Text>{watchPosition.latitude}</Text>
            <Text>{currentTime}</Text>
            
           <StatusBar style="auto" />*/}
      </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'F0F0F0',
    },
    topContainer: {
      flex: 3,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bigCircle: {
      backgroundColor: '#F1B104',
      width: '120%',
      height: '50%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      alignItems: 'center',
      flex: 1,
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 36,
      marginBottom: '10%'
      /*
      width: '160%',
      height: '80%',
      borderRadius: '50%',
      marginBottom: '10%',
      flexDirection: 'column',
      justifyContent: 'flex-end'*/
    },
    profileContainer:{
      height: 80,
      width: '83%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    profilePic: {
      height: 35,
      width: 35,
      marginRight: '10%'
    },
    homeNameContainer: {
      height: 120,
      width: '83%',
      justifyContent: 'center',
      alignContent: 'flex-end',
      paddingTop: '8%',
      flexDirection: 'row'
    },
    homeName: {
      textAlign: 'center',
      color: '#F0F0F0',
      fontWeight: '600',
      fontSize: 20
    },
    downArrow: {
      width: 20,
      height: 20,
    },
    downArrowButton: {
      marginRight: '3%'
    },
    tempCircle: {
      width: '80%',
      height: '62%',
      marginTop: '-55%',
      marginBottom: '5%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    thermoPic: {
      width: '80%',
      height: '80%',
    },
    temperature: {
      position: 'absolute',
      color: '#F0F0F0',
      fontWeight: '600',
      fontSize: 32,
      marginBottom: '5%'
    },
    bottomContainer: {
      flex: 1,
      backgroundColor: '#F0F0F0',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    prefButton: {
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: '#F1B104',
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 36,
    },
    prefView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});