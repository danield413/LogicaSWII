import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {SubVenta, SubVentaRelations} from '../models';

export class SubVentaRepository extends DefaultCrudRepository<
  SubVenta,
  typeof SubVenta.prototype._id,
  SubVentaRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(SubVenta, dataSource);
  }
}
