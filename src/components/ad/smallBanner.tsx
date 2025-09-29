import React, { useEffect, useState } from "react";
import { Button, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  NativeAd,
  TestIds,
  AdEventType,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
} from "react-native-google-mobile-ads";
import { height, width } from "../../global";


type AdUnitIdType = string;

const AD_UNIT_ID: AdUnitIdType = Platform.select({
  ios: TestIds.NATIVE,
  android: TestIds.NATIVE
}) as AdUnitIdType;

interface AdmobNativeAdProps {
  color: string
};

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

  function detectLang(text: string, type: 'headline' | 'body' | 'cta') {
    if (!text) {text = "ad"}
    const hasKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);

      if (hasKR && !hasEnglish && type === 'headline') {
        return (<Text numberOfLines={1} style={[styles.teamNameKR, hedlineColor, {textAlign: 'left', height: height*0.32}]}>{text}</Text>);
      } else if (!hasKR && hasEnglish && type === 'headline') {
        return (<Text numberOfLines={1} style={[styles.teamName, hedlineColor, {textAlign: 'left', height: height*0.032}]}>{text}</Text>);
      } else if (hasKR && !hasEnglish && type === 'body') {
        return (<Text numberOfLines={1} style={[styles.teamNameKR, bodyColor, {textAlign: 'left', fontSize: width * 0.035}]}>{text}</Text>);
      }
      else if (!hasKR && hasEnglish && type === 'body') {
        return (<Text numberOfLines={1} style={[styles.teamName, bodyColor, {textAlign: 'left', fontSize: width * 0.046}]}>{text}</Text>);
      } else if (!hasKR && hasEnglish && type === 'cta') {
        return (<Text numberOfLines={1} style={[styles.teamName, ctaColor, {textAlign: 'center', fontSize: width * 0.044, width: width*0.2}]}>{text}</Text>);
      } else if (hasKR && !hasEnglish && type === 'cta') {
        return (<Text style={[styles.teamNameKR, ctaColor, {textAlign: 'center', fontSize: width * 0.04, width: width*0.2}]}>{text}</Text>);
      } else {
        return (<Text style={[styles.teamName, hedlineColor]}>{text}</Text>);
      }
  }

  return (
    // Wrap all the ad assets in the NativeAdView component, and register the view with the nativeAd prop
    <ImageBackground
      resizeMode="contain"
      source={
        color === 'white'
          ? require('../../assets/match/bar/matchBar_w-TEST.png')
          : color === 'blue'
          ? require('../../assets/match/bar/matchBar_b-TEST.png')
          : require('../../assets/match/bar/matchBar_r-TEST.png')
      }
      style={[{ justifyContent: "center", width: width * 0.93, height: height * 0.075, alignItems: "center"}]}
    >
    {<NativeAdView nativeAd={nativeAd} style={{flexDirection: 'row', width: width * 0.93, height: height*0.065, marginTop: -height*0.01, alignItems: "center"}}>
      <View style={{width: width *0.135, justifyContent: "center", marginLeft: width*0.013, marginTop: height*0.0007}}>
        <NativeAsset assetType={NativeAssetType.ICON}>
          <Image source={{ uri: nativeAd.icon?.url }} width={width*0.12} height={width*0.12} borderRadius={8}/>
        </NativeAsset>
      </View>
      <View>
        <View style={{flexDirection: 'row',width: width*0.55 }}>
          <View style={{width: width*0.44}}>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              {detectLang(nativeAd.headline, 'headline')}
            </NativeAsset>
          </View>
          <Text style={{ fontSize: width*0.035, color: color === 'red' ? 'white' : 'gray', marginTop: height*0.008}}>광고 </Text>
        </View>
        <View style={{ width: width*0.55, marginRight: width*0.035}}>
          <NativeAsset assetType={NativeAssetType.BODY}>
            {detectLang(nativeAd.body, 'body')}
          </NativeAsset>
        </View>
      </View>
      <View style={{ backgroundColor: color === 'red' ? "#30397A" : "#EA5579", alignItems: "center", borderRadius: 5, paddingLeft: width* 0.01, paddingRight: width*0.01, width: width*0.17, height: height*0.037, justifyContent: "center"}}>
          <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
            {detectLang(nativeAd.callToAction, 'cta')}
          </NativeAsset>
        </View>

    </NativeAdView>}
    </ImageBackground>
  );
};


const styles = StyleSheet.create({

  textWhite: {
    color: 'white',
    textShadowColor: '#242b5c', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 2 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  textRed: {
    color: '#30397A',
    textShadowColor: '#bb4461', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  texCtaWhite: {
    color: 'white',
    textShadowColor: '#c24765', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  textCtaRed: {
    color: '#EA5579',
    textShadowColor: '#cbcbcb', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
  },
  teamName: {
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.06,
    
  },
  teamNameKR: {
    fontFamily: 'NotoSansKR-ExtraBold',
    fontSize: width * 0.048,
    transform: [{ scaleY: 1 }],
    marginTop: height * -0.002,
  },
});

export default AdmobNativeAdSmall;