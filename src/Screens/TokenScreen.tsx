import React from 'react';
import {Button, Text, View} from 'react-native';

export const TokenScreen: React.FC = ({navigation}: any) => {
  return (
    <View>
      <Text>TokenScreen</Text>
      <Button
        title="Go to test"
        onPress={() => {
          navigation.navigate('TestScreen', {token: 'asdadsad'});
        }}
      />
    </View>
  );
};
