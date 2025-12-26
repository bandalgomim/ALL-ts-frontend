import { View, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'ios') {
  console.log('iOS입니다');
} else if (Platform.OS === 'android') {
  console.log('Android입니다');
}

export const HeadNotch = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.notch, Platform.OS === 'ios' && { paddingTop: insets.top }]} />
  );
};

const styles = StyleSheet.create({
  notch: {
    paddingTop: 0,
  },
});
