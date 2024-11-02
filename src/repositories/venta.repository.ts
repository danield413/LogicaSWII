import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Venta, VentaRelations} from '../models';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype._id,
  VentaRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Venta, dataSource);
  }
}
