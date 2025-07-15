import React, { useCallback, useContext } from 'react';
import { StyleSheet,  Image, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { height, width } from '../../global';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { ModalContext } from '../../context/modal.context';


interface TeamOrLogoPros {
    type: 'team' | 'league',
    id: number,
    uri: string;
}

const LogoPicker: React.FC<TeamOrLogoPros> = ({ type, id, uri }) => {
  const { setLogoModalVisible, setLogoModalContents } = useContext(ModalContext);
  const onPressDate = useCallback((type: TeamOrLogoPros['type'], id: number, uri: string ) => {
    setLogoModalContents({'type': type, 'id': id, 'uri': uri});
    setLogoModalVisible(true);
  }, [setLogoModalContents, setLogoModalContents]);

  return (
      <TouchableOpacity style={{zIndex: 100 }} onPress={() => onPressDate(type, id, uri)}>
        <Icon name={'options-vertical'} size={height*0.03} color={'#30397A'} />
      </TouchableOpacity>
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

export default React.memo(LogoPicker);