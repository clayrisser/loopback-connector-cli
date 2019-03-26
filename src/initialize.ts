import { DataSource } from '@loopback/repository';
import CLIBuilder from './builder';
import CLIConnector from './connector';
import { Operation, Params, Settings } from './types';

export default function initialize(dataSource: DataSource, callback: () => {}) {
  const settings: Settings = {
    command: 'echo',
    operations: [],
    ...dataSource.settings
  };
  const { command } = settings;
  const connector = new CLIConnector(command, settings);

  if (Array.isArray(settings.operations)) {
    settings.operations.forEach((operation: Operation) => {
      const builder = new CLIBuilder(operation.template, connector);
      Object.keys(operation.functions).forEach((fnName: string) => {
        const params: Params = operation.functions[fnName];
        const fn = builder.operation(params);
        dataSource[fnName] = fn;
      });
    });
  }

  if (callback) process.nextTick(callback);
}
