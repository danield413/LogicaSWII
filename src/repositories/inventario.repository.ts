import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Inventario, InventarioRelations, Sucursal} from '../models';
import {SucursalRepository} from './sucursal.repository';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype._id,
  InventarioRelations
> {


  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Inventario, dataSource);

  }
}
