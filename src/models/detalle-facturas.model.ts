import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class DetalleFacturas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  IdProducto: string;

  @property({
    type: 'number',
    required: true,
  })
  pedido: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidadproductos: number;

  @property({
    type: 'string',
  })
  productoId: string;

  @belongsTo(() => Factura)
  facturaId: string;

  constructor(data?: Partial<DetalleFacturas>) {
    super(data);
  }
}

export interface DetalleFacturasRelations {
  // describe navigational properties here
}

export type DetalleFacturasWithRelations = DetalleFacturas & DetalleFacturasRelations;
