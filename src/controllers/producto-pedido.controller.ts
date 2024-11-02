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
import {ProductoPedido} from '../models';
import {ProductoPedidoRepository} from '../repositories';

export class ProductoPedidoController {
  constructor(
    @repository(ProductoPedidoRepository)
    public productoPedidoRepository : ProductoPedidoRepository,
  ) {}

  @post('/producto-pedidos')
  @response(200, {
    description: 'ProductoPedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoPedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPedido, {
            title: 'NewProductoPedido',
            exclude: ['_id'],
          }),
        },
      },
    })
    productoPedido: Omit<ProductoPedido, '_id'>,
  ): Promise<ProductoPedido> {
    return this.productoPedidoRepository.create(productoPedido);
  }

  @get('/producto-pedidos/count')
  @response(200, {
    description: 'ProductoPedido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoPedido) where?: Where<ProductoPedido>,
  ): Promise<Count> {
    return this.productoPedidoRepository.count(where);
  }

  @get('/producto-pedidos')
  @response(200, {
    description: 'Array of ProductoPedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoPedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoPedido) filter?: Filter<ProductoPedido>,
  ): Promise<ProductoPedido[]> {
    return this.productoPedidoRepository.find(filter);
  }

  @patch('/producto-pedidos')
  @response(200, {
    description: 'ProductoPedido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPedido, {partial: true}),
        },
      },
    })
    productoPedido: ProductoPedido,
    @param.where(ProductoPedido) where?: Where<ProductoPedido>,
  ): Promise<Count> {
    return this.productoPedidoRepository.updateAll(productoPedido, where);
  }

  @get('/producto-pedidos/{id}')
  @response(200, {
    description: 'ProductoPedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoPedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductoPedido, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoPedido>
  ): Promise<ProductoPedido> {
    return this.productoPedidoRepository.findById(id, filter);
  }

  @patch('/producto-pedidos/{id}')
  @response(204, {
    description: 'ProductoPedido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPedido, {partial: true}),
        },
      },
    })
    productoPedido: ProductoPedido,
  ): Promise<void> {
    await this.productoPedidoRepository.updateById(id, productoPedido);
  }

  @put('/producto-pedidos/{id}')
  @response(204, {
    description: 'ProductoPedido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productoPedido: ProductoPedido,
  ): Promise<void> {
    await this.productoPedidoRepository.replaceById(id, productoPedido);
  }

  @del('/producto-pedidos/{id}')
  @response(204, {
    description: 'ProductoPedido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productoPedidoRepository.deleteById(id);
  }
}
