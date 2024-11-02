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
  Inventario,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalInventarioController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/inventario', {
    responses: {
      '200': {
        description: 'Sucursal has one Inventario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inventario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario> {
    return this.sucursalRepository.sucursalInventario(id).get(filter);
  }

  @post('/sucursals/{id}/inventario', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInSucursal',
            exclude: ['_id'],
            optional: ['sucursalId']
          }),
        },
      },
    }) inventario: Omit<Inventario, '_id'>,
  ): Promise<Inventario> {
    return this.sucursalRepository.sucursalInventario(id).create(inventario);
  }

  @patch('/sucursals/{id}/inventario', {
    responses: {
      '200': {
        description: 'Sucursal.Inventario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {partial: true}),
        },
      },
    })
    inventario: Partial<Inventario>,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.sucursalRepository.sucursalInventario(id).patch(inventario, where);
  }

  @del('/sucursals/{id}/inventario', {
    responses: {
      '200': {
        description: 'Sucursal.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.sucursalRepository.sucursalInventario(id).delete(where);
  }
}
