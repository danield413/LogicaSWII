import {Entity, model, property, hasOne, belongsTo, hasMany} from '@loopback/repository';
import {Catalogo} from './catalogo.model';
import {InventarioCatalogo} from './inventario-catalogo.model';
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

  @hasMany(() => Catalogo, {through: {model: () => InventarioCatalogo}})
  inventarioCatalogo1: Catalogo[];

  @belongsTo(() => Sucursal, {name: 'inventarioSucursal'})
  sucursalId: string;

  constructor(data?: Partial<Inventario>) {
    super(data);
  }
}

export interface InventarioRelations {
  // describe navigational properties here
}

export type InventarioWithRelations = Inventario & InventarioRelations;
