import React, { useContext } from 'react';
import { Button, View, Alert, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { hookIcon } from '@hooks/icon.hook';
import { AuthContext } from '@context/auth.context';
import { useTeamState, useTeamActions } from '@context/team.context';
import { useLeagueState, useLeagueActions } from '@context/league.context';
import { height, width } from '@/global';
import { useLogoModalActions } from '@context/modal/logoModal.context';

interface TeamOrLogoPros {
    type: 'team' | 'league',
    id: number,
    uri: string;
}

const LogoImgPicker: React.FC<TeamOrLogoPros> = ({ type, id, uri }) => {
  const { close} = useLogoModalActions();
  const { setTeamRes} = useTeamActions();
  const { setLeagueRes } = useLeagueActions();
  const handleSelectAndSaveImage = async (type:TeamOrLogoPros['type'], id: number, uri: string) => {
    
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    
    if (result.assets?.length) {
      const sourceUri = result.assets[0].uri!;
      const originalFileName = result.assets[0].fileName; // 원본 파일명
      const destPath = `${RNFS.DocumentDirectoryPath}/${originalFileName}`;
      close()
      try {
        // 1. 기존 파일이 있다면 삭제
        if (uri && uri !== '') {
          console.log('기존 파일 삭제 시도:', uri);
          const existingFileExists = await RNFS.exists(uri);
          if (existingFileExists) {
            await RNFS.unlink(uri);
            console.log('기존 파일 삭제 완료:', uri);
          } else {
            console.log('기존 파일이 존재하지 않음:', uri);
          }
        }
        
        // 2. 새로운 파일 복사
        await RNFS.copyFile(sourceUri, destPath);
        console.log('새 파일 복사 완료:', destPath);
        
        // 3. 서버에 업데이트 요청
        const req = {
          type: type,
          id: id,
          uri: destPath,
        }
        const dispatch = type === 'team' ? setTeamRes : setLeagueRes;
        await hookIcon('PATCH', req, dispatch);
        Alert.alert('이미지 저장 성공');
      } catch (error) {
        console.error('이미지 처리 오류:', error);
        Alert.alert('저장 실패', error.message);
      }
    } else {
      Alert.alert('이미지 선택이 취소되었습니다');
    }
  };

  const deleteSavedImages = async (type:TeamOrLogoPros['type'], id: number, uri: string) => {
    try {
        // 1. 기존 파일이 있다면 삭제
        if (uri && uri !== '') {
          console.log('기존 파일 삭제 시도:', uri);
          const existingFileExists = await RNFS.exists(uri);
          if (existingFileExists) {
            await RNFS.unlink(uri);
            console.log('기존 파일 삭제 완료:', uri);
          } else {
            console.log('기존 파일이 존재하지 않음:', uri);
          }
        }
        close()
        const req = {
            type: type,
            id: id,
            uri: null,
          }
          const dispatch = type === 'team' ? setTeamRes : setLeagueRes;
          await hookIcon('PATCH', req, dispatch);
          
          Alert.alert('이미지 삭제 성공');
          
    } catch (error) {
        console.error('이미지 처리 오류:', error);
        Alert.alert('저장 실패', error.message);
    }
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: height*0.02, width: width*0.5}}>
        <View style={{ marginTop: height*0.012}}>
          <TouchableOpacity style={styles.authContainer} onPress={()=>handleSelectAndSaveImage(type, id, uri)}>
                <ImageBackground
                  resizeMode="contain"
                  source={require('@assets/match/platform/soop.png')}
                  style={[styles.box]}
                >
                  <Text style={[styles.boxText]}>
                      로고 변경
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
        </View>
        <View style={{ marginTop: height*0.012 }}>
        <TouchableOpacity style={styles.authContainer} onPress={()=>deleteSavedImages(type, id, uri)}>
                <ImageBackground
                  resizeMode="contain"
                  source={require('@assets/match/platform/youtube.png')}
                  style={[styles.box]}
                >
                  <Text style={[styles.boxText]}>
                      로고 삭제
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    alignItems: 'center',
  },
  box: {
    width: width * 0.2,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    marginTop: -height * 0.008,
    fontFamily: 'sb-it-ver1',
    color: 'white',
    fontSize: width * 0.06,
    width: width * 0.21,
    textAlign: 'center',
  },

});

export default React.memo(LogoImgPicker);