import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export const LoadingScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};
