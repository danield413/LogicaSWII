import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Cliente, ClienteRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype._id,
  ClienteRelations
> {

  public readonly ventaCliente: HasManyRepositoryFactory<Venta, typeof Cliente.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Cliente, dataSource);
    this.ventaCliente = this.createHasManyRepositoryFactoryFor('ventaCliente', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventaCliente', this.ventaCliente.inclusionResolver);
  }
}
