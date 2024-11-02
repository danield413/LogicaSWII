import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {ProductoPedido, ProductoPedidoRelations} from '../models';

export class ProductoPedidoRepository extends DefaultCrudRepository<
  ProductoPedido,
  typeof ProductoPedido.prototype._id,
  ProductoPedidoRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(ProductoPedido, dataSource);
  }
}
