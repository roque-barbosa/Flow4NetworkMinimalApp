import DeviceInfo from 'react-native-device-info';

export type DeviceInfoType = {
  applicationName: string;
  buildId: string;
  batteryLevel: number;
  brand: string;
  buildNumber: string;
  carrier: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  manufacturer: string;
  phoneModel: string;
  sysName: string;
  sysVersion: string;
};

export async function getDeviceInfo(): Promise<DeviceInfoType> {
  let infos: DeviceInfoType = {
    applicationName: DeviceInfo.getApplicationName(),
    buildId: await DeviceInfo.getBuildId(),
    batteryLevel: await DeviceInfo.getBatteryLevel(),
    brand: DeviceInfo.getBrand(),
    buildNumber: DeviceInfo.getBuildNumber(),
    carrier: await DeviceInfo.getCarrier(),
    deviceName: await DeviceInfo.getDeviceName(),
    ipAddress: await DeviceInfo.getIpAddress(),
    macAddress: await DeviceInfo.getMacAddress(),
    manufacturer: await DeviceInfo.getManufacturer(),
    phoneModel: await DeviceInfo.getModel(),
    sysName: DeviceInfo.getSystemName(),
    sysVersion: DeviceInfo.getSystemVersion(),
  };

  return infos;
}
