import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype._id,
  SucursalRelations
> {

  public readonly sucursalVenta: HasManyRepositoryFactory<Venta, typeof Sucursal.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Sucursal, dataSource);
    this.sucursalVenta = this.createHasManyRepositoryFactoryFor('sucursalVenta', ventaRepositoryGetter,);
    this.registerInclusionResolver('sucursalVenta', this.sucursalVenta.inclusionResolver);
  }
}
