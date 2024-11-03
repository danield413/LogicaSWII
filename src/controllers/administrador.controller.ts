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
import {Administrador} from '../models';
import {AdministradorRepository} from '../repositories';
import {AuthService} from '../services';
import {service} from '@loopback/core';

export class AdministradorController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository,
    @service(AuthService) public authService: AuthService,
  ) {}

  @post('/administradors')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador, {
              title: 'NewAdministrador',
              exclude: ['_id'],
            }),
          },
        },
      })
      administrador: Omit<Administrador, '_id'>,
    ): Promise<Administrador> {
      // Encriptar la clave
      const clave = administrador.clave;
      administrador.clave = await this.authService.encryptPassword(clave);

      // Crear el administrador con la clave encriptada
      return this.administradorRepository.create(administrador);
    }

  @get('/administradors/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradors')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradors')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradors/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradors/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradors/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradors/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }

  // Nuevo endpoint para login
  @post('/administradors/login')
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
  ): Promise<{token?: string; success: boolean}> {
    const {correo, clave} = credentials;

    // Buscar administrador por correo y clave

    const admin = await this.administradorRepository.findOne({
      where: {correo},
    });

    if (!admin) {
      throw new HttpErrors.Unauthorized('Credenciales incorrectas');
    }

    // Verificar la clave
    const claveMatch = await this.authService.comparePassword(clave, admin.clave);

    if (!claveMatch) {
      throw new HttpErrors.Unauthorized('Credenciales incorrectas');
    }

    // Aquí se generaría un token JWT o algún identificador de sesión
    const token = await this.authService.generateToken({id: admin._id, correo: admin.correo});

    return {token, success: true};
  }
}
