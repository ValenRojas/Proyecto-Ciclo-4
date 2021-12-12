import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class FinanciacionFactura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  IdFactura: string;

  @property({
    type: 'number',
    required: true,
  })
  NumeroCuotasTotales: number;

  @property({
    type: 'string',
    required: true,
  })
  PorcentajeIntereses: string;

  @property({
    type: 'number',
    required: true,
  })
  NumeroCuotasPagadas: number;

  @belongsTo(() => Factura)
  facturaId: string;

  constructor(data?: Partial<FinanciacionFactura>) {
    super(data);
  }
}

export interface FinanciacionFacturaRelations {
  // describe navigational properties here
}

export type FinanciacionFacturaWithRelations = FinanciacionFactura & FinanciacionFacturaRelations;
