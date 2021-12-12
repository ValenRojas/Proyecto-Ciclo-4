import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {FinanciacionFactura, FinanciacionFacturaRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class FinanciacionFacturaRepository extends DefaultCrudRepository<
  FinanciacionFactura,
  typeof FinanciacionFactura.prototype.IdFactura,
  FinanciacionFacturaRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof FinanciacionFactura.prototype.IdFactura>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(FinanciacionFactura, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
