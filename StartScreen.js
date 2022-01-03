import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

export const StartScreen = ({navigation}) => {
    return(
        <View style={styles.screenContainer}>
            <Text>Starting Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                Go to Home Page.
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'periwinkle'
    }
});