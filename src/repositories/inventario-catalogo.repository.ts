import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {InventarioCatalogo, InventarioCatalogoRelations} from '../models';

export class InventarioCatalogoRepository extends DefaultCrudRepository<
  InventarioCatalogo,
  typeof InventarioCatalogo.prototype._id,
  InventarioCatalogoRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(InventarioCatalogo, dataSource);
  }
}
