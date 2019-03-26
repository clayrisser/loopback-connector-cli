import { Connector } from '@loopback/repository';
import { Settings } from './types';
import spawn from './spawn';

export default class CLIConnector implements Connector {
  constructor(_command: string, public settings: Settings) {}

  name: string = 'cli';

  async connect(): Promise<void> {
    await spawn(this.settings.command);
  }

  async disconnect(): Promise<void> {}

  async ping(): Promise<void> {
    await spawn(this.settings.command);
  }
}
