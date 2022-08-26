import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {NetworkInfo} from 'react-native-network-info';

export type NetworkInfoType = NetInfoState & {wifiName?: string};

export async function getNetworkInfo(): Promise<NetworkInfoType> {
  const netInfo = await NetInfo.fetch();
  const ssid = await NetworkInfo.getSSID();

  return {...netInfo, wifiName: ssid || 'unknow'};
}
