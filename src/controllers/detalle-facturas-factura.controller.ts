import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleFacturas,
  Factura,
} from '../models';
import {DetalleFacturasRepository} from '../repositories';

export class DetalleFacturasFacturaController {
  constructor(
    @repository(DetalleFacturasRepository)
    public detalleFacturasRepository: DetalleFacturasRepository,
  ) { }

  @get('/detalle-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to DetalleFacturas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof DetalleFacturas.prototype.IdProducto,
  ): Promise<Factura> {
    return this.detalleFacturasRepository.factura(id);
  }
}
