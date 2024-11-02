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
import {Catalogo} from '../models';
import {CatalogoRepository} from '../repositories';

export class CatalogoController {
  constructor(
    @repository(CatalogoRepository)
    public catalogoRepository : CatalogoRepository,
  ) {}

  @post('/catalogos')
  @response(200, {
    description: 'Catalogo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Catalogo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {
            title: 'NewCatalogo',
            exclude: ['_id'],
          }),
        },
      },
    })
    catalogo: Omit<Catalogo, '_id'>,
  ): Promise<Catalogo> {
    return this.catalogoRepository.create(catalogo);
  }

  @get('/catalogos/count')
  @response(200, {
    description: 'Catalogo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Catalogo) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.catalogoRepository.count(where);
  }

  @get('/catalogos')
  @response(200, {
    description: 'Array of Catalogo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Catalogo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Catalogo) filter?: Filter<Catalogo>,
  ): Promise<Catalogo[]> {
    return this.catalogoRepository.find(filter);
  }

  @patch('/catalogos')
  @response(200, {
    description: 'Catalogo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {partial: true}),
        },
      },
    })
    catalogo: Catalogo,
    @param.where(Catalogo) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.catalogoRepository.updateAll(catalogo, where);
  }

  @get('/catalogos/{id}')
  @response(200, {
    description: 'Catalogo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Catalogo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Catalogo, {exclude: 'where'}) filter?: FilterExcludingWhere<Catalogo>
  ): Promise<Catalogo> {
    return this.catalogoRepository.findById(id, filter);
  }

  @patch('/catalogos/{id}')
  @response(204, {
    description: 'Catalogo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {partial: true}),
        },
      },
    })
    catalogo: Catalogo,
  ): Promise<void> {
    await this.catalogoRepository.updateById(id, catalogo);
  }

  @put('/catalogos/{id}')
  @response(204, {
    description: 'Catalogo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() catalogo: Catalogo,
  ): Promise<void> {
    await this.catalogoRepository.replaceById(id, catalogo);
  }

  @del('/catalogos/{id}')
  @response(204, {
    description: 'Catalogo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.catalogoRepository.deleteById(id);
  }
}
