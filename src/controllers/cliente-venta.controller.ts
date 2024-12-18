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
  Cliente,
  Venta,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteVentaController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.clienteRepository.ventaCliente(id).find(filter);
  }

  @post('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInCliente',
            exclude: ['_id'],
            optional: ['clienteId']
          }),
        },
      },
    }) venta: Omit<Venta, '_id'>,
  ): Promise<Venta> {
    return this.clienteRepository.ventaCliente(id).create(venta);
  }

  @patch('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Cliente.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.clienteRepository.ventaCliente(id).patch(venta, where);
  }

  @del('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Cliente.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.clienteRepository.ventaCliente(id).delete(where);
  }
}
