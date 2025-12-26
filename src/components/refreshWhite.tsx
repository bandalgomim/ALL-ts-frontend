import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { height, width } from '@/global';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { refetchDto } from '@model/refetch.dto';

const RefreshButtonWhite: React.FC<refetchDto> = ({ refetch }) => {

  return (
    <View>
      <TouchableOpacity style={styles.refreshButton} onPress={() => refetch()}>
        <Icon name={'autorenew'} size={height * 0.035} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    zIndex: 100,
    marginLeft: width * 0.02,
    marginBottom: height * 0.04,
  },
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

export default React.memo(RefreshButtonWhite);
