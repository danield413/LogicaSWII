import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Producto, ProductoRelations, Catalogo} from '../models';
import {CatalogoRepository} from './catalogo.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype._id,
  ProductoRelations
> {

  public readonly productoCatalogo: BelongsToAccessor<Catalogo, typeof Producto.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('CatalogoRepository') protected catalogoRepositoryGetter: Getter<CatalogoRepository>,
  ) {
    super(Producto, dataSource);
    this.productoCatalogo = this.createBelongsToAccessorFor('productoCatalogo', catalogoRepositoryGetter,);
    this.registerInclusionResolver('productoCatalogo', this.productoCatalogo.inclusionResolver);
  }
}
