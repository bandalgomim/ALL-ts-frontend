import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import SearchModal from './serchModal';

interface SerchBarPros {
    type: string;
}

const imageMap = {
  blue: require('./../../assets/searchBar/serchBar_blue.png'),
  white: require('./../../assets/searchBar/serchBar_white.png'),
  match: require('./../../assets/searchBar/serchBar.png'),
};

export const SerchBar: React.FC<SerchBarPros> = ({ type }) => {
  const { width, height } = Dimensions.get('window');
  const src = imageMap[type as keyof typeof imageMap];
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={[styles.Container, { width: width * 0.7, height: height * 0.1 }]}>
      <TouchableOpacity onPress={()=>{setIsVisible(true); }}>
        <Image
          resizeMode="contain"
          style={{ width: width * 0.45, height: width * 0.1 }}
          source={src}
        />
      </TouchableOpacity>
      <View>
        <SearchModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});