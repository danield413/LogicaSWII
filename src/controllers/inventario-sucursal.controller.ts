import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inventario,
  Sucursal,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioSucursalController {
  constructor(
    @repository(InventarioRepository)
    public inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Inventario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sucursal),
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Inventario.prototype._id,
  ): Promise<Sucursal> {
    return this.inventarioRepository.inventarioSucursal(id);
  }
}
