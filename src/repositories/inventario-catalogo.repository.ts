import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {InventarioCatalogo, InventarioCatalogoRelations, SubVenta, Pedido, ProductoPedido} from '../models';
import {SubVentaRepository} from './sub-venta.repository';
import {ProductoPedidoRepository} from './producto-pedido.repository';
import {PedidoRepository} from './pedido.repository';

export class InventarioCatalogoRepository extends DefaultCrudRepository<
  InventarioCatalogo,
  typeof InventarioCatalogo.prototype._id,
  InventarioCatalogoRelations
> {

  public readonly inventarioCatalogoSubVenta: HasManyRepositoryFactory<SubVenta, typeof InventarioCatalogo.prototype._id>;

  public readonly inventarioCatalogoPedido: HasManyThroughRepositoryFactory<Pedido, typeof Pedido.prototype._id,
          ProductoPedido,
          typeof InventarioCatalogo.prototype._id
        >;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('SubVentaRepository') protected subVentaRepositoryGetter: Getter<SubVentaRepository>, @repository.getter('ProductoPedidoRepository') protected productoPedidoRepositoryGetter: Getter<ProductoPedidoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(InventarioCatalogo, dataSource);
    this.inventarioCatalogoPedido = this.createHasManyThroughRepositoryFactoryFor('inventarioCatalogoPedido', pedidoRepositoryGetter, productoPedidoRepositoryGetter,);
    this.registerInclusionResolver('inventarioCatalogoPedido', this.inventarioCatalogoPedido.inclusionResolver);
    this.inventarioCatalogoSubVenta = this.createHasManyRepositoryFactoryFor('inventarioCatalogoSubVenta', subVentaRepositoryGetter,);
    this.registerInclusionResolver('inventarioCatalogoSubVenta', this.inventarioCatalogoSubVenta.inclusionResolver);
  }
}
