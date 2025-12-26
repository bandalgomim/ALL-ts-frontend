import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import {
  NativeAd,
  TestIds,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
} from 'react-native-google-mobile-ads';
import { height, width } from '@/global';


type AdUnitIdType = string;

const AD_UNIT_ID: AdUnitIdType = Platform.select({
  ios: 'ca-app-pub-4702221338725869/9501829039',
  android: TestIds.NATIVE,
}) as AdUnitIdType;

interface AdmobNativeAdProps {
  color: string
}

const AdmobNativeAdBig: React.FC<AdmobNativeAdProps> = ({color}) => {
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
    ? styles.textWhite
    : color === 'blue'
    ? styles.textBlue
    : styles.textCtaRed;

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
          ? require('@assets/ad/ad_white.png')
          : color === 'blue'
          ? require('@assets/ad/ad_blue.png')
          : require('@assets/ad/ad_red.png')
      }
      style={styles.imageBackground}
    >
      <NativeAdView nativeAd={nativeAd} style={styles.nativeAdView}>
        <View style={styles.mediaContainer}>
          <NativeMediaView style={styles.mediaView} />
        </View>
        <View style={styles.contentContainer}>
          <View style={[styles.headlineContainer, color === 'white' ? styles.headlineBlue : styles.headlineWhite]}>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text
                numberOfLines={1}
                style={[styles.teamName, hedlineColor, styles.headlineText]}
              >{nativeAd.headline}</Text>
            </NativeAsset>
          </View>
          <View style={styles.bodyContainer}>
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text
                numberOfLines={2}
                style={[styles.teamName, bodyColor, styles.bodyText]}
              >
                {nativeAd.body ? nativeAd.body : '지금 바로 확인해보세요'}
              </Text>
            </NativeAsset>
          </View>
          <View style={styles.ctaRow}>
            <View style={styles.adLabelContainer}>
              <Text style={[styles.adLabel, color === 'red' ? styles.adLabelWhite : styles.adLabelGray]}> 광고</Text>
            </View>
            <View style={[styles.ctaButton, color === 'red' ? styles.ctaButtonBlue : styles.ctaButtonPink]}>
              <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                <Text
                  numberOfLines={1}
                  style={[styles.teamName, ctaColor, styles.ctaText]}
                >{nativeAd.callToAction}</Text>
              </NativeAsset>
            </View>
          </View>
        </View>
      </NativeAdView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    width: width * 0.93,
    height: height * 0.17,
    alignItems: 'center',
  },
  nativeAdView: {
    flexDirection: 'row',
    width: width * 0.93,
    height: height * 0.152,
    marginTop: -height * 0.01,
    alignItems: 'center',
  },
  mediaContainer: {
    marginLeft: width * 0.015,
    marginTop: height * 0.0007,
    aspectRatio: 1,
    backgroundColor: 'black',
    width: width * 0.31,
    height: width * 0.31,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
  },
  mediaView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: width * 0.605,
    alignItems: 'center',
  },
  headlineContainer: {
    alignItems: 'center',
    borderRadius: 5,
    width: width * 0.55,
    paddingRight: width * 0.01,
    paddingLeft: width * 0.01,
    marginTop: height * 0.01,
  },
  headlineBlue: {
    backgroundColor: '#30397A',
  },
  headlineWhite: {
    backgroundColor: 'white',
  },
  headlineText: {
    textAlign: 'left',
  },
  bodyContainer: {
    width: width * 0.53,
    height: height * 0.06,
  },
  bodyText: {
    textAlign: 'left',
    fontSize: width * 0.043,
    marginTop: height * 0.005,
  },
  ctaRow: {
    flexDirection: 'row',
    marginLeft: width * 0.11,
    marginBottom: height * 0.01,
  },
  adLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width * 0.26,
    marginRight: width * 0.02,
  },
  adLabel: {
    fontSize: width * 0.035,
  },
  adLabelWhite: {
    color: 'white',
  },
  adLabelGray: {
    color: 'gray',
  },
  ctaButton: {
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: width * 0.01,
    paddingRight: width * 0.01,
    width: width * 0.17,
    height: height * 0.037,
    justifyContent: 'center',
  },
  ctaButtonBlue: {
    backgroundColor: '#30397A',
  },
  ctaButtonPink: {
    backgroundColor: '#EA5579',
  },
  ctaText: {
    textAlign: 'center',
    fontSize: width * 0.06,
    width: width * 0.17,
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
    fontSize: width * 0.07,
  },
  teamNameKR: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: width * 0.06,
    transform: [{ scaleY: 1 }],
    marginTop: height * -0.002,
  },
});

export default AdmobNativeAdBig;
