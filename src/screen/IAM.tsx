import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { width, height } from '@/global';
import AuthButton from '@components/IAM/authButton';
import GoogleAuthButton from '@components/IAM/googleAuthButton';
import AppleAuthButton from '@components/IAM/appleAuthButton';

// ✅ moti로 교체
import { MotiView, AnimatePresence } from 'moti';

const IAMScreen = () => {
  const [snsView, setSnsView] = useState<boolean>(false);
  const [type, setType] = useState<'in' | 'up'>('in');

  return (
    <View style={styles.container}>
      <View style={styles.LogoContainer}>
        <View style={[styles.logoBase, styles.logoWithDimensions]}>
          <Text style={[styles.textBase, styles.text1, styles.textWhite]}>ALL</Text>
          <Text style={[styles.textBase, styles.text2]}>'</Text>
          <Text style={[styles.textBase, styles.text3, styles.textWhite]}>ts</Text>
        </View>
        <View>
          <Text style={[styles.textBase, styles.text4, styles.textWhite]}>
            All  Sports  Scheduler
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.typeButtons}>
          <View style={styles.buttonLeft}>
            <AuthButton type="up" setType={setType} setSnsView={setSnsView} snsView={snsView} />
          </View>
          <View style={styles.buttonRight}>
            <AuthButton type="in" setType={setType} setSnsView={setSnsView} snsView={snsView} />
          </View>
        </View>

        <View style={styles.snsWrapper}>
          <AnimatePresence>
            {snsView && (
              <MotiView
                key="sns-drop"
                from={{ opacity: 0, translateY: -16 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -16 }}
                transition={{ type: 'timing', duration: 260 }}
                style={styles.snsInner}
              >
                <GoogleAuthButton type={type} />
                <AppleAuthButton type={type} />
              </MotiView>
            )}
          </AnimatePresence>
          <Text style={styles.legalDisclaimerText}>
            THIS IS AN UNOFFICIAL APP AND IS NOT AFFILIATED WITH,
ENDORSED BY, OR SPONSORED BY ANY LEAGUE, TEAM, OR ORGANIZATION.
DATA PROVIDED BY API-SPORTS AND PANDASCORE.
</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#30397A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalDisclaimerText: {
    color: '#EA5579',
    fontFamily: 'sb-it-ver1',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: height * 0.025,
    width: width * 0.8,
  },
  LogoContainer: {
    marginTop: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // logo와 logoWithDimensions 통합
  logoBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logoWithDimensions: {
    width: width * 0.8,
    height: height * 0.24,
    marginTop: -height * 0.04,
  },
  // 공통 텍스트 베이스 스타일
  textBase: {
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'rg-it-ver2',
    width: width * 0.5,
    fontSize: width * 0.43,
  },
  text2: {
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
    width: width * 0.15,
    fontSize: width * 0.43,
    marginLeft: -width * 0.1,
  },
  text3: {
    fontFamily: 'lt-it-ver3',
    width: width * 0.15,
    fontSize: width * 0.15,
    marginLeft: -width * 0.08,
    marginBottom: height * 0.03,
  },
  text4: {
    color: '#EA5579',
    fontFamily: 'rg-it-ver2',
    width: width,
    fontSize: width * 0.0885,
    marginTop: -height * 0.04,
  },
  textWhite: {
    color: '#ffffff',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 5 },
    textShadowRadius: 3,
  },
  buttonsContainer: {
    width: width,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: height * 0.01,
    paddingBottom: height * 0.005,
    width: width,
    borderBottomWidth: 1,
    borderColor: '#3D2259',
  },
  buttonLeft: {
    marginLeft: width * 0.1,
  },
  buttonRight: {
    marginRight: width * 0.1,
  },
  snsWrapper: {
    alignItems: 'center',
    height: height * 0.12,
    marginTop: -height * 0.01,
    borderColor: 'red',
    overflow: 'visible',
  },
  snsInner: {
    alignItems: 'center',
  },
});

export default IAMScreen;
