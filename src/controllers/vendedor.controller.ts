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
  HttpErrors,
} from '@loopback/rest';
import {Vendedor} from '../models';
import {VendedorRepository} from '../repositories';
import {AuthService} from '../services';
import {service} from '@loopback/core';

export class VendedorController {
  constructor(
    @repository(VendedorRepository)
    public vendedorRepository: VendedorRepository,
    @service(AuthService) public authService: AuthService,
  ) {}

  @post('/vendedors')
  @response(200, {
    description: 'Vendedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vendedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {
            title: 'NewVendedor',
            exclude: ['_id'],
          }),
        },
      },
    })
    vendedor: Omit<Vendedor, '_id'>,
  ): Promise<Vendedor> {
    const clave = vendedor.clave;
    vendedor.clave = await this.authService.encryptPassword(clave);
    return this.vendedorRepository.create(vendedor);
  }

  @get('/vendedors/count')
  @response(200, {
    description: 'Vendedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vendedor) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.count(where);
  }

  @get('/vendedors')
  @response(200, {
    description: 'Array of Vendedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vendedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vendedor) filter?: Filter<Vendedor>,
  ): Promise<Vendedor[]> {
    return this.vendedorRepository.find(filter);
  }

  @patch('/vendedors')
  @response(200, {
    description: 'Vendedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Vendedor,
    @param.where(Vendedor) where?: Where<Vendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.updateAll(vendedor, where);
  }

  @get('/vendedors/{id}')
  @response(200, {
    description: 'Vendedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vendedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendedor, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendedor>
  ): Promise<Vendedor> {
    return this.vendedorRepository.findById(id, filter);
  }

  @patch('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedor, {partial: true}),
        },
      },
    })
    vendedor: Vendedor,
  ): Promise<void> {
    await this.vendedorRepository.updateById(id, vendedor);
  }

  @put('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendedor: Vendedor,
  ): Promise<void> {
    await this.vendedorRepository.replaceById(id, vendedor);
  }

  @del('/vendedors/{id}')
  @response(204, {
    description: 'Vendedor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendedorRepository.deleteById(id);
  }

  // Nuevo endpoint para login de vendedor
  @post('/vendedors/login')
  @response(200, {
    description: 'Login response',
    content: {'application/json': {schema: {type: 'object', properties: {token: {type: 'string'}, success: {type: 'boolean'}}}}},
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              correo: {type: 'string'},
              clave: {type: 'string'},
            },
            required: ['correo', 'clave'],
          },
        },
      },
    })
    credentials: {correo: string; clave: string},
  ): Promise<{token?: string; success: boolean, correo: string}> {
    const {correo, clave} = credentials;

    const vendedor = await this.vendedorRepository.findOne({
      where: {correo},
    });

    if (!vendedor) {
      throw new HttpErrors.Unauthorized('Credenciales incorrectas');
    }

    const claveMatch = await this.authService.comparePassword(clave, vendedor.clave);

    if (!claveMatch) {
      throw new HttpErrors.Unauthorized('Credenciales incorrectas');
    }

    const token = await this.authService.generateToken({id: vendedor._id, correo: vendedor.correo});

    return {token, success: true, correo: vendedor.correo};
  }
}
