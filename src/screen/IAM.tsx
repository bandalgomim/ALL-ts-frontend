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
        <View style={styles.logoWithDimensions}>
          <Text style={[styles.text1, styles.text1Dimensions, styles.textWhite]}>ALL</Text>
          <Text style={[styles.text2, styles.text2Dimensions]}>'</Text>
          <Text style={[styles.text3, styles.text3Dimensions, styles.textWhite]}>ts</Text>
        </View>
        <View>
          <Text style={[styles.text4, styles.text4Dimensions, styles.textWhite]}>
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
  logoWithDimensions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: width * 0.8,
    height: height * 0.24,
    marginTop: -height * 0.04,
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text1Dimensions: {
    width: width * 0.5,
    fontSize: width * 0.43,
  },
  text2: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text2Dimensions: {
    width: width * 0.15,
    fontSize: width * 0.43,
    marginLeft: -width * 0.1,
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'lt-it-ver3',
  },
  text3Dimensions: {
    width: width * 0.15,
    fontSize: width * 0.15,
    marginLeft: -width * 0.08,
    marginBottom: height * 0.03,
  },
  text4: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  text4Dimensions: {
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
  buttonLeft: {
    marginLeft: width * 0.1,
  },
  buttonRight: {
    marginRight: width * 0.1,
  },
  snsWrapper: {
    alignItems: 'center',
    height: height*0.12,
    marginTop: -height * 0.01,
    borderColor:'red',
    overflow: 'visible',
  },
  snsInner: {
    alignItems: 'center',
  },
});

export default IAMScreen;
