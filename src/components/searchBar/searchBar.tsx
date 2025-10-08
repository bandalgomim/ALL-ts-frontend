import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet,  Image, ImageBackground } from 'react-native';
import { width, height } from '../../global';
import { ModalContext, useSearchActions } from '../../context/modal/search.context';


interface SearchBarPros {
    type: string | null;
}

const imageMap = {
  blue: require('./../../assets/searchBar/searchBar_blue.png'),
  white: require('./../../assets/searchBar/searchBar_white.png'),
  match: require('./../../assets/searchBar/searchBar.png'),
};

const SearchBar: React.FC<SearchBarPros> = ({ type }) => {
  const src = type ? imageMap[type as keyof typeof imageMap] : null;
  const { open } = useSearchActions()

  return type ? (
    <View style={[styles.Container, { width: width * 0.7, height: height * 0.1, marginTop: height * 0.015, marginBottom: -height * 0.015}]}>
      <TouchableOpacity onPress={()=>{open();}}>
        <Image
          resizeMode="contain"
          style={{ width: width * 0.45, height: width * 0.1 }}
          source={src}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <>
    <TouchableOpacity onPress={()=>{open();}}>
      <ImageBackground
        source={require('../../assets/teamLogo/teamLogo_m.png')}
        style={[styles.logoView, { width:width * 0.16 }]}
      >
        <Image
          resizeMode="contain"
          source={require('../../assets/main/botton.png')}
          style={{ width: width * 0.16 * 0.8, height: width * 0.16 * 0.8 }}
        />
      </ImageBackground>
    </TouchableOpacity>
  </>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoView: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SearchBar);
