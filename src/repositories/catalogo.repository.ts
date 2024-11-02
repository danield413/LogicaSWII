import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Catalogo, CatalogoRelations} from '../models';

export class CatalogoRepository extends DefaultCrudRepository<
  Catalogo,
  typeof Catalogo.prototype._id,
  CatalogoRelations
> {
  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource,
  ) {
    super(Catalogo, dataSource);
  }
}
