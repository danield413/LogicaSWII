import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';

@model()
export class Pedido extends Entity {
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
  fecha: string;

  @belongsTo(() => Proveedor, {name: 'pedidoProveedor'})
  proveedorId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
