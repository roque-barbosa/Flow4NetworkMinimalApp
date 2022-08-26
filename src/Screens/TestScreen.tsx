import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FlowTest} from '../Components/FlowScreen/FlowTest';

export const TestScreen: React.FC = ({route, navigation}: any) => {
  const params = route.params;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!params) {
      navigation.navigate('TokenScreen');
    } else {
      setToken(params.token);
    }
  }, [params, navigation]);

  return <ScrollView>{token && <FlowTest token={token} />}</ScrollView>;
};
