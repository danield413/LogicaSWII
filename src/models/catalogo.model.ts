import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

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

  @hasMany(() => Producto)
  catalogoProducto: Producto[];

  constructor(data?: Partial<Catalogo>) {
    super(data);
  }
}

export interface CatalogoRelations {
  // describe navigational properties here
}

export type CatalogoWithRelations = Catalogo & CatalogoRelations;
