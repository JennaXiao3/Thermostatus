import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import Style from '../src/components/Style';
import slides from '../src/constants/slides';
import { OnboardingItem } from '../src/components/OnboardingItem';
import { AntDesign } from '@expo/vector-icons';

export const Onboarding = ({navigation})=> {

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;


  const testPrint = () => {
    console.log(slides);
  }


  return (
    <View style={styles.container}>
      <View style={{flex : 3, flexDirection: "row"}}>
        <View style={{width: "98vh", height: "100%"}}>

        </View>

        <FlatList 
          data={slides} 
          contentContainerStyle={{flex: 2}}
          renderItem={({ item }) => <OnboardingItem item={item}/>} 
          horizontal={true}
          showsHorizontalScrollIndicator
          pagingEnabled={true}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }}}], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate('chooseauth')}
          style={styles.buttonNext}>
          <AntDesign name="arrowright" style={styles.arrow} size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    //marginLeft: "-vh",
  },
  list: {
    flex: 1,
  },
  buttonNext: {
    width: 100,
    height: 50,
    backgroundColor: '#F1B104',
    flex: 1,
    marginLeft: '400%',
    borderRadius: 50,
    justifyCenter: 'center',
    alignItems: 'center'
  },
  arrow: {
    marginTop: 30
  }
})