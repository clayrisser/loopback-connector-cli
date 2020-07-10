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
    return async (...args: any[]): Promise<any> => {
      return this.invoke(args, paramNames);
    };
  }

  async invoke(properties: any[], paramNames: string[]): Promise<any> {
    let { args } = this.template;
    let command: string = this.template.command || this.command;
    paramNames.forEach((paramName: string, i: number) => {
      const regex = new RegExp(`{${paramName}}`, 'g');
      command = command.replace(regex, properties[i]);
      args = args.map((arg: string) => {
        return arg.replace(regex, properties[i]);
      });
    });
    let result: any = await spawn(command, args);
    if (this.template.responseRegex) {
      const regex = newRegExp(this.template.responseRegex);
      const matches: string[] = result.match(regex) || [];
      if (regex.flags.indexOf('g') > -1) {
        result = matches;
      } else {
        result = matches.length ? matches[0] : '';
      }
    }
    if (this.template.responsePath) {
      if (Array.isArray(result)) {
        for (let i = 0; i < result.length; i++) {
          const pathResult = JSONPath({
            path: this.template.responsePath,
            json: this.template.dirty
              ? dirtyJSON.parse(result[i])
              : JSON.parse(result[i])
          });
          result[i] = pathResult ? pathResult[0] : null;
        }
      } else {
        const pathResult = JSONPath({
          path: this.template.responsePath,
          json: this.template.dirty
            ? dirtyJSON.parse(result)
            : JSON.parse(result)
        });
        result = pathResult ? pathResult[0] : null;
      }
    }
    if (typeof this.template.responseFunc === 'function') {
      if (Array.isArray(result)) {
        for (let i = 0; i < result.length; i++) {
          result[i] = await this.template.responseFunc(result[i]);
        }
      } else {
        result = await this.template.responseFunc(result);
      }
    }
    return result;
  }
}
