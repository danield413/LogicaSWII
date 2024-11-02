import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Pedido, PedidoRelations, Proveedor, InventarioCatalogo, ProductoPedido} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {ProductoPedidoRepository} from './producto-pedido.repository';
import {InventarioCatalogoRepository} from './inventario-catalogo.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype._id,
  PedidoRelations
> {

  public readonly pedidoProveedor: BelongsToAccessor<Proveedor, typeof Pedido.prototype._id>;

  public readonly pedidoInventarioCatalogo: HasManyThroughRepositoryFactory<InventarioCatalogo, typeof InventarioCatalogo.prototype._id,
          ProductoPedido,
          typeof Pedido.prototype._id
        >;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('ProductoPedidoRepository') protected productoPedidoRepositoryGetter: Getter<ProductoPedidoRepository>, @repository.getter('InventarioCatalogoRepository') protected inventarioCatalogoRepositoryGetter: Getter<InventarioCatalogoRepository>,
  ) {
    super(Pedido, dataSource);
    this.pedidoInventarioCatalogo = this.createHasManyThroughRepositoryFactoryFor('pedidoInventarioCatalogo', inventarioCatalogoRepositoryGetter, productoPedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidoInventarioCatalogo', this.pedidoInventarioCatalogo.inclusionResolver);
    this.pedidoProveedor = this.createBelongsToAccessorFor('pedidoProveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('pedidoProveedor', this.pedidoProveedor.inclusionResolver);
  }
}
