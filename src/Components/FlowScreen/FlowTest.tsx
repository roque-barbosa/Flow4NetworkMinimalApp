import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DeviceInfoType, getDeviceInfo} from '../../utils/DeviceInfo';
import {
  getMTU,
  getNetworkInfo,
  httpPingTest,
  NetworkInfoType,
  pingTest,
} from '../../utils/NetworkInfo';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';
import {getInfoFromToken, TokenInfoType} from '../../utils/token';
import {LoadingScreen} from '../LoadingScreen/LoadingScreen';
import {TestsDoneScren} from '../TestsDoneScreen/TestsDoneScreen';
// import {ResultSection} from './ResultSection';

interface IFlowTest {
  token: string;
  // navigation: any;
}

export const FlowTest: React.FC<IFlowTest> = ({token}) => {
  const [speedTestResult, setSpeedTestResult] = useState<string | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfoType | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType | null>(null);
  const [mtu, setMtu] = useState<string | number>(0);
  const [pingsResults, setPingsResults] = useState<any[] | null>(null);
  const [httpPingsResults, setHttpPingsResults] = useState<any[] | null>(null);
  const [
    {bgColor, logoUrl, secondaryColor, textColor, urls},
    setCustomization,
  ] = useState<TokenInfoType>({
    bgColor: 'white',
    textColor: 'white',
    secondaryColor: 'black',
    logoUrl: '',
    urls: undefined,
  });
  const [onGoingTest, setonGoingTest] = useState<string>('');

  const hasTestsEnded = () => {
    if (
      speedTestResult != null &&
      networkInfo != null &&
      deviceInfo != null &&
      pingsResults != null &&
      httpPingsResults != null &&
      urls !== undefined
    ) {
      const allResults = {
        mtu: mtu,
        mss: (mtu as number) - 50,
        speedTest: speedTestResult,
        networkInfo: networkInfo,
        deviceInfo: deviceInfo,
        pingsResults: pingsResults,
        httpPingTest: httpPingsResults,
      };
      console.log('RESULTADO: ', allResults);
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function getTokenInfo() {
      setonGoingTest('Pegando info do seu token...');
      const info = await getInfoFromToken(token);
      setCustomization(info);
      return info;
    }

    async function localDeviceTests() {
      setonGoingTest('Pegando info do seu dispositivo...');
      const netInfo = await getNetworkInfo();
      setNetworkInfo(netInfo);

      const devInfo = await getDeviceInfo();
      setDeviceInfo(devInfo);
    }

    async function pingUrls(testUrls: any) {
      setonGoingTest('Teste de ping...');
      const results = await pingTest(testUrls);
      setPingsResults(results);
    }

    async function httpPingUrls(testUrls: any) {
      setonGoingTest('Teste de abertura de páginas...');
      const results = await httpPingTest(testUrls);
      setHttpPingsResults(results);
    }

    async function calcMTU() {
      setonGoingTest('Calculando MTU...');
      const mtuResult = await getMTU();
      setMtu(mtuResult);
    }

    // startNodeThread();
    // startSpeedTest(setSpeedTestResult);

    // getTokenInfo()
    //   .then(tokenInfo => {
    //     // pingUrls()
    //     pingUrls(tokenInfo.urls);
    //   })
    //   .then(() => calcMTU())
    //   .then(() => localDeviceTests());

    async function runTests() {
      startNodeThread();
      startSpeedTest(setSpeedTestResult);
      const newTokenInfo = await getTokenInfo();
      await pingUrls(newTokenInfo.urls);
      await httpPingUrls(newTokenInfo.urls);
      await calcMTU();
      await localDeviceTests();
    }

    runTests();
  }, []); // eslint-disable-line

  return (
    <View style={Styles.screnWrapper}>
      {hasTestsEnded() ? (
        // <ResultSection
        //   downloadSpeedResult={speedTestResult!}
        //   bgColor={bgColor}
        //   logoUrl={logoUrl}
        //   secondaryColor={secondaryColor}
        //   textColor={textColor}
        //   networkInfo={networkInfo!}
        //   deviceInfo={deviceInfo!}
        //   pingsResults={pingsResults!}
        //   mtu={mtu}
        //   navigation={navigation}
        // />
        <TestsDoneScren
          bgColor={bgColor}
          logoUrl={logoUrl}
          textColor={textColor}
          secondaryColor={secondaryColor}
        />
      ) : (
        <LoadingScreen
          testMessage={onGoingTest}
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
