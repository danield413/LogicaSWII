import {Entity, model, property, hasMany} from '@loopback/repository';
import {SubVenta} from './sub-venta.model';
import {Pedido} from './pedido.model';
import {ProductoPedido} from './producto-pedido.model';

@model()
export class InventarioCatalogo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
  })
  inventarioId?: string;

  @property({
    type: 'string',
  })
  catalogoId?: string;

  @hasMany(() => SubVenta)
  inventarioCatalogoSubVenta: SubVenta[];

  @hasMany(() => Pedido, {through: {model: () => ProductoPedido}})
  inventarioCatalogoPedido: Pedido[];

  constructor(data?: Partial<InventarioCatalogo>) {
    super(data);
  }
}

export interface InventarioCatalogoRelations {
  // describe navigational properties here
}

export type InventarioCatalogoWithRelations = InventarioCatalogo & InventarioCatalogoRelations;
