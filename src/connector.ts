import { Connector, DataSource } from '@loopback/repository';
import { DataAccessObject, Settings } from './types';
import spawn from './spawn';

export default class CLIConnector implements Connector {
  DataAccessObject: DataAccessObject = class DataAccessObject {
    [key: string]: (...args: any[]) => Promise<any>;
  };

  settings: Settings;

  constructor(public dataSource: DataSource) {
    this.settings = dataSource.settings as Settings;
  }

  name: string = 'cli';

  async connect(): Promise<void> {
    await spawn(this.settings.command);
  }

  async disconnect(): Promise<void> {}

  async ping(): Promise<void> {
    await spawn(this.settings.command);
  }
}
