import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Catalogo, CatalogoRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class CatalogoRepository extends DefaultCrudRepository<
  Catalogo,
  typeof Catalogo.prototype._id,
  CatalogoRelations
> {

  public readonly catalogoProducto: HasManyRepositoryFactory<Producto, typeof Catalogo.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Catalogo, dataSource);
    this.catalogoProducto = this.createHasManyRepositoryFactoryFor('catalogoProducto', productoRepositoryGetter,);
    this.registerInclusionResolver('catalogoProducto', this.catalogoProducto.inclusionResolver);
  }
}
