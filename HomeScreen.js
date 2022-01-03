import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export const HomeScreen = () => {
    return(
        <View style={styles.screenContainer}>
            <Text>CONGRATS THIS APP FINALLY WORKS</Text>
            <Image source={{uri: "https://thumbs.dreamstime.com/b/puppies-celebrating-birthday-singing-14013137.jpg"}}
            style={{width: 200, height: 200}}></Image>
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