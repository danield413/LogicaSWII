import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype._id,
  ProveedorRelations
> {

  public readonly proveedorPedido: HasManyRepositoryFactory<Pedido, typeof Proveedor.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Proveedor, dataSource);
    this.proveedorPedido = this.createHasManyRepositoryFactoryFor('proveedorPedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('proveedorPedido', this.proveedorPedido.inclusionResolver);
  }
}
