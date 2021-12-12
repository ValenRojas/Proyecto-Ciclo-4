import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FinanciacionFactura,
  Factura,
} from '../models';
import {FinanciacionFacturaRepository} from '../repositories';

export class FinanciacionFacturaFacturaController {
  constructor(
    @repository(FinanciacionFacturaRepository)
    public financiacionFacturaRepository: FinanciacionFacturaRepository,
  ) { }

  @get('/financiacion-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to FinanciacionFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof FinanciacionFactura.prototype.IdFactura,
  ): Promise<Factura> {
    return this.financiacionFacturaRepository.factura(id);
  }
}
