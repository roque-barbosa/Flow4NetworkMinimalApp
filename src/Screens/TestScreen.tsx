import React from 'react';
import {Text, View} from 'react-native';
import {SpeedTest} from '../Components/TestScreen/SpeedTest';

export const TestScreen: React.FC = () => {
  return (
    <View>
      <Text>TestScreen</Text>
      <SpeedTest />
    </View>
  );
};
