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
  Sucursal,
  Venta,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalVentaController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Venta',
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
    return this.sucursalRepository.sucursalVenta(id).find(filter);
  }

  @post('/sucursals/{id}/ventas', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInSucursal',
            exclude: ['_id'],
            optional: ['sucursalId']
          }),
        },
      },
    }) venta: Omit<Venta, '_id'>,
  ): Promise<Venta> {
    return this.sucursalRepository.sucursalVenta(id).create(venta);
  }

  @patch('/sucursals/{id}/ventas', {
    responses: {
      '200': {
        description: 'Sucursal.Venta PATCH success count',
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
    return this.sucursalRepository.sucursalVenta(id).patch(venta, where);
  }

  @del('/sucursals/{id}/ventas', {
    responses: {
      '200': {
        description: 'Sucursal.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.sucursalRepository.sucursalVenta(id).delete(where);
  }
}
