import dirtyJSON from 'dirty-json';
import newRegExp from 'newregexp';
import { JSONPath } from 'jsonpath-plus';
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
    let result: string = await spawn(command, args);
    if (this.template.responseRegex) {
      const regex = newRegExp(this.template.responseRegex);
      const matches: string[] = result.match(regex) || [];
      result = matches.length ? matches[0] : '';
    }
    if (this.template.responsePath) {
      const pathResult = JSONPath({
        path: this.template.responsePath,
        json: this.template.dirty ? dirtyJSON.parse(result) : JSON.parse(result)
      });
      result = pathResult.length ? pathResult[0] : null;
    }
    return result;
  }
}
