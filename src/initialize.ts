import { DataSource } from '@loopback/repository';
import Builder from './builder';
import Connector from './connector';
import { Operation, Settings } from './types';

export default function initialize(
  dataSource: DataSource,
  callback?: () => {}
) {
  const settings: Settings = {
    command: 'echo',
    operations: [],
    ...dataSource.settings
  };
  const connector = new Connector(dataSource);
  dataSource.connector = connector;
  if (Array.isArray(settings.operations)) {
    settings.operations.forEach((operation: Operation) => {
      const builder = new Builder(
        settings.command,
        operation.template,
        connector
      );
      Object.keys(operation.functions).forEach((fnName: string) => {
        const paramNames: string[] = operation.functions[fnName];
        const fn = builder.operation(paramNames);
        dataSource[fnName] = fn;
        connector.DataAccessObject[fnName] = fn;
      });
    });
  }
  if (callback) process.nextTick(callback);
}
