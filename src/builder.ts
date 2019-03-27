import Connector from './connector';
import spawn from './spawn';
import { Template } from './types';

export default class Builder {
  constructor(
    public command: string,
    public template: Template,
    public connector: Connector
  ) {}

  operation(paramNames: string[]): (...args: any[]) => Promise<any> {
    return async (...args: any[]): Promise<string> => {
      return this.invoke(args, paramNames);
    };
  }

  async invoke(properties: any[], paramNames: string[]): Promise<string> {
    let args: string[] = this.template.args;
    let command: string = this.template.command || this.command;
    paramNames.forEach((paramName: string, i: number) => {
      const regex = new RegExp(`{${paramName}}`, 'g');
      command = command.replace(regex, properties[i]);
      args = args.map((arg: string) => {
        return arg.replace(regex, properties[i]);
      });
    });
    return spawn(command, args);
  }
}
