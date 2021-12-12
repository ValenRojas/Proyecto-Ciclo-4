import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Seguridad,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSeguridadController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/seguridad', {
    responses: {
      '200': {
        description: 'Seguridad belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seguridad)},
          },
        },
      },
    },
  })
  async getSeguridad(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Seguridad> {
    return this.clienteRepository.seguridad(id);
  }
}
