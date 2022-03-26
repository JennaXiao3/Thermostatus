import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import {useState} from 'react';







export const OnboardingItem = ({ item }) => {
  const {width}  = useWindowDimensions();
  const [id, setId] = useState(item.id);
  
  let img = require('../assets/slide3.png');

  if (item.image == '../assets/slide1.png') {
    img = require('../assets/slide1.png');
  } else if (item.image == '../assets/slide2.png') {
    img = require('../assets/slide2.png');
  }

  const onPressNext = () => {

  }

  if (item.id == 3) {
    return(
      <View style={[styles.container, { width: width }]}>
        <View style={styles.imageContainer}>
          <Image source={img} style={styles.image}/>
          <Text>{width}</Text>
          <Text>{id}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <TouchableOpacity
          onPress={onPressNext}
          style={styles.buttonNext}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={styles.imageContainer}>
        <Image source={img} style={styles.image}/>
        <Text>{width}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
  </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  imageContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: '75%',
    paddingHorizontal: 30,
    marginBottom: '25%',
    marginTop: '100%'
  },
  info: {
    flex: 3,
    justifyContent: 'center'
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#3F3E55',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#3F3E55',
    textAlign: 'center',
    paddingHorizontal: 64
  }, buttonText: {
    fontSize: 16,
  }, buttonNext: {
    backgroundColor: '#F1B104',
    width: '80%',
    borderRadius: 22,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    alignSelf: 'center'
  }
})