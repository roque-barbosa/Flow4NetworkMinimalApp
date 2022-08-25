import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';
import {LoadingScreen} from '../LoadingScreen/LoadingScreen';

interface IFlowTest {
  token: string;
}

export const FlowTest: React.FC<IFlowTest> = ({token}) => {
  const [speedTestResult, setSpeedTestResult] = useState<string | null>(null);
  console.log(token);

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
