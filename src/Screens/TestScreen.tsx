import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FlowTest} from '../Components/FlowScreen/FlowTest';
// import {getPermission} from '../utils/Permission';
import {validateToken} from '../utils/token';

export const TestScreen: React.FC = ({route, navigation}: any) => {
  const params = route.params;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log(params);

    async function validateAndSetToken() {
      const result = await validateToken(params.token);
      if (result) {
        setToken(params.token);
      } else {
        navigation.navigate('TokenScreen');
      }
    }
    if (params === undefined || params == null) {
      navigation.navigate('TokenScreen');
    } else {
      // getPermission();
      validateAndSetToken();
    }
  }, [navigation, params]);
  return (
    <View>{token && <FlowTest token={token} navigation={navigation} />}</View>
  );
};
