import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Asesor, Seguridad, Factura, FinanciacionFactura, DetalleFacturas, Producto, Pedidos} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SeguridadRepository} from './seguridad.repository';
import {FacturaRepository} from './factura.repository';
import {FinanciacionFacturaRepository} from './financiacion-factura.repository';
import {DetalleFacturasRepository} from './detalle-facturas.repository';
import {ProductoRepository} from './producto.repository';
import {PedidosRepository} from './pedidos.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Cliente.prototype.id>;

  public readonly seguridad: BelongsToAccessor<Seguridad, typeof Cliente.prototype.id>;

  public readonly factura: BelongsToAccessor<Factura, typeof Cliente.prototype.id>;

  public readonly financiacionFactura: BelongsToAccessor<FinanciacionFactura, typeof Cliente.prototype.id>;

  public readonly detalleFacturas: BelongsToAccessor<DetalleFacturas, typeof Cliente.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Cliente.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SeguridadRepository') protected seguridadRepositoryGetter: Getter<SeguridadRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('FinanciacionFacturaRepository') protected financiacionFacturaRepositoryGetter: Getter<FinanciacionFacturaRepository>, @repository.getter('DetalleFacturasRepository') protected detalleFacturasRepositoryGetter: Getter<DetalleFacturasRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Cliente, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.detalleFacturas = this.createBelongsToAccessorFor('detalleFacturas', detalleFacturasRepositoryGetter,);
    this.registerInclusionResolver('detalleFacturas', this.detalleFacturas.inclusionResolver);
    this.financiacionFactura = this.createBelongsToAccessorFor('financiacionFactura', financiacionFacturaRepositoryGetter,);
    this.registerInclusionResolver('financiacionFactura', this.financiacionFactura.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.seguridad = this.createBelongsToAccessorFor('seguridad', seguridadRepositoryGetter,);
    this.registerInclusionResolver('seguridad', this.seguridad.inclusionResolver);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
