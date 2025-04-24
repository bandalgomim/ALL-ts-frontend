import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { platform } from '../../model/match.dto';
import TeamOrLeagueLogo from '../teamOrLeagueLogo';
import { width, height } from '../../global';

interface ContentsProps {
  platformList: platform[];
  type: string;
}

const openUrlHandle = async (url: string) => {
  const canOpenApp = await Linking.canOpenURL(url);
  if (canOpenApp) {
    Linking.openURL(url);
  } else {
    Linking.openURL(url);
  }
};

const PlatformList: React.FC<ContentsProps> = ({ platformList, type }) => {
  const renderItem = useCallback(({ item, index }: { item: platform, index: number }) => {
    if (item.platfromMatchUrlType && type === item.platfromMatchUrlType) {
      return (
        <TouchableOpacity
          style={[styles.box, { width: width * 0.25 }]}
          onPress={() => {
            openUrlHandle(item.platformMatchUrl as string);
          }}
        >
          <TeamOrLeagueLogo logo={item.platformlogo} type={'middle'} />
        </TouchableOpacity>
      );
    }
    // 조건에 맞지 않으면 null 반환
    return null;
  }, [type]);

  return (
    <>
      <FlatList
        style={{ width: width * 0.5, marginTop: -height * 0.015 }}
        data={platformList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default React.memo(PlatformList);
