import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';
import {getInfoFromToken, TokenInfoType} from '../../utils/token';
import {LoadingScreen} from '../LoadingScreen/LoadingScreen';
import {ResultSection} from './ResultSection';

interface IFlowTest {
  token: string;
}

export const FlowTest: React.FC<IFlowTest> = ({token}) => {
  const [speedTestResult, setSpeedTestResult] = useState<string | null>(null);
  const {bgColor, logoUrl, secondaryColor, textColor}: TokenInfoType =
    getInfoFromToken(token);

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
    <View style={Styles.screnWrapper}>
      {hasTestsEnded() ? (
        <ResultSection
          downloadSpeedResult={speedTestResult!}
          bgColor={bgColor}
          logoUrl={logoUrl}
          secondaryColor={secondaryColor}
          textColor={textColor}
        />
      ) : (
        <LoadingScreen
          bgColor={bgColor}
          logoUrl={logoUrl}
          secondaryColor={secondaryColor}
        />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  screnWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: 'green',
  },
});
