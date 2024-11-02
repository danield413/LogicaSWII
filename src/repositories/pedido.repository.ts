import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Pedido, PedidoRelations, Proveedor} from '../models';
import {ProveedorRepository} from './proveedor.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype._id,
  PedidoRelations
> {

  public readonly pedidoProveedor: BelongsToAccessor<Proveedor, typeof Pedido.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Pedido, dataSource);
    this.pedidoProveedor = this.createBelongsToAccessorFor('pedidoProveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('pedidoProveedor', this.pedidoProveedor.inclusionResolver);
  }
}
