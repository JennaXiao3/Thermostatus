import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Easing, 
  SafeAreaViewBase,
  SafeAreaView, 
  Text, 
  View, 
  Image, 
  Dimensions, 
  Touchable, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import info from '../src/constants/data';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen')
const BG_IMG = require('../src/assets/homeBackground.png');
const SPACING = 20;
const HOME_ICON = 60;

export const ManageHomes = ({navigation}, props) => {

    return(
        <View style={styles.screenContainer}>
          <View style={styles.homeHeading}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('home')}
              style={styles.arrowLeft}
            >
              <AntDesign name="arrowleft" size={24} color="white"/>
            </TouchableOpacity>
            <Text style={styles.title}>Manage Homes</Text>
          </View>
          <View style={styles.homeContainer}>
          <Image 
            source={BG_IMG} 
            style={[StyleSheet.absoluteFillObject, {marginRight: -40}]}
            blurRadius={80}
          ></Image>
              <FlatList
                data={info}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.subcontainer}>
                      <TouchableOpacity style={styles.homeButton}>
                        <MaterialIcons name="home-filled" size={22} color="#F0F0F0" />
                      </TouchableOpacity>
                      <View style={styles.information}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.addressText}>{item.address}</Text>
                        <Text style={styles.numOfPeopleText}>{item.numOfPeople} person(s)</Text>
                      </View>
                    </View>
                  );
                }}
              >

              </FlatList>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F0F0F0'  
    },
    homeHeading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      backgroundColor: '#3F3E55',
      marginBottom: 30,
    },
    arrowLeft: {
      paddingLeft: '8%',
    },
    title: {
      fontSize: 20,
      color: 'white',
      paddingLeft: '5%',
      fontWeight: '500'
    },
    homeContainer: {
      flex: 7,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    subcontainer: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeButton: {
      width: HOME_ICON,
      height: HOME_ICON,
      borderRadius: HOME_ICON,
      backgroundColor: '#F1B104',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: -25,
      zIndex: 1,
      marginBottom: 20,
      marginLeft: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: .1,
      shadowRadius: 12
    },
    information: {
      justifyContent: 'center',
      paddingVertical: SPACING,
      width: 280,
      marginRight: 20,
      paddingLeft: 45,
      marginBottom: SPACING,
      backgroundColor: '#fff',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: .05,
      shadowRadius: 12
    },
    nameText: {
      fontSize: 14,
      color: '#7D7D7D',
      fontWeight: 700,
      lineHeight: 25
    },
    addressText: {
      color: '#7D7D7D',
      fontSize: 12,
    },
    numOfPeopleText: {
      color: '#F1B104',
      fontSize: 12,
      lineHeight: 20
    }
});

/*
backgroundColor: 'white',
        borderRadius: 20,
        height: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
*/