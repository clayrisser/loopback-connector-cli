import {
  CrudConnector,
  Class,
  Options,
  Count,
  Filter,
  Where,
  Entity,
  EntityData
} from '@loopback/repository';

export class CLIConnector implements CrudConnector {
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
