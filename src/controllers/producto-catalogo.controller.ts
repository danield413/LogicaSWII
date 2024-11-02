import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Catalogo,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCatalogoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/catalogo', {
    responses: {
      '200': {
        description: 'Catalogo belonging to Producto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Catalogo),
          },
        },
      },
    },
  })
  async getCatalogo(
    @param.path.string('id') id: typeof Producto.prototype._id,
  ): Promise<Catalogo> {
    return this.productoRepository.productoCatalogo(id);
  }
}
