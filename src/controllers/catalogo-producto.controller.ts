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
  Producto,
} from '../models';
import {CatalogoRepository} from '../repositories';

export class CatalogoProductoController {
  constructor(
    @repository(CatalogoRepository) protected catalogoRepository: CatalogoRepository,
  ) { }

  @get('/catalogos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Catalogo has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.catalogoRepository.catalogoProducto(id).find(filter);
  }

  @post('/catalogos/{id}/productos', {
    responses: {
      '200': {
        description: 'Catalogo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Catalogo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInCatalogo',
            exclude: ['_id'],
            optional: ['catalogoId']
          }),
        },
      },
    }) producto: Omit<Producto, '_id'>,
  ): Promise<Producto> {
    return this.catalogoRepository.catalogoProducto(id).create(producto);
  }

  @patch('/catalogos/{id}/productos', {
    responses: {
      '200': {
        description: 'Catalogo.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.catalogoRepository.catalogoProducto(id).patch(producto, where);
  }

  @del('/catalogos/{id}/productos', {
    responses: {
      '200': {
        description: 'Catalogo.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.catalogoRepository.catalogoProducto(id).delete(where);
  }
}
