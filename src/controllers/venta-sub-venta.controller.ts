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
  Venta,
  SubVenta,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaSubVentaController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'Array of Venta has many SubVenta',
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
    return this.ventaRepository.ventaSubVenta(id).find(filter);
  }

  @post('/ventas/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {
            title: 'NewSubVentaInVenta',
            exclude: ['_id'],
            optional: ['ventaId']
          }),
        },
      },
    }) subVenta: Omit<SubVenta, '_id'>,
  ): Promise<SubVenta> {
    return this.ventaRepository.ventaSubVenta(id).create(subVenta);
  }

  @patch('/ventas/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'Venta.SubVenta PATCH success count',
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
    return this.ventaRepository.ventaSubVenta(id).patch(subVenta, where);
  }

  @del('/ventas/{id}/sub-ventas', {
    responses: {
      '200': {
        description: 'Venta.SubVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SubVenta)) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.ventaRepository.ventaSubVenta(id).delete(where);
  }
}
