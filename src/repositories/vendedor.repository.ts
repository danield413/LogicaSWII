import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Vendedor, VendedorRelations} from '../models';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype._id,
  VendedorRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Vendedor, dataSource);
  }
}
