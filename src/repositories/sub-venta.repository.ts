import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {SubVenta, SubVentaRelations, Venta, InventarioCatalogo} from '../models';
import {VentaRepository} from './venta.repository';
import {InventarioCatalogoRepository} from './inventario-catalogo.repository';

export class SubVentaRepository extends DefaultCrudRepository<
  SubVenta,
  typeof SubVenta.prototype._id,
  SubVentaRelations
> {

  public readonly subVentaVenta: BelongsToAccessor<Venta, typeof SubVenta.prototype._id>;

  public readonly subVentaInventarioCatalogo: BelongsToAccessor<InventarioCatalogo, typeof SubVenta.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('InventarioCatalogoRepository') protected inventarioCatalogoRepositoryGetter: Getter<InventarioCatalogoRepository>,
  ) {
    super(SubVenta, dataSource);
    this.subVentaInventarioCatalogo = this.createBelongsToAccessorFor('subVentaInventarioCatalogo', inventarioCatalogoRepositoryGetter,);
    this.registerInclusionResolver('subVentaInventarioCatalogo', this.subVentaInventarioCatalogo.inclusionResolver);
    this.subVentaVenta = this.createBelongsToAccessorFor('subVentaVenta', ventaRepositoryGetter,);
    this.registerInclusionResolver('subVentaVenta', this.subVentaVenta.inclusionResolver);
  }
}
