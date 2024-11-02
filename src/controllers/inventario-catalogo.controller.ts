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
Inventario,
InventarioCatalogo,
Catalogo,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioCatalogoController {
  constructor(
    @repository(InventarioRepository) protected inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/catalogos', {
    responses: {
      '200': {
        description: 'Array of Inventario has many Catalogo through InventarioCatalogo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Catalogo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Catalogo>,
  ): Promise<Catalogo[]> {
    return this.inventarioRepository.inventarioCatalogo1(id).find(filter);
  }

  @post('/inventarios/{id}/catalogos', {
    responses: {
      '200': {
        description: 'create a Catalogo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Catalogo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventario.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {
            title: 'NewCatalogoInInventario',
            exclude: ['_id'],
          }),
        },
      },
    }) catalogo: Omit<Catalogo, '_id'>,
  ): Promise<Catalogo> {
    return this.inventarioRepository.inventarioCatalogo1(id).create(catalogo);
  }

  @patch('/inventarios/{id}/catalogos', {
    responses: {
      '200': {
        description: 'Inventario.Catalogo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Catalogo, {partial: true}),
        },
      },
    })
    catalogo: Partial<Catalogo>,
    @param.query.object('where', getWhereSchemaFor(Catalogo)) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.inventarioRepository.inventarioCatalogo1(id).patch(catalogo, where);
  }

  @del('/inventarios/{id}/catalogos', {
    responses: {
      '200': {
        description: 'Inventario.Catalogo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Catalogo)) where?: Where<Catalogo>,
  ): Promise<Count> {
    return this.inventarioRepository.inventarioCatalogo1(id).delete(where);
  }
}
