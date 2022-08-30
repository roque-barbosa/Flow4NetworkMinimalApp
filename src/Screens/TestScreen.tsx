import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {FlowTest} from '../Components/FlowScreen/FlowTest';
// import {getPermission} from '../utils/Permission';
import {validateToken} from '../utils/token';

export const TestScreen: React.FC = ({route, navigation}: any) => {
  const params = route.params;
  const [token, setToken] = useState<string | null>(null);
  const [debugMessage, setDebug] = useState<string>('');

  useEffect(() => {
    console.log(params);

    async function validateAndSetToken() {
      setDebug('VALIDATE AND SET Inside');
      const result = await validateToken(params.token);
      setDebug('VALIDATE Result');
      if (result) {
        setToken(params.token);
        setDebug(token);
      } else {
        setDebug('Navigate');
        navigation.navigate('TokenScreen');
      }
    }
    if (params === undefined || params == null) {
      setDebug('NONO PARAMS');
      navigation.navigate('TokenScreen');
    } else {
      setDebug('GET PERMISSION');
      // getPermission();
      setDebug('VALIDATE AND SET');
      validateAndSetToken();
      // validateToken(params.token);
    }
    // // }, [params, navigation]);
  }, []);

  // if (token) {
  //   return <FlowTest token={token} navigation={navigation} />;
  // }
  // return (
  // <SafeAreaView
  //   style={{
  //     height: 200,
  //     width: 200,
  //     backgroundColor: 'orange',
  //   }}>
  //   <Text>{debugMessage}</Text>
  // </SafeAreaView>
  // );
  return (
    <View>
      {token && <FlowTest token={token} navigation={navigation} />}
      {!token && (
        <SafeAreaView
          style={{
            height: 200,
            width: 200,
            backgroundColor: 'orange',
          }}>
          <Text>{debugMessage}</Text>
        </SafeAreaView>
      )}
    </View>
  );
};
