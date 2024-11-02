import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Venta} from './venta.model';
import {Inventario} from './inventario.model';

@model()
export class Sucursal extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Venta)
  sucursalVenta: Venta[];

  @property({
    type: 'string',
  })
  inventarioId?: string;

  @hasOne(() => Inventario)
  sucursalInventario: Inventario;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
