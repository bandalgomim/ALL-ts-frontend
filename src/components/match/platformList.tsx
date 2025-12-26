import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Linking, View, Text, ImageBackground } from 'react-native';
import { platform } from '@model/match.dto';
import { width, height } from '@/global';

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
  const hasReplayType = platformList.some(item => item.platfromMatchUrlType === 'replay');
  if (!hasReplayType && type === 'replay') {
    type = 'root';
  }

  const renderItem = useCallback(({ item, index }: { item: platform, index: number }) => {
    let uri = require('@assets/match/platform/none.png');
    if(item.platformName === 'soop') {
      uri = require('@assets/match/platform/soop.png');
    } else if(item.platformName === 'youtube') {
      uri = require('@assets/match/platform/youtube.png');
    } else if(item.platformName === 'tving') {
      uri = require('@assets/match/platform/tving.png');
    } else if(item.platformName === 'spotv') {
      uri = require('@assets/match/platform/spotv.png');
    } else if(item.platformName === 'coupang') {
      uri = require('@assets/match/platform/coupang.png');
    }

    // marginRight: 다음 아이템이 있으면 10, 마지막이면 0
    const isLast = index === platformList.length - 1;

    if (item.platfromMatchUrlType && type === item.platfromMatchUrlType) {
      return (
        <TouchableOpacity
          onPress={() => {
            openUrlHandle(item.platformMatchUrl ? item.platformMatchUrl as string : item.platformLeagueUrl as string);
          }}
        >
          <View style={[styles.platformItemContainer, isLast ? styles.platformItemLast : styles.platformItemWithMargin]}>
            <ImageBackground
              resizeMode="contain"
              source={uri}
              style={[styles.box]}
            >
              <Text style={[styles.boxText]}>
                {item.platformName}
              </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }, [type, platformList]);

  return (
    <View style={styles.platformContainer}>
      <View style={styles.barContainer}>
        <View style={styles.frontDateBar} />
        <View>
          <Text style={[styles.dateText, type === 'highlight' ? styles.dateTextHighlight : styles.dateTextVideos]}>
            {type === 'replay' || type === 'root' ? 'videos' : 'highlight'}
          </Text>
        </View>
        <View style={[styles.backDateBar, type === 'highlight' ? styles.backDateBarHighlight : styles.backDateBarVideos]} />
      </View>
      <FlatList
        style={styles.flatList}
        data={platformList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false} // 수직 스크롤바 숨기기 (필요한 경우)
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  platformContainer: {
    width: width * 0.5,
    alignItems: 'center',
  },
  barContainer: {
    //justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    width: width * 0.45,
  },
  platformItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformItemWithMargin: {
    marginRight: width * 0.04,
  },
  platformItemLast: {
    marginRight: 0,
  },
  flatList: {
    width: width * 0.45,
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
  frontDateBar: {
    width: width * 0.06,
    height: height * 0.005,
    borderRadius: 10,
    marginTop: height * 0.011,
    backgroundColor: 'white',
  },
  dateText: {
    //borderWidth:1,
    fontFamily: 'sb-it-ver1',
    color: 'white',
    fontSize: width * 0.05,
    width: width * 0.21,
    textAlign: 'center',
    marginBottom: -height * 0.00,
  },
  dateTextHighlight: {
    width: width * 0.18,
  },
  dateTextVideos: {
    width: width * 0.13,
  },
  backDateBar: {
    height: height * 0.005,
    borderRadius: 10,
    marginTop: height * 0.011,
    backgroundColor: 'white',
  },
  backDateBarHighlight: {
    width: width * 0.205,
  },
  backDateBarVideos: {
    width: width * 0.2505,
  },
});

export default React.memo(PlatformList);
