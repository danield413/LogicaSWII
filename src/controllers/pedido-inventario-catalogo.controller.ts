import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Pedido,
ProductoPedido,
InventarioCatalogo,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoInventarioCatalogoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/inventario-catalogos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many InventarioCatalogo through ProductoPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InventarioCatalogo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InventarioCatalogo>,
  ): Promise<InventarioCatalogo[]> {
    return this.pedidoRepository.pedidoInventarioCatalogo(id).find(filter);
  }

  @post('/pedidos/{id}/inventario-catalogos', {
    responses: {
      '200': {
        description: 'create a InventarioCatalogo model instance',
        content: {'application/json': {schema: getModelSchemaRef(InventarioCatalogo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioCatalogo, {
            title: 'NewInventarioCatalogoInPedido',
            exclude: ['_id'],
          }),
        },
      },
    }) inventarioCatalogo: Omit<InventarioCatalogo, '_id'>,
  ): Promise<InventarioCatalogo> {
    return this.pedidoRepository.pedidoInventarioCatalogo(id).create(inventarioCatalogo);
  }

  @patch('/pedidos/{id}/inventario-catalogos', {
    responses: {
      '200': {
        description: 'Pedido.InventarioCatalogo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioCatalogo, {partial: true}),
        },
      },
    })
    inventarioCatalogo: Partial<InventarioCatalogo>,
    @param.query.object('where', getWhereSchemaFor(InventarioCatalogo)) where?: Where<InventarioCatalogo>,
  ): Promise<Count> {
    return this.pedidoRepository.pedidoInventarioCatalogo(id).patch(inventarioCatalogo, where);
  }

  @del('/pedidos/{id}/inventario-catalogos', {
    responses: {
      '200': {
        description: 'Pedido.InventarioCatalogo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InventarioCatalogo)) where?: Where<InventarioCatalogo>,
  ): Promise<Count> {
    return this.pedidoRepository.pedidoInventarioCatalogo(id).delete(where);
  }
}
