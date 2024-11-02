import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Sucursal,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaSucursalController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Venta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sucursal),
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Venta.prototype._id,
  ): Promise<Sucursal> {
    return this.ventaRepository.ventaSucursal(id);
  }
}
