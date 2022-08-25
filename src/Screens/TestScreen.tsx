import React, {useEffect} from 'react';
import {FlowTest} from '../Components/FlowScreen/FlowTest';

export const TestScreen: React.FC = ({route, navigation}: any) => {
  const params = route.params;

  useEffect(() => {
    if (!params) {
      navigation.navigate('TokenScreen');
    }
  }, [params, navigation]);

  return <FlowTest token={params.token} />;
};
