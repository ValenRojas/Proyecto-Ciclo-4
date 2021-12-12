import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleFacturas, DetalleFacturasRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class DetalleFacturasRepository extends DefaultCrudRepository<
  DetalleFacturas,
  typeof DetalleFacturas.prototype.IdProducto,
  DetalleFacturasRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof DetalleFacturas.prototype.IdProducto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(DetalleFacturas, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
