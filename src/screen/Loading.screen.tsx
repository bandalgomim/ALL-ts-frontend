import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { width, height } from '@/global';

interface logoProps {
  color: 'blue' | 'white';
}

const LoadingScreen: React.FC<logoProps> = ({ color }) => {
  const [loading, setLoading] = useState(0);
  const style = color === 'blue' ? styles.textBlue : styles.textWhite;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => Math.min(prev + 0.1, 1));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[
      styles.LoadingContainer,
      color === 'blue' ? styles.bgWhite : styles.bgBlue,
    ]}>
      <View style={styles.logo}>
        <Text style={[styles.text1, styles.logoText1, style]}>ALL</Text>
        <Text style={[styles.text2, styles.logoText2]}>’</Text>
        <Text style={[styles.text3, styles.logoText3, style]}>ts</Text>
      </View>
      <View>
        <Text style={[styles.text4, styles.sloganText, style]}>All  Sports  Scheduler</Text>
      </View>
      <ActivityIndicator
        size="large"
        color={color === 'blue' ? '#30397A' : '#ffffff'}
        style={styles.indicator}
      />
      <Text style={[styles.textContainser, styles.percentText, style]}>
        {Math.round(loading * 99)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
  },
  bgBlue: {
    backgroundColor: '#30397A',
  },
  textContainser: {
    textAlign: 'center',
    fontFamily: 'sb-it-ver1',
  },
  percentText: {
    fontSize: width * 0.1,
  },
  logo: {
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
  logoText1: {
    width: width * 0.5,
    fontSize: width * 0.43,
  },
  text2: {
    color: '#EA5579',
    textAlign: 'center',
    fontFamily: 'rg-it-ver2',
  },
  logoText2: {
    width: width * 0.15,
    fontSize: width * 0.43,
    marginLeft: -width * 0.1,
  },
  text3: {
    textAlign: 'center',
    fontFamily: 'lt-it-ver3',
  },
  logoText3: {
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
  sloganText: {
    width: width,
    fontSize: width * 0.0885,
    marginTop: -height * 0.04,
  },
  indicator: {
    marginTop: height * 0.03,
  },
  textWhite: {
    color: '#ffffff',
    textShadowColor: '#242b5c',
    textShadowOffset: { width: 1, height: 5 },
    textShadowRadius: 3,
  },
  textBlue: {
    color: '#30397A',
    textShadowColor: '#bdb4b4',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 3,
  },
});

export default React.memo(LoadingScreen);
