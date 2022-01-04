import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export const ManageHomes = ({navigation}, props) => {
    return(
        <View style={styles.screenContainer}>
            <View style={styles.homeContainer}>
                <Text>This is a home.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'purple',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'    
    },

    homeContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});