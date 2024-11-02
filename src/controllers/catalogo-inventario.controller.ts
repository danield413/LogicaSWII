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
Catalogo,
InventarioCatalogo,
Inventario,
} from '../models';
import {CatalogoRepository} from '../repositories';

export class CatalogoInventarioController {
  constructor(
    @repository(CatalogoRepository) protected catalogoRepository: CatalogoRepository,
  ) { }

  @get('/catalogos/{id}/inventarios', {
    responses: {
      '200': {
        description: 'Array of Catalogo has many Inventario through InventarioCatalogo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario[]> {
    return this.catalogoRepository.inventarioCatalogo2(id).find(filter);
  }

  @post('/catalogos/{id}/inventarios', {
    responses: {
      '200': {
        description: 'create a Inventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Catalogo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInCatalogo',
            exclude: ['_id'],
          }),
        },
      },
    }) inventario: Omit<Inventario, '_id'>,
  ): Promise<Inventario> {
    return this.catalogoRepository.inventarioCatalogo2(id).create(inventario);
  }

  @patch('/catalogos/{id}/inventarios', {
    responses: {
      '200': {
        description: 'Catalogo.Inventario PATCH success count',
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
    return this.catalogoRepository.inventarioCatalogo2(id).patch(inventario, where);
  }

  @del('/catalogos/{id}/inventarios', {
    responses: {
      '200': {
        description: 'Catalogo.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.catalogoRepository.inventarioCatalogo2(id).delete(where);
  }
}
