import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Proveedor, ProveedorRelations} from '../models';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype._id,
  ProveedorRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Proveedor, dataSource);
  }
}
