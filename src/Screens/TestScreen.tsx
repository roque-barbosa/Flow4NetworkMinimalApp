import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {SpeedTest} from '../Components/TestScreen/SpeedTest';

export const TestScreen: React.FC = ({route, _navigation}: any) => {
  const params = route.params;
  const [token, setToken] = useState<string | null>('noToken');
  useEffect(() => {
    if (params) {
      setToken(params.token);
    }
  }, [params]);
  return (
    <View>
      <Text>TestScreen</Text>
      <Text>{token}</Text>
      <SpeedTest />
    </View>
  );
};
