import React, { useEffect, useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import {
  NativeAd,
  TestIds,
  AdEventType,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
} from "react-native-google-mobile-ads";


type AdUnitIdType = string;

const AD_UNIT_ID: AdUnitIdType = Platform.select({
  ios: TestIds.NATIVE,
  android: TestIds.NATIVE
}) as AdUnitIdType;

/**
 * [공통] 네이티브 고급 광고
 * @returns
 */
const AdmobNativeAd: React.FC = () => {
  const [nativeAd, setNativeAd] = useState<NativeAd>();

  useEffect(() => {
    NativeAd.createForAdRequest(AD_UNIT_ID)
      .then(setNativeAd)
      .catch(console.error);
  }, []);

  if (!nativeAd) {
    return null;
  }

  return (
    // Wrap all the ad assets in the NativeAdView component, and register the view with the nativeAd prop
    <NativeAdView nativeAd={nativeAd}>
        <NativeAsset assetType={NativeAssetType.HEADLINE}>
    <Text>{nativeAd.headline}</Text>
  </NativeAsset>
      <View
      style={{
        width: 120,
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',       // <-- 핵심
        backgroundColor: '#000',  // 안쪽 투명 가장자리 방지 (안드로이드용)
      }}
    >
      <NativeMediaView
        style={{
          flex: 1,               // 부모 크기에 맞춤
          // 선택: 필요하면 비율 고정
          // aspectRatio: 1,
          // resizeMode는 MediaView에는 없으니 크기는 부모로 조절
        }}
      />
    </View>
    </NativeAdView>
  );
};

export default AdmobNativeAd;