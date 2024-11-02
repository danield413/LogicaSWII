import {Entity, model, property, hasOne} from '@loopback/repository';
import {Sucursal} from './sucursal.model';

@model()
export class Inventario extends Entity {
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
  descripcion: string;

  @hasOne(() => Sucursal)
  inventarioSucursal: Sucursal;

  constructor(data?: Partial<Inventario>) {
    super(data);
  }
}

export interface InventarioRelations {
  // describe navigational properties here
}

export type InventarioWithRelations = Inventario & InventarioRelations;
