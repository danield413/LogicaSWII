import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vendedor} from './vendedor.model';
import {Cliente} from './cliente.model';
import {Sucursal} from './sucursal.model';
import {SubVenta} from './sub-venta.model';

@model()
export class Venta extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoVenta: string;

  @property({
    type: 'number',
    required: true,
  })
  totalPagado: number;

  @belongsTo(() => Vendedor, {name: 'ventaVendedor'})
  vendedorId: string;

  @belongsTo(() => Cliente, {name: 'clienteVenta'})
  clienteId: string;

  @belongsTo(() => Sucursal, {name: 'ventaSucursal'})
  sucursalId: string;

  @hasMany(() => SubVenta)
  ventaSubVenta: SubVenta[];

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
