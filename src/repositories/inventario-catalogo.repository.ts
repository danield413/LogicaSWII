import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {InventarioCatalogo, InventarioCatalogoRelations, SubVenta} from '../models';
import {SubVentaRepository} from './sub-venta.repository';

export class InventarioCatalogoRepository extends DefaultCrudRepository<
  InventarioCatalogo,
  typeof InventarioCatalogo.prototype._id,
  InventarioCatalogoRelations
> {

  public readonly inventarioCatalogoSubVenta: HasManyRepositoryFactory<SubVenta, typeof InventarioCatalogo.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('SubVentaRepository') protected subVentaRepositoryGetter: Getter<SubVentaRepository>,
  ) {
    super(InventarioCatalogo, dataSource);
    this.inventarioCatalogoSubVenta = this.createHasManyRepositoryFactoryFor('inventarioCatalogoSubVenta', subVentaRepositoryGetter,);
    this.registerInclusionResolver('inventarioCatalogoSubVenta', this.inventarioCatalogoSubVenta.inclusionResolver);
  }
}
