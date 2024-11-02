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
InventarioCatalogo,
ProductoPedido,
Pedido,
} from '../models';
import {InventarioCatalogoRepository} from '../repositories';

export class InventarioCatalogoPedidoController {
  constructor(
    @repository(InventarioCatalogoRepository) protected inventarioCatalogoRepository: InventarioCatalogoRepository,
  ) { }

  @get('/inventario-catalogos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of InventarioCatalogo has many Pedido through ProductoPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.inventarioCatalogoRepository.inventarioCatalogoPedido(id).find(filter);
  }

  @post('/inventario-catalogos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'create a Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof InventarioCatalogo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInInventarioCatalogo',
            exclude: ['_id'],
          }),
        },
      },
    }) pedido: Omit<Pedido, '_id'>,
  ): Promise<Pedido> {
    return this.inventarioCatalogoRepository.inventarioCatalogoPedido(id).create(pedido);
  }

  @patch('/inventario-catalogos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'InventarioCatalogo.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.inventarioCatalogoPedido(id).patch(pedido, where);
  }

  @del('/inventario-catalogos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'InventarioCatalogo.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.inventarioCatalogoPedido(id).delete(where);
  }
}
