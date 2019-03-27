import Builder from '../src/builder';
import Connector from '../src/connector';
import { Operation } from '../src/types';
import { DataSource } from '@loopback/repository';

const dataSource: DataSource = {
  name: 'echo',
  settings: {
    command: 'echo',
    operations: [
      {
        template: {
          args: ['{body}']
        },
        functions: {
          echo: ['body']
        }
      }
    ]
  }
};
const connector = new Connector(dataSource);

describe('new Builder()', () => {
  it('creates builder', async () => {
    const builder = new Builder(
      dataSource.settings.command,
      dataSource.settings.operations[0].template,
      connector
    );
    expect(!!builder).toBe(true);
  });
});

describe('builder.operation()', () => {
  it('loads operation', () => {
    const builder = new Builder(
      dataSource.settings.command,
      dataSource.settings.operations[0].template,
      connector
    );
    const fn = builder.operation(['hello', 'world']);
    expect(typeof fn).toBe('function');
  });
});

describe('builder.invoke()', () => {
  it('invokes operation', async () => {
    const operation: Operation = dataSource.settings.operations[0];
    const builder = new Builder(
      dataSource.settings.command,
      operation.template,
      connector
    );
    const echo = builder.operation(operation.functions.echo);
    expect(await echo('Hello, world!')).toEqual('Hello, world!\n');
  });
});
