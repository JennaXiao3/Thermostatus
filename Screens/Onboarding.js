import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, KeyboardAvoidingView, TextInput, TouchableOpacity, Linking } from 'react-native';
import Style from '../src/components/Style';
import slides from '../src/constants/slides';
import { OnboardingItem } from '../src/components/OnboardingItem';

export const Onboarding = ()=> {

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={styles.container}>
      <View style={{flex : 3}}>
        <FlatList 
          data={slides} 
          contentContainerStyle={{flex: 1}}
          renderItem={({ item }) => <OnboardingItem item={item}/>} 
          horizontal={true}
          showsHorizontalScrollIndicator
          pagingEnabled
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
  },

})