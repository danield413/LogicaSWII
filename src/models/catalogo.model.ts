import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inventario} from './inventario.model';
import {InventarioCatalogo} from './inventario-catalogo.model';

@model()
export class Catalogo extends Entity {
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
  descuento: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Inventario, {through: {model: () => InventarioCatalogo}})
  inventarioCatalogo2: Inventario[];

  constructor(data?: Partial<Catalogo>) {
    super(data);
  }
}

export interface CatalogoRelations {
  // describe navigational properties here
}

export type CatalogoWithRelations = Catalogo & CatalogoRelations;
