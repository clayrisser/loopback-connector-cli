import { Connector, DataSource } from '@loopback/repository';
import { DataAccessObject, Settings } from './types';
import spawn from './spawn';

export default class CLIConnector implements Partial<Connector> {
  DataAccessObject: DataAccessObject = class DataAccessObject {
    [key: string]: (...args: any[]) => Promise<any>;
  };

  name: string = 'cli';

  settings: Settings;

  constructor(public dataSource: DataSource) {
    this.settings = this.dataSource.settings as Settings;
  }

  async ping(): Promise<void> {
    await spawn(this.settings.command);
  }
}
