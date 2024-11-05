import {service} from '@loopback/core';
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
import {SubVenta} from '../models';
import {SubVentaRepository} from '../repositories';
import {VentasService} from '../services';

export class SubVentaController {
  constructor(
    @repository(SubVentaRepository)
    public subVentaRepository: SubVentaRepository,

    @service(VentasService)
    public ventasService: VentasService,

  ) { }

  @post('/sub-ventas')
  @response(200, {
    description: 'SubVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(SubVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {
            title: 'NewSubVenta',
            exclude: ['_id'],
          }),
        },
      },
    })
    subVenta: Omit<SubVenta, '_id'>,
  ): Promise<SubVenta> {
    //Calcular el subtotal
    subVenta.subTotal = await this.ventasService.calcularSubTotal(subVenta.inventarioCatalogoId, subVenta.cantidad);
    //Llamado al servicio de ventas para reducir el stock
    await this.ventasService.reducirStock(subVenta.inventarioCatalogoId, subVenta.cantidad);
    return this.subVentaRepository.create(subVenta);
  }

  @get('/sub-ventas/count')
  @response(200, {
    description: 'SubVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SubVenta) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.subVentaRepository.count(where);
  }

  @get('/sub-ventas')
  @response(200, {
    description: 'Array of SubVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SubVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SubVenta) filter?: Filter<SubVenta>,
  ): Promise<SubVenta[]> {
    return this.subVentaRepository.find(filter);
  }


  //End point para obetner el producto mas vendido y el menos vendido
  @get('/sub-ventas/productos-mas-y-menos-vendidos')
  @response(200, {
    description: 'SubVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async productosMasYMenosVendidos(
    @param.where(SubVenta) where?: Where<SubVenta>,
  ): Promise<any> {

    return this.ventasService.obtenerProductoMasYMenosVendido();

  }

  //End point para obtener todas las subventas de una venta y el total

  @get('/sub-ventas/factura/{ventaId}')
  @response(200, {
    description: 'SubVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async obtenerSubVentasDeUnaVenta(
    @param.path.string('ventaId') ventaId: string,
  ): Promise<any> {

    return this.ventasService.obtenerFactura(ventaId);

  }


  @patch('/sub-ventas')
  @response(200, {
    description: 'SubVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {partial: true}),
        },
      },
    })
    subVenta: SubVenta,
    @param.where(SubVenta) where?: Where<SubVenta>,
  ): Promise<Count> {
    return this.subVentaRepository.updateAll(subVenta, where);
  }

  @get('/sub-ventas/{id}')
  @response(200, {
    description: 'SubVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SubVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SubVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<SubVenta>
  ): Promise<SubVenta> {
    return this.subVentaRepository.findById(id, filter);
  }

  @patch('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubVenta, {partial: true}),
        },
      },
    })
    subVenta: SubVenta,
  ): Promise<void> {
    await this.subVentaRepository.updateById(id, subVenta);
  }

  @put('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subVenta: SubVenta,
  ): Promise<void> {
    await this.subVentaRepository.replaceById(id, subVenta);
  }

  @del('/sub-ventas/{id}')
  @response(204, {
    description: 'SubVenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subVentaRepository.deleteById(id);
  }

  //End point para borrar todas las subventas de una venta
  @del('/sub-ventas/venta/{ventaId}')
  @response(204, {
    description: 'SubVenta DELETE success',
  })
  async deleteSubVentasDeUnaVenta(@param.path.string('ventaId') ventaId: string): Promise<void> {
    await this.subVentaRepository.deleteAll({ventaId: ventaId});
  }
}
