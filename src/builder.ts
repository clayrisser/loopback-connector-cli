import CLIConnector from './connector';
import spawn from './spawn';
import { Params } from './types';

export default class Builder {
  constructor(public template: string = '', public connector: CLIConnector) {}

  operation(_params: Params): (...args: any[]) => Promise<any> {
    const parameters: any[] = [];
    return () => {
      return this.invoke(parameters);
    };
  }

  async invoke(...args: any[]): Promise<any> {
    const result = spawn(this.connector.settings.command, args);
    return result;
  }
}
