import CLIConnector from './connector';
import { Params } from './types';

export default class Builder {
  constructor(public template: string = '', public connector: CLIConnector) {}

  operation(_params: Params): (f: string) => string {
    return f => f;
  }
}
