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
  Vendedor,
  Venta,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorVentaController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Vendedor has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.vendedorRepository.vendedorVentas(id).find(filter);
  }

  @post('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedor.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInVendedor',
            exclude: ['_id'],
            optional: ['vendedorId']
          }),
        },
      },
    }) venta: Omit<Venta, '_id'>,
  ): Promise<Venta> {
    return this.vendedorRepository.vendedorVentas(id).create(venta);
  }

  @patch('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.vendedorRepository.vendedorVentas(id).patch(venta, where);
  }

  @del('/vendedors/{id}/ventas', {
    responses: {
      '200': {
        description: 'Vendedor.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.vendedorRepository.vendedorVentas(id).delete(where);
  }
}
