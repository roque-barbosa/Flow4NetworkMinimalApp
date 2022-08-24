import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';
import {LoadingScreen} from '../LoadingScreen/LoadingScreen';

export const SpeedTest: React.FC = () => {
  const [speedTestResult, setSpeedTestResult] = useState<string | null>(null);

  const hasTestsEnded = () => {
    if (speedTestResult != null) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    startNodeThread();
    startSpeedTest(setSpeedTestResult);
  }, []);

  return (
    <View>
      {hasTestsEnded() ? <Text>{speedTestResult}</Text> : <LoadingScreen />}
    </View>
  );
};
