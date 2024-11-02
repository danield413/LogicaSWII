import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductoPedido extends Entity {
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
    type: 'string',
  })
  inventarioCatalogoId?: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<ProductoPedido>) {
    super(data);
  }
}

export interface ProductoPedidoRelations {
  // describe navigational properties here
}

export type ProductoPedidoWithRelations = ProductoPedido & ProductoPedidoRelations;
