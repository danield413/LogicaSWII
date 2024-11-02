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
  InventarioCatalogo,
} from '../models';
import {SubVentaRepository} from '../repositories';

export class SubVentaInventarioCatalogoController {
  constructor(
    @repository(SubVentaRepository)
    public subVentaRepository: SubVentaRepository,
  ) { }

  @get('/sub-ventas/{id}/inventario-catalogo', {
    responses: {
      '200': {
        description: 'InventarioCatalogo belonging to SubVenta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InventarioCatalogo),
          },
        },
      },
    },
  })
  async getInventarioCatalogo(
    @param.path.string('id') id: typeof SubVenta.prototype._id,
  ): Promise<InventarioCatalogo> {
    return this.subVentaRepository.subVentaInventarioCatalogo(id);
  }
}
