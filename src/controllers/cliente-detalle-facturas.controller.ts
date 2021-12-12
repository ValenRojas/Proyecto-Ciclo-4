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
  DetalleFacturas,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDetalleFacturasController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'DetalleFacturas belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFacturas)},
          },
        },
      },
    },
  })
  async getDetalleFacturas(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<DetalleFacturas> {
    return this.clienteRepository.detalleFacturas(id);
  }
}
