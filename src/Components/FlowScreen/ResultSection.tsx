import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DeviceInfoType} from '../../utils/DeviceInfo';
import {NetworkInfoType} from '../../utils/NetworkInfo';
import {Dimensions} from 'react-native';

interface IResultSection {
  downloadSpeedResult: string;
  bgColor: string;
  logoUrl: string;
  secondaryColor: string;
  textColor: string;
  networkInfo: NetworkInfoType;
  deviceInfo: DeviceInfoType;
  pingsResults: any[];
  mtu: string | number;
  navigation: any;
}

export const ResultSection: React.FC<IResultSection> = ({
  downloadSpeedResult,
  bgColor,
  secondaryColor,
  textColor,
  networkInfo,
  deviceInfo,
  pingsResults,
  mtu,
  navigation,
}) => {
  function InfoRow({label, value}: any) {
    return (
      <View style={Styles.infoRowWrapper}>
        <Text
          style={Styles.infoRowLabel}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {label}
        </Text>
        <Text style={Styles.infoRowValue}>{value}</Text>
      </View>
    );
  }

  return (
    <View
      style={[Styles.sectionWrapper, {backgroundColor: bgColor || 'white'}]}>
      <View style={Styles.header}>
        <Text style={Styles.headerText}>Resultados do teste</Text>
      </View>
      <ScrollView style={Styles.contentWrapper}>
        <View>
          <View style={Styles.infoHeader}>
            <Text style={Styles.infoHeaderText}>Informacao da Network</Text>
          </View>
          <InfoRow
            label={'Velocidade de download'}
            value={`${parseInt(downloadSpeedResult, 10)} Mb/s`}
          />
          <InfoRow label={'MTU'} value={String(mtu).slice(0, 4)} />
          <InfoRow label={'Nome do wifi'} value={networkInfo.wifiName} />
          <InfoRow
            label={'BSSID'}
            value={
              //@ts-ignore
              networkInfo.details.bssid
            }
          />
          <InfoRow
            label={'Frequency'}
            value={
              //@ts-ignore
              networkInfo.details.frequency / 100
            }
          />
          <InfoRow
            label={'Endereco IP'}
            value={
              //@ts-ignore
              networkInfo.details.ipAddress
            }
          />
          <InfoRow
            label={'Mascara de rede'}
            value={
              //@ts-ignore
              networkInfo.details.subnet
            }
          />
          <InfoRow
            label={'Forca da conexao'}
            value={
              //@ts-ignore
              networkInfo.details.strength
            }
          />
          <InfoRow
            label={'Velocidade do Link'}
            value={
              //@ts-ignore
              networkInfo.details.linkSpeed
            }
          />
          <InfoRow
            label={'Velocidade do Link RX'}
            value={
              //@ts-ignore
              networkInfo.details.rxLinkSpeed
            }
          />
          <InfoRow
            label={'Velocidade do Link TX'}
            value={
              //@ts-ignore
              networkInfo.details.txLinkSpeed
            }
          />
        </View>
        <View>
          <View style={Styles.infoHeader}>
            <Text style={Styles.infoHeaderText}>Informacao do Dispositivo</Text>
          </View>
          <InfoRow label={'Marca do aparelho'} value={deviceInfo.brand} />
          <InfoRow
            label={'Nível da bateria'}
            value={parseInt(JSON.stringify(deviceInfo.batteryLevel * 100), 10)}
          />
          <InfoRow label={'ID da build'} value={deviceInfo.buildId} />
          <InfoRow label={'Número da build'} value={deviceInfo.buildNumber} />
          <InfoRow label={'Nome do aparelho'} value={deviceInfo.deviceName} />
          <InfoRow label={'Endereco IP'} value={deviceInfo.ipAddress} />
          <InfoRow label={'Endereco MAC'} value={deviceInfo.macAddress} />
          <InfoRow label={'Frabricante'} value={deviceInfo.manufacturer} />
          <InfoRow label={'Modelo do aparelho'} value={deviceInfo.phoneModel} />
          <InfoRow label={'Versao do sistema'} value={deviceInfo.sysVersion} />
          <InfoRow label={'Nome do sistema'} value={deviceInfo.sysName} />
          <InfoRow label={'Nome da operadora'} value={deviceInfo.carrier} />
        </View>
        <View>
          <View style={Styles.infoHeader}>
            <Text style={Styles.infoHeaderText}>Abertura de Páginas</Text>
          </View>
          {pingsResults.map(result => (
            <InfoRow
              key={`${result.result}-${result.url}`}
              label={result.url}
              value={result.result}
            />
          ))}
        </View>
      </ScrollView>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('TokenScreen');
          }}
          style={[
            Styles.backButton,
            {backgroundColor: secondaryColor || 'green'},
          ]}>
          <Text style={[Styles.backButtonText, {color: textColor || 'black'}]}>
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
    minHeight: Dimensions.get('window').height,
    justifyContent: 'flex-end',
  },
  backButton: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    marginBottom: 10,
    paddingBottom: 10,
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
  infoRowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoHeaderText: {
    fontSize: 20,
  },
  infoHeader: {
    display: 'flex',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRowLabel: {
    maxWidth: '70%',
    fontSize: 18,
  },
  infoRowValue: {
    fontSize: 16,
  },
});
