import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SubVenta,
  Venta,
} from '../models';
import {SubVentaRepository} from '../repositories';

export class SubVentaVentaController {
  constructor(
    @repository(SubVentaRepository)
    public subVentaRepository: SubVentaRepository,
  ) { }

  @get('/sub-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'Venta belonging to SubVenta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async getVenta(
    @param.path.string('id') id: typeof SubVenta.prototype._id,
  ): Promise<Venta> {
    return this.subVentaRepository.subVentaVenta(id);
  }
}
