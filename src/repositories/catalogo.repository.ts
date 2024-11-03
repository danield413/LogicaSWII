import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Catalogo, CatalogoRelations, Inventario, InventarioCatalogo} from '../models';
import {InventarioCatalogoRepository} from './inventario-catalogo.repository';
import {InventarioRepository} from './inventario.repository';

export class CatalogoRepository extends DefaultCrudRepository<
  Catalogo,
  typeof Catalogo.prototype._id,
  CatalogoRelations
> {


  public readonly inventarioCatalogo2: HasManyThroughRepositoryFactory<Inventario, typeof Inventario.prototype._id,
          InventarioCatalogo,
          typeof Catalogo.prototype._id
        >;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('InventarioCatalogoRepository') protected inventarioCatalogoRepositoryGetter: Getter<InventarioCatalogoRepository>, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Catalogo, dataSource);
    this.inventarioCatalogo2 = this.createHasManyThroughRepositoryFactoryFor('inventarioCatalogo2', inventarioRepositoryGetter, inventarioCatalogoRepositoryGetter,);
    this.registerInclusionResolver('inventarioCatalogo2', this.inventarioCatalogo2.inclusionResolver);
  }
}
