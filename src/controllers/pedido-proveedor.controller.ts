import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Proveedor,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProveedorController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Pedido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor),
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Pedido.prototype._id,
  ): Promise<Proveedor> {
    return this.pedidoRepository.pedidoProveedor(id);
  }
}
