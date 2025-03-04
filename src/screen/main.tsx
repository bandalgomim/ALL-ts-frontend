import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MainCalendar from '../components/calendar/MainCalendar';

export const MainScreen = () => {
    return (
        <View style={styles.Container}>
          <MainCalendar/>
        </View>
      );
}

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#30397A'
  },
});