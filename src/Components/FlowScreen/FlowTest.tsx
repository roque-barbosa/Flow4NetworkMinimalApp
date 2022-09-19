import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
// import {videoTestUrl1, videoTestUrl2, videoTestUrl3} from '../../Constants';
import {DeviceInfoType, getDeviceInfo} from '../../utils/DeviceInfo';
import {sendFileToServer} from '../../utils/HomeSpeedTest';
import {
  getMTU,
  getNetworkInfo,
  httpPingTest,
  NetworkInfoType,
  pingTest,
  doLatencyTest,
  calcJitter,
} from '../../utils/NetworkInfo';
import {startNodeThread, startSpeedTest} from '../../utils/NodeBridge';
import {sendToServer} from '../../utils/send toServer';
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
  const [latencyTest, setLatencyTest] = useState<number | null>(null);
  const [jitterTest, setJitterTest] = useState<number | null>(null);
  const [httpPingsResults, setHttpPingsResults] = useState<any[] | null>(null);
  // const [videoStep1, setVideoStep1] = useState<boolean>(true);
  // const [videoStep2, setVideoStep2] = useState<boolean>(false);
  // const [videoStep3, setVideoStep3] = useState<boolean>(false);
  const [videoTest, setVideoTest] = useState<number | null>(null);
  // const [videoTest2, setVideoTest2] = useState<number | null>(null);
  // const [videoTest3, setVideoTest3] = useState<number | null>(null);
  const [uploadTest, setUploadTest] = useState<number | null>(null);
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
      jitterTest != null &&
      httpPingsResults != null &&
      uploadTest != null &&
      urls !== undefined
    ) {
      // const allResults = {
      //   mtu: mtu,
      //   mss: (mtu as number) - 40,
      //   speedTest: speedTestResult,
      //   uploadSpeed: uploadTest,
      //   networkInfo: networkInfo,
      //   deviceInfo: deviceInfo,
      //   latency: latencyTest,
      //   jitter: jitterTest,
      //   pingsResults: pingsResults,
      //   pageOpening: httpPingsResults,
      //   streamingTest: videoTest! / 1000,
      //   streamingPercentTest: 100 - (videoTest! / 1000) * 10,
      // };
      // console.log('RESULTADO: ', allResults);
      // sendToServer(allResults, token);

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

    async function getLatency() {
      setonGoingTest('Calculando Latência...');
      const latency = await doLatencyTest();
      setLatencyTest(latency);
    }

    async function hitterTest() {
      setonGoingTest('Calculando Jitter...');
      const jitter = await calcJitter();
      setJitterTest(jitter);
    }

    async function homeUploadSpeed() {
      setonGoingTest('Calculando velocidade...');
      const homeupload = await sendFileToServer();
      setUploadTest(homeupload);
      console.log('VELOCIDADE?? ---- ', homeupload);
    }

    async function runTests() {
      startNodeThread();
      startSpeedTest(setSpeedTestResult);
      const newTokenInfo = await getTokenInfo();
      await getLatency();
      await homeUploadSpeed();
      await hitterTest();
      await pingUrls(newTokenInfo.urls);
      await httpPingUrls(newTokenInfo.urls);
      await calcMTU();

      await localDeviceTests();

      // const allResults = {
      //   mtu: mtu,
      //   mss: (mtu as number) - 40,
      //   speedTest: speedTestResult,
      //   uploadSpeed: uploadTest,
      //   networkInfo: networkInfo,
      //   deviceInfo: deviceInfo,
      //   latency: latencyTest,
      //   jitter: jitterTest,
      //   pingsResults: pingsResults,
      //   pageOpening: httpPingsResults,
      //   streamingTest: videoTest! / 1000,
      //   streamingPercentTest: 100 - (videoTest! / 1000) * 10,
      // };
      // console.log(allResults);

      // console.log('LALALALALALAALALAL ', allResults);

      // const response = await fetch(
      //   `https://flowbix.minhainternet.net/flow4NetworkMobile/formatAndSendData/${token}`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(allResults),
      //   },
      // );
      // console.log('HERE WE ARE');

      // console.log(response);
    }

    runTests();
    // .then(() => {
    //   const allResults = {
    //     mtu: mtu,
    //     mss: (mtu as number) - 40,
    //     speedTest: speedTestResult,
    //     uploadSpeed: uploadTest,
    //     networkInfo: networkInfo,
    //     deviceInfo: deviceInfo,
    //     latency: latencyTest,
    //     jitter: jitterTest,
    //     pingsResults: pingsResults,
    //     pageOpening: httpPingsResults,
    //     streamingTest: videoTest! / 1000,
    //     streamingPercentTest: 100 - (videoTest! / 1000) * 10,
    //   };
    //   console.log(allResults);
    //   // sendToServer(allResults, token);
    // });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (
      speedTestResult != null &&
      networkInfo != null &&
      deviceInfo != null &&
      pingsResults != null &&
      jitterTest != null &&
      httpPingsResults != null &&
      uploadTest != null &&
      urls !== undefined
      // videoStep1 === false &&
      // videoStep2 === false &&
      // videoStep3 === false
    ) {
      const allResults = {
        mtu: mtu,
        mss: (mtu as number) - 40,
        speedTest: speedTestResult,
        uploadSpeed: uploadTest,
        networkInfo: networkInfo,
        deviceInfo: deviceInfo,
        latency: latencyTest,
        jitter: jitterTest,
        pingsResults: pingsResults,
        pageOpening: httpPingsResults,
        streamingTest: videoTest! / 1000,
        streamingPercentTest: 100 - (videoTest! / 1000) * 10,
        // streamingTest720: videoTest2! / 1000,
        // streamingPercentTest720: 100 - (videoTest2! / 1000) * 10,
        // streamingTest1080: videoTest3! / 1000,
        // streamingPercentTest1080: 100 - (videoTest3! / 1000) * 10,
      };
      sendToServer(allResults, token);
      console.log(allResults);
    }
  });

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
      <Video
        source={{
          // uri: videoTestUrl1,
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?vq=hd1080',
        }}
        style={Styles.backgroundVideo}
        hideShutterView={true}
        paused={false}
        muted={true}
        onLoadStart={() => setVideoTest(Date.now())}
        onLoad={() => {
          let start = videoTest;
          let end = Date.now();
          let result = end - start!;
          setVideoTest(result);
        }}
      />
      {/* {videoStep1 && (
        <Video
          source={{
            // uri: videoTestUrl1,
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?vq=hd1080',
          }}
          style={Styles.backgroundVideo}
          hideShutterView={true}
          paused={false}
          muted={true}
          onLoadStart={() => setVideoTest(Date.now())}
          onLoad={() => {
            let start = videoTest;
            let end = Date.now();
            let result = end - start!;
            setVideoTest(result);
            setVideoStep2(true);
            setVideoStep1(false);
          }}
        />
      )}
      {videoStep2 && (
        <Video
          source={{
            uri: videoTestUrl2,
            // uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?vq=hd1080',
          }}
          style={Styles.backgroundVideo}
          hideShutterView={true}
          paused={false}
          muted={true}
          onLoadStart={() => setVideoTest2(Date.now())}
          onLoad={() => {
            let start = videoTest2;
            let end = Date.now();
            let result = end - start!;
            setVideoTest2(result);
            setVideoStep3(true);
            setVideoStep2(false);
          }}
        />
      )}
      {videoStep3 && (
        <Video
          source={{
            uri: videoTestUrl3,
            // uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?vq=hd1080',
          }}
          style={Styles.backgroundVideo}
          hideShutterView={true}
          paused={false}
          muted={true}
          onLoadStart={() => setVideoTest3(Date.now())}
          onLoad={() => {
            let start = videoTest3;
            let end = Date.now();
            let result = end - start!;
            setVideoTest3(result);
            setVideoStep3(false);
          }}
        />
      )} */}
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
  backgroundVideo: {
    height: 0,
    width: 0,
  },
});
