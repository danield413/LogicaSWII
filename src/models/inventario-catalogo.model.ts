import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<InventarioCatalogo>) {
    super(data);
  }
}

export interface InventarioCatalogoRelations {
  // describe navigational properties here
}

export type InventarioCatalogoWithRelations = InventarioCatalogo & InventarioCatalogoRelations;
