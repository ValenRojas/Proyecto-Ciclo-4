import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pedidos} from './pedidos.model';
import {Persona} from './persona.model';

@model()
export class Producto extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @hasMany(() => Pedidos)
  pedidos: Pedidos[];

  @property({
    type: 'string',
  })
  administradorId: string;

  @property({
    type: 'string',
  })
  personaId: string;

  @hasMany(() => Persona)
  persona: Persona[];

  @property({
    type: 'string',
  })
  asesorId: string;

  @property({
    type: 'string',
  })
  clienteId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
