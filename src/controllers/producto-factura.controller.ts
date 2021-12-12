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
  Factura,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoFacturaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/factura', {
    responses: {
      '200': {
        description: 'Producto has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.productoRepository.factura(id).get(filter);
  }

  @post('/productos/{id}/factura', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'IdVenta'>,
  ): Promise<Factura> {
    return this.productoRepository.factura(id).create(factura);
  }

  @patch('/productos/{id}/factura', {
    responses: {
      '200': {
        description: 'Producto.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.productoRepository.factura(id).patch(factura, where);
  }

  @del('/productos/{id}/factura', {
    responses: {
      '200': {
        description: 'Producto.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.productoRepository.factura(id).delete(where);
  }
}
