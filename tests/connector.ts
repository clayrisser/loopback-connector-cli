import Connector from '../src/connector';
import { DataSource } from '@loopback/repository';

const dataSource: DataSource = {
  name: 'echo',
  settings: {}
};

describe('new Connector()', () => {
  it('creates connector', async () => {
    const connector = new Connector(dataSource);
    expect(!!connector).toBe(true);
  });
});
