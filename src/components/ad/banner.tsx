import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const BANNER_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4702221338725869/3630555253'; // AdMob에서 배너용 단위를 따로 생성해 넣으세요

export function BannerBottom() {
  return (
    <BannerAd
      unitId={BANNER_UNIT_ID}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} // 화면폭에 맞게
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      onAdFailedToLoad={(e) => console.log('Banner fail:', e)}
    />
  );
}