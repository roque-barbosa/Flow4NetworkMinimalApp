import React, {useEffect, useState} from 'react';
import {FlowTest} from '../Components/FlowScreen/FlowTest';
import {getPermission} from '../utils/Permission';
import {validateToken} from '../utils/token';

export const TestScreen: React.FC = ({route, navigation}: any) => {
  const params = route.params;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function validateAndSetToken() {
      if (await validateToken(params.token)) {
        setToken(params.token);
      } else {
        navigation.navigate('TokenScreen');
      }
    }

    if (!params) {
      navigation.navigate('TokenScreen');
    } else {
      getPermission();
      // validateToken(params.token);
      validateAndSetToken();
    }
  }, [params, navigation]);

  if (token) {
    return <FlowTest token={token} navigation={navigation} />;
  } else {
    return <></>;
  }
};
