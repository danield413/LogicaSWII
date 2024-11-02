import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SubVenta} from '../models';
import {SubVentaRepository} from '../repositories';

export class SubVentaController {
  constructor(
    @repository(SubVentaRepository)
    public subVentaRepository : SubVentaRepository,
  ) {}

  @post('/sub-ventas')
  @response(200, {
    description: 'SubVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(SubVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {
            title: 'NewSubVenta',
            exclude: ['_id'],
          }),
        },
      },
    })
    subVenta: Omit<SubVenta, '_id'>,
  ): Promise<SubVenta> {
    return this.subVentaRepository.create(subVenta);
  }

  @get('/sub-ventas/count')
  @response(200, {
    description: 'SubVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SubVenta) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.subVentaRepository.count(where);
  }

  @get('/sub-ventas')
  @response(200, {
    description: 'Array of SubVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SubVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SubVenta) filter?: Filter<SubVenta>,
  ): Promise<SubVenta[]> {
    return this.subVentaRepository.find(filter);
  }

  @patch('/sub-ventas')
  @response(200, {
    description: 'SubVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {partial: true}),
        },
      },
    })
    subVenta: SubVenta,
    @param.where(SubVenta) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.subVentaRepository.updateAll(subVenta, where);
  }

  @get('/sub-ventas/{id}')
  @response(200, {
    description: 'SubVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SubVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SubVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<SubVenta>
  ): Promise<SubVenta> {
    return this.subVentaRepository.findById(id, filter);
  }

  @patch('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {partial: true}),
        },
      },
    })
    subVenta: SubVenta,
  ): Promise<void> {
    await this.subVentaRepository.updateById(id, subVenta);
  }

  @put('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subVenta: SubVenta,
  ): Promise<void> {
    await this.subVentaRepository.replaceById(id, subVenta);
  }

  @del('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subVentaRepository.deleteById(id);
  }
}
