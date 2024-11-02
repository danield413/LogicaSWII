import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Pedido, PedidoRelations} from '../models';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype._id,
  PedidoRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Pedido, dataSource);
  }
}
