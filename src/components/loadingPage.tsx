
import React, {  } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {

    return (
      <View style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30397A',
  },
});
