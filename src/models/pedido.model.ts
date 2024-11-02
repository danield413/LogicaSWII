import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {InventarioCatalogo} from './inventario-catalogo.model';
import {ProductoPedido} from './producto-pedido.model';

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

  @hasMany(() => InventarioCatalogo, {through: {model: () => ProductoPedido}})
  pedidoInventarioCatalogo: InventarioCatalogo[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
