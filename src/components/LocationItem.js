import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export const LocationItem = (props) => {
  _handlePress = async() => {
    const res = await this.props.fetchDetails(this.props.place_id)
  }
  return (
    <TouchableOpacity style = {styles.root}>
      <Text>{this.props.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  }
})