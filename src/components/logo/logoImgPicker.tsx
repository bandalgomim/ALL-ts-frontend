import React, { useContext } from 'react';
import { Button, View, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { hookIcon } from '../../hooks/icon.hook';
import { AuthContext } from '../../context/auth.context';
import { TeamContext } from '../../context/team.context';
import { LeagueContext } from '../../context/league.context';

interface TeamOrLogoPros {
    type: 'team' | 'league',
    id: number,
    uri: string;
}

const LogoImgPicker: React.FC<TeamOrLogoPros> = ({ type, id, uri }) => {
  const { setTeamRes } = useContext(TeamContext);
  const { setLeagueRes } = useContext(LeagueContext);
  const { setLogin } = useContext(AuthContext);
  const handleSelectAndSaveImage = async (type:TeamOrLogoPros['type'], id: number, uri: string) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    
    if (result.assets?.length) {
      const sourceUri = result.assets[0].uri!;
      const originalFileName = result.assets[0].fileName; // 원본 파일명
      const destPath = `${RNFS.DocumentDirectoryPath}/${originalFileName}`;
      
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
        await hookIcon('PATCH', req, dispatch, setLogin);
        
        Alert.alert('✅ 이미지 저장 성공', `경로: ${destPath}`);
        console.log('저장된 경로:', destPath);
      } catch (error) {
        console.error('이미지 처리 오류:', error);
        Alert.alert('❌ 저장 실패', error.message);
      }
    } else {
      Alert.alert('⚠️ 이미지 선택이 취소되었습니다');
    }
  };

  const deleteAllSavedImages = async () => {
    try {
      // DocumentDirectory 내의 모든 파일 목록 가져오기
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      console.log('모든 파일 목록:', files);
      // 이미지 파일만 필터링 (jpg, png, jpeg 등)
      const imageFiles = files.filter(file => 
        file.name.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
      );

      if (imageFiles.length === 0) {
        Alert.alert('ℹ️ 삭제할 이미지가 없습니다');
        return;
      }

      // 확인 대화상자
      Alert.alert(
        '⚠️ 모든 이미지 삭제',
        `${imageFiles.length}개의 이미지를 삭제하시겠습니까?`,
        [
          { text: '취소', style: 'cancel' },
          { 
            text: '삭제', 
            style: 'destructive',
            onPress: async () => {
              // 모든 이미지 파일 삭제
              const deletePromises = imageFiles.map(file => RNFS.unlink(file.path));
              await Promise.all(deletePromises);
              
              Alert.alert('✅ 삭제 완료', `${imageFiles.length}개의 이미지가 삭제되었습니다`);
              console.log('삭제된 파일들:', imageFiles.map(f => f.name));
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('❌ 삭제 실패', error.message);
      console.error('이미지 삭제 오류:', error);
    }
  };

  return (
    <>
        <View style={{ marginTop: 50, borderWidth:1 }}>
            <Button title="로고 변경" onPress={()=>handleSelectAndSaveImage(type, id, uri)} />
        </View>
        <View style={{ marginTop: 50, borderWidth:1 }}>
            <Button title="로고 삭제" onPress={deleteAllSavedImages} color="orange" />
        </View>
    </>
  );
};

export default React.memo(LogoImgPicker);