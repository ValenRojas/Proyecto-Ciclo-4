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
  FinanciacionFactura,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteFinanciacionFacturaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/financiacion-factura', {
    responses: {
      '200': {
        description: 'FinanciacionFactura belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FinanciacionFactura)},
          },
        },
      },
    },
  })
  async getFinanciacionFactura(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<FinanciacionFactura> {
    return this.clienteRepository.financiacionFactura(id);
  }
}
