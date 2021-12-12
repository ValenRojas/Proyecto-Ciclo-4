import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Seguridad} from './seguridad.model';
import {Factura} from './factura.model';
import {FinanciacionFactura} from './financiacion-factura.model';
import {DetalleFacturas} from './detalle-facturas.model';
import {Producto} from './producto.model';
import {Pedidos} from './pedidos.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  @belongsTo(() => Seguridad)
  seguridadId: string;

  @belongsTo(() => Factura)
  facturaId: string;

  @belongsTo(() => FinanciacionFactura)
  financiacionFacturaId: string;

  @belongsTo(() => DetalleFacturas)
  detalleFacturasId: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Pedidos)
  pedidos: Pedidos[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
