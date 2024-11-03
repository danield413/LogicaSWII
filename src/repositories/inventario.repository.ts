import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Inventario, InventarioRelations, Sucursal, Catalogo, InventarioCatalogo} from '../models';
import {SucursalRepository} from './sucursal.repository';
import {InventarioCatalogoRepository} from './inventario-catalogo.repository';
import {CatalogoRepository} from './catalogo.repository';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype._id,
  InventarioRelations
> {


  public readonly inventarioCatalogo1: HasManyThroughRepositoryFactory<Catalogo, typeof Catalogo.prototype._id,
          InventarioCatalogo,
          typeof Inventario.prototype._id
        >;

  public readonly inventarioSucursal: BelongsToAccessor<Sucursal, typeof Inventario.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('InventarioCatalogoRepository') protected inventarioCatalogoRepositoryGetter: Getter<InventarioCatalogoRepository>, @repository.getter('CatalogoRepository') protected catalogoRepositoryGetter: Getter<CatalogoRepository>,
  ) {
    super(Inventario, dataSource);
    this.inventarioSucursal = this.createBelongsToAccessorFor('inventarioSucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('inventarioSucursal', this.inventarioSucursal.inclusionResolver);
    this.inventarioCatalogo1 = this.createHasManyThroughRepositoryFactoryFor('inventarioCatalogo1', catalogoRepositoryGetter, inventarioCatalogoRepositoryGetter,);
    this.registerInclusionResolver('inventarioCatalogo1', this.inventarioCatalogo1.inclusionResolver);
  }
}
