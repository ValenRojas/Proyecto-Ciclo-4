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
  Producto,
  DetalleFacturas,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleFacturasController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto has one DetalleFacturas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DetalleFacturas),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleFacturas>,
  ): Promise<DetalleFacturas> {
    return this.productoRepository.detalleFacturas(id).get(filter);
  }

  @post('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFacturas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturas, {
            title: 'NewDetalleFacturasInProducto',
            exclude: ['IdProducto'],
            optional: ['productoId']
          }),
        },
      },
    }) detalleFacturas: Omit<DetalleFacturas, 'IdProducto'>,
  ): Promise<DetalleFacturas> {
    return this.productoRepository.detalleFacturas(id).create(detalleFacturas);
  }

  @patch('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto.DetalleFacturas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFacturas, {partial: true}),
        },
      },
    })
    detalleFacturas: Partial<DetalleFacturas>,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturas)) where?: Where<DetalleFacturas>,
  ): Promise<Count> {
    return this.productoRepository.detalleFacturas(id).patch(detalleFacturas, where);
  }

  @del('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto.DetalleFacturas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFacturas)) where?: Where<DetalleFacturas>,
  ): Promise<Count> {
    return this.productoRepository.detalleFacturas(id).delete(where);
  }
}
