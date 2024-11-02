import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Venta} from './venta.model';
import {InventarioCatalogo} from './inventario-catalogo.model';

@model()
export class SubVenta extends Entity {
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
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  subTotal: number;

  @belongsTo(() => Venta, {name: 'subVentaVenta'})
  ventaId: string;

  @belongsTo(() => InventarioCatalogo, {name: 'subVentaInventarioCatalogo'})
  inventarioCatalogoId: string;

  constructor(data?: Partial<SubVenta>) {
    super(data);
  }
}

export interface SubVentaRelations {
  // describe navigational properties here
}

export type SubVentaWithRelations = SubVenta & SubVentaRelations;
