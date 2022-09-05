import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {getPermission} from '../../utils/Permission';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface TestsDoneScrenProps {
  logoUrl?: string;
  bgColor?: string;
  secondaryColor?: string;
  textColor?: string;
}

export const TestsDoneScren: React.FC<TestsDoneScrenProps> = ({
  bgColor,
  logoUrl,
  secondaryColor,
  textColor,
}) => {
  useEffect(() => {
    getPermission();
  });
  return (
    <SafeAreaView
      style={[Styles.screenWrapper, {backgroundColor: bgColor || 'white'}]}>
      <View style={Styles.loadingWrapper}>
        {logoUrl && (
          <Image
            style={Styles.image}
            source={{
              uri:
                logoUrl ||
                'https://i.pinimg.com/564x/be/2a/b2/be2ab2886bf8e57423e5df0fd8e94130.jpg',
            }}
          />
        )}
        <View style={Styles.resultWrapepr}>
          <Text style={[Styles.infoText, {color: textColor || 'black'}]}>
            Teste Concluído!
          </Text>
          <FontAwesome
            name="check"
            color={secondaryColor || '#5EC1F9'}
            size={170}
          />
          <Text style={[Styles.infoText, {color: textColor || 'black'}]}>
            Retorne ao atendimento
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  screenWrapper: {
    minHeight: Dimensions.get('window').height,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  resultWrapepr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});
