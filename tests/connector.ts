import { DataSource } from '@loopback/repository';
import Connector from '../src/connector';

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

const invalidDataSource: DataSource = {
  name: 'invalidcommand',
  settings: {
    command: 'invalidcommand',
    operations: []
  }
};

describe('new Connector()', () => {
  it('creates connector', async () => {
    const connector = new Connector(dataSource);
    expect(!!connector).toBe(true);
  });
});

describe('connector.ping()', () => {
  it('pings the datasource', async () => {
    const connector = new Connector(dataSource);
    expect(await connector.ping()).toBe(undefined);
  });

  it('throws an error when failing to ping the datasource', async () => {
    const connector = new Connector(invalidDataSource);
    await expect(connector.ping()).rejects.toThrow();
  });
});
