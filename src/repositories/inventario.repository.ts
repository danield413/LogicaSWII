import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Inventario, InventarioRelations} from '../models';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype._id,
  InventarioRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Inventario, dataSource);
  }
}
