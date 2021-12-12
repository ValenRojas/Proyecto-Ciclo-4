import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Seguridad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  usuariologeo: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
  })
  Token: string;

  @hasMany(() => Persona)
  personas: Persona[];

  constructor(data?: Partial<Seguridad>) {
    super(data);
  }
}

export interface SeguridadRelations {
  // describe navigational properties here
}

export type SeguridadWithRelations = Seguridad & SeguridadRelations;
