import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Seguridad, SeguridadRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class SeguridadRepository extends DefaultCrudRepository<
  Seguridad,
  typeof Seguridad.prototype.usuariologeo,
  SeguridadRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Seguridad.prototype.usuariologeo>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Seguridad, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
