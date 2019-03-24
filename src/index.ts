import {
  Class,
  Count,
  CrudConnector,
  DataSource,
  Entity,
  EntityData,
  Filter,
  Options,
  Where
} from '@loopback/repository';

class CLIBuilder {
  constructor(public template: string = '') {}
}

interface Settings {
  command: string;
  operations: Operation[];
}

interface Operation {
  template: string;
}

export class CLIConnector implements CrudConnector {
  constructor(_command: string, _settings: Settings) {}

  name: string = 'cli';

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

  async ping(): Promise<void> {}

  async create(
    _modelClass: Class<Entity>,
    _entity: EntityData,
    _options?: Options
  ): Promise<EntityData> {
    return {};
  }

  async find(
    _modelClass: Class<Entity>,
    _filter?: Filter,
    _options?: Options
  ): Promise<EntityData[]> {
    return [{}];
  }

  async updateAll(
    _modelClass: Class<Entity>,
    _data: EntityData,
    _where?: Where<Entity>,
    _options?: Options
  ): Promise<Count> {
    return { count: 0 };
  }

  async deleteAll(
    _modelClass: Class<Entity>,
    _where?: Where<Entity>,
    _options?: Options
  ): Promise<Count> {
    return { count: 0 };
  }

  async count(
    _modelClass: Class<Entity>,
    _where?: Where<Entity>,
    _options?: Options
  ): Promise<Count> {
    return { count: 0 };
  }
}

export function initialize(dataSource: DataSource, callback: () => {}) {
  const settings: Settings = {
    command: 'echo',
    operations: [],
    ...dataSource.settings
  };
  const { command } = settings;
  const connector = new CLIConnector(command, settings);
  console.log('connector', connector);

  if (Array.isArray(settings.operations)) {
    settings.operations.forEach(operation => {
      const builder = new CLIBuilder(operation.template);
      console.log('builder', builder);
    });
  }

  if (callback) process.nextTick(callback);
}
