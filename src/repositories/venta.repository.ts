import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SistemaDataSource} from '../datasources';
import {Venta, VentaRelations, Vendedor, Cliente, Sucursal, SubVenta} from '../models';
import {VendedorRepository} from './vendedor.repository';
import {ClienteRepository} from './cliente.repository';
import {SucursalRepository} from './sucursal.repository';
import {SubVentaRepository} from './sub-venta.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype._id,
  VentaRelations
> {

  public readonly ventaVendedor: BelongsToAccessor<Vendedor, typeof Venta.prototype._id>;

  public readonly clienteVenta: BelongsToAccessor<Cliente, typeof Venta.prototype._id>;

  public readonly ventaSucursal: BelongsToAccessor<Sucursal, typeof Venta.prototype._id>;

  public readonly ventaSubVenta: HasManyRepositoryFactory<SubVenta, typeof Venta.prototype._id>;

  constructor(
    @inject('datasources.sistema') dataSource: SistemaDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('SubVentaRepository') protected subVentaRepositoryGetter: Getter<SubVentaRepository>,
  ) {
    super(Venta, dataSource);
    this.ventaSubVenta = this.createHasManyRepositoryFactoryFor('ventaSubVenta', subVentaRepositoryGetter,);
    this.registerInclusionResolver('ventaSubVenta', this.ventaSubVenta.inclusionResolver);
    this.ventaSucursal = this.createBelongsToAccessorFor('ventaSucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('ventaSucursal', this.ventaSucursal.inclusionResolver);
    this.clienteVenta = this.createBelongsToAccessorFor('clienteVenta', clienteRepositoryGetter,);
    this.registerInclusionResolver('clienteVenta', this.clienteVenta.inclusionResolver);
    this.ventaVendedor = this.createBelongsToAccessorFor('ventaVendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('ventaVendedor', this.ventaVendedor.inclusionResolver);
  }
}
