import Connector from '../src/connector';
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

describe('connector.connect()', () => {
  it('connects to the datasource', async () => {
    const connector = new Connector(dataSource);
    expect(await connector.connect()).toBe(undefined);
  });

  it('throws an error when failing to connect to the datasource', async () => {
    const connector = new Connector(invalidDataSource);
    await expect(connector.connect()).rejects.toThrow();
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
