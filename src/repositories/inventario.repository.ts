import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Inventario, InventarioRelations, Sucursal} from '../models';
import {SucursalRepository} from './sucursal.repository';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype._id,
  InventarioRelations
> {

  public readonly inventarioSucursal: BelongsToAccessor<Sucursal, typeof Inventario.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Inventario, dataSource);
    this.inventarioSucursal = this.createBelongsToAccessorFor('inventarioSucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('inventarioSucursal', this.inventarioSucursal.inclusionResolver);

  }
}
