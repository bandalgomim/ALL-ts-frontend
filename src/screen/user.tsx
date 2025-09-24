import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { width, height } from '../global';
import DeleteButton from '../components/IAM/delete';
import LogoutButton from '../components/IAM/logout';

// ✅ moti로 교체
import { MotiView, AnimatePresence } from 'moti';

const UserScreen = () => {
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
          <LogoutButton/>
          <DeleteButton/>
        </View>
        <View style={styles.snsWrapper}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'White',
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
    color: '#30397A',
    textShadowColor: '#bdb4b4', // 그림자 색상
    textShadowOffset: { width: 1, height: 3 }, // 그림자의 오프셋
    textShadowRadius: 3, // 그림자 반경
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

export default UserScreen;