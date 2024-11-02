import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype._id,
  VendedorRelations
> {

  public readonly vendedorVentas: HasManyRepositoryFactory<Venta, typeof Vendedor.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Vendedor, dataSource);
    this.vendedorVentas = this.createHasManyRepositoryFactoryFor('vendedorVentas', ventaRepositoryGetter,);
    this.registerInclusionResolver('vendedorVentas', this.vendedorVentas.inclusionResolver);
  }
}
