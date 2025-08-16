/**
 * commonUtils.ts
 */
import os from 'os';

export function getServerIpAddresses(): string[] {
  const networkInterfaces = os.networkInterfaces();
  const addresses: string[] = [];

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.family === 'IPv4' && !iface.internal) {
          addresses.push(iface.address);
        }
      }
    }
  }
  return addresses;
}
