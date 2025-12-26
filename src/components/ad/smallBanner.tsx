import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import {
  NativeAd,
  TestIds,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
} from 'react-native-google-mobile-ads';
import { height, width } from '@/global';


type AdUnitIdType = string;

const AD_UNIT_ID: AdUnitIdType = Platform.select({
  ios: TestIds.NATIVE/*'ca-app-pub-4702221338725869/9501829039'*/,
  android: TestIds.NATIVE,
}) as AdUnitIdType;

interface AdmobNativeAdProps {
  color: string
}

const AdmobNativeAdSmall: React.FC<AdmobNativeAdProps> = ({color}) => {
  const [nativeAd, setNativeAd] = useState<NativeAd>();
  useEffect(() => {
    NativeAd.createForAdRequest(AD_UNIT_ID)
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  if (!nativeAd) {
    return null;
  }

  const hedlineColor = color === 'white'
    ? styles.textBlue
    : color === 'blue'
    ? styles.textWhite
    : styles.texCtaWhite;

  const bodyColor = color === 'white'
    ? styles.textBlue
    : color === 'blue'
    ? styles.textWhite
    : styles.texCtaWhite;

  const ctaColor = color === 'white'
    ? styles.texCtaWhite
    : color === 'blue'
    ? styles.texCtaWhite
    : styles.textWhite;

  return (
    <ImageBackground
      resizeMode="contain"
      source={
        color === 'white'
          ? require('@assets/match/bar/matchBar_w-TEST.png')
          : color === 'blue'
          ? require('@assets/match/bar/matchBar_b-TEST.png')
          : require('@assets/match/bar/matchBar_r-TEST.png')
      }
      style={styles.imageBackground}
    >
      <NativeAdView nativeAd={nativeAd} style={styles.nativeAdView}>
        <View style={styles.iconContainer}>
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image source={{ uri: nativeAd.icon?.url }} width={width * 0.1} height={width * 0.1} borderRadius={8}/>
          </NativeAsset>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.headlineRow}>
            <View style={styles.headlineContainer}>
              <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text
                  numberOfLines={1}
                  style={[styles.teamName, hedlineColor, styles.headlineText]}
                >{nativeAd.headline}</Text>
              </NativeAsset>
            </View>
          </View>
          <View style={styles.bodyRow}>
            <Text style={[styles.adLabel, color === 'red' ? styles.adLabelWhite : styles.adLabelGray]}>AD </Text>
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text
                numberOfLines={1}
                style={[styles.teamName, bodyColor, styles.bodyText]}
              >
                {nativeAd.body ? nativeAd.body : '지금 바로 확인해보세요'}
              </Text>
            </NativeAsset>
          </View>
        </View>
        <View style={[styles.ctaButton, color === 'red' ? styles.ctaButtonBlue : styles.ctaButtonPink]}>
          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            <Text
              numberOfLines={1}
              style={[styles.teamName, ctaColor, styles.ctaText]}
            >{nativeAd.callToAction}</Text>
          </NativeAsset>
        </View>
      </NativeAdView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    width: width * 0.93,
    height: height * 0.075,
    alignItems: 'center',
  },
  nativeAdView: {
    flexDirection: 'row',
    width: width * 0.9,
    height: height * 0.06,
    marginTop: -height * 0.01,
    alignItems: 'center',
  },
  iconContainer: {
    width: width * 0.135,
    justifyContent: 'center',
    marginLeft: width * 0.013,
    marginTop: height * 0.0007,
  },
  contentContainer: {
    marginLeft: width * 0.012,
    marginTop: height * 0.004,
  },
  headlineRow: {
    flexDirection: 'row',
    width: width * 0.55,
  },
  headlineContainer: {
    width: width * 0.55,
    marginTop: height * 0.005,
  },
  headlineText: {
    textAlign: 'left',
    height: height * 0.032,
  },
  bodyRow: {
    width: width * 0.45,
    marginRight: width * 0.035,
    flexDirection: 'row',
  },
  adLabel: {
    fontSize: width * 0.035,
    marginTop: height * 0.002,
  },
  adLabelWhite: {
    color: 'white',
  },
  adLabelGray: {
    color: 'gray',
  },
  bodyText: {
    textAlign: 'left',
    fontSize: width * 0.042,
    height: height * 0.032,
  },
  ctaButton: {
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: width * 0.01,
    paddingRight: width * 0.01,
    width: width * 0.17,
    height: height * 0.037,
    justifyContent: 'center',
    marginLeft: width * 0.026,
  },
  ctaButtonBlue: {
    backgroundColor: '#30397A',
  },
  ctaButtonPink: {
    backgroundColor: '#EA5579',
  },
  ctaText: {
    textAlign: 'left',
    fontSize: width * 0.06,
    height: height * 0.032,
  },
  textWhite: {
    color: 'white',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  textRed: {
    color: '#30397A',
    textShadowColor: '#bb4461',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  texCtaWhite: {
    color: 'white',
    textShadowColor: '#c24765',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  textCtaRed: {
    color: '#EA5579',
    textShadowColor: '#cbcbcb',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
  teamName: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.055,
  },
});

export default AdmobNativeAdSmall;
