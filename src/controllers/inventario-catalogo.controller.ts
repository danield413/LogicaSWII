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
import {InventarioCatalogo} from '../models';
import {InventarioCatalogoRepository} from '../repositories';

export class InventarioCatalogoController {
  constructor(
    @repository(InventarioCatalogoRepository)
    public inventarioCatalogoRepository : InventarioCatalogoRepository,
  ) {}

  @post('/inventario-catalogos')
  @response(200, {
    description: 'InventarioCatalogo model instance',
    content: {'application/json': {schema: getModelSchemaRef(InventarioCatalogo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioCatalogo, {
            title: 'NewInventarioCatalogo',
            exclude: ['_id'],
          }),
        },
      },
    })
    inventarioCatalogo: Omit<InventarioCatalogo, '_id'>,
  ): Promise<InventarioCatalogo> {
    return this.inventarioCatalogoRepository.create(inventarioCatalogo);
  }

  @get('/inventario-catalogos/count')
  @response(200, {
    description: 'InventarioCatalogo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InventarioCatalogo) where?: Where<InventarioCatalogo>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.count(where);
  }

  @get('/inventario-catalogos')
  @response(200, {
    description: 'Array of InventarioCatalogo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventarioCatalogo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InventarioCatalogo) filter?: Filter<InventarioCatalogo>,
  ): Promise<InventarioCatalogo[]> {
    return this.inventarioCatalogoRepository.find(filter);
  }

  @patch('/inventario-catalogos')
  @response(200, {
    description: 'InventarioCatalogo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioCatalogo, {partial: true}),
        },
      },
    })
    inventarioCatalogo: InventarioCatalogo,
    @param.where(InventarioCatalogo) where?: Where<InventarioCatalogo>,
  ): Promise<Count> {
    return this.inventarioCatalogoRepository.updateAll(inventarioCatalogo, where);
  }

  @get('/inventario-catalogos/{id}')
  @response(200, {
    description: 'InventarioCatalogo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventarioCatalogo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InventarioCatalogo, {exclude: 'where'}) filter?: FilterExcludingWhere<InventarioCatalogo>
  ): Promise<InventarioCatalogo> {
    return this.inventarioCatalogoRepository.findById(id, filter);
  }

  @patch('/inventario-catalogos/{id}')
  @response(204, {
    description: 'InventarioCatalogo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventarioCatalogo, {partial: true}),
        },
      },
    })
    inventarioCatalogo: InventarioCatalogo,
  ): Promise<void> {
    await this.inventarioCatalogoRepository.updateById(id, inventarioCatalogo);
  }

  @put('/inventario-catalogos/{id}')
  @response(204, {
    description: 'InventarioCatalogo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventarioCatalogo: InventarioCatalogo,
  ): Promise<void> {
    await this.inventarioCatalogoRepository.replaceById(id, inventarioCatalogo);
  }

  @del('/inventario-catalogos/{id}')
  @response(204, {
    description: 'InventarioCatalogo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventarioCatalogoRepository.deleteById(id);
  }
}
