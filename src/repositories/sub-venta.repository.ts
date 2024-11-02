import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {SubVenta, SubVentaRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class SubVentaRepository extends DefaultCrudRepository<
  SubVenta,
  typeof SubVenta.prototype._id,
  SubVentaRelations
> {

  public readonly subVentaVenta: BelongsToAccessor<Venta, typeof SubVenta.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(SubVenta, dataSource);
    this.subVentaVenta = this.createBelongsToAccessorFor('subVentaVenta', ventaRepositoryGetter,);
    this.registerInclusionResolver('subVentaVenta', this.subVentaVenta.inclusionResolver);
  }
}
