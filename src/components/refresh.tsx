import React, { useCallback, useContext } from 'react';
import { StyleSheet,  Image, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { height, width } from '../global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { refetchDto } from '../model/refetch.dto';

const RefreshButton: React.FC<refetchDto> = ({ refetch }) => {

  return (
    <View>
      <TouchableOpacity style={{zIndex: 100, marginLeft: width*0.009, marginTop:height*0.003 }} onPress={() => refetch()}>
        <Icon name={'autorenew'} size={height*0.025} color={'#30397A'} />
      </TouchableOpacity>
    </View>
      
  );
};

const styles = StyleSheet.create({
  logoView: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    fontBlueBig: {
      fontFamily: 'sb-it-ver1',
      color: '#30397A',
      textShadowColor: '#bdb4b4',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 3,
      textAlign: 'center',
      marginTop: width * 0.005,
    },
    fontBlueBigKR: {
      fontFamily: 'NotoSansKR-ExtraBold',
      color: '#30397A',
      textShadowColor: '#bdb4b4',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 3,
      textAlign: 'center',
      marginBottom: width * 0.005,
    },
});

export default React.memo(RefreshButton);