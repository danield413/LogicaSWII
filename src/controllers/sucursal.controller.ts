import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Inventario, Sucursal, Venta} from '../models';
import {InventarioRepository, SucursalRepository, VentaRepository} from '../repositories';

export class SucursalController {
  constructor(
    @repository(SucursalRepository)
    public sucursalRepository: SucursalRepository,

    @repository(InventarioRepository)
    public inventarioRepository: InventarioRepository,


    @repository(VentaRepository)
    public ventaRepository: VentaRepository,

  ) { }

  @post('/sucursals')
  @response(200, {
    description: 'Sucursal model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursal',
            exclude: ['_id'],
          }),
        },
      },
    })
    sucursal: Omit<Sucursal, '_id'>,
  ): Promise<Sucursal> {
    return this.sucursalRepository.create(sucursal);
  }

  @get('/sucursals/count')
  @response(200, {
    description: 'Sucursal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sucursal) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.sucursalRepository.count(where);
  }

  @get('/sucursals')
  @response(200, {
    description: 'Array of Sucursal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sucursal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sucursal) filter?: Filter<Sucursal>,
  ): Promise<Sucursal[]> {
    return this.sucursalRepository.find(filter);
  }

  @patch('/sucursals')
  @response(200, {
    description: 'Sucursal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Sucursal,
    @param.where(Sucursal) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.sucursalRepository.updateAll(sucursal, where);
  }

  @get('/sucursals/{id}')
  @response(200, {
    description: 'Sucursal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sucursal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sucursal, {exclude: 'where'}) filter?: FilterExcludingWhere<Sucursal>
  ): Promise<Sucursal> {
    return this.sucursalRepository.findById(id, filter);
  }


  //End point en el que se pasa el id de una sucursal y me retorna el inventario que tiene cada sucursal


  @get('/sucursals/{id}/inventarios1', {
    responses: {
      '200': {
        description: 'Array of Inventario belonging to Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventario)},
          },
        },
      },
    },
  })
  async findInventarios(
    @param.path.string('id') id: typeof Sucursal.prototype._id,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario[]> {
    //Retornar el inventario de una sucursal
    return this.sucursalRepository.sucursalInventario(id).find(filter);
  }


  //End point para obtener las ventas de una sucursal
  @get('/sucursals/{id}/ventas1')
  @response(200, {
    description: 'Array of Venta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Venta, {includeRelations: true}),
        },
      },
    },
  })
  async findVentas(
    @param.path.string('id') id: typeof Sucursal.prototype._id,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.sucursalRepository.sucursalVenta(id).find(filter);
  }

  @patch('/sucursals/{id}')
  @response(204, {
    description: 'Sucursal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Sucursal,
  ): Promise<void> {
    await this.sucursalRepository.updateById(id, sucursal);
  }

  @put('/sucursals/{id}')
  @response(204, {
    description: 'Sucursal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sucursal: Sucursal,
  ): Promise<void> {
    await this.sucursalRepository.replaceById(id, sucursal);
  }

  @del('/sucursals/{id}')
  @response(204, {
    description: 'Sucursal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sucursalRepository.deleteById(id);
  }
}
