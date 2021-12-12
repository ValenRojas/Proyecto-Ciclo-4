import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedidos} from './pedidos.model';
import {Producto} from './producto.model';

@model()
export class Persona extends Entity {
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
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  direcciones: string;

  @hasMany(() => Pedidos)
  pedidos: Pedidos[];

  @hasMany(() => Producto)
  productos: Producto[];

  @property({
    type: 'string',
  })
  productoId: string;

  @property({
    type: 'string',
  })
  seguridadId: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
