import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';

export const SpeedTest: React.FC = () => {
  const [speedTestResult, setSpeedTestResult] = useState<any>('');

  useEffect(() => {
    startNodeThread();
    startSpeedTest(setSpeedTestResult);
  }, []);

  return (
    <View>
      <Text>{speedTestResult}</Text>
    </View>
  );
};
