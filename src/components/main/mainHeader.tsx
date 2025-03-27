import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Shadow } from 'react-native-shadow-2';

export const MainHeader = () => {
  const { width, height } = Dimensions.get('window');
  return (
    <View style={[styles.header, {width: width * 0.8, height: height * 0.04, marginTop: height * 0.02}]}>
      <TouchableOpacity style={[styles.myPage,{}]}>
        <Shadow
          startColor={'#242b5c'}
          endColor={'#30397A'}
          distance={6}
          offset={[0, 8]}
          style={[{width: (width * 0.1) - 3, height: (width * 0.09) - 6}, styles.ShadowContainer]}
        >
          <View style={[styles.menu, {width: width * 0.1, height: width * 0.09}]}>
            <Image
            resizeMode="contain"
            style={[{width: width * 0.07, height: width * 0.09}]}
            source={require('./../../assets/main/three.png')} />
          </View>
        </Shadow>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.myPage,{marginTop: height * 0.005}]}>
        <Icon name={'person'} size={30} color={'white'} />
        <Text style={[styles.myPageText,{marginTop: -height * 0.005}]}>USER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',   // 가로 배치
    justifyContent: 'space-between',  // 양 끝 정렬
    alignItems: 'center',   // 수직 정렬 (선택 사항)
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  ShadowContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  myPage: {
  },
  myPageText: {
    color: 'white',
    fontFamily: '',
  },
});
