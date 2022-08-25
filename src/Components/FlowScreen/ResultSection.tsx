import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface IResultSection {
  downloadSpeedResult: string;
  bgColor: string;
  logoUrl: string;
  secondaryColor: string;
  textColor: string;
}

export const ResultSection: React.FC<IResultSection> = ({
  downloadSpeedResult,
  bgColor,
  secondaryColor,
  textColor,
}) => {
  return (
    <View
      style={[Styles.sectionWrapper, {backgroundColor: bgColor || 'white'}]}>
      <View style={Styles.header}>
        <Text style={Styles.headerText}>Resultados do teste</Text>
      </View>
      <View style={Styles.contentWrapper}>
        <Text>{downloadSpeedResult}</Text>
      </View>
      <View>
        <Pressable
          style={[
            Styles.backButton,
            {backgroundColor: secondaryColor || 'green'},
          ]}>
          <Text style={[Styles.backButtonText, {color: textColor || 'white'}]}>
            Voltar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  sectionWrapper: {
    width: '100%',
    display: 'flex',
    minHeight: 720,
    justifyContent: 'flex-end',
  },
  backButton: {
    display: 'flex',
    marginHorizontal: 4,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
  },
  header: {
    display: 'flex',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
  },
  backButtonText: {
    fontSize: 18,
  },
});
