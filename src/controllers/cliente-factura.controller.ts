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
  Factura,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteFacturaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Factura> {
    return this.clienteRepository.factura(id);
  }
}
