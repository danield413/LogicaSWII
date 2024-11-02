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
  Proveedor,
  Pedido,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorPedidoController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Pedido',
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
    return this.proveedorRepository.proveedorPedido(id).find(filter);
  }

  @post('/proveedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInProveedor',
            exclude: ['_id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) pedido: Omit<Pedido, '_id'>,
  ): Promise<Pedido> {
    return this.proveedorRepository.proveedorPedido(id).create(pedido);
  }

  @patch('/proveedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Proveedor.Pedido PATCH success count',
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
    return this.proveedorRepository.proveedorPedido(id).patch(pedido, where);
  }

  @del('/proveedors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Proveedor.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.proveedorRepository.proveedorPedido(id).delete(where);
  }
}
