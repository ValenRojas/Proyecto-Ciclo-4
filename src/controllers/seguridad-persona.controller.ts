import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Seguridad,
  Persona,
} from '../models';
import {SeguridadRepository} from '../repositories';

export class SeguridadPersonaController {
  constructor(
    @repository(SeguridadRepository) protected seguridadRepository: SeguridadRepository,
  ) { }

  @get('/seguridads/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Seguridad has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.seguridadRepository.personas(id).find(filter);
  }

  @post('/seguridads/{id}/personas', {
    responses: {
      '200': {
        description: 'Seguridad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Seguridad.prototype.usuariologeo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInSeguridad',
            exclude: ['id'],
            optional: ['seguridadId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.seguridadRepository.personas(id).create(persona);
  }

  @patch('/seguridads/{id}/personas', {
    responses: {
      '200': {
        description: 'Seguridad.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.seguridadRepository.personas(id).patch(persona, where);
  }

  @del('/seguridads/{id}/personas', {
    responses: {
      '200': {
        description: 'Seguridad.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.seguridadRepository.personas(id).delete(where);
  }
}
