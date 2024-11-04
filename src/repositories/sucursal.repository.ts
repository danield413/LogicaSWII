import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Venta, Inventario} from '../models';
import {VentaRepository} from './venta.repository';
import {InventarioRepository} from './inventario.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype._id,
  SucursalRelations
> {
  

  public readonly sucursalVenta: HasManyRepositoryFactory<Venta, typeof Sucursal.prototype._id>;

  public readonly sucursalInventario: HasManyRepositoryFactory<Inventario, typeof Sucursal.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Sucursal, dataSource);
    this.sucursalInventario = this.createHasManyRepositoryFactoryFor('sucursalInventario', inventarioRepositoryGetter,);
    this.registerInclusionResolver('sucursalInventario', this.sucursalInventario.inclusionResolver);
    this.sucursalVenta = this.createHasManyRepositoryFactoryFor('sucursalVenta', ventaRepositoryGetter,);
    this.registerInclusionResolver('sucursalVenta', this.sucursalVenta.inclusionResolver);
  }
}


