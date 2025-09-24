import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { width, height } from '../global';
import AuthButton from '../components/IAM/authButton';
import GoogleAuthButton from '../components/IAM/googleAuthButton';
import AppleAuthButton from '../components/IAM/appleAuthButton';

// ✅ moti로 교체
import { MotiView, AnimatePresence } from 'moti';

const IAMScreen = () => {
  const [snsView, setSnsView] = useState<boolean>(false);
  const [type, setType] = useState<'in' | 'up'>('in');

  return (
    <View style={styles.container}>
      <View style={styles.LogoContainer}>
        <View style={[styles.logo, { width: width * 0.8, height: height * 0.24, marginTop: -height * 0.04 }]}>
          <Text style={[styles.text1, { width: width * 0.5, fontSize: width * 0.43 }, styles.textWhite]}>ALL</Text>
          <Text style={[styles.text2, { width: width * 0.15, fontSize: width * 0.43, marginLeft: -width * 0.1 }]}>’</Text>
          <Text
            style={[
              styles.text3,
              { width: width * 0.15, fontSize: width * 0.15, marginLeft: -width * 0.08, marginBottom: height * 0.03 },
              styles.textWhite,
            ]}
          >
            ts
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.text4,
              { width: width, fontSize: width * 0.0885, marginTop: -height * 0.04 },
              styles.textWhite,
            ]}
          >
            All  Sports  Scheduler
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.typeButtons}>
          <AuthButton type="up" setType={setType} setSnsView={setSnsView} snsView={snsView} />
          <AuthButton type="in" setType={setType} setSnsView={setSnsView} snsView={snsView} />
        </View>

        {/* ▼ 드롭 영역 (moti) */}
        <View style={styles.snsWrapper}>
          <AnimatePresence>
            {snsView && (
              <MotiView
                key="sns-drop"
                // 드롭 인/아웃
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
  LogoContainer: {
    marginTop: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text2: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'lt-it-ver3',
  },
  text4: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  textWhite: {
    color: '#ffffff',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 5 },
    textShadowRadius: 3,
  },
  buttonsContainer: {
    width: width,
    height: height*0.2,
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
  // ▼ Collapsible 대체용 래퍼
  snsWrapper: {
    alignItems: 'center',
    height: height*0.12,
    marginTop: -height * 0.01,
    // borderWidth: 1,
    //
    borderColor:'red',
    overflow: 'visible', // 내용 잘리지 않게
  },
  snsInner: {
    alignItems: 'center',
  },
});

export default IAMScreen;
