import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<SubVenta>) {
    super(data);
  }
}

export interface SubVentaRelations {
  // describe navigational properties here
}

export type SubVentaWithRelations = SubVenta & SubVentaRelations;
