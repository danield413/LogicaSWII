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
  SubVenta,
} from '../models';
import {InventarioCatalogoRepository} from '../repositories';

export class InventarioCatalogoSubVentaController {
  constructor(
    @repository(InventarioCatalogoRepository) protected inventarioCatalogoRepository: InventarioCatalogoRepository,
  ) { }

  @get('/inventario-catalogos/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'Array of InventarioCatalogo has many SubVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SubVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SubVenta>,
  ): Promise<SubVenta[]> {
    return this.inventarioCatalogoRepository.inventarioCatalogoSubVenta(id).find(filter);
  }

  @post('/inventario-catalogos/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'InventarioCatalogo model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof InventarioCatalogo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {
            title: 'NewSubVentaInInventarioCatalogo',
            exclude: ['_id'],
            optional: ['inventarioCatalogoId']
          }),
        },
      },
    }) subVenta: Omit<SubVenta, '_id'>,
  ): Promise<SubVenta> {
    return this.inventarioCatalogoRepository.inventarioCatalogoSubVenta(id).create(subVenta);
  }

  @patch('/inventario-catalogos/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'InventarioCatalogo.SubVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {partial: true}),
        },
      },
    })
    subVenta: Partial<SubVenta>,
    @param.query.object('where', getWhereSchemaFor(SubVenta)) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.inventarioCatalogoSubVenta(id).patch(subVenta, where);
  }

  @del('/inventario-catalogos/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'InventarioCatalogo.SubVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SubVenta)) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.inventarioCatalogoSubVenta(id).delete(where);
  }
}
